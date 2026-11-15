"use client";

import { useEffect, useRef, useState } from "react";

// Example figures only: this is an illustration, not client data.
const VIEWS = [
  { tab: "Week", kpis: [1240, 38, 3.1], line: [32, 40, 36, 52, 47, 60, 56, 70, 64, 78, 74, 88], bars: [58, 24, 12, 6] },
  { tab: "Month", kpis: [5320, 171, 3.2], line: [44, 38, 50, 46, 62, 55, 68, 72, 60, 80, 76, 92], bars: [52, 27, 14, 7] },
  { tab: "Quarter", kpis: [15880, 524, 3.3], line: [20, 28, 34, 30, 44, 52, 48, 62, 70, 66, 82, 95], bars: [61, 20, 11, 8] },
];
const KPI_LABELS = ["Visits", "Enquiries", "Conversion"];
const CHANNELS = ["Search", "Direct", "Social", "Referral"];
const W = 300;
const H = 110;

const flat = (v: (typeof VIEWS)[number]) => [...v.kpis, ...v.line, ...v.bars];
const ease = (t: number) => 1 - Math.pow(1 - t, 4);

function linePath(vals: number[]) {
  const pts = vals.map((v, i) => [(i / (vals.length - 1)) * W, H - 8 - (v / 100) * (H - 20)] as const);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`;
  }
  return { d, end: pts[pts.length - 1] };
}

/** Illustrative dashboard for the data page: figures count up and the charts move between views. */
export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [view, setView] = useState(0);
  const [auto, setAuto] = useState(true);
  const [vals, setVals] = useState<number[]>(() => flat(VIEWS[0]).map(() => 0));
  const current = useRef(vals);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Tween every number on screen towards the selected view.
  useEffect(() => {
    if (!live) return;
    const to = flat(VIEWS[view]);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      current.current = to;
      setVals(to);
      return;
    }
    const from = current.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1100);
      const next = to.map((v, i) => from[i] + (v - from[i]) * ease(t));
      current.current = next;
      setVals(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [live, view]);

  useEffect(() => {
    if (!live || !auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setView((v) => (v + 1) % VIEWS.length), 4200);
    return () => window.clearInterval(id);
  }, [live, auto]);

  const kpis = vals.slice(0, 3);
  const line = vals.slice(3, 15);
  const bars = vals.slice(15);
  const { d, end } = linePath(line);
  const kpiText = [
    Math.round(kpis[0]).toLocaleString("en-GB"),
    Math.round(kpis[1]).toLocaleString("en-GB"),
    `${kpis[2].toFixed(1)}%`,
  ];

  return (
    <div ref={ref} className="rounded-2xl bg-stone-tint p-3 md:p-5 lg:col-span-8">
      <div className="rounded-xl bg-paper p-5 shadow-[0_20px_50px_-30px_rgba(3,32,61,0.45)] md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <span className="dash-live" aria-hidden="true" />
            Example dashboard
          </p>
          <div className="flex rounded-full bg-stone-tint p-1 text-xs font-semibold" role="group" aria-label="Time range">
            {VIEWS.map((v, i) => (
              <button
                key={v.tab}
                type="button"
                aria-pressed={i === view}
                onClick={() => {
                  setAuto(false);
                  setView(i);
                }}
                className={`rounded-full px-3 py-1.5 transition-colors duration-300 ${i === view ? "bg-ink text-paper" : "text-ink/70 hover:text-ink"}`}
              >
                {v.tab}
              </button>
            ))}
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          {KPI_LABELS.map((label, i) => (
            <div key={label} className="rounded-lg border border-line p-3 md:p-4">
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="mt-1 font-display text-xl tabular-nums sm:text-2xl md:text-4xl">{kpiText[i]}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="text-xs text-muted">Enquiries over time</p>
            <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 block w-full overflow-visible" aria-hidden="true">
              <defs>
                <linearGradient id="dash-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#639cc5" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#639cc5" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75, 1].map((g) => (
                <line key={g} x1="0" x2={W} y1={H * g - 1} y2={H * g - 1} stroke="#d9dee3" strokeWidth="1" />
              ))}
              <path d={`${d} L${W},${H} L0,${H} Z`} fill="url(#dash-fill)" />
              <path d={d} fill="none" stroke="#03203d" strokeWidth="2.5" strokeLinecap="round" />
              <circle className="dash-ring" cx={end[0]} cy={end[1]} r="5" fill="none" stroke="#eb2f33" strokeWidth="1.5" />
              <circle cx={end[0]} cy={end[1]} r="4" fill="#eb2f33" stroke="#faf8f4" strokeWidth="2" />
            </svg>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-muted">Where they came from</p>
            <ul className="mt-3 space-y-3">
              {CHANNELS.map((c, i) => (
                <li key={c} className="text-xs">
                  <div className="flex justify-between">
                    <span>{c}</span>
                    <span className="tabular-nums text-muted">{Math.round(bars[i])}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-stone-tint">
                    <div className={`h-full rounded-full ${i === 0 ? "bg-scarlet" : "bg-ink"}`} style={{ width: `${bars[i] * 1.5}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
