/**
 * Seeds the 5 real portfolio apps into PortfolioProject table.
 * Run:  npx tsx prisma/seed-portfolio.ts
 * Safe to re-run — upsert by slug (existing rows updated, not duplicated).
 *
 * longDesc JSON includes display fields used by the list page:
 *   tagline, accent, iconType, badge
 * and detail page fields:
 *   category, overview, problem, features, tech, results
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const apps = [
  {
    title: "Iqtidaa (اقتداء)",
    slug: "iqtidaa",
    description:
      "تطبيق ويب جاهز للتجربة. ركّزت فيه على تجربة استخدام سريعة + لوحة إدارة + قاعدة بيانات محلية على الـ VPS.",
    tags: JSON.stringify(["Web App", "Next.js", "Islamic", "VPS"]),
    links: JSON.stringify(["https://iqtidaa.abud.fun/"]),
    featured: true,
    order: 1,
    longDesc: JSON.stringify({
      tagline: "منصة إسلامية — ممارسات وأذكار ومحتوى",
      accent: "#67e8f9",
      iconType: "sparkles",
      badge: "Live",
      category: "Tool",
      overview:
        "تطبيق ويب إسلامي يوفر ممارسات يومية وأذكار ومحتوى تعليمي، مع لوحة إدارة كاملة وقاعدة بيانات محلية على الـ VPS.",
      problem:
        "الحاجة إلى منصة إسلامية خفيفة وسريعة يمكن نشرها على VPS بتكلفة منخفضة وأداء عالٍ.",
      features: [
        "واجهة مستخدم سريعة وجذابة",
        "لوحة إدارة لإدارة المحتوى بالكامل",
        "قاعدة بيانات محلية على الـ VPS",
        "أذكار وممارسات يومية",
        "تصميم متجاوب لجميع الأجهزة",
      ],
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "PM2"],
      results: [
        "نشر ناجح على VPS بأداء عالٍ",
        "تجربة مستخدم سلسة وسريعة",
      ],
    }),
  },
  {
    title: "PromptForge AI",
    slug: "promptforge-ai",
    description:
      "واجهة بسيطة لتجهيز البرومبتس وإدارة الأدوات. مناسب كقاعدة لأتمتة شغل الـ AI.",
    tags: JSON.stringify(["AI", "Prompt Engineering", "Next.js", "Tools"]),
    links: JSON.stringify(["https://promptforge.abud.fun/"]),
    featured: true,
    order: 2,
    longDesc: JSON.stringify({
      tagline: "Prompt builder + أدوات ذكاء اصطناعي",
      accent: "#c084fc",
      iconType: "layers",
      badge: "Live",
      category: "AI",
      overview:
        "منصة لبناء وإدارة البرومبتس لنماذج الذكاء الاصطناعي المختلفة، مع مكتبة جاهزة وأدوات للأتمتة.",
      problem:
        "كتابة برومبتس فعّالة وإدارتها يستغرق وقتاً كبيراً — يحتاج المطورون إلى أداة مركزية لإنشائها وتنظيمها.",
      features: [
        "محرر برومبتس متقدم مع معاينة مباشرة",
        "مكتبة قوالب جاهزة للمهام المختلفة",
        "دعم متعدد النماذج (GPT, Claude, Gemini)",
        "تصدير واستيراد البرومبتس",
        "أدوات مساعدة لتحسين وتقييم البرومبتس",
      ],
      tech: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS", "Framer Motion"],
      results: [
        "توفير وقت بناء البرومبتس بنسبة 70%",
        "نشر ناجح ومتاح للجميع على الإنترنت",
      ],
    }),
  },
  {
    title: "Personal Task Manager Bot",
    slug: "personal-task-manager-bot",
    description:
      "إضافة مهام بالأزرار أو باللغة الطبيعية، تنظيم حسب المشاريع، أولويات، تذكيرات، ملخص يومي، وإحصائيات — شغال 24/7 على VPS بـ Docker.",
    tags: JSON.stringify(["Telegram Bot", "Python", "Docker", "Automation", "VPS"]),
    links: JSON.stringify([
      "https://github.com/3bud-ZC/Personal-Task-Manager-Telegram-Bot",
    ]),
    featured: false,
    order: 3,
    longDesc: JSON.stringify({
      tagline: "بوت تيليجرام ذكي لإدارة المهام",
      accent: "#38bdf8",
      iconType: "github",
      badge: "GitHub",
      category: "Automation",
      overview:
        "بوت تيليجرام متكامل لإدارة المهام الشخصية — يعمل 24/7 على VPS بـ Docker مع دعم اللغة الطبيعية.",
      problem:
        "إدارة المهام عبر تطبيقات متعددة يشتت التركيز — بوت واحد في تيليجرام يكفي ويكون دائماً في متناول اليد.",
      features: [
        "إضافة مهام باللغة الطبيعية أو بالأزرار",
        "تنظيم حسب المشاريع والأولويات",
        "تذكيرات وإشعارات مجدولة",
        "ملخص يومي تلقائي",
        "إحصائيات وتقارير الإنتاجية",
        "تشغيل 24/7 على VPS بـ Docker",
      ],
      tech: ["Python", "python-telegram-bot", "SQLite", "Docker", "VPS"],
      results: [
        "مشروع مفتوح المصدر على GitHub",
        "يعمل بشكل موثوق على VPS بـ Docker",
      ],
    }),
  },
  {
    title: "OG E‑Store",
    slug: "og-estore",
    description:
      "نظام ERP عملي لإدارة المبيعات والطلبات والعملاء والمخزون، مع لوحة تحكم وتقارير — جاهز للتجربة مباشرة.",
    tags: JSON.stringify(["ERP", "Next.js", "Business", "E-commerce", "TypeScript"]),
    links: JSON.stringify(["https://erp.abud.fun/"]),
    featured: true,
    order: 4,
    longDesc: JSON.stringify({
      tagline: "ERP / نظام محاسبة وإدارة متجر",
      accent: "#34d399",
      iconType: "layers",
      badge: "Live",
      category: "Business",
      overview:
        "نظام ERP متكامل لإدارة المتاجر — يغطي المبيعات والطلبات والعملاء والمخزون مع لوحة تحكم شاملة.",
      problem:
        "أنظمة ERP التقليدية معقدة وغالية — يحتاج أصحاب المتاجر الصغيرة لحل بسيط وفعّال بدون تعقيد.",
      features: [
        "إدارة كاملة للمبيعات والطلبات",
        "متابعة العملاء وسجل التواصل",
        "إدارة المخزون والتنبيهات",
        "لوحة تحكم مع رسوم بيانية وتقارير",
        "واجهة عربية سهلة الاستخدام",
      ],
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
      results: [
        "نشر ناجح ومتاح للتجربة المباشرة",
        "يخدم متاجر متعددة بكفاءة",
      ],
    }),
  },
  {
    title: "VPS Monitor Bot",
    slug: "vps-monitor-bot",
    description:
      "بوت تيليجرام لمراقبة موارد الـ VPS والتنبيهات عند ارتفاع الاستهلاك — مع لوحة أوامر بسيطة وتشغيل 24/7.",
    tags: JSON.stringify(["Telegram Bot", "Python", "DevOps", "Monitoring", "VPS"]),
    links: JSON.stringify(["https://github.com/3bud-ZC/vps_bot"]),
    featured: false,
    order: 5,
    longDesc: JSON.stringify({
      tagline: "بوت مراقبة السيرفر (Telegram)",
      accent: "#fbbf24",
      iconType: "github",
      badge: "GitHub",
      category: "Tool",
      overview:
        "بوت تيليجرام لمراقبة موارد الـ VPS (CPU، RAM، Disk) مع تنبيهات فورية عند ارتفاع الاستهلاك.",
      problem:
        "مراقبة السيرفر تتطلب تسجيل الدخول وتشغيل أوامر — بوت تيليجرام يجعلها سهلة من أي مكان.",
      features: [
        "مراقبة CPU وRAM وDisk في الوقت الفعلي",
        "تنبيهات فورية عند تجاوز حدود الاستهلاك",
        "لوحة أوامر تيليجرام بسيطة",
        "تقارير دورية عن حالة السيرفر",
        "تشغيل 24/7 مع إعادة تشغيل تلقائية",
      ],
      tech: ["Python", "python-telegram-bot", "psutil", "Linux", "VPS"],
      results: [
        "مشروع مفتوح المصدر على GitHub",
        "موثوق ويعمل 24/7 على VPS",
      ],
    }),
  },
];

async function main() {
  console.log("🌱 زرع مشاريع البورتفوليو (التطبيقات الحقيقية)...\n");

  for (const app of apps) {
    await prisma.portfolioProject.upsert({
      where: { slug: app.slug },
      update: {
        title: app.title,
        description: app.description,
        tags: app.tags,
        links: app.links,
        featured: app.featured,
        order: app.order,
        longDesc: app.longDesc,
        status: "published",
      },
      create: {
        title: app.title,
        slug: app.slug,
        description: app.description,
        tags: app.tags,
        links: app.links,
        featured: app.featured,
        order: app.order,
        longDesc: app.longDesc,
        status: "published",
      },
    });
    console.log(`  ✅ ${app.title}`);
  }

  console.log(`\n✅ تم زرع ${apps.length} مشاريع في DB.`);
}

main()
  .catch((e) => { console.error("❌ خطأ:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
