"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MessageCircle, X, Send, Bot, Sparkles, ArrowRight,
  ShoppingBag, Wrench, BookOpen, Star, Phone,
} from "lucide-react";

/* ── Types ───────────────────────────────────────────────── */
interface Message {
  id: number;
  from: "user" | "bot";
  text: string;
  bullets?: string[];
  links?: { label: string; href: string }[];
}

interface BotResponse {
  text: string;
  bullets?: string[];
  links?: { label: string; href: string }[];
}

/* ── Quick actions ───────────────────────────────────────── */
const QUICK_ACTIONS = [
  { label: "🛍️ استعراض المنتجات",   key: "products",  icon: ShoppingBag },
  { label: "🔧 الخدمات المتاحة",     key: "services",  icon: Wrench },
  { label: "📚 قراءة المدونة",        key: "blog",      icon: BookOpen },
  { label: "📁 المصادر المجانية",    key: "resources", icon: Star },
  { label: "💬 التواصل والدعم",       key: "contact",   icon: Phone },
];

/* ── Intent engine ───────────────────────────────────────── */
function getBotResponse(input: string): BotResponse {
  const q = input.toLowerCase();

  /* greetings */
  if (/^(hello|hi|hey|مرحبا|هلا|السلام|أهلا|اهلا|كيف|ازيك|صباح|مساء)/.test(q) || q.trim().length < 5) {
    return {
      text: "أهلاً وسهلاً! 👋 أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟",
      bullets: ["🛍️ اكتشف منتجاتنا الرقمية", "🔧 تعرف على خدمات التطوير والأمن", "📚 اقرأ مقالاتنا المتخصصة", "💬 تواصل معنا مباشرة"],
      links: [{ label: "استعراض المتجر →", href: "/store" }],
    };
  }

  /* featured / popular */
  if (/featured|popular|best seller|مميز|الأكثر|أفضل|موصى|مشهور/.test(q)) {
    return {
      text: "⭐ أبرز منتجاتنا وخدماتنا الأكثر طلبًا:",
      bullets: [
        "🔒 فحص أمني شامل للموقع — 1,499 ج.م",
        "💼 تطوير موقع بورتفوليو شخصي — 3,999 ج.م",
        "🐛 خدمة إصلاح الأخطاء البرمجية — 799 ج.م",
        "📘 دليل الأمن السيبراني للمبتدئين — 149 ج.م",
        "🗂️ قالب موقع بورتفوليو احترافي — 199 ج.م",
        "🧰 حقيبة أدوات المستقل المحترف — 119 ج.م",
      ],
      links: [{ label: "عرض الكل في المتجر →", href: "/store" }],
    };
  }

  /* digital products */
  if (/product|download|digital|buy|purchase|guide|دليل|منتج|اشتري|شراء|تحميل|رقمي/.test(q)) {
    return {
      text: "📦 نوفر 15 منتجًا رقميًا للتحميل الفوري بعد الدفع:",
      bullets: [
        "📘 أدلة الأمن السيبراني (مبتدئ + متقدم)",
        "🤖 دليل أدوات الذكاء الاصطناعي للمطورين",
        "🗺️ خارطة طريق Full Stack Developer",
        "🎮 أدلة تحسين أداء الألعاب و FPS",
        "📁 قوالب بورتفوليو وصفحات هبوط احترافية",
        "🧰 حزمة أدوات مطور الويب والمستقل",
      ],
      links: [{ label: "تصفح المنتجات الرقمية →", href: "/store" }],
    };
  }

  /* I need a website specifically */
  if (/make.*website|build.*website|أريد موقع|عايز موقع|محتاج موقع|موقع احترافي|موقع لي/.test(q)) {
    return {
      text: "رائع! لدينا 4 خيارات لبناء موقعك حسب احتياجك:",
      bullets: [
        "🚀 صفحة هبوط احترافية — من 2,499 ج.م",
        "💼 موقع بورتفوليو شخصي — من 3,999 ج.م",
        "🏢 موقع شركة متكامل — من 4,999 ج.م",
        "⚙️ موقع مخصص بالكامل (Next.js + لوحة تحكم) — من 7,999 ج.م",
      ],
      links: [
        { label: "خدمات التطوير →", href: "/store" },
        { label: "تواصل معنا →", href: "/contact" },
      ],
    };
  }

  /* services general */
  if (/service|سرفر|website|build|security|audit|خدمة|موقع|تطوير|برمجة/.test(q)) {
    return {
      text: "🔧 نقدم 12 خدمة احترافية في التطوير والأمن السيبراني:",
      bullets: [
        "🔒 فحص أمني وتقييم الثغرات للمواقع",
        "🌐 تطوير مواقع (هبوط / بورتفوليو / شركات / متكامل)",
        "🐛 إصلاح الأخطاء البرمجية — خلال 24-48 ساعة",
        "⚡ تحسين سرعة وأداء الموقع (PageSpeed 90+)",
        "🛡️ إزالة البرمجيات الخبيثة وتأمين الخادم",
        "💡 استشارات التقنية والمسار المهني",
      ],
      links: [{ label: "اطّلع على الخدمات →", href: "/store" }],
    };
  }

  /* pricing / EGP */
  if (/price|cost|how much|سعر|تكلفة|كم|بكام|غالي|رخيص|ج\.م|جنيه|تمن/.test(q)) {
    return {
      text: "💰 جميع أسعارنا بالجنيه المصري (ج.م):",
      bullets: [
        "📦 المنتجات الرقمية: من 99 إلى 349 ج.م",
        "🔧 الخدمات البسيطة (مراجعة / استشارة): من 599 ج.م",
        "🌐 تطوير المواقع: من 2,499 إلى 7,999 ج.م",
        "🔒 الأمن السيبراني: من 1,299 إلى 2,999 ج.م",
      ],
      links: [{ label: "عرض الأسعار كاملة →", href: "/store" }],
    };
  }

  /* payment methods */
  if (/payment|pay|vodafone|instapay|paypal|دفع|طرق الدفع|ادفع/.test(q)) {
    return {
      text: "💳 طرق الدفع المتاحة:",
      bullets: [
        "📱 فودافون كاش",
        "💸 إنستاباي",
        "🌐 باي بال (PayPal)",
        "✅ ارفع الإيصال في نموذج الطلب وسيُفعَّل خلال 1-3 ساعات",
      ],
      links: [{ label: "ابدأ الشراء →", href: "/store" }],
    };
  }

  /* coupons */
  if (/coupon|discount|code|offer|خصم|كوبون|عرض|تخفيض/.test(q)) {
    return {
      text: "🎉 لدينا أكواد خصم حصرية — أدخلها عند الدفع:",
      bullets: [
        "WELCOME20 — خصم 20% على أول عملية شراء",
        "FIRSTBUY10 — خصم 10% لأي منتج",
        "CYBER15 — خصم 15% على منتجات الأمن السيبراني",
        "AITOOLS25 — خصم 25% على دليل أدوات AI",
        "STUDENT30 — خصم 30% للطلاب",
      ],
      links: [{ label: "تسوّق واستخدم الكود →", href: "/store" }],
    };
  }

  /* how to buy */
  if (/how.*(buy|purchase|order)|كيف اشتري|كيف أشتري|طريقة الشراء|خطوات الشراء/.test(q)) {
    return {
      text: "🛒 عملية الشراء بسيطة جدًا:",
      bullets: [
        "1️⃣ اختر المنتج أو الخدمة من المتجر",
        "2️⃣ اضغط 'اشتر الآن' وأكمل بيانات الطلب",
        "3️⃣ ادفع عبر فودافون كاش أو إنستاباي أو باي بال",
        "4️⃣ ارفع إيصال الدفع في نموذج الطلب",
        "5️⃣ استلم منتجك أو ابدأ خدمتك خلال 1-3 ساعات",
      ],
      links: [{ label: "تسوّق الآن →", href: "/store" }],
    };
  }

  /* delivery / download timing */
  if (/deliver|receive|download|get|متى|استلم|وقت التسليم|تحميل|كم وقت/.test(q)) {
    return {
      text: "⚡ بعد تأكيد دفعك:",
      bullets: [
        "📥 المنتجات الرقمية: رابط تحميل فوري خلال دقائق",
        "🔧 الخدمات: نتواصل خلال 24 ساعة لبدء العمل",
        "📧 تأكيد بالبريد الإلكتروني عند الموافقة",
        "💬 دعم مخصص 30 يومًا بعد الاستلام",
      ],
    };
  }

  /* support / help */
  if (/support|help|problem|issue|مساعدة|دعم|مشكلة|شكوى/.test(q)) {
    return {
      text: "🤝 فريق الدعم جاهز لمساعدتك:",
      bullets: [
        "📧 دعم بريد إلكتروني لـ 30 يومًا بعد الشراء",
        "💬 تواصل مباشر عبر صفحة Contact",
        "⚡ وقت الرد: خلال 24 ساعة في أيام العمل",
      ],
      links: [{ label: "صفحة التواصل →", href: "/contact" }],
    };
  }

  /* blog */
  if (/blog|article|read|post|مقال|مدونة|اقرأ|كتابة/.test(q)) {
    return {
      text: "📚 مدونتنا تغطي أهم المواضيع التقنية:",
      bullets: [
        "💰 كيف تجني المال أونلاين",
        "🤖 أفضل أدوات الذكاء الاصطناعي",
        "👨‍💻 الدخل السلبي للمطورين",
        "🔒 الأمن السيبراني للمبتدئين",
        "🚀 بناء مشروع تقني ناجح من الصفر",
      ],
      links: [{ label: "قراءة المدونة →", href: "/blog" }],
    };
  }

  /* AI / automation */
  if (/\bai\b|artificial intelligence|chatgpt|claude|copilot|automation|ذكاء اصطناعي|أتمتة/.test(q)) {
    return {
      text: "🤖 محتوانا حول الذكاء الاصطناعي:",
      bullets: [
        "📘 دليل أدوات AI للمطورين — 149 ج.م (تحميل فوري)",
        "📝 مقالات: ChatGPT و Claude و GitHub Copilot",
        "⚡ أتمتة المهام للمطورين والمستقلين",
        "🧠 أفضل Prompts لكتابة الكود بـ AI",
      ],
      links: [
        { label: "دليل أدوات AI →", href: "/store" },
        { label: "مقالات AI →", href: "/blog" },
      ],
    };
  }

  /* cybersecurity */
  if (/cyber|security|hack|penetration|pentest|أمن|اختراق|ثغرة|malware/.test(q)) {
    return {
      text: "🔒 خدمات ومنتجات الأمن السيبراني:",
      bullets: [
        "📘 دليل الأمن للمبتدئين — 149 ج.م",
        "📖 الدليل الشامل المتقدم (120+ صفحة) — 349 ج.م",
        "🔍 فحص أمني شامل للموقع — 1,499 ج.م",
        "🕵️ اختبار اختراق Black/Grey Box — 2,999 ج.م",
        "🛡️ إزالة البرمجيات الخبيثة — 1,299 ج.م",
        "🖥️ تأمين الخادم (Linux/VPS) — 2,499 ج.م",
      ],
      links: [{ label: "منتجات الأمن السيبراني →", href: "/store" }],
    };
  }

  /* freelancing */
  if (/freelan|freelance|client|عمل حر|فريلانس|مستقل|أول عميل/.test(q)) {
    return {
      text: "💼 مصادر لبدء وتطوير مسيرتك كمستقل:",
      bullets: [
        "🧰 حقيبة أدوات المستقل (عقود + فواتير + قوالب) — 119 ج.م",
        "📝 مقال: كيف تحصل على أول عميل هذا الأسبوع",
        "💡 استشارة مسار مهني تقني — 599 ج.م",
      ],
      links: [
        { label: "حقيبة المستقل →", href: "/store" },
        { label: "مقالات الفريلانس →", href: "/blog" },
      ],
    };
  }

  /* beginners */
  if (/beginner|start|new|starter|مبتدئ|ابدأ|بداية|أبدأ|من الصفر/.test(q)) {
    return {
      text: "🌱 أفضل نقطة انطلاق للمبتدئين:",
      bullets: [
        "📘 دليل الأمن السيبراني للمبتدئين — 149 ج.م",
        "🗺️ خارطة طريق Full Stack Developer — 129 ج.م",
        "🧰 حزمة أدوات مطور الويب المبتدئ — 129 ج.م",
        "💡 استشارة مسار مهني متخصصة — 599 ج.م",
      ],
      links: [
        { label: "منتجات للمبتدئين →", href: "/store" },
        { label: "مقالات البداية →", href: "/blog" },
      ],
    };
  }

  /* money / income */
  if (/money|income|earn|profit|passive|ربح|دخل|كسب|مال|ربحي|أونلاين/.test(q)) {
    return {
      text: "💰 طرق تحقيق دخل أونلاين من محتوانا:",
      bullets: [
        "📘 مقال: 10 طرق دخل سلبي للمطورين — في المدونة",
        "🧰 حقيبة أدوات المستقل المحترف — 119 ج.م",
        "📖 بناء منتجات رقمية وبيعها — دليل عملي",
        "💡 جلسة استراتيجية للمشاريع الناشئة — 1,299 ج.م",
      ],
      links: [
        { label: "قراءة المدونة →", href: "/blog" },
        { label: "استعراض المنتجات →", href: "/store" },
      ],
    };
  }

  /* portfolio / templates */
  if (/portfolio|template|قالب|بورتفوليو|templat/.test(q)) {
    return {
      text: "🎨 قوالب وخدمات البورتفوليو:",
      bullets: [
        "🗂️ قالب بورتفوليو احترافي — 199 ج.م",
        "🎨 قالب بورتفوليو Cyberpunk — 299 ج.م",
        "🚀 حزمة قوالب صفحات الهبوط (5 قوالب) — 249 ج.م",
        "💼 تطوير موقع بورتفوليو مخصص (خدمة) — 3,999 ج.م",
      ],
      links: [{ label: "تصفح القوالب →", href: "/store" }],
    };
  }

  /* gaming / FPS */
  if (/game|gaming|fps|gam|ألعاب|العاب|فريم|أداء الألعاب/.test(q)) {
    return {
      text: "🎮 أدلة تحسين الألعاب:",
      bullets: [
        "🖥️ دليل تحسين أداء الألعاب الشامل (50+ صفحة) — 119 ج.م",
        "⚡ دليل رفع معدل الإطارات FPS (بدون تغيير أجهزة) — 99 ج.م",
        "يغطي: Nvidia/AMD settings, Process Lasso, Registry tweaks",
      ],
      links: [{ label: "أدلة الألعاب →", href: "/store" }],
    };
  }

  /* career / job */
  if (/career|job|وظيفة|مسار|شغل|توظيف|تخصص/.test(q)) {
    return {
      text: "🚀 نساعدك في بناء مسيرتك المهنية التقنية:",
      bullets: [
        "🗺️ خارطة طريق Full Stack Developer — 129 ج.م",
        "💡 استشارة مسار مهني تقني (جلسة مخصصة) — 599 ج.م",
        "🚀 جلسة استراتيجية للمشاريع الناشئة — 1,299 ج.م",
        "📝 مقالات: كيف تبني مسارك التقني الصحيح",
      ],
      links: [
        { label: "الخدمات →", href: "/store" },
        { label: "المدونة →", href: "/blog" },
      ],
    };
  }

  /* contact */
  if (/contact|reach|email|تواصل|ايميل|كيف اتواصل|ارسل/.test(q)) {
    return {
      text: "📬 يمكنك التواصل معنا بسهولة:",
      bullets: [
        "📧 بريد إلكتروني: abed@abud.fun",
        "📄 نموذج التواصل المباشر في صفحة Contact",
        "⚡ رد خلال 24 ساعة في أيام العمل",
        "💬 أو أخبرني ماتحتاجه وسأساعدك مباشرة!",
      ],
      links: [{ label: "صفحة التواصل →", href: "/contact" }],
    };
  }

  /* refund / guarantee */
  if (/refund|guarantee|return|ضمان|استرداد|مضمون/.test(q)) {
    return {
      text: "✅ سياسة الضمان لدينا:",
      bullets: [
        "🏆 ضمان جودة كامل على جميع المنتجات والخدمات",
        "🔄 استرداد كامل إذا لم تكن راضيًا (خلال 7 أيام)",
        "🛠️ دعم مجاني 30 يومًا بعد الشراء",
      ],
      links: [{ label: "تواصل معنا →", href: "/contact" }],
    };
  }

  /* server / VPS / hosting */
  if (/server|vps|hosting|deploy|nginx|استضافة|نشر|سيرفر/.test(q)) {
    return {
      text: "🖥️ خدمات الخادم والبنية التحتية:",
      bullets: [
        "🔒 إعداد أمان الخادم (Linux/VPS) بمعايير عالمية — 2,499 ج.م",
        "⚡ تحسين سرعة وأداء الموقع (PageSpeed 90+) — 1,199 ج.م",
        "🌐 نشر المواقع مع Nginx + SSL + PM2",
      ],
      links: [{ label: "خدمات الخادم →", href: "/store" }],
    };
  }

  /* projects showcase */
  if (/project|portfolio showcase|مشروع|أعمال|مشاريع|سابق/.test(q)) {
    return {
      text: "🗂️ يمكنك الاطلاع على أعمالي ومشاريعي في صفحة البورتفوليو:",
      links: [
        { label: "عرض المشاريع →", href: "/projects" },
        { label: "تواصل للتعاون →", href: "/contact" },
      ],
    };
  }

  /* productivity / workflow */
  if (/productiv|workflow|time management|efficient|إنتاجية|وقت|منظومة|تنظيم/.test(q)) {
    return {
      text: "⚙️ أدواتنا لتحسين الإنتاجية:",
      bullets: [
        "📘 دليل إنتاجية المطور المحترف — 99 ج.م",
        "⚙️ منظومة سير عمل المطور الفعّال — 109 ج.م",
        "🤖 دليل أدوات AI للمطورين — 149 ج.م",
      ],
      links: [{ label: "تصفح أدوات الإنتاجية →", href: "/store" }],
    };
  }

  /* git / github */
  if (/\bgit\b|github|version control|ci.?cd/.test(q)) {
    return {
      text: "📘 دليل احتراف Git وGitHub — 99 ج.م:",
      bullets: [
        "يغطي: Branching Strategies, Rebase, Cherry-pick",
        "GitHub Actions و CI/CD",
        "سيناريوهات العمل الجماعي الحقيقية",
      ],
      links: [{ label: "احصل على الدليل →", href: "/store" }],
    };
  }

  /* bug fixing */
  if (/bug|fix|error|debug|خطأ|إصلاح|مشكلة في الكود/.test(q)) {
    return {
      text: "🐛 خدمة إصلاح الأخطاء البرمجية — 799 ج.م:",
      bullets: [
        "تشخيص وإصلاح أي خطأ في أي تقنية",
        "تسليم سريع خلال 24-48 ساعة",
        "شرح سبب المشكلة لتتفاداها مستقبلاً",
      ],
      links: [
        { label: "طلب الخدمة →", href: "/store" },
        { label: "📘 دليل اصطياد الأخطاء — 99 ج.م →", href: "/store" },
      ],
    };
  }

  /* resources library */
  if (/resource|library|tool|free|مصادر|مكتبة|أدوات مجانية|روابط/.test(q)) {
    return {
      text: "📁 لدينا مكتبة موارد مجانية تضم أكثر من 40 أداة ومنصة في:",
      bullets: [
        "🤖 أدوات الذكاء الاصطناعي — ChatGPT, Claude, Cursor, v0",
        "👨‍💻 أدوات المطورين — VS Code, GitHub, Docker, Vercel",
        "💼 منصات الفريلانس — Upwork, Fiverr, Toptal, Contra",
        "⚡ أدوات الإنتاجية — Notion, Raycast, Obsidian",
        "🔒 موارد الأمن السيبراني — TryHackMe, HackTheBox, OWASP",
        "🌐 أدوات بناء المواقع — Next.js, Tailwind, Shadcn/ui",
      ],
      links: [{ label: "استعراض مكتبة المصادر →", href: "/resources" }],
    };
  }

  /* faq */
  if (/faq|common question|frequent|أسئلة شائعة|سؤال/.test(q)) {
    return {
      text: "❓ الأسئلة الشائعة:",
      bullets: [
        "🛒 كيف أشتري؟ — اختر المنتج ← اشتر الآن ← ادفع ← ارفع الإيصال",
        "📥 متى أستلم؟ — المنتجات الرقمية: خلال دقائق / الخدمات: 24 ساعة",
        "💳 طرق الدفع؟ — فودافون كاش، إنستاباي، باي بال",
        "🔄 هل يوجد ضمان؟ — نعم، ضمان كامل 7 أيام",
        "🏷️ هل يوجد خصومات؟ — نعم! استخدم WELCOME20 للخصم 20%",
      ],
      links: [{ label: "المتجر →", href: "/store" }],
    };
  }

  /* default */
  return {
    text: "يمكنني مساعدتك في اكتشاف المنتجات والخدمات أو الإجابة على أسئلتك. ما الذي تريد معرفته؟ 😊",
    links: [
      { label: "استعراض المتجر →", href: "/store" },
      { label: "مكتبة المصادر →", href: "/resources" },
      { label: "قراءة المدونة →", href: "/blog" },
    ],
  };
}

/* ── Action triggers ─────────────────────────────────────── */
const ACTION_TRIGGERS: Record<string, string> = {
  products:  "أخبرني عن المنتجات الرقمية",
  services:  "ما الخدمات المتاحة؟",
  blog:      "أرني مقالات المدونة",
  resources: "ما هي المصادر المجانية المتاحة؟",
  contact:   "كيف يمكنني التواصل معكم؟",
};

/* ── Greeting message ────────────────────────────────────── */
const GREETING: Message = {
  id: 0,
  from: "bot",
  text: "مرحبًا! 👋 أنا مساعدك الذكي — دليلك لكل ما في الموقع.\nمنتجات رقمية • خدمات تطوير • مكتبة مصادر مجانية • مقالات تقنية.\nاسألني عن أي شيء 😊",
};

/* ── Message bubble ──────────────────────────────────────── */
function MessageBubble({ msg, onLinkClick }: { msg: Message; onLinkClick: () => void }) {
  const isBot = msg.from === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"} gap-2`}
    >
      {isBot && (
        <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
          style={{ background: "rgba(147,51,234,0.18)", border: "1px solid rgba(147,51,234,0.25)" }}>
          <Sparkles className="w-3 h-3 text-purple-400" />
        </div>
      )}

      <div className={`flex flex-col gap-1.5 ${isBot ? "items-start" : "items-end"} max-w-[82%]`}>
        {/* Main bubble */}
        <div
          className="text-sm leading-relaxed rounded-2xl px-3.5 py-2.5"
          style={isBot ? {
            background: "rgba(18,10,32,0.95)",
            border: "1px solid rgba(40,28,65,0.9)",
            color: "#d4c4f0",
            borderBottomLeftRadius: "4px",
          } : {
            background: "linear-gradient(135deg, #9333ea, #6d28d9)",
            color: "white",
            borderBottomRightRadius: "4px",
          }}
        >
          {/* Text with line breaks */}
          {msg.text.split("\n").map((line, i) => (
            <span key={i}>{line}{i < msg.text.split("\n").length - 1 && <br />}</span>
          ))}

          {/* Bullet list inside bubble */}
          {msg.bullets && msg.bullets.length > 0 && (
            <ul className="mt-2 space-y-1">
              {msg.bullets.map((b, i) => (
                <li key={i} className="text-xs leading-relaxed" style={{ color: isBot ? "#c0aee8" : "rgba(255,255,255,0.9)" }}>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Link buttons below bubble */}
        {msg.links && msg.links.length > 0 && (
          <div className="flex flex-col gap-1">
            {msg.links.map(link => (
              <Link key={link.href + link.label} href={link.href} onClick={onLinkClick}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
                style={{ background: "rgba(147,51,234,0.1)", border: "1px solid rgba(147,51,234,0.25)", color: "#c084fc" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(147,51,234,0.2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(147,51,234,0.1)")}>
                <ArrowRight className="w-3 h-3 flex-shrink-0" />
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ══════════════ Main Component ══════════════ */
export default function AIAssistant() {
  const [isOpen, setIsOpen]           = useState(false);
  const [messages, setMessages]       = useState<Message[]>([GREETING]);
  const [input, setInput]             = useState("");
  const [typing, setTyping]           = useState(false);
  const [hasNew, setHasNew]           = useState(false);
  const bottomRef                     = useRef<HTMLDivElement>(null);
  const inputRef                      = useRef<HTMLInputElement>(null);
  const nextId                        = useRef(1);

  /* auto-scroll */
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  /* focus on open, clear badge */
  useEffect(() => {
    if (isOpen) { setHasNew(false); setTimeout(() => inputRef.current?.focus(), 220); }
  }, [isOpen]);

  function sendMessage(text: string) {
    const clean = text.trim();
    if (!clean) return;
    const userMsg: Message = { id: nextId.current++, from: "user", text: clean };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const resp = getBotResponse(clean);
      const botMsg: Message = { id: nextId.current++, from: "bot", ...resp };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
      if (!isOpen) setHasNew(true);
    }, 700 + Math.random() * 500);
  }

  const showQuickActions = messages.length <= 1;

  return (
    <>
      {/* ── Floating button ── */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulse ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "rgba(147,51,234,0.35)" }}
            animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <motion.button
          onClick={() => setIsOpen(o => !o)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #9333ea, #6d28d9)",
            boxShadow: "0 8px 32px rgba(147,51,234,0.5), 0 0 0 1px rgba(147,51,234,0.3)",
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          aria-label="Open AI Assistant"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          {hasNew && !isOpen && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 border-2 border-[#060609] flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">!</span>
            </span>
          )}
        </motion.button>
      </div>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: "min(380px, calc(100vw - 2rem))",
              height: "min(580px, calc(100vh - 8rem))",
              background: "linear-gradient(160deg, rgba(12,6,22,0.99) 0%, rgba(6,6,14,0.99) 100%)",
              border: "1px solid rgba(100,60,180,0.25)",
              borderTop: "1px solid rgba(192,132,252,0.18)",
              boxShadow: "0 28px 80px rgba(0,0,0,0.65), 0 0 80px rgba(147,51,234,0.1)",
              backdropFilter: "blur(28px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid rgba(28,18,50,0.9)", background: "rgba(0,0,0,0.25)" }}>
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(147,51,234,0.3), rgba(109,40,217,0.2))", border: "1px solid rgba(147,51,234,0.3)" }}>
                  <Bot className="w-4.5 h-4.5 text-purple-400" style={{ width: "18px", height: "18px" }} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2"
                    style={{ borderColor: "rgba(6,6,14,1)" }} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm tracking-tight">المساعد الذكي</div>
                  <div className="text-[10px]" style={{ color: "#34d399" }}>متاح الآن · يرد فورًا</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setMessages([GREETING])}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors"
                  style={{ color: "#404060" }}
                  title="مسح المحادثة"
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLButtonElement).style.color = "#808090"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#404060"; }}>
                  ↺
                </button>
                <button onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                  style={{ color: "#404060" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLButtonElement).style.color = "#808090"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#404060"; }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
              {messages.map(msg => (
                <MessageBubble key={msg.id} msg={msg} onLinkClick={() => setIsOpen(false)} />
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: "rgba(147,51,234,0.15)", border: "1px solid rgba(147,51,234,0.2)" }}>
                    <Sparkles className="w-3 h-3 text-purple-400" />
                  </div>
                  <div className="flex items-center gap-1 px-3.5 py-2.5 rounded-2xl"
                    style={{ background: "rgba(18,10,32,0.95)", border: "1px solid rgba(40,28,65,0.9)" }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#9333ea" }}
                        animate={{ y: [-3, 3, -3], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18 }} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quick actions — shown only at start */}
              {showQuickActions && !typing && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-3">
                  <p className="text-[10px] mb-2 px-0.5 font-medium" style={{ color: "#454565" }}>اختر موضوعًا للبدء:</p>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_ACTIONS.map(a => (
                      <button key={a.key} onClick={() => sendMessage(ACTION_TRIGGERS[a.key])}
                        className="flex items-center gap-2.5 text-xs font-medium py-2.5 px-3.5 rounded-xl text-right transition-all duration-200"
                        style={{ background: "rgba(15,8,28,0.9)", border: "1px solid rgba(35,22,60,0.9)", color: "#9080b0" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(147,51,234,0.4)"; (e.currentTarget as HTMLButtonElement).style.color = "#c084fc"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(20,10,36,0.95)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(35,22,60,0.9)"; (e.currentTarget as HTMLButtonElement).style.color = "#9080b0"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(15,8,28,0.9)"; }}>
                        {a.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="px-3 py-3" style={{ borderTop: "1px solid rgba(28,18,50,0.9)" }}>
              <div className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                style={{ background: "rgba(10,5,18,0.95)", border: "1px solid rgba(40,25,65,0.9)" }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(147,51,234,0.4)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(40,25,65,0.9)")}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                  placeholder="اكتب سؤالك هنا..."
                  className="flex-1 bg-transparent text-white text-sm placeholder-[#383858] outline-none"
                  dir="auto"
                />
                <motion.button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || typing}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-25 flex-shrink-0"
                  style={{ background: input.trim() && !typing ? "linear-gradient(135deg, #9333ea, #6d28d9)" : "rgba(40,25,65,0.5)" }}
                  whileTap={input.trim() && !typing ? { scale: 0.9 } : {}}>
                  <Send className="w-3.5 h-3.5 text-white" />
                </motion.button>
              </div>
              <p className="text-center text-[10px] mt-2" style={{ color: "#252540" }}>
                مساعد ذكي · ردود فورية بالعربية والإنجليزية
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
