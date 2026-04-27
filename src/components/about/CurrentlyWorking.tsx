"use client";

import { motion } from "framer-motion";
import { Activity, BookOpen, Coffee, Headphones, Zap, Briefcase } from "lucide-react";
import HolographicCard from "@/components/effects/HolographicCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ACTIVITIES = [
  {
    icon: Briefcase,
    title: "أعمل حالياً على",
    items: [
      "ABUD Platform 2.0",
      "AI Trading Bot للعملات الرقمية",
      "نظام أتمتة CRM متكامل",
    ],
    accent: "#c084fc",
    label: "Building",
  },
  {
    icon: BookOpen,
    title: "أتعلم هذا الشهر",
    items: [
      "Rust + WebAssembly",
      "Vector Databases (Pinecone, Weaviate)",
      "Edge Computing مع Cloudflare Workers",
    ],
    accent: "#67e8f9",
    label: "Learning",
  },
  {
    icon: Headphones,
    title: "أستمع إليه",
    items: [
      "Lex Fridman Podcast",
      "Syntax.fm",
      "Hala Lounge (للتركيز)",
    ],
    accent: "#a78bfa",
    label: "Listening",
  },
  {
    icon: Coffee,
    title: "إحصائيات اليوم",
    items: [
      "☕ 3 فناجين قهوة",
      "💻 8+ ساعات كود",
      "🚀 12 commits",
    ],
    accent: "#fbbf24",
    label: "Today",
  },
];

export default function CurrentlyWorking() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(147,51,234,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="section-badge mb-5 mx-auto">
            <Activity className="w-2.5 h-2.5" />
            حالة مباشرة
          </span>
          <h2 className="section-title mt-4 mb-3 inline-flex items-center gap-3 justify-center">
            <span>أين أنا الآن</span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" style={{ boxShadow: "0 0 12px #34d399" }} />
            </span>
          </h2>
          <p className="section-subtitle text-center max-w-xl mx-auto">
            نظرة حية على ما أبنيه، أتعلمه، وأقضي فيه يومي
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-4">
          {ACTIVITIES.map(({ icon: Icon, title, items, accent, label }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <HolographicCard duration={5 + (i % 3)} delay={i * 0.3}>
                <div className="p-6 relative">
                  {/* Live label badge */}
                  <span
                    className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: `${accent}15`,
                      border: `1px solid ${accent}40`,
                      color: accent,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
                    />
                    {label}
                  </span>

                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${accent}30, ${accent}08)`,
                        border: `1px solid ${accent}50`,
                        boxShadow: `inset 0 0 14px ${accent}20, 0 0 18px ${accent}25`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: accent }} />
                    </div>
                    <h3 className="text-white font-bold text-base mt-1.5" style={{ letterSpacing: "-0.01em" }}>
                      {title}
                    </h3>
                  </div>

                  <ul className="space-y-2.5">
                    {items.map((item, j) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 + 0.2 + j * 0.07 }}
                        className="flex items-start gap-2.5 text-sm"
                        style={{ color: "#b0b0c8" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ background: accent, boxShadow: `0 0 4px ${accent}` }}
                        />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
