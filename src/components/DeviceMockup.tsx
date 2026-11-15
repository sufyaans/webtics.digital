import Image from "next/image";

type Accent = "ink" | "stone" | "scarlet";

const accents: Record<Accent, { bg: string; block: string; text: string }> = {
  ink: { bg: "#03203D", block: "#639CC5", text: "#FAF8F4" },
  stone: { bg: "#E4EDF5", block: "#03203D", text: "#03203D" },
  scarlet: { bg: "#FAF8F4", block: "#EB2F33", text: "#03203D" },
};

/** Stylised screen used until real screenshots are supplied. */
function PlaceholderScreen({ label, accent = "ink", compact = false }: { label: string; accent?: Accent; compact?: boolean }) {
  const a = accents[accent];
  return (
    <div className="flex h-full w-full flex-col p-[6%]" style={{ background: a.bg, color: a.text }}>
      <div className="flex items-center justify-between text-[0.55em] opacity-80">
        <span className="font-semibold">{label}</span>
        {!compact && <span className="tracking-widest">···</span>}
      </div>
      <div className="mt-[10%] h-[0.9em] w-[70%] rounded-sm" style={{ background: a.text, opacity: 0.9 }} />
      <div className="mt-[3%] h-[0.9em] w-[52%] rounded-sm" style={{ background: a.text, opacity: 0.9 }} />
      <div className="mt-[6%] h-[0.5em] w-[40%] rounded-sm opacity-50" style={{ background: a.text }} />
      <div className="mt-[6%] h-[1.4em] w-[24%] rounded-full" style={{ background: "#C8202A" }} />
      <div className={`mt-auto grid gap-[3%] ${compact ? "grid-cols-1" : "grid-cols-3"}`}>
        {Array.from({ length: compact ? 1 : 3 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] rounded" style={{ background: a.block, opacity: 0.25 + i * 0.2 }} />
        ))}
      </div>
      <span className="mt-[4%] self-start rounded-sm border border-dashed px-1 font-mono text-[0.45em] opacity-70">
        [SCREENSHOT TO SUPPLY]
      </span>
    </div>
  );
}

export function BrowserMockup({
  src,
  alt = "",
  label = "Client website",
  url,
  accent,
  className = "",
  priority = false,
  scroll = false,
}: {
  src?: string;
  /** With a full-page screenshot: the page scrolls inside the frame on hover */
  scroll?: boolean;
  alt?: string;
  label?: string;
  url?: string;
  accent?: Accent;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-xl bg-white shadow-[0_30px_80px_-30px_rgba(3,32,61,0.45)] ring-1 ring-ink/10 ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-paper-2 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-3 truncate rounded-full bg-white px-3 py-0.5 font-mono text-[10px] text-muted">
          {url ?? label.toLowerCase().replace(/\s+/g, "") + ".co.uk"}
        </span>
      </div>
      <div className={`relative aspect-[16/10] overflow-hidden text-[clamp(10px,1.6vw,20px)] ${scroll ? "shot-scroll" : ""}`}>
        {src ? (
          <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover object-top" priority={priority} />
        ) : (
          <PlaceholderScreen label={label} accent={accent} />
        )}
      </div>
    </div>
  );
}

export function PhoneMockup({ src, alt = "", label = "Client", accent, className = "" }: { src?: string; alt?: string; label?: string; accent?: Accent; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[1.6rem] border-[6px] border-ink bg-ink shadow-[0_30px_60px_-25px_rgba(3,32,61,0.55)] ${className}`}>
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.1rem] text-[clamp(8px,1.1vw,14px)]">
        {src ? <Image src={src} alt={alt} fill sizes="200px" className="object-cover object-top" /> : <PlaceholderScreen label={label} accent={accent} compact />}
      </div>
    </div>
  );
}
