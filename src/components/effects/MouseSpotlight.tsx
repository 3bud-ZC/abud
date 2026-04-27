"use client";

import { useEffect, useRef } from "react";

interface MouseSpotlightProps {
  className?: string;
  /** Spotlight radius in px, default 380 */
  size?: number;
  /** Spotlight color rgba string, default purple */
  color?: string;
}

export default function MouseSpotlight({
  className,
  size = 380,
  color = "rgba(147,51,234,0.18)",
}: MouseSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
    };

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.background = `radial-gradient(${size}px circle at ${cx}px ${cy}px, ${color}, transparent 70%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [size, color]);

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
}
