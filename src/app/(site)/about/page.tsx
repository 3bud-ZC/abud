"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  Code2,
  Handshake,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  TimerReset,
  type LucideIcon,
} from "lucide-react";
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
import FeaturedWork from "@/components/about/FeaturedWork";

const SECTION_LINKS = [
  { id: "intro", href: "#intro", label: "نبذة" },
  { id: "skills", href: "#skills", label: "المهارات" },
  { id: "timeline", href: "#timeline", label: "المسيرة" },
  { id: "featured", href: "#featured", label: "الأعمال" },
  { id: "workflow", href: "#workflow", label: "طريقة الشغل" },
  { id: "faq", href: "#faq", label: "أسئلة شائعة" },
];

const timeline = [
  {
    year: "2019",
    title: "البداية مع الويب",
    desc: "بدأت رحلتي مع HTML و CSS وJavaScript، ومن وقتها وأنا مركز على بناء منتجات حقيقية مش مجرد أكواد تجريبية.",
  },
  {
    year: "2020",
    title: "أول مشاريع مدفوعة",
    desc: "اشتغلت على أول مواقع لعملاء فعليين، واتعلمت من البداية إن النجاح الحقيقي = نتيجة تجارية واضحة للعميل.",
  },
  {
    year: "2021",
    title: "الأتمتة وبوتات تيليجرام",
    desc: "دخلت بقوة في Python والأتمتة، وبنيت بوتات وأدوات قللت وقت التشغيل اليدوي للمشاريع بشكل ملموس.",
  },
  {
    year: "2022",
    title: "حلول AI وتكاملات ذكية",
    desc: "بدأت تطوير حلول تعتمد على نماذج لغوية وواجهات APIs للذكاء الاصطناعي لتحسين خدمة العملاء والإنتاجية.",
  },
  {
    year: "2023",
    title: "توسّع Full-Stack",
    desc: "بنيت أنظمة ومواقع متكاملة بـ Next.js وPrisma وPostgreSQL، مع تركيز قوي على الأداء والاستقرار.",
  },
  {
    year: "2024+",
    title: "ABUD Platform",
    desc: "أطلقت منصة ABUD كقاعدة خدمات متكاملة: مواقع، أنظمة، أتمتة، وذكاء اصطناعي موجه للأعمال.",
  },
];

type AboutCard = {
  title: string;
  desc: string;
  icon: LucideIcon;
  accent: string;
  note: string;
};

const WORKFLOW: AboutCard[] = [
  {
    title: "جلسة فهم سريعة",
    desc: "بنحدد الهدف التجاري، الجمهور، ونطاق المشروع بشكل واضح من البداية.",
    icon: MessageCircle,
    accent: "#67e8f9",
    note: "15-30 دقيقة",
  },
  {
    title: "خطة تنفيذ عملية",
    desc: "بتاخد تصور واضح للـ scope، الأولويات، والمرحلة الأولى القابلة للإطلاق.",
    icon: BookOpen,
    accent: "#c084fc",
    note: "خلال 24 ساعة",
  },
  {
    title: "تطوير على مراحل",
    desc: "تنفيذ تدريجي بتحديثات منتظمة عشان تتابع التقدم وتطلب أي تعديلات مبكرًا.",
    icon: Code2,
    accent: "#a78bfa",
    note: "تحديثات أسبوعية",
  },
  {
    title: "إطلاق ودعم",
    desc: "تسليم منظم + تجهيز الإطلاق + متابعة أولية للتأكد إن كل شيء شغال بثبات.",
    icon: Rocket,
    accent: "#34d399",
    note: "بعد التسليم مباشرة",
  },
];

const COLLAB_GUARANTEES: AboutCard[] = [
  {
    title: "شفافية كاملة",
    desc: "لا وعود مبالغ فيها، ولا مفاجآت في منتصف الطريق.",
    icon: ShieldCheck,
    accent: "#34d399",
    note: "وضوح في كل مرحلة",
  },
  {
    title: "سرعة استجابة",
    desc: "رد سريع وتفاعل مستمر وقت تنفيذ المشروع أو المراجعات.",
    icon: TimerReset,
    accent: "#fbbf24",
    note: "زمن استجابة قصير",
  },
  {
    title: "تركيز على النتيجة",
    desc: "الهدف دايمًا منتج يساعد مشروعك يشتغل أسرع ويحقق قيمة فعلية.",
    icon: Sparkles,
    accent: "#f0abfc",
    note: "نتيجة قبل أي شيء",
  },
];

const FAQ_ITEMS = [
  {
    q: "بتشتغل مع شركات ولا أفراد؟",
    a: "الاثنين. اشتغلت مع شركات ناشئة، أصحاب مشاريع صغيرة، وفِرق تبحث عن تنفيذ سريع ومنظم.",
  },
  {
    q: "هل ممكن أبدأ بنسخة أولية وبعدها نطوّر؟",
    a: "نعم، وده الأفضل غالبًا. بنطلع نسخة أولى مركزة على الأساسيات، وبعدها نضيف التحسينات بناءً على الاستخدام الفعلي.",
  },
  {
    q: "إيه اللي أحتاجه قبل ما أتواصل؟",
    a: "فكرة واضحة عن الهدف، وأي أمثلة قريبة من اللي في بالك. والباقي بنرتبه سوا في جلسة البداية.",
  },
  {
    q: "هل في دعم بعد التسليم؟",
    a: "أكيد. في متابعة بعد الإطلاق للتأكد إن كل شيء مستقر، ومعاها خيارات دعم مستمر حسب احتياج المشروع.",
  },
];

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const sections = SECTION_LINKS.map((link) => document.getElementById(link.id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target?.id) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-20">
      {/* ─────────── HERO ─────────── */}
      <section id="intro" className="scroll-mt-32 relative py-20 lg:py-28 px-4 overflow-hidden">
        <FloatingOrbs count={4} />
        <ScanLine duration={10} />

        <div className="relative z-10">
          <ProfileHero />
        </div>
      </section>

      <section className="px-4 -mt-5 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-2xl p-2.5 sm:p-3"
            style={{
              background: "rgba(10,8,18,0.75)",
              border: "1px solid rgba(168,85,247,0.28)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
          >
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {SECTION_LINKS.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors"
                    style={
                      isActive
                        ? {
                            color: "#ffffff",
                            border: "1px solid rgba(192,132,252,0.45)",
                            background: "linear-gradient(135deg, rgba(192,132,252,0.25), rgba(167,139,250,0.16))",
                            boxShadow: "0 0 14px rgba(192,132,252,0.2)",
                          }
                        : {
                            color: "#d8d8ef",
                            border: "1px solid rgba(168,85,247,0.2)",
                            background: "rgba(192,132,252,0.06)",
                          }
                    }
                  >
                    {link.label}
                  </motion.a>
                );
              })}

              <Link href="/quote" className="btn-primary btn-glow inline-flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap">
                احسب تكلفة مشروعك
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="line" />

      {/* ─────────── STATS ─────────── */}
      <div id="stats" className="scroll-mt-32">
        <StatsCounter />
      </div>

      <SectionDivider variant="gradient" height={40} />

      {/* ─────────── CURRENTLY WORKING ─────────── */}
      <div id="current" className="scroll-mt-32">
        <CurrentlyWorking />
      </div>

      <SectionDivider variant="line" />

      {/* ─────────── SKILL CONSTELLATION ─────────── */}
      <div id="skills" className="scroll-mt-32">
        <SkillConstellation />
      </div>

      <SectionDivider variant="gradient" height={40} />

      {/* ─────────── DAILY STACK ─────────── */}
      <div id="stack" className="scroll-mt-32">
        <DailyStack />
      </div>

      <SectionDivider variant="line" />

      {/* ─────────── PRINCIPLES ─────────── */}
      <div id="principles" className="scroll-mt-32">
        <PrinciplesSection />
      </div>

      <SectionDivider variant="gradient" height={40} />

      {/* ─────────── TIMELINE ─────────── */}
      <section id="timeline" className="scroll-mt-32 py-20 px-4 relative overflow-hidden">
        <FloatingOrbs count={3} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="section-badge mb-5 mx-auto">
              <BookOpen className="w-2.5 h-2.5" />
              مسيرتي
            </span>
            <h2 className="section-title mt-4 mb-3">من أول سطر كود حتى الآن</h2>
            <p className="section-subtitle text-center max-w-xl mx-auto">
              رحلة مستمرة لبناء حلول تخدم الأعمال بشكل عملي، سريع، وقابل للتوسع
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

      <SectionDivider variant="gradient" height={40} />

      {/* ─────────── FEATURED WORK ─────────── */}
      <div id="featured" className="scroll-mt-32">
        <FeaturedWork />
      </div>

      <SectionDivider variant="line" />

      {/* ─────────── WORKFLOW ─────────── */}
      <section id="workflow" className="scroll-mt-32 py-20 px-4 relative overflow-hidden bg-[#070612]">
        <FloatingOrbs count={3} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_50%,rgba(147,51,234,0.07)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="section-badge mb-5 mx-auto">
              <Handshake className="w-2.5 h-2.5" />
              طريقة التعاون
            </span>
            <h2 className="section-title mt-4 mb-3">كيف نشتغل مع بعض؟</h2>
            <p className="section-subtitle text-center max-w-2xl mx-auto">
              خطوات واضحة من أول مكالمة لحد الإطلاق، مع تحديثات مستمرة وتركيز كامل على نتيجة المشروع.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {WORKFLOW.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <HolographicCard className="h-full" duration={6 + (index % 2)} delay={index * 0.2}>
                    <div className="p-6 h-full">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider mb-4"
                        style={{
                          color: step.accent,
                          border: `1px solid ${step.accent}40`,
                          background: `${step.accent}14`,
                        }}
                      >
                        STEP {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="flex items-start gap-3">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${step.accent}30, ${step.accent}08)`,
                            border: `1px solid ${step.accent}55`,
                          }}
                        >
                          <Icon className="w-5 h-5" style={{ color: step.accent }} />
                        </div>

                        <div>
                          <h3 className="text-white font-bold text-base mb-1" style={{ letterSpacing: "-0.01em" }}>
                            {step.title}
                          </h3>
                          <p className="text-sm leading-relaxed" style={{ color: "#a0a0c0" }}>
                            {step.desc}
                          </p>
                        </div>
                      </div>

                      <div
                        className="mt-4 pt-4 text-xs font-semibold"
                        style={{
                          color: `${step.accent}dd`,
                          borderTop: `1px solid ${step.accent}30`,
                        }}
                      >
                        {step.note}
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {COLLAB_GUARANTEES.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <HolographicCard className="h-full" duration={5 + index} delay={index * 0.3}>
                    <div className="p-5 h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${item.accent}30, ${item.accent}08)`,
                            border: `1px solid ${item.accent}50`,
                          }}
                        >
                          <Icon className="w-4 h-4" style={{ color: item.accent }} />
                        </div>
                        <h3 className="text-white font-bold text-sm">{item.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: "#a0a0c0" }}>
                        {item.desc}
                      </p>
                      <span className="text-xs font-semibold" style={{ color: item.accent }}>
                        {item.note}
                      </span>
                    </div>
                  </HolographicCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="gradient" height={40} />

      {/* ─────────── FAQ ─────────── */}
      <section id="faq" className="scroll-mt-32 py-20 px-4 relative overflow-hidden">
        <FloatingOrbs count={2} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <span className="section-badge mb-5 mx-auto">
              <MessageCircle className="w-2.5 h-2.5" />
              أسئلة متكررة
            </span>
            <h2 className="section-title mt-4 mb-3">قبل ما نبدأ</h2>
            <p className="section-subtitle text-center max-w-2xl mx-auto">
              أكثر الأسئلة اللي بتتكرر قبل تنفيذ أي مشروع جديد.
            </p>
          </AnimatedSection>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(10,8,18,0.75)",
                      border: "1px solid rgba(168,85,247,0.25)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex((prev) => (prev === index ? null : index))}
                      aria-expanded={isOpen}
                      className="w-full p-5 text-right flex items-center justify-between gap-3"
                    >
                      <span className="text-white font-semibold text-sm sm:text-base">{item.q}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          color: "#c084fc",
                          border: "1px solid rgba(192,132,252,0.35)",
                          background: "rgba(192,132,252,0.08)",
                        }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#a0a0c0" }}>
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="line" />

      {/* ─────────── CTA ─────────── */}
      <section id="start" className="py-20 px-4 bg-[#080810] relative overflow-hidden">
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
                    جاهز نحول فكرتك لمنتج حقيقي؟
                  </h2>
                  <p className="mb-8 max-w-lg mx-auto" style={{ color: "#a0a0c0", fontSize: "0.95rem", lineHeight: 1.7 }}>
                    لو عندك فكرة مشروع، خلينا نبدأ بخطوة عملية: احسب الميزانية المبدئية أو ابعت تفاصيلك مباشرة.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link href="/quote" className="btn-primary btn-glow gap-2 inline-flex">
                      <Sparkles className="w-4 h-4" />
                      احسب تكلفة مشروعك
                    </Link>
                    <Link href="/contact" className="btn-outline gap-2 inline-flex">
                      <ArrowLeft className="w-4 h-4" />
                      تواصل مباشر
                    </Link>
                    <Link href="/portfolio" className="btn-outline gap-2 inline-flex">
                      <Code2 className="w-4 h-4" />
                      استعرض أعمالي
                    </Link>
                    <Link href="/blog" className="btn-outline gap-2 inline-flex">
                      <BookOpen className="w-4 h-4" />
                      اقرأ المدونة
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
