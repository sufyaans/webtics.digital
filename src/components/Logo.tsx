import Image from "next/image";

/**
 * Webtics emblem: the original supplied artwork (public/brand/webtics-logo.png),
 * used as-is. Swap that file for the final SVG when it arrives and update SRC below.
 *
 * tone="dark"       for Egyptian Blue backgrounds: sits the artwork on an off-white tile,
 *                   because the navy strands would disappear on navy.
 * tone="silhouette" a single-colour off-white version for faint watermarks.
 */
const SRC = "/brand/webtics-logo.png";
const W = 893;
const H = 714;

type EmblemProps = {
  className?: string;
  /** Alt text. Leave empty when the wordmark or a label sits beside it. */
  title?: string;
  tone?: "light" | "dark" | "silhouette";
  /** Rendered width hint for the image optimiser, e.g. "48px" */
  sizes?: string;
  priority?: boolean;
};

export function Emblem({ className = "", title = "", tone = "light", sizes = "(min-width: 768px) 480px, 80vw", priority = false }: EmblemProps) {
  const img = (
    <Image
      src={SRC}
      alt={title}
      width={W}
      height={H}
      sizes={sizes}
      priority={priority}
      className={tone === "dark" ? "h-full w-auto" : className}
      style={tone === "silhouette" ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  );
  if (tone !== "dark") return img;
  return <span className={`inline-flex items-center justify-center rounded-[0.35em] bg-paper p-[0.22em] ${className}`}>{img}</span>;
}

type WordmarkProps = { tone?: "light" | "dark"; className?: string; font?: string };

export function Wordmark({ tone = "light", className = "", font }: WordmarkProps) {
  return (
    <span
      className={`inline-flex items-baseline gap-[0.28em] leading-none ${className}`}
      style={{ fontFamily: font ?? "var(--font-mark)", color: tone === "dark" ? "#FAF8F4" : "#03203D" }}
    >
      <span style={{ fontWeight: 700, letterSpacing: "-0.03em" }}>Webtics</span>
      <span style={{ fontWeight: 400, fontSize: "0.72em", letterSpacing: "0.01em", opacity: 0.85 }}>Digital</span>
    </span>
  );
}

export function LogoHorizontal({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Emblem tone={tone} className={tone === "dark" ? "h-[1.9em]" : "h-[1.6em] w-auto"} sizes="64px" priority />
      <Wordmark tone={tone} />
    </span>
  );
}

/** Full lockup (emblem + wordmark in one image). On navy it sits on an off-white tile so the navy strands stay visible. */
export function LogoFull({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  const img = (
    <Image src="/brand/webtics-logo-full.webp" alt="Webtics Digital" width={1000} height={231} sizes="220px" priority className="h-full w-auto" />
  );
  if (!onDark) return <span className={`inline-flex ${className}`}>{img}</span>;
  return <span className={`inline-flex rounded-lg bg-paper px-3 py-1.5 ${className}`}>{img}</span>;
}

export function LogoStacked({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <Emblem tone={tone} className={tone === "dark" ? "h-[3.6em]" : "h-[3em] w-auto"} sizes="160px" />
      <Wordmark tone={tone} />
    </span>
  );
}
