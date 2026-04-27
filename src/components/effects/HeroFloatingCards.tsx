"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import {
  BrainCircuit, Bot, Shield, Code2, type LucideIcon,
} from "lucide-react";

interface FloatingCardSpec {
  /** Position relative to center, in viewport-percent. */
  x: number;
  y: number;
  /** Parallax depth multiplier (0..1). Higher = moves more with mouse. */
  depth: number;
  /** Rotation in degrees. */
  rotate: number;
  /** Animation phase offset for the float. */
  phase: number;
  icon: LucideIcon;
  label: string;
  hint: string;
  accent: string;
  glow: string;
}

// 4 cards in the four outer quadrants — kept clear of the central wordmark.
const CARDS: FloatingCardSpec[] = [
  { x: -38, y: -28, depth: 0.7, rotate: -7,  phase: 0,    icon: BrainCircuit, label: "AI Tools",      hint: "GPT • Claude",   accent: "#c084fc", glow: "rgba(192,132,252,0.5)"  },
  { x:  40, y: -26, depth: 0.9, rotate:  9,  phase: 1.4,  icon: Code2,        label: "Full-Stack",    hint: "Next.js • TS",   accent: "#67e8f9", glow: "rgba(103,232,249,0.45)" },
  { x: -42, y:  24, depth: 0.55,rotate:  6,  phase: 2.6,  icon: Bot,          label: "Telegram Bots", hint: "Automation",     accent: "#a78bfa", glow: "rgba(167,139,250,0.45)" },
  { x:  42, y:  26, depth: 1.0, rotate: -8,  phase: 3.4,  icon: Shield,       label: "CyberSec",      hint: "Pen-Testing",    accent: "#34d399", glow: "rgba(52,211,153,0.45)"  },
];

/**
 * HeroFloatingCards — Floating service cards that orbit the hero center.
 *  • 4 corner cards, kept far from central wordmark
 *  • Mouse parallax (deeper cards shift more)
 *  • Continuous Y-bobbing for life
 *  • Holographic glow per accent color
 *  • Hidden on mobile to keep hero focused
 */
export default function HeroFloatingCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 70, damping: 22, mass: 0.8 });

  useEffect(() => {
    setMounted(true);
    function onMove(e: MouseEvent) {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mx.set((e.clientX - cx) / rect.width);
      my.set((e.clientY - cy) / rect.height);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div
      ref={ref}
      className="hidden sm:block absolute inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden
      style={{ perspective: "1400px" }}
    >
      {mounted && CARDS.map((card, i) => (
        <FloatingCard key={i} card={card} index={i} sx={sx} sy={sy} />
      ))}
    </div>
  );
}

/* ── Single floating card ── */
function FloatingCard({
  card, index, sx, sy,
}: {
  card: FloatingCardSpec;
  index: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const Icon = card.icon;

  // Mouse parallax: deeper cards shift more
  const tx = useTransform(sx, [-0.5, 0.5], [-card.depth * 60, card.depth * 60]);
  const ty = useTransform(sy, [-0.5, 0.5], [-card.depth * 40, card.depth * 40]);
  const rotZ = useTransform(sx, [-0.5, 0.5], [card.rotate - 4, card.rotate + 4]);

  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0.6, y: 40, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay: 0.4 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        left: "50%",
        top: "50%",
        x: tx,
        y: ty,
        rotateZ: rotZ,
        translateX: `calc(-50% + ${card.x}vw)`,
        translateY: `calc(-50% + ${card.y}vh * 0.35)`,
      }}
    >
      {/* Continuous Y-bob */}
      <motion.div
        animate={{ y: [0, -10, 0, 6, 0] }}
        transition={{
          duration: 6 + (index % 3),
          repeat: Infinity,
          ease: "easeInOut",
          delay: card.phase,
        }}
      >
        <div
          className="relative rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5"
          style={{
            background: "rgba(10,8,18,0.85)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: `1px solid ${card.accent}55`,
            boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${card.glow}`,
            minWidth: 168,
          }}
        >
          {/* Animated holographic top bar */}
          <span
            className="absolute -top-px left-3 right-3 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
              opacity: 0.7,
            }}
          />

          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${card.accent}25, ${card.accent}08)`,
              border: `1px solid ${card.accent}40`,
              boxShadow: `inset 0 0 12px ${card.accent}20`,
            }}
          >
            <Icon className="w-4 h-4" style={{ color: card.accent }} />
          </div>

          <div className="flex-1 min-w-0 text-right">
            <div className="text-white text-[13px] font-bold leading-tight tracking-tight" style={{ letterSpacing: "-0.01em" }}>
              {card.label}
            </div>
            <div className="text-[10px] font-medium mt-0.5" style={{ color: `${card.accent}cc` }}>
              {card.hint}
            </div>
          </div>

          {/* Pulsing dot */}
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: card.phase * 0.3 }}
            className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
            style={{ background: card.accent, boxShadow: `0 0 8px ${card.accent}` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
