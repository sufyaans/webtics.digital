import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { packages } from "@/content/packages";
import Packages from "@/components/Packages";
import { Eyebrow, FinalCta, PageHero } from "@/components/Blocks";
import HeroArt from "@/components/HeroArt";

export const metadata: Metadata = {
  title: "Website Design Prices and Packages UK | Webtics Digital",
  description:
    "Clear prices for small business websites, SEO, hosting and care plans, dashboards, automation and apps. Hosting from £10 a month. Fixed quotes, no surprises.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Pricing" }]}
        eyebrow="Packages and pricing"
        art={<HeroArt name="pricing" />}
        title={"Clear prices.\nFixed quotes."}
        lede="Every service has three packages, so you can see roughly what things cost before you get in touch. If nothing fits, tell us what you need and we will quote a fixed price."
        aside={
          <>
            <span className="numeral block text-3xl text-ink">£10</span>
            a month for hosting, a domain and three business email accounts.
          </>
        }
      />

      <nav aria-label="Services on this page" className="relative z-10 pb-6">
        <ul className="wrap flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`#${s.slug}`} className="inline-block rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((s) => (
        <section key={s.slug} id={s.slug} className="relative z-10 scroll-mt-28 py-14 md:py-20" aria-labelledby={`${s.slug}-h`}>
          <div className="wrap">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow className="text-muted">Service {s.no}</Eyebrow>
                <h2 id={`${s.slug}-h`} className="h2-serif mt-4" data-split>
                  {s.name}
                </h2>
                <p className="mt-3 max-w-xl text-muted">{s.short}</p>
              </div>
              <Link href={`/services/${s.slug}`} className="link-underline text-sm">
                What this service includes
              </Link>
            </div>
            <Packages items={packages[s.slug] ?? []} service={s.name} />
          </div>
        </section>
      ))}

      <section className="relative z-10 pb-24">
        <div className="wrap max-w-3xl text-sm text-muted">
          <p>
            Prices are a guide for typical projects. You will always get a fixed quote in writing before any work starts.
            Third-party costs, such as software licences or WhatsApp message fees, are extra and estimated upfront.
          </p>
        </div>
      </section>

      <FinalCta title="Not sure which package fits? Ask for a free audit first." />
    </>
  );
}
