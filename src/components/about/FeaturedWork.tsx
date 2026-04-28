"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Briefcase, Github, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import HolographicCard from "@/components/effects/HolographicCard";

interface Project {
  title: string;
  tagline: string;
  desc: string;
  tags: string[];
  accent: string;
  href?: string;
  github?: string;
  emoji: string;
}

// Curated showcase ─ hand-picked projects that represent the breadth of work.
const PROJECTS: Project[] = [
  {
    title: "ABUD Platform",
    tagline: "هذا الموقع — منصتي الشخصية الكاملة",
    desc: "Next.js 15 · TypeScript · Prisma · PostgreSQL — مدونة، متجر، dashboard إدارة، CMS، وأدوات AI كاملة.",
    tags: ["Next.js", "TypeScript", "Prisma", "AI"],
    accent: "#c084fc",
    href: "/portfolio",
    emoji: "✦",
  },
  {
    title: "AI Telegram Agents",
    tagline: "بوتات ذكاء اصطناعي للعملاء",
    desc: "بوتات تيليجرام بـ GPT-4 و Function Calling — دعم عملاء، حجوزات، تجارة إلكترونية.",
    tags: ["Python", "OpenAI", "aiogram", "PostgreSQL"],
    accent: "#67e8f9",
    href: "/services?category=bots",
    emoji: "✦",
  },
  {
    title: "RAG Knowledge Systems",
    tagline: "أنظمة استرجاع معرفية للشركات",
    desc: "تضمين docs الشركة في vector DB + استرجاع ذكي + إجابات دقيقة على أسئلة الموظفين والعملاء.",
    tags: ["RAG", "Qdrant", "Embeddings", "Cohere"],
    accent: "#a78bfa",
    href: "/services?category=ai",
    emoji: "✦",
  },
  {
    title: "n8n Automation Stacks",
    tagline: "أتمتة الأعمال للشركات والوكالات",
    desc: "workflows متكاملة بـ n8n self-hosted — من lead capture لـ CRM لـ invoicing تلقائياً.",
    tags: ["n8n", "Make", "VPS", "Webhooks"],
    accent: "#34d399",
    href: "/services?category=automation",
    emoji: "✦",
  },
  {
    title: "E-commerce Platforms",
    tagline: "متاجر إلكترونية كاملة",
    desc: "متاجر بـ Next.js + Stripe / Paymob — تكامل شحن، dashboard أدمن، تتبع طلبات، multi-vendor.",
    tags: ["Next.js", "Stripe", "Tailwind"],
    accent: "#f0abfc",
    href: "/services?category=ecommerce",
    emoji: "✦",
  },
  {
    title: "Security Audits",
    tagline: "اختبارات اختراق وفحص أمني",
    desc: "OWASP Top 10 audits — اكتشاف ثغرات + تقارير مفصلة + خطة إصلاح للمواقع الحرجة.",
    tags: ["Pentesting", "Burp Suite", "OWASP"],
    accent: "#f87171",
    href: "/services?category=security",
    emoji: "✦",
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="section-badge mb-5 mx-auto">
            <Briefcase className="w-2.5 h-2.5" />
            أعمال مختارة
          </span>
          <h2 className="section-title mt-4 mb-3">من المشاريع اللي بنيتها</h2>
          <p className="section-subtitle text-center max-w-xl mx-auto">
            نظرة سريعة على نوعية الشغل ─ من بوتات الذكاء الاصطناعي للأنظمة الأمنية والمتاجر الإلكترونية
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p, idx) => (
            <AnimatedSection key={p.title} delay={idx * 0.06}>
              <HolographicCard duration={6 + (idx % 3)} delay={(idx % 4) * 0.3}>
                <Link
                  href={p.href || "/portfolio"}
                  className="block p-5 group relative overflow-hidden h-full"
                >
                  {/* Accent glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${p.accent}1f 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-black"
                        style={{
                          background: `${p.accent}1a`,
                          border: `1px solid ${p.accent}40`,
                          color: p.accent,
                          boxShadow: `0 0 14px ${p.accent}25`,
                        }}
                      >
                        {p.emoji}
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="text-white font-bold text-sm leading-tight group-hover:text-purple-200 transition-colors"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {p.title}
                        </h3>
                        <p className="text-[10px] mt-0.5" style={{ color: p.accent, opacity: 0.85 }}>
                          {p.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed mb-4" style={{ color: "#9090b0" }}>
                      {p.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tags.map((t) => (
                        <span key={t} className="tag-pill text-[10px] py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div
                      className="flex items-center gap-1.5 text-xs font-semibold pt-3 mt-auto"
                      style={{
                        color: p.accent,
                        borderTop: "1px solid rgba(28,28,48,0.6)",
                      }}
                    >
                      <span>تفاصيل أكتر</span>
                      <motion.span
                        animate={{ x: [0, -3, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </motion.span>
                    </div>
                  </div>
                </Link>
              </HolographicCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA — link to full portfolio */}
        <AnimatedSection className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/portfolio" className="btn-primary btn-glow gap-2 inline-flex items-center">
              <Briefcase className="w-4 h-4" />
              <span>تصفّح كل أعمالي</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/3bud-ZC"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline gap-2 inline-flex items-center"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
