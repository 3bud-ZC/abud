"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  BrainCircuit, Bot, Shield, Code2, Cpu, Sparkles, Database, Zap,
  Hand, type LucideIcon,
} from "lucide-react";

interface FloatingCardSpec {
  /**
   * Position relative to center, in viewport-units (vw / vh*0.35).
   * Cards are positioned OUTSIDE the central forbidden zone:
   *   |x| >= 36 (away from horizontal center where wordmark sits)
   *   OR |y| >= 40 (clear of wordmark + CTAs vertically)
   */
  x: number;
  y: number;
  /** Parallax depth multiplier (0..1). */
  depth: number;
  /** Base rotation in degrees. */
  rotate: number;
  /** Per-card animation phase offset (sec). */
  phase: number;
  /** Drift cycle duration (sec). */
  speed: number;
  /** Drift amplitudes (px) — autonomous wandering. */
  driftX: number;
  driftY: number;
  /** Rotation amplitude (deg). */
  rotAmp: number;
  icon: LucideIcon;
  label: string;
  hint: string;
  accent: string;
  glow: string;
  /** Where a tap (vs drag) navigates to. */
  href: string;
}

// 8 cards arranged AROUND the central wordmark — no card crosses
// the central forbidden zone (rough rectangle: |x| < 36 AND |y| < 40).
const CARDS: FloatingCardSpec[] = [
  // Top row (above wordmark)
  { x: -44, y: -36, depth: 0.7,  rotate: -8,  phase: 0.0, speed: 8.5, driftX: 30, driftY: 22, rotAmp: 7, icon: BrainCircuit, label: "AI Tools",      hint: "GPT \u2022 Claude",      accent: "#c084fc", glow: "rgba(192,132,252,0.55)", href: "/services" },
  { x:  46, y: -36, depth: 0.9,  rotate:  10, phase: 1.2, speed: 9.5, driftX: 32, driftY: 18, rotAmp: 8, icon: Code2,        label: "Full-Stack",    hint: "Next.js \u2022 TS",       accent: "#67e8f9", glow: "rgba(103,232,249,0.5)",  href: "/services" },

  // Middle row — far left/right, well clear of "Abud" wordmark
  { x: -52, y:  -2, depth: 0.55, rotate:  6,  phase: 2.4, speed: 7.5, driftX: 24, driftY: 28, rotAmp: 6, icon: Bot,          label: "Telegram Bots", hint: "Automation",            accent: "#a78bfa", glow: "rgba(167,139,250,0.5)",  href: "/services" },
  { x:  54, y:   0, depth: 1.0,  rotate: -9,  phase: 3.0, speed: 9.0, driftX: 28, driftY: 24, rotAmp: 8, icon: Shield,       label: "CyberSec",      hint: "Pen-Testing",           accent: "#34d399", glow: "rgba(52,211,153,0.5)",   href: "/services" },

  // Bottom row (below CTAs)
  { x: -42, y:  40, depth: 0.45, rotate:  4,  phase: 0.8, speed: 8.0, driftX: 30, driftY: 16, rotAmp: 6, icon: Cpu,          label: "Automation",    hint: "Python \u2022 APIs",     accent: "#f0abfc", glow: "rgba(240,171,252,0.5)",  href: "/services" },
  { x:  44, y:  42, depth: 0.5,  rotate: -5,  phase: 1.8, speed: 8.5, driftX: 32, driftY: 18, rotAmp: 7, icon: Sparkles,     label: "AI Agents",     hint: "Multi-step",            accent: "#fbbf24", glow: "rgba(251,191,36,0.5)",   href: "/services" },

  // Far corners (extra depth at the edges)
  { x: -58, y: -28, depth: 0.65, rotate: -3,  phase: 3.6, speed: 10.5, driftX: 22, driftY: 24, rotAmp: 7, icon: Database,    label: "Backend",       hint: "Postgres \u2022 Prisma", accent: "#60a5fa", glow: "rgba(96,165,250,0.5)",   href: "/services" },
  { x:  60, y:  32, depth: 0.6,  rotate:  7,  phase: 1.5, speed: 9.0,  driftX: 24, driftY: 18, rotAmp: 7, icon: Zap,         label: "Performance",   hint: "Edge \u2022 Cache",      accent: "#34d399", glow: "rgba(52,211,153,0.55)",  href: "/services" },
];

/**
 * HeroFloatingCards — Living, draggable, clickable service cards.
 *  • 8 cards positioned AROUND a central forbidden zone (wordmark/CTAs)
 *  • Mouse parallax (deeper cards shift more)
 *  • Per-card autonomous drift (X + Y + rotation + scale)
 *  • DRAG: grab any card and throw it; it springs back to its origin
 *  • TAP (small movement, fast release): navigates to /services
 *  • Hover: pause drift, scale up, glow boost
 */
export default function HeroFloatingCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Smoothed mouse-parallax tracker
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
      // Container ignores pointer events; each card re-enables them.
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

/* ── Single floating card (drag + tap + drift) ── */
function FloatingCard({
  card, index, sx, sy,
}: {
  card: FloatingCardSpec;
  index: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const Icon = card.icon;
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Tap-vs-drag detection: small + fast pointerup ⇒ navigate
  const pointerStart = useRef<{ x: number; y: number; t: number } | null>(null);

  // Mouse parallax — deeper cards move more (disabled while dragging)
  const tx = useTransform(sx, [-0.5, 0.5], [-card.depth * 60, card.depth * 60]);
  const ty = useTransform(sy, [-0.5, 0.5], [-card.depth * 40, card.depth * 40]);
  const rotZ = useTransform(sx, [-0.5, 0.5], [card.rotate - 4, card.rotate + 4]);

  // Decide what the inner drift layer should do based on state.
  // Priority: dragging > hovered > drift
  const driftAnimate =
    dragging
      ? undefined // let `drag` control it
      : hovered
        ? { x: 0, y: 0, rotate: 0, scale: 1.12 }
        : {
            x: [0, card.driftX, -card.driftX * 0.7, card.driftX * 0.4, 0],
            y: [0, -card.driftY, card.driftY * 0.6, -card.driftY * 0.3, 0],
            rotate: [0, card.rotAmp, -card.rotAmp * 0.85, card.rotAmp * 0.5, 0],
            scale: [1, 1.04, 0.97, 1.02, 1],
          };

  const driftTransition =
    dragging
      ? { duration: 0 }
      : hovered
        ? { type: "spring" as const, stiffness: 220, damping: 18 }
        : {
            duration: card.speed,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: card.phase,
            times: [0, 0.25, 0.5, 0.75, 1],
          };

  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0.6, y: 40, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay: 0.4 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        left: "50%",
        top: "50%",
        x: dragging ? 0 : tx,
        y: dragging ? 0 : ty,
        rotateZ: dragging ? 0 : rotZ,
        translateX: `calc(-50% + ${card.x}vw)`,
        translateY: `calc(-50% + ${card.y}vh * 0.35)`,
        zIndex: dragging ? 30 : "auto",
      }}
    >
      {/* Drift / drag layer */}
      <motion.div
        drag
        dragSnapToOrigin
        dragElastic={0.55}
        dragMomentum
        dragTransition={{ bounceStiffness: 180, bounceDamping: 16, power: 0.4 }}
        whileDrag={{ scale: 1.18, zIndex: 50 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        animate={driftAnimate}
        transition={driftTransition}
        // Tap-vs-drag detection at the pointer level
        onPointerDown={(e) => {
          pointerStart.current = { x: e.clientX, y: e.clientY, t: Date.now() };
        }}
        onPointerUp={(e) => {
          const start = pointerStart.current;
          pointerStart.current = null;
          if (!start) return;
          const dx = e.clientX - start.x;
          const dy = e.clientY - start.y;
          const dist = Math.hypot(dx, dy);
          const dur = Date.now() - start.t;
          // Treat as a click only if movement was tiny + quick.
          if (dist < 6 && dur < 350) {
            router.push(card.href);
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        // Re-enable pointer events for actual interaction
        className="pointer-events-auto select-none"
        style={{ touchAction: "none", cursor: dragging ? "grabbing" : "grab" }}
      >
        <div
          className="relative rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 transition-shadow duration-300"
          style={{
            background: hovered || dragging
              ? "rgba(15,12,28,0.95)"
              : "rgba(10,8,18,0.85)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: `1px solid ${card.accent}${hovered || dragging ? "cc" : "55"}`,
            boxShadow: dragging
              ? `0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.7), 0 0 80px ${card.glow}`
              : hovered
                ? `0 0 0 1px rgba(255,255,255,0.06), 0 12px 40px rgba(0,0,0,0.6), 0 0 50px ${card.glow}`
                : `0 0 0 1px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${card.glow}`,
            minWidth: 168,
          }}
        >
          {/* Holographic top bar */}
          <span
            className="absolute -top-px left-3 right-3 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
              opacity: hovered || dragging ? 1 : 0.7,
            }}
          />

          {/* Icon tile */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300"
            style={{
              background: `linear-gradient(135deg, ${card.accent}25, ${card.accent}08)`,
              border: `1px solid ${card.accent}40`,
              boxShadow: `inset 0 0 12px ${card.accent}20`,
              transform: hovered || dragging ? "rotate(-6deg) scale(1.08)" : "none",
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
              style={{ color: hovered || dragging ? card.accent : `${card.accent}cc` }}
            >
              {card.hint}
            </div>
          </div>

          {/* Hover-only drag-hint icon */}
          <motion.div
            animate={{
              opacity: hovered && !dragging ? 1 : 0,
              x: hovered && !dragging ? 0 : 4,
            }}
            transition={{ duration: 0.2 }}
            className="absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none"
            style={{ color: card.accent }}
          >
            <Hand className="w-3.5 h-3.5" />
          </motion.div>

          {/* Pulsing status dot */}
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
