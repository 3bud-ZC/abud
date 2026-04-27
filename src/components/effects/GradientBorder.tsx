"use client";

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  /** Border thickness in px */
  thickness?: number;
  /** Inner radius (should match child's radius) */
  radius?: number;
  /** Animate rotation */
  animated?: boolean;
}

/**
 * Wraps children with an animated rotating gradient border.
 * Useful for highlighted cards.
 */
export default function GradientBorder({
  children,
  className,
  thickness = 1,
  radius = 16,
  animated = true,
}: GradientBorderProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        borderRadius: radius,
        padding: thickness,
        background:
          "conic-gradient(from var(--abud-gb-angle, 0deg), rgba(147,51,234,0.0) 0deg, rgba(147,51,234,0.0) 200deg, #c084fc 280deg, #7c3aed 320deg, rgba(147,51,234,0.0) 360deg)",
        animation: animated ? "abud-gb-rotate 6s linear infinite" : undefined,
        ["--abud-gb-angle" as any]: "0deg",
      }}
    >
      <div style={{ borderRadius: radius - thickness, overflow: "hidden", height: "100%" }}>
        {children}
      </div>
      <style jsx global>{`
        @property --abud-gb-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes abud-gb-rotate {
          to { --abud-gb-angle: 360deg; }
        }
      `}</style>
    </div>
  );
}
