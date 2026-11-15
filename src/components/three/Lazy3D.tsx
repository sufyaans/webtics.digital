"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

const DataField = dynamic(() => import("./DataField"), { ssr: false });

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Shows a static fallback first (good for LCP and for reduced-motion users),
 * then loads the 3D scene once the browser is idle and the block is on screen.
 * The scene pauses rendering when scrolled out of view.
 */
export default function Lazy3D({
  fallback,
  className = "",
}: {
  /** Only one 3D scene remains; kept as a prop so more can be added later */
  scene?: "data-field";
  fallback: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !webglOK()) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const el = ref.current!;
    let interacted = false;
    let onScreen = false;
    const maybeLoad = () => {
      if (!interacted || !onScreen) return;
      if ("requestIdleCallback" in window) window.requestIdleCallback(() => setLoad(true), { timeout: 800 });
      else setTimeout(() => setLoad(true), 200);
    };
    // Load the 3D bundle only after the visitor first interacts, so it never competes
    // with the initial page load (protects LCP and INP on slower phones).
    const events = ["pointermove", "pointerdown", "scroll", "keydown", "touchstart", "wheel"] as const;
    const onInteract = () => {
      interacted = true;
      events.forEach((e) => window.removeEventListener(e, onInteract));
      maybeLoad();
    };
    events.forEach((e) => window.addEventListener(e, onInteract, { passive: true, once: true }));
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        onScreen = e.isIntersecting || onScreen;
        if (e.isIntersecting) maybeLoad();
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      events.forEach((e) => window.removeEventListener(e, onInteract));
    };
  }, []);

  useEffect(() => {
    if (load) {
      const t = setTimeout(() => setReady(true), 120);
      return () => clearTimeout(t);
    }
  }, [load]);

  const Scene = DataField;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: ready ? 0 : 1 }}
        aria-hidden={ready}
      >
        {fallback}
      </div>
      {load && (
        <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: ready ? 1 : 0 }}>
          <Scene active={visible} />
        </div>
      )}
    </div>
  );
}
