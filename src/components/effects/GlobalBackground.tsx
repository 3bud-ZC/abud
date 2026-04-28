"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Heavy canvas/animations are loaded only on the client and only when needed.
const MatrixRain = dynamic(() => import("./MatrixRain"), { ssr: false });
const AnimatedGrid = dynamic(() => import("./AnimatedGrid"), { ssr: false });

/**
 * GlobalBackground — A page-wide fixed background layer.
 *  • Matrix Rain (subtle, low opacity, paused when tab is hidden)
 *  • Animated grid overlay
 *  • Radial vignette glow
 *
 * Renders behind all page content (-z-10), `pointer-events-none`,
 * and `position: fixed` so the background stays in place during
 * scroll — giving a parallax feel.
 *
 * Renders ONCE in (site)/layout.tsx so it persists across navigation
 * (no canvas re-init on every route change).
 *
 * Honours `prefers-reduced-motion`: animation layers are skipped,
 * static gradient still renders.
 */
export default function GlobalBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      {/* Static base — radial purple vignette (always rendered) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 0%, rgba(76,29,149,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(109,40,217,0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 15% 75%, rgba(34,211,238,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Animated layers — skipped under reduced-motion */}
      {!reduceMotion && (
        <>
          <MatrixRain opacity={0.09} fontSize={13} fade={0.08} speed={0.85} />
          <AnimatedGrid />
        </>
      )}

      {/* Top-edge gradient fade keeps the navbar area clean */}
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
