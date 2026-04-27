"use client";

import { useMemo } from "react";

interface Orb {
  id: number;
  size: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  hue: number;
  blur: number;
  opacity: number;
}

interface Props {
  count?: number;
  className?: string;
}

/**
 * FloatingOrbs – purely time-based glowing orbs that drift around the section.
 * Each orb has a randomized blur, hue, and animation duration.
 */
export default function FloatingOrbs({ count = 8, className = "" }: Props) {
  const orbs: Orb[] = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: 80 + Math.random() * 220,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: -Math.random() * 20,
      duration: 18 + Math.random() * 22,
      hue: Math.random() < 0.5 ? 270 : Math.random() < 0.5 ? 285 : 220,
      blur: 50 + Math.random() * 60,
      opacity: 0.18 + Math.random() * 0.22,
    }));
  }, [count]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {orbs.map((o) => (
        <span
          key={o.id}
          className="abud-orb"
          style={{
            width: `${o.size}px`,
            height: `${o.size}px`,
            left: `${o.left}%`,
            top: `${o.top}%`,
            filter: `blur(${o.blur}px)`,
            background: `radial-gradient(circle, hsla(${o.hue},90%,65%,${o.opacity}) 0%, transparent 70%)`,
            animationDelay: `${o.delay}s`,
            animationDuration: `${o.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
