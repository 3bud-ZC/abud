"use client";

import dynamic from "next/dynamic";

const MatrixRain = dynamic(() => import("./MatrixRain"), { ssr: false });
const AnimatedGrid = dynamic(() => import("./AnimatedGrid"), { ssr: false });

/**
 * GlobalBackground — A page-wide fixed background layer.
 *  • Matrix Rain (subtle, low opacity)
 *  • Animated grid overlay
 *  • Radial vignette glow
 *
 * Renders behind all page content (-z-10) and is `pointer-events-none`
 * so it never intercepts clicks. Uses `position: fixed` so it stays in
 * place during scroll — gives a parallax / "world is alive" feel.
 *
 * Drop this once near the top of a page wrapper; sections above it
 * should have transparent (or near-transparent) backgrounds so it
 * shows through.
 */
export default function GlobalBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      {/* Base layer — radial purple vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 0%, rgba(76,29,149,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(109,40,217,0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 15% 75%, rgba(34,211,238,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Matrix rain — subtle so it doesn't drown text */}
      <MatrixRain opacity={0.09} fontSize={13} fade={0.08} speed={0.85} />

      {/* Animated grid lines */}
      <AnimatedGrid />

      {/* Top-edge gradient fade so the navbar area stays clean */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,4,8,0.85) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
