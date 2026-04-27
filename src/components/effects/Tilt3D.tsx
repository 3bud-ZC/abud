"use client";

import { useRef, useState } from "react";

interface Tilt3DProps {
  children: React.ReactNode;
  /** Maximum tilt in degrees, default 10 */
  max?: number;
  /** Scale on hover, default 1.02 */
  scale?: number;
  /** Show inner spotlight, default true */
  spotlight?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 3D tilt wrapper: tilts the child on mouse move with a soft spotlight.
 * Lightweight: pure CSS transforms via state, no extra deps.
 */
export default function Tilt3D({
  children,
  max = 10,
  scale = 1.02,
  spotlight = true,
  className,
  style,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50, active: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    const ry = (x - 0.5) * 2 * max;
    const rx = -(y - 0.5) * 2 * max;
    setT({ rx, ry, mx: x * 100, my: y * 100, active: true });
  };

  const onLeave = () => setT({ rx: 0, ry: 0, mx: 50, my: 50, active: false });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.active ? scale : 1})`,
        transformStyle: "preserve-3d",
        transition: t.active ? "transform 0.08s linear" : "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        position: "relative",
        willChange: "transform",
      }}
    >
      {children}
      {spotlight && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            background: `radial-gradient(circle 220px at ${t.mx}% ${t.my}%, rgba(192,132,252,0.18), transparent 60%)`,
            opacity: t.active ? 1 : 0,
            transition: "opacity 0.25s",
            mixBlendMode: "screen",
          }}
        />
      )}
    </div>
  );
}
