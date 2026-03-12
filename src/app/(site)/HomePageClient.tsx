"use client";

import { useState } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, Zap, Code2, Bot, BrainCircuit, Layers, Cpu,
  Star, ShoppingBag, BookOpen, MessageSquare, ChevronLeft,
  Terminal, Globe, Shield, Package, Mail, Send, ChevronDown, HelpCircle, Folder
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const services = [
  { icon: Globe, title: "تطوير مواقع", desc: "مواقع ومنصات ويب متكاملة وعالية الأداء", color: "from-purple-600 to-purple-800" },
  { icon: BrainCircuit, title: "أدوات الذكاء الاصطناعي", desc: "أدوات ذكية مبنية بالنماذج اللغوية الحديثة", color: "from-purple-800 to-indigo-800" },
  { icon: Layers, title: "أتمتة الأنظمة", desc: "سير عمل آلية توفر الوقت وترفع الإنتاجية", color: "from-indigo-700 to-purple-700" },
  { icon: Bot, title: "بوتات تيليجرام", desc: "بوتات احترافية تتحكم في كل ما تحتاجه", color: "from-purple-700 to-pink-800" },
  { icon: Shield, title: "الأمن السيبراني", desc: "حلول حماية وتحليل أمني للأنظمة الرقمية", color: "from-blue-800 to-purple-800" },
  { icon: Terminal, title: "استشارات تقنية", desc: "توجيه تقني استراتيجي للأفكار والمشاريع", color: "from-purple-600 to-violet-800" },
];

const stats = [
  { value: "+50", label: "مشروع منجز" },
  { value: "+30", label: "عميل سعيد" },
  { value: "+5", label: "سنوات خبرة" },
  { value: "∞", label: "شغف بالتقنية" },
];

const testimonials = [
  { name: "Ahmed M.", role: "Full Stack Developer", text: "The cybersecurity guide is incredibly detailed. Went from zero to landing my first bug bounty in 3 months.", avatar: "AM", color: "#9333ea" },
  { name: "Sara K.", role: "Freelance Designer", text: "The Freelancer Toolkit saved me hours — professional contracts, invoices, and proposals all ready to use.", avatar: "SK", color: "#6d28d9" },
  { name: "Omar T.", role: "Computer Science Student", text: "The Full Stack Roadmap is hands down the best investment I made. Structured, clear, and completely beginner-friendly.", avatar: "OT", color: "#7c3aed" },
  { name: "Lina S.", role: "Small Business Owner", text: "Hired for a landing page build. Delivered fast, clean, and exactly what I wanted. Highly recommend.", avatar: "LS", color: "#9333ea" },
  { name: "Mohammed A.", role: "Penetration Tester", text: "The advanced cybersecurity handbook covers real-world scenarios I hadn't seen in any course. Worth every penny.", avatar: "MA", color: "#6d28d9" },
  { name: "Nour R.", role: "Content Creator", text: "The Notion productivity dashboard transformed how I manage my work. Simple to set up and incredibly effective.", avatar: "NR", color: "#7c3aed" },
];

const faqPreview = [
  { q: "كيف أستلم المنتجات الرقمية بعد الشراء؟", a: "رابط التحميل يصلك فورًا على بريدك الإلكتروني بعد تأكيد الدفع." },
  { q: "ما هي طرق الدفع المتاحة؟", a: "نقبل فودافون كاش، إنستاباي، وPayPal — جميع المعاملات آمنة." },
  { q: "هل المنتجات مناسبة للمبتدئين؟", a: "نعم، معظم المنتجات مصممة لتناسب كل المستويات مع أمثلة عملية." },
  { q: "هل يمكنني طلب خدمة مخصصة؟", a: "بالطبع — تواصل معنا وسنضع لك عرضًا مفصلًا حسب احتياجك." },
];

interface ApiProduct { id: string; title: string; slug: string; price: number; oldPrice?: number | null; coverImage?: string | null; featured: boolean; category?: { name: string } | null; }
interface ApiPost { id: string; title: string; slug: string; category?: { name: string } | null; publishedAt?: string | Date | null; createdAt: string | Date; }

interface Props {
  initialProducts: ApiProduct[];
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

export default function HomePageClient({ initialProducts, initialPosts }: Props) {
  const [products] = useState<ApiProduct[]>(initialProducts);
  const [posts] = useState<ApiPost[]>(initialPosts);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-5%,rgba(147,51,234,0.22)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
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
              مطوّر ويب متكامل • منتجات رقمية احترافية • حلول مدفوعة بالذكاء
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-black mb-6"
            style={{ fontSize: "clamp(2.8rem, 9vw, 6rem)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
          >
            <span
              className="text-transparent bg-clip-text block"
              style={{ backgroundImage: "linear-gradient(135deg, #f0abfc 0%, #c084fc 40%, #9333ea 75%, #7c3aed 100%)" }}
            >
              ABUD
            </span>
            <span className="text-white/90 block" style={{ fontSize: "clamp(1.5rem, 4.5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.35, marginTop: "0.35em" }}>
              أُحوِّل أفكارك إلى منتجات رقمية احترافية
            </span>
          </m.h1>

          <m.p
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "#8888a8", fontSize: "1.05rem" }}
          >
            أبني مواقع ويب، أدوات ذكاء اصطناعي، وأنظمة أتمتة متكاملة — بجودة عالمية وأداء استثنائي.
          </m.p>

          <m.div
            initial={{ opacity: 1, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="/portfolio" className="btn-primary gap-2 text-sm py-2.5 px-6">
              <span>أعمالي</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <Link href="/services" className="btn-outline gap-2 text-sm py-2.5 px-5">
              <span>الخدمات</span>
            </Link>
            <Link href="/store" className="btn-outline gap-2 text-sm py-2.5 px-5">
              <Package className="w-3.5 h-3.5" />
              <span>المتجر</span>
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center justify-center gap-2 mt-12 flex-wrap"
          >
            {[
              { icon: Code2, label: "Next.js" },
              { icon: BrainCircuit, label: "AI/LLMs" },
              { icon: Bot, label: "Telegram Bots" },
              { icon: Cpu, label: "Automation" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  background: "linear-gradient(160deg, rgba(15,15,24,1), rgba(10,10,18,1))",
                  border: "1px solid rgba(40,40,65,0.8)",
                  borderTop: "1px solid rgba(55,55,80,0.6)",
                  color: "#7070a0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
                }}
              >
                <Icon className="w-3 h-3 text-purple-500/80" />
                {label}
              </span>
            ))}
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
      <section className="py-16 relative" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(4,4,8,0.7)" }}>
        <div className="max-w-3xl mx-auto px-4">
          <m.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map(({ value, label }) => (
              <m.div key={label} variants={item} className="text-center">
                <div
                  className="font-black mb-1.5 text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #f0e6ff 0%, #a855f7 100%)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}
                >
                  {value}
                </div>
                <div style={{ color: "#8080a0", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="right">
              <div className="relative">
                <div className="w-full aspect-square max-w-sm mx-auto rounded-2xl bg-[#0d0d14] border border-[#1a1a2e] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15)_0%,transparent_70%)]" />
                  <div className="relative z-10 text-center px-8">
                    <div className="text-8xl font-black tracking-widest text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #9333ea, #c084fc)" }}>
                      AB
                    </div>
                    <div className="text-8xl font-black tracking-widest text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #7c3aed, #9333ea)" }}>
                      UD
                    </div>
                    <div className="mt-4 flex justify-center gap-2 flex-wrap">
                      {["Builder", "Creator", "Hacker"].map((tag) => (
                        <span key={tag} className="text-xs text-purple-400 bg-purple-600/10 px-2 py-0.5 rounded border border-purple-600/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <m.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-2xl border border-purple-600/10 border-dashed"
                  />
                </div>
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
            {services.map(({ icon: Icon, title, desc, color }) => (
              <m.div
                key={title}
                variants={item}
                whileHover={{ y: -5 }}
                className="glass-card glass-card-hover p-6 group cursor-default relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 40% 0%, rgba(147,51,234,0.08) 0%, transparent 65%)" }} />
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold text-sm mb-2 group-hover:text-purple-200 transition-colors leading-snug">{title}</h3>
                <p style={{ color: "#8888a8", fontSize: "0.8rem", lineHeight: 1.65 }}>{desc}</p>
              </m.div>
            ))}
          </m.div>

          <AnimatedSection className="text-center mt-10">
            <Link href="/services" className="btn-primary inline-flex gap-2">
              <span>استكشف كل الخدمات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="section-badge mb-5 mx-auto">
              <ShoppingBag className="w-2.5 h-2.5" />
              المتجر الرقمي
            </span>
            <h2 className="section-title mt-4 mb-3">المنتجات المميزة</h2>
            <p className="section-subtitle text-center">أدوات ومنتجات رقمية جاهزة تحتاجها الآن</p>
          </AnimatedSection>

          <m.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {products.map((p) => {
              const discount = p.oldPrice && p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : null;
              return (
                <m.div key={p.id} variants={item} whileHover={{ y: -5 }} className="glass-card overflow-hidden group flex flex-col">
                  <Link href={`/store/${p.slug}`} className="flex-1">
                    <div className="aspect-video bg-[#080810] flex items-center justify-center relative overflow-hidden" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      {p.coverImage ? (
                        <Image src={p.coverImage} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.1)_0%,transparent_65%)]" />
                          <Package className="w-10 h-10 text-purple-700/40" />
                        </>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {p.featured && <span className="absolute top-3 right-3 badge-purple">مميز</span>}
                      {discount && (
                        <span className="absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff" }}>-{discount}%</span>
                      )}
                    </div>
                    <div className="p-5 pb-3">
                      {p.category && <span className="tag-pill mb-3 inline-flex">{p.category.name}</span>}
                      <h3 className="text-white font-bold text-sm mb-2 group-hover:text-purple-200 transition-colors leading-snug">{p.title}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="font-black text-lg" style={{ color: "#c084fc", letterSpacing: "-0.02em" }}>{p.price} ج.م</span>
                        {p.oldPrice && <span className="text-xs line-through" style={{ color: "#7070a0" }}>{p.oldPrice} ج.م</span>}
                      </div>
                    </div>
                  </Link>
                  <div className="px-5 pb-5 pt-2">
                    <Link href={`/checkout?product=${p.id}`} className="btn-primary w-full justify-center text-xs py-2.5 gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5" />اشتري الآن
                    </Link>
                  </div>
                </m.div>
              );
            })}
          </m.div>

          <AnimatedSection className="text-center mt-10">
            <Link href="/store" className="btn-outline inline-flex gap-2">
              <span>تصفح كل المنتجات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </AnimatedSection>
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

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="section-badge mb-5 mx-auto">
              <Star className="w-2.5 h-2.5" />
              آراء العملاء
            </span>
            <h2 className="section-title mt-4 mb-3">ماذا يقولون عنّا؟</h2>
            <p className="section-subtitle text-center">+30 عميل راضٍ — هذا ما يقولونه</p>
          </AnimatedSection>

          <m.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {testimonials.map((t, i) => (
              <m.div
                key={i}
                variants={item}
                whileHover={{ y: -4 }}
                className="glass-card p-6 flex flex-col gap-4 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-[40px] pointer-events-none"
                  style={{ background: `${t.color}18`, transform: "translate(30%, -30%)" }} />
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#9090b0" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid rgba(28,28,48,0.8)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{ background: `${t.color}22`, border: `1px solid ${t.color}40`, color: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold">{t.name}</div>
                    <div className="text-xs" style={{ color: "#7878a0" }}>{t.role}</div>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
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
                  ابدأ رحلتك الرقمية اليوم
                </h2>
                <p className="mb-8 leading-relaxed" style={{ color: "#8888a8", fontSize: "0.95rem" }}>
                  منتجات رقمية جاهزة، أو خدمات مخصصة — كل ما تحتاجه لبناء حضورك الرقمي.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  <Link href="/store" className="btn-primary gap-2 text-sm py-2.5 px-7">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>تصفح المنتجات</span>
                  </Link>
                  <Link href="/services" className="btn-outline text-sm py-2.5 px-6 gap-2">
                    <Zap className="w-3.5 h-3.5" />
                    <span>عرض الخدمات</span>
                  </Link>
                  <Link href="/contact" className="btn-outline text-sm py-2.5 px-6 gap-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>تواصل معنا</span>
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
