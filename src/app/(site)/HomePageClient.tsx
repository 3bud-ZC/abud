"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion as m } from "framer-motion";
import { trackHomeHeroCTA, trackHomeFinalCTA } from "@/lib/analytics";
import {
  ArrowLeft, Zap, Code2, Bot, BrainCircuit, Layers, Cpu,
  Star, BookOpen, MessageSquare, ChevronLeft,
  Terminal, Globe, Shield, Mail, Send, ChevronDown, HelpCircle, Folder,
  Lightbulb, PencilRuler, Rocket, CheckCircle2
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import MatrixRain from "@/components/effects/MatrixRain";
import AnimatedGrid from "@/components/effects/AnimatedGrid";
import FloatingCodeSnippets from "@/components/effects/FloatingCodeSnippets";
import TypewriterText from "@/components/effects/TypewriterText";
import GlitchText from "@/components/effects/GlitchText";
import LiveTerminal from "@/components/effects/LiveTerminal";
import CountUp from "@/components/effects/CountUp";
import TechMarquee from "@/components/effects/TechMarquee";
import AuroraBeams from "@/components/effects/AuroraBeams";
import HolographicCard from "@/components/effects/HolographicCard";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import ParticleField from "@/components/effects/ParticleField";
import AnimatedBar from "@/components/effects/AnimatedBar";

const services = [
  { icon: Globe, title: "تطوير مواقع", desc: "مواقع ومنصات ويب متكاملة وعالية الأداء", color: "from-purple-600 to-purple-800" },
  { icon: BrainCircuit, title: "أدوات الذكاء الاصطناعي", desc: "أدوات ذكية مبنية بالنماذج اللغوية الحديثة", color: "from-purple-800 to-indigo-800" },
  { icon: Layers, title: "أتمتة الأنظمة", desc: "سير عمل آلية توفر الوقت وترفع الإنتاجية", color: "from-indigo-700 to-purple-700" },
  { icon: Bot, title: "بوتات تيليجرام", desc: "بوتات احترافية تتحكم في كل ما تحتاجه", color: "from-purple-700 to-pink-800" },
  { icon: Shield, title: "الأمن السيبراني", desc: "حلول حماية وتحليل أمني للأنظمة الرقمية", color: "from-blue-800 to-purple-800" },
  { icon: Terminal, title: "استشارات تقنية", desc: "توجيه تقني استراتيجي للأفكار والمشاريع", color: "from-purple-600 to-violet-800" },
];

const stats = [
  { value: "+50", label: "مشروع منجز", percent: 92 },
  { value: "+30", label: "عميل سعيد",  percent: 98 },
  { value: "+5",  label: "سنوات خبرة", percent: 75 },
  { value: "∞",   label: "شغف بالتقنية", percent: 100 },
];

const processSteps = [
  { icon: Lightbulb,    title: "اكتشاف الفكرة",   desc: "نتعرّف على رؤيتك ونحوّلها إلى متطلبات تقنية واضحة." },
  { icon: PencilRuler,  title: "التصميم والتخطيط", desc: "بنية، تجربة استخدام، وواجهات احترافية مدروسة." },
  { icon: Code2,        title: "التطوير والاختبار", desc: "كود نظيف، أداء عالي، واختبارات على كل المتصفحات." },
  { icon: Rocket,       title: "الإطلاق والمتابعة",  desc: "نشر آمن، مراقبة، ودعم بعد الإطلاق لضمان الاستمرارية." },
];

const faqPreview = [
  { q: "كيف أستلم المنتجات الرقمية بعد الشراء؟", a: "رابط التحميل يصلك فورًا على بريدك الإلكتروني بعد تأكيد الدفع." },
  { q: "ما هي طرق الدفع المتاحة؟", a: "نقبل فودافون كاش، إنستاباي، وPayPal — جميع المعاملات آمنة." },
  { q: "هل المنتجات مناسبة للمبتدئين؟", a: "نعم، معظم المنتجات مصممة لتناسب كل المستويات مع أمثلة عملية." },
  { q: "هل يمكنني طلب خدمة مخصصة؟", a: "بالطبع — تواصل معنا وسنضع لك عرضًا مفصلًا حسب احتياجك." },
];

interface ApiPost { id: string; title: string; slug: string; category?: { name: string } | null; publishedAt?: string | Date | null; createdAt: string | Date; }

interface Props {
  initialPosts: ApiPost[];
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function HomePageClient({ initialPosts }: Props) {
  const [posts] = useState<ApiPost[]>(initialPosts);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
        {/* Cyber background stack */}
        <AuroraBeams />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-5%,rgba(147,51,234,0.22)_0%,transparent_65%)]" />
        <AnimatedGrid />
        <MatrixRain opacity={0.14} fontSize={13} />
        <FloatingCodeSnippets count={10} />
        <FloatingOrbs count={6} />
        <ParticleField density={50} />
        <ScanLine duration={9} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_20%_80%,rgba(109,40,217,0.08)_0%,transparent_60%)]" />

        <m.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-purple-700/10 blur-[80px] pointer-events-none"
        />
        <m.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 right-1/5 w-[28rem] h-[28rem] rounded-full bg-violet-900/10 blur-[100px] pointer-events-none"
        />
        <m.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/8 blur-[120px] pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8"
            style={{
              background: "linear-gradient(135deg, rgba(147,51,234,0.12), rgba(109,40,217,0.06))",
              borderColor: "rgba(147,51,234,0.3)",
              boxShadow: "0 0 20px rgba(147,51,234,0.12), inset 0 1px 0 rgba(255,255,255,0.05)"
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" />
            </span>
            <span className="text-purple-300 text-sm font-medium tracking-wide">
              مطوّر Full-Stack • أدوات AI احترافية • منتجات رقمية جاهزة
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-black mb-6"
            style={{ fontSize: "clamp(2.8rem, 9vw, 6rem)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
          >
            <GlitchText
              text="ABUD"
              className="text-transparent bg-clip-text block"
              style={{ backgroundImage: "linear-gradient(135deg, #f0abfc 0%, #c084fc 40%, #9333ea 75%, #7c3aed 100%)", WebkitBackgroundClip: "text" }}
            />
            <span className="text-white/90 block" style={{ fontSize: "clamp(1.5rem, 4.5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.35, marginTop: "0.35em" }}>
              <TypewriterText
                text="خدمات تطوير وذكاء اصطناعي وأتمتة"
                speed={70}
                startDelay={400}
              />
            </span>
          </m.h1>

          <m.p
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "#8888a8", fontSize: "1.05rem" }}
          >
            أدوات ومنتجات رقمية جاهزة للتحميل الفوري، أو خدمات تطوير مخصصة لمشروعك — كل ما تحتاجه لبناء حضورك الرقمي.
          </m.p>

          <m.div
            initial={{ opacity: 1, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="/services" className="btn-primary btn-glow gap-2 py-3 px-8" onClick={() => trackHomeHeroCTA('primary', '/services')}>
              <Code2 className="w-4 h-4" />
              <span className="font-bold">استعرض خدماتي</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-outline py-3 px-6 gap-2" onClick={() => trackHomeHeroCTA('secondary', '/contact')}>
              <MessageSquare className="w-3.5 h-3.5" />
              <span>طلب خدمة مخصصة</span>
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12"
          >
            <TechMarquee
              duration={28}
              items={[
                { icon: Code2,        label: "Next.js" },
                { icon: BrainCircuit, label: "AI / LLMs" },
                { icon: Bot,          label: "Telegram Bots" },
                { icon: Cpu,          label: "Automation" },
                { icon: Terminal,     label: "Python" },
                { icon: Globe,        label: "TypeScript" },
                { icon: Shield,       label: "Cyber Security" },
                { icon: Layers,       label: "PostgreSQL" },
                { icon: Zap,          label: "FastAPI" },
                { icon: Code2,        label: "Node.js" },
              ]}
            />
          </m.div>
        </div>

        <m.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-purple-600/40 flex items-start justify-center p-1.5">
            <m.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-purple-500"
            />
          </div>
        </m.div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(4,4,8,0.7)" }}>
        <FloatingOrbs count={4} />
        <ScanLine duration={11} />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <m.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map(({ value, label, percent }, i) => {
              const isInfinity = value === "∞";
              const num = isInfinity ? 0 : parseInt(value.replace(/[^0-9]/g, ""), 10);
              return (
                <m.div key={label} variants={item} className="text-center px-2">
                  <div
                    className="font-black mb-2 text-transparent bg-clip-text neon-text"
                    style={{ backgroundImage: "linear-gradient(135deg, #f0e6ff 0%, #a855f7 100%)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}
                  >
                    <CountUp
                      to={num}
                      prefix={isInfinity ? "" : "+"}
                      fallback={isInfinity ? "∞" : undefined}
                    />
                  </div>
                  <div className="mb-3" style={{ color: "#8080a0", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
                  <AnimatedBar to={percent} delay={0.1 + i * 0.12} duration={1.6} />
                </m.div>
              );
            })}
          </m.div>
        </div>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="right">
              <div className="relative w-full max-w-md mx-auto">
                <LiveTerminal />
                {/* Glow halo */}
                <div
                  aria-hidden
                  className="absolute -inset-8 -z-10 rounded-3xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(147,51,234,0.18) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.1}>
              <div className="space-y-5">
                <span className="section-badge">
                  <Zap className="w-2.5 h-2.5" />
                  من أنا
                </span>
                <h2 className="section-title">أبني الأفكار<br />وأحوّلها لواقع رقمي</h2>
                <p style={{ color: "#7070a0", lineHeight: 1.75, fontSize: "0.95rem" }}>
                  مطور ويب وصانع أدوات رقمية متخصص في بناء الحلول التقنية المتكاملة — من المواقع المتطورة إلى أنظمة الذكاء الاصطناعي والأتمتة.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["React / Next.js", "Python", "Node.js", "AI/LLMs", "Telegram API", "PostgreSQL"].map((skill) => (
                    <span key={skill} className="tag-pill">{skill}</span>
                  ))}
                </div>
                <Link href="/about" className="btn-outline inline-flex gap-2 mt-2">
                  <span>تعرف عليّ أكثر</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-4 bg-[#080810]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="section-badge mb-5 mx-auto">
              <Cpu className="w-2.5 h-2.5" />
              الخدمات
            </span>
            <h2 className="section-title mt-4 mb-3">ماذا أبني لك؟</h2>
            <p className="section-subtitle text-center">
              خدمات تقنية متخصصة تتناسب مع طموحاتك الرقمية
            </p>
          </AnimatedSection>

          <m.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {services.map(({ icon: Icon, title, desc, color }, i) => (
              <m.div key={title} variants={item}>
                <HolographicCard duration={5 + (i % 3)} delay={i * 0.4} className="h-full">
                  <div className="p-6 group relative h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-[0_0_22px_rgba(147,51,234,0.45)] group-hover:shadow-[0_0_38px_rgba(168,85,247,0.7)] transition-shadow duration-500`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2 group-hover:text-purple-200 transition-colors leading-snug">{title}</h3>
                    <p style={{ color: "#9090b0", fontSize: "0.85rem", lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </HolographicCard>
              </m.div>
            ))}
          </m.div>

          <AnimatedSection className="text-center mt-10">
            <Link href="/services" className="btn-primary btn-glow inline-flex gap-2">
              <span>استكشف كل الخدمات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section className="py-24 px-4 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#080810 0%,#0a0814 50%,#080810 100%)" }}>
        <FloatingOrbs count={5} />
        <ScanLine duration={14} direction="vertical" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="section-badge mb-5 mx-auto">
              <Rocket className="w-2.5 h-2.5" />
              منهجية العمل
            </span>
            <h2 className="section-title mt-4 mb-3">رحلة مشروعك معاي</h2>
            <p className="section-subtitle text-center">من الفكرة الأولى حتى الإطلاق — 4 خطوات واضحة ومضمونة</p>
          </AnimatedSection>

          <div className="relative">
            {/* connecting glowing line (desktop) */}
            <div
              aria-hidden
              className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-px"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.5) 20%, rgba(34,211,238,0.5) 50%, rgba(168,85,247,0.5) 80%, transparent 100%)",
                boxShadow: "0 0 18px rgba(168,85,247,0.5)",
              }}
            />

            <m.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {processSteps.map(({ icon: Icon, title, desc }, i) => (
                <m.div key={title} variants={item} className="relative">
                  <HolographicCard duration={6} delay={i * 0.5} className="h-full">
                    <div className="p-6 text-center relative h-full">
                      <div className="relative inline-flex items-center justify-center mb-4">
                        <div
                          aria-hidden
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: "radial-gradient(circle, rgba(168,85,247,0.55) 0%, transparent 70%)",
                            filter: "blur(14px)",
                            animation: "abud-btn-glow-pulse 3.6s ease-in-out infinite",
                          }}
                        />
                        <div
                          className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg,rgba(147,51,234,0.35),rgba(34,211,238,0.18))",
                            border: "1px solid rgba(192,132,252,0.45)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 24px rgba(147,51,234,0.4)",
                          }}
                        >
                          <Icon className="w-6 h-6 text-purple-200" />
                        </div>
                      </div>
                      <div
                        className="absolute top-3 right-3 text-[11px] font-mono font-black tracking-wider"
                        style={{ color: "rgba(192,132,252,0.45)" }}
                      >
                        0{i + 1}
                      </div>
                      <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                      <p style={{ color: "#9090b0", fontSize: "0.82rem", lineHeight: 1.7 }}>{desc}</p>
                      <div className="mt-4 flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-[11px]" style={{ color: "#a78bfa" }}>خطوة {i + 1} من 4</span>
                      </div>
                    </div>
                  </HolographicCard>
                </m.div>
              ))}
            </m.div>
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="py-20 px-4 bg-[#080810]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="section-badge mb-5 mx-auto">
              <BookOpen className="w-2.5 h-2.5" />
              المدونة
            </span>
            <h2 className="section-title mt-4">آخر المقالات</h2>
          </AnimatedSection>

          <m.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-2.5"
          >
            {posts.map((post) => (
              <m.div key={post.id} variants={item} whileHover={{ x: -3 }}>
                <Link href={`/blog/${post.slug}`} className="group flex items-center justify-between gap-4 p-4 rounded-2xl transition-colors"
                  style={{ background: "rgba(10,10,16,0.7)", border: "1px solid rgba(255,255,255,0.045)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(147,51,234,0.1)", border: "1px solid rgba(147,51,234,0.18)" }}>
                      <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm group-hover:text-purple-200 transition-colors leading-snug mb-1">{post.title}</h3>
                      <div className="flex items-center gap-2">
                        {post.category && <span className="tag-pill" style={{ padding: "0.1rem 0.6rem", fontSize: "0.65rem" }}>{post.category.name}</span>}
                        <span style={{ color: "#8888aa", fontSize: "0.7rem" }}>{new Date(post.publishedAt || post.createdAt).toLocaleDateString("ar-EG", { year: "numeric", month: "long" })}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronLeft className="w-3.5 h-3.5 flex-shrink-0 transition-all duration-200 group-hover:translate-x-[-2px]" style={{ color: "rgba(147,51,234,0.35)" }} />
                </Link>
              </m.div>
            ))}
          </m.div>

          <AnimatedSection className="text-center mt-10">
            <Link href="/blog" className="btn-outline inline-flex gap-2">
              <span>اقرأ كل المقالات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── RESOURCES HUB STRIP ── */}
      <section className="py-16 px-4" style={{ background: "rgba(4,4,8,0.85)", borderTop: "1px solid rgba(28,28,48,0.5)", borderBottom: "1px solid rgba(28,28,48,0.5)" }}>
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <span className="section-badge mb-5 mx-auto">
              <Folder className="w-2.5 h-2.5" />
              مكتبة المصادر
            </span>
            <h2 className="section-title mt-4 mb-2">أدوات مجانية لرحلتك التقنية</h2>
            <p className="section-subtitle text-center">+40 مصدر مختار للمطورين، المستقلين، وعشاق الأمن السيبراني</p>
          </AnimatedSection>

          <m.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8"
          >
            {[
              { label: "أدوات AI",        Icon: BrainCircuit, color: "#a78bfa", bg: "rgba(139,92,246,0.1)",  count: 10 },
              { label: "أدوات المطورين", Icon: Code2,         color: "#60a5fa", bg: "rgba(96,165,250,0.1)",  count: 8  },
              { label: "الفريلانس",       Icon: Layers,        color: "#34d399", bg: "rgba(52,211,153,0.1)", count: 6  },
              { label: "الإنتاجية",       Icon: Zap,           color: "#fbbf24", bg: "rgba(251,191,36,0.1)", count: 6  },
              { label: "الأمن السيبراني", Icon: Shield,        color: "#f87171", bg: "rgba(248,113,113,0.1)",count: 6  },
              { label: "بناء المواقع",    Icon: Globe,         color: "#67e8f9", bg: "rgba(6,182,212,0.1)",  count: 7  },
            ].map(({ label, Icon, color, bg, count }) => (
              <m.div key={label} variants={item} whileHover={{ y: -4 }}>
                <Link href="/resources"
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center transition-all duration-200 block"
                  style={{ background: "rgba(10,8,18,0.8)", border: "1px solid rgba(28,20,48,0.8)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}40`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(28,20,48,0.8)")}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: bg, border: `1px solid ${color}25` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <span className="text-xs font-semibold leading-tight" style={{ color: "#b0b0c8" }}>{label}</span>
                  <span className="text-[10px]" style={{ color: "#7878a0" }}>{count} مصادر</span>
                </Link>
              </m.div>
            ))}
          </m.div>

          <AnimatedSection className="text-center">
            <Link href="/resources" className="btn-outline inline-flex gap-2 text-sm">
              <Folder className="w-3.5 h-3.5" />
              استعراض مكتبة المصادر كاملةً
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ PREVIEW ── */}
      <section className="py-20 px-4 bg-[#080810]">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="section-badge mb-5 mx-auto">
              <HelpCircle className="w-2.5 h-2.5" />
              الأسئلة الشائعة
            </span>
            <h2 className="section-title mt-4 mb-3">أسئلة يسألها الجميع</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="space-y-2 mb-8">
              {faqPreview.map((f, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl transition-all duration-200"
                  style={{
                    background: openFaq === i
                      ? "linear-gradient(160deg,rgba(18,10,30,0.9),rgba(10,10,18,0.8))"
                      : "rgba(10,10,18,0.6)",
                    border: openFaq === i
                      ? "1px solid rgba(147,51,234,0.3)"
                      : "1px solid rgba(28,28,48,0.8)",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-right"
                  >
                    <span className="font-semibold text-sm" style={{ color: openFaq === i ? "#e2d4f8" : "#c0c0d8" }}>
                      {f.q}
                    </span>
                    <m.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.22 }}>
                      <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: openFaq === i ? "#c084fc" : "#505070" }} />
                    </m.div>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#707090", borderTop: "1px solid rgba(28,28,48,0.6)" }}>
                      <div className="pt-4">{f.a}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/faq" className="btn-outline inline-flex gap-2 text-sm">
                <HelpCircle className="w-3.5 h-3.5" />
                عرض كل الأسئلة
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="glass-card relative overflow-hidden text-center p-10 md:p-14">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(147,51,234,0.18)_0%,transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-dots opacity-[0.06] pointer-events-none" />
              <div className="relative">
                <div className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "linear-gradient(135deg,rgba(147,51,234,0.2),rgba(109,40,217,0.12))", border: "1px solid rgba(147,51,234,0.25)" }}>
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="font-black text-white mb-3" style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                  جاهز لبناء مشروعك الرقمي؟
                </h2>
                <p className="mb-8 leading-relaxed" style={{ color: "#8888a8", fontSize: "0.95rem" }}>
                  ابدأ بمنتج رقمي جاهز للتحميل الفوري، أو اطلب خدمة تطوير مخصصة لاحتياجاتك.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  <Link href="/contact" className="btn-primary gap-2 py-3 px-8" onClick={() => trackHomeFinalCTA('/contact')}>
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-bold">تواصل معاي</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                  <Link href="/services" className="btn-outline py-3 px-6 gap-2" onClick={() => trackHomeFinalCTA('/services')}>
                    <Code2 className="w-3.5 h-3.5" />
                    <span>استعرض الخدمات</span>
                  </Link>
                </div>
                <div className="flex items-center justify-center gap-2.5">
                  <div className="flex -space-x-1.5 rtl:space-x-reverse">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                        style={{ background: "rgba(147,51,234,0.2)", border: "2px solid rgba(6,6,10,1)", color: "#b084fc" }}>
                        {["A","B","C","D"][i]}
                      </div>
                    ))}
                  </div>
                  <span style={{ color: "#8080a0", fontSize: "0.75rem" }}>+30 عميل سعيد</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-20 px-4" style={{ borderTop: "1px solid rgba(28,28,48,0.6)", background: "rgba(4,4,8,0.8)" }}>
        <div className="max-w-xl mx-auto text-center">
          <AnimatedSection>
            <div className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-6"
              style={{ background: "linear-gradient(135deg,rgba(147,51,234,0.18),rgba(109,40,217,0.1))", border: "1px solid rgba(147,51,234,0.25)" }}>
              <Mail className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="font-black text-white mb-2" style={{ fontSize: "clamp(1.4rem,3.5vw,2rem)", letterSpacing: "-0.02em" }}>
              اشترك في النشرة البريدية
            </h2>
            <p className="mb-6 text-sm leading-relaxed" style={{ color: "#8888a8" }}>
              نصائح أسبوعية عن الذكاء الاصطناعي، المنتجات الرقمية، والفريلانس — مباشرةً في بريدك.
            </p>

            {newsletterDone ? (
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl"
                style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}
              >
                <span className="text-green-400 text-sm font-medium">✓ شكرًا! سنتواصل معك قريبًا.</span>
              </m.div>
            ) : (
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  if (!newsletterEmail) return;
                  try {
                    await fetch("/api/newsletter", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: newsletterEmail, source: "homepage" }),
                    });
                  } catch { /* silently succeed */ }
                  setNewsletterDone(true);
                }}
                className="flex gap-2 max-w-sm mx-auto"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="بريدك الإلكتروني"
                  dir="ltr"
                  className="flex-1 rounded-xl px-4 py-3 text-white text-sm placeholder-[#7070a0] outline-none transition-all"
                  style={{ background: "rgba(12,12,20,0.9)", border: "1px solid rgba(35,35,55,0.8)" }}
                  onFocus={e => (e.target.style.borderColor = "rgba(147,51,234,0.5)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(35,35,55,0.8)")}
                />
                <button type="submit" className="btn-primary px-5 py-3 gap-1.5 flex-shrink-0">
                  <Send className="w-3.5 h-3.5" />
                  اشترك
                </button>
              </form>
            )}
            <p className="text-xs mt-3" style={{ color: "#7070a0" }}>بدون إزعاج — يمكنك إلغاء الاشتراك في أي وقت.</p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
