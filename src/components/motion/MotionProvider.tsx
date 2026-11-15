"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __motion?: boolean;
    __lenis?: Lenis;
  }
}

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One place for all scroll motion. Pages opt in with data attributes:
 *  data-split          headline rises from behind a mask
 *  data-reveal         fade and rise (batched)
 *  data-rule           hairline draws in from the left
 *  data-parallax="n"   drifts at n × scroll speed
 *  data-count="n"      counts up to n (real figures only)
 *  data-magnetic       button leans towards the pointer
 */
export default function MotionProvider() {
  // Smooth scroll, created once
  useEffect(() => {
    window.__motion = true;
    if (reduced()) {
      document.documentElement.classList.remove("js");
      return;
    }
    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -96 } });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}

/**
 * Per-page scroll animations. Rendered inside template.tsx, after the page.
 *
 * Revealing content (data-reveal, data-split, data-rule) is done with an IntersectionObserver
 * and CSS transitions, so text can never be left invisible if an animation library stalls.
 * As a second safety net, anything still hidden a few seconds after it should have appeared
 * is shown outright. GSAP is only used for the optional extras: parallax, counters, magnets.
 */
export function PageMotion() {
  useEffect(() => {
    if (reduced()) return;
    window.__lenis?.scrollTo(0, { immediate: true });
    const cleanups: (() => void)[] = [];
    let ctx: gsap.Context | undefined;
    let poll = 0;
    let tries = 0;
    let io: IntersectionObserver | undefined;
    const timers: number[] = [];

    const REVEAL = "[data-reveal],[data-split],[data-rule]";
    const animated = REVEAL + ",[data-parallax],[data-count],[data-magnetic]";
    // Streamed sections hydrate after this effect runs. Wait until React has claimed the
    // elements (it tags them with a "__reactFiber" key) before touching them: at most 1.5s.
    const hydrated = () =>
      [...document.querySelectorAll(animated)].every((el) => Object.keys(el).some((k) => k.startsWith("__reactFiber")));

    const show = (el: Element, delay = 0) => {
      const h = el as HTMLElement;
      h.style.setProperty("--rd", `${delay}ms`);
      h.classList.add("is-in");
      // timers keep running even when a browser pauses animations, so this always lands
      timers.push(window.setTimeout(() => h.classList.add("is-done"), delay + 1500));
    };

    const setup = () => {
      // 1. Reveals
      io = new IntersectionObserver(
        (entries) => {
          let i = 0;
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            show(e.target, Math.min(i++, 6) * 70);
            io?.unobserve(e.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
      );
      const targets = [...document.querySelectorAll(REVEAL)];
      targets.forEach((el) => io!.observe(el));

      // Safety net: whatever is on screen but still hidden after 2.5s is simply shown
      const sweep = () => {
        for (const el of document.querySelectorAll(REVEAL + ":not(.is-in)")) {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) show(el);
        }
      };
      timers.push(window.setTimeout(sweep, 2500));
      window.addEventListener("scroll", sweepSoon, { passive: true });
      function sweepSoon() {
        timers.push(window.setTimeout(sweep, 1200));
      }
      cleanups.push(() => window.removeEventListener("scroll", sweepSoon));

      // 2. Optional extras
      try {
        ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const v = parseFloat(el.dataset.parallax || "0.15");
            gsap.fromTo(
              el,
              { yPercent: -v * 50 },
              { yPercent: v * 50, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
            );
          });

          gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
            const end = parseFloat(el.dataset.count || "0");
            const decimals = (el.dataset.count?.split(".")[1] || "").length;
            const obj = { v: 0 };
            gsap.to(obj, {
              v: end,
              duration: 1.8,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
              onUpdate: () => (el.textContent = obj.v.toFixed(decimals)),
            });
          });
        });

        if (window.matchMedia("(pointer: fine)").matches) {
          document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
            const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
            const move = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
              yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
            };
            const leave = () => {
              xTo(0);
              yTo(0);
            };
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", leave);
            });
          });
        }
        document.fonts?.ready.then(refresh);
        ScrollTrigger.refresh();
      } catch (e) {
        console.warn("Optional motion extras failed to start", e);
      }
    };

    const start = () => {
      if (!hydrated() && tries++ < 15) {
        poll = window.setTimeout(start, 100);
        return;
      }
      setup();
    };
    poll = window.setTimeout(start, 0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(poll);
      timers.forEach(clearTimeout);
      io?.disconnect();
      window.removeEventListener("load", refresh);
      cleanups.forEach((c) => c());
      ctx?.revert();
    };
  }, []);

  return null;
}
