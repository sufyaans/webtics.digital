"use client";

import { useEffect, useRef } from "react";

/**
 * Opening curtain, shown once per browser session.
 *   1. Egyptian Blue screen with a quiet "Loading"
 *   2. a scarlet band rises from the bottom, carrying outlined "click click click"
 *   3. the whole curtain folds away upwards and the hero headline animates in
 *
 * The inline script in layout.tsx decides whether to show it (html[data-loader="on"])
 * before first paint, and removes it after 6s if this component never runs.
 * Skipped entirely for reduced-motion users.
 */
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const wave = () => window.dispatchEvent(new Event("webtics:intro"));
    // Whatever happens to the animations, the page content is forced visible shortly after the intro
    const settle = window.setTimeout(() => html.classList.add("settled"), 4200);
    if (html.dataset.loader !== "on") {
      html.classList.add("intro-go");
      const id = window.setTimeout(wave, 150);
      return () => {
        clearTimeout(id);
        clearTimeout(settle);
      };
    }
    const el = ref.current!;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    const run = () => {
      at(120, () => el.classList.add("is-band")); // band rises
      at(760, () => {
        el.classList.add("is-out"); // curtain folds away
        html.classList.add("intro-go"); // headline starts as the page is revealed
        at(300, wave); // and the splat bursts out behind it
      });
      at(1650, () => {
        delete html.dataset.loader;
        try {
          sessionStorage.setItem("webtics-intro", "1");
        } catch {}
      });
    };
    // wait briefly for the display font so the headline does not animate in a fallback face (max 0.5s)
    Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 500))]).then(run);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(settle);
    };
  }, []);

  return (
    <div ref={ref} className="loader" aria-hidden="true">
      <p className="loader__word">Loading</p>
      <div className="loader__band">
        <div>click click click click</div>
      </div>
    </div>
  );
}
