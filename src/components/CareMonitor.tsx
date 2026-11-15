"use client";

import { useEffect, useRef, useState } from "react";

const CHECKS = [
  { label: "Uptime", ok: "Online" },
  { label: "Backups", ok: "Saved" },
  { label: "Updates", ok: "Up to date" },
  { label: "Security scan", ok: "Clean" },
  { label: "Contact forms", ok: "Working" },
];
const DAYS = 30;
const REST = 5; // idle ticks between rounds of checks
const PULSE = "M0,30 H70 L78,30 L84,12 L92,48 L100,22 L106,30 H200";

/** Illustrative site monitor for the care plans page: checks run in a loop while it is on screen. */
export default function CareMonitor() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(CHECKS.length);
      return;
    }
    const id = window.setInterval(() => setStep((s) => (s + 1) % (CHECKS.length + REST)), 850);
    return () => window.clearInterval(id);
  }, [live]);

  const running = step < CHECKS.length;

  return (
    <div ref={ref} className={`care on-ink overflow-hidden rounded-2xl bg-ink p-6 text-paper md:p-8 lg:col-span-8 ${live ? "is-live" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-3 text-sm font-semibold">
          <span className="care-beacon" aria-hidden="true" />
          {running ? "Running checks" : "All systems normal"}
        </p>
        <p className="eyebrow text-stone">Illustration · site monitor</p>
      </div>

      <div className="care-pulse mt-6" aria-hidden="true">
        <div className="care-pulse-track">
          {[0, 1, 2, 3].map((k) => (
            <svg key={k} viewBox="0 0 200 60" preserveAspectRatio="none">
              <path d={PULSE} />
            </svg>
          ))}
        </div>
      </div>

      <div className="mt-6" aria-hidden="true">
        <div className="flex items-end gap-[3px]">
          {Array.from({ length: DAYS }, (_, i) => (
            <span key={i} className="care-day" style={{ transitionDelay: `${i * 35}ms` }} />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-paper/50">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>

      <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
        {CHECKS.map((c, i) => {
          const state = step > i ? "done" : step === i ? "run" : "wait";
          return (
            <li key={c.label} className="flex items-center justify-between gap-4 border-t border-line-dark py-3 text-sm">
              <span className="flex items-center gap-3">
                <span className={`care-status is-${state}`} aria-hidden="true">
                  <svg viewBox="0 0 16 16">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                </span>
                {c.label}
              </span>
              <span className={state === "done" ? "text-stone" : "text-paper/40"}>
                {state === "done" ? c.ok : state === "run" ? "Checking" : "Queued"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
