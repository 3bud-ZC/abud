"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Code2, BookOpen } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import MatrixRain from "@/components/effects/MatrixRain";
import AuroraBeams from "@/components/effects/AuroraBeams";
import HolographicCard from "@/components/effects/HolographicCard";
import ParticleField from "@/components/effects/ParticleField";
import SectionDivider from "@/components/effects/SectionDivider";

import ProfileHero from "@/components/about/ProfileHero";
import CurrentlyWorking from "@/components/about/CurrentlyWorking";
import StatsCounter from "@/components/about/StatsCounter";
import SkillConstellation from "@/components/about/SkillConstellation";
import DailyStack from "@/components/about/DailyStack";
import PrinciplesSection from "@/components/about/PrinciplesSection";

const timeline = [
  { year: "2019", title: "البداية مع البرمجة", desc: "بدأت رحلتي مع HTML و CSS ثم JavaScript — كان كل سطر كود يشعرني بقوة لا نهاية لها." },
  { year: "2020", title: "أول مشروع حقيقي", desc: "بنيت أول موقع ويب حقيقي لعميل وأدركت أن هذا هو طريقي." },
  { year: "2021", title: "دخول عالم Python والأتمتة", desc: "تعمقت في Python وبدأت بناء أدوات الأتمتة وبوتات تيليجرام." },
  { year: "2022", title: "الذكاء الاصطناعي والنماذج اللغوية", desc: "بدأت العمل مع ChatGPT API وبناء تطبيقات الذكاء الاصطناعي." },
  { year: "2023", title: "Full-Stack وتوسيع الخدمات", desc: "أتقنت Next.js وبنيت منصات ومشاريع متكاملة لعملاء متنوعين." },
  { year: "2024+", title: "ABUD Platform", desc: "أطلقت منصتي الخاصة وأستمر في بناء الأدوات والمنتجات الرقمية." },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* ─────────── HERO ─────────── */}
      <section className="relative py-20 lg:py-28 px-4 overflow-hidden">
        <AuroraBeams />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(147,51,234,0.18)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <MatrixRain opacity={0.08} fontSize={12} />
        <FloatingOrbs count={6} />
        <ParticleField density={35} />
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
              رحلة 5+ سنوات من البرمجة، التعلم، وبناء الحلول
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
              {timeline.map(({ year, title, desc }, i) => (
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
                          <div className="md:hidden text-xs font-bold mb-2" style={{ color: "#c084fc" }}>
                            {year}
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
                    هل تريد العمل معي؟
                  </h2>
                  <p className="mb-8 max-w-lg mx-auto" style={{ color: "#a0a0c0", fontSize: "0.95rem", lineHeight: 1.7 }}>
                    سواء كان مشروعك موقعًا أو تطبيقًا أو أداة ذكاء اصطناعي — أنا دائمًا مفتوح لأفكار جديدة.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <a href="/contact" className="btn-primary btn-glow gap-2 inline-flex">
                      <ArrowLeft className="w-4 h-4" />
                      تواصل معي
                    </a>
                    <a href="/portfolio" className="btn-outline gap-2 inline-flex">
                      <Code2 className="w-4 h-4" />
                      شاهد أعمالي
                    </a>
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
