import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updates = [
  // ── Cybersecurity ────────────────────────────────────────
  {
    slug: "website-security-audit",
    title: "فحص أمني شامل للموقع",
    shortDesc: "فحص احترافي لثغرات الأمان في موقعك مع تقرير مفصّل وتوصيات إصلاح فورية.",
    description: "نقوم بمسح شامل لموقعك الإلكتروني باستخدام أحدث أدوات الأمن السيبراني للكشف عن كل ثغرة مخفية. تشمل الخدمة: فحص XSS وSQL Injection وCSRF وOpen Redirects وكشف المنافذ المفتوحة، مع تسليم تقرير احترافي يحدد كل ثغرة، درجة خطورتها، وخطوات إصلاحها خطوة بخطوة.",
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
  },
  {
    slug: "advanced-security-audit",
    title: "فحص أمني متقدم ومعمّق",
    shortDesc: "اختبار اختراق احترافي عميق يكشف الثغرات الخفية في البنية التحتية بالكامل.",
    description: "خدمة اختبار اختراق متقدمة تشمل فحص الـ Backend والـ Frontend والـ APIs والسيرفر بالكامل. نستخدم أساليب Black Box وGrey Box لمحاكاة هجمات حقيقية، مع تحليل منطق الأعمال والصلاحيات. يُسلَّم تقرير تنفيذي مفصّل مع تصنيف CVSS لكل ثغرة وخطة علاج أولويات.",
    coverImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800",
  },
  {
    slug: "bug-bounty-vulnerability-scan",
    title: "فحص ثغرات بأسلوب Bug Bounty",
    shortDesc: "كشف الثغرات بمنهجية صيادي المكافآت الاحترافيين مع توثيق كامل لكل ثغرة.",
    description: "نطبّق نفس منهجية المخترقين الأخلاقيين المحترفين في برامج Bug Bounty العالمية. نبحث عن الثغرات الحرجة كـ IDOR وBroken Auth وSensitive Data Exposure وBusiness Logic Bugs. كل ثغرة تُوثَّق بـ Proof of Concept كامل وتصنيف أثر وخطوات إعادة الاختراق وتوصيات الإصلاح.",
    coverImage: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800",
  },
  {
    slug: "website-malware-removal",
    title: "إزالة البرمجيات الخبيثة وتأمين الموقع",
    shortDesc: "تنظيف شامل للموقع من الفيروسات والبرمجيات الضارة مع تأمينه ضد الهجمات المستقبلية.",
    description: "إذا كان موقعك مخترقاً أو يحمل شيفرات خبيثة أو يُعيد توجيه الزوار، نتدخل فوراً. نقوم بعزل التهديد وتنظيف جميع الملفات المصابة واستعادة الموقع لحالته الطبيعية، ثم تركيب جدار حماية وضبط إعدادات أمان صارمة وتغيير جميع كلمات المرور لضمان عدم تكرار الاختراق.",
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
  },
  {
    slug: "security-hardening",
    title: "تقوية وتصليب الحماية الأمنية",
    shortDesc: "رفع مستوى حماية الموقع والسيرفر عبر إغلاق جميع منافذ الهجوم وتطبيق أفضل الممارسات.",
    description: "نراجع إعدادات الأمان الكاملة للموقع والخادم ونطبّق Security Hardening Checklist شامل: ضبط HTTP Security Headers، تفعيل CSP وHSTS وX-Frame-Options، تحديد صلاحيات الملفات، تعطيل الخدمات غير الضرورية، ضبط Firewall Rules، وتفعيل مراقبة الأنشطة المشبوهة.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
  },
  {
    slug: "server-security-setup",
    title: "إعداد أمان الخادم بشكل احترافي",
    shortDesc: "تهيئة احترافية للخادم بأعلى معايير الأمان لحماية بياناتك وتطبيقاتك من الهجمات.",
    description: "نضبط خادمك Linux/VPS بمعايير أمان عالمية: تثبيت وضبط Fail2Ban وUFW، إعداد SSH Keys وتعطيل تسجيل الدخول بكلمة مرور، ضبط إعدادات Nginx/Apache الآمنة، تثبيت SSL/TLS بإعدادات A+، ضبط التحديثات التلقائية الأمنية، وإعداد نظام مراقبة السجلات لرصد أي نشاط مشبوه.",
    coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
  },
  {
    slug: "wordpress-security-setup",
    title: "تأمين موقع WordPress بالكامل",
    shortDesc: "تقوية أمان WordPress وسد الثغرات الشائعة وحمايته من الاختراق والهجمات المتكررة.",
    description: "WordPress هدف رئيسي للهاكرز بسبب شيوعه. نقوم بتأمين شامل: تحديث النواة والإضافات والقوالب، حذف كل ما هو غير ضروري، تثبيت وضبط إضافة أمان قوية، إخفاء صفحة الدخول، تطبيق Two-Factor Authentication، ضبط صلاحيات الملفات، تفعيل WAF، وإعداد نسخ احتياطية تلقائية يومية.",
    coverImage: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800",
  },
  {
    slug: "api-security-review",
    title: "مراجعة أمان واجهات API",
    shortDesc: "فحص أمني شامل لواجهات API والتحقق من سلامة نظام المصادقة والصلاحيات وحماية البيانات.",
    description: "نراجع توثيق الـ API وننفذ اختبارات أمان شاملة تشمل: فحص OWASP API Top 10، اختبار JWT وOAuth وAPI Keys، فحص Rate Limiting وBrute Force Protection، التحقق من تشفير البيانات في الإرسال والتخزين، فحص CORS وCSRF، واختبار منطق الصلاحيات والـ Broken Object Level Authorization.",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
  },
  {
    slug: "login-system-security-check",
    title: "فحص أمان نظام تسجيل الدخول",
    shortDesc: "اختبار شامل لمنظومة المصادقة وكشف ثغرات تسجيل الدخول وهجمات CSRF وXSS وBrute Force.",
    description: "نركز بالكامل على نقطة الدخول الأكثر استهدافاً في أي تطبيق. نختبر مقاومة Brute Force وPassword Spraying، نفحص آلية استعادة كلمة المرور، نتحقق من صحة تنفيذ MFA، نختبر ثغرات Session Management وCookie Security وXSS في نماذج الدخول، ونتأكد من سلامة تشفير كلمات المرور في قاعدة البيانات.",
    coverImage: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800",
  },
  {
    slug: "cybersecurity-consultation",
    title: "استشارة أمن سيبراني متخصصة",
    shortDesc: "جلسة استشارية 30 دقيقة مع خبير أمن سيبراني لتقييم وضعك الأمني ووضع خارطة طريق.",
    description: "جلسة فردية مع خبير أمن سيبراني نناقش فيها وضعك الأمني الحالي ونحدد أولويات التحسين. سنراجع البنية التقنية لمشروعك ونقيّم المخاطر الأمنية الأعلى احتمالاً، ثم نضع خطة عملية واضحة بخطوات قابلة للتنفيذ حسب ميزانيتك وأولوياتك. مناسبة لأصحاب المشاريع والمطورين.",
    coverImage: "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=800",
  },

  // ── Web Development ──────────────────────────────────────
  {
    slug: "landing-page-development",
    title: "تطوير صفحة هبوط احترافية",
    shortDesc: "تصميم وتطوير صفحة هبوط عالية التحويل بتصميم عصري وأداء سريع ومتوافقة مع جميع الأجهزة.",
    description: "نبني لك صفحة هبوط تحوّل الزوار إلى عملاء. تشمل الخدمة: تصميم UI/UX احترافي مخصص، تطوير Responsive على جميع الشاشات، تحسين سرعة التحميل للحصول على 90+ في Google PageSpeed، دمج نموذج تواصل أو CTA واضح، تحسين SEO الأساسي، وتسليم كامل خلال 3-5 أيام عمل.",
    coverImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800",
  },
  {
    slug: "personal-portfolio-website",
    title: "موقع بورتفوليو شخصي متميز",
    shortDesc: "تصميم وتطوير موقع بورتفوليو احترافي يعرض مشاريعك بأسلوب يبهر العملاء ويفتح أبواب الفرص.",
    description: "بورتفوليوك هو بطاقة عملك الرقمية. نصمم لك موقعاً فريداً يعكس شخصيتك المهنية ويعرض مشاريعك بأفضل صورة. يشمل: تصميم حديث مخصص بالكامل، صفحة about قوية، معرض مشاريع مرتّب، قسم خدمات، نموذج تواصل، ربط وسائل التواصل الاجتماعي، وتحسين SEO لظهورك في نتائج البحث.",
    coverImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
  },
  {
    slug: "business-website-development",
    title: "موقع شركة احترافي ومتكامل",
    shortDesc: "تطوير موقع شركة متكامل يعكس هويتك المهنية ويجذب العملاء بتصميم عصري وأداء متميز.",
    description: "موقع شركتك هو أول انطباع لعملائك المحتملين. نبني لك موقعاً يقنع الزوار بالتعامل معك: صفحة رئيسية مؤثرة، صفحات الخدمات، من نحن، فريق العمل، شهادات العملاء، مدونة، نموذج تواصل احترافي. مع تحسين SEO كامل وتكامل Google Analytics وربط خرائط Google.",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
  },
  {
    slug: "full-website-development",
    title: "تطوير موقع ويب مخصص بالكامل",
    shortDesc: "بناء موقع ويب كامل من الصفر بأحدث التقنيات وأعلى معايير الجودة والأداء.",
    description: "خدمة تطوير شاملة لمن يريد الأفضل بلا قيود. نبني موقعك من الصفر بـ Next.js أو React أو أي تقنية تناسب مشروعك. يشمل: تصميم UI/UX مخصص، تطوير Frontend وBackend، قاعدة بيانات، لوحة تحكم إدارية، API كامل، نظام مصادقة، تحسين الأداء والأمان، نشر على السيرفر، ودعم فني لمدة شهر.",
    coverImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800",
  },
  {
    slug: "website-performance-optimization",
    title: "تحسين سرعة وأداء الموقع",
    shortDesc: "تسريع موقعك وتحسين أوقات التحميل للحصول على درجات مثالية في Google PageSpeed وCore Web Vitals.",
    description: "الموقع البطيء يطرد الزوار ويضرّ بالـ SEO. نحلل موقعك بالكامل ونطبّق تحسينات شاملة: ضغط الصور وتحويلها لـ WebP/AVIF، تفعيل Lazy Loading، تحسين Critical CSS، ضبط Caching وCDN، تقليل JavaScript وCSS، تحسين Font Loading، وضبط Server Response Time للحصول على 90+ في جميع مقاييس Core Web Vitals.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  },
  {
    slug: "seo-basic-optimization",
    title: "تحسين محركات البحث SEO الأساسي",
    shortDesc: "تهيئة موقعك لمحركات البحث وتحسين ظهوره في نتائج Google وزيادة الزيارات العضوية المجانية.",
    description: "نطبّق أساسيات SEO التقنية على موقعك: ضبط Meta Tags وOG Tags، إنشاء Sitemap وRobots.txt، تهيئة Schema Markup، ضبط Canonical URLs، تحسين سرعة الموقع، معالجة روابط 404، تحسين هيكل العناوين H1-H6، وتحليل الكلمات المفتاحية المستهدفة مع توصيات المحتوى.",
    coverImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800",
  },
  {
    slug: "bug-fixing-service",
    title: "خدمة إصلاح الأخطاء البرمجية",
    shortDesc: "اكتشاف وإصلاح الأخطاء والمشكلات التقنية في موقعك بسرعة واحترافية وضمان عدم تكرارها.",
    description: "هل موقعك يعاني من أخطاء تزعج المستخدمين؟ نتخصص في تشخيص وإصلاح أي خطأ برمجي بغض النظر عن التقنية المستخدمة. نحلل الـ Console Errors وServer Logs ونتتبع المشكلة حتى جذرها، نصلحها، ونتحقق من عدم التأثير على باقي الموقع. مع شرح سبب الخطأ لتتفادى تكراره.",
    coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800",
  },
  {
    slug: "ui-improvement-service",
    title: "تحسين واجهة المستخدم وتجربته",
    shortDesc: "رفع جودة تصميم الموقع وتحسين تجربة المستخدم لزيادة التفاعل ومعدلات التحويل.",
    description: "نراجع واجهة موقعك الحالية بعيون ناقدة ونُحدّث التصميم: تحسين التسلسل البصري والألوان والمسافات، رفع جودة الخطوط والأيقونات، تحسين تجربة الجوال، تطوير تفاعلات Micro-animations سلسة، تحسين نماذج الإدخال والـ CTA buttons، مع قياس مؤشرات الأداء قبل وبعد لإثبات التحسين.",
    coverImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800",
  },
  {
    slug: "website-redesign",
    title: "إعادة تصميم الموقع بأسلوب عصري",
    shortDesc: "تحديث شامل لتصميم موقعك بمظهر عصري يناسب 2025 ويُحسّن انطباع الزوار ومعدلات البقاء.",
    description: "موقعك القديم يؤثر سلباً على مصداقيتك. نُعيد تصميمه بالكامل بأسلوب حديث يحافظ على هويتك وينقلها للمستوى التالي. تشمل الخدمة: تصميم Figma كامل أولاً للموافقة، ثم تطوير احترافي مع الحفاظ على محتواك الحالي وSEO جيدك، مع تحسين بنية الصفحات وتجربة التصفح.",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
  },
  {
    slug: "website-deployment-setup",
    title: "نشر الموقع وإعداد الاستضافة",
    shortDesc: "رفع موقعك على السيرفر وضبط إعدادات الاستضافة والدومين وشهادة SSL بشكل احترافي وآمن.",
    description: "نتولى كل تفاصيل نشر موقعك: اختيار خطة الاستضافة المناسبة، ضبط DNS وربط الدومين، تثبيت وضبط SSL/TLS مجاني، إعداد CI/CD Pipeline للنشر التلقائي عند التعديل، ضبط Environment Variables بأمان، إعداد Backups تلقائية، وتحسين إعدادات الخادم لأفضل أداء.",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
  },

  // ── Consulting ───────────────────────────────────────────
  {
    slug: "tech-career-consultation",
    title: "استشارة مسار مهني في التقنية",
    shortDesc: "جلسة إرشادية متخصصة لمساعدتك في اختيار مسارك التقني الصحيح وبناء خطة مهنية واضحة.",
    description: "ضائع بين مسارات التقنية المتعددة؟ نجلس معك لفهم خلفيتك وأهدافك وميزانيتك من الوقت، ثم نضع خارطة طريق مخصصة لك. سنناقش الفرق بين Frontend وBackend وFullStack وDevOps وCybersecurity، نُحدد المسار الأنسب لشخصيتك واهتماماتك، ونعطيك خطة دراسة عملية بجدول زمني واقعي.",
    coverImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
  },
  {
    slug: "programming-mentorship-session",
    title: "جلسة تدريب برمجي فردي",
    shortDesc: "تدريب فردي مكثف على البرمجة مع مدرب متخصص لحل مشاكلك وتسريع تطورك التقني.",
    description: "جلسة تدريب فردية مع مطور محترف تُركّز على احتياجاتك تحديداً. سواء كنت تواجه مشكلة في كودك أو تريد فهم مفهوم معيّن أو مراجعة مشروعك، نجلس معك ونحلّها معاً. يشمل: مراجعة الكود وتقديم تغذية راجعة بناءة، شرح المفاهيم بأمثلة عملية، ونصائح للتطور السريع.",
    coverImage: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800",
  },
  {
    slug: "startup-tech-strategy",
    title: "استراتيجية تقنية للشركات الناشئة",
    shortDesc: "وضع خارطة طريق تقنية للمشاريع الناشئة تشمل اختيار التقنيات والبنية التحتية وخطة التنفيذ.",
    description: "قرارات التقنية الأولى تُحدد مستقبل مشروعك. نساعدك في اتخاذ القرارات الصحيحة منذ البداية: اختيار Tech Stack المناسب لحجم مشروعك وميزانيتك، تصميم بنية قابلة للتوسع، اختيار الاستضافة والخدمات المناسبة، وضع خطة MVP الأمثل، وتحديد الكفاءات التقنية التي تحتاج توظيفها أو الاستعانة بها.",
    coverImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800",
  },
  {
    slug: "website-idea-evaluation",
    title: "تقييم فكرة مشروعك الرقمي",
    shortDesc: "تحليل فكرة مشروعك من النواحي التقنية والتجارية وتقديم توصيات عملية وخارطة طريق واضحة.",
    description: "قبل أن تستثمر وقتك وأموالك، دعنا نُقيّم فكرتك بموضوعية. نحلل الجدوى التقنية والتنافسية، نُحدد التحديات المخفية، نقترح نموذج عمل مناسب، ونقيّم التكلفة الواقعية للتنفيذ. ستخرج من الجلسة بصورة واضحة: هل فكرتك قابلة للتنفيذ؟ وما أفضل طريقة للبدء؟",
    coverImage: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800",
  },
  {
    slug: "freelancing-advice-session",
    title: "استشارة العمل الحر والفريلانس",
    shortDesc: "جلسة متخصصة في استراتيجيات الفريلانس وبناء العلامة الشخصية وجذب العملاء وتحديد الأسعار.",
    description: "نجلس معك لوضع استراتيجية فريلانس فعّالة مخصصة لمجالك. سنناقش: كيف تبني بروفايلاً قوياً على Upwork وLinkedIn، كيف تسعّر خدماتك بثقة، كيف تجذب عملاء مميزين وتتعامل معهم، كيف تدير وقتك ومشاريعك المتعددة، وكيف تتجنب الأخطاء الشائعة التي تقع فيها أغلب المستقلين.",
    coverImage: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800",
  },

  // ── Digital Products ─────────────────────────────────────
  {
    slug: "cybersecurity-starter-guide",
    title: "دليل الأمن السيبراني للمبتدئين",
    shortDesc: "دليل شامل ومبسّط يأخذك من الصفر في عالم الأمن السيبراني بأمثلة عملية وخطوات واضحة.",
    description: "دليل PDF شامل مكوّن من 60+ صفحة يغطي كل ما يحتاج معرفته المبتدئ في الأمن السيبراني. يشمل: مفاهيم الأمن الأساسية، أنواع الهجمات الشائعة وكيف تحمي نفسك منها، أدوات الأمن المجانية الأساسية، كيف تبدأ تعلم Ethical Hacking، وخارطة طريق لمن يريد دخول مجال الأمن السيبراني باحترافية.",
    coverImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800",
  },
  {
    slug: "web-developer-starter-pack",
    title: "حزمة أدوات مطور الويب المبتدئ",
    shortDesc: "مجموعة منتقاة من أفضل الأدوات والموارد والمراجع التي يحتاجها كل مطور ويب لبدء مشواره.",
    description: "ملف PDF + قائمة موارد منظّمة تضم كل ما يحتاجه مطور الويب الجديد: أفضل الإضافات لـ VS Code، مواقع التعلم المجانية والمدفوعة، قوالب كود جاهزة للاستخدام، أفضل المكتبات والأدوات لكل مرحلة، روابط موثوقة لحل المشاكل، وقائمة بأهم المهارات التي يجب تعلمها بالترتيب الصحيح.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
  },
  {
    slug: "freelancer-toolkit",
    title: "حقيبة أدوات المستقل المحترف",
    shortDesc: "مجموعة متكاملة من الأدوات والقوالب والموارد لإدارة مشروعك الحر بكفاءة واحترافية.",
    description: "كل ما تحتاجه لإدارة عمل حر ناجح في ملف واحد: قوالب عقود عمل احترافية جاهزة للتعديل، قالب عرض سعر احترافي، قالب فاتورة بالعربي والإنجليزي، قائمة أدوات إدارة المشاريع المجانية والمدفوعة، نموذج متابعة العملاء، وقالب بريد إلكتروني احترافي لكل مرحلة من مراحل التعامل مع العميل.",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
  },
  {
    slug: "developer-productivity-guide",
    title: "دليل إنتاجية المطور المحترف",
    shortDesc: "منهجيات وتقنيات عملية لمضاعفة إنتاجيتك كمطور وإنجاز مشاريع أكثر في وقت أقل وبجودة أعلى.",
    description: "دليل عملي يكشف تقنيات وعادات المطورين الأكثر إنتاجية في العالم. يشمل: إعداد بيئة تطوير مثالية تختصر ساعات يومياً، تقنيات إدارة الوقت المخصصة للمطورين، أتمتة المهام المتكررة، استخدام أدوات الذكاء الاصطناعي بذكاء، تنظيم الكود والمشاريع، وتقنيات التركيز العميق لكتابة كود أفضل في نصف الوقت.",
    coverImage: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800",
  },
  {
    slug: "website-launch-checklist",
    title: "قائمة تحقق إطلاق الموقع",
    shortDesc: "قائمة شاملة من 50+ نقطة تضمن إطلاق موقعك بشكل صحيح خالٍ من الأخطاء ومُهيَّأ للنجاح.",
    description: "قائمة PDF تفصيلية تضمن أنك لن تنسى شيئاً عند إطلاق موقعك. تغطي 7 محاور رئيسية: الأداء والسرعة، الأمان والحماية، تحسين SEO، التوافق مع الأجهزة والمتصفحات، اختبار النماذج والروابط، إعداد Analytics والتتبع، ونقاط التجربة النهائية للمستخدم. وفّر على نفسك إصلاح مشاكل ما بعد الإطلاق.",
    coverImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
  },

  // ── Templates ────────────────────────────────────────────
  {
    slug: "portfolio-website-template",
    title: "قالب موقع بورتفوليو احترافي",
    shortDesc: "قالب بورتفوليو جاهز للاستخدام بتصميم احترافي وعصري مع كود نظيف وقابل للتخصيص بسهولة.",
    description: "قالب HTML/CSS/JS كامل أو Next.js لموقع بورتفوليو احترافي يمكنك تشغيله خلال 30 دقيقة. يتضمن: صفحة رئيسية مؤثرة مع Hero section، معرض مشاريع مع فلترة، صفحة About تفصيلية، قسم مهارات، قسم شهادات العملاء، نموذج تواصل، وربط وسائل التواصل الاجتماعي. Responsive كامل وكود موثّق ونظيف.",
    coverImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
  },
  {
    slug: "landing-page-template-pack",
    title: "حزمة قوالب صفحات هبوط متنوعة",
    shortDesc: "مجموعة من أجمل قوالب صفحات الهبوط العصرية بتصاميم متنوعة تناسب مختلف المجالات والأعمال.",
    description: "حزمة تضم 5 قوالب مختلفة لصفحات الهبوط مصممة لتحقيق أعلى معدل تحويل ممكن. تشمل قوالب لـ: SaaS، منتجات رقمية، خدمات مهنية، تطبيقات موبايل، ومنتجات فيزيائية. كل قالب يتضمن: Hero قوي، قسم Features، Pricing، Testimonials، FAQ، وCTA محسّن. قابلة للتعديل الكامل.",
    coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
  },
  {
    slug: "startup-landing-template",
    title: "قالب صفحة هبوط للشركات الناشئة",
    shortDesc: "قالب صفحة هبوط مصمم خصيصاً للشركات الناشئة يركز على جذب المستثمرين والمستخدمين الأوائل.",
    description: "قالب مُصمَّم بعناية للـ Startups الذين يحتاجون إلى إثبات فكرتهم بسرعة. يتضمن: صفحة رئيسية تحكي قصة المشروع بأسلوب مقنع، قسم Problem/Solution واضح، عرض المميزات الرئيسية، social proof وشهادات، نموذج Early Access أو Beta Signup، قسم الفريق، وصفحة سعر مرنة. مثالي للـ MVP.",
    coverImage: "https://images.unsplash.com/photo-1553484771-047a44eee27b?w=800",
  },
  {
    slug: "cyberpunk-portfolio-template",
    title: "قالب بورتفوليو بأسلوب Cyberpunk",
    shortDesc: "قالب بورتفوليو بتصميم سيبرانك فريد ومبهر يجعلك تبرز من بين آلاف المنافسين ولا تُنسى.",
    description: "قالب بورتفوليو بتصميم مستقبلي فريد يجمع بين الجمال البصري والأداء التقني العالي. يتميز بـ: Glitch effects مُحسَّنة، ألوان Neon على خلفية داكنة، انيميشن سلسة، Particle background تفاعلي، typography مميزة، وتصميم يجعل كل زائر يتذكرك. يُعرض بشكل مثالي على جميع الأجهزة رغم تعقيد تصميمه.",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
  },
  {
    slug: "developer-blog-template",
    title: "قالب مدونة المطورين التقنية",
    shortDesc: "قالب مدونة تقنية احترافي مصمم للمطورين مع تنسيق مثالي للكود والمقالات التقنية والـ Syntax Highlighting.",
    description: "قالب Next.js/MDX لمدونة تقنية مُحسَّنة بالكامل للمطورين. يشمل: Syntax Highlighting جميل لأكثر من 100 لغة برمجية، تصميم Reading-optimized مريح للعيون، نظام Tags وCategories، بحث سريع، Dark/Light mode، صفحة مؤلف، RSS Feed، SEO مثالي، سرعة تحميل فائقة، وتحليلات القراءة.",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
  },

  // ── Gaming ───────────────────────────────────────────────
  {
    slug: "gaming-performance-optimization-guide",
    title: "دليل تحسين أداء الألعاب الشامل",
    shortDesc: "دليل تفصيلي لضبط إعدادات الكمبيوتر والألعاب للحصول على أعلى أداء ممكن وتجربة لعب سلسة.",
    description: "دليل من 50+ صفحة يغطي كل جانب من جوانب تحسين أداء الألعاب على الكمبيوتر. يشمل: ضبط إعدادات Windows لأقصى أداء للألعاب، تحسين إعدادات كارت الشاشة Nvidia وAMD، ضبط إعدادات الشبكة لتقليل Ping، تحسين إعدادات كل لعبة شائعة بالتفصيل، إصلاح مشاكل Stuttering وFrame Drops، ومتى تحتاج لترقية أجهزتك.",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
  },
  {
    slug: "fps-boost-configuration-guide",
    title: "دليل رفع معدل الإطارات FPS",
    shortDesc: "خطوات مفصّلة ومُجرَّبة لرفع معدل الإطارات في جميع الألعاب عبر تحسين الإعدادات والبرامج.",
    description: "دليل عملي مُجرَّب لرفع الـ FPS دون الحاجة لتغيير الأجهزة في معظم الحالات. يغطي: ضبط إعدادات Windows Registry المخفية، تعطيل الخدمات المُثقِّلة، تحسين Driver Settings لـ Nvidia وAMD وIntel، استخدام أدوات كـ Process Lasso، ضبط Resolution Scaling وGraphics Settings بذكاء، وتحسين Thermal Performance لتفادي الـ Throttling.",
    coverImage: "https://images.unsplash.com/photo-1548686304-89d188a80029?w=800",
  },
  {
    slug: "ultimate-gaming-setup-guide",
    title: "الدليل الشامل لإعداد جيمينج احترافي",
    shortDesc: "كل ما تحتاجه لبناء وضبط إعداد جيمينج احترافي كامل من الألف إلى الياء.",
    description: "دليل شامل لكل جيمر يريد إعداداً احترافياً حقيقياً. يغطي: اختيار المكونات المناسبة لميزانيتك، ترتيب المكتب والإضاءة لأفضل تجربة، ضبط الشاشة والرزولوشن والـ Refresh Rate، إعداد الصوت والميكروفون، ضبط الفأرة ومعدل الـ DPI المثالي، أتمتة الإضاءة RGB، وكيف تصمم Corner Setup مريح لجلسات طويلة.",
    coverImage: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800",
  },
  {
    slug: "streaming-setup-guide",
    title: "دليل إعداد البث المباشر الاحترافي",
    shortDesc: "دليل تفصيلي للبدء في البث المباشر على Twitch وYouTube بجودة احترافية وإعداد صحيح من اليوم الأول.",
    description: "كل ما تحتاج معرفته قبل أول بث مباشر وبعده. يشمل: إعداد OBS Studio بشكل صحيح لأفضل جودة مع أقل CPU usage، ضبط إعدادات البث لـ Twitch وYouTube حسب اتصالك، تصميم Overlays وAlerts احترافية مجاناً، إعداد الإضاءة والصوت لجودة بث متميزة، بناء Community من الصفر، وكيف تبدأ تحقيق دخل من بثك.",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  },
  {
    slug: "gaming-pc-build-guide",
    title: "دليل تجميع جهاز جيمينج من الصفر",
    shortDesc: "خطوات واضحة لاختيار قطع الكمبيوتر وتجميعها وضبطها للحصول على أفضل أداء في ميزانيتك.",
    description: "دليل شامل من 70+ صفحة لكل من يريد تجميع جهاز جيمينج لأول مرة أو ترقية جهازه الحالي. يغطي: أفضل Builds حسب الميزانية ($500 / $800 / $1200 / $1500+)، كيف تختار كل قطعة وما أهم مواصفاتها، خطوات التجميع بالصور، تثبيت Windows بشكل صحيح، ضبط الـ BIOS والـ XMP، وأول 10 برامج تثبتها بعد التجميع.",
    coverImage: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800",
  },

  // ── Developer Tools ──────────────────────────────────────
  {
    slug: "vs-code-ultimate-setup-guide",
    title: "دليل إعداد VS Code المثالي للمطورين",
    shortDesc: "الإعدادات والإضافات والاختصارات التي تحوّل VS Code إلى بيئة تطوير لا مثيل لها في الإنتاجية.",
    description: "دليل PDF من 45+ صفحة يكشف كيف يُعدّ المطورون الأكثر إنتاجية في العالم بيئة تطويرهم. يشمل: أفضل 30 Extension مع شرح استخدام كل منها، ضبط Settings.json المثالي، أهم 50 Keyboard Shortcut توفّر لك ساعات، إعداد Snippets المخصصة، تهيئة Debugger الاحترافي، ضبط Themes والخطوط لراحة العيون، وIntegration مع Git.",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
  },
  {
    slug: "git-github-mastery-guide",
    title: "دليل احتراف Git وGitHub",
    shortDesc: "تعلم سير عمل Git الاحترافي من الأساسيات حتى المتقدم مع أفضل الممارسات وسيناريوهات العمل الجماعي.",
    description: "دليل شامل يحوّلك من مستخدم أوامر Git الأساسية إلى محترف يُتقن كل شيء. يغطي: أساسيات Git بالأمثلة العملية، استراتيجيات Branching (Git Flow / GitHub Flow)، كيفية التعامل مع Merge Conflicts، أوامر المتقدمة كـ Rebase وCherry-pick وBisect، إعداد GitHub Actions للـ CI/CD، حماية Branches وCode Review، وأفضل ممارسات Commit Messages.",
    coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800",
  },
  {
    slug: "developer-workflow-system",
    title: "منظومة سير عمل المطور الفعّال",
    shortDesc: "نظام متكامل لإدارة مشاريع التطوير وتنظيم الكود وأتمتة المهام لتحقيق أعلى كفاءة وأقل إجهاد.",
    description: "وثيقة نظام عمل شاملة تُحوّل فوضى مشاريعك إلى منظومة احترافية. تشمل: نظام تنظيم مجلدات المشاريع الموحّد، قالب README لكل مشروع، نظام تسمية Branches والـ Commits، أتمتة المهام المتكررة بـ Scripts وNPM hooks، إعداد ESLint وPrettier وHusky، نظام إدارة المهام اليومية، ونظام Documentation سريع.",
    coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800",
  },
  {
    slug: "bug-hunting-guide",
    title: "دليل اصطياد الأخطاء البرمجية",
    shortDesc: "منهجية احترافية للعثور على الأخطاء البرمجية وتشخيصها وإصلاحها بسرعة وفاعلية دون عناء.",
    description: "دليل عملي يعلّمك التفكير كـ Debugger محترف. يغطي: منهجية التفكير المنطقي في تشخيص الأخطاء، استخدام Browser DevTools بالكامل، تقنيات Debugging في Node.js وPython، قراءة Stack Traces وError Messages بذكاء، استخدام Breakpoints وWatch Variables، Debugging للـ Async Code والـ APIs، وكيف تكتب كوداً أقل أخطاءً من البداية.",
    coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800",
  },
  {
    slug: "full-stack-developer-roadmap",
    title: "خارطة طريق Full Stack Developer",
    shortDesc: "المسار الكامل والمفصّل لاحتراف تطوير الويب Full Stack مع الموارد والمشاريع العملية لكل مرحلة.",
    description: "خارطة طريق تفصيلية من 80+ صفحة تأخذك من الصفر إلى مطور Full Stack قابل للتوظيف. مقسّمة إلى 5 مراحل واضحة: HTML/CSS/JS الأساسي، Frontend مع React، Backend مع Node.js، قواعد البيانات والـ APIs، والـ DevOps الأساسي. لكل مرحلة: مدة زمنية واقعية، أفضل مصادر التعلم المجانية والمدفوعة، ومشروع عملي لبناء Portfolio.",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
  },

  // ── Premium Guides ───────────────────────────────────────
  {
    slug: "advanced-cybersecurity-handbook",
    title: "الدليل الشامل للأمن السيبراني المتقدم",
    shortDesc: "مرجع احترافي متكامل يغطي أساليب الهجوم والدفاع والأدوات والتقنيات المتقدمة في الأمن السيبراني.",
    description: "دليل مرجعي من 120+ صفحة للمحترفين والمتقدمين في مجال الأمن السيبراني. يغطي: منهجيات Penetration Testing الكاملة، أدوات Kali Linux الرئيسية واستخداماتها، هجمات Web Application المتقدمة والدفاع عنها، Network Security وAnalysis، Forensics الأساسي، كتابة Exploits بسيطة، والاستعداد لاختبارات CEH وOSCP وCPT.",
    coverImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800",
  },
  {
    slug: "complete-web-development-notes",
    title: "مذكرات تطوير الويب الكاملة",
    shortDesc: "ملاحظات تطوير ويب شاملة تغطي Frontend وBackend وقواعد البيانات وAPI بأسلوب مرجعي سريع الاستخدام.",
    description: "مجموعة مذكرات منظّمة ومكثّفة من 150+ صفحة تجمع أهم معلومات تطوير الويب في مكان واحد. تشمل: HTML5 وCSS3 المتقدم، JavaScript ES2024، React وNext.js، Node.js وExpress، SQL وNoSQL، REST APIs وGraphQL، Authentication وAuthorization، Deployment وDevOps الأساسي. مثالية كمرجع سريع أثناء العمل.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
  },
  {
    slug: "startup-tech-stack-guide",
    title: "دليل اختيار التقنيات لمشروعك",
    shortDesc: "منهجية علمية لاختيار Stack التقني المناسب لكل مشروع بناءً على المتطلبات والميزانية وحجم الفريق.",
    description: "دليل عملي يحل أكبر معضلة تواجه المطورين وأصحاب المشاريع: كيف تختار التقنيات الصحيحة؟ يغطي: مقارنة تفصيلية لأشهر Frameworks الـ Frontend والـ Backend، متى تختار SQL وmتى NoSQL، أفضل خيارات الاستضافة حسب الحجم والميزانية، متى تستخدم Microservices ومتى Monolith، وكيف تبني Architecture تتحمل النمو السريع.",
    coverImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800",
  },
  {
    slug: "ultimate-freelancer-playbook",
    title: "الدليل الذهبي للمستقل المحترف",
    shortDesc: "الاستراتيجية المتكاملة للنجاح في العمل الحر من إيجاد العملاء حتى التعاقد والتسعير وبناء السمعة.",
    description: "دليل شامل من 100+ صفحة لكل من يريد الاعتماد على الفريلانس كمصدر دخل رئيسي. يغطي: بناء بروفايل قاتل على Upwork وLinkedIn وPlatforms المختلفة، استراتيجية Proposal تفوز بالعقود، كيف تسعّر خدماتك وترفع أسعارك بثقة، إدارة العملاء الصعبين، بناء علاقات طويلة الأمد، التخصص والـ Niche Down، والتدرج نحو Agency.",
    coverImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
  },
  {
    slug: "ai-tools-for-developers-guide",
    title: "دليل أدوات الذكاء الاصطناعي للمطورين",
    shortDesc: "أهم أدوات الذكاء الاصطناعي التي تضاعف إنتاجية المطورين مع أمثلة استخدام عملية لكل أداة.",
    description: "دليل عملي يكشف كيف يستخدم أذكى المطورين في العالم أدوات الذكاء الاصطناعي لمضاعفة إنتاجيتهم. يغطي: GitHub Copilot واستخداماته المتقدمة، كيف تُعطي ChatGPT وClaude Prompts تقنية ذكية، أدوات توليد الكود والـ Code Review الآلي، أتمتة كتابة Tests والـ Documentation، أدوات تصميم UI بالذكاء الاصطناعي، وكيف تبني Workflows هجينة تجمع بين الذكاء البشري والاصطناعي.",
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800",
  },
];

async function main() {
  console.log(`🔄 تحديث ${updates.length} منتج...`);

  for (const u of updates) {
    await prisma.product.update({
      where: { slug: u.slug },
      data: {
        title:       u.title,
        shortDesc:   u.shortDesc,
        description: u.description,
        coverImage:  u.coverImage,
      },
    });
    process.stdout.write(".");
  }

  console.log(`\n✅ تم تحديث ${updates.length} منتج بنجاح`);
}

main()
  .catch((e) => { console.error("❌ خطأ:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
