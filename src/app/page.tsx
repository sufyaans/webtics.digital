import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/content/services";
import { getCaseStudies, getPosts, formatDate, shotsOf } from "@/lib/content";
import { Arrow, Eyebrow, FinalCta, Rule } from "@/components/Blocks";
import Thread from "@/components/motion/Thread";
import GlyphField from "@/components/motion/GlyphField";
import GlyphImage from "@/components/motion/GlyphImage";
import Testimonials from "@/components/Testimonials";
import Tilt from "@/components/motion/Tilt";
import XRay from "@/components/XRay";
import ProcessScroller from "@/components/ProcessScroller";
import { BrowserMockup, PhoneMockup } from "@/components/DeviceMockup";
import { site } from "@/lib/site";
import { Ph } from "@/components/Placeholder";

export const metadata: Metadata = {
  title: "Web Design for Small Businesses UK | Webtics Digital",
  description:
    "Websites, SEO, care plans and dashboards for UK small businesses, built by a web designer who is also a data engineer. Get a free website audit.",
  alternates: { canonical: "/" },
};

const process = [
  { title: "Audit", body: "We look at your current site, rankings and competitors, and tell you plainly what is working and what is not." },
  { title: "Plan", body: "A page plan, keyword map and fixed quote. You know exactly what you are getting before we start." },
  { title: "Build", body: "Designed from scratch and built to be fast, secure and easy to update." },
  { title: "Connect", body: "Tracking, Search Console and dashboards wired in, so every enquiry is counted." },
  { title: "Care", body: "We stay on. Hosting, updates, monitoring and a monthly report you can read in two minutes." },
];

function Letters({ text, from }: { text: string; from: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} className="hl-l" style={{ ["--i" as string]: from + i }}>
          {ch}
        </span>
      ))}
    </>
  );
}

export default function Home() {
  const work = getCaseStudies().slice(0, 3);
  const posts = getPosts().slice(0, 3);

  return (
    <div>

      {/* ───────────── Hero ───────────── */}
      <section className="relative z-10 flex min-h-[90svh] flex-col overflow-hidden">
        <GlyphField />
        <div className="wrap home-hero-inner relative flex flex-1 flex-col items-center justify-center text-center">
          <p className="eyebrow fade-in rounded-full bg-paper/70 px-4 py-2 text-scarlet-deep shadow-[0_0_0_1px_var(--color-line)] backdrop-blur-sm" style={{ ["--d" as string]: "0.1s" }}>
            Web design · SEO · Care · Data · Apps
          </p>

          <h1 className="hero-title">
            <span className="sr-only">Webtics Digital, web design for UK small businesses: </span>
            <span aria-hidden="true" className="block">
              <span className="hl-word">
                <Letters text="Designs" from={0} />
              </span>
            </span>{" "}
            <span aria-hidden="true" className="block italic">
              <span className="hl-word">
                <Letters text="that" from={7} />
              </span>{" "}
              <span className="hl-word text-scarlet">
                <Letters text="click" from={11} />
              </span>
            </span>
            <span className="sr-only">Designs that click.</span>
          </h1>

          <p className="page-hero-lede fade-in max-w-xl text-ink/80" style={{ ["--d" as string]: "0.45s" }}>
            Fast, custom websites for UK small businesses, wired up to tracking and dashboards. So you can
            see what is working, not just hope it is.
          </p>
          <div className="page-hero-actions fade-in items-center justify-center" style={{ ["--d" as string]: "0.55s" }}>
            <Link href="/contact#audit" className="btn btn-primary" data-magnetic>
              Get a free website audit <Arrow />
            </Link>
            <Link href={site.bookingUrl} className="btn btn-ghost bg-paper/60 backdrop-blur-sm">
              Book a call
            </Link>
          </div>
        </div>

        <div className="wrap pointer-events-none absolute inset-x-0 bottom-5 flex items-end justify-between gap-4 text-xs text-muted">
          <p className="fade-in hidden max-w-[14rem] border-l border-line pl-3 text-left leading-relaxed sm:block" style={{ ["--d" as string]: "0.75s" }}>
            Based in {site.city}. Working with small businesses across the UK.
          </p>
          <p className="hint fade-in mx-auto sm:mx-0" style={{ ["--d" as string]: "0.9s" }} aria-hidden="true">
            <i />
            <span className="hint-fine">Click anywhere</span>
            <span className="hint-touch">Tap anywhere</span>
          </p>
          <p className="fade-in hidden sm:block" style={{ ["--d" as string]: "0.75s" }} aria-hidden="true">
            Scroll ↓
          </p>
        </div>
      </section>

      {/* Everything below the hero sits over the Thread, which draws itself down the page */}
      <div className="relative">
      <Thread />

      {/* ───────────── The difference ───────────── */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="wrap">
          <Rule />
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow className="text-muted">The difference</Eyebrow>
              <h2 data-split className="h2-serif mt-6 max-w-[14ch]">
                Most agencies stop at launch. That is where we start counting.
              </h2>
              <div className="mt-8 max-w-xl space-y-6 text-lg text-ink/85" data-reveal>
                <p>
                  Webtics is run by Sufyaan, a web designer who is also a working data engineer. By day he builds data
                  platforms on Databricks, SQL Server, Power BI and Azure.
                </p>
                <p>
                  That means your website does not just look good. It is measured properly from day one, connected to
                  the tools you already use, and reported on in plain English.
                </p>
                <p className="border-l-2 border-scarlet pl-4 text-base text-muted">
                  Small, senior and hands-on. You deal with the person doing the work, before launch and long after it.
                </p>
              </div>
            </div>
            <figure className="lg:col-span-6">
              <div className="mx-auto aspect-[5/4] w-full max-w-[40rem]">
                <GlyphImage src="/brand/webtics-logo-sm.png" mode="logo" label="The Webtics Digital logo, drawn in numbers and symbols" />
              </div>
              <figcaption className="mt-2 text-center text-xs text-muted">
                One ribbon, two sides: the website in front, the data behind. Hover over it.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ───────────── Selected work ───────────── */}
      <section className="relative z-10 py-20 md:py-28" aria-labelledby="work-h">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow className="text-muted">Selected work</Eyebrow>
              <h2 id="work-h" data-split className="h2-serif mt-5">
                Proof, not promises.
              </h2>
            </div>
            <Link href="/work" className="btn btn-ghost">
              All case studies <Arrow />
            </Link>
          </div>

          <div className="mt-16 space-y-24 md:space-y-36">
            {work.map((c, i) => (
              <article key={c.slug} className="grid items-center gap-10 lg:grid-cols-12">
                <Link
                  href={`/work/${c.slug}`}
                  data-cursor="View case study"
                  className={`relative block lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}
                  aria-label={`${c.client} case study`}
                >
                  <Tilt max={5}>
                    <div data-parallax="0.08">
                      <BrowserMockup label={c.client} url={c.url} accent={c.accent} src={shotsOf(c)?.full} alt={`${c.client} website`} scroll />
                    </div>
                  </Tilt>
                  <PhoneMockup
                    label={c.client}
                    accent={c.accent}
                    src={shotsOf(c)?.mobile}
                    alt={`${c.client} website on a phone`}
                    className={`absolute -bottom-8 w-[22%] ${i % 2 ? "-left-4" : "-right-4"}`}
                  />
                </Link>
                <div className={`lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`} data-reveal>
                  <p className="numeral text-5xl text-stone">{String(i + 1).padStart(2, "0")}</p>
                  <p className="eyebrow mt-4 text-muted">
                    {c.sector} · {c.year}
                  </p>
                  <h3 className="h3-serif mt-3">
                    <Link href={`/work/${c.slug}`} className="link-draw">
                      {c.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-ink/80">{c.summary}</p>
                  <p className="mt-6 border-t border-line pt-4 text-sm">
                    <span className="eyebrow block text-scarlet-deep">Result</span>
                    <span className="mt-1 block">{c.result.startsWith("[") ? <Ph>{c.result}</Ph> : c.result}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ───────────── Services index ───────────── */}
      <section className="relative z-10 py-20 md:py-32" aria-labelledby="services-h">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow className="text-muted">What we do</Eyebrow>
              <h2 id="services-h" data-split className="h2-serif mt-5">
                One partner, front to back.
              </h2>
              <p className="mt-6 max-w-sm text-muted" data-reveal>
                The website your customers see, and everything behind it that tells you whether it is working.
              </p>
            </div>
          </div>
          <ol className="lg:col-span-8">
            {services.map((s) => (
              <li key={s.slug} data-reveal>
                <Link
                  href={`/services/${s.slug}`}
                  className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 border-t border-line py-7 transition-colors duration-500 last:border-b hover:bg-paper-2 md:grid-cols-[5rem_1fr_auto] md:px-4"
                >
                  <span className="numeral text-3xl text-stone transition-colors group-hover:text-scarlet md:text-4xl">{s.no}</span>
                  <span>
                    <span className="h3-serif block transition-transform duration-500 group-hover:translate-x-2">{s.name}</span>
                    <span className="mt-1 block text-muted">{s.short}</span>
                  </span>
                  <span className="eyebrow hidden text-muted sm:block">{s.side === "front" ? "Front of house" : "Behind the scenes"}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── Process ───────────── */}
      <ProcessScroller
        steps={process}
        heading={
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow className="text-muted">How we work</Eyebrow>
              <h2 className="h2-serif mt-5 max-w-[18ch]">Five chapters. No disappearing act.</h2>
            </div>
            <p className="max-w-xs text-sm text-muted">Every project follows the same honest route, from first audit to ongoing care.</p>
          </div>
        }
      />

      {/* ───────────── Data band with X-ray ───────────── */}
      <section className="on-ink relative z-10 overflow-hidden bg-ink py-24 text-paper md:py-36" aria-labelledby="xray-h">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="text-stone">Front and back</Eyebrow>
            <h2 id="xray-h" data-split className="h2-serif mt-5">
              Every website has a front. We build the back too.
            </h2>
            <p className="mt-6 text-paper/80" data-reveal>
              Drag the handle across. On top is what your customers see. Underneath is what we wire up: enquiry
              tracking, traffic sources, speed and a dashboard that turns it all into answers.
            </p>
            <Link href="/services/data-dashboards" className="btn btn-ghost mt-8" data-reveal>
              Data and dashboards <Arrow />
            </Link>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <XRay />
          </div>
        </div>
      </section>

      {/* ───────────── Founder note ───────────── */}
      <section className="relative z-10 py-24 md:py-36" aria-labelledby="founder-h">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <figure className="lg:col-span-4" data-reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-tint">
              <Image src="/brand/sufyaan.jpg" alt="Sufyaan Seedat, founder of Webtics Digital" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-[35%_20%]" />
            </div>
            <figcaption className="mt-3 text-xs text-muted">Sufyaan Seedat, founder.</figcaption>
          </figure>
          <div className="lg:col-span-7 lg:col-start-6">
            <Eyebrow className="text-muted">A note from the founder</Eyebrow>
            <h2 id="founder-h" data-split className="h2-serif mt-5">
              &ldquo;I build websites. In my day job, I build data platforms.&rdquo;
            </h2>
            <div className="mt-8 space-y-5 text-lg text-ink/85" data-reveal>
              <p>
                I started Webtics because small businesses kept getting the same deal: a nice-looking website, a big
                invoice and then silence. Nobody could tell them whether it was working.
              </p>
              <p>
                I have been building websites for five years, and I work with data every day as a data engineer.
                So I build websites the way I would want my own built: fast, secure, properly measured and looked
                after. When you email, you get me.
              </p>
              <p>Today that means clients in the UK, Malawi, South Africa, Greece and Serbia.</p>
              <p className="pt-2 font-display text-xl">Sufyaan Seedat, Founder</p>
            </div>
            <Link href="/about" className="btn btn-ghost mt-8">
              More about Webtics <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Journal ───────────── */}
      {posts.length > 0 && (
        <section className="relative z-10 pb-24 md:pb-36" aria-labelledby="journal-h">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow className="text-muted">From the journal</Eyebrow>
                <h2 id="journal-h" className="h2-serif mt-5" data-split>
                  Straight answers.
                </h2>
              </div>
              <Link href="/blog" className="btn btn-ghost">
                All articles <Arrow />
              </Link>
            </div>
            <ul className="mt-12">
              {posts.map((p) => (
                <li key={p.slug} data-reveal>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group grid gap-2 border-t border-line py-7 transition-colors last:border-b hover:bg-paper-2 md:grid-cols-[12rem_1fr_8rem] md:items-baseline md:gap-8 md:px-4"
                  >
                    <span className="eyebrow text-scarlet-deep">{p.category}</span>
                    <span className="h3-serif transition-transform duration-500 group-hover:translate-x-2">{p.title}</span>
                    <span className="text-sm text-muted md:text-right">
                      {p.readingTime} min · <time dateTime={p.date}>{formatDate(p.date)}</time>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta />
      </div>
    </div>
  );
}
