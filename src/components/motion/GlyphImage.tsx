"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";

/**
 * Redraws an image out of characters, symbols and numbers, and makes it react to the pointer.
 *
 *   mode="logo"      keeps the image's own colours (scarlet and Egyptian Blue for the Webtics logo)
 *                    and fills its shape with data glyphs: 0 1 + / < > { } = % #
 *   mode="portrait"  turns a photo into a one-colour character portrait: darker areas get
 *                    denser characters, and the edges dissolve instead of ending in a hard box
 *
 * The characters fly in and assemble when the picture scrolls into view. Moving the pointer
 * over it pushes them aside like liquid and they flow back; a click sends a ripple through it.
 * Plain 2D canvas. Pauses off-screen. Reduced-motion users get a still picture.
 */
type Mode = "logo" | "portrait";
type Dot = { tx: number; ty: number; x: number; y: number; vx: number; vy: number; ch: string; col: string; a: number; delay: number; ph: number };
type Ripple = { x: number; y: number; t: number };

const LOGO_CHARS = "0101010011+/<>{}=%#*".split("");
const RAMP = " .:-=+*#%@".split(""); // light to dark
const INK = "#03203D";
const SCARLET = "#EB2F33";

export default function GlyphImage({
  src,
  mode,
  label,
  className = "",
  cell,
  underlay,
}: {
  /** Optional picture shown faintly beneath the characters, so fine detail (a face) still reads */
  underlay?: string;
  src: string;
  mode: Mode;
  /** Text alternative for screen readers */
  label: string;
  className?: string;
  /** Character width in px. Smaller = more detail, more work. */
  cell?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let fs = 9;
    let dots: Dot[] = [];
    let byColour: Record<string, Dot[]> = {};
    const ripples: Ripple[] = [];
    const pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999, active: false };
    let img: HTMLImageElement | null = null;
    let born = 0; // when the assemble animation started
    let running = false;
    let raf = 0;
    let visible = false;
    let prev = 0; // previous frame time, so motion runs at the same speed on any refresh rate

    const build = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      if (!W || !H || !img) return;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      const cw = cell ?? (mode === "logo" ? (W < 420 ? 5.5 : 7) : W < 300 ? 4 : 4.6);
      const ch = cw * 1.5;
      fs = cw * 1.42;

      // fit the image inside the canvas, keeping its proportions
      const pad = mode === "logo" ? 0.08 : 0;
      const ratio = img.naturalWidth / img.naturalHeight;
      let bw = W * (1 - pad * 2);
      let bh = bw / ratio;
      if (bh > H * (1 - pad * 2)) {
        bh = H * (1 - pad * 2);
        bw = bh * ratio;
      }
      const bx = (W - bw) / 2;
      const by = (H - bh) / 2;
      const cols = Math.max(4, Math.floor(bw / cw));
      const rows = Math.max(4, Math.floor(bh / ch));

      // let the browser average the image down to one pixel per character
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.imageSmoothingQuality = "high";
      octx.drawImage(img, 0, 0, cols, rows);
      const px = octx.getImageData(0, 0, cols, rows).data;

      // portrait: stretch the photo's tones so the darkest and lightest parts use the full range
      let lo = 0;
      let hi = 1;
      let cutout = false; // a photo with a transparent background keeps its own outline
      if (mode === "portrait") {
        const lum: number[] = [];
        for (let i = 0; i < px.length; i += 4) {
          if (px[i + 3] < 128) {
            cutout = true;
            continue;
          }
          lum.push((0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255);
        }
        const sorted = [...lum].sort((a, b) => a - b);
        lo = sorted[Math.floor(sorted.length * 0.03)];
        hi = sorted[Math.floor(sorted.length * 0.97)];
      }

      const scatter = Math.max(W, H) * 0.55;
      dots = [];
      for (let row = 0; row < rows; row++) {
        for (let c = 0; c < cols; c++) {
          const i = (row * cols + c) * 4;
          const R = px[i];
          const G = px[i + 1];
          const B = px[i + 2];
          const A = px[i + 3];
          let chr: string;
          let col: string;
          let a: number;
          if (mode === "logo") {
            if (A < 90) continue;
            col = R > 140 && G < 120 ? SCARLET : INK;
            chr = LOGO_CHARS[Math.floor(Math.random() * LOGO_CHARS.length)];
            a = (0.6 + Math.random() * 0.4) * Math.min(1, A / 200);
          } else {
            if (A < 110) continue;
            const l = Math.min(1, Math.max(0, ((0.2126 * R + 0.7152 * G + 0.0722 * B) / 255 - lo) / (hi - lo || 1)));
            const dark = Math.pow(1 - l, cutout ? 1.5 : 0.9); // push mid-tones lighter so faces keep their detail
            // soft oval edge so the portrait dissolves outwards instead of ending in a box
            const nx = (c + 0.5) / cols - 0.5;
            const ny = (row + 0.5) / rows - 0.5;
            const e = Math.sqrt(nx * nx * 4 + ny * ny * 3.4);
            const oval = Math.min(1, Math.max(0, (1.04 - e) / 0.3)) * (0.82 + Math.random() * 0.18);
            // a cut-out only needs its bottom edge dissolved, so it does not end in a hard line
            const foot = Math.min(1, Math.max(0, (1 - (row + 0.5) / rows) / 0.16));
            const mask = cutout ? (Math.random() < foot ? 1 : 0) * (A / 255) : oval;
            // keep a faint texture in the lightest areas (a white shirt) so the figure stays whole
            const v = Math.max(cutout ? 0.1 : 0, dark) * mask;
            if (v < 0.07) continue;
            chr = RAMP[Math.min(RAMP.length - 1, Math.round(v * (RAMP.length - 1)))];
            if (chr === " ") continue;
            col = INK;
            a = 0.3 + v * 0.7;
          }
          const tx = bx + (c + 0.5) * cw;
          const ty = by + (row + 0.5) * ch;
          dots.push({
            tx,
            ty,
            x: tx + (Math.random() - 0.5) * scatter,
            y: ty + (Math.random() - 0.5) * scatter,
            vx: 0,
            vy: 0,
            ch: chr,
            col,
            a,
            delay: Math.random() * 0.45,
            ph: Math.random() * Math.PI * 2,
          });
        }
      }
      byColour = {};
      for (const d of dots) (byColour[d.col] ??= []).push(d);
    };

    const draw = (now: number, still = false) => {
      const t = (now - born) / 1000;
      const step = prev ? Math.min(3, (now - prev) / 16.667) : 1; // 1 = one 60fps frame
      prev = now;
      const damp = Math.pow(0.86, step);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.font = `600 ${fs}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // ease the pointer so the push feels fluid rather than twitchy
      pointer.sx += (pointer.x - pointer.sx) * Math.min(1, 0.18 * step);
      pointer.sy += (pointer.y - pointer.sy) * Math.min(1, 0.18 * step);
      const R = Math.min(150, Math.max(60, Math.min(W, H) * 0.24));
      for (let i = ripples.length - 1; i >= 0; i--) if (now - ripples[i].t > 1800) ripples.splice(i, 1);

      let off = 0;
      for (const col in byColour) {
        ctx.fillStyle = col;
        for (const d of byColour[col]) {
          if (still) {
            ctx.globalAlpha = d.a;
            ctx.fillText(d.ch, d.tx, d.ty);
            continue;
          }
          const life = t - d.delay;
          if (life < 0) continue;
          const settle = 1 - (1 - Math.min(life / 2.2, 1)) ** 3; // spring stiffens as the picture forms

          if (pointer.active) {
            const dx = d.x - pointer.sx;
            const dy = d.y - pointer.sy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < R && dist > 0) {
              const f = (1 - dist / R) ** 1.5 * 7 * step;
              d.vx += (dx / dist) * f;
              d.vy += (dy / dist) * f;
            }
          }
          for (const rp of ripples) {
            const age = (now - rp.t) / 1000;
            const dx = d.x - rp.x;
            const dy = d.y - rp.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const gap = Math.abs(dist - age * 420);
            if (gap < 46) {
              const f = (1 - gap / 46) * 2.6 * Math.max(0, 1 - age / 1.6) * step;
              d.vx += (dx / dist) * f;
              d.vy += (dy / dist) * f;
            }
          }
          // a slow wave runs through the settled picture so it always feels alive
          const wx = Math.sin(t * 0.9 + d.ty * 0.035 + d.ph * 0.15) * 0.9 * settle;
          const wy = Math.cos(t * 0.7 + d.tx * 0.03) * 0.6 * settle;
          const k = 0.012 + settle * 0.085;
          d.vx += (d.tx + wx - d.x) * k * step;
          d.vy += (d.ty + wy - d.y) * k * step;
          d.vx *= damp;
          d.vy *= damp;
          d.x += d.vx * step;
          d.y += d.vy * step;
          off += Math.abs(d.tx - d.x) + Math.abs(d.ty - d.y);

          const fade = 1 - (1 - Math.min(life / 1.3, 1)) ** 2;
          const shimmer = Math.sin(t * 2 + d.ph) * 0.08;
          ctx.globalAlpha = Math.max(0, Math.min(1, d.a * fade + shimmer));
          ctx.fillText(d.ch, d.x, d.y);
        }
      }
      ctx.globalAlpha = 1;
      if (!still) spread = off / (dots.length || 1);
    };

    let calm = 0;
    let spread = 99; // average distance of the characters from their places, updated every frame
    const loop = (now: number) => {
      draw(now);
      // Once the picture has formed and nothing is touching it, stop working until the next interaction
      // judged by where the characters are, not by the clock, so slow devices still finish the picture
      const formed = (now - born) / 1000 > 1.5 && spread < 2.2;
      calm = formed && !pointer.active && !ripples.length ? calm + 1 : 0;
      if (calm > 50) {
        running = false;
        return;
      }
      if (running) raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (running || reduced || !dots.length) return;
      if (!born) born = performance.now();
      running = true;
      prev = 0;
      calm = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const image = new window.Image(); // the browser image object, not the Next.js component
    image.decoding = "async";
    image.onload = () => {
      img = image;
      build();
      if (reduced) draw(performance.now(), true);
      else if (visible) play();
    };
    image.src = src;

    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      return { x, y, inside: x >= -40 && y >= -40 && x <= r.width + 40 && y <= r.height + 40 };
    };
    const onMove = (e: PointerEvent) => {
      const p = local(e);
      if (!pointer.active && p.inside) {
        pointer.sx = p.x;
        pointer.sy = p.y;
      }
      const was = pointer.active;
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = p.inside;
      if ((p.inside || was) && visible) play();
    };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      if (!p.inside) return;
      ripples.push({ x: p.x, y: p.y, t: performance.now() });
      if (visible) play();
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") pointer.active = false;
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) setShown(true);
        if (visible && !document.hidden) play();
        else stop();
      },
      { threshold: 0.15 },
    );
    io.observe(canvas);
    const onVis = () => (document.hidden || !visible ? stop() : play());

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const r = canvas.getBoundingClientRect();
        if (Math.abs(r.width - W) < 2 && Math.abs(r.height - H) < 2) return;
        build();
        if (reduced) draw(performance.now(), true);
      }, 150);
    });
    ro.observe(canvas);

    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      document.addEventListener("visibilitychange", onVis);
    }
    return () => {
      stop();
      clearTimeout(resizeTimer);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [src, mode, cell]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      {underlay && (
        <NextImage
          src={underlay}
          alt=""
          fill
          sizes="(min-width: 1024px) 464px, 90vw"
          className="object-contain transition-opacity duration-[2500ms] ease-out"
          style={{ opacity: shown ? 0.42 : 0, transitionDelay: "900ms" }}
        />
      )}
      <canvas ref={ref} role={label ? "img" : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true} className="relative block h-full w-full" />
    </div>
  );
}
