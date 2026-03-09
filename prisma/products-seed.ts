import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Categories
  const cats = await Promise.all([
    prisma.productCategory.upsert({ where: { slug: "ai-tools" }, update: {}, create: { name: "أدوات الذكاء الاصطناعي", slug: "ai-tools", icon: "🤖" } }),
    prisma.productCategory.upsert({ where: { slug: "business" }, update: {}, create: { name: "بزنس أونلاين", slug: "business", icon: "💼" } }),
    prisma.productCategory.upsert({ where: { slug: "tools-templates" }, update: {}, create: { name: "أدوات وقوالب", slug: "tools-templates", icon: "🛠️" } }),
    prisma.productCategory.upsert({ where: { slug: "automation" }, update: {}, create: { name: "أتمتة وبوتات", slug: "automation", icon: "⚡" } }),
    prisma.productCategory.upsert({ where: { slug: "learning" }, update: {}, create: { name: "تعلم وتطوير", slug: "learning", icon: "📚" } }),
  ]);
  const [ai, biz, tools, auto, learn] = cats;

  const products = [
    // ─── AI ──────────────────────────────────────────────────────────────────
    {
      title: "حزمة Prompts الاحترافية للمطورين — 150+ Prompt",
      slug: "developer-ai-prompt-pack-150",
      shortDesc: "150+ prompt احترافي لـ ChatGPT وClaude يوفر عليك ساعات يومياً في البرمجة.",
      description: `<h2>ماذا ستحصل؟</h2>
<p>حزمة شاملة من أفضل 150+ prompt مُجرَّب وجاهز للاستخدام، مصممة خصيصاً للمطورين والمستقلين التقنيين.</p>
<h2>محتوى الحزمة</h2>
<ul>
<li>🐛 <strong>Debug Prompts (30+):</strong> ابحث عن الأخطاء وصلحها بدقة</li>
<li>📝 <strong>Code Review Prompts (25+):</strong> راجع كودك مثل خبير senior</li>
<li>🏗️ <strong>Architecture Prompts (20+):</strong> صمم بنية مشاريعك باحترافية</li>
<li>📖 <strong>Documentation Prompts (20+):</strong> اكتب وثائق واضحة في ثوانٍ</li>
<li>🔄 <strong>Refactoring Prompts (25+):</strong> حسّن جودة كودك القديم</li>
<li>🚀 <strong>Deployment & DevOps Prompts (15+):</strong> إعداد بيئات الإنتاج</li>
<li>💡 <strong>Idea Generation Prompts (15+):</strong> أفكار لمشاريع ومنتجات جديدة</li>
</ul>
<h2>لمن هذه الحزمة؟</h2>
<p>مطورين يريدون مضاعفة إنتاجيتهم، مستقلين يريدون تسليم مشاريع أسرع، وأصحاب مشاريع يريدون استخدام AI بذكاء.</p>
<h2>الصيغة</h2>
<p>ملف PDF + ملف Notion template قابل للنسخ — تعمل مع ChatGPT-4, Claude, Gemini وأي LLM آخر.</p>`,
      price: 49,
      oldPrice: 99,
      featured: true,
      cat: ai.id,
      tags: ["ChatGPT", "prompts", "AI", "developer", "productivity"],
    },
    {
      title: "دليل ChatGPT للأعمال: من المبتدئ إلى المحترف",
      slug: "chatgpt-business-guide-arabic",
      shortDesc: "الدليل الشامل باللغة العربية لاستخدام ChatGPT في تطوير عملك وزيادة دخلك.",
      description: `<h2>لماذا هذا الدليل؟</h2>
<p>معظم الناس يستخدمون ChatGPT بشكل سطحي. هذا الدليل يعلمك كيف تستخدمه كأداة عمل حقيقية تولّد نتائج قابلة للقياس.</p>
<h2>ما ستتعلمه</h2>
<ul>
<li>تقنيات Prompt Engineering المتقدمة بالعربي</li>
<li>بناء وكيل AI مخصص لعملك</li>
<li>أتمتة المهام المتكررة بالكامل</li>
<li>إنشاء محتوى تسويقي بجودة عالية</li>
<li>تحليل البيانات واتخاذ قرارات ذكية</li>
<li>بناء خدمات AI قابلة للبيع للعملاء</li>
</ul>
<h2>ماذا تحصل؟</h2>
<p>80 صفحة PDF + 50 Prompt Template جاهز + قائمة بـ 30 أداة AI مجانية.</p>`,
      price: 79,
      oldPrice: 149,
      featured: true,
      cat: ai.id,
      tags: ["ChatGPT", "AI", "business", "Arabic", "guide"],
    },
    {
      title: "Midjourney Prompt Pack — 100+ Prompt لصور احترافية",
      slug: "midjourney-prompt-pack-100",
      shortDesc: "100+ prompt مجرّب لـ Midjourney ينتج صوراً احترافية للمواقع والتسويق والمنتجات الرقمية.",
      description: `<h2>توقف عن الاستغراق في كتابة Prompts</h2>
<p>هذه الحزمة توفر عليك ساعات من التجربة والخطأ. كل prompt اختُبر وأنتج نتائج احترافية.</p>
<h2>ما تحصل عليه</h2>
<ul>
<li>🖼️ <strong>Website Hero Images (20):</strong> صور رئيسية للمواقع</li>
<li>📱 <strong>Social Media Graphics (25):</strong> تصاميم لجميع المنصات</li>
<li>🎨 <strong>Brand & Logo Concepts (15):</strong> أفكار تصميمية للعلامات التجارية</li>
<li>📦 <strong>Product Mockups (20):</strong> عروض المنتجات الرقمية</li>
<li>🌟 <strong>Abstract & Backgrounds (20):</strong> خلفيات وتأثيرات</li>
</ul>
<h2>يعمل مع</h2>
<p>Midjourney v6, DALL-E 3, Stable Diffusion, Adobe Firefly.</p>`,
      price: 39,
      oldPrice: 79,
      featured: false,
      cat: ai.id,
      tags: ["Midjourney", "AI art", "prompts", "design", "image generation"],
    },
    {
      title: "Prompt Engineering المتقدم: تقنيات الخبراء",
      slug: "advanced-prompt-engineering-guide",
      shortDesc: "تعلم التقنيات المتقدمة لكتابة Prompts تستخرج أفضل نتائج من أي نموذج AI.",
      description: `<h2>ما وراء الـ Prompts العادية</h2>
<p>هذا الدليل يأخذك للمستوى التالي — التقنيات التي يستخدمها المهندسون في OpenAI وGoogle للحصول على نتائج استثنائية.</p>
<h2>التقنيات التي ستتعلمها</h2>
<ul>
<li><strong>Chain of Thought (CoT):</strong> اجعل AI يفكر خطوة بخطوة</li>
<li><strong>Tree of Thoughts:</strong> استكشاف مسارات تفكير متعددة</li>
<li><strong>Few-Shot Learning:</strong> تعليم AI أسلوبك بأمثلة</li>
<li><strong>Role Prompting:</strong> بناء شخصيات AI متخصصة</li>
<li><strong>Constitutional AI:</strong> ضبط سلوك النموذج</li>
<li><strong>Retrieval Augmented Generation:</strong> ربط AI بمعرفتك الخاصة</li>
</ul>
<h2>المحتوى</h2>
<p>60 صفحة PDF + 30 Template + فيديوهات شرح قصيرة.</p>`,
      price: 59,
      oldPrice: 119,
      featured: false,
      cat: ai.id,
      tags: ["prompt engineering", "AI", "ChatGPT", "advanced", "LLM"],
    },

    // ─── BUSINESS ────────────────────────────────────────────────────────────
    {
      title: "حزمة بدء الفريلانس: من الصفر لأول 1000$",
      slug: "freelancing-starter-kit-first-1000",
      shortDesc: "كل ما تحتاجه لبدء مشوارك في الفريلانس وكسب أول 1000 دولار — قوالب، نصائح، وخطة عمل.",
      description: `<h2>ما الذي يوقف معظم المستقلين؟</h2>
<p>ليس غياب المهارة — بل غياب النظام. هذه الحزمة تعطيك النظام الكامل.</p>
<h2>محتوى الحزمة</h2>
<ul>
<li>📋 <strong>Profile Template:</strong> نموذج بروفايل Upwork/Fiverr يجذب العملاء</li>
<li>✉️ <strong>Proposal Templates (10):</strong> قوالب proposals مُثبتة فعاليتها</li>
<li>💰 <strong>Pricing Calculator:</strong> احسب سعرك الصحيح بدقة</li>
<li>📄 <strong>Contract Template:</strong> عقد احترافي يحميك قانونياً</li>
<li>🧾 <strong>Invoice Template:</strong> فاتورة احترافية بالعربي والإنجليزي</li>
<li>📊 <strong>Client Tracker:</strong> تتبع عملاءك ومشاريعك</li>
<li>🗺️ <strong>90-Day Roadmap:</strong> خطة 90 يوم للوصول لأول 1000$</li>
</ul>
<h2>مناسب لـ</h2>
<p>مطورين، مصممين، كتّاب، مترجمين — أي مهارة يمكن بيعها أونلاين.</p>`,
      price: 89,
      oldPrice: 179,
      featured: true,
      cat: biz.id,
      tags: ["فريلانس", "Upwork", "freelancing", "online business", "starter kit"],
    },
    {
      title: "دليل إنشاء وبيع المنتجات الرقمية: الدليل الشامل",
      slug: "digital-products-creation-guide",
      shortDesc: "خطوة بخطوة من فكرة المنتج حتى أول بيعة — كل ما تحتاج معرفته لبناء مصدر دخل سلبي.",
      description: `<h2>المنتجات الرقمية = أفضل نموذج عمل أونلاين</h2>
<p>تُنشئها مرة واحدة وتبيعها لا نهاية من المرات. هذا الدليل يعلمك كيف تفعل ذلك بشكل صحيح.</p>
<h2>ما ستتعلمه</h2>
<ul>
<li>كيف تجد فكرة منتج يشتريه الناس فعلاً</li>
<li>بحث المنافسين وتحديد الفجوة في السوق</li>
<li>إنشاء منتج بجودة عالية بأدوات مجانية</li>
<li>تسعير منتجك بطريقة تزيد المبيعات</li>
<li>منصات البيع: Gumroad, Lemon Squeezy, موقعك</li>
<li>استراتيجيات التسويق بميزانية صفر</li>
<li>بناء email list ومجتمع حول منتجك</li>
</ul>
<h2>المحتوى</h2>
<p>100 صفحة PDF + Checklist إطلاق المنتج + قوالب صفحات البيع.</p>`,
      price: 99,
      oldPrice: 199,
      featured: true,
      cat: biz.id,
      tags: ["digital products", "passive income", "online business", "Gumroad"],
    },
    {
      title: "حزمة الدخل السلبي: 7 استراتيجيات مجربة لـ 2025",
      slug: "passive-income-7-strategies-2025",
      shortDesc: "7 استراتيجيات حقيقية ومجربة لبناء مصادر دخل سلبي على الإنترنت مع خطة تنفيذ واضحة.",
      description: `<h2>الدخل السلبي الحقيقي: ليس أسطورة</h2>
<p>لكنه يتطلب عملاً حقيقياً في البداية. هذا الدليل يوضح بالأرقام ما يمكن توقعه وكيف تصله.</p>
<h2>الاستراتيجيات السبع</h2>
<ol>
<li><strong>المنتجات الرقمية:</strong> الجدول الزمني والإيرادات المتوقعة</li>
<li><strong>التسويق بالعمولة:</strong> أفضل البرامج وكيف تختار</li>
<li><strong>قنوات YouTube:</strong> من الصفر للدخل في 6 أشهر</li>
<li><strong>المدونات:</strong> SEO والإعلانات وهيكل الدخل</li>
<li><strong>الدورات التدريبية:</strong> من الفكرة للإطلاق</li>
<li><strong>تطبيقات وإضافات:</strong> Chrome Extensions وتطبيقات SaaS صغيرة</li>
<li><strong>بيع وشراء المواقع:</strong> Flipping المواقع الإلكترونية</li>
</ol>
<h2>المحتوى</h2>
<p>90 صفحة PDF + جداول مقارنة + خطط عمل جاهزة لكل استراتيجية.</p>`,
      price: 69,
      oldPrice: 139,
      featured: false,
      cat: biz.id,
      tags: ["passive income", "دخل سلبي", "online business", "affiliate marketing"],
    },
    {
      title: "Online Business Starter Kit: ابدأ مشروعك الرقمي",
      slug: "online-business-starter-kit",
      shortDesc: "المجموعة الكاملة لبدء مشروع رقمي ناجح — من الفكرة إلى أول عميل خلال 30 يوماً.",
      description: `<h2>كل ما تحتاجه في مكان واحد</h2>
<p>هذه الحزمة تجمع كل ما جمعته من تجارب، أخطاء، ونجاحات في الأعمال الرقمية لتوفير وقتك.</p>
<h2>ما تحصل عليه</h2>
<ul>
<li>🎯 <strong>Business Model Canvas:</strong> قالب لتصميم نموذج عملك</li>
<li>🔍 <strong>Market Research Template:</strong> كيف تبحث عن السوق المناسب</li>
<li>💻 <strong>Minimum Viable Product Checklist:</strong> ابنِ منتجك الأول بسرعة</li>
<li>📣 <strong>Marketing Playbook:</strong> استراتيجية تسويقية جاهزة</li>
<li>💰 <strong>Pricing Strategy Guide:</strong> كيف تسعّر بثقة</li>
<li>📧 <strong>Email Sequence Templates:</strong> 5 رسائل ترحيب تحول العملاء</li>
<li>📊 <strong>KPI Dashboard:</strong> قياس نجاحك بأرقام واضحة</li>
</ul>`,
      price: 119,
      oldPrice: 239,
      featured: false,
      cat: biz.id,
      tags: ["online business", "startup", "entrepreneur", "digital business"],
    },

    // ─── TOOLS & TEMPLATES ────────────────────────────────────────────────────
    {
      title: "Notion Business OS: نظام إدارة كامل للمطور المستقل",
      slug: "notion-business-os-freelancer",
      shortDesc: "نظام Notion متكامل لإدارة مشاريعك وعملاءك ومهامك ودخلك — كل شيء في مكان واحد.",
      description: `<h2>أوقف التشتت وابدأ تنظيم حياتك المهنية</h2>
<p>هذا القالب مبني على تجربة حقيقية في إدارة مشاريع فريلانس متعددة بشكل منظم وقابل للقياس.</p>
<h2>ما يشمله النظام</h2>
<ul>
<li>📁 <strong>Project Tracker:</strong> تتبع كل مشروع من البداية للتسليم</li>
<li>👥 <strong>Client CRM:</strong> قاعدة بيانات عملاء مع تاريخ كل تعامل</li>
<li>📅 <strong>Weekly Planner:</strong> تنظيم أسبوعك بفعالية</li>
<li>💰 <strong>Income Tracker:</strong> تتبع إيراداتك ومصاريفك</li>
<li>🎯 <strong>Goals Dashboard:</strong> أهدافك الشهرية والسنوية</li>
<li>📚 <strong>Knowledge Base:</strong> احفظ كل ما تتعلمه منظماً</li>
<li>⚙️ <strong>SOP Templates:</strong> قوالب إجراءات عملك المتكررة</li>
</ul>
<h2>كيف تستخدمه؟</h2>
<p>انسخ القالب لحسابك في Notion، اقرأ دليل الاستخدام (15 دقيقة)، وابدأ فوراً.</p>`,
      price: 59,
      oldPrice: 119,
      featured: true,
      cat: tools.id,
      tags: ["Notion", "productivity", "project management", "freelancer", "template"],
    },
    {
      title: "حزمة قوالب الفريلانس الاحترافية: عقود وفواتير وعروض",
      slug: "freelance-professional-templates-pack",
      shortDesc: "كل القوالب التي يحتاجها المستقل المحترف — عقود، فواتير، عروض أسعار، وتقارير تسليم.",
      description: `<h2>مظهر احترافي من اليوم الأول</h2>
<p>العملاء يحكمون عليك من أول وثيقة ترسلها. هذه القوالب تجعلك تبدو كشركة محترفة حتى لو كنت تعمل وحدك.</p>
<h2>القوالب المشمولة</h2>
<ul>
<li>📄 <strong>عقد خدمات شامل (عربي/إنجليزي):</strong> يحميك قانونياً ويوضح الحقوق</li>
<li>🧾 <strong>قالب فاتورة احترافية:</strong> PDF وExcel مع حساب تلقائي</li>
<li>📊 <strong>عرض سعر مفصّل:</strong> يقنع العميل ويغلق الصفقة</li>
<li>✅ <strong>نموذج تسليم المشروع:</strong> وثّق ما سلّمته باحترافية</li>
<li>⭐ <strong>طلب تقييم العميل:</strong> احصل على 5 نجوم بانتظام</li>
<li>📧 <strong>Email Templates (10):</strong> ردود جاهزة لكل موقف</li>
</ul>
<h2>الصيغ المتاحة</h2>
<p>Word, Google Docs, Notion, PDF — متاح بالعربي والإنجليزي.</p>`,
      price: 45,
      oldPrice: 89,
      featured: false,
      cat: tools.id,
      tags: ["templates", "freelancing", "contracts", "invoice", "professional"],
    },
    {
      title: "خارطة طريق المطور العربي: 12 شهر من الصفر للتوظيف",
      slug: "arabic-developer-roadmap-12-months",
      shortDesc: "خطة تعلم منظمة لمدة 12 شهراً تأخذك من الصفر المطلق إلى مطور Full-Stack قابل للتوظيف.",
      description: `<h2>لا تتوه في بحر المعلومات</h2>
<p>أكبر مشكلة في تعلم البرمجة هي التشتت بين المصادر. هذه الخارطة تعطيك مساراً واضحاً 100%.</p>
<h2>محتوى الخارطة</h2>
<ul>
<li>🗓️ <strong>خطة شهرية مفصّلة:</strong> ماذا تتعلم كل شهر بالترتيب</li>
<li>📚 <strong>أفضل المصادر:</strong> مجانية ومدفوعة لكل مرحلة</li>
<li>🔨 <strong>مشاريع عملية:</strong> 12 مشروع يبنيك خطوة بخطوة</li>
<li>✅ <strong>Checklists:</strong> تحقق من تقدمك بانتظام</li>
<li>💼 <strong>بناء البورتفوليو:</strong> كيف تعرض مشاريعك للشركات</li>
<li>🎯 <strong>التوظيف والفريلانس:</strong> دليل الحصول على أول فرصة</li>
</ul>
<h2>المسارات المتاحة</h2>
<p>Frontend (React/Next.js), Backend (Node.js), Full-Stack, وAI/ML.</p>`,
      price: 79,
      oldPrice: 159,
      featured: false,
      cat: tools.id,
      tags: ["roadmap", "learning", "programming", "web development", "career"],
    },
    {
      title: "VS Code الإعداد المثالي: حزمة المطور الاحترافي",
      slug: "vscode-professional-setup-pack",
      shortDesc: "إعدادات وإضافات وSnippets وTheme احترافية لـ VS Code تجعل بيئة تطويرك أسرع وأجمل.",
      description: `<h2>بيئة تطوير تسرع إنتاجيتك 2×</h2>
<p>البيئة الصحيحة تفرق كثيراً. هذه الحزمة تعطيك بيئة مطوّرة بدقة لتحقيق أقصى إنتاجية.</p>
<h2>ما تحصل عليه</h2>
<ul>
<li>⚙️ <strong>settings.json مُحسَّن:</strong> 50+ إعداد لأداء أفضل</li>
<li>🧩 <strong>قائمة 30 Extension ضرورية:</strong> مع شرح استخدام كل واحدة</li>
<li>⌨️ <strong>Keybindings مخصصة:</strong> اختصارات تسرع العمل</li>
<li>🎨 <strong>Theme & Font Setup:</strong> مظهر احترافي يريح العين</li>
<li>📝 <strong>Snippets Pack (100+):</strong> React, Next.js, TypeScript, Tailwind</li>
<li>🔧 <strong>Workspace Configs:</strong> إعدادات لكل نوع مشروع</li>
</ul>
<h2>طريقة الاستخدام</h2>
<p>ملف JSON جاهز للاستيراد + دليل التثبيت خطوة بخطوة.</p>`,
      price: 35,
      oldPrice: 69,
      featured: false,
      cat: tools.id,
      tags: ["VS Code", "developer tools", "productivity", "snippets", "setup"],
    },

    // ─── AUTOMATION ───────────────────────────────────────────────────────────
    {
      title: "حزمة Telegram Bot Templates: 5 بوتات جاهزة",
      slug: "telegram-bot-templates-pack-5",
      shortDesc: "5 بوتات تيليغرام جاهزة بكود Python كامل — بوت أوامر، بوت متجر، بوت دعم عملاء، وأكثر.",
      description: `<h2>بوتات تيليغرام احترافية بدون بداية من الصفر</h2>
<p>كل بوت مبني على أرضية صلبة مع وثائق واضحة — فقط عدّل وانشر.</p>
<h2>البوتات الخمسة</h2>
<ul>
<li>🤖 <strong>بوت الأوامر الأساسي:</strong> أوامر، قوائم، ردود تلقائية</li>
<li>🛒 <strong>بوت المتجر:</strong> عرض منتجات، سلة، طلبات — مع قاعدة بيانات</li>
<li>🎧 <strong>بوت دعم العملاء:</strong> تذاكر، حالات، إشعارات للمشرف</li>
<li>📅 <strong>بوت الحجوزات:</strong> مواعيد، تأكيد، تذكير تلقائي</li>
<li>📊 <strong>بوت البيانات والتقارير:</strong> اتصال بـ API وعرض إحصائيات</li>
</ul>
<h2>التقنيات المستخدمة</h2>
<p>Python + python-telegram-bot + SQLite/PostgreSQL. يعمل على أي VPS أو Heroku أو Railway.</p>`,
      price: 99,
      oldPrice: 199,
      featured: true,
      cat: auto.id,
      tags: ["telegram bot", "Python", "automation", "templates", "chatbot"],
    },
    {
      title: "n8n Automation Pack: 20+ Workflow جاهز للاستخدام",
      slug: "n8n-automation-workflows-pack-20",
      shortDesc: "20+ workflow جاهز لـ n8n يغطي أتمتة البريد، السوشيال ميديا، إدارة العملاء، والمزيد.",
      description: `<h2>أتمتة عملك من اليوم الأول</h2>
<p>لا داعي لبناء كل شيء من الصفر. هذه الـ Workflows اختُبرت وتعمل بشكل موثوق.</p>
<h2>أبرز الـ Workflows</h2>
<ul>
<li>📧 <strong>Email Intelligence:</strong> تصنيف وتلخيص وإشعار تلقائي للإيميلات</li>
<li>📱 <strong>Social Media Scheduler:</strong> نشر محتوى على 5 منصات دفعة واحدة</li>
<li>🔔 <strong>Lead Capture System:</strong> استقبال وتصنيف العملاء المحتملين</li>
<li>📊 <strong>Weekly Report Generator:</strong> تقرير أداء أسبوعي تلقائي</li>
<li>🛒 <strong>Order Processing:</strong> معالجة الطلبات وإشعار العملاء</li>
<li>🤖 <strong>AI Content Pipeline:</strong> توليد ونشر محتوى بـ ChatGPT</li>
<li>💬 <strong>Telegram + Email Bridge:</strong> تلقي إشعارات مهمة على تيليغرام</li>
</ul>
<h2>كيف تستخدمها؟</h2>
<p>استورد ملف JSON في n8n واضبط الـ Credentials — جاهز خلال دقائق.</p>`,
      price: 129,
      oldPrice: 259,
      featured: true,
      cat: auto.id,
      tags: ["n8n", "automation", "workflow", "no-code", "productivity"],
    },
    {
      title: "GitHub Actions CI/CD Templates: نشر تلقائي احترافي",
      slug: "github-actions-cicd-templates-pack",
      shortDesc: "مجموعة من GitHub Actions Workflows جاهزة لنشر Next.js, Node.js, Python على VPS وVercel.",
      description: `<h2>نشر احترافي بضغطة زر</h2>
<p>كل push لـ GitHub = موقعك يتحدث تلقائياً. هذه الـ Templates تجعل هذا الحلم حقيقة خلال ساعة.</p>
<h2>الـ Templates المشمولة</h2>
<ul>
<li>🚀 <strong>Next.js → VPS:</strong> بناء ونشر مع PM2 وNginx</li>
<li>⚡ <strong>Next.js → Vercel:</strong> نشر فوري مع Preview Deployments</li>
<li>🐍 <strong>Python/FastAPI → VPS:</strong> مع Tests وDocker</li>
<li>🐳 <strong>Docker Compose Deploy:</strong> نشر multi-container</li>
<li>✅ <strong>Test & Lint Pipeline:</strong> TypeScript, ESLint, Prettier, Vitest</li>
<li>🔒 <strong>Security Scan:</strong> فحص الثغرات قبل كل deploy</li>
<li>📦 <strong>Package Release:</strong> نشر npm packages تلقائياً</li>
</ul>
<h2>مناسب لـ</h2>
<p>مطورين مستقلين وفرق صغيرة تريد DevOps احترافي بدون تعقيد.</p>`,
      price: 75,
      oldPrice: 149,
      featured: false,
      cat: auto.id,
      tags: ["GitHub Actions", "CI/CD", "DevOps", "deployment", "automation"],
    },
    {
      title: "دليل أتمتة عمل الفريلانسر: وفّر 20 ساعة أسبوعياً",
      slug: "freelancer-automation-guide-save-20-hours",
      shortDesc: "كيف تؤتمت 80% من مهامك المتكررة كمستقل وتوفر 20 ساعة أسبوعياً لعمل أكثر أهمية.",
      description: `<h2>أتمتة الأشياء الممكنة، ركّز على ما يستحق</h2>
<p>المستقلون الناجحون لا يعملون أكثر — يعملون بشكل أذكى. هذا الدليل يريك كيف.</p>
<h2>ما ستؤتمته</h2>
<ul>
<li>📧 <strong>الردود الأولى على العملاء:</strong> نموذج رد تلقائي + تصفية</li>
<li>📅 <strong>جدولة المواعيد:</strong> Calendly + تكامل التقويم</li>
<li>💰 <strong>الفواتير والمدفوعات:</strong> إرسال وتتبع تلقائي</li>
<li>📊 <strong>تقارير التقدم:</strong> تحديثات أسبوعية للعملاء بضغطة</li>
<li>🔄 <strong>Backup المشاريع:</strong> نسخ احتياطي تلقائي</li>
<li>📱 <strong>إدارة السوشيال ميديا:</strong> جدولة المحتوى لأسابيع قادمة</li>
</ul>
<h2>الأدوات المستخدمة</h2>
<p>n8n, Zapier, Make, Calendly, Notion — كلها موضّحة مع أمثلة عملية.</p>`,
      price: 55,
      oldPrice: 109,
      featured: false,
      cat: auto.id,
      tags: ["automation", "freelancing", "productivity", "n8n", "workflow"],
    },

    // ─── LEARNING ─────────────────────────────────────────────────────────────
    {
      title: "Next.js Production Starter: قالب مشروع جاهز للإنتاج",
      slug: "nextjs-production-starter-template",
      shortDesc: "قالب Next.js 14 كامل جاهز للإنتاج مع Auth وDatabase وDashboard وDark Mode وكل شيء.",
      description: `<h2>ابدأ مشروعك من حيث توقف الآخرون</h2>
<p>لا تقضِ أسبوعاً في إعداد المشروع. هذا الـ Starter يعطيك أساساً قوياً تبني عليه مباشرة.</p>
<h2>ما يشمله القالب</h2>
<ul>
<li>⚡ <strong>Next.js 14 + App Router + TypeScript</strong></li>
<li>🎨 <strong>Tailwind CSS + shadcn/ui:</strong> مكونات جاهزة واحترافية</li>
<li>🔐 <strong>Authentication:</strong> تسجيل دخول، JWT، Session، محمية</li>
<li>🗄️ <strong>Prisma + SQLite/PostgreSQL:</strong> Schema جاهز وMigrations</li>
<li>📊 <strong>Admin Dashboard:</strong> لوحة تحكم كاملة</li>
<li>🌙 <strong>Dark/Light Mode:</strong> مبني من البداية</li>
<li>📧 <strong>Email System:</strong> Resend integration جاهز</li>
<li>🚀 <strong>Deployment Ready:</strong> VPS + Vercel configs</li>
</ul>
<h2>مثالي لـ</h2>
<p>SaaS, متاجر إلكترونية, منصات محتوى, مواقع شخصية احترافية.</p>`,
      price: 149,
      oldPrice: 299,
      featured: true,
      cat: learn.id,
      tags: ["Next.js", "template", "boilerplate", "SaaS", "TypeScript", "React"],
    },
    {
      title: "دليل الأمن السيبراني الشامل للمطور والمستقل",
      slug: "cybersecurity-complete-guide-developer",
      shortDesc: "حماية شاملة لمشاريعك وبياناتك وحساباتك — كل ما يحتاجه المطور والمستقل لحماية نفسه.",
      description: `<h2>لماذا الأمن السيبراني ضروري لك؟</h2>
<p>اختراق واحد يمكن أن يدمر سمعتك ومشاريعك. هذا الدليل يعطيك حماية شاملة بخطوات بسيطة.</p>
<h2>ما ستتعلمه</h2>
<ul>
<li>🔐 <strong>تأمين حساباتك:</strong> كلمات مرور، 2FA، مدير كلمات المرور</li>
<li>🌐 <strong>تأمين مواقعك:</strong> HTTPS, Headers, Input Validation</li>
<li>💻 <strong>تأمين سيرفرك:</strong> SSH, Firewall, Fail2Ban, Updates</li>
<li>📁 <strong>حماية ملفاتك:</strong> تشفير، نسخ احتياطي، VPN</li>
<li>🔍 <strong>اكتشاف الثغرات:</strong> أدوات مجانية لفحص مشاريعك</li>
<li>⚠️ <strong>الاستجابة للاختراق:</strong> ماذا تفعل إذا تعرضت للاختراق؟</li>
</ul>
<h2>المحتوى</h2>
<p>70 صفحة PDF + Security Checklist + قائمة أدوات مجانية.</p>`,
      price: 65,
      oldPrice: 129,
      featured: false,
      cat: learn.id,
      tags: ["cybersecurity", "security", "developer", "protection", "أمن سيبراني"],
    },
    {
      title: "دليل بناء SaaS من الصفر: من الفكرة للإطلاق",
      slug: "saas-building-guide-zero-to-launch",
      shortDesc: "خطوة بخطوة لبناء وإطلاق تطبيق SaaS ناجح — التقنية والتسويق والتسعير والنمو.",
      description: `<h2>SaaS = أفضل نموذج عمل رقمي</h2>
<p>دخل شهري متكرر، قابل للتوسع، ويعمل وأنت نائم. هذا الدليل يعلمك كيف تبنيه بشكل صحيح.</p>
<h2>ما ستتعلمه</h2>
<ul>
<li>🎯 <strong>اختيار الفكرة الصحيحة:</strong> كيف تتحقق من وجود سوق قبل البناء</li>
<li>🏗️ <strong>الـ Tech Stack المثالي:</strong> Next.js + Stripe + Auth</li>
<li>💳 <strong>Subscription Pricing:</strong> كيف تصمم خطط الاشتراك</li>
<li>🚀 <strong>MVP في أسبوعين:</strong> بناء أسرع ما يمكن</li>
<li>📣 <strong>Product Hunt Launch:</strong> كيف تطلق وتحصل على أول 100 مستخدم</li>
<li>📈 <strong>Growth Strategies:</strong> من 100 لـ 1000 لـ 10,000 مستخدم</li>
</ul>
<h2>المحتوى</h2>
<p>110 صفحة PDF + SaaS Checklist + قوالب صفحات Landing وOnboarding.</p>`,
      price: 119,
      oldPrice: 239,
      featured: true,
      cat: learn.id,
      tags: ["SaaS", "startup", "Next.js", "Stripe", "online business", "build"],
    },
    {
      title: "حزمة موارد المطور العربي: 100+ أداة ومصدر مختار",
      slug: "arabic-developer-resources-pack-100",
      shortDesc: "مجموعة مختارة بعناية من أكثر من 100 أداة ومصدر تعليمي ومنصة للمطورين العرب.",
      description: `<h2>لماذا هذه الحزمة مختلفة؟</h2>
<p>ليست مجرد قائمة — كل أداة مع شرح لماذا ومتى تستخدمها، ومقارنة بالبدائل.</p>
<h2>ما تشمله الحزمة</h2>
<ul>
<li>🤖 <strong>أدوات AI (20+):</strong> الأفضل للكود، الكتابة، التصميم، البحث</li>
<li>💻 <strong>أدوات التطوير (25+):</strong> VS Code, Git, Docker, testing</li>
<li>💼 <strong>أدوات الفريلانس (15+):</strong> منصات، عقود، مدفوعات</li>
<li>🎨 <strong>أدوات التصميم (15+):</strong> Figma, Canva, Midjourney</li>
<li>📊 <strong>أدوات الإنتاجية (15+):</strong> Notion, Linear, Obsidian</li>
<li>📚 <strong>مصادر التعلم (20+):</strong> دورات، كتب، قنوات يوتيوب</li>
</ul>
<h2>الصيغة</h2>
<p>ملف Notion تفاعلي + PDF قابل للطباعة + روابط مباشرة لكل أداة.</p>`,
      price: 29,
      oldPrice: 59,
      featured: false,
      cat: learn.id,
      tags: ["resources", "tools", "developer", "Arabic", "learning", "productivity"],
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        title: p.title,
        slug: p.slug,
        shortDesc: p.shortDesc,
        description: p.description,
        price: p.price,
        oldPrice: p.oldPrice,
        featured: p.featured,
        status: "active",
        purchaseType: "instant",
        deliveryNote: "سيتم إرسال رابط التحميل فور إتمام الشراء",
        payMethods: JSON.stringify(["paypal", "card"]),
        categoryId: p.cat,
      },
    });
    console.log(`✅ ${p.title}`);
  }

  console.log(`\n🎉 تم إنشاء ${products.length} منتج رقمي احترافي بنجاح!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
