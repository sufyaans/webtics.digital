import Link from "next/link";
import { formatPrice, guarantees, unitLabel, type Package } from "@/content/packages";
import { Arrow } from "./Blocks";

function Features({ items, wide = false }: { items: string[]; wide?: boolean }) {
  return (
    <ul className={`space-y-2.5 text-[0.95rem] ${wide ? "sm:columns-2 sm:gap-x-10" : ""}`}>
      {items.map((f) => (
        <li key={f} className="flex break-inside-avoid gap-3">
          <span className="mt-[0.7em] h-px w-3.5 shrink-0 bg-scarlet" aria-hidden="true" />
          {f}
        </li>
      ))}
    </ul>
  );
}

function Extras({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-3 space-y-1 text-sm font-semibold text-scarlet-deep">
      {items.map((e) => (
        <li key={e}>{e}</li>
      ))}
    </ul>
  );
}

const ask = (service: string, name: string) => `/contact?package=${encodeURIComponent(`${service}: ${name}`)}`;

/**
 * Packages for one service.
 * One-off packages sit side by side as ruled columns. Any monthly fee marked placement
 * "below" gets its own card underneath, so what is paid once and what is paid monthly
 * are never mixed up. A guarantee, if the service has one, closes the block.
 */
export default function Packages({ items, service, slug }: { items: Package[]; service: string; slug: string }) {
  const main = items.filter((p) => p.placement !== "below");
  const below = items.filter((p) => p.placement === "below");
  const single = main.length === 1;
  const cols = single ? "" : main.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  const guarantee = guarantees[slug];

  return (
    <div>
      {below.length > 0 && <p className="eyebrow mb-4 text-muted">Paid once</p>}
      <div className={`grid border-t border-ink ${cols}`}>
        {main.map((p, i) => (
          <article
            key={p.name}
            className={`relative flex flex-col border-b border-line py-8 md:border-b-0 md:px-8 md:py-10 ${i > 0 ? "md:border-l md:border-line" : single ? "" : "md:pl-0"} ${p.popular ? "bg-stone-tint/60 px-5 md:!px-8" : ""} ${single ? "md:grid md:grid-cols-12 md:gap-10" : ""}`}
            data-reveal
          >
            {p.popular && !single && <p className="eyebrow absolute right-5 top-4 text-scarlet-deep md:right-8">Most chosen</p>}
            <div className={single ? "md:col-span-5" : ""}>
              <h3 className="h3-serif !text-2xl">{p.name}</h3>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                <span className="numeral text-5xl">{formatPrice(p)}</span>
                <span className="text-sm text-muted">{unitLabel[p.unit]}</span>
              </p>
              <Extras items={p.extras} />
              <p className="mt-4 text-ink/80">{p.blurb}</p>
              <p className="mt-3 text-sm text-muted">
                <span className="font-semibold text-ink">Best for:</span> {p.bestFor}
              </p>
            </div>
            <div className={single ? "mt-6 md:col-span-7 md:mt-0" : "mt-6 flex flex-1 flex-col"}>
              <div className="flex-1">
                <Features items={p.features} wide={single} />
              </div>
              <Link href={ask(service, p.name)} className={`btn mt-8 self-start ${p.popular ? "btn-primary" : "btn-ghost"}`}>
                Ask about {p.name} <Arrow />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {below.map((p) => (
        <div key={p.name} className="mt-10" data-reveal>
          <p className="eyebrow mb-4 text-muted">Paid monthly</p>
          <article className="on-ink grid gap-8 rounded-2xl bg-ink p-7 text-paper md:grid-cols-12 md:gap-10 md:p-10">
            <div className="md:col-span-5">
              {p.tag && <p className="eyebrow text-stone">{p.tag}</p>}
              <h3 className="h3-serif mt-3 !text-2xl">{p.name}</h3>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                <span className="numeral text-5xl">{formatPrice(p)}</span>
                <span className="text-sm text-paper/75">{unitLabel[p.unit]}</span>
              </p>
              <p className="mt-4 text-paper/85">{p.blurb}</p>
            </div>
            <div className="md:col-span-7">
              <ul className="space-y-2.5 text-[0.95rem] sm:columns-2 sm:gap-x-10">
                {p.features.map((f) => (
                  <li key={f} className="flex break-inside-avoid gap-3">
                    <span className="mt-[0.7em] h-px w-3.5 shrink-0 bg-scarlet" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      ))}

      {guarantee && (
        <aside className="mt-10 flex flex-col gap-3 rounded-2xl border border-scarlet-deep/40 bg-scarlet/5 p-6 md:flex-row md:items-center md:gap-8 md:p-8" data-reveal>
          <p className="h3-serif shrink-0 !text-2xl">{guarantee.title}</p>
          <p className="text-ink/85">{guarantee.body}</p>
        </aside>
      )}
    </div>
  );
}
