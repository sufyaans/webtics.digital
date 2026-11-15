import Link from "next/link";
import { Emblem, Wordmark } from "./Logo";
import { site } from "@/lib/site";
import SocialIcons from "./SocialIcons";
import { services } from "@/content/services";

export default function Footer() {
  return (
    <footer className="on-ink relative overflow-hidden bg-ink text-paper" style={{ ["--mark-bg" as string]: "#03203D" }}>
      {/* the logo itself, faded right back, sitting behind the links */}
      <div className="pointer-events-none absolute -right-[6%] top-1/2 w-[min(46rem,78%)] -translate-y-1/2 opacity-[0.09]" aria-hidden="true">
        <Emblem className="h-auto w-full" sizes="(min-width: 768px) 736px, 78vw" />
      </div>
      <div className="wrap relative pb-10 pt-16 md:pt-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark tone="dark" className="text-3xl" />
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-paper/90">{site.tagline}</p>
            <p className="mt-6 max-w-sm text-sm text-paper/70">
              Web design, SEO, data and apps for UK small businesses. Based in {site.city}.
            </p>
          </div>

          <nav aria-label="Services" className="md:col-span-3">
            <p className="eyebrow text-stone">Services</p>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="link-draw">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-2">
            <p className="eyebrow text-stone">Company</p>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              <li><Link href="/work" className="link-draw">Case studies</Link></li>
              <li><Link href="/pricing" className="link-draw">Pricing</Link></li>
              <li><Link href="/about" className="link-draw">About</Link></li>
              <li><Link href="/blog" className="link-draw">Journal</Link></li>
              <li><Link href="/contact" className="link-draw">Contact</Link></li>
              <li><Link href="/contact#audit" className="link-draw">Free website audit</Link></li>
              <li><a href={site.googleReviews} className="link-draw" rel="noopener" target="_blank">Google reviews</a></li>
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="eyebrow text-stone">Say hello</p>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              <li><a href={`mailto:${site.email}`} className="link-draw">{site.email}</a></li>
              <li><a href={site.phoneHref} className="link-draw">{site.phone}</a></li>
            </ul>
            <SocialIcons className="mt-5" />
          </div>
        </div>


        <div className="mt-14 flex flex-col gap-4 border-t border-line-dark pt-6 text-xs text-paper/70 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Webtics Digital. All rights reserved.</p>
          <ul className="flex flex-wrap gap-5">
            <li><Link href="/privacy" className="link-draw">Privacy</Link></li>
            <li><Link href="/cookies" className="link-draw">Cookies</Link></li>
            <li><Link href="/terms" className="link-draw">Terms</Link></li>
            <li><Link href="/sitemap.xml" className="link-draw">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
