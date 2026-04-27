"use client";

import { motion } from "framer-motion";
import {
  Code2, Globe, Database, Cloud, Brain, Bot, Cpu, GitBranch,
  Layers, Zap, Shield, Terminal,
} from "lucide-react";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import AnimatedSection from "@/components/ui/AnimatedSection";

const TECH_GROUPS = [
  {
    title: "Frontend",
    icon: Globe,
    color: "#67e8f9",
    items: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: Database,
    color: "#c084fc",
    items: ["Node.js", "Prisma ORM", "PostgreSQL", "Redis", "REST + GraphQL"],
  },
  {
    title: "AI / ML",
    icon: Brain,
    color: "#a78bfa",
    items: ["OpenAI GPT-4", "Anthropic Claude", "Gemini Pro", "RAG Systems", "Vector DBs"],
  },
  {
    title: "Automation",
    icon: Bot,
    color: "#f0abfc",
    items: ["n8n", "Make.com", "Zapier", "Telegraf.js", "Webhooks"],
  },
  {
    title: "Infrastructure",
    icon: Cloud,
    color: "#34d399",
    items: ["Vercel", "Docker", "Cloudflare", "AWS / GCP", "CI/CD Pipelines"],
  },
  {
    title: "Security",
    icon: Shield,
    color: "#fbbf24",
    items: ["OWASP Top 10", "Pen-Testing", "Auth/JWT", "Rate Limiting", "Encryption"],
  },
];

export default function TechStackSection() {
  return (
    <section
      className="py-20 px-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(7,6,18,1) 0%, rgba(10,8,22,1) 50%, rgba(7,6,18,1) 100%)",
        borderTop: "1px solid rgba(28,28,48,0.5)",
        borderBottom: "1px solid rgba(28,28,48,0.5)",
      }}
    >
      <FloatingOrbs count={6} />
      <ScanLine duration={11} direction="vertical" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_50%,rgba(147,51,234,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="section-badge mb-5 mx-auto">
            <Cpu className="w-2.5 h-2.5" />
            التقنيات
          </span>
          <h2 className="section-title mt-4 mb-3">الأدوات التي أتقنها</h2>
          <p className="section-subtitle text-center max-w-xl mx-auto">
            توليفة دقيقة من أحدث التقنيات لبناء حلول قوية وسريعة وآمنة
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_GROUPS.map((group, i) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                className="relative rounded-2xl overflow-hidden group"
                style={{
                  background: "rgba(10,8,18,0.7)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${group.color}25`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
                }}
              >
                {/* Animated holographic top bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${group.color} 50%, transparent 100%)`,
                  }}
                  animate={{ opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                />

                {/* Halo glow on hover */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${group.color}40 0%, transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                />

                <div className="p-5 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${group.color}25, ${group.color}05)`,
                        border: `1px solid ${group.color}40`,
                        boxShadow: `inset 0 0 12px ${group.color}15`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: group.color }} />
                    </div>
                    <h3 className="text-white font-bold text-base" style={{ letterSpacing: "-0.01em" }}>
                      {group.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item, j) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.08 + 0.2 + j * 0.05 }}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          background: `${group.color}10`,
                          border: `1px solid ${group.color}28`,
                          color: `${group.color}ee`,
                        }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8"
          style={{ borderTop: "1px solid rgba(168,85,247,0.15)" }}
        >
          {[
            { icon: Code2,   value: "+30",  label: "تقنية أتقنها", accent: "#c084fc" },
            { icon: Layers,  value: "+50",  label: "مشروع منجز",   accent: "#67e8f9" },
            { icon: Zap,     value: "99%",  label: "Uptime ضمان",  accent: "#34d399" },
            { icon: Terminal,value: "5+",   label: "سنوات خبرة",   accent: "#fbbf24" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-3 px-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${s.accent}15`,
                    border: `1px solid ${s.accent}30`,
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: s.accent }} />
                </div>
                <div className="min-w-0">
                  <div className="text-white text-xl font-black leading-none" style={{ letterSpacing: "-0.02em" }}>
                    {s.value}
                  </div>
                  <div className="text-[11px] mt-1 truncate" style={{ color: "#9090b0" }}>
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
