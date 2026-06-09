"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Globe, Palette, BrainCircuit, Cloud, Box, GitBranch, Music, Headphones } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const DAILY_TOOLS = [
  { icon: Code2,        name: "Cursor",          tag: "Editor",       color: "#c084fc", desc: "تطوير أسرع مع مراجعة لحظية" },
  { icon: Terminal,     name: "Win Terminal",    tag: "Terminal",     color: "#67e8f9", desc: "تشغيل، فحص، وأتمتة يومية" },
  { icon: Globe,        name: "Arc Browser",     tag: "Browser",      color: "#a78bfa", desc: "بيئة اختبار وتجربة عميل" },
  { icon: Palette,      name: "Figma",           tag: "Design",       color: "#f0abfc", desc: "تحويل الفكرة لواجهات واضحة" },
  { icon: BrainCircuit, name: "Claude + GPT-4",  tag: "AI Pair",      color: "#34d399", desc: "تحليل سريع وحلول أدق" },
  { icon: Cloud,        name: "Vercel",          tag: "Hosting",      color: "#fbbf24", desc: "نشر سريع ومراقبة الأداء" },
  { icon: Box,          name: "Docker",          tag: "Containers",   color: "#67e8f9", desc: "بيئة متطابقة بين المحلي والإنتاج" },
  { icon: GitBranch,    name: "GitHub",          tag: "VCS + CI",     color: "#c084fc", desc: "إدارة إصدارات وتسليم منظم" },
  { icon: Headphones,   name: "Spotify",         tag: "Focus Music",  color: "#a78bfa", desc: "جلسات deep work بدون مشتتات" },
  { icon: Music,        name: "Notion",          tag: "Knowledge",    color: "#f0abfc", desc: "توثيق القرارات وخطة التنفيذ" },
];

const STACK_PROMISES = [
  "اختيار الأدوات حسب هدف المشروع مش حسب الترند",
  "تقليل الوقت الضائع بين التصميم، التطوير، والإطلاق",
  "تسليم قابل للصيانة من أول نسخة",
];

const CAPABILITY_FLOW = [
  { stage: "Discovery", value: "فهم المشكلة + تحديد الأولويات" },
  { stage: "Build", value: "تطوير منظم بمخرجات واضحة" },
  { stage: "Launch", value: "إطلاق مستقر ومراقبة مستمرة" },
];

export default function DailyStack() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(147,51,234,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <span className="section-badge mb-5 mx-auto">
            <Box className="w-2.5 h-2.5" />
            عُدّتي اليومية
          </span>
          <h2 className="section-title mt-4 mb-3">الأدوات التي ترافقني يومياً</h2>
          <p className="section-subtitle text-center max-w-xl mx-auto">
            Stack عملي مصمم لتسليم أسرع وجودة أعلى من أول Sprint
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.05} className="mb-8">
          <div
            className="rounded-2xl p-4 md:p-5"
            style={{
              background: "rgba(12,10,22,0.75)",
              border: "1px solid rgba(192,132,252,0.24)",
            }}
          >
            <div className="grid md:grid-cols-3 gap-3">
              {STACK_PROMISES.map((promise) => (
                <div key={promise} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#c084fc" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "#b4b4cf" }}>
                    {promise}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08} className="mb-8">
          <div className="grid md:grid-cols-3 gap-3">
            {CAPABILITY_FLOW.map((item) => (
              <div
                key={item.stage}
                className="rounded-xl px-4 py-3"
                style={{
                  background: "rgba(10,8,18,0.72)",
                  border: "1px solid rgba(103,232,249,0.2)",
                }}
              >
                <div className="text-[10px] font-black tracking-wider mb-1" style={{ color: "#82e9ff" }}>
                  {item.stage}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#c6d4dd" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {DAILY_TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="relative rounded-xl p-4 text-center group overflow-hidden cursor-default"
                style={{
                  background: "rgba(10,8,18,0.7)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${tool.color}22`,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                }}
              >
                {/* Pulse top bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px"
                  animate={{ opacity: [0.3, 0.85, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${tool.color} 50%, transparent 100%)`,
                  }}
                />

                {/* Halo on hover */}
                <div
                  className="absolute -top-8 -right-8 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${tool.color}50 0%, transparent 70%)`,
                    filter: "blur(14px)",
                  }}
                />

                <div className="relative">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-2.5 transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${tool.color}25, ${tool.color}05)`,
                      border: `1px solid ${tool.color}40`,
                      boxShadow: `inset 0 0 12px ${tool.color}15`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: tool.color }} />
                  </div>
                  <div className="text-white font-bold text-xs mb-1" style={{ letterSpacing: "-0.01em" }}>
                    {tool.name}
                  </div>
                  <div className="text-[10px] mb-2" style={{ color: `${tool.color}cc` }}>
                    {tool.tag}
                  </div>
                  <div className="text-[10px] leading-relaxed" style={{ color: "#7a7a95" }}>
                    {tool.desc}
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
