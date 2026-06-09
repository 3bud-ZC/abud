"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Code2, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import HolographicCard from "@/components/effects/HolographicCard";
import SectionDivider from "@/components/effects/SectionDivider";

import ProfileHero from "@/components/about/ProfileHero";
import CurrentlyWorking from "@/components/about/CurrentlyWorking";
import StatsCounter from "@/components/about/StatsCounter";
import SkillConstellation from "@/components/about/SkillConstellation";
import DailyStack from "@/components/about/DailyStack";
import PrinciplesSection from "@/components/about/PrinciplesSection";

const timeline = [
  {
    year: "2019",
    title: "البداية مع الويب",
    desc: "بدأت رحلتي مع HTML و CSS وJavaScript، ومن وقتها وأنا مركز على بناء منتجات حقيقية مش مجرد أكواد تجريبية.",
    impact: "بناء الأساس التقني",
  },
  {
    year: "2020",
    title: "أول مشاريع مدفوعة",
    desc: "اشتغلت على أول مواقع لعملاء فعليين، واتعلمت من البداية إن النجاح الحقيقي = نتيجة تجارية واضحة للعميل.",
    impact: "تنفيذ فعلي للسوق",
  },
  {
    year: "2021",
    title: "الأتمتة وبوتات تيليجرام",
    desc: "دخلت بقوة في Python والأتمتة، وبنيت بوتات وأدوات قللت وقت التشغيل اليدوي للمشاريع بشكل ملموس.",
    impact: "تسريع التشغيل اليومي",
  },
  {
    year: "2022",
    title: "حلول AI وتكاملات ذكية",
    desc: "بدأت تطوير حلول تعتمد على نماذج لغوية وواجهات APIs للذكاء الاصطناعي لتحسين خدمة العملاء والإنتاجية.",
    impact: "رفع إنتاجية الفرق",
  },
  {
    year: "2023",
    title: "توسّع Full-Stack",
    desc: "بنيت أنظمة ومواقع متكاملة بـ Next.js وPrisma وPostgreSQL، مع تركيز قوي على الأداء والاستقرار.",
    impact: "منصات قابلة للتوسع",
  },
  {
    year: "2024+",
    title: "ABUD Platform",
    desc: "أطلقت منصة ABUD كقاعدة خدمات متكاملة: مواقع، أنظمة، أتمتة، وذكاء اصطناعي موجه للأعمال.",
    impact: "حلول متكاملة تحت سقف واحد",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* ─────────── HERO ─────────── */}
      <section className="relative py-20 lg:py-28 px-4 overflow-hidden">
        <FloatingOrbs count={4} />
        <ScanLine duration={10} />

        <div className="relative z-10">
          <ProfileHero />
        </div>
      </section>

      <SectionDivider variant="line" />

      {/* ─────────── STATS ─────────── */}
      <StatsCounter />

      <SectionDivider variant="gradient" height={40} />

      {/* ─────────── CURRENTLY WORKING ─────────── */}
      <CurrentlyWorking />

      <SectionDivider variant="line" />

      {/* ─────────── SKILL CONSTELLATION ─────────── */}
      <SkillConstellation />

      <SectionDivider variant="gradient" height={40} />

      {/* ─────────── DAILY STACK ─────────── */}
      <DailyStack />

      <SectionDivider variant="line" />

      {/* ─────────── PRINCIPLES ─────────── */}
      <PrinciplesSection />

      <SectionDivider variant="gradient" height={40} />

      {/* ─────────── TIMELINE ─────────── */}
      <section className="py-20 px-4 relative overflow-hidden">
        <FloatingOrbs count={3} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="section-badge mb-5 mx-auto">
              <BookOpen className="w-2.5 h-2.5" />
              مسيرتي
            </span>
            <h2 className="section-title mt-4 mb-3">من أول سطر كود حتى الآن</h2>
            <p className="section-subtitle text-center max-w-xl mx-auto">
              رحلة تنفيذ حقيقية تركّز على النتيجة: سرعة، استقرار، وقيمة ملموسة لصاحب المشروع
            </p>
          </AnimatedSection>

          <div className="relative">
            <div
              className="absolute right-[calc(50%-1px)] top-0 bottom-0 w-0.5 hidden md:block"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.6) 15%, rgba(34,211,238,0.4) 50%, rgba(168,85,247,0.6) 85%, transparent 100%)",
                boxShadow: "0 0 14px rgba(168,85,247,0.5)",
              }}
            />

            <div className="space-y-8">
              {timeline.map(({ year, title, desc, impact }, i) => (
                <AnimatedSection key={year} delay={i * 0.1}>
                  <div className={`flex gap-6 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    <div className="hidden md:flex items-start justify-center w-1/2">
                      <div className={`text-right ${i % 2 === 0 ? "text-left" : ""}`}>
                        <span className="text-3xl font-black text-purple-600/30">{year}</span>
                      </div>
                    </div>

                    <div className="hidden md:flex flex-col items-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          boxShadow: [
                            "0 0 10px rgba(147,51,234,0.6)",
                            "0 0 22px rgba(168,85,247,0.95)",
                            "0 0 10px rgba(147,51,234,0.6)",
                          ],
                        }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
                        className="w-3.5 h-3.5 rounded-full bg-purple-500 border-2 border-purple-300 mt-1.5"
                      />
                    </div>

                    <div className="flex-1 md:w-1/2">
                      <HolographicCard duration={6} delay={i * 0.4}>
                        <div className="p-5">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <div className="text-xs font-bold" style={{ color: "#c084fc" }}>
                              {year}
                            </div>
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{
                                color: "#67e8f9",
                                background: "rgba(103,232,249,0.12)",
                                border: "1px solid rgba(103,232,249,0.3)",
                              }}
                            >
                              {impact}
                            </span>
                          </div>
                          <h3 className="text-white font-bold text-sm mb-1.5" style={{ letterSpacing: "-0.01em" }}>
                            {title}
                          </h3>
                          <p style={{ color: "#9090b0", fontSize: "0.8rem", lineHeight: 1.7 }}>{desc}</p>
                        </div>
                      </HolographicCard>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="line" />

      {/* ─────────── CTA ─────────── */}
      <section className="py-20 px-4 bg-[#080810] relative overflow-hidden">
        <FloatingOrbs count={4} />
        <ScanLine duration={11} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <AnimatedSection>
            <HolographicCard duration={6}>
              <div className="p-8 md:p-12 relative text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(147,51,234,0.15)_0%,transparent_60%)] pointer-events-none" />
                <div className="relative">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                    style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-medium">متاح للمشاريع الجديدة</span>
                  </div>
                  <h2
                    className="font-black text-white mb-3"
                    style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", letterSpacing: "-0.025em" }}
                  >
                    جاهز نبدأ مشروعك بشكل احترافي؟
                  </h2>
                  <p className="mb-8 max-w-lg mx-auto" style={{ color: "#a0a0c0", fontSize: "0.95rem", lineHeight: 1.7 }}>
                    سواء محتاج موقع، نظام ERP/CRM، أو أداة AI مخصصة — نقدر نبدأ بخطوة واضحة اليوم.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link href="/quote" className="btn-primary btn-glow gap-2 inline-flex items-center">
                      <Sparkles className="w-4 h-4" />
                      احسب تكلفة مشروعك
                    </Link>
                    <Link href="/contact" className="btn-outline gap-2 inline-flex items-center">
                      <ArrowLeft className="w-4 h-4" />
                      احجز مكالمة البداية
                    </Link>
                    <Link href="/portfolio" className="btn-outline gap-2 inline-flex items-center">
                      <Code2 className="w-4 h-4" />
                      استعرض أعمالي
                    </Link>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
