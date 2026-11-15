"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CaseMeta } from "@/lib/content";
import { BrowserMockup } from "@/components/DeviceMockup";
import Tilt from "@/components/motion/Tilt";

type Item = CaseMeta & { slug: string; readingTime: number };

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
return (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`rounded-full border px-4 py-2 text-sm transition-colors ${active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}
  >
    {children}
  </button>
);
}

export default function WorkIndex({ items, serviceNames }: { items: Item[]; serviceNames: Record<string, string> }) {
  const [service, setService] = useState("all");
  const [sector, setSector] = useState("all");

  const allServices = useMemo(() => [...new Set(items.flatMap((i) => i.services))], [items]);
  const allSectors = useMemo(() => [...new Set(items.map((i) => i.sector))], [items]);
  const shown = items.filter((i) => (service === "all" || i.services.includes(service)) && (sector === "all" || i.sector === sector));

  return (
    <section className="relative z-10 pb-24 md:pb-32">
      <div className="wrap">
        <div className="flex flex-col gap-5 border-y border-line py-6 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter by service" className="flex flex-wrap gap-2">
            <Chip active={service === "all"} onClick={() => setService("all")}>All services</Chip>
            {allServices.map((s) => (
              <Chip key={s} active={service === s} onClick={() => setService(s)}>
                {serviceNames[s] ?? s}
              </Chip>
            ))}
          </div>
          <label className="flex items-center gap-3 text-sm">
            <span className="eyebrow text-muted">Sector</span>
            <select value={sector} onChange={(e) => setSector(e.target.value)} className="rounded-full border border-line bg-paper px-4 py-2">
              <option value="all">All sectors</option>
              {allSectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="sr-only" aria-live="polite">
          {shown.length} case studies shown
        </p>

        <div className="mt-14 grid gap-x-10 gap-y-20 md:grid-cols-12">
          {shown.map((c, i) => {
            // Editorial rhythm: wide, narrow-offset, full… rather than a uniform grid
            const layout = ["md:col-span-7", "md:col-span-5 md:mt-40", "md:col-span-8 md:col-start-3", "md:col-span-6", "md:col-span-6 md:mt-24"][i % 5];
            return (
              <article key={c.slug} className={layout}>
                <Link href={`/work/${c.slug}`} data-cursor="View case study" className="group block">
                  <Tilt max={4}>
                    <BrowserMockup label={c.client} url={c.url} accent={c.accent} src={c.shots ? `/work/${c.shots}-page.jpg` : undefined} alt={`${c.client} website`} scroll />
                  </Tilt>
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <p className="eyebrow text-muted">
                        {c.client} · {c.sector}
                      </p>
                      <h2 className="h3-serif mt-2 transition-colors group-hover:text-scarlet-deep">{c.title}</h2>
                      <p className="mt-3 flex flex-wrap gap-2">
                        {c.services.map((s) => (
                          <span key={s} className="rounded-full bg-stone-tint px-3 py-1 text-xs">
                            {serviceNames[s] ?? s}
                          </span>
                        ))}
                      </p>
                    </div>
                    <span className="numeral text-4xl text-stone">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </Link>
              </article>
            );
          })}
          {shown.length === 0 && <p className="text-muted md:col-span-12">No case studies match those filters yet.</p>}
        </div>
      </div>
    </section>
  );
}
