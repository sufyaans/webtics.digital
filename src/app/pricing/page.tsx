import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { packages, formatPrice, unitLabel } from "@/content/packages";
import Packages from "@/components/Packages";
import { Eyebrow, FinalCta, JsonLd, PageHero } from "@/components/Blocks";
import { site } from "@/lib/site";
import HeroArt from "@/components/HeroArt";

export const metadata: Metadata = {
  title: "Website Design Prices and Packages UK | Webtics Digital",
  description:
    "Clear prices for small business websites, SEO, hosting and care plans, dashboards and apps. Hosting from £10 a month. Fixed quotes, no surprises.",
  alternates: { canonical: "/pricing" },
};


const faqs = [
  {
    q: "Are these prices fixed?",
    a: "They are guide prices for typical projects. Before any work starts you get a fixed quote in writing, so the price you agree is the price you pay.",
  },
  {
    q: "What is the cheapest way to get online with Webtics?",
    a: "Hosting is £10 a month and includes your domain registration, website hosting and three business email accounts. A Starter website is a one-off £795.",
  },
  {
    q: "Is anything not included?",
    a: "Third-party costs are separate and estimated upfront, for example software licences such as Power BI.",
  },
  {
    q: "Can I spread the cost of a website?",
    a: "Yes. A Starter website is £795 paid upfront, or 6 monthly payments of £135 (£810 in total). A Growth website is £1,495 upfront, or 6 monthly payments of £255 (£1,530 in total). For larger projects we agree a payment plan in the quote.",
  },
  {
    q: "How does the first-design guarantee work?",
    a: "We design your homepage first and show it to you before building anything else. If you are not happy with it, you can walk away and you do not pay.",
  },
  {
    q: "What is included with a new website?",
    a: "Every new website comes with the first 3 months of the Care plan at no extra cost, worth £117. That covers hosting, monitoring, backups and small updates. After that you can carry on with Care, move to Hosting at £10 a month, or host it elsewhere.",
  },
  {
    q: "Is there a discount for paying yearly?",
    a: "Yes. Pay for Hosting, Care or Care Plus yearly and you get 2 months free: £100, £390 or £890 a year.",
  },
  {
    q: "How is a dashboard priced?",
    a: "There are two parts. A one-off set-up fee from £495 covers connecting your data and building the dashboard. Managed reporting, from £125 a month per user, keeps it hosted, refreshed and supported, and is part of every dashboard.",
  },
  {
    q: "Can I start small and upgrade later?",
    a: "Yes. Most clients start with one package and add to it. You only pay the difference in work, and nothing you have already paid for is thrown away.",
  },
  {
    q: "Who owns the website when it is finished?",
    a: "You do. Once a project is paid for, the website, its content and its data are yours.",
  },
  {
    q: "What if none of the packages fit?",
    a: "Tell us what you need and we will quote a fixed price for exactly that. The free website audit is a good place to start.",
  },
];

// Machine-readable prices, so search engines and AI assistants can quote them accurately
const offerSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Webtics Digital packages and pricing",
  url: site.url + "/pricing",
  itemListElement: services.flatMap((s) =>
    (packages[s.slug] ?? []).map((p) => ({
      "@type": "Offer",
      name: `${s.name}: ${p.name}`,
      description: `${p.blurb} ${formatPrice(p)} ${unitLabel[p.unit]}.`,
      price: p.price,
      priceCurrency: "GBP",
      url: `${site.url}/services/${s.slug}#packages`,
      seller: { "@id": site.url + "/#org" },
    })),
  ),
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={offerSchema} />
      <JsonLd data={faqSchema} />
      <PageHero
        crumbs={[{ label: "Pricing" }]}
        eyebrow="Packages and pricing"
        art={<HeroArt name="pricing" />}
        title={"Clear prices.\nFixed quotes."}
        lede="Clear packages for every service, so you can see what things cost before you get in touch. Spread the cost of a website, save with yearly care plans, and pay nothing if you do not like the first design."
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
            <Packages items={packages[s.slug] ?? []} service={s.name} slug={s.slug} />
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

      <section className="relative z-10 border-t border-line py-20 md:py-28" aria-labelledby="pricing-faq-h">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="text-muted">Pricing questions</Eyebrow>
            <h2 id="pricing-faq-h" className="h2-serif mt-5" data-split>
              Before you ask.
            </h2>
          </div>
          <div className="lg:col-span-8">
            {faqs.map((f) => (
              <details key={f.q} className="group border-t border-line py-6 last:border-b" data-reveal>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-transform duration-500 group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-ink/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title="Not sure which package fits? Ask for a free audit first." />
    </>
  );
}
