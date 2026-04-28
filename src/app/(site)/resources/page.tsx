"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Brain, Code2, Briefcase, Zap, Shield, Globe,
  Search, ExternalLink, X, BookOpen,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import HolographicCard from "@/components/effects/HolographicCard";

/* ── Types ── */
interface Resource {
  name: string;
  desc: string;
  url: string;
  category: string;
  free?: boolean;
  hot?: boolean;
}

/* ── Category config ── */
const CATEGORIES = [
  { key: "all",           label: "الكل",                   icon: Globe,    color: "#c084fc", bg: "rgba(147,51,234,0.12)" },
  { key: "ai-tools",      label: "أدوات الذكاء الاصطناعي", icon: Brain,    color: "#a78bfa", bg: "rgba(139,92,246,0.12)"  },
  { key: "dev-tools",     label: "أدوات المطورين",          icon: Code2,    color: "#60a5fa", bg: "rgba(96,165,250,0.12)"  },
  { key: "freelancing",   label: "منصات الفريلانس",         icon: Briefcase,color: "#34d399", bg: "rgba(52,211,153,0.12)"  },
  { key: "productivity",  label: "الإنتاجية",               icon: Zap,      color: "#fbbf24", bg: "rgba(251,191,36,0.12)"  },
  { key: "cybersecurity", label: "الأمن السيبراني",         icon: Shield,   color: "#f87171", bg: "rgba(248,113,113,0.12)" },
  { key: "web-building",  label: "بناء المواقع",            icon: Globe,    color: "#67e8f9", bg: "rgba(6,182,212,0.12)"   },
];

/* ── Resources data (40+ resources) ── */
const RESOURCES: Resource[] = [
  /* AI Tools */
  { name: "ChatGPT",          desc: "الأداة الأكثر شيوعًا في الذكاء الاصطناعي — توليد نصوص، كود، وأفكار إبداعية", url: "https://chatgpt.com",           category: "ai-tools",     hot: true  },
  { name: "Claude",           desc: "مساعد AI من Anthropic بقدرات تحليلية ممتازة وسياق طويل المدى",               url: "https://claude.ai",             category: "ai-tools",     hot: true  },
  { name: "Gemini",           desc: "نموذج الذكاء الاصطناعي من Google مع تكامل مع منتجات Google",                 url: "https://gemini.google.com",     category: "ai-tools"                },
  { name: "GitHub Copilot",   desc: "مساعد البرمجة بالذكاء الاصطناعي — اقتراحات كود داخل محرر VS Code",           url: "https://github.com/features/copilot", category: "ai-tools", hot: true },
  { name: "Cursor",           desc: "محرر كود مبني على AI — يكتب ويعدل الكود معك مباشرة",                          url: "https://cursor.sh",             category: "ai-tools",     hot: true  },
  { name: "Perplexity AI",    desc: "محرك بحث بالذكاء الاصطناعي — إجابات دقيقة مع مصادر موثوقة",                  url: "https://perplexity.ai",         category: "ai-tools"                },
  { name: "v0 by Vercel",     desc: "توليد مكونات React/UI من وصف نصي بسيط — للمطورين والمصممين",                  url: "https://v0.dev",                category: "ai-tools",     hot: true  },
  { name: "ElevenLabs",       desc: "توليد صوت بشري واقعي بالذكاء الاصطناعي — مثالي للمحتوى والبودكاست",           url: "https://elevenlabs.io",         category: "ai-tools"                },
  { name: "Bolt.new",         desc: "بناء تطبيقات كاملة بالذكاء الاصطناعي في الوقت الفعلي",                        url: "https://bolt.new",              category: "ai-tools",     free: true },
  { name: "Midjourney",       desc: "توليد صور احترافية بالذكاء الاصطناعي — الأفضل في جودة الصور",                 url: "https://midjourney.com",        category: "ai-tools"                },

  /* Developer Tools */
  { name: "VS Code",          desc: "محرر الكود الأكثر استخدامًا في العالم مع آلاف الإضافات",                       url: "https://code.visualstudio.com", category: "dev-tools",    free: true },
  { name: "GitHub",           desc: "منصة استضافة الكود والتعاون — ضرورة لكل مطور",                                 url: "https://github.com",            category: "dev-tools",    free: true },
  { name: "Postman",          desc: "اختبار وتوثيق APIs بسهولة — الأداة الأمثل للـ Backend developers",              url: "https://postman.com",           category: "dev-tools",    free: true },
  { name: "Docker",           desc: "حاويات لتشغيل التطبيقات بشكل معزول — ضروري في بيئات الإنتاج",                 url: "https://docker.com",            category: "dev-tools"                },
  { name: "Vercel",           desc: "نشر مشاريع Next.js والـ Frontend بنقرة واحدة مع CDN عالمي",                     url: "https://vercel.com",            category: "dev-tools",    free: true },
  { name: "Figma",            desc: "تصميم UI/UX تعاوني في المتصفح — المعيار في صناعة التصميم",                      url: "https://figma.com",             category: "dev-tools",    free: true },
  { name: "Warp Terminal",    desc: "محطة طرفية حديثة بميزات AI — أسرع وأذكى من Terminal العادي",                   url: "https://warp.dev",              category: "dev-tools",    free: true },
  { name: "Linear",           desc: "إدارة المشاريع البرمجية بسرعة وأناقة — مفضل لدى الفرق التقنية",               url: "https://linear.app",            category: "dev-tools"                },

  /* Freelancing */
  { name: "Upwork",           desc: "أكبر منصة عمل حر عالميًا — مناسبة للمطورين والمصممين والكتّاب",               url: "https://upwork.com",            category: "freelancing",   free: true },
  { name: "Fiverr",           desc: "عرض خدماتك للعملاء العالميين — مبتدئ ومحترف في نفس الوقت",                    url: "https://fiverr.com",            category: "freelancing",   free: true },
  { name: "Toptal",           desc: "منصة للنخبة من المطورين والمصممين — أعلى أجور في الفريلانس",                   url: "https://toptal.com",            category: "freelancing"                },
  { name: "Contra",           desc: "منصة فريلانس بدون عمولة — تأخذ أجرك كاملاً",                                   url: "https://contra.com",            category: "freelancing",   hot: true  },
  { name: "PeoplePerHour",    desc: "سوق عمل حر للمهن الإبداعية والتقنية — مع نظام مزايدة على المشاريع",            url: "https://peopleperhour.com",     category: "freelancing",   free: true },
  { name: "LinkedIn",         desc: "شبكة المهنيين — ابنِ علامتك الشخصية واجذب العملاء بشكل عضوي",                 url: "https://linkedin.com",          category: "freelancing",   free: true },

  /* Productivity */
  { name: "Notion",           desc: "مساحة عمل متكاملة — ملاحظات، قواعد بيانات، ومشاريع في مكان واحد",             url: "https://notion.so",             category: "productivity",  free: true },
  { name: "Obsidian",         desc: "تطبيق ملاحظات يعتمد على الروابط — مثالي للتفكير وبناء المعرفة",                url: "https://obsidian.md",           category: "productivity",  free: true },
  { name: "Raycast",          desc: "قاذفة تطبيقات سريعة بأوامر لا نهائية — الـ Spotlight المطوّر",                 url: "https://raycast.com",           category: "productivity",  free: true },
  { name: "Loom",             desc: "تسجيل فيديو سريع للشرح والتواصل مع الفريق والعملاء",                           url: "https://loom.com",              category: "productivity",  free: true },
  { name: "Cal.com",          desc: "جدولة المواعيد مفتوحة المصدر — بديل Calendly مجاني وقابل للتخصيص",             url: "https://cal.com",               category: "productivity",  free: true },
  { name: "Todoist",          desc: "إدارة المهام الشخصية والمشاريع — سهل الاستخدام ومتزامن عبر الأجهزة",           url: "https://todoist.com",           category: "productivity",  free: true },

  /* Cybersecurity */
  { name: "TryHackMe",        desc: "تعلّم الأمن السيبراني بشكل تفاعلي — مسارات للمبتدئين والمحترفين",              url: "https://tryhackme.com",         category: "cybersecurity", hot: true  },
  { name: "Hack The Box",     desc: "تحديات اختراق أخلاقي واقعية — للمحترفين الراغبين في الاحتراف",                 url: "https://hackthebox.com",        category: "cybersecurity"                },
  { name: "OWASP",            desc: "مرجع عالمي لأمان تطبيقات الويب — قائمة OWASP Top 10 وأدوات مجانية",           url: "https://owasp.org",             category: "cybersecurity", free: true },
  { name: "PortSwigger Web Security", desc: "أكاديمية مجانية لتعلم اختبار أمان تطبيقات الويب — من صانعي Burp Suite", url: "https://portswigger.net/web-security", category: "cybersecurity", free: true, hot: true },
  { name: "CyberDefenders",   desc: "منصة تحديات Blue Team و DFIR — لتعلم الدفاع والتحقيق الجنائي الرقمي",          url: "https://cyberdefenders.org",    category: "cybersecurity", free: true },
  { name: "VulnHub",          desc: "آلات افتراضية ضعيفة لممارسة الاختراق المحلي — مجانية تمامًا",                  url: "https://vulnhub.com",           category: "cybersecurity", free: true },

  /* Website Building */
  { name: "Next.js",          desc: "إطار React الأقوى — SSR، SSG، App Router، مثالي للمواقع الاحترافية",           url: "https://nextjs.org",            category: "web-building",  free: true },
  { name: "Tailwind CSS",     desc: "إطار CSS مبني على الـ Utility Classes — أسرع طريقة لبناء واجهات جميلة",        url: "https://tailwindcss.com",       category: "web-building",  free: true },
  { name: "shadcn/ui",        desc: "مكونات React جاهزة وقابلة للتخصيص — مبنية على Tailwind و Radix",              url: "https://ui.shadcn.com",         category: "web-building",  hot: true  },
  { name: "Prisma",           desc: "ORM حديث لـ TypeScript و Node.js — يجعل قواعد البيانات سهلة وآمنة",            url: "https://prisma.io",             category: "web-building",  free: true },
  { name: "Supabase",         desc: "بديل Firebase مفتوح المصدر — قاعدة بيانات، Auth، Storage بسهولة",               url: "https://supabase.com",          category: "web-building",  free: true },
  { name: "Netlify",          desc: "نشر المواقع الثابتة والـ JAMstack — بسيط وسريع مع CDN عالمي",                    url: "https://netlify.com",           category: "web-building",  free: true },
  { name: "Framer Motion",    desc: "مكتبة animations لـ React — لإضافة حركات سلسة واحترافية للمواقع",              url: "https://framer.com/motion",     category: "web-building",  free: true },
];

/* ── Animation variants ── */
const cardAnim = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
};
const gridAnim = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.05 } },
};

function getCatColor(catKey: string) {
  return CATEGORIES.find(c => c.key === catKey) ?? CATEGORIES[0];
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return RESOURCES.filter(r => {
      if (activeCategory !== "all" && r.category !== activeCategory) return false;
      if (q && !r.name.toLowerCase().includes(q) && !r.desc.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [activeCategory, search]);

  const totalByCategory = useMemo(() => {
    const m: Record<string, number> = { all: RESOURCES.length };
    RESOURCES.forEach(r => { m[r.category] = (m[r.category] || 0) + 1; });
    return m;
  }, []);

  return (
    <div className="pt-20">

      {/* ── HERO ── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <FloatingOrbs count={6} />
        <ScanLine duration={10} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-badge mb-6">
              📁 مكتبة المصادر
            </span>
            <h1 className="font-black text-white mt-5 mb-4"
              style={{ fontSize: "clamp(2.2rem,6vw,3.8rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              أدوات وموارد مجانية
            </h1>
            <p style={{ color: "#606070", fontSize: "1rem", maxWidth: "38rem", margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
              أكثر من {RESOURCES.length} أداة ومنصة مختارة بعناية — للمطورين، المستقلين، وعشاق الأمن السيبراني.
            </p>
            {/* Stats */}
            <div className="flex items-center justify-center gap-5 text-sm flex-wrap">
              {[
                { label: "أداة مجانية",      count: RESOURCES.filter(r => r.free).length,  color: "#34d399" },
                { label: "تصنيف رئيسي",     count: CATEGORIES.length - 1,                   color: "#c084fc" },
                { label: "الأكثر شيوعًا",   count: RESOURCES.filter(r => r.hot).length,    color: "#fbbf24" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span className="font-black text-xl" style={{ color: s.color }}>{s.count}</span>
                  <span style={{ color: "#606070" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── STICKY FILTERS ── */}
      <div className="sticky top-16 z-30 backdrop-blur-2xl py-3 px-4"
        style={{ background: "rgba(5,5,8,0.94)", borderTop: "1px solid rgba(28,28,48,0.6)", borderBottom: "1px solid rgba(28,28,48,0.8)" }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2">

          {/* Search */}
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "#505070" }} />
            <input
              type="text"
              placeholder="ابحث في المصادر..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl py-2 pr-9 pl-8 text-white text-sm placeholder-[#505070] outline-none transition-all"
              style={{ background: "rgba(12,12,20,0.9)", border: "1px solid rgba(35,35,55,0.8)" }}
              onFocus={e => (e.target.style.borderColor = "rgba(147,51,234,0.5)")}
              onBlur={e => (e.target.style.borderColor = "rgba(35,35,55,0.8)")}
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#505070] hover:text-white transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category pills — horizontal scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar flex-1">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const active = activeCategory === cat.key;
              const count  = totalByCategory[cat.key] || 0;
              return (
                <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200"
                  style={active
                    ? { background: cat.bg, color: cat.color, border: `1px solid ${cat.color}40` }
                    : { background: "transparent", color: "#606070", border: "1px solid rgba(35,35,55,0.7)" }}>
                  <Icon className="w-3 h-3 flex-shrink-0" />
                  {cat.label}
                  <span className="text-[10px] opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Count badge */}
          <span className="text-xs flex-shrink-0" style={{ color: "#404055" }}>
            {visible.length} مورد
          </span>
        </div>
      </div>

      {/* ── GRID ── */}
      <section className="py-10 px-4 pb-24 relative overflow-hidden">
        <FloatingOrbs count={5} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {visible.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-20">
                <Search className="w-12 h-12 text-purple-600/25 mx-auto mb-3" />
                <p className="font-semibold text-white mb-1">لا توجد نتائج</p>
                <p className="text-sm" style={{ color: "#505070" }}>حاول تغيير مصطلح البحث أو التصنيف</p>
                <button onClick={() => { setSearch(""); setActiveCategory("all"); }}
                  className="mt-4 text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2">
                  إعادة ضبط الفلاتر
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${activeCategory}-${search}`}
                variants={gridAnim} initial="hidden" animate="show"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {visible.map((resource, idx) => {
                  const cat = getCatColor(resource.category);
                  const CatIcon = cat.icon;
                  return (
                    <motion.div key={resource.name} variants={cardAnim}>
                    <HolographicCard duration={6 + (idx % 4)} delay={(idx % 6) * 0.25}>
                    <div className="p-5 flex flex-col group transition-all duration-200">

                      {/* Header row */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: cat.bg, border: `1px solid ${cat.color}30` }}>
                          <CatIcon className="w-5 h-5" style={{ color: cat.color }} />
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          {resource.hot && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                              style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)" }}>
                              🔥 رائج
                            </span>
                          )}
                          {resource.free && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                              style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.25)" }}>
                              مجاني ✓
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="text-white font-black text-base mb-1.5 leading-tight"
                        style={{ letterSpacing: "-0.02em" }}>
                        {resource.name}
                      </h3>

                      {/* Category label */}
                      <span className="text-[10px] font-semibold mb-2" style={{ color: cat.color }}>
                        {CATEGORIES.find(c => c.key === resource.category)?.label}
                      </span>

                      {/* Description */}
                      <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: "#606080" }}>
                        {resource.desc}
                      </p>

                      {/* CTA */}
                      <a href={resource.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
                        style={{ background: cat.bg, border: `1px solid ${cat.color}40`, color: cat.color, boxShadow: `0 0 14px ${cat.color}20` }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLAnchorElement).style.background = cat.bg.replace("0.12", "0.28").replace("0.1", "0.25");
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 22px ${cat.color}50`;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLAnchorElement).style.background = cat.bg;
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 14px ${cat.color}20`;
                        }}>
                        <ExternalLink className="w-3.5 h-3.5" />
                        زيارة الموقع
                      </a>
                    </div>
                    </HolographicCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="px-4 pb-20 relative overflow-hidden">
        <FloatingOrbs count={4} />
        <ScanLine duration={11} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <HolographicCard duration={6}>
            <div className="p-8 md:p-10 text-center">
              <h2 className="text-white font-black text-xl mb-2" style={{ letterSpacing: "-0.02em" }}>
                حبيت الموارد؟ تحتاج خدمة مخصصة؟
              </h2>
              <p className="text-sm mb-6" style={{ color: "#9090b0", lineHeight: 1.7 }}>
                من تطوير المواقع إلى أدوات الذكاء الاصطناعي والأمن السيبراني — تواصل لنبني حلًا يناسبك.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link href="/contact" className="btn-primary btn-glow inline-flex items-center gap-2">
                  تواصل معاي
                </Link>
                <Link href="/blog"
                  className="btn-outline inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  قراءة المدونة
                </Link>
              </div>
            </div>
          </HolographicCard>
        </div>
      </section>
    </div>
  );
}
