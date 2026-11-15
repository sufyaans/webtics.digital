import { z } from "zod";

/**
 * Contact and audit form endpoint.
 * - Validates and sanitises input with zod
 * - Spam protection: honeypot field, minimum fill time, a simple per-IP rate limit,
 *   and Cloudflare Turnstile when TURNSTILE_SECRET_KEY is set
 * - Sends the enquiry to CONTACT_TO_EMAIL and an auto-reply via Resend (RESEND_API_KEY)
 * - Without RESEND_API_KEY (local dev), it logs a redacted summary instead of sending
 */

const schema = z.object({
  kind: z.enum(["audit", "project", "question"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  website: z.string().trim().max(300).optional().default(""),
  message: z.string().trim().max(3000).optional().default(""),
  consent: z.literal("yes"),
  company_url: z.string().max(500).optional().default(""), // honeypot: real people leave it empty
  elapsed: z.number().optional(),
  turnstileToken: z.string().max(2100).optional().default(""),
});

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Ask Cloudflare whether the Turnstile token from the browser is genuine. */
async function humanCheck(token: string, ip: string) {
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, signal: AbortSignal.timeout(8000) });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch (e) {
    console.error("[contact] Turnstile check failed", (e as Error).message);
    return false;
  }
}

async function send(to: string, subject: string, html: string, replyTo?: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL, to, subject, html, reply_to: replyTo }),
  });
  if (!res.ok) throw new Error("Email provider error " + res.status);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return Response.json({ error: "Too many messages. Please try again later." }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  const d = parsed.data;

  // Bots: silently accept so they do not retry, but do nothing
  if (d.company_url || (d.elapsed !== undefined && d.elapsed < 2500)) return Response.json({ ok: true });

  // Turnstile: only enforced once a secret key is configured
  if (process.env.TURNSTILE_SECRET_KEY && !(await humanCheck(d.turnstileToken, ip))) {
    return Response.json({ error: "We could not confirm you are not a robot. Please reload the page and try again." }, { status: 403 });
  }

  const label = { audit: "Free website audit", project: "New project", question: "Question" }[d.kind];
  const html = `<h2>${esc(label)}</h2>
<p><strong>Name:</strong> ${esc(d.name)}<br><strong>Email:</strong> ${esc(d.email)}<br><strong>Website:</strong> ${esc(d.website || "-")}</p>
<p>${esc(d.message || "-").replace(/\n/g, "<br>")}</p>`;

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
    console.info(`[contact] ${label} enquiry received (email sending not configured).`);
    return Response.json({ ok: true, dev: true });
  }

  try {
    await send(process.env.CONTACT_TO_EMAIL, `Website enquiry: ${label} from ${d.name}`, html, d.email);
    await send(
      d.email,
      "Thanks for getting in touch with Webtics Digital",
      `<p>Hi ${esc(d.name.split(" ")[0])},</p><p>Thanks for your message. We've received your ${esc(label.toLowerCase())} request and will reply within one working day.</p><p>Sufyaan<br>Webtics Digital</p>`,
    );
  } catch (e) {
    console.error("[contact] send failed", (e as Error).message);
    return Response.json({ error: "We couldn't send that just now. Please email us directly." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
