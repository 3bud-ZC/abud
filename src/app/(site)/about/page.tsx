"use client";

import { motion } from "framer-motion";
import { Code2, BrainCircuit, Bot, Globe, Shield, Layers, Zap, Terminal, Database, GitBranch, ArrowLeft, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import MatrixRain from "@/components/effects/MatrixRain";
import AuroraBeams from "@/components/effects/AuroraBeams";
import HolographicCard from "@/components/effects/HolographicCard";
import AnimatedBar from "@/components/effects/AnimatedBar";
import ParticleField from "@/components/effects/ParticleField";

const skills = [
  { name: "Next.js / React", level: 95, icon: Globe },
  { name: "Python / FastAPI", level: 88, icon: Terminal },
  { name: "Node.js / TypeScript", level: 90, icon: Code2 },
  { name: "AI / LLMs / GPT", level: 85, icon: BrainCircuit },
  { name: "Telegram Bot API", level: 92, icon: Bot },
  { name: "PostgreSQL / Prisma", level: 87, icon: Database },
  { name: "DevOps / VPS", level: 80, icon: Layers },
  { name: "Cybersecurity", level: 78, icon: Shield },
];

const timeline = [
  { year: "2019", title: "البداية مع البرمجة", desc: "بدأت رحلتي مع HTML و CSS ثم JavaScript — كان كل سطر كود يشعرني بقوة لا نهاية لها." },
  { year: "2020", title: "أول مشروع حقيقي", desc: "بنيت أول موقع ويب حقيقي لعميل وأدركت أن هذا هو طريقي." },
  { year: "2021", title: "دخول عالم Python والأتمتة", desc: "تعمقت في Python وبدأت بناء أدوات الأتمتة وبوتات تيليجرام." },
  { year: "2022", title: "الذكاء الاصطناعي والنماذج اللغوية", desc: "بدأت العمل مع ChatGPT API وبناء تطبيقات الذكاء الاصطناعي." },
  { year: "2023", title: "Full-Stack وتوسيع الخدمات", desc: "أتقنت Next.js وبنيت منصات ومشاريع متكاملة لعملاء متنوعين." },
  { year: "2024+", title: "ABUD Platform", desc: "أطلقت منصتي الخاصة وأستمر في بناء الأدوات والمنتجات الرقمية." },
];

const highlights = [
  { icon: Code2,       title: "+50 مشروع",   desc: "مشاريع ومواقع منجزة بجودة عالية" },
  { icon: BrainCircuit,title: "AI Builder", desc: "متخصص في بناء أدوات الذكاء الاصطناعي" },
  { icon: Bot,         title: "+20 بوت",    desc: "بوتات تيليجرام احترافية منجزة" },
  { icon: GitBranch,   title: "Open Source",desc: "مساهمات في مشاريع مفتوحة المصدر" },
];

const valueProps = [
  "أسلم المشاريع في الوقت المحدد — دائمًا",
  "جودة كود عالية وأداء استثنائي",
  "تواصل واضح طوال كل مرحلة",
  "حلول تقنية مبتكرة لكل تحدي",
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative py-24 px-4 overflow-hidden">
        <AuroraBeams />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(147,51,234,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <MatrixRain opacity={0.08} fontSize={12} />
        <FloatingOrbs count={6} />
        <ParticleField density={35} />
        <ScanLine duration={10} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-badge mb-6">
              <Zap className="w-2.5 h-2.5" />
              من أنا
            </span>
            <h1 className="font-black text-white mt-5 mb-4" style={{ fontSize: "clamp(2.2rem,6vw,4rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              مرحبًا، أنا{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #f0abfc, #c084fc, #9333ea)" }}>ABUD</span>
            </h1>
            <p style={{ color: "#606070", fontSize: "1rem", maxWidth: "34rem", margin: "0 auto", lineHeight: 1.75 }}>
              مطور ويب وصانع أدوات رقمية، أبني الحلول التقنية المتكاملة بعقلية سيبرانية وشغف حقيقي بالتقنية.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <AnimatedSection direction="right">
              <div className="space-y-4">
                <h2 className="text-xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>قصتي مع التقنية</h2>
                <p style={{ color: "#7070a0", lineHeight: 1.75, fontSize: "0.9rem" }}>
                  أنا مطور Full-Stack وصانع منتجات رقمية متخصص في بناء تجارب ويب متكاملة وأدوات ذكاء اصطناعي وأنظمة أتمتة. أؤمن أن التقنية هي أقوى أداة لتحويل الأفكار إلى واقع.
                </p>
                <p style={{ color: "#7070a0", lineHeight: 1.75, fontSize: "0.9rem" }}>
                  أبدأ كل مشروع بفهم عميق لما يحتاجه العميل حقًا، ثم أبنيه بدقة وجودة تتجاوز التوقعات. لا أؤمن بالحلول النصف — إما مكتمل أو لا شيء.
                </p>
                <p style={{ color: "#7070a0", lineHeight: 1.75, fontSize: "0.9rem" }}>
                  عالمي يدور حول الكود، والذكاء الاصطناعي، والأمن السيبراني، والأتمتة. كل يوم أتعلم شيئًا جديدًا وأطبقه مباشرةً.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.1}>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {highlights.map(({ icon: Icon, title, desc }, i) => (
                  <HolographicCard key={title} duration={5 + (i % 2)} delay={i * 0.4}>
                    <div className="p-4 text-center">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2.5"
                        style={{ background: "linear-gradient(135deg,rgba(147,51,234,0.3),rgba(34,211,238,0.15))", border: "1px solid rgba(192,132,252,0.4)", boxShadow: "0 0 18px rgba(147,51,234,0.35)" }}>
                        <Icon className="w-4 h-4 text-purple-200" />
                      </div>
                      <div className="font-bold text-white text-xs mb-1" style={{ letterSpacing: "-0.01em" }}>{title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: "#9090b0" }}>{desc}</div>
                    </div>
                  </HolographicCard>
                ))}
              </div>
              <div className="glass-card p-4 space-y-2">
                <p className="text-xs font-semibold mb-3" style={{ color: "#8060b0" }}>لماذا تختارني؟</p>
                {valueProps.map(v => (
                  <div key={v} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-purple-400" />
                    <span className="text-xs" style={{ color: "#9090b0" }}>{v}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-4 bg-[#080810] relative overflow-hidden">
        <FloatingOrbs count={4} />
        <ScanLine duration={13} direction="vertical" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title mb-3">المهارات التقنية</h2>
            <p className="text-[#a0a0b8]">الأدوات والتقنيات التي أتقنها وأعمل بها يوميًا</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-4">
            {skills.map(({ name, level, icon: Icon }, i) => (
              <AnimatedSection key={name} delay={i * 0.07}>
                <HolographicCard duration={6} delay={i * 0.3}>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg,rgba(147,51,234,0.3),rgba(34,211,238,0.15))", border: "1px solid rgba(192,132,252,0.4)", boxShadow: "0 0 14px rgba(147,51,234,0.3)" }}>
                          <Icon className="w-3.5 h-3.5 text-purple-200" />
                        </div>
                        <span className="text-white font-medium text-sm">{name}</span>
                      </div>
                      <span className="text-xs font-black neon-text" style={{ color: "#c084fc" }}>{level}%</span>
                    </div>
                    <AnimatedBar to={level} delay={0.1 + i * 0.05} duration={1.4} />
                  </div>
                </HolographicCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 relative overflow-hidden">
        <FloatingOrbs count={3} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title mb-3">مسيرتي</h2>
            <p className="text-[#a0a0b8]">من أول سطر كود حتى الآن</p>
          </AnimatedSection>

          <div className="relative">
            <div
              className="absolute right-[calc(50%-1px)] top-0 bottom-0 w-0.5 hidden md:block"
              style={{
                background: "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.6) 15%, rgba(34,211,238,0.4) 50%, rgba(168,85,247,0.6) 85%, transparent 100%)",
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
                        animate={{ scale: [1, 1.3, 1], boxShadow: ["0 0 10px rgba(147,51,234,0.6)", "0 0 22px rgba(168,85,247,0.95)", "0 0 10px rgba(147,51,234,0.6)"] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
                        className="w-3.5 h-3.5 rounded-full bg-purple-500 border-2 border-purple-300 mt-1.5"
                      />
                    </div>

                    <div className="flex-1 md:w-1/2">
                      <HolographicCard duration={6} delay={i * 0.4}>
                        <div className="p-5">
                          <div className="md:hidden text-xs font-bold mb-2" style={{ color: "#c084fc" }}>{year}</div>
                          <h3 className="text-white font-bold text-sm mb-1.5" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
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

      {/* CTA */}
      <section className="py-20 px-4 bg-[#080810] relative overflow-hidden">
        <FloatingOrbs count={4} />
        <ScanLine duration={11} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <AnimatedSection>
            <HolographicCard duration={6}>
              <div className="p-8 md:p-12 relative text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(147,51,234,0.15)_0%,transparent_60%)] pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                  style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-medium">متاح للمشاريع الجديدة</span>
                </div>
                <h2 className="font-black text-white mb-3" style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", letterSpacing: "-0.025em" }}>
                  هل تريد العمل معي؟
                </h2>
                <p className="mb-8 max-w-lg mx-auto" style={{ color: "#606070", fontSize: "0.95rem", lineHeight: 1.7 }}>
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
