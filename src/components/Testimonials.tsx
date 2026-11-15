import Link from "next/link";
import { testimonials } from "@/content/testimonials";
import { site } from "@/lib/site";
import { Arrow, Eyebrow } from "./Blocks";

/** Client testimonials, all in the same style, in two ruled columns. */
export default function Testimonials() {
  return (
    <section className="relative z-10 bg-paper-2 py-20 md:py-32" aria-labelledby="testimonials-h">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="text-muted">In their words</Eyebrow>
            <h2 id="testimonials-h" data-split className="h2-serif mt-5">
              What clients say.
            </h2>
          </div>
          <a href={site.googleReviews} target="_blank" rel="noopener" className="btn btn-ghost">
            Read our Google reviews <Arrow />
          </a>
        </div>

        <div className="mt-14 gap-x-12 md:columns-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="mb-10 break-inside-avoid border-t border-line pt-8" data-reveal>
              <p className="h3-serif">&ldquo;{t.pull}&rdquo;</p>
              <blockquote className="mt-4 space-y-3 text-ink/80">
                {t.quote.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </blockquote>
              <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-semibold">{t.name}</span>
                {t.company && <span className="text-muted">{t.company}</span>}
                {t.work && (
                  <Link href={`/work/${t.work}`} className="link-underline text-scarlet-deep">
                    See the project
                  </Link>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
