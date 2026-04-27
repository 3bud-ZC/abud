"use client";

import { motion } from "framer-motion";

interface Props {
  /** Variant of the divider */
  variant?: "wave" | "line" | "fade" | "gradient";
  /** Flip vertically (useful for top vs bottom edges) */
  flip?: boolean;
  /** Custom color (defaults to purple accent) */
  color?: string;
  /** Height in px */
  height?: number;
}

/**
 * SectionDivider — Smooth visual transitions between page sections.
 * Subtle holographic line, wave, or gradient fade.
 */
export default function SectionDivider({
  variant = "line",
  flip = false,
  color = "rgba(168,85,247,0.5)",
  height = 1,
}: Props) {
  if (variant === "line") {
    return (
      <div
        className="relative w-full overflow-hidden"
        style={{ height: `${Math.max(height, 1)}px` }}
        aria-hidden
      >
        <motion.div
          className="absolute inset-y-0 left-0 right-0"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
          }}
        />
        <motion.div
          className="absolute inset-y-0 w-1/3"
          initial={{ x: "-100%" }}
          animate={{ x: "300%" }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
            filter: "blur(1px)",
          }}
        />
      </div>
    );
  }

  if (variant === "fade") {
    return (
      <div
        className="w-full pointer-events-none"
        style={{
          height: `${height}px`,
          background: flip
            ? `linear-gradient(0deg, transparent 0%, rgba(8,8,16,0.95) 50%, #050508 100%)`
            : `linear-gradient(180deg, transparent 0%, rgba(8,8,16,0.95) 50%, #050508 100%)`,
        }}
        aria-hidden
      />
    );
  }

  if (variant === "gradient") {
    return (
      <div
        className="w-full pointer-events-none relative"
        style={{
          height: `${height}px`,
          background:
            "linear-gradient(180deg, rgba(147,51,234,0.0) 0%, rgba(147,51,234,0.08) 50%, rgba(147,51,234,0.0) 100%)",
        }}
        aria-hidden
      >
        <div
          className="absolute inset-x-0 top-1/2 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
            opacity: 0.4,
          }}
        />
      </div>
    );
  }

  // wave
  return (
    <div className="w-full pointer-events-none relative" style={{ height: `${height}px` }} aria-hidden>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(168,85,247,0)" />
            <stop offset="50%" stopColor="rgba(168,85,247,0.5)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,40 C320,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z"
          fill="url(#wave-gradient)"
          animate={{
            d: [
              "M0,40 C320,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z",
              "M0,50 C320,20 720,70 1080,30 C1260,10 1380,55 1440,40 L1440,80 L0,80 Z",
              "M0,40 C320,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
