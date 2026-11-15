import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Eyebrow, FinalCta, PageHero, Rule } from "@/components/Blocks";
import GlyphImage from "@/components/motion/GlyphImage";
import fs from "node:fs";
import path from "node:path";

// The portrait is drawn from this photo. Until the file exists, a placeholder is shown.
const PHOTO = "/brand/sufyaan-cutout.png"; // cut-out of public/brand/sufyaan.jpg
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", PHOTO));

export const metadata: Metadata = {
  title: "Web Designer and Data Engineer, Leicester | Webtics Digital",
  description:
    "I'm Sufyaan: a web designer who is also a working data engineer. See how that shapes every Webtics website, and get a free audit to see yours.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Proof before claims", body: "We show the numbers. If we cannot measure it, we say so." },
  { title: "Plain English", body: "We say what we mean, in words you would use yourself. You will always understand what we are doing and why." },
  { title: "Small and senior", body: "You work with the person doing the work, from the first call to the last invoice." },
  { title: "Built to last", body: "Secure, low-maintenance builds you own outright, and care that continues after launch." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About" }]}
        eyebrow="About Webtics"
        title={"I design websites.\nBy day, I build\ndata platforms."}
        lede="Webtics Digital is me: a web designer in Leicester who also works as a data engineer. I build your website, then connect it to the numbers that show whether it's working, using the same tools I use in my day job: Databricks, SQL Server, Power BI and Azure."
        art={
          hasPhoto ? (
            <GlyphImage src={PHOTO} mode="portrait" cell={4.4} label="Portrait of Sufyaan Seedat, founder of Webtics Digital, drawn in characters" />
          ) : undefined
        }
        artClass="is-portrait"
      />

      <section className="relative z-10 py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="text-muted">The story</Eyebrow>
            <h2 className="h2-serif mt-5" data-split>
              Why Webtics exists.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-5 text-lg text-ink/85" data-reveal>
              <p>
                I&apos;m Sufyaan. I have been building websites for five years, and I run Webtics alongside my work
                as a data engineer at a large company, where I build data platforms on Databricks, SQL Server, Power
                BI and Azure.
              </p>
              <p>
                I kept seeing the same thing with small businesses: they paid for a website, got something that
                looked fine, and then nobody could tell them whether it was bringing in any work. The agency had
                moved on to the next launch.
              </p>
              <p>
                At Webtics, every site is measured from day one, built to be fast, secure and easy to update, and
                looked after once it's live. When something needs fixing, you speak to me, not a help desk.
              </p>
              <p>
                I&apos;m based in Leicester, but the work travels. Webtics clients are in the UK, Malawi, South
                Africa, Greece and Serbia.
              </p>
              <p>
                Away from the screen you will find me playing football, in the gym or talking about cars to anyone
                who will listen.
              </p>
              <p className="pt-2 font-display text-xl">Sufyaan Seedat, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* The edge */}
      <section className="on-ink relative z-10 overflow-hidden bg-ink py-24 text-paper md:py-32" style={{ ["--mark-bg" as string]: "#03203D" }}>
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow className="text-stone">The edge</Eyebrow>
            <h2 className="h2-serif mt-5" data-split>
              Web design and data engineering, under one roof.
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2" data-reveal>
              <div>
                <p className="eyebrow text-stone">Front</p>
                <p className="mt-3 text-paper/85">Custom design, fast builds, SEO and the content that turns a visitor into an enquiry.</p>
              </div>
              <div>
                <p className="eyebrow text-stone">Back</p>
                <p className="mt-3 text-paper/85">Tracking, dashboards and integrations, built to the standard of a professional data platform.</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-paper p-4 lg:col-span-5 lg:col-start-8">
            <div className="aspect-[5/4] w-full">
              <GlyphImage src="/brand/webtics-logo-sm.png" mode="logo" label="The Webtics Digital logo, drawn in numbers and symbols" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="wrap">
          <Eyebrow className="text-muted">What we stand for</Eyebrow>
          <h2 className="h2-serif mt-5" data-split>
            Four rules we work by.
          </h2>
          <Rule className="mt-12" />
          <div className="grid md:grid-cols-2">
            {values.map((v, i) => (
              <div key={v.title} className={`border-b border-line py-10 md:px-8 ${i % 2 === 0 ? "md:border-r md:pl-0" : ""}`} data-reveal>
                <span className="numeral text-6xl text-stone">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3-serif mt-4">{v.title}</h3>
                <p className="mt-3 max-w-md text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="relative z-10 pb-24 md:pb-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="text-muted">Working together</Eyebrow>
            <h2 className="h2-serif mt-5" data-split>
              What to expect.
            </h2>
          </div>
          <ul className="space-y-6 text-lg lg:col-span-6 lg:col-start-7" data-reveal>
            <li className="border-l-2 border-scarlet pl-5">A free audit or call first. No pressure, just an honest view.</li>
            <li className="border-l-2 border-stone pl-5">A fixed quote and a clear plan before any work starts.</li>
            <li className="border-l-2 border-stone pl-5">Regular check-ins and a site you can see taking shape.</li>
            <li className="border-l-2 border-stone pl-5">Launch, training and a care plan if you want one.</li>
          </ul>
        </div>
        <div className="wrap mt-14">
          <Link href="/work" className="btn btn-ghost">
            See the work <Arrow />
          </Link>
        </div>
      </section>

      <FinalCta title="Sound like the kind of partner you need?" />
    </>
  );
}
