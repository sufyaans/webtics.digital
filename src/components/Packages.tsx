import Link from "next/link";
import { formatPrice, unitLabel, type Package } from "@/content/packages";
import { Arrow } from "./Blocks";

/** A row of packages for one service, set out as ruled columns rather than boxed cards. */
export default function Packages({ items, service }: { items: Package[]; service: string }) {
  return (
    <div className="grid border-t border-ink md:grid-cols-3">
      {items.map((p, i) => (
        <article
          key={p.name}
          className={`relative flex flex-col border-b border-line py-8 md:border-b-0 md:px-8 md:py-10 ${i > 0 ? "md:border-l md:border-line" : "md:pl-0"} ${p.popular ? "bg-stone-tint/60 px-5 md:!px-8" : ""}`}
          data-reveal
        >
          {p.popular && <p className="eyebrow absolute right-5 top-4 text-scarlet-deep md:right-8">Most chosen</p>}
          <h3 className="h3-serif !text-2xl">{p.name}</h3>
          <p className="mt-4 flex items-baseline gap-2">
            <span className="numeral text-5xl">{formatPrice(p)}</span>
            <span className="text-sm text-muted">{unitLabel[p.unit]}</span>
          </p>
          <p className="mt-4 text-ink/80">{p.blurb}</p>
          <ul className="mt-6 flex-1 space-y-2.5 text-[0.95rem]">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3">
                <span className="mt-[0.7em] h-px w-3.5 shrink-0 bg-scarlet" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href={`/contact?package=${encodeURIComponent(`${service}: ${p.name}`)}`}
            className={`btn mt-8 self-start ${p.popular ? "btn-primary" : "btn-ghost"}`}
          >
            Ask about {p.name} <Arrow />
          </Link>
        </article>
      ))}
    </div>
  );
}
