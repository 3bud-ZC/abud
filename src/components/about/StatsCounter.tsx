"use client";

import { motion } from "framer-motion";
import { Code2, Users, Calendar, Layers, Shield, type LucideIcon } from "lucide-react";
import CountUp from "@/components/effects/CountUp";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import { TRUST_METRICS } from "@/data/trust-metrics";

const ICON_MAP: Record<string, LucideIcon> = {
  projects: Code2,
  years: Calendar,
  clients: Users,
  published_apps: Layers,
  quality: Shield,
};

const ACCENT_MAP: Record<string, string> = {
  projects: "#c084fc",
  years: "#67e8f9",
  clients: "#a78bfa",
  published_apps: "#fbbf24",
  quality: "#34d399",
};

const STATS = TRUST_METRICS.map((metric) => ({
  icon: ICON_MAP[metric.id],
  value: metric.value,
  suffix: metric.suffix || "",
  label: metric.label,
  accent: ACCENT_MAP[metric.id],
}));

export default function StatsCounter() {
  return (
    <section
      className="py-20 px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg,#080810 0%,#0a0814 50%,#080810 100%)",
        borderTop: "1px solid rgba(28,28,48,0.5)",
        borderBottom: "1px solid rgba(28,28,48,0.5)",
      }}
    >
      <FloatingOrbs count={5} />
      <ScanLine duration={11} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_50%,rgba(147,51,234,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="relative rounded-2xl p-4 text-center group overflow-hidden"
                style={{
                  background: "rgba(10,8,18,0.7)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${stat.accent}25`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
                }}
              >
                {/* Top holographic bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px"
                  animate={{ opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${stat.accent} 50%, transparent 100%)`,
                  }}
                />

                {/* Glow on hover */}
                <div
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${stat.accent}40 0%, transparent 70%)`,
                    filter: "blur(16px)",
                  }}
                />

                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{
                      background: `linear-gradient(135deg, ${stat.accent}25, ${stat.accent}05)`,
                      border: `1px solid ${stat.accent}40`,
                      boxShadow: `inset 0 0 12px ${stat.accent}15`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: stat.accent }} />
                  </div>

                  <div
                    className="font-black text-2xl md:text-3xl mb-1"
                    style={{
                      background: `linear-gradient(135deg, #ffffff, ${stat.accent})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    <>
                      <CountUp to={stat.value} duration={1.6} />
                      <span>{stat.suffix}</span>
                    </>
                  </div>

                  <div className="text-[11px] font-medium" style={{ color: "#9090b0" }}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
