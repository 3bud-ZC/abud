"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  // category & UI icons
  Sparkles, Code2, ShoppingBag, Smartphone, BrainCircuit, Workflow, Bot,
  Server, TrendingUp, Shield, Lightbulb,
  // service icons
  Globe, Layers, Rocket, Calendar, BookOpen, FileSearch,
  AppWindow, Hash, Cloud, Wand2,
  // accent / CTA icons
  CheckCircle, ArrowLeft, MessageSquare, Calculator, Star, Clock,
  Award, Users, Zap, PencilRuler,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import HolographicCard from "@/components/effects/HolographicCard";
import CountUp from "@/components/effects/CountUp";

/* ─────────────────────────────────────────────
   Categories
   ───────────────────────────────────────────── */
const CATEGORIES = [
  { id: "all",         label: "الكل",                   icon: Sparkles },
  { id: "development", label: "تطوير الويب",           icon: Code2 },
  { id: "ecommerce",   label: "التجارة الإلكترونية",  icon: ShoppingBag },
  { id: "mobile",      label: "تطبيقات الموبايل",     icon: Smartphone },
  { id: "ai",          label: "ذكاء اصطناعي",          icon: BrainCircuit },
  { id: "automation",  label: "الأتمتة",               icon: Workflow },
  { id: "bots",        label: "البوتات",               icon: Bot },
  { id: "devops",      label: "DevOps & API",          icon: Server },
  { id: "marketing",   label: "SEO & تسويق",           icon: TrendingUp },
  { id: "security",    label: "الأمن السيبراني",      icon: Shield },
  { id: "consulting",  label: "الاستشارات",           icon: Lightbulb },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

interface Service {
  id: string;
  category: Exclude<CategoryId, "all">;
  popular?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  deliverables: string[];
  duration: string;
  priceFrom: string;
  gradient: string; // used for icon glow color
  color: string;    // tailwind gradient classes
}

/* ─────────────────────────────────────────────
   18 Services across 10 categories
   ───────────────────────────────────────────── */
const SERVICES: Service[] = [
  // ─── Development ───
  {
    id: "web",
    category: "development",
    popular: true,
    icon: Globe,
    title: "تطوير مواقع احترافية",
    tagline: "Next.js · React · TypeScript",
    desc: "مواقع متكاملة بتصميم مخصص وأداء عالي ـ من الفكرة للنشر.",
    features: ["Next.js 14 / 15", "React 18", "Tailwind CSS", "متجاوب 100%", "SEO متقدم", "Lighthouse 95+"],
    deliverables: ["تصميم UI/UX", "موقع كامل", "لوحة تحكم", "نشر + دومين"],
    duration: "2 - 6 أسابيع",
    priceFrom: "من 1500 ج.م",
    gradient: "147,51,234",
    color: "from-purple-600 to-purple-800",
  },
  {
    id: "saas",
    category: "development",
    popular: true,
    icon: Layers,
    title: "منصات SaaS كاملة",
    tagline: "اشتراكات + لوحات تحكم",
    desc: "منصة اشتراك متكاملة بنظام دفع، صلاحيات، إحصائيات، وAPIs.",
    features: ["Auth + Roles", "Stripe / Paymob", "Multi-tenancy", "Admin Dashboard", "Analytics", "RESTful API"],
    deliverables: ["نظام تسجيل وأمان", "نظام دفع", "لوحات للمستخدمين", "API + Docs"],
    duration: "1 - 3 شهور",
    priceFrom: "من 5000 ج.م",
    gradient: "139,92,246",
    color: "from-violet-600 to-purple-900",
  },
  {
    id: "landing",
    category: "development",
    icon: Rocket,
    title: "Landing Pages & Funnels",
    tagline: "صفحات تحويل احترافية",
    desc: "صفحات تسويقية بمعدل تحويل عالي لإطلاق منتجك أو حملتك.",
    features: ["تصميم Conversion-focused", "نموذج تسجيل", "Mailchimp / Brevo", "A/B Testing", "Analytics", "سرعة قصوى"],
    deliverables: ["صفحة هبوط واحدة أو أكثر", "نظام جمع leads", "تتبع التحويلات"],
    duration: "3 - 7 أيام",
    priceFrom: "من 800 ج.م",
    gradient: "236,72,153",
    color: "from-pink-600 to-purple-800",
  },

  // ─── E-commerce ───
  {
    id: "ecommerce",
    category: "ecommerce",
    popular: true,
    icon: ShoppingBag,
    title: "متاجر إلكترونية",
    tagline: "Shopify · WooCommerce · Custom",
    desc: "متاجر متكاملة بنظام دفع وشحن وإدارة منتجات.",
    features: ["Cart + Checkout", "نظام دفع متعدد", "إدارة المخزون", "كوبونات", "تتبع الطلبات", "تقارير المبيعات"],
    deliverables: ["متجر متكامل", "لوحة تحكم للمنتجات", "نظام طلبات", "ربط الشحن"],
    duration: "3 - 8 أسابيع",
    priceFrom: "من 3000 ج.م",
    gradient: "16,185,129",
    color: "from-emerald-600 to-purple-700",
  },
  {
    id: "booking",
    category: "ecommerce",
    icon: Calendar,
    title: "أنظمة حجز ومواعيد",
    tagline: "Booking · Reservations",
    desc: "نظام حجز كامل للعيادات، الصالونات، الكورسات، الفعاليات.",
    features: ["تقويم تفاعلي", "إشعارات SMS / Email", "نظام دفع", "إدارة الموظفين", "تقارير", "Google Calendar"],
    deliverables: ["موقع + نظام حجز", "لوحة عملاء + إدارة", "إشعارات تلقائية"],
    duration: "2 - 5 أسابيع",
    priceFrom: "من 2500 ج.م",
    gradient: "6,182,212",
    color: "from-cyan-600 to-blue-700",
  },

  // ─── Mobile ───
  {
    id: "mobile",
    category: "mobile",
    icon: Smartphone,
    title: "تطبيقات الموبايل",
    tagline: "React Native · Expo",
    desc: "تطبيقات iOS و Android بكود واحد ـ بكفاءة native تقريباً.",
    features: ["React Native", "Expo", "Push Notifications", "Native APIs", "Offline support", "App + Play Store"],
    deliverables: ["تطبيق iOS + Android", "Backend متكامل", "نشر على المتاجر"],
    duration: "1 - 4 شهور",
    priceFrom: "من 4000 ج.م",
    gradient: "37,99,235",
    color: "from-blue-600 to-purple-800",
  },

  // ─── AI ───
  {
    id: "ai-tools",
    category: "ai",
    popular: true,
    icon: BrainCircuit,
    title: "أدوات ذكاء اصطناعي",
    tagline: "GPT-4 · Claude · Gemini",
    desc: "أدوات AI مخصصة لمشروعك ـ توليد محتوى، تحليل، أتمتة ذكية.",
    features: ["OpenAI API", "Claude API", "Custom Prompts", "Streaming", "Cost Optimization", "Rate Limiting"],
    deliverables: ["أداة AI كاملة", "Backend + UI", "إدارة API keys", "متابعة الاستخدام"],
    duration: "1 - 4 أسابيع",
    priceFrom: "من 1200 ج.م",
    gradient: "192,38,211",
    color: "from-fuchsia-600 to-purple-800",
  },
  {
    id: "ai-agents",
    category: "ai",
    icon: Sparkles,
    title: "AI Agents & Chatbots",
    tagline: "Customer Support + Sales",
    desc: "وكلاء أذكياء يردون على عملائك 24/7 مع تكامل CRM.",
    features: ["Multi-turn", "Memory + Context", "Tool Use", "Function Calling", "Escalation", "WhatsApp / Telegram"],
    deliverables: ["شات بوت ذكي", "تكامل قنوات", "لوحة محادثات"],
    duration: "2 - 5 أسابيع",
    priceFrom: "من 1800 ج.م",
    gradient: "168,85,247",
    color: "from-violet-700 to-fuchsia-700",
  },
  {
    id: "rag",
    category: "ai",
    icon: BookOpen,
    title: "أنظمة RAG وقواعد المعرفة",
    tagline: "Document AI",
    desc: "AI يعرف كل وثائقك ـ يجاوب من بياناتك بدقة مع citations.",
    features: ["Vector DB (Pinecone / pgvector)", "Embeddings", "Hybrid search", "Citations", "Multilingual", "Chunking strategy"],
    deliverables: ["نظام بحث ذكي", "Upload pipeline", "Q&A interface"],
    duration: "2 - 6 أسابيع",
    priceFrom: "من 2500 ج.م",
    gradient: "139,92,246",
    color: "from-purple-700 to-indigo-800",
  },

  // ─── Automation ───
  {
    id: "automation",
    category: "automation",
    popular: true,
    icon: Workflow,
    title: "أتمتة سير العمل",
    tagline: "n8n · Make · Zapier · Python",
    desc: "وفّر ساعات يومياً بأتمتة المهام المتكررة.",
    features: ["n8n Workflows", "Python Scripts", "Cron Jobs", "Webhooks", "API Integrations", "Slack / Email Alerts"],
    deliverables: ["Workflows جاهزة", "Documentation", "Monitoring + alerts"],
    duration: "أيام إلى أسابيع",
    priceFrom: "من 600 ج.م",
    gradient: "245,158,11",
    color: "from-amber-600 to-orange-700",
  },
  {
    id: "scrapers",
    category: "automation",
    icon: FileSearch,
    title: "Scraping & Data Mining",
    tagline: "استخراج البيانات تلقائياً",
    desc: "استخراج بيانات من أي موقع ـ أسعار، منتجات، محتوى ـ بشكل آلي.",
    features: ["Playwright / Puppeteer", "Proxy rotation", "Anti-bot bypass", "Scheduled scraping", "CSV / JSON / DB", "Cleaning + Normalization"],
    deliverables: ["Scraper script", "Data pipeline", "Dashboard أو exports"],
    duration: "أيام إلى أسابيع",
    priceFrom: "من 500 ج.م",
    gradient: "234,88,12",
    color: "from-orange-600 to-red-700",
  },

  // ─── Bots ───
  {
    id: "telegram-bots",
    category: "bots",
    popular: true,
    icon: Bot,
    title: "بوتات تيليجرام",
    tagline: "Telegram Bot API",
    desc: "بوتات احترافية ـ متاجر، إدارة، AI، إشعارات، اشتراكات.",
    features: ["Inline Keyboards", "Web App integration", "Telegram Stars", "Admin Panel", "Stats", "Multi-language"],
    deliverables: ["بوت كامل", "لوحة إدارة", "نشر + استضافة"],
    duration: "أيام إلى 3 أسابيع",
    priceFrom: "من 200 ج.م",
    gradient: "14,165,233",
    color: "from-sky-500 to-blue-700",
  },
  {
    id: "telegram-mini-apps",
    category: "bots",
    icon: AppWindow,
    title: "Telegram Mini Apps",
    tagline: "WebApps داخل تيليجرام",
    desc: "تطبيقات مصغرة تعمل داخل تيليجرام ـ تجربة سلسة بلا تثبيت.",
    features: ["Mini App SDK", "Telegram Stars Payment", "Native UI", "Telegram Auth", "Cloud Storage", "Real-time"],
    deliverables: ["Mini App + Bot", "Backend متكامل", "نشر داخل البوت"],
    duration: "1 - 4 أسابيع",
    priceFrom: "من 1500 ج.م",
    gradient: "59,130,246",
    color: "from-blue-500 to-cyan-700",
  },
  {
    id: "discord-bots",
    category: "bots",
    icon: Hash,
    title: "بوتات Discord",
    tagline: "Discord.js · Discord.py",
    desc: "بوتات للسيرفرات ـ موديريشن، ألعاب، اقتصاد، إعلانات.",
    features: ["Slash Commands", "Buttons + Modals", "Voice channels", "Music streaming", "Moderation", "Custom roles"],
    deliverables: ["بوت كامل", "Dashboard ويب", "نشر دائم"],
    duration: "أيام إلى 3 أسابيع",
    priceFrom: "من 300 ج.م",
    gradient: "99,102,241",
    color: "from-indigo-600 to-purple-800",
  },

  // ─── DevOps & API ───
  {
    id: "api-dev",
    category: "devops",
    icon: Server,
    title: "تطوير وتكامل APIs",
    tagline: "REST · GraphQL · Webhooks",
    desc: "بناء APIs قوية أو دمج خدمات خارجية في نظامك.",
    features: ["REST + GraphQL", "JWT / OAuth", "Rate limiting", "Swagger Docs", "Testing", "Monitoring"],
    deliverables: ["API كاملة", "Postman collection", "Tests", "Documentation"],
    duration: "1 - 4 أسابيع",
    priceFrom: "من 1000 ج.م",
    gradient: "20,184,166",
    color: "from-teal-600 to-cyan-700",
  },
  {
    id: "devops",
    category: "devops",
    icon: Cloud,
    title: "DevOps & Cloud Hosting",
    tagline: "AWS · Vercel · Docker · VPS",
    desc: "إعداد بنية تحتية موثوقة ـ نشر، CI/CD، مراقبة، نسخ احتياطي.",
    features: ["Docker + compose", "GitHub Actions CI/CD", "VPS (Ubuntu)", "Nginx + SSL", "Grafana Monitoring", "Auto-scaling"],
    deliverables: ["بنية تحتية جاهزة", "CI/CD pipeline", "Monitoring dashboard"],
    duration: "أيام إلى أسابيع",
    priceFrom: "من 800 ج.م",
    gradient: "8,145,178",
    color: "from-cyan-600 to-blue-800",
  },

  // ─── Marketing / SEO ───
  {
    id: "seo",
    category: "marketing",
    icon: TrendingUp,
    title: "SEO & Performance",
    tagline: "تصدّر جوجل + سرعة قصوى",
    desc: "تصدر نتائج جوجل وحسّن سرعة موقعك للزوار والمحركات معاً.",
    features: ["Technical SEO", "On-page SEO", "Schema.org", "Core Web Vitals", "Lighthouse 95+", "Sitemap + robots.txt"],
    deliverables: ["تقرير SEO شامل", "تحسينات تطبيقية", "تتبع 3 شهور"],
    duration: "1 - 3 أسابيع",
    priceFrom: "من 700 ج.م",
    gradient: "34,197,94",
    color: "from-green-600 to-emerald-700",
  },

  // ─── Security ───
  {
    id: "security",
    category: "security",
    icon: Shield,
    title: "الأمن السيبراني",
    tagline: "Pentesting + Hardening",
    desc: "فحص ثغرات موقعك أو تطبيقك وحمايته من الاختراق.",
    features: ["OWASP Top 10 audit", "SQL Injection tests", "XSS detection", "CSRF protection", "Auth review", "WAF configuration"],
    deliverables: ["تقرير ثغرات مفصل", "إصلاحات تطبيقية", "إرشادات أمنية"],
    duration: "1 - 3 أسابيع",
    priceFrom: "من 1200 ج.م",
    gradient: "239,68,68",
    color: "from-red-600 to-rose-800",
  },

  // ─── Consulting ───
  {
    id: "consulting",
    category: "consulting",
    popular: true,
    icon: Lightbulb,
    title: "استشارات تقنية",
    tagline: "بالساعة أو الجلسة",
    desc: "استشارة مع خبير ـ توفر شهور من الأخطاء وتختار الطريق الصح.",
    features: ["تقييم الأفكار", "اختيار التقنيات", "Architecture Review", "Code Review", "خارطة الطريق", "Best practices"],
    deliverables: ["جلسة 60 دقيقة", "تقرير + توصيات", "متابعة بالإيميل"],
    duration: "ساعة - أيام",
    priceFrom: "من 200 ج.م/ساعة",
    gradient: "234,179,8",
    color: "from-yellow-600 to-amber-700",
  },
];

/* ─────────────────────────────────────────────
   Trust signals + process + extended FAQ
   ───────────────────────────────────────────── */
const STATS = [
  { value: SERVICES.length, suffix: "+", label: "خدمة احترافية", icon: Sparkles },
  { value: 100, suffix: "+", label: "مشروع منجز",     icon: CheckCircle },
  { value: 50,  suffix: "+", label: "عميل سعيد",      icon: Users },
  { value: 5,   suffix: "+", label: "سنوات خبرة",     icon: Award },
];

const PROCESS = [
  { step: "01", icon: MessageSquare, title: "نبدأ بمحادثة",        desc: "تشرح فكرتك، نتفق على المتطلبات، وأقدم لك تقييماً صريحاً." },
  { step: "02", icon: PencilRuler,   title: "خطة + تصميم",          desc: "أبني خطة مفصلة + تصميم أولي تعتمد عليه قبل أي كود." },
  { step: "03", icon: Code2,         title: "البناء على دفعات",      desc: "تشوف تقدم المشروع كل أسبوع وتدّي feedback ـ مفيش surprise." },
  { step: "04", icon: Rocket,        title: "إطلاق + دعم",           desc: "بعد التسليم نضمن استقرار المشروع + دعم مجاني للأخطاء." },
];

const WHY_ME = [
  { icon: Zap,        title: "تسليم سريع",         desc: "أحترم المواعيد ـ أغلب المشاريع تتسلّم قبل الموعد." },
  { icon: Star,       title: "جودة عالية",         desc: "كود نظيف، documented، وقابل للصيانة." },
  { icon: Shield,     title: "أمان أولاً",          desc: "كل مشروع يمر بمراجعة أمنية قبل النشر." },
  { icon: MessageSquare, title: "تواصل مباشر",     desc: "بدون وسطاء ـ كلامك مع المطور نفسه." },
  { icon: Award,      title: "ضمان جودة",          desc: "تعديلات مجانية لمدة 30 يوم بعد التسليم." },
  { icon: Clock,      title: "دعم مستمر",          desc: "صيانة شهرية اختيارية بأسعار مخفّضة." },
];

const FAQ = [
  { q: "كم مدة تنفيذ المشاريع؟",                      a: "تعتمد على حجم المشروع: المهام البسيطة من 3-7 أيام، المتوسطة 2-4 أسابيع، الكبيرة من شهر لـ 3 شهور. أعطيك تقدير دقيق بعد فهم المتطلبات." },
  { q: "هل تقدم خدمة الصيانة بعد التسليم؟",            a: "نعم ـ صيانة مجانية للأخطاء لمدة 30 يوم بعد التسليم، وعقود صيانة شهرية اختيارية بأسعار مناسبة." },
  { q: "ما هي طرق الدفع المتاحة؟",                    a: "فودافون كاش، إنستاباي، PayPal، USDT. غالباً بيكون 50% مقدماً والباقي عند التسليم، وللمشاريع الكبيرة بيتم الدفع على دفعات حسب الـ milestones." },
  { q: "هل يمكنني رؤية أعمال سابقة؟",                  a: "بالتأكيد ـ تصفح صفحة (أعمالي) لترى مشاريع حقيقية منجزة بكود مفتوح أو live previews." },
  { q: "هل تتعامل مع تعديلات بعد التسليم؟",            a: "نعم ـ أي تعديل بسيط (bug أو edge case) مجاني خلال 30 يوم. التعديلات الكبيرة (features جديدة) بسعر مخفّض كعميل سابق." },
  { q: "أملك فكرة مش متأكد منها ـ هل تساعدني؟",        a: "أكيد ـ احجز استشارة (200 ج.م/ساعة) وهنناقش الفكرة، التقنيات، الميزانية المناسبة، وأبني لك خارطة طريق." },
  { q: "هل تتعامل مع شركات / startups؟",                a: "نعم ـ أعمل مع أفراد، startups، وشركات. أوقّع NDA لو احتاج، وأقدر أعمل ضمن فريقكم أو كمقاول مستقل." },
  { q: "ماذا لو لم تكن خدمتي ضمن القائمة؟",           a: "تواصل معي مباشرة! القائمة تغطي 90% من الطلبات، لكن لو عندك حاجة خاصة، تكلمنا واتفقنا. دائماً أحب التحديات الجديدة." },
];

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */
export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return SERVICES;
    return SERVICES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const popularServices = useMemo(() => SERVICES.filter((s) => s.popular), []);

  return (
    <div className="pt-20">
      {/* ─────────── HERO ─────────── */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        <FloatingOrbs count={5} />
        <ScanLine duration={11} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/25 mb-6">
              <Zap className="w-3 h-3 text-purple-400" />
              <span className="text-purple-300 text-xs font-medium tracking-wider">19 خدمة احترافية</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6" style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-100 to-purple-400">
                ماذا أبني لك؟
              </span>
            </h1>

            <p className="text-[#a0a0c0] text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              حلول تقنية متكاملة من تطوير الويب وحتى الذكاء الاصطناعي والأتمتة.
              <br className="hidden md:block" />
              كل خدمة مبنية على خبرة حقيقية ونتائج ملموسة.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {STATS.map(({ value, suffix, label, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: "linear-gradient(160deg, rgba(20,15,35,0.6), rgba(10,10,18,0.6))",
                    border: "1px solid rgba(147,51,234,0.18)",
                  }}
                >
                  <Icon className="w-4 h-4 text-purple-400 mx-auto mb-1.5" />
                  <div className="text-2xl md:text-3xl font-black text-white">
                    <CountUp to={value} duration={1.4} />
                    <span className="text-purple-400">{suffix}</span>
                  </div>
                  <div className="text-[10px] md:text-xs text-[#7878a0] mt-0.5">{label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─────────── POPULAR / FEATURED ─────────── */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-yellow-400" fill="rgba(250,204,21,0.4)" />
              <span className="text-yellow-300 text-xs font-bold tracking-wider uppercase">الأكثر طلباً</span>
              <Star className="w-4 h-4 text-yellow-400" fill="rgba(250,204,21,0.4)" />
            </div>
            <h2 className="section-title mb-2">الخدمات الأكثر طلباً</h2>
            <p className="section-subtitle">أعمال مكررة مع نتائج موثوقة لمئات العملاء</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularServices.slice(0, 6).map((s, i) => (
              <AnimatedSection key={s.id} delay={i * 0.06}>
                <PopularCard service={s} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── ALL SERVICES + CATEGORY FILTER ─────────── */}
      <section id="all-services" className="py-20 px-4 relative overflow-hidden">
        <FloatingOrbs count={4} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2 className="section-title mb-2">كل الخدمات</h2>
            <p className="section-subtitle">اختر الفئة لتصفية الخدمات</p>
          </AnimatedSection>

          {/* Category filter chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map(({ id, label, icon: Icon }) => {
              const count = id === "all" ? SERVICES.length : SERVICES.filter((s) => s.category === id).length;
              const active = activeCategory === id;
              return (
                <motion.button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px]"
                  style={
                    active
                      ? {
                          background: "linear-gradient(135deg, rgba(147,51,234,0.25), rgba(109,40,217,0.18))",
                          border: "1px solid rgba(168,85,247,0.5)",
                          color: "#f3e8ff",
                          boxShadow: "0 0 0 1px rgba(168,85,247,0.3), 0 4px 14px rgba(147,51,234,0.25)",
                        }
                      : {
                          background: "rgba(15,12,24,0.6)",
                          border: "1px solid rgba(45,35,70,0.5)",
                          color: "#9090b0",
                        }
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: active ? "rgba(168,85,247,0.3)" : "rgba(35,30,55,0.7)",
                      color: active ? "#e9d5ff" : "#606080",
                    }}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Filtered services grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredServices.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <ServiceCard service={s} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredServices.length === 0 && (
            <div className="text-center py-16 text-[#606080]">
              لا توجد خدمات في هذه الفئة حالياً.
            </div>
          )}
        </div>
      </section>

      {/* ─────────── PROCESS ─────────── */}
      <section className="py-20 px-4 bg-[#080810] relative overflow-hidden">
        <FloatingOrbs count={3} />

        <div className="relative z-10 max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="section-badge mb-4 mx-auto">
              <Workflow className="w-2.5 h-2.5" />
              كيف نشتغل سوا
            </span>
            <h2 className="section-title mb-3">من الفكرة للنشر</h2>
            <p className="section-subtitle">٤ خطوات واضحة ـ بدون مفاجآت ولا تأخير</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {PROCESS.map(({ step, icon: Icon, title, desc }, i) => (
              <AnimatedSection key={step} delay={i * 0.08}>
                <HolographicCard duration={6} delay={i * 0.3}>
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl font-black text-purple-600/30">{step}</span>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                           style={{ background: "rgba(147,51,234,0.15)", border: "1px solid rgba(147,51,234,0.3)" }}>
                        <Icon className="w-5 h-5 text-purple-300" />
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-base mb-2" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                    <p className="text-[#9090b0] text-sm leading-relaxed">{desc}</p>
                  </div>
                </HolographicCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── WHY ME ─────────── */}
      <section className="py-20 px-4 relative overflow-hidden">
        <FloatingOrbs count={4} />
        <ScanLine duration={12} direction="vertical" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="section-badge mb-4 mx-auto">
              <Award className="w-2.5 h-2.5" />
              ليه تختارني
            </span>
            <h2 className="section-title mb-3">قيمة حقيقية لكل ريال</h2>
            <p className="section-subtitle">٦ أسباب تخلّيك مرتاح إنك بتشتغل مع شخص محترف</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_ME.map(({ icon: Icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.06}>
                <div
                  className="rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(160deg, rgba(20,15,35,0.7), rgba(10,10,18,0.7))",
                    border: "1px solid rgba(147,51,234,0.18)",
                  }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                       style={{
                         background: "linear-gradient(135deg, rgba(147,51,234,0.2), rgba(168,85,247,0.1))",
                         border: "1px solid rgba(168,85,247,0.3)",
                       }}>
                    <Icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
                  <p className="text-[#9090b0] text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── FAQ ─────────── */}
      <section className="py-20 px-4 bg-[#080810] relative overflow-hidden">
        <FloatingOrbs count={4} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title mb-3">أسئلة شائعة</h2>
            <p className="section-subtitle">أجوبة صريحة على أكثر الأسئلة المتكررة</p>
          </AnimatedSection>

          <div className="space-y-3">
            {FAQ.map(({ q, a }, i) => (
              <AnimatedSection key={i} delay={i * 0.04}>
                <FaqItem q={q} a={a} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <FloatingOrbs count={5} />
        <ScanLine duration={10} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <AnimatedSection>
            <HolographicCard duration={6}>
              <div className="p-8 md:p-12 text-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(147,51,234,0.18)_0%,transparent_60%)] pointer-events-none" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
                       style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-medium">متاح للمشاريع الجديدة</span>
                  </div>

                  <h2 className="font-black text-white mb-4" style={{ fontSize: "clamp(1.7rem,4vw,2.6rem)", letterSpacing: "-0.025em" }}>
                    جاهز للبدء في مشروعك؟
                  </h2>
                  <p className="mb-8 max-w-lg mx-auto" style={{ color: "#a0a0c0", fontSize: "0.95rem", lineHeight: 1.7 }}>
                    احسب سعر مشروعك بنفسك في دقيقة، أو تواصل مباشرة لعرض مخصص.
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link href="/quote" className="btn-primary btn-glow gap-2 inline-flex">
                      <Calculator className="w-4 h-4" />
                      احسب سعر مشروعك
                    </Link>
                    <Link href="/contact" className="btn-outline gap-2 inline-flex">
                      <MessageSquare className="w-4 h-4" />
                      تواصل معي مباشرة
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

/* ─────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────── */

function PopularCard({ service: s }: { service: Service }) {
  const Icon = s.icon;
  return (
    <Link href="/contact" className="block h-full group">
      <div
        className="relative h-full rounded-2xl p-6 overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
        style={{
          background: "linear-gradient(160deg, rgba(22,15,40,0.85), rgba(12,10,22,0.9))",
          border: "1px solid rgba(168,85,247,0.3)",
          boxShadow: `0 4px 20px rgba(${s.gradient},0.15)`,
        }}
      >
        {/* Popular badge */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
             style={{
               background: "linear-gradient(135deg, rgba(250,204,21,0.2), rgba(245,158,11,0.15))",
               border: "1px solid rgba(250,204,21,0.4)",
               color: "#fde047",
             }}>
          <Star className="w-2.5 h-2.5" fill="currentColor" />
          الأكثر طلباً
        </div>

        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 mt-2`}
             style={{ boxShadow: `0 8px 28px rgba(${s.gradient},0.4)` }}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-white font-black text-lg mb-1" style={{ letterSpacing: "-0.02em" }}>{s.title}</h3>
        <p className="text-[#a78bfa] text-xs font-medium mb-3" dir="ltr" style={{ textAlign: "right" }}>{s.tagline}</p>
        <p className="text-[#9090b0] text-sm leading-relaxed mb-5">{s.desc}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs font-bold" style={{ color: `rgb(${s.gradient})` }}>{s.priceFrom}</span>
          <span className="inline-flex items-center gap-1 text-xs text-purple-300 group-hover:gap-2 transition-all">
            ابدأ الآن
            <ArrowLeft className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ServiceCard({ service: s }: { service: Service }) {
  const Icon = s.icon;
  return (
    <div
      className="relative h-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 group"
      style={{
        background: "linear-gradient(160deg, rgba(15,12,24,0.85), rgba(10,10,18,0.9))",
        border: "1px solid rgba(35,30,55,0.7)",
      }}
    >
      <div className="flex items-start gap-4 mb-3">
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}
             style={{ boxShadow: `0 6px 20px rgba(${s.gradient},0.25)` }}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-base mb-0.5 truncate" style={{ letterSpacing: "-0.01em" }}>{s.title}</h3>
          <p className="text-[#a78bfa] text-xs font-medium" dir="ltr" style={{ textAlign: "right" }}>{s.tagline}</p>
        </div>
      </div>

      <p className="text-[#9090b0] text-sm leading-relaxed mb-4">{s.desc}</p>

      {/* Features */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {s.features.slice(0, 4).map((f) => (
          <span key={f} className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: "rgba(147,51,234,0.08)", border: "1px solid rgba(147,51,234,0.18)", color: "#c4b5fd" }}>
            {f}
          </span>
        ))}
        {s.features.length > 4 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full text-[#606080]">+{s.features.length - 4}</span>
        )}
      </div>

      {/* Meta + CTA */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#606080] flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {s.duration}
          </span>
          <span className="text-xs font-bold mt-0.5" style={{ color: `rgb(${s.gradient})` }}>{s.priceFrom}</span>
        </div>
        <Link href="/contact" className="inline-flex items-center gap-1 text-xs font-medium text-purple-300 hover:text-white transition-colors">
          اطلب
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Popular ribbon */}
      {s.popular && (
        <div className="absolute -top-2 -right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold rotate-3"
             style={{
               background: "linear-gradient(135deg, #facc15, #f59e0b)",
               color: "#1a1500",
               boxShadow: "0 4px 12px rgba(245,158,11,0.4)",
             }}>
          <Star className="w-2.5 h-2.5" fill="currentColor" />
          شائع
        </div>
      )}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((v) => !v)}
      className="w-full text-right rounded-2xl p-5 transition-all duration-300"
      style={{
        background: open
          ? "linear-gradient(160deg, rgba(28,20,50,0.85), rgba(15,10,25,0.9))"
          : "linear-gradient(160deg, rgba(15,12,24,0.7), rgba(10,10,18,0.7))",
        border: open ? "1px solid rgba(168,85,247,0.4)" : "1px solid rgba(35,30,55,0.7)",
        boxShadow: open ? "0 8px 28px rgba(147,51,234,0.15)" : "none",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-white font-bold text-sm md:text-base flex-1" style={{ letterSpacing: "-0.01em" }}>{q}</h3>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-purple-300"
          style={{ background: "rgba(147,51,234,0.12)", border: "1px solid rgba(147,51,234,0.3)" }}
        >
          <span className="text-lg leading-none">+</span>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[#9090b0] text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
