"use client";

import { useEffect, useRef, useState } from "react";

type Kind = "audit" | "project" | "question";
type Errors = Partial<Record<"name" | "email" | "website" | "message" | "consent" | "form", string>>;

// Cloudflare Turnstile: an invisible "are you human" check, with no puzzle for most people.
// It is only switched on when a site key is set (see .env.example).
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const kinds: { id: Kind; label: string }[] = [
  { id: "audit", label: "Free website audit" },
  { id: "project", label: "A new project" },
  { id: "question", label: "A question" },
];

export default function ContactForm() {
  const [kind, setKind] = useState<Kind>("audit");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const started = useRef(0);
  const summary = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileBox = useRef<HTMLDivElement>(null);
  const token = useRef("");
  const widget = useRef<string | undefined>(undefined);
  const waiters = useRef<((t: string) => void)[]>([]);

  // Load Turnstile only when the form is about to be used, so it never slows the first paint
  useEffect(() => {
    if (!TURNSTILE_KEY) return;
    const form = formRef.current;
    if (!form) return;
    let cancelled = false;
    let loaded = false;

    const mount = () => {
      if (cancelled || widget.current || !window.turnstile || !turnstileBox.current) return;
      widget.current = window.turnstile.render(turnstileBox.current, {
        sitekey: TURNSTILE_KEY,
        theme: "light",
        size: "flexible",
        appearance: "interaction-only", // stays hidden unless Cloudflare needs the visitor to tick a box
        callback: (t: string) => {
          token.current = t;
          waiters.current.splice(0).forEach((w) => w(t));
        },
        "expired-callback": () => (token.current = ""),
        "error-callback": () => (token.current = ""),
      });
    };
    const load = () => {
      if (loaded) return;
      loaded = true;
      if (window.turnstile) return mount();
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = mount;
      document.head.appendChild(s);
    };
    form.addEventListener("focusin", load, { once: true });
    form.addEventListener("pointerenter", load, { once: true });
    const io = new IntersectionObserver(([e]) => e.isIntersecting && load(), { rootMargin: "200px" });
    io.observe(form);
    return () => {
      cancelled = true;
      io.disconnect();
      form.removeEventListener("focusin", load);
      form.removeEventListener("pointerenter", load);
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = undefined;
    };
  }, [status]);

  /** The Turnstile token, waiting up to 10 seconds for the check to finish. */
  const getToken = () =>
    token.current
      ? Promise.resolve(token.current)
      : new Promise<string>((resolve) => {
          waiters.current.push(resolve);
          setTimeout(() => resolve(""), 10000);
        });

  useEffect(() => {
    started.current = Date.now();
    const fromHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "audit") setKind("audit");
      // Arriving from a package button: start a project enquiry that names the package
      const pkg = new URLSearchParams(window.location.search).get("package");
      const box = formRef.current?.querySelector("textarea");
      if (pkg && box && !box.value) {
        setKind("project");
        box.value = `I am interested in ${pkg.slice(0, 120)}.`;
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const errs: Errors = {};
    if (!data.name?.trim()) errs.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) errs.email = "Enter an email address like name@business.co.uk.";
    if (kind === "audit" && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+/.test(data.website ?? "")) errs.website = "Enter your website address, like yourbusiness.co.uk.";
    if (kind !== "audit" && !data.message?.trim()) errs.message = "Tell us a little about what you need.";
    if (!data.consent) errs.consent = "Please confirm we can contact you about your enquiry.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }

    setStatus("sending");
    try {
      let turnstileToken = "";
      if (TURNSTILE_KEY) {
        turnstileToken = await getToken();
        if (!turnstileToken) throw new Error("We could not confirm you are not a robot. Tick the box above the button if one is showing, or reload the page and try again.");
      }
      // Cloudflare adds its own hidden field; we send the token explicitly instead
      delete data["cf-turnstile-response"];
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kind, turnstileToken, elapsed: Date.now() - started.current }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong. Please try again, or email us directly.");
      }
      setStatus("sent");
      // GA4 conversion event (only fires if analytics consent was given and gtag is loaded)
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", kind === "audit" ? "audit_request" : "generate_lead", { form: "contact" });
    } catch (err) {
      // a token can only be used once, so get a fresh one for the next attempt
      token.current = "";
      if (widget.current) window.turnstile?.reset(widget.current);
      setStatus("idle");
      setErrors({ form: (err as Error).message });
      requestAnimationFrame(() => summary.current?.focus());
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl bg-stone-tint p-10">
        <p className="eyebrow text-scarlet-deep">Received</p>
        <p className="h2-serif mt-4">Thanks. We&apos;ll be in touch soon.</p>
        <p className="mt-4 text-ink/80">A confirmation is on its way to your inbox. If it does not arrive in a few minutes, check your spam folder.</p>
      </div>
    );
  }

  const field = "mt-2 w-full rounded-xl border bg-white/70 px-4 py-3.5 text-base transition-colors focus:border-ink focus:bg-white";
  const errList = Object.entries(errors);

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-8" aria-describedby={errList.length ? "form-errors" : undefined}>
      <div ref={summary} tabIndex={-1} id="form-errors" aria-live="assertive" className="outline-none">
        {errList.length > 0 && (
          <div className="rounded-xl border border-scarlet-deep bg-scarlet/5 p-4 text-sm">
            <p className="font-semibold text-scarlet-deep">Please check the following:</p>
            <ul className="mt-2 list-disc pl-5">
              {errList.map(([k, v]) => (
                <li key={k}>{v}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <fieldset>
        <legend className="eyebrow text-muted">I&apos;m interested in</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {kinds.map((k) => (
            <label key={k.id} className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-scarlet-deep ${kind === k.id ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}>
              <input type="radio" name="kindRadio" value={k.id} checked={kind === k.id} onChange={() => setKind(k.id)} className="sr-only" />
              {k.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-semibold">Name</label>
          <input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} className={`${field} ${errors.name ? "border-scarlet-deep" : "border-line"}`} />
          {errors.name && <p id="name-err" className="mt-2 text-sm text-scarlet-deep">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="font-semibold">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} className={`${field} ${errors.email ? "border-scarlet-deep" : "border-line"}`} />
          {errors.email && <p id="email-err" className="mt-2 text-sm text-scarlet-deep">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="website" className="font-semibold">
          Website address {kind !== "audit" && <span className="font-normal text-muted">(optional)</span>}
        </label>
        <input id="website" name="website" inputMode="url" autoComplete="url" placeholder="yourbusiness.co.uk" required={kind === "audit"} aria-invalid={!!errors.website} aria-describedby={errors.website ? "website-err" : undefined} className={`${field} ${errors.website ? "border-scarlet-deep" : "border-line"}`} />
        {errors.website && <p id="website-err" className="mt-2 text-sm text-scarlet-deep">{errors.website}</p>}
      </div>

      <div>
        <label htmlFor="message" className="font-semibold">
          {kind === "audit" ? "What would you most like to improve?" : "How can we help?"}{" "}
          {kind === "audit" && <span className="font-normal text-muted">(optional)</span>}
        </label>
        <textarea id="message" name="message" rows={5} maxLength={3000} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} className={`${field} ${errors.message ? "border-scarlet-deep" : "border-line"}`} placeholder={kind === "audit" ? "More enquiries, better rankings, a faster site…" : "A few lines about your business and what you need."} />
        {errors.message && <p id="message-err" className="mt-2 text-sm text-scarlet-deep">{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_url">Leave this empty</label>
        <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" value="yes" className="mt-1 h-4 w-4 accent-[#03203D]" aria-invalid={!!errors.consent} />
          <span>
            I&apos;m happy for Webtics Digital to contact me about this enquiry. See the{" "}
            <a href="/privacy" className="link-underline">privacy policy</a>.
          </span>
        </label>
        {errors.consent && <p className="mt-2 text-sm text-scarlet-deep">{errors.consent}</p>}
      </div>

      {TURNSTILE_KEY && <div ref={turnstileBox} className="empty:hidden" />}

      <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60" data-magnetic>
        {status === "sending" ? "Sending…" : kind === "audit" ? "Request my free audit" : "Send message"}
      </button>
    </form>
  );
}
