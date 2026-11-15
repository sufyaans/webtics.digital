"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

/** Gives children a subtle 3D tilt that follows the pointer (fine pointers only). */
export default function Tilt({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const inner = el.firstElementChild as HTMLElement;
    const rx = gsap.quickTo(inner, "rotationX", { duration: 0.8, ease: "power3.out" });
    const ry = gsap.quickTo(inner, "rotationY", { duration: 0.8, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * max * 2);
      rx(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);
  return (
    <div ref={ref} className={className} style={{ perspective: "1400px" }}>
      <div style={{ transformStyle: "preserve-3d", willChange: "transform" }}>{children}</div>
    </div>
  );
}
