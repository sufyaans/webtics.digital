import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { Arrow, Eyebrow, FinalCta, PageHero } from "@/components/Blocks";
import Lazy3D from "@/components/three/Lazy3D";
import HeroArt from "@/components/HeroArt";

export const metadata: Metadata = {
  title: "Web Design, SEO and Data Services | Webtics Digital",
  description:
    "Web design, SEO, care plans, dashboards and app development for UK small businesses, run by one small, senior team. Get a free website audit.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const front = services.filter((s) => s.side === "front");
  const back = services.filter((s) => s.side === "back");
  const [proof] = testimonials;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        eyebrow="Services"
        art={<HeroArt name="services" />}
        title={"The website your customers see.\nThe data that shows it's working."}
        lede={`${services.length} services for UK small businesses, run by one small, senior team: a website that ranks, tracking that counts every enquiry, and the dashboards that show whether it's working.`}
        aside={
          <>
            <span className="numeral block text-3xl text-ink">{String(services.length).padStart(2, "0")}</span>
            services, from the page your customers see to the data you run the business on.
          </>
        }
      />

      <section className="relative z-10 pb-10">
        <div className="wrap">
          <Lazy3D
            scene="data-field"
            className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-tint md:aspect-[21/8]"
            fallback={<div className="h-full w-full bg-[repeating-linear-gradient(90deg,transparent_0_22px,rgba(99,156,197,0.25)_22px_30px)]" />}
          />
          <p className="mt-3 text-xs text-muted">Illustration: your business data, in motion. Move your pointer across it.</p>
        </div>
      </section>

      <section className="relative z-10 py-10" aria-label="What a client says">
        <div className="wrap flex flex-col gap-4 border-y border-line py-8 md:flex-row md:items-center md:justify-between">
          <blockquote className="h3-serif max-w-2xl !text-2xl">&ldquo;{proof.pull}&rdquo;</blockquote>
          <div className="flex shrink-0 items-center gap-4">
            <p className="text-sm text-muted">
              {proof.name}
              {proof.company && <>, {proof.company}</>}
            </p>
            <Link href="/work" className="btn btn-ghost !min-h-0 !px-4 !py-2 text-sm">
              See the work <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {[
        { title: "Front of house", sub: "What your customers see and use.", list: front },
        { title: "Behind the scenes", sub: "What keeps it running and tells you how it is doing.", list: back },
      ].map((group) => (
        <section key={group.title} className="relative z-10 py-16 md:py-24">
          <div className="wrap grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow className="text-muted">{group.title}</Eyebrow>
              <p className="h3-serif mt-4 max-w-xs" data-reveal>
                {group.sub}
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl bg-line lg:col-span-8">
              {group.list.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group grid gap-6 bg-paper p-7 transition-colors duration-500 hover:bg-ink hover:text-paper md:grid-cols-[6rem_1fr_auto] md:items-start md:p-10"
                  data-reveal
                >
                  <span className="numeral text-5xl text-stone">{s.no}</span>
                  <span>
                    <span className="h3-serif block">{s.name}</span>
                    <span className="mt-2 block max-w-lg opacity-75">{s.short}</span>
                    <span className="mt-5 flex flex-wrap gap-2">
                      {s.tools.slice(0, 4).map((t) => (
                        <span key={t} className="rounded-full border border-current/20 px-3 py-1 text-xs opacity-70">
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="btn btn-ghost self-start !min-h-0 !px-3 !py-2 text-sm">
                    Explore <Arrow />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <FinalCta title="Not sure where to start? Start with an audit." />
    </>
  );
}
