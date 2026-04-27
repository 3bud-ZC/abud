"use client";

interface AuroraBeamsProps {
  className?: string;
}

/**
 * Slow drifting aurora-like gradients in the background. Pure CSS, GPU-friendly.
 */
export default function AuroraBeams({ className }: AuroraBeamsProps) {
  return (
    <div
      className={className}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        filter: "blur(50px)",
        opacity: 0.55,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-30%",
          left: "-20%",
          width: "70%",
          height: "70%",
          background:
            "radial-gradient(ellipse at center, rgba(147,51,234,0.55), transparent 60%)",
          animation: "abud-aurora-1 16s ease-in-out infinite alternate",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-25%",
          width: "75%",
          height: "75%",
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.45), transparent 60%)",
          animation: "abud-aurora-2 22s ease-in-out infinite alternate",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "20%",
          width: "70%",
          height: "70%",
          background:
            "radial-gradient(ellipse at center, rgba(103,232,249,0.18), transparent 60%)",
          animation: "abud-aurora-3 18s ease-in-out infinite alternate",
        }}
      />
      <style jsx global>{`
        @keyframes abud-aurora-1 {
          0%   { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(30%, 25%) rotate(45deg); }
        }
        @keyframes abud-aurora-2 {
          0%   { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-25%, 30%) rotate(-40deg); }
        }
        @keyframes abud-aurora-3 {
          0%   { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(15%, -25%) rotate(35deg); }
        }
      `}</style>
    </div>
  );
}
