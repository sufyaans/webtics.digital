import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudies, getCaseStudy, shotsOf } from "@/lib/content";
import { services } from "@/content/services";
import { mdxComponents } from "@/components/mdx/MdxBlocks";
import { Breadcrumbs, Eyebrow, FinalCta, JsonLd } from "@/components/Blocks";
import { BrowserMockup, PhoneMockup } from "@/components/DeviceMockup";
import Tilt from "@/components/motion/Tilt";
import { site } from "@/lib/site";

// Every slug is prerendered by generateStaticParams; unknown slugs 404.
export const instant = false;

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  const title = `${c.client}: ${c.title} | Webtics Digital`;
  return { title, description: c.summary, alternates: { canonical: `/work/${c.slug}` }, openGraph: { title, description: c.summary } };
}

const flag = (v: string) => (v.startsWith("[") ? <span className="ph">{v}</span> : v);

export default async function CasePage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const all = getCaseStudies();
  const next = all[(all.findIndex((x) => x.slug === c.slug) + 1) % all.length];
  const svc = services.filter((s) => c.services.includes(s.slug));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: c.title,
          description: c.summary,
          author: { "@type": "Person", name: "Sufyaan Seedat" },
          publisher: { "@id": site.url + "/#org" },
          mainEntityOfPage: `${site.url}/work/${c.slug}`,
        }}
      />

      {/* Hero */}
      <section className="page-hero relative z-10">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Case studies", href: "/work" }, { label: c.client }]} />
          <div className="page-hero-grid grid gap-x-10 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow className="fade-in text-scarlet-deep">
                {c.client} · {c.sector}
              </Eyebrow>
              <h1 className="display-l page-hero-title !max-w-none">
                <span className="hero-line">
                  <span>{c.title}</span>
                </span>
              </h1>
            </div>
            <div className="fade-in lg:col-span-4 lg:self-end" style={{ ["--d" as string]: "0.5s" }}>
              <p className="eyebrow text-muted">Headline result</p>
              <p className="mt-2 font-display text-3xl leading-tight">{flag(c.result)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Big mock-up */}
      <section className="relative z-10 py-10">
        <div className="wrap relative">
          <Tilt max={3}>
            <BrowserMockup label={c.client} url={c.url} accent={c.accent} src={shotsOf(c)?.desktop} alt={`${c.client} website home page`} priority />
          </Tilt>
          <PhoneMockup label={c.client} accent={c.accent} src={shotsOf(c)?.mobile} alt={`${c.client} website on a phone`} className="absolute -bottom-10 right-[6%] w-[18%]" />
        </div>
      </section>

      {/* At a glance + body */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <dl className="divide-y divide-line border-y border-line text-sm lg:sticky lg:top-28">
              {[
                ["Client", c.client],
                ["Sector", c.sector],
                ["Year", c.year],
              ].map(([k, v]) => (
                <div key={k} className="py-4">
                  <dt className="eyebrow text-muted">{k}</dt>
                  <dd className="mt-1">{flag(v)}</dd>
                </div>
              ))}
              <div className="py-4">
                <dt className="eyebrow text-muted">Services</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {svc.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full bg-stone-tint px-3 py-1 text-xs hover:bg-ink hover:text-paper">
                      {s.name}
                    </Link>
                  ))}
                </dd>
              </div>
              <div className="py-4">
                <dt className="eyebrow text-muted">Tools</dt>
                <dd className="mt-1">{c.tools.map((t, i) => (<span key={t}>{i > 0 && " · "}{flag(t)}</span>))}</dd>
              </div>
            </dl>
          </aside>
          <article className="prose-w max-w-[44rem] lg:col-span-8 lg:col-start-5">
            <MDXRemote source={c.body} components={mdxComponents} />
          </article>
        </div>
      </section>

      {/* Testimonial */}
      {c.testimonial && (
        <section className="on-ink relative z-10 bg-ink py-24 text-paper md:py-32">
          <figure className="wrap max-w-5xl">
            <span className="numeral block text-8xl leading-none text-scarlet" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="h2-serif mt-2" data-reveal>
              {flag(c.testimonial.quote)}
            </blockquote>
            <figcaption className="mt-8 text-paper/75">
              {flag(c.testimonial.name)}, {c.testimonial.role}
            </figcaption>
          </figure>
        </section>
      )}

      {/* Next */}
      {next && next.slug !== c.slug && (
        <section className="relative z-10 py-20">
          <div className="wrap">
            <Link href={`/work/${next.slug}`} className="group grid items-center gap-8 border-y border-line py-12 md:grid-cols-12" data-cursor="Next project">
              <div className="md:col-span-7">
                <p className="eyebrow text-muted">Next case study</p>
                <p className="display-l mt-4 transition-transform duration-700 group-hover:translate-x-3">{next.client}</p>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <BrowserMockup label={next.client} url={next.url} accent={next.accent} src={shotsOf(next)?.desktop} alt="" />
              </div>
            </Link>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
