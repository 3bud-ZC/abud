"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  /** percentage 0–100 */
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
  color?: string;
}

/**
 * AnimatedBar – progress bar that fills from 0 → `to` when scrolled into view.
 */
export default function AnimatedBar({
  to,
  duration = 1.4,
  delay = 0,
  className = "",
  color = "linear-gradient(90deg,#7c3aed,#a855f7,#22d3ee)",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative h-1.5 w-full overflow-hidden rounded-full ${className}`}
      style={{ background: "rgba(255,255,255,0.05)" }}
    >
      <div
        className="abud-bar-fill h-full rounded-full"
        style={{
          width: active ? `${Math.min(100, Math.max(0, to))}%` : "0%",
          transition: `width ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
          background: color,
          boxShadow: active ? "0 0 12px rgba(168,85,247,0.6)" : "none",
        }}
      />
    </div>
  );
}
