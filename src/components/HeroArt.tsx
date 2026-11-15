import GlyphImage from "./motion/GlyphImage";

/**
 * Decorative art for the right side of page headers: a simple pictogram from public/art,
 * redrawn in characters like the logo. It assembles on load and parts around the pointer.
 */
export type ArtName = "web-design" | "seo" | "care" | "data" | "automation" | "apps" | "services" | "pricing" | "work" | "journal" | "contact" | "legal";

export default function HeroArt({ name }: { name: ArtName }) {
  return (
    <div aria-hidden="true" className="h-full w-full">
      <GlyphImage src={`/art/${name}.png`} mode="logo" label="" />
    </div>
  );
}
