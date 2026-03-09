import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔄 تنظيف المتجر وإعادة الهيكلة...");

  // ── Step 1: Deactivate all existing products ─────────────
  const deactivated = await prisma.product.updateMany({
    data: { status: "draft", featured: false },
  });
  console.log(`✅ تم إلغاء تفعيل ${deactivated.count} منتج`);

  // ── Step 2: Upsert categories ─────────────────────────────
  const [catCyber, catDevTools, catDigital, catTemplates, catGaming, catWebSvc, catCyberSvc, catConsulting] = await Promise.all([
    prisma.productCategory.upsert({ where: { slug: "cybersecurity" },     update: {}, create: { name: "الأمن السيبراني", slug: "cybersecurity" } }),
    prisma.productCategory.upsert({ where: { slug: "developer-tools" },   update: {}, create: { name: "أدوات المطورين", slug: "developer-tools" } }),
    prisma.productCategory.upsert({ where: { slug: "digital-products" },  update: {}, create: { name: "منتجات رقمية",   slug: "digital-products" } }),
    prisma.productCategory.upsert({ where: { slug: "templates" },         update: {}, create: { name: "قوالب",           slug: "templates" } }),
    prisma.productCategory.upsert({ where: { slug: "gaming" },            update: {}, create: { name: "جيمينج",          slug: "gaming" } }),
    prisma.productCategory.upsert({ where: { slug: "web-dev-services" },  update: {}, create: { name: "تطوير ويب",       slug: "web-dev-services" } }),
    prisma.productCategory.upsert({ where: { slug: "cyber-services" },    update: {}, create: { name: "خدمات أمنية",     slug: "cyber-services" } }),
    prisma.productCategory.upsert({ where: { slug: "consulting-pro" },    update: {}, create: { name: "استشارات",        slug: "consulting-pro" } }),
  ]);
  console.log("✅ تم إعداد التصنيفات");

  // ── Step 3: Digital products (15) ────────────────────────
  const digital = [
    {
      slug: "cybersecurity-starter-guide",
      title: "دليل الأمن السيبراني للمبتدئين",
      shortDesc: "دليل PDF شامل يأخذك من الصفر في عالم الأمن السيبراني بأمثلة عملية وخارطة طريق واضحة.",
      description: "أكثر من 60 صفحة تغطي مفاهيم الأمن الأساسية، أنواع الهجمات الشائعة، أدوات الحماية المجانية، وخارطة طريق للدخول لمجال الأمن السيبراني باحترافية. مثالي للمبتدئين الجادين.",
      price: 149, purchaseType: "instant", featured: true,
      categoryId: catCyber.id,
      coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    },
    {
      slug: "ai-tools-for-developers-guide",
      title: "دليل أدوات الذكاء الاصطناعي للمطورين",
      shortDesc: "أهم أدوات AI تضاعف إنتاجيتك كمطور مع أمثلة استخدام عملية لكل أداة.",
      description: "دليل شامل يكشف كيف يستخدم المطورون المحترفون GitHub Copilot وChatGPT وClaude لكتابة كود أسرع، Prompts تقنية ذكية، أتمتة الاختبارات والتوثيق، وبناء Workflows هجينة تجمع بين الذكاء البشري والاصطناعي.",
      price: 149, purchaseType: "instant", featured: false,
      categoryId: catDevTools.id,
      coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800",
    },
    {
      slug: "full-stack-developer-roadmap",
      title: "خارطة طريق Full Stack Developer",
      shortDesc: "المسار الكامل والمفصّل لاحتراف تطوير الويب مع موارد وأمثلة عملية لكل مرحلة.",
      description: "خارطة طريق تفصيلية تأخذك من الصفر لمطور Full Stack قابل للتوظيف. 5 مراحل واضحة مع مدة زمنية واقعية وأفضل مصادر التعلم ومشاريع عملية لبناء Portfolio قوي يفتح أبواب الفرص.",
      price: 129, purchaseType: "instant", featured: false,
      categoryId: catDevTools.id,
      coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    },
    {
      slug: "developer-productivity-guide",
      title: "دليل إنتاجية المطور المحترف",
      shortDesc: "منهجيات عملية لمضاعفة إنتاجيتك كمطور وإنجاز أكثر في وقت أقل وبجودة أعلى.",
      description: "يكشف تقنيات وعادات المطورين الأكثر إنتاجية: إعداد بيئة تطوير مثالية، أتمتة المهام المتكررة، استخدام أدوات AI بذكاء، تنظيم الكود والمشاريع، وتقنيات التركيز العميق لكتابة كود أفضل في نصف الوقت.",
      price: 99, purchaseType: "instant", featured: false,
      categoryId: catDigital.id,
      coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    },
    {
      slug: "git-github-mastery-guide",
      title: "دليل احتراف Git وGitHub",
      shortDesc: "تعلم سير عمل Git الاحترافي من الأساسيات للمتقدم مع أفضل ممارسات العمل الجماعي.",
      description: "يحوّلك من مستخدم أوامر أساسية إلى محترف يُتقن Branching Strategies وRebase وCherry-pick وCI/CD عبر GitHub Actions. يشمل سيناريوهات العمل الجماعي الحقيقية وإدارة المستودعات بكفاءة.",
      price: 99, purchaseType: "instant", featured: false,
      categoryId: catDevTools.id,
      coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800",
    },
    {
      slug: "web-developer-starter-pack",
      title: "حزمة أدوات مطور الويب المبتدئ",
      shortDesc: "مجموعة منتقاة من أفضل الأدوات والموارد التي يحتاجها كل مطور ويب لبدء مشواره بصواب.",
      description: "قائمة موارد منظّمة تضم أفضل إضافات VS Code، مواقع التعلم الموثوقة، قوالب كود جاهزة، وأهم المهارات بالترتيب الصحيح. وفّر أشهراً من التجربة والخطأ في ملف واحد.",
      price: 129, purchaseType: "instant", featured: false,
      categoryId: catDigital.id,
      coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    },
    {
      slug: "freelancer-toolkit",
      title: "حقيبة أدوات المستقل المحترف",
      shortDesc: "قوالب عقود وفواتير وعروض أسعار جاهزة لإدارة عملك الحر باحترافية من اليوم الأول.",
      description: "كل ما تحتاجه في ملف واحد: قوالب عقود عمل احترافية، قالب فاتورة، قالب عرض سعر، نظام متابعة العملاء، قوالب بريد إلكتروني لكل مرحلة، وقائمة أدوات إدارة المشاريع المجانية والمدفوعة.",
      price: 119, purchaseType: "instant", featured: true,
      categoryId: catDigital.id,
      coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
    },
    {
      slug: "developer-workflow-system",
      title: "منظومة سير عمل المطور الفعّال",
      shortDesc: "نظام متكامل لتنظيم مشاريع التطوير وأتمتة المهام لتحقيق أعلى كفاءة وأقل فوضى.",
      description: "يحوّل فوضى مشاريعك إلى منظومة احترافية: نظام تنظيم المجلدات الموحّد، قالب README لكل مشروع، أتمتة بـ NPM hooks وScripts، إعداد ESLint/Prettier/Husky، ونظام Documentation سريع للمشاريع المتعددة.",
      price: 109, purchaseType: "instant", featured: false,
      categoryId: catDevTools.id,
      coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800",
    },
    {
      slug: "bug-hunting-guide",
      title: "دليل اصطياد الأخطاء البرمجية",
      shortDesc: "منهجية احترافية للعثور على الأخطاء البرمجية وتشخيصها وإصلاحها بسرعة وفاعلية.",
      description: "يعلّمك التفكير كـ Debugger محترف: استخدام Browser DevTools بالكامل، Debugging في Node.js وPython، قراءة Stack Traces بذكاء، تقنيات Breakpoints للـ Async Code، وكيف تكتب كوداً أقل أخطاءً من البداية.",
      price: 99, purchaseType: "instant", featured: false,
      categoryId: catDevTools.id,
      coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800",
    },
    {
      slug: "portfolio-website-template",
      title: "قالب موقع بورتفوليو احترافي",
      shortDesc: "قالب جاهز للاستخدام بتصميم احترافي وعصري مع كود نظيف وقابل للتخصيص الكامل في دقائق.",
      description: "قالب HTML/Next.js كامل يتضمن: صفحة رئيسية مؤثرة، معرض مشاريع مع فلترة، صفحة About تفصيلية، قسم شهادات، نموذج تواصل. Responsive كامل وكود موثّق ونظيف جاهز للنشر خلال 30 دقيقة.",
      price: 199, purchaseType: "instant", featured: true,
      categoryId: catTemplates.id,
      coverImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
    },
    {
      slug: "landing-page-template-pack",
      title: "حزمة قوالب صفحات الهبوط",
      shortDesc: "5 قوالب صفحات هبوط عصرية لمختلف المجالات مصممة لتحقيق أعلى معدل تحويل ممكن.",
      description: "حزمة تضم 5 قوالب مختلفة لـ: SaaS، منتجات رقمية، خدمات مهنية، تطبيقات موبايل، ومنتجات فيزيائية. كل قالب يتضمن Hero قوي وPricing وTestimonials وCTA محسّن. قابلة للتعديل الكامل.",
      price: 249, purchaseType: "instant", featured: false,
      categoryId: catTemplates.id,
      coverImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800",
    },
    {
      slug: "cyberpunk-portfolio-template",
      title: "قالب بورتفوليو Cyberpunk",
      shortDesc: "تصميم سيبرانك فريد ومبهر يجعلك تبرز من بين آلاف المنافسين ولا تُنسى أبداً.",
      description: "قالب بتصميم مستقبلي فريد يجمع Glitch effects وألوان Neon وParticle background تفاعلي وTypography مميزة. يُعرض بشكل مثالي على جميع الأجهزة رغم تعقيد تصميمه. للمطورين الذين يريدون الظهور.",
      price: 299, purchaseType: "instant", featured: false,
      categoryId: catTemplates.id,
      coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
    },
    {
      slug: "gaming-performance-optimization-guide",
      title: "دليل تحسين أداء الألعاب الشامل",
      shortDesc: "50+ صفحة لضبط إعدادات الكمبيوتر والألعاب للحصول على أعلى FPS وأسلس تجربة ممكنة.",
      description: "يغطي ضبط Windows لأقصى أداء للألعاب، تحسين إعدادات Nvidia وAMD، تقليل Ping، إصلاح مشاكل Stuttering وFrame Drops، وضبط تفصيلي للألعاب الشائعة. بدون الحاجة لتغيير أجهزتك في معظم الحالات.",
      price: 119, purchaseType: "instant", featured: false,
      categoryId: catGaming.id,
      coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    },
    {
      slug: "fps-boost-configuration-guide",
      title: "دليل رفع معدل الإطارات FPS",
      shortDesc: "خطوات مجرّبة لرفع FPS في جميع الألعاب عبر تحسين الإعدادات والبرامج دون تبديل الأجهزة.",
      description: "يغطي إعدادات Windows Registry المخفية، تحسين Driver Settings لـ Nvidia وAMD وIntel، استخدام Process Lasso، ضبط Resolution Scaling وGraphics Settings بذكاء، وتحسين Thermal Performance لتفادي Throttling.",
      price: 99, purchaseType: "instant", featured: false,
      categoryId: catGaming.id,
      coverImage: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800",
    },
    {
      slug: "advanced-cybersecurity-handbook",
      title: "الدليل الشامل للأمن السيبراني المتقدم",
      shortDesc: "مرجع احترافي 120+ صفحة يغطي اختبار الاختراق والأدوات المتقدمة والاستعداد للشهادات الدولية.",
      description: "يغطي منهجيات Penetration Testing الكاملة، أدوات Kali Linux الرئيسية، هجمات Web Application المتقدمة وكيفية الدفاع عنها، Network Security، Forensics الأساسي، والاستعداد لاختبارات CEH وOSCP.",
      price: 349, purchaseType: "instant", featured: false,
      categoryId: catCyber.id,
      coverImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800",
    },
  ];

  // ── Step 4: Service products (12) ────────────────────────
  const services = [
    {
      slug: "svc-website-security-audit",
      title: "فحص أمني شامل للموقع",
      shortDesc: "فحص احترافي لثغرات XSS وSQL Injection وCSRF مع تقرير مفصّل وخطوات إصلاح فورية.",
      description: "نمسح موقعك بأحدث أدوات الأمن السيبراني ونكشف كل نقطة ضعف مخفية. يُسلَّم تقرير احترافي يحدد كل ثغرة، درجة خطورتها، وخطوات إصلاحها خطوة بخطوة. مناسب للمواقع الحساسة وصفحات الدفع.",
      price: 1499, purchaseType: "contact", featured: true,
      categoryId: catCyberSvc.id,
      coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    },
    {
      slug: "svc-advanced-security-assessment",
      title: "تقييم أمني متقدم ومعمّق",
      shortDesc: "اختبار اختراق بأسلوب Black Box وGrey Box يحاكي هجمات حقيقية مع تقرير CVSS كامل.",
      description: "خدمة Penetration Testing شاملة تفحص Backend وFrontend وAPIs والسيرفر بالكامل، مع تحليل منطق الأعمال والصلاحيات. يُسلَّم تقرير تنفيذي مفصّل مع تصنيف CVSS وخطة علاج بالأولويات.",
      price: 2999, purchaseType: "contact", featured: false,
      categoryId: catCyberSvc.id,
      coverImage: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800",
    },
    {
      slug: "svc-malware-removal",
      title: "إزالة البرمجيات الخبيثة وتأمين الموقع",
      shortDesc: "تنظيف شامل للموقع المخترق من الفيروسات والـ Backdoors مع تأمينه ضد الهجمات المستقبلية.",
      description: "نتدخل فوراً لعزل التهديد وتنظيف جميع الملفات المصابة واستعادة الموقع لحالته الطبيعية، ثم نثبّت جدار حماية ونُغيّر جميع كلمات المرور ونضبط إعدادات أمان صارمة لضمان عدم تكرار الاختراق.",
      price: 1299, purchaseType: "contact", featured: false,
      categoryId: catCyberSvc.id,
      coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    },
    {
      slug: "svc-server-security-setup",
      title: "إعداد أمان الخادم بمعايير عالمية",
      shortDesc: "تهيئة Linux/VPS بأعلى معايير الأمان: Fail2Ban وSSH Keys وFirewall وSSL A+ ومراقبة السجلات.",
      description: "نضبط خادمك بمعايير أمان عالمية: تثبيت Fail2Ban وUFW، إعداد SSH Keys وتعطيل تسجيل الدخول بكلمة مرور، ضبط Nginx/Apache الآمن، تفعيل SSL بدرجة A+، التحديثات التلقائية، ونظام مراقبة الأنشطة المشبوهة.",
      price: 2499, purchaseType: "contact", featured: false,
      categoryId: catCyberSvc.id,
      coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    },
    {
      slug: "svc-landing-page-development",
      title: "تطوير صفحة هبوط احترافية",
      shortDesc: "صفحة هبوط عالية التحويل بتصميم عصري، أداء 90+ في PageSpeed، متوافقة مع جميع الأجهزة.",
      description: "نبني صفحة هبوط تحوّل الزوار إلى عملاء: تصميم UI/UX مخصص، Responsive كامل، تحسين Core Web Vitals، نموذج تواصل أو CTA احترافي، وتحسين SEO أساسي. التسليم خلال 3-5 أيام عمل.",
      price: 2499, purchaseType: "contact", featured: false,
      categoryId: catWebSvc.id,
      coverImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800",
    },
    {
      slug: "svc-portfolio-website-development",
      title: "تطوير موقع بورتفوليو شخصي",
      shortDesc: "موقع بورتفوليو فريد يعكس شخصيتك المهنية ويفتح أبواب الفرص أمامك.",
      description: "نصمم ونطوّر لك موقع بورتفوليو يبهر العملاء: تصميم مخصص بالكامل، معرض مشاريع، صفحة About قوية، قسم خدمات، نموذج تواصل، وتحسين SEO. يُسلَّم جاهزاً للنشر على أي استضافة.",
      price: 3999, purchaseType: "contact", featured: true,
      categoryId: catWebSvc.id,
      coverImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
    },
    {
      slug: "svc-business-website-development",
      title: "تطوير موقع شركة احترافي",
      shortDesc: "موقع شركة متكامل يعكس هويتك التجارية ويُقنع الزوار بالتعامل معك من أول زيارة.",
      description: "نبني موقع شركتك بالكامل: صفحة رئيسية مؤثرة، صفحات الخدمات والفريق والمدونة، نموذج تواصل احترافي، تكامل Google Analytics، وتحسين SEO كامل. مع دعم فني لمدة شهر بعد التسليم.",
      price: 4999, purchaseType: "contact", featured: false,
      categoryId: catWebSvc.id,
      coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
    },
    {
      slug: "svc-full-website-development",
      title: "تطوير موقع ويب كامل بلا قيود",
      shortDesc: "بناء موقع مخصص بالكامل من الصفر بـ Next.js مع Backend وAPI ولوحة تحكم إدارية.",
      description: "خدمة شاملة للمشاريع الجادة: تصميم UI/UX مخصص، تطوير Frontend وBackend، قاعدة بيانات، لوحة تحكم إدارية، نظام مصادقة، تحسين الأداء والأمان، نشر على السيرفر، ودعم فني شهر كامل.",
      price: 7999, purchaseType: "contact", featured: false,
      categoryId: catWebSvc.id,
      coverImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800",
    },
    {
      slug: "svc-website-performance-optimization",
      title: "تحسين سرعة وأداء الموقع",
      shortDesc: "نرفع درجة موقعك في Google PageSpeed وCore Web Vitals لتقليل معدل الارتداد وتحسين SEO.",
      description: "نحلل موقعك بالكامل ونطبّق تحسينات شاملة: ضغط الصور وتحويلها لـ WebP، Lazy Loading، تحسين CSS وJS، ضبط Caching وCDN، وتحسين Server Response Time. نضمن وصولك لـ 90+ في PageSpeed.",
      price: 1199, purchaseType: "contact", featured: false,
      categoryId: catWebSvc.id,
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    },
    {
      slug: "svc-bug-fixing-service",
      title: "خدمة إصلاح الأخطاء البرمجية",
      shortDesc: "تشخيص وإصلاح أي خطأ برمجي في موقعك بسرعة مع ضمان عدم التأثير على باقي الوظائف.",
      description: "نتخصص في تشخيص وإصلاح أي خطأ بغض النظر عن التقنية. نحلل Console Errors وServer Logs ونتتبع المشكلة حتى جذرها، نصلحها، ونشرح لك السبب لتتفادى تكراره. تسليم سريع خلال 24-48 ساعة.",
      price: 799, purchaseType: "contact", featured: true,
      categoryId: catWebSvc.id,
      coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800",
    },
    {
      slug: "svc-tech-career-consultation",
      title: "استشارة المسار المهني التقني",
      shortDesc: "جلسة إرشادية متخصصة لاختيار مسارك التقني الصحيح وبناء خطة مهنية واقعية وقابلة للتنفيذ.",
      description: "نجلس معك لفهم خلفيتك وأهدافك، ثم نضع خارطة طريق مخصصة لك: الفرق بين المسارات المختلفة، أيها يناسبك، وخطة دراسة عملية بجدول زمني واقعي. مناسبة للمبتدئين وتغيير المسار.",
      price: 599, purchaseType: "contact", featured: false,
      categoryId: catConsulting.id,
      coverImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
    },
    {
      slug: "svc-startup-tech-strategy",
      title: "جلسة استراتيجية تقنية للمشاريع الناشئة",
      shortDesc: "خارطة طريق تقنية شاملة لمشروعك الناشئ: اختيار التقنيات والبنية التحتية وخطة التنفيذ.",
      description: "نساعدك في اتخاذ القرارات التقنية الصحيحة من البداية: اختيار Tech Stack المناسب، تصميم بنية قابلة للتوسع، اختيار الاستضافة والخدمات، ووضع خطة MVP الأمثل. نتجنب معاً القرارات التي تكلّف غالياً لاحقاً.",
      price: 1299, purchaseType: "contact", featured: false,
      categoryId: catConsulting.id,
      coverImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800",
    },
  ];

  // ── Step 5: Upsert all products ───────────────────────────
  for (const p of [...digital, ...services]) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        title:        p.title,
        shortDesc:    p.shortDesc,
        description:  p.description,
        price:        p.price,
        purchaseType: p.purchaseType,
        coverImage:   p.coverImage,
        categoryId:   p.categoryId,
        featured:     p.featured,
        status:       "active",
      },
      create: {
        title:        p.title,
        slug:         p.slug,
        shortDesc:    p.shortDesc,
        description:  p.description,
        price:        p.price,
        purchaseType: p.purchaseType,
        coverImage:   p.coverImage,
        categoryId:   p.categoryId,
        featured:     p.featured,
        status:       "active",
      },
    });
    process.stdout.write(".");
  }

  console.log(`\n✅ تم إعداد ${digital.length} منتج رقمي و${services.length} خدمة`);
  console.log("🎉 تم إعادة هيكلة المتجر بنجاح");
}

main()
  .catch((e) => { console.error("❌ خطأ:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
