"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  BrainCircuit, Bot, Shield, Code2, Cpu, Sparkles, Database, Zap,
  ArrowUpLeft, type LucideIcon,
} from "lucide-react";

interface FloatingCardSpec {
  /** Position relative to center, in viewport-units (vw / vh*0.35). */
  x: number;
  y: number;
  /** Parallax depth multiplier (0..1). Higher = moves more with mouse. */
  depth: number;
  /** Base rotation in degrees. */
  rotate: number;
  /** Per-card animation phase offset (sec). */
  phase: number;
  /** Drift cycle duration (sec). */
  speed: number;
  /** Drift amplitudes (px). */
  driftX: number;
  driftY: number;
  /** Rotation amplitude (deg). */
  rotAmp: number;
  icon: LucideIcon;
  label: string;
  hint: string;
  accent: string;
  glow: string;
  /** Where this card links to. */
  href: string;
}

// 8 cards scattered around the central wordmark.
// Each is a real link to its service area + has its own animation rhythm.
const CARDS: FloatingCardSpec[] = [
  { x: -42, y: -32, depth: 0.7,  rotate: -8,  phase: 0.0, speed: 7.5, driftX: 38, driftY: 28, rotAmp: 8, icon: BrainCircuit, label: "AI Tools",      hint: "GPT \u2022 Claude",      accent: "#c084fc", glow: "rgba(192,132,252,0.55)", href: "/services" },
  { x:  44, y: -30, depth: 0.9,  rotate:  10, phase: 1.2, speed: 8.5, driftX: 42, driftY: 22, rotAmp: 9, icon: Code2,        label: "Full-Stack",    hint: "Next.js \u2022 TS",       accent: "#67e8f9", glow: "rgba(103,232,249,0.5)",  href: "/services" },
  { x: -46, y:  22, depth: 0.55, rotate:  6,  phase: 2.4, speed: 6.5, driftX: 30, driftY: 34, rotAmp: 7, icon: Bot,          label: "Telegram Bots", hint: "Automation",            accent: "#a78bfa", glow: "rgba(167,139,250,0.5)",  href: "/services" },
  { x:  46, y:  26, depth: 1.0,  rotate: -9,  phase: 3.0, speed: 9.0, driftX: 36, driftY: 24, rotAmp: 10, icon: Shield,      label: "CyberSec",      hint: "Pen-Testing",           accent: "#34d399", glow: "rgba(52,211,153,0.5)",   href: "/services" },
  { x: -28, y:   2, depth: 0.45, rotate:  4,  phase: 0.8, speed: 7.0, driftX: 44, driftY: 18, rotAmp: 6, icon: Cpu,          label: "Automation",    hint: "Python \u2022 APIs",     accent: "#f0abfc", glow: "rgba(240,171,252,0.5)",  href: "/services" },
  { x:  30, y:  -2, depth: 0.5,  rotate: -5,  phase: 1.8, speed: 8.0, driftX: 38, driftY: 26, rotAmp: 7, icon: Sparkles,     label: "AI Agents",     hint: "Multi-step",            accent: "#fbbf24", glow: "rgba(251,191,36,0.5)",   href: "/services" },
  { x:  -8, y: -42, depth: 0.65, rotate: -3,  phase: 3.6, speed: 9.5, driftX: 24, driftY: 32, rotAmp: 8, icon: Database,     label: "Backend",       hint: "Postgres \u2022 Prisma", accent: "#60a5fa", glow: "rgba(96,165,250,0.5)",   href: "/services" },
  { x:  10, y:  44, depth: 0.6,  rotate:  7,  phase: 1.5, speed: 8.0, driftX: 30, driftY: 22, rotAmp: 7, icon: Zap,          label: "Performance",   hint: "Edge \u2022 Cache",      accent: "#34d399", glow: "rgba(52,211,153,0.55)",  href: "/services" },
];

/**
 * HeroFloatingCards — Living, clickable service cards orbiting the hero.
 *  • 8 cards scattered around the central wordmark
 *  • Mouse parallax (deeper cards shift more)
 *  • Per-card autonomous drift (X + Y + rotation + scale) — independent rhythms
 *  • Hover: pause drift, scale up, glow boost, tooltip pops
 *  • Click: navigates to the relevant service area
 *  • Container is pointer-events-none, individual cards re-enable pointer events
 */
export default function HeroFloatingCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Mouse parallax (smoothed)
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
      // Container itself is non-interactive; each card re-enables pointer events.
      className="hidden sm:block absolute inset-0 pointer-events-none z-[5] overflow-hidden"
      aria-hidden
      style={{ perspective: "1400px" }}
    >
      {mounted && CARDS.map((card, i) => (
        <FloatingCard key={i} card={card} index={i} sx={sx} sy={sy} />
      ))}
    </div>
  );
}

/* ── Single floating card (clickable + animated) ── */
function FloatingCard({
  card, index, sx, sy,
}: {
  card: FloatingCardSpec;
  index: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const Icon = card.icon;
  const [hovered, setHovered] = useState(false);

  // Mouse parallax — deeper cards move more
  const tx = useTransform(sx, [-0.5, 0.5], [-card.depth * 60, card.depth * 60]);
  const ty = useTransform(sy, [-0.5, 0.5], [-card.depth * 40, card.depth * 40]);
  const rotZ = useTransform(sx, [-0.5, 0.5], [card.rotate - 4, card.rotate + 4]);

  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0.6, y: 40, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay: 0.4 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
      {/* Autonomous organic drift (paused on hover) */}
      <motion.div
        animate={
          hovered
            ? { x: 0, y: 0, rotate: 0, scale: 1.12 }
            : {
                x: [0, card.driftX, -card.driftX * 0.7, card.driftX * 0.4, 0],
                y: [0, -card.driftY, card.driftY * 0.6, -card.driftY * 0.3, 0],
                rotate: [0, card.rotAmp, -card.rotAmp * 0.85, card.rotAmp * 0.5, 0],
                scale: [1, 1.04, 0.97, 1.02, 1],
              }
        }
        transition={
          hovered
            ? { type: "spring", stiffness: 220, damping: 18 }
            : {
                duration: card.speed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.phase,
                times: [0, 0.25, 0.5, 0.75, 1],
              }
        }
      >
        <Link
          href={card.href}
          aria-label={`${card.label} — ${card.hint}`}
          // Re-enable pointer events for actual interaction
          className="pointer-events-auto block group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          <div
            className="relative rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 transition-shadow duration-300"
            style={{
              background: hovered
                ? "rgba(15,12,28,0.95)"
                : "rgba(10,8,18,0.85)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: `1px solid ${card.accent}${hovered ? "aa" : "55"}`,
              boxShadow: hovered
                ? `0 0 0 1px rgba(255,255,255,0.06), 0 12px 40px rgba(0,0,0,0.6), 0 0 50px ${card.glow}`
                : `0 0 0 1px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${card.glow}`,
              minWidth: 168,
              cursor: "pointer",
            }}
          >
            {/* Animated holographic top bar */}
            <span
              className="absolute -top-px left-3 right-3 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
                opacity: hovered ? 1 : 0.7,
              }}
            />

            {/* Icon tile */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300"
              style={{
                background: `linear-gradient(135deg, ${card.accent}25, ${card.accent}08)`,
                border: `1px solid ${card.accent}40`,
                boxShadow: `inset 0 0 12px ${card.accent}20`,
                transform: hovered ? "rotate(-6deg) scale(1.08)" : "none",
              }}
            >
              <Icon className="w-4 h-4" style={{ color: card.accent }} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 text-right">
              <div
                className="text-white text-[13px] font-bold leading-tight tracking-tight"
                style={{ letterSpacing: "-0.01em" }}
              >
                {card.label}
              </div>
              <div
                className="text-[10px] font-medium mt-0.5 transition-colors"
                style={{ color: hovered ? card.accent : `${card.accent}cc` }}
              >
                {card.hint}
              </div>
            </div>

            {/* Hover-only arrow → indicates clickability */}
            <motion.div
              animate={{
                opacity: hovered ? 1 : 0,
                x: hovered ? 0 : 4,
              }}
              transition={{ duration: 0.2 }}
              className="absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none"
              style={{ color: card.accent }}
            >
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </motion.div>

            {/* Pulsing dot status */}
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: card.phase * 0.3 }}
              className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
              style={{ background: card.accent, boxShadow: `0 0 8px ${card.accent}` }}
            />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
