"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

/**
 * Drag (or use arrow keys) to peel a client website back and reveal the data layer behind it.
 * Figures shown are labelled example data until real client numbers are supplied.
 */
export default function XRay() {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(58);
  const dragging = useRef(false);

  const fromEvent = (e: PointerEvent) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };
  const onKey = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <figure className="m-0">
      <div
        ref={box}
        className="relative aspect-[4/5] cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl border border-line-dark sm:aspect-[16/10]"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          fromEvent(e);
        }}
        onPointerMove={(e) => dragging.current && fromEvent(e)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* BACK: the data layer */}
        <div className="absolute inset-0 bg-ink-2 p-5 font-mono text-[11px] text-stone sm:p-8 sm:text-xs" aria-hidden="true">
          <div className="flex justify-between border-b border-line-dark pb-3">
            <span>event: page_view</span>
            <span className="hidden sm:inline">source: google / organic</span>
            <span>lcp: 1.8s</span>
          </div>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3">
            {[
              ["Enquiries", "form_submit"],
              ["Calls", "click_to_call"],
              ["Bookings", "book_call_click"],
            ].map(([k, ev]) => (
              <div key={k} className="rounded-lg border border-line-dark p-3 sm:p-4">
                <p className="text-paper/70">{k}</p>
                <p className="mt-1 font-display text-3xl text-paper">—</p>
                <p className="mt-2 inline-block rounded border border-dashed border-stone px-1.5 py-0.5">{ev}</p>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 600 160" className="mt-6 w-full sm:mt-8" preserveAspectRatio="none">
            <defs>
              <linearGradient id="xr-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#639CC5" stopOpacity="0.35" />
                <stop offset="1" stopColor="#639CC5" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 140 L60 128 L120 132 L180 108 L240 112 L300 84 L360 90 L420 60 L480 52 L540 34 L600 22 L600 160 L0 160Z" fill="url(#xr-fill)" />
            <path d="M0 140 L60 128 L120 132 L180 108 L240 112 L300 84 L360 90 L420 60 L480 52 L540 34 L600 22" fill="none" stroke="#639CC5" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            <circle cx="540" cy="34" r="5" fill="#EB2F33" />
          </svg>
          <p className="mt-3 text-paper/60">Enquiries by week · example data</p>
        </div>

        {/* FRONT: the website */}
        <div
          className="absolute inset-0 bg-paper p-5 text-ink sm:p-8"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden="true"
        >
          <div className="flex items-center justify-between border-b border-line pb-3 text-xs">
            <span className="font-semibold">Your business</span>
            <span className="hidden gap-4 text-muted sm:flex">
              <span>Services</span>
              <span>About</span>
              <span>Contact</span>
            </span>
          </div>
          <p className="mt-8 text-xs text-muted">Plumbing and heating · Leicester</p>
          <p className="mt-2 max-w-md font-display text-3xl leading-[1.05] tracking-tight sm:text-5xl">
            Same-day repairs. Fixed prices.
          </p>
          <span className="mt-6 inline-block rounded-full bg-scarlet-deep px-4 py-2 text-xs font-semibold text-white">
            Book a visit
          </span>
          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="h-20 rounded-md bg-stone-tint sm:h-28" />
            <div className="h-20 rounded-md bg-paper-2 sm:h-28" />
            <div className="h-20 rounded-md bg-stone-tint sm:h-28" />
          </div>
        </div>

        {/* Handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Reveal the data behind the website"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(100 - pos)}% data layer showing`}
          onKeyDown={onKey}
          className="absolute inset-y-0 w-0.5 bg-scarlet outline-none"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-scarlet text-white shadow-lg ring-4 ring-scarlet/25">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
            </svg>
          </span>
        </div>
        <span className="pointer-events-none absolute left-4 top-[calc(100%-2.5rem)] rounded-full bg-ink/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-paper">
          Front
        </span>
        <span className="pointer-events-none absolute right-4 top-[calc(100%-2.5rem)] rounded-full bg-scarlet-deep px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
          Back
        </span>
      </div>
      <figcaption className="mt-4 text-sm opacity-75">
        Drag the handle, or focus it and use the arrow keys. Front: what your customers see. Back: what Webtics wires up behind it.
      </figcaption>
    </figure>
  );
}
