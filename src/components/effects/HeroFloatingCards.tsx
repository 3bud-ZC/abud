"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
  type MotionValue,
} from "framer-motion";
import {
  BrainCircuit, Bot, Shield, Code2, Cpu, Sparkles, Database, Zap,
  Hand, type LucideIcon,
} from "lucide-react";

/* ─────────────────────────────────────────────
   CARD CATALOG — visual identity (no positions)
   ───────────────────────────────────────────── */
interface CardIdentity {
  icon: LucideIcon;
  label: string;
  hint: string;
  accent: string;
  glow: string;
  href: string;
}

const CARD_CATALOG: CardIdentity[] = [
  { icon: BrainCircuit, label: "AI Tools",      hint: "GPT \u2022 Claude",      accent: "#c084fc", glow: "rgba(192,132,252,0.55)", href: "/services" },
  { icon: Code2,        label: "Full-Stack",    hint: "Next.js \u2022 TS",       accent: "#67e8f9", glow: "rgba(103,232,249,0.5)",  href: "/services" },
  { icon: Bot,          label: "Telegram Bots", hint: "Automation",            accent: "#a78bfa", glow: "rgba(167,139,250,0.5)",  href: "/services" },
  { icon: Shield,       label: "CyberSec",      hint: "Pen-Testing",           accent: "#34d399", glow: "rgba(52,211,153,0.5)",   href: "/services" },
  { icon: Cpu,          label: "Automation",    hint: "Python \u2022 APIs",     accent: "#f0abfc", glow: "rgba(240,171,252,0.5)",  href: "/services" },
  { icon: Sparkles,     label: "AI Agents",     hint: "Multi-step",            accent: "#fbbf24", glow: "rgba(251,191,36,0.5)",   href: "/services" },
  { icon: Database,     label: "Backend",       hint: "Postgres \u2022 Prisma", accent: "#60a5fa", glow: "rgba(96,165,250,0.5)",   href: "/services" },
  { icon: Zap,          label: "Performance",   hint: "Edge \u2022 Cache",      accent: "#34d399", glow: "rgba(52,211,153,0.55)",  href: "/services" },
];

/* ─────────────────────────────────────────────
   ZONES — six safe regions around forbidden zone
   All zones live INSIDE the viewport (|x| ≤ 38vw)
   so cards never escape the screen edge.
   ───────────────────────────────────────────── */
type Zone = { xMin: number; xMax: number; yMin: number; yMax: number };

const ZONES: Zone[] = [
  // top-left
  { xMin: -38, xMax: -24, yMin: -40, yMax: -28 },
  // top-right
  { xMin:  24, xMax:  38, yMin: -40, yMax: -28 },
  // mid-left
  { xMin: -40, xMax: -28, yMin:  -8, yMax:   8 },
  // mid-right
  { xMin:  28, xMax:  40, yMin:  -8, yMax:   8 },
  // bottom-left
  { xMin: -38, xMax: -24, yMin:  30, yMax:  44 },
  // bottom-right
  { xMin:  24, xMax:  38, yMin:  30, yMax:  44 },
];

interface FloatingCardInstance extends CardIdentity {
  x: number;
  y: number;
  depth: number;
  rotate: number;
  phase: number;
  speed: number;
  driftX: number;
  driftY: number;
  rotAmp: number;
}

/* Random helpers */
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Build six fully-randomized card instances at mount time. */
function generateLayout(): FloatingCardInstance[] {
  // Pick 6 unique identities from the catalog.
  const picks = shuffle(CARD_CATALOG).slice(0, 6);
  // Shuffle zone assignment so identical identity ↔ zone pairing is rare.
  const zones = shuffle(ZONES);

  return picks.map((identity, i) => {
    const z = zones[i];
    return {
      ...identity,
      x: rand(z.xMin, z.xMax),
      y: rand(z.yMin, z.yMax),
      depth: rand(0.45, 1.0),
      rotate: rand(-10, 10),
      phase: rand(0, Math.PI * 2),
      speed: rand(6.5, 10.5),
      driftX: rand(16, 26),
      driftY: rand(12, 22),
      rotAmp: rand(4, 8),
    };
  });
}

/** Smooth lerp toward a target value. */
function easeToward(mv: MotionValue<number>, target: number, factor: number) {
  const current = mv.get();
  if (Math.abs(current - target) < 0.01) {
    mv.set(target);
    return;
  }
  mv.set(current + (target - current) * factor);
}

/* ─────────────────────────────────────────────
   Public component
   ───────────────────────────────────────────── */
export default function HeroFloatingCards() {
  const ref = useRef<HTMLDivElement>(null);
  // Layout is generated client-side (avoids hydration mismatch).
  const [cards, setCards] = useState<FloatingCardInstance[] | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Smoothed mouse-parallax tracker
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 70, damping: 22, mass: 0.8 });

  useEffect(() => {
    // Respect reduced motion preference — skip cards entirely.
    if (typeof window !== "undefined" && window.matchMedia) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setReduceMotion(true);
        return;
      }
    }
    setCards(generateLayout());
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

  if (reduceMotion) return null;

  return (
    <div
      ref={ref}
      className="hidden sm:block absolute inset-0 pointer-events-none z-[5] overflow-hidden"
      aria-hidden
      style={{ perspective: "1400px" }}
    >
      {cards && cards.map((card, i) => (
        <FloatingCard key={`${card.label}-${i}`} card={card} index={i} sx={sx} sy={sy} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Single card — drift + drag + tap-to-navigate
   ───────────────────────────────────────────── */
function FloatingCard({
  card, index, sx, sy,
}: {
  card: FloatingCardInstance;
  index: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const Icon = card.icon;
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [entered, setEntered] = useState(false);

  const draggingRef = useRef(false);
  const hoveredRef = useRef(false);
  const anchorRef = useRef({ x: 0, y: 0 });

  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);
  useEffect(() => { draggingRef.current = dragging; }, [dragging]);

  const pointerStart = useRef<{ x: number; y: number; t: number } | null>(null);

  // Independent drift seeds per card (additionally randomized in spec).
  const seedX = useMemo(() => rand(0, Math.PI * 2), []);
  const seedY = useMemo(() => rand(0, Math.PI * 2), []);
  const seedR = useMemo(() => rand(0, Math.PI * 2), []);

  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const drot = useMotionValue(0);
  const dscale = useMotionValue(1);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 400 + index * 100 + 600);
    return () => clearTimeout(t);
  }, [index]);

  useAnimationFrame((time) => {
    if (!entered) return;
    if (draggingRef.current) return;
    // Pause on hidden tabs (no point spending CPU when not visible)
    if (typeof document !== "undefined" && document.hidden) return;

    const tSec = time / 1000;
    const omega = (Math.PI * 2) / card.speed;

    if (hoveredRef.current) {
      easeToward(dx, anchorRef.current.x, 0.16);
      easeToward(dy, anchorRef.current.y, 0.16);
      easeToward(drot, 0, 0.18);
      easeToward(dscale, 1.12, 0.18);
      return;
    }

    // Compound sinusoidal drift (X, Y, rotation use different freqs/seeds)
    const targetX = anchorRef.current.x + Math.sin(tSec * omega + seedX + card.phase) * card.driftX * 0.6;
    const targetY = anchorRef.current.y + Math.cos(tSec * omega * 0.85 + seedY + card.phase * 0.7) * card.driftY * 0.6;
    const targetRot = Math.sin(tSec * omega * 0.6 + seedR) * card.rotAmp;
    const targetScale = 1 + Math.sin(tSec * omega * 1.3 + card.phase) * 0.025;

    easeToward(dx, targetX, 0.12);
    easeToward(dy, targetY, 0.12);
    easeToward(drot, targetRot, 0.1);
    easeToward(dscale, targetScale, 0.1);
  });

  const tx = useTransform(sx, [-0.5, 0.5], [-card.depth * 60, card.depth * 60]);
  const ty = useTransform(sy, [-0.5, 0.5], [-card.depth * 40, card.depth * 40]);
  const rotZ = useTransform(sx, [-0.5, 0.5], [card.rotate - 4, card.rotate + 4]);

  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0.6, y: 40, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
      <motion.div
        drag
        dragMomentum={false}
        whileDrag={{ scale: 1.18, zIndex: 50 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => {
          anchorRef.current = { x: dx.get(), y: dy.get() };
          setDragging(false);
        }}
        onPointerDown={(e) => {
          pointerStart.current = { x: e.clientX, y: e.clientY, t: Date.now() };
        }}
        onPointerUp={(e) => {
          const start = pointerStart.current;
          pointerStart.current = null;
          if (!start) return;
          const distance = Math.hypot(e.clientX - start.x, e.clientY - start.y);
          const elapsed = Date.now() - start.t;
          if (distance < 6 && elapsed < 350) router.push(card.href);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="pointer-events-auto select-none"
        style={{
          x: dx,
          y: dy,
          rotate: drot,
          scale: dscale,
          touchAction: "none",
          cursor: dragging ? "grabbing" : "grab",
        }}
      >
        <div
          className="relative rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 transition-shadow duration-300"
          style={{
            background: hovered || dragging ? "rgba(15,12,28,0.95)" : "rgba(10,8,18,0.85)",
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
          <span
            className="absolute -top-px left-3 right-3 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
              opacity: hovered || dragging ? 1 : 0.7,
            }}
          />

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

          <div className="flex-1 min-w-0 text-right">
            <div className="text-white text-[13px] font-bold leading-tight tracking-tight" style={{ letterSpacing: "-0.01em" }}>
              {card.label}
            </div>
            <div className="text-[10px] font-medium mt-0.5 transition-colors" style={{ color: hovered || dragging ? card.accent : `${card.accent}cc` }}>
              {card.hint}
            </div>
          </div>

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
