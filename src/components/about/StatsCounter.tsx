"use client";

import { motion } from "framer-motion";
import { Code2, Users, Calendar, Layers, Shield, BarChart3, type LucideIcon } from "lucide-react";
import CountUp from "@/components/effects/CountUp";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import AnimatedSection from "@/components/ui/AnimatedSection";
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

const CONTEXT_MAP: Record<string, string> = {
  projects: "مشاريع متنوعة عبر قطاعات مختلفة",
  years: "خبرة متراكمة من تنفيذ حقيقي",
  clients: "من أفراد لشركات ومنصات ناشئة",
  published_apps: "منصات live مستخدمة يوميًا",
  quality: "اختبار شامل قبل كل تسليم",
};

const OUTCOME_MAP: Record<string, string> = {
  projects: "قدرة أعلى على اختيار الحل الأنسب",
  years: "قرارات أسرع وأخطاء أقل",
  clients: "فهم أدق للاحتياج التجاري",
  published_apps: "تحويل الفكرة لمنتج فعلي",
  quality: "استقرار وتقليل صيانة مستقبلية",
};

const STATS = TRUST_METRICS.map((metric) => ({
  icon: ICON_MAP[metric.id],
  value: metric.value,
  suffix: metric.suffix || "",
  label: metric.label,
  accent: ACCENT_MAP[metric.id],
  context: CONTEXT_MAP[metric.id],
  outcome: OUTCOME_MAP[metric.id],
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

      <div className="relative z-10 max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="section-badge mb-5 mx-auto">
            <BarChart3 className="w-2.5 h-2.5" />
            الأرقام بتتكلم
          </span>
          <h2 className="section-title mt-4 mb-3">نتائج مبنية على تنفيذ فعلي</h2>
          <p className="section-subtitle text-center max-w-2xl mx-auto">
            كل رقم هنا مرتبط بأثر واضح على سرعة التنفيذ وجودة الإطلاق.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="relative rounded-2xl p-5 text-center group overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, rgba(14,12,24,0.85), rgba(10,8,18,0.7))",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${stat.accent}30`,
                  boxShadow: `0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)`,
                }}
              >
                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-4 right-4 h-[2px] rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${stat.accent} 50%, transparent 100%)`,
                  }}
                />

                {/* Hover glow */}
                <div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${stat.accent}35 0%, transparent 60%)`,
                    filter: "blur(20px)",
                  }}
                />

                <div className="relative">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{
                      background: `linear-gradient(135deg, ${stat.accent}22, ${stat.accent}08)`,
                      border: `1px solid ${stat.accent}45`,
                      boxShadow: `inset 0 0 14px ${stat.accent}18, 0 0 16px ${stat.accent}15`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.accent }} />
                  </div>

                  <div
                    className="font-black text-2xl md:text-[1.75rem] mb-1.5"
                    style={{
                      background: `linear-gradient(135deg, #ffffff, ${stat.accent})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    <CountUp to={stat.value} duration={1.6} />
                    <span>{stat.suffix}</span>
                  </div>

                  <div className="text-xs font-semibold mb-1" style={{ color: "#c0c0dc" }}>
                    {stat.label}
                  </div>
                  <div className="text-[11px] leading-relaxed mb-3" style={{ color: "#7a7a9e" }}>
                    {stat.context}
                  </div>
                  <div
                    className="text-[11px] leading-relaxed px-3 py-2.5 rounded-xl"
                    style={{
                      color: "#d8d8ec",
                      background: `linear-gradient(135deg, ${stat.accent}0d, ${stat.accent}05)`,
                      border: `1px solid ${stat.accent}20`,
                    }}
                  >
                    {stat.outcome}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <AnimatedSection delay={0.2} className="text-center mt-10">
          <p className="text-xs" style={{ color: "#7a7a9e" }}>
            الأرقام دي مش للعرض — كل رقم وراه مشروع فعلي وعميل اشتغلت معاه.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
