import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/content/services";
import { getPosts, getCaseStudies } from "@/lib/content";
import { Arrow, Eyebrow, FinalCta, JsonLd, PageHero, Rule } from "@/components/Blocks";
import Lazy3D from "@/components/three/Lazy3D";
import XRay from "@/components/XRay";
import { site } from "@/lib/site";
import { packages } from "@/content/packages";
import Packages from "@/components/Packages";
import HeroArt, { type ArtName } from "@/components/HeroArt";

const ART: Record<string, ArtName> = {
  "web-design": "web-design",
  seo: "seo",
  "website-care-plans": "care",
  "data-dashboards": "data",
  "automation-chatbots": "automation",
  "app-development": "apps",
};

// Every slug is prerendered by generateStaticParams; unknown slugs 404.
export const instant = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: `/services/${s.slug}` },
  };
}

function Copy({ text }: { text: string }) {
  // Highlight any [PLACEHOLDER] fragments in data-driven copy
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[") ? (
          <span key={i} className="ph">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  );
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const s = getService(slug);
  if (!s) notFound();

  const posts = getPosts().filter((p) => s.relatedPosts.includes(p.slug) || p.services?.includes(s.slug)).slice(0, 3);
  const work = getCaseStudies().filter((c) => c.services.includes(s.slug)).slice(0, 2);
  const others = services.filter((o) => o.slug !== s.slug);
  const idx = services.findIndex((o) => o.slug === s.slug);
  const next = services[(idx + 1) % services.length];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.primaryKeyword,
    description: s.metaDescription,
    provider: { "@id": site.url + "/#org" },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    url: `${site.url}/services/${s.slug}`,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs
      .filter((f) => !f.a.startsWith("["))
      .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\s*\[[^\]]+\]/g, "") } })),
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      {faqSchema.mainEntity.length > 0 && <JsonLd data={faqSchema} />}

      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: s.name }]}
        eyebrow={`Service ${s.no} · ${s.side === "front" ? "Front of house" : "Behind the scenes"}`}
        title={s.h1}
        lede={s.lede}
        art={<HeroArt name={ART[s.slug] ?? "services"} />}
        actions={
          <>
            <Link href="/contact#audit" className="btn btn-primary" data-magnetic>
              Get a free website audit <Arrow />
            </Link>
            <Link href={site.bookingUrl} className="btn btn-ghost hidden sm:inline-flex">
              Book a call
            </Link>
            <a href="#packages" className="btn btn-ghost">
              See prices
            </a>
          </>
        }
        aside={
          <>
            <span className="eyebrow block text-ink">Tools we use</span>
            <span className="mt-2 block">{s.tools.join(" · ")}</span>
          </>
        }
      />

      {/* Intro + signs */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="wrap">
          <Rule />
          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <div className="space-y-5 text-lg text-ink/85 lg:col-span-6" data-reveal>
              {s.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Eyebrow className="text-scarlet-deep">Sound familiar?</Eyebrow>
              <ul className="mt-6">
                {s.signs.map((x, i) => (
                  <li key={x} className="flex gap-5 border-t border-line py-4 last:border-b" data-reveal>
                    <span className="numeral text-xl text-stone">{String(i + 1).padStart(2, "0")}</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Data visual on the data page */}
      {s.slug === "data-dashboards" && (
        <section className="on-ink relative z-10 bg-ink py-20 text-paper md:py-28">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow className="text-stone">See it</Eyebrow>
              <h2 className="h2-serif mt-5" data-split>
                The website on top. The answers underneath.
              </h2>
            </div>
            <div className="lg:col-span-8" data-reveal>
              <XRay />
            </div>
          </div>
        </section>
      )}

      {/* What's included */}
      <section className="relative z-10 py-20 md:py-28" aria-labelledby="inc-h">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow className="text-muted">What&apos;s included</Eyebrow>
              <h2 id="inc-h" className="h2-serif mt-5" data-split>
                What you get.
              </h2>
            </div>
            {s.side === "back" && (
              <Lazy3D
                scene="data-field"
                className="aspect-[16/9] overflow-hidden rounded-2xl bg-stone-tint lg:col-span-8"
                fallback={<div className="h-full w-full bg-stone-tint" />}
              />
            )}
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-3">
            {s.included.map((it, i) => (
              <div key={it.title} className="group bg-paper p-7 transition-colors duration-500 hover:bg-stone-tint md:p-9" data-reveal>
                <span className="numeral text-2xl text-stone">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3-serif mt-6 !text-2xl">{it.title}</h3>
                <p className="mt-3 text-muted">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 bg-paper-2 py-20 md:py-28" aria-labelledby="proc-h">
        <div className="wrap">
          <Eyebrow className="text-muted">Process</Eyebrow>
          <h2 id="proc-h" className="h2-serif mt-5" data-split>
            How it runs.
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            {s.process.map((p, i) => (
              <li key={p.title} className="border-t-2 border-ink pt-5" data-reveal>
                <span className="numeral text-4xl text-scarlet">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Proof */}
      {work.length > 0 && (
        <section className="relative z-10 py-20 md:py-28">
          <div className="wrap">
            <Eyebrow className="text-muted">Related work</Eyebrow>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {work.map((c) => (
                <Link key={c.slug} href={`/work/${c.slug}`} data-cursor="View case study" className="group block rounded-2xl border border-line p-8 transition-colors hover:border-ink" data-reveal>
                  <p className="eyebrow text-muted">{c.client}</p>
                  <p className="h3-serif mt-3 transition-transform duration-500 group-hover:translate-x-1">{c.title}</p>
                  <p className="mt-4 text-sm text-scarlet-deep">Read the case study →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="relative z-10 py-20 md:py-28" aria-labelledby="faq-h">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="text-muted">Questions</Eyebrow>
            <h2 id="faq-h" className="h2-serif mt-5" data-split>
              Asked and answered.
            </h2>
          </div>
          <div className="lg:col-span-8">
            {s.faqs.map((f) => (
              <details key={f.q} className="group border-t border-line py-6 last:border-b" data-reveal>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-transform duration-500 group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-ink/80">
                  <Copy text={f.a} />
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related reading + other services */}
      <section className="relative z-10 pb-24">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          {posts.length > 0 && (
            <div className="lg:col-span-6">
              <Eyebrow className="text-muted">Related reading</Eyebrow>
              <ul className="mt-6">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="block border-t border-line py-5 font-display text-xl last:border-b hover:text-scarlet-deep">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={posts.length ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-12"}>
            <Eyebrow className="text-muted">Other services</Eyebrow>
            <ul className="mt-6 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/services/${o.slug}`} className="inline-block rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/services/${next.slug}`} className="group mt-10 block border-t border-line pt-6">
              <span className="eyebrow text-muted">Next service</span>
              <span className="mt-2 flex items-center justify-between font-display text-3xl">
                {next.name}
                <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Packages */}
      {packages[s.slug] && (
        <section id="packages" className="relative z-10 scroll-mt-28 border-t border-line py-20 md:py-28" aria-labelledby="pkg-h">
          <div className="wrap">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow className="text-muted">Packages and pricing</Eyebrow>
                <h2 id="pkg-h" className="h2-serif mt-5" data-split>
                  {s.name}: packages and prices.
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted">
                Guide prices for typical projects. You always get a fixed quote before work starts.{" "}
                <Link href="/pricing" className="link-underline">
                  See all pricing
                </Link>
              </p>
            </div>
            <Packages items={packages[s.slug]} service={s.name} slug={s.slug} />
          </div>
        </section>
      )}

      <FinalCta title={s.ctaTitle} />
    </>
  );
}
