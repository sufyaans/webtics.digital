"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/content";

type Item = PostMeta & { slug: string; readingTime: number; excerpt: string };

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function BlogIndex({ posts }: { posts: Item[] }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const cats = useMemo(() => ["All", ...new Set(posts.map((p) => p.category))], [posts]);

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const query = q.trim().toLowerCase();
  const filtering = cat !== "All" || query.length > 0;
  const list = posts.filter(
    (p) =>
      (filtering || p.slug !== featured?.slug) &&
      (cat === "All" || p.category === cat) &&
      (!query || `${p.title} ${p.description} ${p.excerpt}`.toLowerCase().includes(query)),
  );

  return (
    <section className="relative z-10 pb-24 md:pb-32">
      <div className="wrap">
        {/* Featured */}
        {featured && !filtering && (
          <Link
            href={`/blog/${featured.slug}`}
            className="on-ink group mb-16 grid gap-8 overflow-hidden rounded-3xl bg-ink p-8 text-paper md:grid-cols-12 md:p-14"
            data-cursor="Read article"
          >
            <div className="md:col-span-8">
              <p className="eyebrow text-stone">Featured · {featured.category}</p>
              <h2 className="display-l mt-6 !text-[clamp(2rem,4.5vw,4.25rem)] transition-transform duration-700 group-hover:translate-x-2">
                {featured.title}
              </h2>
            </div>
            <div className="flex flex-col justify-end gap-4 md:col-span-4">
              <p className="text-paper/80">{featured.description}</p>
              <p className="text-sm text-paper/70">
                {featured.readingTime} min read · {fmt(featured.date)}
              </p>
            </div>
          </Link>
        )}

        {/* Filters */}
        <div className="flex flex-col gap-5 border-y border-line py-6 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${cat === c ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="relative block md:w-72">
            <span className="sr-only">Search articles</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles"
              className="w-full rounded-full border border-line bg-paper px-5 py-2.5 text-sm placeholder:text-muted focus:border-ink"
            />
          </label>
        </div>

        <p className="sr-only" aria-live="polite">
          {list.length} articles shown
        </p>

        {/* List: editorial index, not cards */}
        <ul className="mt-4">
          {list.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group grid gap-3 border-b border-line py-9 transition-colors hover:bg-paper-2 md:grid-cols-12 md:gap-8 md:px-4"
              >
                <span className="numeral text-3xl text-stone md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="md:col-span-7">
                  <span className="eyebrow text-scarlet-deep">{p.category}</span>
                  <span className="h3-serif mt-2 block transition-transform duration-500 group-hover:translate-x-2">{p.title}</span>
                </span>
                <span className="text-muted md:col-span-3">{p.description}</span>
                <span className="text-sm text-muted md:col-span-1 md:text-right">{p.readingTime} min</span>
              </Link>
            </li>
          ))}
        </ul>
        {list.length === 0 && <p className="py-10 text-muted">No articles match that yet. Try another word or category.</p>}
      </div>
    </section>
  );
}
