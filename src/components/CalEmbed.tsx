"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cal.com booking calendar, embedded inline and themed to match the site:
 * light theme, Scarlet Deep as the brand colour, month view.
 * (Cal.com controls the fonts inside its own frame; colours and layout are ours.)
 *
 * The Cal.com script only loads when the calendar scrolls near the screen, so it never
 * slows the first paint. If it cannot load, the plain link underneath still works.
 */
type CalFn = ((...args: unknown[]) => void) & { ns?: Record<string, (...args: unknown[]) => void>; loaded?: boolean; q?: unknown[] };
declare global {
  interface Window {
    Cal?: CalFn;
  }
}

const ORIGIN = "https://app.cal.com";
const NS = "intro";

export default function CalEmbed({ calLink }: { calLink: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      setState("loading");

      // Cal.com's standard loader, written out long-hand: it queues calls until embed.js arrives
      if (!window.Cal) {
        const queue: unknown[] = [];
        const cal = ((...args: unknown[]) => {
          const c = window.Cal!;
          if (!c.loaded) {
            c.ns = {};
            c.q = c.q || queue;
            const s = document.createElement("script");
            s.src = `${ORIGIN}/embed/embed.js`;
            s.async = true;
            document.head.appendChild(s);
            c.loaded = true;
          }
          if (args[0] === "init") {
            const ns = args[1];
            const api: CalFn = ((...a: unknown[]) => (api.q = api.q || []).push(a)) as CalFn;
            api.q = api.q || [];
            if (typeof ns === "string") {
              c.ns![ns] = c.ns![ns] || api;
              (c.ns![ns] as CalFn).q!.push(args);
              c.q!.push(["initNamespace", ns]);
            } else c.q!.push(args);
            return;
          }
          c.q!.push(args);
        }) as CalFn;
        window.Cal = cal;
      }

      const Cal = window.Cal!;
      Cal("init", NS, { origin: ORIGIN });
      const api = Cal.ns![NS];
      api("inline", { elementOrSelector: el, calLink, config: { layout: "month_view", theme: "light" } });
      api("ui", {
        theme: "light",
        layout: "month_view",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: { "cal-brand": "#C8202A", "cal-text": "#03203D", "cal-text-emphasis": "#03203D", "cal-border-subtle": "#D9DEE3", "cal-bg": "#FFFFFF", "cal-bg-emphasis": "#E4EDF5" },
          dark: { "cal-brand": "#C8202A" },
        },
      });
      api("on", { action: "linkReady", callback: () => setState("ready") });
      // GA4 conversion (only fires if analytics is loaded with consent)
      api("on", {
        action: "bookingSuccessful",
        callback: () => (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "book_call", { method: "cal.com" }),
      });
      window.setTimeout(() => setState("ready"), 6000);
    };

    const io = new IntersectionObserver(([e]) => e.isIntersecting && start(), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, [calLink]);

  return (
    <div>
      <div className="relative min-h-[34rem] overflow-hidden rounded-2xl border border-line bg-white">
        {state !== "ready" && (
          <p className="absolute inset-0 grid place-items-center text-sm text-muted" aria-live="polite">
            Loading the calendar…
          </p>
        )}
        <div ref={box} className="relative w-full" />
      </div>
      <p className="mt-3 text-sm text-muted">
        Calendar not showing?{" "}
        <a href={`https://cal.com/${calLink}`} target="_blank" rel="noopener" className="link-underline text-ink">
          Open the booking page
        </a>
        .
      </p>
    </div>
  );
}
