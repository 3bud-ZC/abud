"use client";

import { useEffect, useState } from "react";

/** Top scroll progress bar with neon glow */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = (h.scrollHeight - h.clientHeight) || 1;
      setPct((h.scrollTop / max) * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 9999,
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background:
            "linear-gradient(90deg, #7c3aed 0%, #a855f7 40%, #c084fc 70%, #67e8f9 100%)",
          boxShadow:
            "0 0 12px rgba(192,132,252,0.85), 0 0 24px rgba(147,51,234,0.55)",
          transition: "width 0.08s linear",
        }}
      />
    </div>
  );
}
