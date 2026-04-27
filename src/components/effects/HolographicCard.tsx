"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** seconds for one shimmer pass */
  duration?: number;
  /** delay (s) so multiple cards stagger */
  delay?: number;
}

/**
 * HolographicCard – auto-running shimmer + animated gradient border.
 * No mouse interaction required – purely time-based.
 */
export default function HolographicCard({
  children,
  className = "",
  duration = 4,
  delay = 0,
}: Props) {
  return (
    <div className={`abud-holo-card ${className}`} style={{ animationDelay: `${delay}s` }}>
      <div
        aria-hidden
        className="abud-holo-shimmer"
        style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
      />
      <div className="abud-holo-inner">{children}</div>
    </div>
  );
}
