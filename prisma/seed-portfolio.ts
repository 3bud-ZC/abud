/**
 * Seeds the main GitHub portfolio apps into PortfolioProject table.
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
    title: "3BUD ERP System",
    slug: "3bud-erp-system",
    description:
      "نظام ERP عملي لإدارة المبيعات والطلبات والعملاء والمخزون، مع لوحة تحكم وتقارير تشغيلية واضحة.",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80",
    tags: JSON.stringify(["ERP", "Business", "Next.js", "Dashboard", "PostgreSQL"]),
    links: JSON.stringify([
      { label: "الموقع المباشر", type: "live", url: "https://erp.abud.fun/" },
      { label: "GitHub", type: "github", url: "https://github.com/3bud-ZC/ERP" },
    ]),
    featured: true,
    order: 1,
    longDesc: JSON.stringify({
      tagline: "ERP عربي لإدارة المتجر والعمليات",
      accent: "#34d399",
      iconType: "shopping-bag",
      badge: "Live",
      category: "Business",
      overview:
        "منصة ERP متكاملة تساعد أصحاب المتاجر على تشغيل المبيعات والمخزون والطلبات من لوحة تحكم واحدة.",
      problem:
        "كثير من المتاجر الصغيرة تدير العمليات يدويًا أو عبر أدوات منفصلة، مما يسبب أخطاء وتشتت في المتابعة اليومية.",
      features: [
        "إدارة الطلبات والمبيعات من شاشة واحدة",
        "متابعة المخزون والتنبيهات عند النقص",
        "سجل عملاء وفواتير قابل للتتبع",
        "تقارير أداء يومية وأسبوعية",
        "واجهة عربية متجاوبة وسريعة",
      ],
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
      results: [
        "تشغيل مباشر على الدومين للإستخدام الفعلي",
        "تقليل الوقت الضائع في متابعة العمليات اليومية",
      ],
    }),
  },
  {
    title: "VPS Monitor Bot",
    slug: "vps-monitor-bot",
    description:
      "بوت تيليجرام لمراقبة موارد الـ VPS (CPU / RAM / Disk) وإرسال تنبيهات فورية عند ارتفاع الاستهلاك.",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format&fit=crop&q=80",
    tags: JSON.stringify(["Telegram Bot", "Python", "Monitoring", "DevOps", "VPS"]),
    links: JSON.stringify([
      { label: "GitHub", type: "github", url: "https://github.com/3bud-ZC/vps_bot" },
    ]),
    featured: false,
    order: 2,
    longDesc: JSON.stringify({
      tagline: "مراقبة سيرفر من تيليجرام مباشرة",
      accent: "#fbbf24",
      iconType: "server",
      badge: "GitHub",
      category: "Tool",
      overview:
        "أداة DevOps خفيفة لمراقبة صحة السيرفرات عن بُعد من خلال بوت تيليجرام بسيط وسريع.",
      problem:
        "المتابعة اليدوية لحالة السيرفر تحتاج دخول مستمر للـ VPS، وهذا غير عملي وقت الأعطال أو عند التنقل.",
      features: [
        "قراءة الموارد الحالية في ثواني",
        "تنبيهات تلقائية عند تجاوز الحدود",
        "أوامر تيليجرام سهلة وسريعة",
        "تقارير دورية لحالة الخادم",
        "تصميم مناسب للتشغيل 24/7",
      ],
      tech: ["Python", "python-telegram-bot", "psutil", "Linux", "VPS"],
      results: [
        "تحسين سرعة اكتشاف مشاكل الاستهلاك",
        "مشروع مفتوح المصدر قابل للتطوير",
      ],
    }),
  },
  {
    title: "ABUD Platform",
    slug: "abud-platform",
    description:
      "المنصة الشخصية التي تجمع الواجهة التسويقية، البورتفوليو، المتجر، ولوحة الإدارة في مشروع متكامل واحد.",
    thumbnail:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&auto=format&fit=crop&q=80",
    tags: JSON.stringify(["Next.js", "TypeScript", "Prisma", "Admin Panel", "Full-Stack"]),
    links: JSON.stringify([
      { label: "الموقع الرسمي", type: "live", url: "https://abud.fun/" },
      { label: "GitHub", type: "github", url: "https://github.com/3bud-ZC/abud" },
    ]),
    featured: true,
    order: 3,
    longDesc: JSON.stringify({
      tagline: "منصة شخصية كاملة مع لوحة تحكم",
      accent: "#60a5fa",
      iconType: "globe",
      badge: "Live",
      category: "Business",
      overview:
        "مشروع Full-Stack واحد يجمع إدارة المحتوى، عرض الأعمال، وصفحات الخدمات، وإدارة البيانات من خلال لوحة Admin.",
      problem:
        "الفصل بين الموقع ولوحة الإدارة يزيد التعقيد. المطلوب كان منصة موحدة وسهلة الإدارة والتوسعة.",
      features: [
        "واجهة موقع احترافية متعددة الصفحات",
        "لوحة إدارة متكاملة للمحتوى والمشاريع",
        "API Routes لإدارة البيانات بشكل آمن",
        "إمكانية نشر مرنة على VPS/Cloud",
        "معمارية قابلة للتطوير لمنتجات جديدة",
      ],
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
      results: [
        "منصة فعّالة لإدارة الهوية الرقمية والمحتوى",
        "ربط فعلي بين العرض التسويقي والإدارة اليومية",
      ],
    }),
  },
  {
    title: "Mohamy Platform",
    slug: "mohamy-platform",
    description:
      "منصة قانونية رقمية لتقديم واستعراض الخدمات القانونية بشكل منظم مع تجربة استخدام واضحة للعميل.",
    thumbnail:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600&auto=format&fit=crop&q=80",
    tags: JSON.stringify(["Legal Tech", "Web App", "Next.js", "Arabic UI", "TypeScript"]),
    links: JSON.stringify([
      { label: "GitHub", type: "github", url: "https://github.com/3bud-ZC/Mohamy" },
    ]),
    featured: false,
    order: 4,
    longDesc: JSON.stringify({
      tagline: "حل قانوني رقمي بواجهة عربية",
      accent: "#f97316",
      iconType: "shield",
      badge: "GitHub",
      category: "Business",
      overview:
        "منصة تستهدف تنظيم رحلة العميل في الخدمات القانونية بداية من عرض الخدمة وحتى طلب الاستشارة.",
      problem:
        "القطاع القانوني غالبًا يفتقد واجهات رقمية واضحة وسهلة، مما يجعل وصول العميل للخدمة أبطأ وأصعب.",
      features: [
        "تنظيم الخدمات القانونية في تجربة واحدة",
        "تصميم RTL واضح ومناسب للمستخدم العربي",
        "هيكلة مرنة لإضافة خدمات جديدة",
        "صفحات معلومات وتواصل احترافية",
        "تهيئة جيدة لمحركات البحث SEO",
      ],
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
      results: [
        "عرض رقمي احترافي للخدمات القانونية",
        "قاعدة تقنية جاهزة للتوسع مستقبلاً",
      ],
    }),
  },
  {
    title: "3BUD Store Telegram Mini App",
    slug: "3bud-store-telegram-mini-app",
    description:
      "تطبيق متجر مصغّر داخل تيليجرام لتصفّح المنتجات وإتمام الطلبات بسرعة من داخل المحادثة.",
    thumbnail:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1600&auto=format&fit=crop&q=80",
    tags: JSON.stringify(["Telegram Mini App", "E-commerce", "TypeScript", "Bot", "Mobile UX"]),
    links: JSON.stringify([
      {
        label: "GitHub",
        type: "github",
        url: "https://github.com/3bud-ZC/3BUD-Store-Telegram-Mini-App",
      },
    ]),
    featured: true,
    order: 5,
    longDesc: JSON.stringify({
      tagline: "تجربة متجر داخل تيليجرام مباشرة",
      accent: "#22d3ee",
      iconType: "smartphone",
      badge: "Telegram",
      category: "Automation",
      overview:
        "تطبيق Mini App مدمج داخل تيليجرام يسهّل رحلة الشراء عبر واجهة خفيفة وسريعة بدون الخروج من التطبيق.",
      problem:
        "التحويل إلى متجر خارجي يسبب تسربًا في رحلة المستخدم. الحل كان متجرًا مدمجًا داخل بيئة تيليجرام نفسها.",
      features: [
        "واجهة Mini App متوافقة مع تيليجرام",
        "عرض المنتجات بطريقة سلسة وسريعة",
        "تحسين تجربة الشراء على الموبايل",
        "هيكلية جاهزة لربط المدفوعات والطلبات",
        "قابلية توسعة لإضافة ميزات التجارة",
      ],
      tech: ["TypeScript", "Telegram Mini Apps", "Next.js", "Tailwind CSS"],
      results: [
        "نموذج عملي لتجربة تجارة داخل تيليجرام",
        "تجربة استخدام أسرع للمستخدم النهائي",
      ],
    }),
  },
  {
    title: "Personal Task Manager Telegram Bot",
    slug: "personal-task-manager-telegram-bot",
    description:
      "بوت لإدارة المهام اليومية بالأوامر أو اللغة الطبيعية مع تذكيرات، أولويات، وتقارير إنتاجية.",
    thumbnail:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&auto=format&fit=crop&q=80",
    tags: JSON.stringify(["Telegram Bot", "Productivity", "Python", "Automation", "Docker"]),
    links: JSON.stringify([
      {
        label: "GitHub",
        type: "github",
        url: "https://github.com/3bud-ZC/Personal-Task-Manager-Telegram-Bot",
      },
    ]),
    featured: false,
    order: 6,
    longDesc: JSON.stringify({
      tagline: "مساعد مهام شخصي داخل تيليجرام",
      accent: "#38bdf8",
      iconType: "bot",
      badge: "GitHub",
      category: "Automation",
      overview:
        "بوت إنتاجية يومي يساعد في إدارة المهام والمشاريع والتذكيرات بدون الحاجة لتطبيقات إضافية.",
      problem:
        "التنقل بين أدوات إدارة المهام المختلفة يسبب فقدان تركيز — وجود المساعد داخل تيليجرام يختصر كل شيء.",
      features: [
        "إضافة مهام بالأوامر أو باللغة الطبيعية",
        "تنظيم المهام حسب المشروع والأولوية",
        "تذكيرات مجدولة وتنبيهات تلقائية",
        "ملخص يومي للإنجازات",
        "تشغيل مستقر 24/7 على VPS",
      ],
      tech: ["Python", "python-telegram-bot", "SQLite", "Docker", "VPS"],
      results: [
        "تحسين الالتزام اليومي بالمهام",
        "مشروع مفتوح المصدر قابل للتخصيص",
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
        thumbnail: app.thumbnail,
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
        thumbnail: app.thumbnail,
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
