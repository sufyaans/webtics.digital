"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Step = { title: string; body: string };

/** Process "chapters": pinned horizontal scroll on desktop, a stacked list on mobile. */
export default function ProcessScroller({ steps, heading }: { steps: Step[]; heading: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const dist = () => t.scrollWidth - window.innerWidth + 96;
      gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current!,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="relative z-10 overflow-hidden bg-paper py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
      <div className="wrap">{heading}</div>
      <ol ref={track} className="wrap mt-14 grid gap-px lg:mt-16 lg:flex lg:w-max lg:max-w-none lg:gap-0">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="group relative border-t border-line py-8 lg:w-[30rem] lg:border-l lg:border-t-0 lg:px-10 lg:py-4"
          >
            <span className="numeral block text-[5.5rem] leading-none text-stone transition-colors duration-500 group-hover:text-scarlet lg:text-[8rem]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="h3-serif mt-4">{s.title}</h3>
            <p className="mt-3 max-w-sm text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
