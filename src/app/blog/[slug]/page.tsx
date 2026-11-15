import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatDate, getPost, getPosts } from "@/lib/content";
import { services } from "@/content/services";
import { mdxComponents, KeyTakeaways } from "@/components/mdx/MdxBlocks";
import { Breadcrumbs, FinalCta, JsonLd } from "@/components/Blocks";
import Toc from "./Toc";
import HeroArt, { type ArtName } from "@/components/HeroArt";

const CATEGORY_ART: Record<string, ArtName> = { "Web design": "web-design", SEO: "seo", "Website care": "care", Data: "data", Automation: "automation" };
import { site } from "@/lib/site";

// Every slug is prerendered by generateStaticParams; unknown slugs 404.
export const instant = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: `${p.title} | Webtics Digital`,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.description, publishedTime: p.date, authors: [p.author] },
  };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const p = getPost(slug);
  if (!p) notFound();

  const related = getPosts()
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category))
    .slice(0, 3);
  const svc = services.filter((s) => p.services?.includes(s.slug));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.updated ?? p.date,
          author: { "@type": "Person", name: p.author, url: site.url + "/about" },
          publisher: { "@id": site.url + "/#org" },
          mainEntityOfPage: `${site.url}/blog/${p.slug}`,
          inLanguage: "en-GB",
        }}
      />

      <header className="page-hero relative z-10">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Journal", href: "/blog" }, { label: p.title }]} />
          <div className="page-hero-grid grid items-center gap-x-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow fade-in text-scarlet-deep">{p.category}</p>
            <h1 className="display-l page-hero-title !max-w-none" style={{ fontSize: "clamp(1.6rem, min(3.6vw + 0.6rem, 6.6svh), 4.5rem)" }}>
              <span className="hero-line">
                <span>{p.title}</span>
              </span>
            </h1>
            <p className="page-hero-lede fade-in max-w-3xl text-ink/80" style={{ ["--d" as string]: "0.4s" }}>
              {p.description}
            </p>
            <div className="fade-in mt-[clamp(0.75rem,3svh,2rem)] flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-line pt-[clamp(0.6rem,2svh,1.25rem)] text-sm text-muted" style={{ ["--d" as string]: "0.55s" }}>
              <span>
                By{" "}
                <Link href="/about" className="link-underline text-ink">
                  {p.author}
                </Link>
              </span>
              <time dateTime={p.date}>{formatDate(p.date)}</time>
              <span>{p.readingTime} min read</span>
            </div>
          </div>
          <div className="hidden lg:col-span-4 lg:block">
            <div className="page-hero-art">
              <HeroArt name={CATEGORY_ART[p.category] ?? "journal"} />
            </div>
          </div>
          </div>
        </div>
      </header>

      <section className="relative z-10 pb-20">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <Toc headings={p.headings.filter((h) => h.level === 2)} />
          </aside>
          <article className="prose-w max-w-[42rem] lg:col-span-7 lg:col-start-5">
            {p.takeaways && <KeyTakeaways items={p.takeaways} />}
            <MDXRemote source={p.body} components={mdxComponents} />

            {svc.length > 0 && (
              <div className="!mt-16 border-t border-line pt-8">
                <p className="eyebrow text-muted">Related services</p>
                <p className="mt-3 flex flex-wrap gap-2">
                  {svc.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="!no-underline rounded-full border border-line px-4 py-2 text-sm hover:border-ink">
                      {s.name}
                    </Link>
                  ))}
                </p>
              </div>
            )}
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="relative z-10 border-t border-line py-20">
          <div className="wrap">
            <p className="eyebrow text-muted">Keep reading</p>
            <div className="mt-8 grid gap-10 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group block border-t-2 border-ink pt-5">
                  <span className="eyebrow text-scarlet-deep">{r.category}</span>
                  <span className="h3-serif mt-3 block !text-2xl transition-colors group-hover:text-scarlet-deep">{r.title}</span>
                  <span className="mt-3 block text-sm text-muted">{r.readingTime} min read</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
