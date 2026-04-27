"use client";

import { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  /** Strength of attraction 0..1, default 0.35 */
  strength?: number;
  /** Activation distance multiplier (>=1), default 1.4 */
  reach?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "span";
}

/**
 * Wrap any element to make it magnetically attracted to the cursor.
 * Use for CTAs and important buttons.
 */
export default function MagneticButton({
  children,
  strength = 0.35,
  reach = 1.4,
  className,
  style,
  as = "div",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const reachX = (rect.width / 2) * reach;
    const reachY = (rect.height / 2) * reach;
    const within = Math.abs(dx) < reachX && Math.abs(dy) < reachY;
    if (within) {
      setPos({ x: dx * strength, y: dy * strength });
    }
  };
  const onLeave = () => setPos({ x: 0, y: 0 });

  const Tag: any = as;
  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        ...style,
        display: "inline-block",
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: pos.x === 0 && pos.y === 0
          ? "transform 0.5s cubic-bezier(0.16,1,0.3,1)"
          : "transform 0.15s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </Tag>
  );
}
