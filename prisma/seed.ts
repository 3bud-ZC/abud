import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 بدء عملية التهيئة...");

  // Admin user
  const hashedPassword = await hash("admin123456", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@abud.com" },
    update: {},
    create: {
      name: "ABUD Admin",
      email: "admin@abud.com",
      password: hashedPassword,
    },
  });
  console.log("✅ تم إنشاء المستخدم الإداري");

  // Product categories
  const [catTools, catCourses, catTemplates] = await Promise.all([
    prisma.productCategory.upsert({
      where: { slug: "tools" },
      update: {},
      create: { name: "أدوات رقمية", slug: "tools" },
    }),
    prisma.productCategory.upsert({
      where: { slug: "courses" },
      update: {},
      create: { name: "كورسات", slug: "courses" },
    }),
    prisma.productCategory.upsert({
      where: { slug: "templates" },
      update: {},
      create: { name: "قوالب", slug: "templates" },
    }),
  ]);
  console.log("✅ تم إنشاء تصنيفات المنتجات");

  // Products
  await Promise.all([
    prisma.product.upsert({
      where: { slug: "notion-dashboard-arabic" },
      update: {},
      create: {
        title: "لوحة Notion العربية الشاملة",
        slug: "notion-dashboard-arabic",
        shortDesc: "لوحة تحكم Notion باللغة العربية لإدارة المشاريع والمهام",
        description: "لوحة تحكم Notion كاملة باللغة العربية لإدارة المشاريع والمهام والأهداف بطريقة احترافية",
        price: 199,
        oldPrice: 350,
        coverImage: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800",
        status: "active",
        featured: true,
        categoryId: catTemplates.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: "nextjs-saas-starter" },
      update: {},
      create: {
        title: "قالب Next.js SaaS الاحترافي",
        slug: "nextjs-saas-starter",
        shortDesc: "قالب متكامل لبناء تطبيقات SaaS",
        description: "قالب متكامل لبناء تطبيقات SaaS بـ Next.js 14 و Prisma و Stripe مع لوحة تحكم كاملة",
        price: 499,
        oldPrice: 799,
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
        status: "active",
        featured: true,
        categoryId: catTemplates.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: "ai-prompt-pack-arabic" },
      update: {},
      create: {
        title: "حزمة برومبت الذكاء الاصطناعي بالعربي",
        slug: "ai-prompt-pack-arabic",
        shortDesc: "أكثر من 500 برومبت احترافي",
        description: "أكثر من 500 برومبت احترافي للعمل مع ChatGPT و Midjourney و Claude",
        price: 149,
        oldPrice: 299,
        coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800",
        status: "active",
        featured: false,
        categoryId: catTools.id,
      },
    }),
    prisma.product.upsert({
      where: { slug: "freelance-mastery-course" },
      update: {},
      create: {
        title: "كورس الفريلانس الاحترافي",
        slug: "freelance-mastery-course",
        shortDesc: "تعلم كيف تبني مشروعك الحر من الصفر",
        description: "تعلم كيف تبني مشروعك الحر من الصفر وتحقق دخلاً شهرياً ثابتاً بالدولار",
        price: 299,
        oldPrice: 599,
        coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
        status: "active",
        featured: true,
        categoryId: catCourses.id,
      },
    }),
  ]);
  console.log("✅ تم إنشاء المنتجات");

  // Blog categories
  const [catDev, catDesign, catBusiness] = await Promise.all([
    prisma.blogCategory.upsert({
      where: { slug: "development" },
      update: {},
      create: { name: "تطوير", slug: "development" },
    }),
    prisma.blogCategory.upsert({
      where: { slug: "design" },
      update: {},
      create: { name: "تصميم", slug: "design" },
    }),
    prisma.blogCategory.upsert({
      where: { slug: "business" },
      update: {},
      create: { name: "بزنس", slug: "business" },
    }),
  ]);
  console.log("✅ تم إنشاء تصنيفات المدونة");

  // Blog posts
  await Promise.all([
    prisma.blogPost.upsert({
      where: { slug: "nextjs-14-complete-guide" },
      update: {},
      create: {
        title: "الدليل الشامل لـ Next.js 14: كل ما تحتاج معرفته",
        slug: "nextjs-14-complete-guide",
        excerpt: "استكشف أهم مميزات Next.js 14 من Server Components إلى App Router مع أمثلة عملية",
        content: "<p>يُعدّ Next.js 14 من أقوى الأطر البرمجية لبناء تطبيقات الويب الحديثة. في هذا الدليل الشامل نستعرض أبرز المميزات الجديدة.</p>",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
        status: "published",
        featured: true,
        tags: JSON.stringify(["nextjs", "react", "javascript"]),
        categoryId: catDev.id,
        publishedAt: new Date(),
        readTime: 8,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: "tailwindcss-tips-arabic" },
      update: {},
      create: {
        title: "20 نصيحة Tailwind CSS ستغير طريقة عملك للأبد",
        slug: "tailwindcss-tips-arabic",
        excerpt: "نصائح وحيل احترافية في Tailwind CSS لتسريع تطوير واجهات المستخدم",
        content: "<p>Tailwind CSS ثورة حقيقية في عالم تصميم الويب. هذه النصائح ستجعلك خبيراً.</p>",
        coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200",
        status: "published",
        featured: true,
        tags: JSON.stringify(["tailwind", "css", "تصميم"]),
        categoryId: catDesign.id,
        publishedAt: new Date(),
        readTime: 6,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: "freelancing-egypt-guide" },
      update: {},
      create: {
        title: "دليل الفريلانس في مصر 2024: من الصفر إلى الاحتراف",
        slug: "freelancing-egypt-guide",
        excerpt: "كيف تبدأ مشوارك كمستقل في مصر وتحقق دخلاً بالدولار",
        content: "<p>الفريلانس أصبح من أكثر المجالات نمواً في مصر والوطن العربي. دليلنا الشامل يوضح كل خطوة.</p>",
        coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
        status: "published",
        featured: false,
        tags: JSON.stringify(["فريلانس", "بزنس", "مصر"]),
        categoryId: catBusiness.id,
        publishedAt: new Date(),
        readTime: 12,
      },
    }),
  ]);
  console.log("✅ تم إنشاء مقالات المدونة");

  // Portfolio projects
  await Promise.all([
    prisma.portfolioProject.upsert({
      where: { slug: "abud-ecommerce" },
      update: {},
      create: {
        title: "ABUD E-Commerce Platform",
        slug: "abud-ecommerce",
        description: "منصة تجارة إلكترونية متكاملة بـ Next.js 14 و Stripe و Prisma مع لوحة تحكم متقدمة",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
        featured: true,
        tags: JSON.stringify(["Next.js", "TypeScript", "Prisma", "Stripe", "Tailwind"]),
        links: JSON.stringify(["https://github.com/abud", "https://abud-store.vercel.app"]),
      },
    }),
    prisma.portfolioProject.upsert({
      where: { slug: "arabic-dashboard-ui" },
      update: {},
      create: {
        title: "Arabic Admin Dashboard UI",
        slug: "arabic-dashboard-ui",
        description: "لوحة تحكم إدارية عربية الأولى بتصميم RTL كامل وتجربة مستخدم احترافية",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
        featured: true,
        tags: JSON.stringify(["React", "Tailwind CSS", "RTL", "TypeScript"]),
        links: JSON.stringify(["https://github.com/abud/dashboard"]),
      },
    }),
    prisma.portfolioProject.upsert({
      where: { slug: "ai-content-generator" },
      update: {},
      create: {
        title: "AI Arabic Content Generator",
        slug: "ai-content-generator",
        description: "تطبيق لتوليد محتوى عربي احترافي باستخدام OpenAI GPT-4 و Langchain",
        thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200",
        featured: false,
        tags: JSON.stringify(["OpenAI", "Langchain", "Python", "FastAPI"]),
        links: JSON.stringify(["https://github.com/abud/ai-gen"]),
      },
    }),
  ]);
  console.log("✅ تم إنشاء مشاريع البورتفوليو");

  // Services
  await Promise.all([
    prisma.service.upsert({
      where: { slug: "web-development" },
      update: {},
      create: {
        title: "تطوير مواقع وتطبيقات الويب",
        slug: "web-development",
        description: "نبني لك موقع أو تطبيق ويب احترافي بأحدث التقنيات مع ضمان الأداء والسرعة",
        longDesc: "تصميم UI/UX احترافي — متوافق مع الجوال — سريع وآمن — لوحة تحكم كاملة — دعم فني شهر",
        icon: "🌐",
        priceType: "fixed",
        price: 2000,
        ctaLabel: "يبدأ من",
        featured: true,
        isActive: true,
        order: 1,
      },
    }),
    prisma.service.upsert({
      where: { slug: "ui-ux-design" },
      update: {},
      create: {
        title: "تصميم UI/UX",
        slug: "ui-ux-design",
        description: "نصمم تجارب مستخدم استثنائية تزيد من معدلات التحويل وتبهر عملاءك",
        longDesc: "تصميم Figma احترافي — نماذج تفاعلية — تصميم RTL عربي — ملفات قابلة للتعديل",
        icon: "🎨",
        priceType: "fixed",
        price: 800,
        ctaLabel: "يبدأ من",
        featured: true,
        isActive: true,
        order: 2,
      },
    }),
    prisma.service.upsert({
      where: { slug: "ecommerce-store" },
      update: {},
      create: {
        title: "إنشاء متجر إلكتروني",
        slug: "ecommerce-store",
        description: "نبني متجرك الإلكتروني الاحترافي مع بوابات الدفع والإدارة الكاملة",
        longDesc: "تصميم متجر — بوابات دفع متعددة — إدارة المنتجات والطلبات — دعم فني 3 أشهر",
        icon: "🛍️",
        priceType: "fixed",
        price: 3500,
        ctaLabel: "يبدأ من",
        featured: false,
        isActive: true,
        order: 3,
      },
    }),
    prisma.service.upsert({
      where: { slug: "technical-consultation" },
      update: {},
      create: {
        title: "استشارات تقنية",
        slug: "technical-consultation",
        description: "جلسات استشارية فردية لمساعدتك في اختيار التقنية المناسبة وبناء فريقك",
        longDesc: "جلسة ساعة — مراجعة الكود — معمارية النظام — خطة عمل تقنية",
        icon: "💡",
        priceType: "hourly",
        price: 300,
        ctaLabel: "للجلسة",
        featured: false,
        isActive: true,
        order: 4,
      },
    }),
  ]);
  console.log("✅ تم إنشاء الخدمات");

  // Site settings
  const siteSettingsData = [
    { key: "site_title", value: "ABUD Platform" },
    { key: "site_description", value: "منصة رقمية متكاملة للمطورين والمصممين العرب" },
    { key: "site_email", value: "contact@abud.com" },
    { key: "site_phone", value: "+20 100 000 0000" },
    { key: "whatsapp_number", value: "+20 100 000 0000" },
    { key: "social_twitter", value: "https://x.com/abud" },
    { key: "social_github", value: "https://github.com/abud" },
  ];

  for (const s of siteSettingsData) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log("✅ تم إنشاء إعدادات الموقع");

  // Payment settings
  await Promise.all([
    prisma.paymentSetting.upsert({
      where: { method: "vodafone_cash" },
      update: {},
      create: {
        method: "vodafone_cash",
        label: "فودافون كاش",
        isActive: true,
        destination: "01000000000",
        instructions: "قم بتحويل المبلغ على رقم فودافون كاش المذكور، ثم ارفع صورة من إيصال التحويل.",
      },
    }),
    prisma.paymentSetting.upsert({
      where: { method: "instapay" },
      update: {},
      create: {
        method: "instapay",
        label: "إنستاباي",
        isActive: true,
        destination: "abud@instapay",
        instructions: "قم بالتحويل على InstaPay باستخدام الـ IPA المذكور، ثم ارفع إيصال التحويل.",
      },
    }),
    prisma.paymentSetting.upsert({
      where: { method: "paypal" },
      update: {},
      create: {
        method: "paypal",
        label: "PayPal",
        isActive: false,
        destination: "payments@abud.com",
        instructions: "قم بالدفع عبر PayPal على البريد المذكور كـ Friends & Family.",
      },
    }),
  ]);
  console.log("✅ تم إنشاء إعدادات الدفع");

  console.log("\n🎉 تمت عملية التهيئة بنجاح!");
  console.log("📧 البريد الإداري: admin@abud.com");
  console.log("🔑 كلمة المرور: admin123456");
  console.log("⚠️  يُرجى تغيير كلمة المرور بعد أول تسجيل دخول");
}

main()
  .catch((e) => {
    console.error("❌ خطأ في التهيئة:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
