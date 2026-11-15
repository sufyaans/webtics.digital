import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`arrow ${className}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Rule({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return <div data-rule className={`h-px w-full ${dark ? "bg-line-dark" : "bg-line"} ${className}`} aria-hidden="true" />;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: site.url + it.href } : {}),
    })),
  };
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {all.map((it, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {it.href && i < all.length - 1 ? (
                <Link href={it.href} className="link-draw">
                  {it.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">
                  {it.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={schema} />
    </>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Final call to action used at the end of every page. */
export function FinalCta({
  title = "Let's see what your website is really doing.",
  body = "Send us your web address and we'll send back a short, honest audit: speed, SEO, tracking and the three changes that would make the biggest difference. Free, no obligation.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="on-ink relative z-10 overflow-hidden bg-ink text-paper" style={{ ["--mark-bg" as string]: "#03203D" }}>
      <div className="wrap grid gap-12 py-24 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow className="text-stone">Next step</Eyebrow>
          <h2 data-split className="display-l mt-6">
            {title}
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-6 lg:col-span-4" data-reveal>
          <p className="text-paper/80">{body}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact#audit" className="btn btn-primary" data-magnetic>
              Get a free website audit <Arrow />
            </Link>
            <Link href={site.bookingUrl} className="btn btn-ghost">
              Book a call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Page header. Sized with viewport-height units so the whole header (breadcrumbs, title,
 * intro and buttons) stays within 90% of the screen height on desktop and phone.
 *   art      fills the right-hand side on large screens (hidden on smaller ones)
 *   actions  buttons shown under the intro
 *   aside    a small note, shown under the art (or on the right if there is no art)
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  aside,
  art,
  artClass = "",
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: { label: string; href?: string }[];
  aside?: ReactNode;
  art?: ReactNode;
  /** e.g. "is-portrait" for a taller art box */
  artClass?: string;
  actions?: ReactNode;
}) {
  return (
    <section className="page-hero relative z-10">
      <div className="wrap">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="page-hero-grid grid items-center gap-x-10 lg:grid-cols-12">
          <div className={art ? "lg:col-span-7" : "lg:col-span-9"}>
            <Eyebrow className="fade-in text-scarlet-deep">{eyebrow}</Eyebrow>
            <h1 className="display-l page-hero-title">
              {typeof title === "string"
                ? title.split("\n").map((l, i) => (
                    <span key={i} className="hero-line">
                      <span style={{ ["--i" as string]: i }}>{l}</span>{" "}
                    </span>
                  ))
                : title}
            </h1>
            {lede && (
              <p className="page-hero-lede fade-in max-w-2xl text-ink/80" style={{ ["--d" as string]: "0.45s" }}>
                {lede}
              </p>
            )}
            {actions && (
              <div className="page-hero-actions fade-in" style={{ ["--d" as string]: "0.55s" }}>
                {actions}
              </div>
            )}
          </div>
          {art ? (
            <div className="hidden lg:col-span-5 lg:block">
              <div className={`page-hero-art ${artClass}`}>{art}</div>
              {aside && (
                <aside className="fade-in mx-auto mt-2 max-w-[20rem] border-l border-line pl-4 text-sm text-muted" style={{ ["--d" as string]: "0.6s" }}>
                  {aside}
                </aside>
              )}
            </div>
          ) : (
            aside && (
              <aside className="fade-in hidden border-l border-line pl-5 text-sm text-muted lg:col-span-3 lg:block lg:self-end" style={{ ["--d" as string]: "0.6s" }}>
                {aside}
              </aside>
            )
          )}
        </div>
      </div>
    </section>
  );
}
