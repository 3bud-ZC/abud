"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Bot, ExternalLink, Github, Layers, Sparkles, User } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import HolographicCard from "@/components/effects/HolographicCard";

type AppLink = {
  title: string;
  tagline: string;
  desc: string;
  href: string;
  github?: string;
  accent: string;
  icon: React.ElementType;
  badge?: string;
};

const GITHUB_URL = "https://github.com/3bud-ZC";

const APPS: AppLink[] = [
  {
    title: "Iqtidaa (اقتداء)",
    tagline: "منصة إسلامية — ممارسات وأذكار ومحتوى",
    desc: "تطبيق ويب جاهز للتجربة. ركّزت فيه على تجربة استخدام سريعة + لوحة إدارة + قاعدة بيانات محلية على الـ VPS.",
    href: "https://iqtidaa.abud.fun/",
    accent: "#67e8f9",
    icon: Sparkles,
    badge: "Live",
  },
  {
    title: "PromptForge AI",
    tagline: "Prompt builder + أدوات ذكاء اصطناعي",
    desc: "واجهة بسيطة لتجهيز البرومبتس وإدارة الأدوات. مناسب كقاعدة لأتمتة شغل الـ AI.",
    href: "https://promptforge.abud.fun/",
    accent: "#c084fc",
    icon: Layers,
    badge: "Live",
  },
  {
    title: "Personal Task Manager Bot",
    tagline: "بوت تيليجرام ذكي لإدارة المهام",
    desc: "إضافة مهام بالأزرار أو باللغة الطبيعية، تنظيم حسب المشاريع، أولويات، تذكيرات، ملخص يومي، وإحصائيات — شغال 24/7 على VPS بـ Docker.",
    href: "https://github.com/3bud-ZC/Personal-Task-Manager-Telegram-Bot",
    accent: "#38bdf8",
    icon: Github,
    badge: "GitHub",
  },
  {
    title: "OG E‑Store",
    tagline: "ERP / نظام محاسبة وإدارة متجر",
    desc: "نظام ERP عملي لإدارة المبيعات والطلبات والعملاء والمخزون، مع لوحة تحكم وتقارير — جاهز للتجربة مباشرة.",
    href: "https://erp.abud.fun/",
    accent: "#34d399",
    icon: Layers,
    badge: "Live",
  },
  {
    title: "VPS Monitor Bot",
    tagline: "بوت مراقبة السيرفر (Telegram)",
    desc: "بوت تيليجرام لمراقبة موارد الـ VPS والتنبيهات عند ارتفاع الاستهلاك — مع لوحة أوامر بسيطة وتشغيل 24/7.",
    href: "https://github.com/3bud-ZC/vps_bot",
    accent: "#fbbf24",
    icon: Github,
    badge: "GitHub",
  },
];

const cardAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function PortfolioPage() {
  const stats = useMemo(() => ({ apps: APPS.length }), []);

  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <FloatingOrbs count={6} />
        <ScanLine duration={9} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-badge mb-6">
              <ExternalLink className="w-2.5 h-2.5" />
              Apps Portfolio
            </span>
            <h1
              className="font-black text-white mt-5 mb-4"
              style={{ fontSize: "clamp(2.1rem, 5vw, 3.3rem)", letterSpacing: "-0.02em" }}
            >
              أعمالي — روابط مباشرة للتطبيقات
            </h1>
            <p
              className="text-base md:text-lg max-w-2xl mx-auto mb-8"
              style={{ color: "#a8a8c8", lineHeight: 1.8 }}
            >
              بدل ما أعرض قائمة GitHub… هنا روابط مباشرة للتطبيقات اللي بنيتها فعلاً — افتح وجرّب فورًا.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="tag-pill text-xs px-3 py-1.5">✦ {stats.apps} Apps Live</span>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="tag-pill text-xs px-3 py-1.5 inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── APPS GRID ── */}
      <section className="py-14 px-4 relative overflow-hidden">
        <FloatingOrbs count={6} />
        <ScanLine duration={10} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {APPS.map((app) => {
              const Icon = app.icon;
              return (
                <motion.div key={app.href} variants={cardAnim} initial="hidden" animate="show">
                  <HolographicCard duration={6}>
                    <div className="p-6 md:p-7 h-full flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `${app.accent}1a`,
                              border: `1px solid ${app.accent}40`,
                              boxShadow: `0 0 18px ${app.accent}22`,
                              color: app.accent,
                            }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3
                                className="text-white font-black text-lg leading-tight"
                                style={{ letterSpacing: "-0.02em" }}
                              >
                                {app.title}
                              </h3>
                              {app.badge ? (
                                <span
                                  className="text-[11px] px-2 py-0.5 rounded-full"
                                  style={{
                                    background: `${app.accent}1a`,
                                    border: `1px solid ${app.accent}40`,
                                    color: app.accent,
                                  }}
                                >
                                  {app.badge}
                                </span>
                              ) : null}
                            </div>
                            <p className="text-xs mt-1" style={{ color: app.accent, opacity: 0.9 }}>
                              {app.tagline}
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed mb-6" style={{ color: "#9090b0" }}>
                        {app.desc}
                      </p>

                      <div className="mt-auto flex flex-wrap gap-2">
                        <a
                          href={app.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary btn-glow gap-2 text-sm py-2.5 px-5 inline-flex items-center"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>فتح التطبيق</span>
                        </a>
                        {app.github ? (
                          <a
                            href={app.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline gap-2 text-sm py-2.5 px-5 inline-flex items-center"
                          >
                            <Github className="w-4 h-4" />
                            <span>الكود</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ABOUT AUTHOR ── */}
      <section className="py-10 px-4 relative overflow-hidden">
        <FloatingOrbs count={4} />
        <ScanLine duration={12} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <AnimatedSection>
            <HolographicCard duration={7}>
              <Link href="/about" className="block group">
                <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-1 rounded-full"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0%, #c084fc 25%, transparent 50%, #67e8f9 75%, transparent 100%)",
                        padding: "2px",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                    <div
                      className="relative w-20 h-20 rounded-full overflow-hidden"
                      style={{
                        border: "2px solid rgba(192,132,252,0.5)",
                        boxShadow: "0 0 20px rgba(168,85,247,0.35)",
                      }}
                    >
                      <Image
                        src="/avatar.jpeg"
                        alt="Abud"
                        fill
                        sizes="80px"
                        unoptimized
                        className="object-cover"
                        style={{ objectPosition: "58% 65%", transform: "scale(1.05)" }}
                      />
                    </div>
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-[#0a0814]"
                      style={{ background: "#34d399", boxShadow: "0 0 10px #34d399" }}
                    />
                  </div>

                  {/* Bio */}
                  <div className="flex-1 min-w-0">
                    <span className="section-badge mb-3 inline-flex">
                      <User className="w-2.5 h-2.5" />
                      تعرّف على المطوّر
                    </span>
                    <h2
                      className="text-white font-black text-xl md:text-2xl mb-2 group-hover:text-purple-200 transition-colors"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      Abud — Full-Stack & AI Engineer
                    </h2>
                    <p className="text-sm mb-3" style={{ color: "#9090b0", lineHeight: 1.7 }}>
                      ورا كل المشاريع دي شخص واحد بيحب يبني حلول حقيقية. اعرف القصة الكاملة والمسيرة من 2019 لحد
                      دلوقتي.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-300 group-hover:text-purple-100 transition-colors">
                      <span>قصة Abud الكاملة</span>
                      <motion.span
                        animate={{ x: [0, -3, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </motion.span>
                    </span>
                  </div>
                </div>
              </Link>
            </HolographicCard>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 relative overflow-hidden">
        <FloatingOrbs count={5} />
        <ScanLine duration={11} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <AnimatedSection>
            <HolographicCard duration={6}>
              <div className="p-8 md:p-10 text-center">
                <h2 className="text-white font-black text-2xl mb-2" style={{ letterSpacing: "-0.02em" }}>
                  Want something built?
                </h2>
                <p className="text-sm mb-5" style={{ color: "#9090b0" }}>
                  I build custom AI tools, automation systems, and web products. Let&#39;s talk.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/contact" className="btn-primary btn-glow gap-2 text-sm py-2.5 px-6">
                    Start a Project
                  </Link>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline gap-2 text-sm py-2.5 px-5 inline-flex items-center"
                  >
                    <Github className="w-4 h-4" />
                    Follow on GitHub
                  </a>
                </div>
              </div>
            </HolographicCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
