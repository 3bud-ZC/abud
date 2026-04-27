"use client";

interface Props {
  /** seconds for one full pass */
  duration?: number;
  /** "horizontal" sweeps top→bottom, "vertical" sweeps left→right */
  direction?: "horizontal" | "vertical";
  className?: string;
  color?: string;
}

/**
 * ScanLine – CRT-style scanning beam that moves automatically.
 */
export default function ScanLine({
  duration = 6,
  direction = "horizontal",
  className = "",
  color = "rgba(168,85,247,0.55)",
}: Props) {
  const isH = direction === "horizontal";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className={isH ? "abud-scanline-h" : "abud-scanline-v"}
        style={{
          animationDuration: `${duration}s`,
          background: isH
            ? `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`
            : `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
        }}
      />
    </div>
  );
}
