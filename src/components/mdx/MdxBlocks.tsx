import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "@/lib/content";
import { BrowserMockup, PhoneMockup } from "../DeviceMockup";
import XRay from "../XRay";

/**
 * Reusable layout blocks for blog posts and case studies.
 * Use them straight inside any .mdx file, e.g. <PullQuote>…</PullQuote>
 */

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) return textOf((node as { props: { children?: ReactNode } }).props.children);
  return "";
}

export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className="not-prose my-14 border-l-2 border-scarlet pl-6 md:-mx-16 md:pl-10">
      <blockquote className="font-display text-3xl leading-[1.15] tracking-tight md:text-[2.6rem]">{children}</blockquote>
      {cite && <figcaption className="mt-4 text-sm text-muted">{cite}</figcaption>}
    </figure>
  );
}

export function Callout({ title = "Worth knowing", children, tone = "stone" }: { title?: string; children: ReactNode; tone?: "stone" | "scarlet" }) {
  return (
    <aside className={`my-10 rounded-xl p-6 md:p-8 ${tone === "stone" ? "bg-stone-tint" : "bg-scarlet/10"}`}>
      <p className="eyebrow text-ink">{title}</p>
      <div className="mt-3 text-[1.02rem] [&>p+p]:mt-3">{children}</div>
    </aside>
  );
}

export function StatRow({ children }: { children: ReactNode }) {
  return <div className="my-12 grid gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-3">{children}</div>;
}

export function Stat({ value, label }: { value: string; label: string }) {
  const ph = value.startsWith("[");
  return (
    <div className="bg-paper p-6">
      <p className={`numeral ${ph ? "text-base" : "text-5xl"}`}>{ph ? <span className="ph">{value}</span> : value}</p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}

export function FullBleed({ src, alt, caption, tall = false }: { src?: string; alt?: string; caption?: string; tall?: boolean }) {
  return (
    <figure className="relative left-1/2 my-14 w-screen -translate-x-1/2">
      <div className={`relative mx-auto max-w-[110rem] overflow-hidden bg-stone-tint md:rounded-xl ${tall ? "aspect-[4/5] md:aspect-[16/11]" : "aspect-[21/9]"} ${tall ? "shot-scroll" : ""}`}>
        {src ? (
          <Image src={src} alt={alt ?? ""} fill sizes="100vw" className={`object-cover ${tall ? "object-top" : ""}`} />
        ) : (
          <div className="grid h-full place-items-center">
            <span className="ph">[FULL-WIDTH IMAGE TO SUPPLY]</span>
          </div>
        )}
      </div>
      {caption && <figcaption className="wrap mt-3 text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

export function TwoCol({ children, image, alt = "", reverse = false }: { children: ReactNode; image?: string; alt?: string; reverse?: boolean }) {
  return (
    <div className={`my-14 grid items-center gap-8 md:-mx-16 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div className="[&>p+p]:mt-4">{children}</div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-tint">
        {image ? <Image src={image} alt={alt} fill sizes="50vw" className="object-cover" /> : <div className="grid h-full place-items-center"><span className="ph">[IMAGE]</span></div>}
      </div>
    </div>
  );
}

export function BeforeAfter({ before, after }: { before: string; after: string }) {
  return (
    <div className="my-12 grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-2">
      <div className="bg-paper p-6">
        <p className="eyebrow text-muted">Before</p>
        <p className="mt-3">{before}</p>
      </div>
      <div className="bg-ink p-6 text-paper">
        <p className="eyebrow text-stone">After</p>
        <p className="mt-3">{after}</p>
      </div>
    </div>
  );
}

export function Gallery({ children }: { children: ReactNode }) {
  return <div className="my-14 grid gap-4 md:-mx-16 md:grid-cols-3 [&>figure:first-child]:md:col-span-2 [&>figure:first-child]:md:row-span-2">{children}</div>;
}

export function GalleryItem({ src, alt = "", caption }: { src?: string; alt?: string; caption?: string }) {
  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-tint">
        {src ? <Image src={src} alt={alt} fill sizes="50vw" className="object-cover" /> : <div className="grid h-full place-items-center"><span className="ph">[IMAGE]</span></div>}
      </div>
      {caption && <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

export function Devices({ label, url, accent }: { label: string; url?: string; accent?: "ink" | "stone" | "scarlet" }) {
  return (
    <div className="relative my-16 md:-mx-24">
      <BrowserMockup label={label} url={url} accent={accent} />
      <PhoneMockup label={label} accent={accent} className="absolute -bottom-8 right-4 w-[20%]" />
    </div>
  );
}

export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <aside className="my-10 rounded-xl border border-line bg-white/60 p-6 md:p-8" aria-label="Key takeaways">
      <p className="eyebrow text-scarlet-deep">Key takeaways</p>
      <ul className="mt-4 space-y-3">
        {items.map((t) => (
          <li key={t} className="flex gap-3">
            <span className="mt-[0.7em] h-px w-4 shrink-0 bg-scarlet" aria-hidden="true" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function InlineCta({ title = "Want us to check your website?", href = "/contact#audit", label = "Get a free website audit" }: { title?: string; href?: string; label?: string }) {
  return (
    <aside className="on-ink my-14 flex flex-col gap-5 rounded-2xl bg-ink p-8 text-paper md:-mx-16 md:flex-row md:items-center md:justify-between md:p-10">
      <p className="font-display text-2xl leading-tight md:text-3xl">{title}</p>
      <Link href={href} className="btn btn-primary shrink-0 self-start md:self-auto">
        {label}
      </Link>
    </aside>
  );
}

export function H2({ children }: { children?: ReactNode }) {
  return <h2 id={slugify(textOf(children))}>{children}</h2>;
}
export function H3({ children }: { children?: ReactNode }) {
  return <h3 id={slugify(textOf(children))}>{children}</h3>;
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
  PullQuote,
  Callout,
  StatRow,
  Stat,
  FullBleed,
  TwoCol,
  BeforeAfter,
  Gallery,
  GalleryItem,
  Devices,
  KeyTakeaways,
  InlineCta,
  XRay,
  BrowserMockup,
  PhoneMockup,
};
