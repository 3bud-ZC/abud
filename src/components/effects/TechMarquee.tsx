"use client";

import type { LucideIcon } from "lucide-react";

interface TechItem {
  icon: LucideIcon;
  label: string;
}

interface TechMarqueeProps {
  items: TechItem[];
  className?: string;
  /** seconds for one full loop */
  duration?: number;
}

export default function TechMarquee({ items, className, duration = 30 }: TechMarqueeProps) {
  // duplicate to create seamless loop
  const loop = [...items, ...items];

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
      }}
      aria-hidden
    >
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          width: "max-content",
          animation: `abud-marquee ${duration}s linear infinite`,
        }}
      >
        {loop.map(({ icon: Icon, label }, i) => (
          <span
            key={`${label}-${i}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium flex-shrink-0"
            style={{
              background: "linear-gradient(160deg, rgba(15,15,24,1), rgba(10,10,18,1))",
              border: "1px solid rgba(40,40,65,0.8)",
              color: "#9090c0",
              boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            <Icon className="w-3.5 h-3.5 text-purple-400" />
            {label}
          </span>
        ))}
      </div>
      <style jsx global>{`
        @keyframes abud-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
