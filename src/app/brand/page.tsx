import type { Metadata } from "next";
import { Emblem, Wordmark, LogoHorizontal, LogoStacked } from "@/components/Logo";
import { Eyebrow, PageHero } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Brand and design system | Webtics Digital",
  robots: { index: false, follow: false },
};

const colours = [
  { name: "Egyptian Blue", hex: "#03203D", role: "Ink: text, headings, dark bands", fg: "#FAF8F4" },
  { name: "Scarlet Red", hex: "#EB2F33", role: "Accent: large type, graphics", fg: "#03203D" },
  { name: "Scarlet Deep", hex: "#C8202A", role: "Buttons and small accent text", fg: "#FFFFFF" },
  { name: "Stone Blue", hex: "#639CC5", role: "Charts, thread, tags, text on ink", fg: "#03203D" },
  { name: "Off-white", hex: "#FAF8F4", role: "Page background", fg: "#03203D" },
  { name: "Muted", hex: "#5A6573", role: "Captions, notes", fg: "#FAF8F4" },
  { name: "Line", hex: "#D9DEE3", role: "Rules and borders", fg: "#03203D" },
];

const contrast = [
  ["Egyptian Blue on Off-white", "15.49:1", "AAA, all text"],
  ["Stone Blue on Egyptian Blue", "5.55:1", "AA, all text"],
  ["White on Scarlet Deep", "5.68:1", "AA, buttons"],
  ["Muted on Off-white", "5.59:1", "AA, captions"],
  ["Scarlet on Off-white", "3.97:1", "Large text and graphics only"],
  ["White on Scarlet", "4.21:1", "Fails for small text: use Scarlet Deep"],
  ["Stone Blue on Off-white", "2.79:1", "Graphics only, never text"],
];

export default function Brand() {
  return (
    <>
      <PageHero eyebrow="Internal · not indexed" title={"Brand and\ndesign system."} lede="Logo variations for sign-off, the colour palette with contrast ratios, the type scale and the motion rules. This page is hidden from search engines." />

      <section className="relative z-10 py-16">
        <div className="wrap">
          <Eyebrow className="text-muted">Emblem: original artwork</Eyebrow>
          <p className="mt-4 max-w-2xl text-muted">
            The site uses the supplied logo file as it is (<code>public/brand/webtics-logo.png</code>). On Egyptian Blue it
            sits on an off-white tile, because the navy strands would disappear on navy. A single-colour version is used
            for faint watermarks. Swap in the final SVG in <code>src/components/Logo.tsx</code> when it arrives.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <figure className="rounded-2xl border border-line p-8">
              <Emblem className="mx-auto h-40 w-auto" title="Webtics Digital logo" />
              <figcaption className="mt-6 text-sm text-muted">On light backgrounds</figcaption>
            </figure>
            <figure className="rounded-2xl bg-ink p-8 text-center">
              <Emblem tone="dark" className="mx-auto h-40" />
              <figcaption className="mt-6 text-left text-sm text-paper/70">On Egyptian Blue: off-white tile</figcaption>
            </figure>
            <figure className="rounded-2xl bg-ink p-8">
              <Emblem tone="silhouette" className="mx-auto h-40 w-auto" />
              <figcaption className="mt-6 text-sm text-paper/70">Single-colour, for watermarks</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16">
        <div className="wrap">
          <Eyebrow className="text-muted">Wordmark: font options (all open-source)</Eyebrow>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {[
              ["Urbanist (in use)", "var(--font-urbanist)"],
              ["System fallback", "system-ui"],
            ].map(([n, f]) => (
              <div key={n} className="flex flex-wrap items-center justify-between gap-6 py-8">
                <Wordmark className="text-5xl" font={f} />
                <span className="text-sm text-muted">{n}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">Fredoka and Comfortaa are the other two candidates. They can be loaded for side-by-side comparison on request.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="grid place-items-center rounded-2xl border border-line p-12 text-3xl"><LogoHorizontal /></div>
            <div className="grid place-items-center rounded-2xl bg-ink p-12 text-3xl" style={{ ["--mark-bg" as string]: "#03203D" }}><LogoHorizontal tone="dark" /></div>
            <div className="grid place-items-center rounded-2xl border border-line p-12 text-3xl"><LogoStacked /></div>
            <div className="grid place-items-center rounded-2xl bg-ink p-12 text-3xl" style={{ ["--mark-bg" as string]: "#03203D" }}><LogoStacked tone="dark" /></div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16">
        <div className="wrap">
          <Eyebrow className="text-muted">Colour</Eyebrow>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colours.map((c) => (
              <div key={c.hex} className="overflow-hidden rounded-2xl border border-line">
                <div className="flex h-32 items-end p-4 font-mono text-sm" style={{ background: c.hex, color: c.fg }}>{c.hex}</div>
                <div className="p-4">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-muted">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
          <table className="mt-10 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink">
                <th className="py-3">Pairing</th>
                <th className="py-3">Ratio</th>
                <th className="py-3">WCAG 2.2</th>
              </tr>
            </thead>
            <tbody>
              {contrast.map(([a, b, c]) => (
                <tr key={a} className="border-b border-line">
                  <td className="py-3">{a}</td>
                  <td className="py-3 font-mono">{b}</td>
                  <td className="py-3">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="relative z-10 py-16">
        <div className="wrap">
          <Eyebrow className="text-muted">Type</Eyebrow>
          <div className="mt-8 space-y-8 border-t border-line pt-8">
            <p className="display-xl">Display XL</p>
            <p className="display-l">Display L, Fraunces</p>
            <p className="h2-serif">Heading 2, for section titles</p>
            <p className="h3-serif">Heading 3, for items and cards</p>
            <p className="lede max-w-2xl">Lede, Inter. Short, plain sentences that say what we do and why it matters.</p>
            <p className="max-w-2xl">Body, Inter 17px with a 1.7 line height for comfortable reading on any screen.</p>
            <p className="eyebrow">Eyebrow label</p>
            <p className="numeral text-7xl">01 02 03</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-28 pt-16">
        <div className="wrap">
          <Eyebrow className="text-muted">Motion rules</Eyebrow>
          <ul className="prose-w mt-6 max-w-3xl">
            <li>Headlines rise line by line from a mask. The hero animation is pure CSS so it never waits for JavaScript.</li>
            <li>Content fades and rises once as it enters the screen. It never re-animates on the way back up.</li>
            <li>The Thread draws itself down the homepage as you scroll, and passes behind dark sections.</li>
            <li>The 3D scenes load after the page is idle, pause when off-screen and are replaced by the flat logo for reduced-motion users.</li>
            <li>Page changes use the browser&apos;s View Transitions: the old page falls away and a new sheet slides up.</li>
            <li>Every motion is switched off when <code>prefers-reduced-motion</code> is on.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
