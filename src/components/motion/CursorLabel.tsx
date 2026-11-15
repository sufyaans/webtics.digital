"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Custom pointer. A small dot trails the mouse and changes with what it is over:
 *   default        8px scarlet dot
 *   links/buttons  opens into a 40px ring
 *   [data-cursor]  grows into a disc carrying that label (e.g. "View case study")
 * The native cursor stays visible everywhere except over [data-cursor] items.
 * Fine pointers only; switched off for reduced motion.
 */
type Mode = "dot" | "link" | "view";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("dot");
  const [label, setLabel] = useState("");
  const [on, setOn] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    document.documentElement.classList.add("has-cursor");
    const xTo = gsap.quickTo(el, "x", { duration: 0.28, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.28, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      setOn(true);
      const t = e.target as HTMLElement;
      const view = t.closest?.<HTMLElement>("[data-cursor]");
      if (view) {
        setMode("view");
        setLabel(view.dataset.cursor ?? "");
      } else if (t.closest?.("a, button, summary, label, select, [role='slider'], input, textarea")) {
        setMode("link");
      } else {
        setMode("dot");
      }
    };
    const leave = () => setOn(false);
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={`wcursor ${on ? "is-on" : ""} ${down ? "is-down" : ""}`} data-mode={mode}>
      <span className="wcursor__label">{mode === "view" ? label : ""}</span>
    </div>
  );
}
