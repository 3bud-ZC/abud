"use client";

interface AnimatedGridProps {
  className?: string;
  /** Grid color, default purple */
  color?: string;
  /** Grid line opacity 0..1, default 0.06 */
  opacity?: number;
}

export default function AnimatedGrid({
  className,
  color = "147,51,234",
  opacity = 0.08,
}: AnimatedGridProps) {
  return (
    <div
      className={className}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        perspective: "1000px",
        maskImage:
          "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-50% -25% 0 -25%",
          height: "200%",
          backgroundImage: `
            linear-gradient(rgba(${color}, ${opacity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${color}, ${opacity}) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "rotateX(60deg)",
          transformOrigin: "center top",
          animation: "abud-grid-scroll 18s linear infinite",
        }}
      />
      <style jsx global>{`
        @keyframes abud-grid-scroll {
          0%   { background-position: 0 0; }
          100% { background-position: 0 60px; }
        }
      `}</style>
    </div>
  );
}
