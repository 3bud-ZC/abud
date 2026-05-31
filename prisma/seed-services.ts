import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

const SERVICES = [
  {
    title: "تطوير مواقع احترافية",
    description: "مواقع متكاملة بأداء عال وتجربة مستخدم قوية من الفكرة حتى الإطلاق.",
    longDesc: "Next.js و React\nتصميم متجاوب\nSEO متقدم\nتحسين سرعة الموقع",
    useCase: "development",
    icon: "🌐",
    priceType: "fixed",
    price: 1500,
    featured: true,
    order: 1,
  },
  {
    title: "منصات SaaS متكاملة",
    description: "بناء منصة كاملة بنظام اشتراكات وصلاحيات ولوحات تحكم.",
    longDesc: "نظام تسجيل ودخول\nصلاحيات متعددة\nبوابات دفع\nلوحة إدارة",
    useCase: "development",
    icon: "🧩",
    priceType: "request",
    featured: true,
    order: 2,
  },
  {
    title: "متاجر إلكترونية",
    description: "متجر إلكتروني كامل مع إدارة منتجات وطلبات ودفع.",
    longDesc: "سلة مشتريات\nCheckout\nإدارة الطلبات\nربط شحن",
    useCase: "ecommerce",
    icon: "🛍️",
    priceType: "fixed",
    price: 3000,
    featured: true,
    order: 3,
  },
  {
    title: "تطبيقات موبايل",
    description: "تطبيقات iOS وAndroid باستخدام React Native.",
    longDesc: "React Native\nPush Notifications\nلوحة إدارة\nربط API",
    useCase: "mobile",
    icon: "📱",
    priceType: "request",
    featured: false,
    order: 4,
  },
  {
    title: "أدوات ذكاء اصطناعي",
    description: "حلول AI مخصصة لمجالك لرفع الإنتاجية وتوفير الوقت.",
    longDesc: "تكامل OpenAI\nواجهات دردشة\nتحليل بيانات\nأتمتة ذكية",
    useCase: "ai",
    icon: "🤖",
    priceType: "request",
    featured: true,
    order: 5,
  },
  {
    title: "بوتات تيليجرام",
    description: "بوتات احترافية للمبيعات أو الدعم أو إدارة المجتمعات.",
    longDesc: "Telegram Bot API\nأزرار تفاعلية\nلوحة إدارة\nإحصائيات",
    useCase: "bots",
    icon: "📨",
    priceType: "fixed",
    price: 200,
    featured: true,
    order: 6,
  },
  {
    title: "أتمتة سير العمل",
    description: "أتمتة المهام المتكررة وتوصيل الأنظمة مع بعض.",
    longDesc: "n8n و Zapier\nWebhooks\nتكامل API\nتقارير تلقائية",
    useCase: "automation",
    icon: "⚙️",
    priceType: "fixed",
    price: 600,
    featured: true,
    order: 7,
  },
  {
    title: "DevOps و Cloud",
    description: "إعداد بيئة سيرفر احترافية مع CI/CD ومراقبة.",
    longDesc: "Nginx\nPM2\nDocker\nGitHub Actions",
    useCase: "devops",
    icon: "☁️",
    priceType: "request",
    featured: false,
    order: 8,
  },
  {
    title: "SEO وتحسين الأداء",
    description: "رفع ترتيب الموقع في نتائج البحث وتحسين السرعة.",
    longDesc: "Technical SEO\nCore Web Vitals\nSchema\nContent optimization",
    useCase: "marketing",
    icon: "📈",
    priceType: "fixed",
    price: 700,
    featured: false,
    order: 9,
  },
  {
    title: "الأمن السيبراني",
    description: "فحص ثغرات وتأمين التطبيق قبل وأثناء التشغيل.",
    longDesc: "OWASP\nمراجعة auth\nتقارير أمان\nإصلاحات أساسية",
    useCase: "security",
    icon: "🛡️",
    priceType: "request",
    featured: false,
    order: 10,
  },
  {
    title: "استشارات تقنية",
    description: "جلسات استشارية لترتيب المسار التقني والمنتج.",
    longDesc: "تحليل الفكرة\nاختيار stack\nخطة تنفيذ\nمراجعة الكود",
    useCase: "consulting",
    icon: "💡",
    priceType: "hourly",
    price: 200,
    featured: true,
    order: 11,
  },
];

async function main() {
  for (const item of SERVICES) {
    const slug = slugify(item.title, { lower: true, strict: true, trim: true });
    await prisma.service.upsert({
      where: { slug },
      update: {
        title: item.title,
        description: item.description,
        longDesc: item.longDesc,
        useCase: item.useCase,
        icon: item.icon,
        priceType: item.priceType,
        price: item.price ?? null,
        featured: item.featured,
        isActive: true,
        order: item.order,
      },
      create: {
        title: item.title,
        slug,
        description: item.description,
        longDesc: item.longDesc,
        useCase: item.useCase,
        icon: item.icon,
        priceType: item.priceType,
        price: item.price ?? null,
        featured: item.featured,
        isActive: true,
        order: item.order,
      },
    });
  }

  console.log(`✅ Seeded ${SERVICES.length} services`);
}

main()
  .catch((e) => {
    console.error("❌ seed-services failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

