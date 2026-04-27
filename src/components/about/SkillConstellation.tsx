"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles, type LucideIcon, Globe, BrainCircuit, Code2, Bot, Database, Cloud, Shield, GitBranch, Layers, Terminal, Zap, Cpu } from "lucide-react";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Skill {
  name: string;
  level: number; // 0-100
  icon: LucideIcon;
  category: "frontend" | "backend" | "ai" | "devops" | "automation" | "security";
  color: string;
  // Polar coordinates relative to center
  angle: number;   // degrees
  distance: number;// 0..1 (farther = lower level visually OR custom)
}

// Skills positioned manually for the constellation feel
const SKILLS: Skill[] = [
  { name: "Next.js",    level: 95, icon: Globe,        category: "frontend",   color: "#67e8f9", angle: 30,  distance: 0.55 },
  { name: "React",      level: 95, icon: Code2,        category: "frontend",   color: "#67e8f9", angle: 75,  distance: 0.7  },
  { name: "TypeScript", level: 92, icon: Code2,        category: "frontend",   color: "#67e8f9", angle: 110, distance: 0.55 },
  { name: "Node.js",    level: 90, icon: Terminal,     category: "backend",    color: "#c084fc", angle: 150, distance: 0.65 },
  { name: "PostgreSQL", level: 87, icon: Database,     category: "backend",    color: "#c084fc", angle: 195, distance: 0.5  },
  { name: "Prisma",     level: 85, icon: Layers,       category: "backend",    color: "#c084fc", angle: 230, distance: 0.7  },
  { name: "OpenAI / GPT",level: 88, icon: BrainCircuit, category: "ai",        color: "#a78bfa", angle: 265, distance: 0.55 },
  { name: "Claude",     level: 85, icon: BrainCircuit, category: "ai",         color: "#a78bfa", angle: 305, distance: 0.7  },
  { name: "Telegram Bots",level: 92, icon: Bot,        category: "automation", color: "#f0abfc", angle: 345, distance: 0.6  },
  { name: "n8n / Make", level: 82, icon: Zap,          category: "automation", color: "#f0abfc", angle: 10,  distance: 0.85 },
  { name: "Docker",     level: 78, icon: Cloud,        category: "devops",     color: "#34d399", angle: 60,  distance: 0.85 },
  { name: "Vercel / CF",level: 88, icon: Cloud,        category: "devops",     color: "#34d399", angle: 130, distance: 0.85 },
  { name: "Cybersecurity",level: 75,icon: Shield,      category: "security",   color: "#fbbf24", angle: 215, distance: 0.85 },
  { name: "Git / CI",   level: 90, icon: GitBranch,    category: "devops",     color: "#34d399", angle: 285, distance: 0.85 },
];

export default function SkillConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [size, setSize] = useState(640);

  // 3D parallax with mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);

  useEffect(() => {
    function update() {
      const w = containerRef.current?.clientWidth || 640;
      setSize(Math.min(w, 720));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() { mx.set(0); my.set(0); }

  const center = size / 2;
  const maxRadius = size * 0.42;

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-[#070612]">
      <FloatingOrbs count={4} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(147,51,234,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="section-badge mb-5 mx-auto">
            <Sparkles className="w-2.5 h-2.5" />
            المهارات
          </span>
          <h2 className="section-title mt-4 mb-3">كوكبة المهارات</h2>
          <p className="section-subtitle text-center max-w-xl mx-auto">
            مرّر فوق أي مهارة لتكشف تفاصيلها ─ كل كوكب يمثّل مستوى الإتقان
          </p>
        </AnimatedSection>

        <div
          ref={containerRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative mx-auto"
          style={{
            width: size,
            height: size,
            maxWidth: "100%",
            perspective: "1500px",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            {/* Concentric orbit rings */}
            {[0.4, 0.6, 0.8].map((r, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: size * r,
                  height: size * r,
                  left: center - (size * r) / 2,
                  top: center - (size * r) / 2,
                  border: "1px dashed rgba(168,85,247,0.15)",
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 80 + i * 20, repeat: Infinity, ease: "linear" }}
              />
            ))}

            {/* SVG connecting lines */}
            <svg className="absolute inset-0 pointer-events-none" width={size} height={size}>
              <defs>
                <radialGradient id="line-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(168,85,247,0.4)" />
                  <stop offset="100%" stopColor="rgba(168,85,247,0)" />
                </radialGradient>
              </defs>
              {SKILLS.map((s, i) => {
                const rad = (s.angle * Math.PI) / 180;
                const x = center + Math.cos(rad) * maxRadius * s.distance;
                const y = center + Math.sin(rad) * maxRadius * s.distance;
                return (
                  <motion.line
                    key={s.name}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke={hovered === s.name ? s.color : "rgba(168,85,247,0.18)"}
                    strokeWidth={hovered === s.name ? 1.5 : 0.5}
                    strokeDasharray={hovered === s.name ? "0" : "3,4"}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                  />
                );
              })}
            </svg>

            {/* Center node — { Abud } */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute rounded-full flex items-center justify-center"
              style={{
                width: 90,
                height: 90,
                left: center - 45,
                top: center - 45,
                background:
                  "radial-gradient(circle, rgba(192,132,252,0.4) 0%, rgba(147,51,234,0.2) 60%, transparent 100%)",
                border: "2px solid rgba(192,132,252,0.6)",
                boxShadow:
                  "0 0 40px rgba(192,132,252,0.5), inset 0 0 20px rgba(147,51,234,0.3)",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, #c084fc 25%, transparent 50%, #67e8f9 75%, transparent 100%)",
                  padding: "2px",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <Cpu className="w-9 h-9 text-purple-200" style={{ filter: "drop-shadow(0 0 10px #c084fc)" }} />
            </motion.div>

            {/* Skill planets */}
            {SKILLS.map((s, i) => {
              const rad = (s.angle * Math.PI) / 180;
              const x = center + Math.cos(rad) * maxRadius * s.distance;
              const y = center + Math.sin(rad) * maxRadius * s.distance;
              const planetSize = 20 + (s.level / 100) * 28; // 20-48px based on level
              const Icon = s.icon;
              const isHov = hovered === s.name;

              return (
                <motion.div
                  key={s.name}
                  className="absolute cursor-pointer"
                  style={{
                    left: x - planetSize / 2,
                    top: y - planetSize / 2,
                    width: planetSize,
                    height: planetSize,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHovered(s.name)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ scale: 1.25 }}
                >
                  {/* Glow halo */}
                  <motion.div
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3 + (i % 3), repeat: Infinity }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${s.color}80 0%, transparent 70%)`,
                      filter: "blur(8px)",
                      transform: "scale(1.6)",
                    }}
                  />
                  {/* Bobbing planet */}
                  <motion.div
                    animate={{ y: [0, -4, 0, 3, 0] }}
                    transition={{ duration: 5 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    className="relative w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${s.color}ee 0%, ${s.color}66 60%, ${s.color}20 100%)`,
                      border: `1.5px solid ${s.color}`,
                      boxShadow: `0 0 12px ${s.color}aa, inset 0 0 8px ${s.color}50, inset -2px -2px 6px rgba(0,0,0,0.3)`,
                    }}
                  >
                    <Icon className="text-white" style={{ width: planetSize * 0.42, height: planetSize * 0.42, filter: "drop-shadow(0 0 4px rgba(0,0,0,0.5))" }} />
                  </motion.div>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: isHov ? 1 : 0, y: isHov ? 0 : 6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                    style={{
                      top: planetSize + 10,
                      zIndex: 20,
                    }}
                  >
                    <div
                      className="rounded-lg px-3 py-2 flex items-center gap-2"
                      style={{
                        background: "rgba(10,8,18,0.95)",
                        backdropFilter: "blur(8px)",
                        border: `1px solid ${s.color}60`,
                        boxShadow: `0 0 20px ${s.color}40`,
                      }}
                    >
                      <span className="text-white text-xs font-bold">{s.name}</span>
                      <span className="text-[10px] font-black" style={{ color: s.color }}>
                        {s.level}%
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap gap-3 justify-center mt-10">
          {[
            { label: "Frontend",   color: "#67e8f9" },
            { label: "Backend",    color: "#c084fc" },
            { label: "AI / ML",    color: "#a78bfa" },
            { label: "Automation", color: "#f0abfc" },
            { label: "DevOps",     color: "#34d399" },
            { label: "Security",   color: "#fbbf24" },
          ].map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: `${c.color}10`,
                border: `1px solid ${c.color}30`,
                color: c.color,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: c.color, boxShadow: `0 0 6px ${c.color}` }}
              />
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
