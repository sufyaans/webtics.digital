"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * "The Thread": a Stone Blue ribbon that draws itself down the page as you scroll,
 * weaving behind sections. Place inside a relative container; dark bands sit above it.
 */
export default function Thread() {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [d, setD] = useState("");
  const [size, setSize] = useState({ w: 1000, h: 4000 });

  useEffect(() => {
    const el = wrap.current!.parentElement!;
    const build = () => {
      const w = el.clientWidth;
      const h = el.scrollHeight;
      setSize({ w, h });
      const turns = Math.max(4, Math.round(h / 900));
      const step = h / turns;
      let p = `M ${w * 0.78} 0`;
      for (let i = 0; i < turns; i++) {
        const y0 = i * step;
        const toLeft = i % 2 === 0;
        const x1 = toLeft ? w * 0.06 : w * 0.94;
        const xPrev = i === 0 ? w * 0.78 : toLeft ? w * 0.94 : w * 0.06;
        p += ` C ${xPrev} ${y0 + step * 0.45}, ${x1} ${y0 + step * 0.55}, ${x1} ${y0 + step}`;
      }
      setD(p);
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const p = path.current;
    if (!p || !d) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    const st = gsap.to(p, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: { trigger: wrap.current!.parentElement!, start: "top top", end: "bottom bottom", scrub: 0.6 },
    });
    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, [d]);

  return (
    <div ref={wrap} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} className="absolute left-0 top-0">
        <path ref={path} d={d} fill="none" stroke="#639CC5" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
