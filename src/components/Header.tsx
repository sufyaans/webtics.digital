"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoHorizontal } from "./Logo";
import { nav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Menu is open only on the page where it was opened, so navigating closes it
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof v === "function" ? v(open) : v) ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
        scrolled && !open ? "bg-paper/90 py-2.5 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "py-4 md:py-6"
      } ${open ? "bg-ink" : ""}`}
    >
      <div className="wrap flex items-center justify-between gap-6">
        <Link href="/" aria-label="Webtics Digital home" className="relative z-10 text-[1.15rem] md:text-[1.3rem]">
          <span style={{ ["--mark-bg" as string]: open ? "#03203D" : "#FAF8F4" }}>
            <LogoHorizontal tone={open ? "dark" : "light"} />
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[0.95rem] font-medium">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`link-draw py-1 ${isActive(n.href) ? "bg-[length:100%_1px]" : ""}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <Link href="/contact" className="btn btn-primary !min-h-10 !px-4 !py-2 text-sm" data-magnetic>
            <span className="hidden sm:inline">Book a call</span>
            <span className="sm:hidden">Contact</span>
          </Link>
          <button
            type="button"
            className={`grid h-10 w-10 place-items-center rounded-full border lg:hidden ${
              open ? "border-paper/40 text-paper" : "border-ink/20"
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="on-ink fixed inset-0 -z-0 overflow-y-auto bg-ink px-[var(--gutter)] pb-10 pt-28 text-paper lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact" }].map((n, i) => (
              <li key={n.href} className="overflow-hidden border-b border-line-dark">
                <Link
                  href={n.href}
                  className="flex items-baseline justify-between py-4 font-display text-4xl tracking-tight"
                  style={{ animation: open ? `line-up .8s var(--ease-out-expo) ${i * 60}ms both` : undefined }}
                >
                  {n.label}
                  <span className="numeral text-base text-stone">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10 flex flex-col gap-3">
          <Link href="/contact#audit" className="btn btn-primary justify-center">
            Get a free website audit
          </Link>
        </div>
      </div>
    </header>
  );
}
