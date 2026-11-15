import type { Metadata } from "next";
import { Eyebrow, PageHero } from "@/components/Blocks";
import ContactForm from "./ContactForm";
import CalEmbed from "@/components/CalEmbed";
import SocialIcons from "@/components/SocialIcons";
import Placeholder from "@/components/Placeholder";
import { site } from "@/lib/site";
import HeroArt from "@/components/HeroArt";

export const metadata: Metadata = {
  title: "Contact Webtics Digital | Free Website Audit or Book a Call",
  description:
    "Get a free website audit or book a call with Webtics Digital. Web design, SEO, care plans and dashboards for UK small businesses. We reply within one working day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        art={<HeroArt name="contact" />}
        title={"Let's talk about\nyour website."}
        lede="Ask for a free audit, tell us about a project or just ask a question. You will hear back from Sufyaan, usually within one working day."
      />

      <section className="relative z-10 pb-24 md:pb-32">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div id="audit" className="scroll-mt-28 lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="space-y-12 lg:col-span-4 lg:col-start-9">
            <div>
              <Eyebrow className="text-muted">The free audit</Eyebrow>
              <p className="h3-serif mt-4">What you get back</p>
              <ul className="mt-5 space-y-3 text-ink/85">
                {[
                  "Mobile speed and Core Web Vitals check",
                  "SEO health: titles, indexing, structure",
                  "Tracking review: are enquiries being counted?",
                  "The three changes that would make the biggest difference",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-[0.75em] h-px w-4 shrink-0 bg-scarlet" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">Delivered by email within <Placeholder value="[TURNAROUND TO CONFIRM, e.g. 3 working days]" />. No obligation, no hard sell.</p>
            </div>

            <div className="on-ink rounded-2xl bg-ink p-8 text-paper">
              <Eyebrow className="text-stone">Prefer to talk?</Eyebrow>
              <p className="mt-4 font-display text-2xl leading-snug">Book an intro call and we will talk through what you need.</p>
              <a href="#book" className="btn btn-primary mt-6">
                Pick a time
              </a>
            </div>

            <div>
              <Eyebrow className="text-muted">Direct</Eyebrow>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-sm text-muted">Email</dt>
                  <dd className="text-lg"><a href={`mailto:${site.email}`} className="link-underline">{site.email}</a></dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Phone</dt>
                  <dd className="text-lg"><a href={site.phoneHref} className="link-underline">{site.phone}</a></dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Based in</dt>
                  <dd className="text-lg">Leicester, working UK-wide</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Reviews</dt>
                  <dd className="text-lg"><a href={site.googleReviews} className="link-underline" rel="noopener" target="_blank">Read our Google reviews</a></dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">WhatsApp and social</dt>
                  <dd className="mt-2">
                    <SocialIcons />
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section id="book" className="relative z-10 scroll-mt-24 border-t border-line bg-paper-2 py-20 md:py-28" aria-labelledby="book-h">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="text-muted">Book a call</Eyebrow>
            <h2 id="book-h" className="h2-serif mt-5" data-split>
              Pick a time that suits you.
            </h2>
            <p className="mt-6 text-ink/80" data-reveal>
              A relaxed intro call with Sufyaan. Tell us about your business and what you want the website to do, and
              you will leave with clear next steps. No pressure and no hard sell.
            </p>
            <p className="mt-4 text-sm text-muted" data-reveal>
              Times show in your own time zone. You will get a confirmation and calendar invite by email.
            </p>
          </div>
          <div className="lg:col-span-8">
            <CalEmbed calLink={site.calLink} />
          </div>
        </div>
      </section>
    </>
  );
}
