"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive hero background: a compact "splat" of tiny data glyphs (0 1 + / < > { })
 * thrown out from the centre of the hero in uneven streaks. The glyphs part around the
 * pointer like liquid and ease back, and a click (or tap) anywhere sends a ripple through.
 * When the page opens, the splat bursts out from the centre.
 *
 * Built to stay light:
 *  - one sprite sheet, so each glyph is a single cheap image copy (no text drawing per frame)
 *  - the loop only runs while something is moving, then it stops completely
 *  - paused off-screen and in background tabs; fewer glyphs on phones
 *  - reduced-motion users get one still frame
 */
const GLYPHS = ["0", "1", "0", "1", "+", "/", "<", ">", "{", "}", "=", "·", "×", "%", "#", "*"];
// [colour, opacity] variants, weighted towards quiet Stone Blue
const VARIANTS: [string, number][] = [
  ["#4E86B3", 0.4],
  ["#4E86B3", 0.62],
  ["#4E86B3", 0.85],
  ["#03203D", 0.5],
  ["#03203D", 0.8],
  ["#EB2F33", 0.75],
];
const VARIANT_WEIGHTS = [5, 6, 4, 3, 2, 1.4];
const CELL = 16;

type Ripple = { x: number; y: number; t: number; power: number };

const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

export default function GlyphField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // One sprite sheet: a row per colour/opacity variant, a column per glyph
    const sheet = document.createElement("canvas");
    sheet.width = GLYPHS.length * CELL * dpr;
    sheet.height = VARIANTS.length * CELL * dpr;
    const sctx = sheet.getContext("2d")!;
    sctx.scale(dpr, dpr);
    sctx.font = "600 11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    sctx.textAlign = "center";
    sctx.textBaseline = "middle";
    VARIANTS.forEach(([colour, alpha], row) => {
      sctx.fillStyle = colour;
      sctx.globalAlpha = alpha;
      GLYPHS.forEach((g, col) => sctx.fillText(g, col * CELL + CELL / 2, row * CELL + CELL / 2));
    });
    const S = CELL * dpr;

    // Glyph state in flat arrays (fast to loop over)
    let n = 0;
    let hx = new Float32Array(0); // home position
    let hy = new Float32Array(0);
    let dx = new Float32Array(0); // offset from home
    let dy = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let sx = new Uint16Array(0); // sprite position in the sheet
    let sy = new Uint16Array(0);

    let W = 0;
    let H = 0;
    let cx = 0;
    let cy = 0;
    const ripples: Ripple[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const pickVariant = () => {
      let r = Math.random() * VARIANT_WEIGHTS.reduce((a, b) => a + b, 0);
      for (let i = 0; i < VARIANT_WEIGHTS.length; i++) if ((r -= VARIANT_WEIGHTS[i]) <= 0) return i;
      return 0;
    };

    /** Lay the glyphs out as a splat: a loose core plus tapering streaks thrown out from the centre. */
    const layout = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      cx = W / 2;
      cy = H * 0.45;
      const small = W < 768;
      const reach = small ? Math.min(W * 0.5, H * 0.36) : Math.min(W * 0.3, H * 0.52); // longest streak
      const stretch = small ? 1 : 1.45; // a little wider than tall on desktop
      n = small ? 620 : 1500;
      hx = new Float32Array(n);
      hy = new Float32Array(n);
      dx = new Float32Array(n);
      dy = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      sx = new Uint16Array(n);
      sy = new Uint16Array(n);

      const rayCount = small ? 12 : 18;
      const rays = Array.from({ length: rayCount }, (_, i) => ({
        angle: (i / rayCount) * Math.PI * 2 + gauss() * 0.22,
        len: reach * (0.36 + Math.random() ** 1.4 * 0.64),
        width: (small ? 7 : 10) + Math.random() ** 2 * (small ? 13 : 24), // a few fat streaks, many thin ones
        weight: 0.5 + Math.random(),
        curl: gauss() * 0.22,
      }));
      const total = rays.reduce((a, b) => a + b.weight, 0);
      const pickRay = () => {
        let r2 = Math.random() * total;
        for (const ray of rays) if ((r2 -= ray.weight) <= 0) return ray;
        return rays[0];
      };

      const core = Math.round(n * 0.24);
      for (let i = 0; i < n; i++) {
        let x: number;
        let y: number;
        if (i < core) {
          const a = Math.random() * Math.PI * 2;
          const rad = Math.sqrt(Math.random()) * reach * (0.2 + Math.abs(gauss()) * 0.12);
          x = Math.cos(a) * rad;
          y = Math.sin(a) * rad;
        } else {
          const ray = pickRay();
          const t = Math.random() ** 0.85; // 0 at the centre, 1 at the tip
          const droplet = Math.random() < 0.07;
          const dist = ray.len * (droplet ? 1.03 + Math.random() * 0.28 : t);
          const side = gauss() * ray.width * (droplet ? 0.6 : 1 - t * 0.7);
          const ang = ray.angle + ray.curl * t;
          x = Math.cos(ang) * dist - Math.sin(ang) * side;
          y = Math.sin(ang) * dist + Math.cos(ang) * side;
        }
        hx[i] = cx + x * stretch;
        hy[i] = cy + y;
        sx[i] = Math.floor(Math.random() * GLYPHS.length) * S;
        sy[i] = pickVariant() * S;
      }
    };

    /** Pull every glyph back to the centre so it eases out to its place: the splat. */
    const burst = () => {
      for (let i = 0; i < n; i++) {
        dx[i] = cx - hx[i];
        dy[i] = cy - hy[i];
        vx[i] = vy[i] = 0;
      }
    };

    let last = 0;
    let raf = 0;
    let running = false;
    let calm = 0; // consecutive frames with nothing moving

    const frame = (now: number) => {
      const dt = last ? Math.min(0.034, (now - last) / 1000) : 0.016;
      last = now;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const R = W < 768 ? 80 : 120;
      const R2 = R * R;
      for (let i = ripples.length - 1; i >= 0; i--) if (now - ripples[i].t > 1900) ripples.splice(i, 1);
      const push = pointer.active;
      let energy = 0;

      for (let i = 0; i < n; i++) {
        // critically damped spring back to the home position: smooth, no wobble
        let ax = -dx[i] * 60 - vx[i] * 15.5;
        let ay = -dy[i] * 60 - vy[i] * 15.5;
        const x = hx[i] + dx[i];
        const y = hy[i] + dy[i];

        if (push) {
          const px = x - pointer.x;
          const py = y - pointer.y;
          const q = px * px + py * py;
          if (q < R2) {
            const dist = Math.sqrt(q) || 1;
            const f = (1 - dist / R) ** 2 * 6500;
            ax += (px / dist) * f;
            ay += (py / dist) * f;
          }
        }
        for (let k = 0; k < ripples.length; k++) {
          const rp = ripples[k];
          const age = (now - rp.t) / 1000;
          const px = x - rp.x;
          const py = y - rp.y;
          const dist = Math.sqrt(px * px + py * py) || 1;
          const gap = Math.abs(dist - age * 560);
          if (gap < 60) {
            const f = (1 - gap / 60) * rp.power * Math.max(0, 1 - age / 1.7);
            ax += (px / dist) * f;
            ay += (py / dist) * f;
          }
        }
        vx[i] += ax * dt;
        vy[i] += ay * dt;
        dx[i] += vx[i] * dt;
        dy[i] += vy[i] * dt;
        energy += Math.abs(vx[i]) + Math.abs(vy[i]);

        ctx.drawImage(sheet, sx[i], sy[i], S, S, ((x - CELL / 2) * dpr) | 0, ((y - CELL / 2) * dpr) | 0, S, S);
      }

      // Nothing moving: leave the last frame on screen and stop working until the next interaction
      calm = energy / n < 0.6 && !ripples.length ? calm + 1 : 0;
      if (calm > 20) {
        running = false;
        return;
      }
      if (running) raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (running) return;
      running = true;
      calm = 0;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    layout();
    if (reduced) {
      frame(performance.now());
      return;
    }

    // Hold the glyphs until the intro fires, so the first thing seen is the burst
    const html = document.documentElement;
    let held = true;
    let visible = true;

    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, inside: e.clientY >= r.top && e.clientY <= r.bottom };
    };
    const onMove = (e: PointerEvent) => {
      if (held || e.pointerType === "touch") return;
      const p = local(e);
      const was = pointer.active;
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = p.inside;
      if ((p.inside || was) && visible) play(); // also wake up once more to let glyphs flow back
    };
    const onDown = (e: PointerEvent) => {
      if (held) return;
      const p = local(e);
      if (!p.inside) return;
      ripples.push({ x: p.x, y: p.y, t: performance.now(), power: 11000 });
      html.classList.add("waved");
      play();
    };
    const onIntro = () => {
      if (!held) return;
      held = false;
      burst();
      if (visible) play();
    };
    const onLeave = () => {
      pointer.active = false;
      if (visible && !held) play();
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!visible) stop();
    });
    io.observe(canvas);
    const onVis = () => document.hidden && stop();
    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const r = canvas.getBoundingClientRect();
        if (Math.abs(r.width - W) < 2 && Math.abs(r.height - H) < 2) return;
        layout();
        if (!held) play();
      }, 120);
    });
    ro.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("webtics:intro", onIntro);
    html.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    // If the intro has already happened (client-side navigation) or never fires, start anyway
    const already = html.classList.contains("intro-go") && !html.dataset.loader;
    const failsafe = window.setTimeout(onIntro, already ? 80 : 6500);

    return () => {
      stop();
      clearTimeout(failsafe);
      clearTimeout(resizeTimer);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("webtics:intro", onIntro);
      html.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
