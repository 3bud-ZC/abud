import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const cats = await Promise.all([
    prisma.blogCategory.upsert({ where: { slug: "development" }, update: {}, create: { name: "تطوير", slug: "development" } }),
    prisma.blogCategory.upsert({ where: { slug: "business" }, update: {}, create: { name: "بزنس", slug: "business" } }),
    prisma.blogCategory.upsert({ where: { slug: "design" }, update: {}, create: { name: "تصميم", slug: "design" } }),
  ]);
  const [dev, biz, des] = cats;

  const posts = [
    {
      title: "كيف تبني موقع ويب احترافي في 2026 — الدليل الكامل",
      slug: "professional-website-development-guide-2026",
      excerpt: "من الفكرة حتى النشر — خطوات عملية لبناء موقع ويب عالي الأداء ومحسّن لمحركات البحث.",
      content: `<h2>لماذا الموقع الاحترافي مهم؟</h2><p>90% من العملاء يبحثون عنك أونلاين قبل التعامل. موقع ضعيف = فقدان ثقة.</p><h2>الخطوة 1: التخطيط</h2><ul><li><strong>الهدف:</strong> بيع، عرض أعمال، أو تواصل؟</li><li><strong>الجمهور:</strong> من هم زوارك المستهدفون؟</li><li><strong>المحتوى:</strong> ماذا تريد أن يروا؟</li></ul><h2>الخطوة 2: التقنيات الحديثة</h2><p><strong>Next.js 14:</strong> SSR لـ SEO، سريع، ومحمّل مسبقاً.<br><strong>Tailwind CSS:</strong> تصميم سريع ومتجاوب.<br><strong>TypeScript:</strong> كود نظيف وخالي من الأخطاء.</p><h2>الخطوة 3: الأداء الضروري</h2><ul><li>LCP أقل من 2.5 ثانية</li><li>Mobile-first design</li><li>SEO متكامل (meta tags, sitemap)</li><li>SSL certificate</li></ul><h2>تكلفة الموقع الاحترافي</h2><p>بسيط: 500-1500$<br>متوسط: 2000-5000$<br>متقدم: 6000-15000$</p><h2>الخلاصة</h2><p>الموقع ليس مجرد صفحة — هو استثمار في مستقبل عملك.</p>`,
      tags: ["تطوير مواقع", "web development", "Next.js", "SEO"], readTime: 8, cat: dev.id,
    },
    {
      title: "أدوات الذكاء الاصطناعي التي غيرت طريقة عملي في 2026",
      slug: "ai-tools-changed-my-workflow-2026",
      excerpt: "الأدوات الفعلية التي أستخدمها يومياً — من كتابة الكود إلى إدارة المشاريع والعملاء.",
      content: `<h2>لماذا AI ليس خياراً الآن؟</h2><p>المطور الذي لا يستخدم AI ينتج 1/3工作量. المنافسون يستخدمونه بالفعل.</p><h2>الأدوات التي أستخدمها يومياً</h2><h3>1. Cursor IDE (بدل VS Code)</h3><p>يكتب 70% من الكود بنفسه. يفهم سياق المشروع كامل.</p><h3>2. Claude Sonnet 3.5</h3><p>للمهام الطويلة — كتابة وثائق، تحليل كود، تخطيط مشاريع.</p><h3>3. GitHub Copilot</h3><p>للكود السريع والـ snippets الشائعة.</p><h3>4. Perplexity AI</h3><p>بحث دقيق مع مصادر حقيقية — أفضل من Google للمسائل التقنية.</p><h2>كيف دمجتها في سير العمل؟</h2><p><strong>صباح:</strong> Perplexity للبحث ودراسة متطلبات المشروع.<br><strong>تطوير:</strong> Cursor + Copilot للكتابة السريعة.<br><strong>مراجعة:</strong> Claude للـ code review وتحسين الأداء.</p><h2>النتيجة؟</h2><p>أكتب نفس الكود في 30% من الوقت، وأركز على الـ logic والـ architecture.</p><h2>الخلاصة</h2><p>AI ليس مستقبل — هو حاضر. ابدأ اليوم بأداة واحدة.</p>`,
      tags: ["ذكاء اصطناعي", "AI tools", "Cursor", "Claude"], readTime: 7, cat: dev.id,
    },
    {
      title: "أتمتة الأعمال: كيف وفرت 20 ساعة أسبوعياً لعملائي",
      slug: "business-automation-save-20-hours-weekly",
      excerpt: "دراسات حالة حقيقية — من الردود التلقائية إلى إدارة المشاريع، كيف الأتمتة تغير الأعمال.",
      content: `<h2>المشكلة المشتركة</h2><p>أصحاب الأعمال الصغيرة يقضون 60% من وقتهم في مهام متكررة.</p><h2>حالة 1: متجر إلكتروني</h2><p><strong>المشكلة:</strong> 4 ساعات يومياً في الردود والطلبات.<br><strong>الحل:</strong> بوت تيليجرام + Zapier automation.<br><strong>النتيجة:</strong> 20 ساعة/أسبوع توفير + رضا عملاء 95%.</p><h2>حالة 2: وكالة تسويق</h2><p><strong>المشكلة:</strong> إدارة 10 عملاء يدوياً.<br><strong>الحل:</strong> Notion database + Slack notifications.<br><strong>النتيجة:</strong> 15 ساعة/أسبوع توفير + تقارير تلقائية.</p><h2>حالة 3: مطور مستقل</h2><p><strong>المشكلة:</strong> تتبع الوقت والفواتير يدوياً.<br><strong>الحل:</strong> Toggl + Stripe API.<br><strong>النتيجة:</strong> 8 ساعات/أسبوع توفير + تحصيل أسرع.</p><h2>أدوات الأتمتة التي أوصي بها</h2><ul><li><strong>Zapier/Make:</strong> ربط التطبيقات بدون برمجة</li><li><strong>Notion:</strong> إدارة المشاريع والعملاء</li><li><strong>Telegram Bots:</strong> التواصل والتنبيهات</li><li><strong>Calendly:</strong> جدولة المواعيد تلقائياً</li></ul><h2>الخلاصة</h2><p>الأتمتة ليست للشركات الكبيرة فقط — صاحب العمل الصغير هو من يحتاجها أكثر.</p>`,
      tags: ["أتمتة", "automation", "Zapier", "Notion"], readTime: 9, cat: dev.id,
    },
    {
      title: "بوتات تيليجرام: من الفكرة حتى العملاء الدائمين",
      slug: "telegram-bots-idea-to-paying-clients",
      excerpt: "كيف بنيت أول بوت تيليجرام وجلبت منه 50 عميل في 3 أشهر — الخطوات العملية.",
      content: `<h2>لماذا تيليجرام وليس WhatsApp؟</h2><p>تيليجرام: API مفتوح، لا حدود للرسائل، bots قوية.<br>WhatsApp: محدود، مكلف، API معقد.</p><h2>أول بوت: خدمة عملاء آلية</h2><p><strong>الفكرة:</strong> رد تلقائي على الأسئلة الشائعة.<br><strong>التقنية:</strong> Python + python-telegram-bot.<br><strong>المميزات:</strong> قائمة أسئلة، تواصل مباشر، تذكيرات.</p><h2>كيف جلبت العملاء؟</h2><h3>الشهر الأول</h3><p>نشرت في 5 مجموعات متخصصة. 10 مستخدمين فقط.</p><h3>الشهر الثاني</h3><p>أضفت feature جديد: حفظ المحادثات. 50 مستخدم جديد.</p><h3>الشهر الثالث</h3><p>بدأت أقدم بوتات مخصصة. أول 3 عملاء مدفوعين.</p><h2>أنواع البوتات التي تباع</h2><ul><li><strong>خدمة عملاء:</strong> 500-1500$</li><li><strong>تسويق:</strong> 800-2000$</li><li><strong>إدارة:</strong> 1000-3000$</li><li><strong>مخصص:</strong> 2000-5000$</li></ul><h2>الخلاصة</h2><p>البوت ليس مجرد أداة — هو منتج يولد دخل شهري.</p>`,
      tags: ["بوتات تيليجرام", "Telegram bots", "Python", "كسب المال"], readTime: 8, cat: dev.id,
    },
    {
      title: "الأمن السيبراني للمطورين: كيف حمت موقعي من 1000 هجوم",
      slug: "cybersecurity-developers-protection-guide",
      excerpt: "تجربة عملية في تأمين موقع ويب — من الـ XSS حتى DDoS، والخطوات التي منعت الاختراق.",
      content: `<h2>ماذا حدث؟</h2><p>في 6 أشهر، تلقى موقعي 1,247 محاولة اختراق. 0 نجح.</p><h2>الهجمات الشائعة</h2><h3>1. XSS (Cross-Site Scripting)</h3><p><strong>المحاولة:</strong> إدخال JavaScript في الـ comments.<br><strong>الحماية:</strong> DOMPurify + CSP headers.<br><strong>النتيجة:</strong> 347 محاولة، 0 نجاح.</p><h3>2. SQL Injection</h3><p><strong>المحاولة:</strong> ' OR '1'='1 في login forms.<br><strong>الحماية:</strong> Prisma ORM + parameterized queries.<br><strong>النتيجة:</strong> 213 محاولة، 0 نجاح.</p><h3>3. Rate Limiting</h3><p><strong>المشكلة:</strong> 500 requests/second من IP واحد.<br><strong>الحل:</strong> Redis rate limiting.<br><strong>النتيجة:</strong> تم حظر 89 IP.</p><h2>الأدوات التي أستخدمها</h2><ul><li><strong>Cloudflare:</strong> DDoS protection + WAF</li><li><strong>Prisma:</strong> SQL injection prevention</li><li><strong>Helmet.js:</strong> Security headers</li><li><strong>Auth.js:</strong> Secure authentication</li></ul><h2>النتيجة النهائية</h2><p>الموقع يعمل 99.9% uptime. لا اختراقات. ثقة العملاء زادت 40%.</p><h2>الخلاصة</h2><p>الأمن ليس خياراً — هو جزء أساسي من التطوير الجيد.</p>`,
      tags: ["أمن سيبراني", "cybersecurity", "حماية", "Cloudflare"], readTime: 10, cat: dev.id,
    },
    {
      title: "Python لتطوير البوتات: لماذا هو الخيار الأفضل في 2026",
      slug: "python-telegram-bots-best-choice-2026",
      excerpt: "لماذا Python تتفوق على JavaScript في بوتات تيليجرام — من الأداء حتى المكتبات المتاحة.",
      content: `<h2>Python vs JavaScript للبوتات</h2><p>JavaScript: Node.js + telegraf.js<br>Python: python-telegram-bot + asyncio</p><h2>لماذا Python أفضل؟</h2><h3>1. المكتبات المتاحة</h3><ul><li><strong>python-telegram-bot:</strong> 20K+ stars، وثائق كاملة</li><li><strong>aiogram:</strong> async أسرع 3x</li><li><strong>pyTelegramBotAPI:</strong> بسيط للمبتدئين</li></ul><h3>2. الأداء</h3><p>Python async يتعامل مع 10,000 رسالة/دقيقة بسهولة.</p><h3>3. النظام البيئي</h3><ul><li><strong>Pandas:</strong> تحليل البيانات</li><li><strong>Requests:</strong> API calls</li><li><strong>SQLAlchemy:</strong> قواعد البيانات</li></ul><h2>مثال عملي: بوت إدارة طلبات</h2><pre><code>from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters
import sqlite3

async def handle_order(update: Update, context):
    # حفظ الطلب في قاعدة البيانات
    # إشعار المدير
    # رد تلقائي للعميل</code></pre><h2>الخلاصة</h2><p>Python ليست مجرد لغة — هي نظام بيئي كامل للبوتات الاحترافية.</p>`,
      tags: ["Python", "بوتات تيليجرام", "async", "development"], readTime: 8, cat: dev.id,
    },
    {
      title: "تصميم المواقع الحديث: Tailwind vs CSS Modules في 2026",
      slug: "tailwind-vs-css-modules-modern-design",
      excerpt: "مقارنة عميقة بين Tailwind CSS وCSS Modules — متى تستخدم كل منهما في مشاريع حقيقية.",
      content: `<h2>المعركة الكبرى</h2><p>Tailwind: utility-first<br>CSS Modules: scoped styles</p><h2>متى تستخدم Tailwind؟</h2><h3>✅ المشاريع المناسبة</h3><ul><li>Landing pages وMarketing sites</li><li>Dashboard وAdmin panels</li><li>عندما تحتاج تصميم سريع</li><li>الفريلانسر والمشاريع الصغيرة</li></ul><h3>❌ لا تستخدمه لـ</h3><ul><li>تطبيقات معقدة جداً</li><li>عندما تحتاج CSS مخصص بكثافة</li><li>الفرق الكبيرة التي تحب CSS تقليدي</li></ul><h2>متى تستخدم CSS Modules؟</h2><h3>✅ المشاريع المناسبة</h3><ul><li>تطبيقات React/Next.js معقدة</li><li>عندما تحتاج dynamic styles</li><li>الفرق التي تفضل CSS عادي</li></ul><h2>الحل الأفضل: Hybrid</h2><p>استخدم Tailwind لـ 80% من التصميم + CSS Modules للـ 20% المعقدة.</p><h2>رأيي الشخصي</h2><p>للمشاريع الجديدة: ابدأ بـ Tailwind. للفرق الكبيرة: CSS Modules.</p><h2>الخلاصة</h2><p>الأداة الأفضل تعتمد على المشروع والفريق. لا توجد إجابة واحدة للجميع.</p>`,
      tags: ["Tailwind CSS", "CSS Modules", "web design", "frontend"], readTime: 9, cat: des.id,
    },
    {
      title: "كيف تستخدم Claude 3.5 في تطوير المشاريع الكبيرة",
      slug: "claude-3-5-large-projects-development",
      excerpt: "استراتيجيات متقدمة لاستخدام Claude في المشاريع الكبيرة — من Architecture حتى Code Review.",
      content: `<h2>لماذا Claude 3.5 للمشاريع الكبيرة؟</h2><p>Context window 200K tokens — يفهم مشروعك كامل.</p><h2>استخدامات متقدمة</h2><h3>1. System Architecture</h3><p>"صمم architecture لتطبيق SaaS بـ microservices، React, Node.js, PostgreSQL"</p><h3>2. Database Design</h3><p>"صمم schema لموقع ecommerce مع users, products, orders, reviews"</p><h3>3. API Documentation</h3><p>"اكتب OpenAPI docs لـ REST API بـ authentication وrate limiting"</p><h3>4. Code Review</h3><p>الصق الكود كامل واسأل: "مراجعة الأداء والأمان والـ best practices"</p><h3>5. Migration Scripts</h3><p>"اكتب migration script من MySQL إلى PostgreSQL"</p><h2>Workflow الفعلي</h2><p><strong>صباح:</strong> تخطيط مع Claude<br><strong>تطوير:</strong> Claude + Cursor<br><strong>مراجعة:</strong> Claude code review<br><strong>وثائق:</strong> Claude يكتب README</p><h2>النتيجة</h2><p>مشروع كبير يكتمل في نصف الوقت مع جودة أعلى.</p><h2>الخلاصة</h2><p>Claude ليس مساعد — هو شريك تطوير.</p>`,
      tags: ["Claude 3.5", "AI", "architecture", "large projects"], readTime: 9, cat: dev.id,
    },
    {
      title: "CI/CD للمطورين المستقلين: GitHub Actions + VPS",
      slug: "freelancer-cicd-github-actions-vps",
      excerpt: "كيف تبني CI/CD pipeline احترافي لمشاريعك كفريلانسر — نشر تلقائي واختبارات وrollback.",
      content: `<h2>لماذا CI/CD للفريلانسر؟</h2><p>العماء يحبون التحديثات التلقائية. أنت تحب وقتك.</p><h2>الـ Pipeline الكامل</h2><h3>1. Tests</h3><pre><code>- name: Run Tests
  run: npm run test</code></pre><h3>2. Build</h3><pre><code>- name: Build
  run: npm run build</code></pre><h3>3. Deploy</h3><pre><code>- name: Deploy
  uses: appleboy/ssh-action@v1
  with:
    script: |
      cd /var/www/project
      git pull origin main
      npm ci --production
      npm run build
      pm2 restart project</code></pre><h3>4. Health Check</h3><pre><code>- name: Health Check
  run: curl -f https://yourdomain.com/api/health</code></pre><h2>Advanced Features</h2><ul><li><strong>Rollback:</strong> إذا فشل الـ deploy</li><li><strong>Notifications:</strong> Slack/Telegram على كل deploy</li><li><strong>Staging:</strong> اختبار على staging أولاً</li></ul><h2>التكلفة</h2><p>GitHub Actions: مجاني للـ public repos<br>VPS: 5-10$/شهر</p><h2>الخلاصة</h2><p>ساعتان إعداد = ساعات توفير أسبوعياً.</p>`,
      tags: ["CI/CD", "GitHub Actions", "VPS", "freelancing"], readTime: 8, cat: dev.id,
    },
    {
      title: "VPS الأمني: كيف حمت سيرفري من 5000 هجوم شهرياً",
      slug: "secure-vps-protection-5000-attacks",
      excerpt: "تجربة عملية في تأمين VPS — من Firewall حتى Fail2Ban، والنتائج الفعلية بعد 6 أشهر.",
      content: `<h2>الإحصائيات الحقيقية</h2><p>6 أشهر = 31,847 محاولة هجوم<br>0 اختراق ناجح<br>99.98% uptime</p><h2>طبقات الحماية</h2><h3>1. Cloudflare (الطبقة الأولى)</h3><ul><li>DDoS protection</li><li>WAF rules</li><li>Bot Fight Mode</li></ul><h3>2. UFW Firewall</h3><pre><code>sudo ufw default deny incoming
sudo ufw allow ssh
sudo ufw allow 80,443/tcp
sudo ufw enable</code></pre><h3>3. Fail2Ban</h3><pre><code>sudo apt install fail2ban
# حظر 10 محاولات SSH فاشلة في 10 دقائق</code></pre><h3>4. Security Headers</h3><pre><code>add_header X-Frame-Options DENY
add_header X-Content-Type-Options nosniff
add_header X-XSS-Protection "1; mode=block"</code></pre><h3>5. Rate Limiting</h3><p>Nginx: 10 requests/second per IP</p><h2>النتائج</h2><p><strong>SSH attacks:</strong> 12,453 محاولة، 0 نجاح<br><strong>Web attacks:</strong> 19,394 محاولة، 0 نجاح<br><strong>Blocked IPs:</strong> 1,247 IP</p><h2>الخلاصة</h2><p>الأمن ليس خيار — هو ضرورة. 5 دقائق إعداد يومياً = سلامة كاملة.</p>`,
      tags: ["VPS", "security", "firewall", "Fail2Ban"], readTime: 10, cat: dev.id,
    },
    {
      title: "Zapier vs n8n vs Make: أي منصة أتمتة أفضل لعملك؟",
      slug: "zapier-vs-n8n-vs-make-automation-comparison",
      excerpt: "مقارنة شاملة بين منصات الأتمتة الثلاث — التكلفة، المميزات، ومتى تستخدم كل منها.",
      content: `<h2>المقارنة السريعة</h2><table><tr><th>المنصة</th><th>التكلفة</th><th>الاستضافة</th><th>الصعوبة</th></tr><tr><td>Zapier</td><td>20-200$/شهر</td><td>Cloud</td><td>سهل جداً</td></tr><tr><td>n8n</td><td>مجاني</td><td>Self-hosted</td><td>متوسط</td></tr><tr><td>Make</td><td>9-50$/شهر</td><td>Cloud</td><td>متوسط</td></tr></table><h2>متى تستخدم Zapier؟</h2><h3>✅ مناسب لـ</h3><ul><li>المبتدئين تماماً</li><li>الشركات التي تريد حل جاهز</li><li>عندما الميزانية ليست مشكلة</li></ul><h3>❌ ليس لـ</h3><ul><li>الفريلانسر والشركات الصغيرة</li><li>عندما تتحكم في بياناتك</li></ul><h2>متى تستخدم n8n؟h2><h3>✅ مناسب لـ</h3><ul><li>المطورين والفريلانسر</li><li>عندما تريد استضافة ذاتية</li><li>العمليات المعقدة</li></ul><h3>❌ ليس لـ</h3><ul><li>المبتدئين في التقنية</li><li>عندما تريد صيانة صفرية</li></ul><h2>متى تستخدم Make؟h2><h3>✅ مناسب لـ</h3><ul><li>الوسط بين Zapier وn8n</li><li>العمليات البصرية</li><li>التكاملات المعقدة</li></ul><h2>رأيي الشخصي</h2><p><strong>ابدأ بـ n8n</strong> — مجاني وقوي.<br><strong>انتقل لـ Zapier</strong> إذا احتجت دعم فني.<br><strong>استخدم Make</strong> للعمليات البصرية المعقدة.</p><h2>الخلاصة</h2><p>الأداة الأفضل تعتمد على احتياجك وميزانيتك.</p>`,
      tags: ["Zapier", "n8n", "Make", "automation", "comparison"], readTime: 9, cat: biz.id,
    },
    {
      title: "TypeScript في 2026: هل لا يزال ضرورياً للمطورين؟",
      slug: "typescript-2026-still-relevant",
      excerpt: "تحليل عميق لمستقبل TypeScript — هل AI سيحل محله أم لا يزال ضرورياً في عصر Claude وCursor؟",
      content: `<h2>السؤال الكبير</h2><p>مع Claude وCursor، هل TypeScript لا يزال ضرورياً؟</p><h2>لماذا TypeScript أصبح أهم</h2><h3>1. AI يخطئ</h3><p>Claude يكتب JavaScript أحياناً bugs. TypeScript يكتشفها مبكراً.</p><h3>2. المشاريع الكبيرة</h3><p>10+ مطورين = TypeScript ضروري للتنسيق.</p><h3>3. الـ Ecosystem</h3><p>كل المكتبات الجديدة بـ TypeScript. Next.js, React, Prisma...</p><h2>متى تستخدم TypeScript؟</h2><h3>✅ ضروري لـ</h3><ul><li>المشاريع الكبيرة (>10K lines)</li><li>الفرق (>3 مطورين)</li><li>المشاريع طويلة الأجل</li></ul><h3>❌ يمكن تجنبه لـ</h3><ul><li>المشاريع الصغيرة (<1K lines)</li><li>المشاريع السريعة (prototypes)</li><li>الفريلانسر بمفرده</li></ul><h2>الخلاصة</h2><p>TypeScript ليس ضرورياً لكل شيء، لكنه ضروري لكل شيء مهم.</p>`,
      tags: ["TypeScript", "AI", "Claude", "development"], readTime: 7, cat: dev.id,
    },
    {
      title: "REST API بـ Next.js App Router: الطريقة الحديثة في 2026",
      slug: "nextjs-app-router-api-routes-2026",
      excerpt: "لماذا تتخلى عن Express وتستخدم Next.js API Routes — الأداء، الأمان، والتكامل السهل.",
      content: `<h2>لماذا Next.js API Routes وليس Express؟</h2><p>Express: server منفصل<br>Next.js: API + Frontend في نفس project</p><h2>المميزات</h2><ul><li><strong>Serverless:</strong> لا تحتاج VPS للـ API</li><li><strong>TypeScript:</strong> مدمج افتراضياً</li><li><strong>Security:</strong> CSRF protection مدمج</li><li><strong>Performance:</strong> Edge functions متاحة</li></ul><h2>أول API Route</h2><pre><code>// app/api/users/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}</code></pre><h2>CRUD كامل</h2><pre><code>// GET /api/users
export async function GET() { ... }

// POST /api/users
export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}</code></pre><h2>Authentication</h2><pre><code>import { getServerSession } from 'next-auth';
export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' });
}</code></pre><h2>الخلاصة</h2><p>Next.js API Routes = أسرع تطوير + أمان أفضل + deployment أسهل.</p>`,
      tags: ["Next.js", "API Routes", "REST API", "backend"], readTime: 8, cat: dev.id,
    },
    {
      title: "Prompt Engineering للمطورين: احصل على أفضل نتائج من Claude وCursor",
      slug: "prompt-engineering-developers-claude-cursor",
      excerpt: "تقنيات متقدمة لكتابة prompts فعالة للمشاريع البرمجية — من debugging حتى architecture.",
      content: `<h2>لماذا Prompt Engineering مهم؟</h2><p>Claude وCursor أقوى من ChatGPT للمطورين — لكن فقط مع الـ prompts الصحيحة.</p><h2>تقنيات متقدمة</h2><h3>1. Role-Based Prompting</h3><p>"أنت senior developer مع 15 سنة خبرة في React وNode.js..."</p><h3>2. Context First</h3><p>"أنا أبني SaaS platform بـ Next.js 14، Prisma، PostgreSQL..."</p><h3>3. Chain of Thought</h3><p>"فكر خطوة بخطوة: 1. تحليل المشكلة 2. تصميم الحل 3. كتابة الكود"</p><h2>Prompts للمهام المختلفة</h2><h3>Debugging</h3><p>"هذا الكود يعطي error X. الصق الكود كامل واشرح المشكلة بالعربي ثم أصلحها."</p><h3>Architecture</h3><p>"صمم architecture لتطبيق SaaS بـ microservices. وضح الـ services والـ communication بينها."</p><h3>Code Review</h3><p>"مراجعة هذا الكود من ناحية: 1. Performance 2. Security 3. Best practices 4. Readability"</p><h3>Migration</h3><p>"اكتب migration script من MySQL إلى PostgreSQL مع تحويل الـ data types الصحيحة."</p><h2>الأخطاء الشائعة</h2><ul><li>الـ prompt عام جداً</li><li>لا تعطي context كافٍ</li><li>لا تحدد المخرجات المطلوبة</li></ul><h2>الخلاصة</h2><p>Prompt جيد = Claude يوفر 50% من وقت التطوير.</p>`,
      tags: ["prompt engineering", "Claude", "Cursor", "AI"], readTime: 7, cat: dev.id,
    },
    {
      title: "React Server Components vs Client Components: متى تستخدم كل منهما؟",
      slug: "react-server-vs-client-components-2026",
      excerpt: "فهم الفرق بين Server وClient Components في Next.js 14 — متى تستخدم كل منهما والأداء.",
      content: `<h2>المفهوم الأساسي</h2><p><strong>Server Components:</strong> تعمل على السيرفر، لا تصل JavaScript للـ client<br><strong>Client Components:</strong> تعمل في المتصفح، تدعم useState وuseEffect</p><h2>Server Components (الافتراضي)</h2><pre><code>// app/page.tsx - Server Component
async function Page() {
  const posts = await prisma.post.findMany();
  return <PostList posts={posts} />;
}</code></pre><h3>✅ استخدمها لـ</h3><ul><li>جلب البيانات من قاعدة البيانات</li><li>عرض محتوى ثابت</li><li>SEO مهم</li><li>لا تحتاج تفاعل</li></ul><h2>Client Components ("use client")</h2><pre><code>// components/Counter.tsx
"use client";
import { useState } from 'react';
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c + 1)}>{count}</button>;
}</code></pre><h3>✅ استخدمها لـ</h3><ul><li>التفاعل مع المستخدم</li><li>useState, useEffect, useContext</li><li>Event handlers</li><li>Browser APIs</li></ul><h2>Hybrid Pattern</h2><pre><code>// Server Component يمرر props لـ Client Component
export default function Page() {
  return (
    <div>
      <h1>Static Title</h1>
      <InteractiveComponent data={someData} />
    </div>
  );
}</code></pre><h2>أخطاء شائعة</h2><ul><li>وضع "use client" في الـ page.tsx الرئيسية</li><li>استخدام useState في Server Component</li><li>جلب بيانات داخل Client Component</li></ul><h2>الخلاصة</h2><p>Server Components = SEO + Performance<br>Client Components = Interactivity</p>`,
      tags: ["React", "Server Components", "Client Components", "Next.js"], readTime: 8, cat: dev.id,
    },
    {
      title: "Docker للمطورين العرب: ابدأ بالحاويات من الصفر",
      slug: "docker-arabic-beginners-guide",
      excerpt: "تعلم Docker من الصفر — Images وContainers وDocker Compose مع أمثلة Next.js.",
      content: `<h2>المفاهيم الأساسية</h2><ul><li><strong>Image:</strong> قالب جاهز</li><li><strong>Container:</strong> نسخة تشغيل من الـ Image</li><li><strong>Dockerfile:</strong> تعليمات لبناء Image</li></ul><h2>Dockerfile لـ Next.js</h2><pre><code>FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]</code></pre><h2>Docker Compose</h2><pre><code>services:
  app:
    build: .
    ports: ["3000:3000"]
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret</code></pre><h2>الخلاصة</h2><p>Docker يحل مشاكل التوافق ويجعل النشر موحداً.</p>`,
      tags: ["Docker", "DevOps", "containers", "deployment"], readTime: 7, cat: dev.id,
    },
    {
      title: "Prisma ORM: الدليل الشامل لقواعد البيانات في Node.js",
      slug: "prisma-orm-nodejs-guide",
      excerpt: "تعلم Prisma من الصفر — Schema وMigrations وCRUD وRelations مع Next.js.",
      content: `<h2>التثبيت</h2><pre><code>npm install prisma @prisma/client
npx prisma init</code></pre><h2>Schema</h2><pre><code>model User {
  id    String @id @default(cuid())
  email String @unique
  posts Post[]
}
model Post {
  id       String @id @default(cuid())
  title    String
  author   User   @relation(fields: [authorId], references: [id])
  authorId String
}</code></pre><h2>CRUD</h2><pre><code>// Create
await prisma.user.create({ data: { email: "a@b.com" } });
// Read
await prisma.post.findMany({ where: { published: true }, include: { author: true } });
// Update
await prisma.user.update({ where: { id }, data: { name: "New" } });
// Delete
await prisma.post.delete({ where: { id } });</code></pre><h2>الخلاصة</h2><p>Prisma يجعل التعامل مع قواعد البيانات سهلاً وآمناً.</p>`,
      tags: ["Prisma", "ORM", "database", "Node.js", "TypeScript"], readTime: 8, cat: dev.id,
    },
    {
      title: "تحسين أداء Next.js: احصل على 100/100 في PageSpeed",
      slug: "nextjs-performance-optimization-guide",
      excerpt: "تعلم تحسين أداء Next.js — الصور والـ fonts والـ bundle size والـ Core Web Vitals.",
      content: `<h2>لماذا الأداء مهم؟</h2><p>كل ثانية تأخير تقلل التحويلات بـ 7%. Google يُفضّل المواقع السريعة.</p><h2>تحسين الصور</h2><pre><code>import Image from "next/image";
&lt;Image src="/photo.jpg" width={800} height={600} alt="desc" priority /&gt;</code></pre><h2>تحسين الـ Fonts</h2><pre><code>const font = Inter({ subsets: ["latin"], display: "swap", preload: true });</code></pre><h2>Lazy Loading</h2><pre><code>const Heavy = dynamic(() => import("./Heavy"), { loading: () => &lt;Spinner /&gt; });</code></pre><h2>تحسين الـ Bundle</h2><ul><li>استخدم Tree Shaking</li><li>راجع Bundle Analyzer</li><li>استبدل lodash بـ native methods</li></ul><h2>الخلاصة</h2><p>ابدأ بـ Lighthouse لتحديد المشاكل ثم أصلحها واحدة بواحدة.</p>`,
      tags: ["Next.js", "performance", "PageSpeed", "Core Web Vitals", "SEO"], readTime: 8, cat: dev.id,
    },
    {
      title: "تصميم UI/UX للعرب: مبادئ أساسية لمطور الويب",
      slug: "ui-ux-design-principles-arabic",
      excerpt: "أهم مبادئ تصميم UI/UX يجب أن يعرفها كل مطور — من الألوان والطباعة حتى تجربة المستخدم RTL.",
      content: `<h2>مبادئ UI الأساسية</h2><ul><li><strong>Hierarchy:</strong> العناصر المهمة يجب أن تبرز</li><li><strong>Contrast:</strong> نسبة التباين للنصوص ≥ 4.5:1</li><li><strong>Whitespace:</strong> المسافات تُريح العين</li><li><strong>Consistency:</strong> اتساق الألوان والأحجام</li></ul><h2>تصميم RTL للعربية</h2><ul><li>استخدم direction: rtl في CSS</li><li>الأيقونات الاتجاهية تحتاج للعكس</li><li>في Tailwind: أضف dir="rtl" للـ HTML</li></ul><h2>أدوات التصميم</h2><ul><li>Figma: الأفضل للتصميم التعاوني</li><li>shadcn/ui: مكونات جاهزة مع Tailwind</li><li>Lucide: أيقونات نظيفة ومجانية</li></ul><h2>الألوان</h2><p>قاعدة 60-30-10: 60% لون أساسي، 30% ثانوي، 10% لون التمييز.</p><h2>الخلاصة</h2><p>التصميم الجيد يُحسّن تجربة المستخدم ويزيد التحويلات.</p>`,
      tags: ["UI/UX", "design", "تصميم", "Figma", "RTL", "Arabic"], readTime: 7, cat: des.id,
    },
    {
      title: "كيف تبني متجراً إلكترونياً بـ Next.js من الصفر",
      slug: "ecommerce-store-nextjs-guide",
      excerpt: "دليل عملي لبناء متجر إلكتروني كامل بـ Next.js — المنتجات والعربة وبوابة الدفع.",
      content: `<h2>المتطلبات التقنية</h2><ul><li>Next.js 14 + TypeScript</li><li>Prisma + SQLite/PostgreSQL</li><li>Stripe أو PayPal للدفع</li><li>Cloudinary للصور</li></ul><h2>هيكل قاعدة البيانات</h2><pre><code>model Product { id, title, price, stock, images }
model Order { id, userId, total, status, items }
model OrderItem { id, orderId, productId, quantity, price }</code></pre><h2>عربة التسوق</h2><p>استخدم localStorage أو Zustand لإدارة حالة العربة من جانب العميل.</p><h2>بوابة الدفع</h2><pre><code>const session = await stripe.checkout.sessions.create({
  line_items: cartItems,
  mode: 'payment',
  success_url: '/checkout/success',
});</code></pre><h2>الخلاصة</h2><p>متجر إلكتروني كامل يمكن بناؤه في أسبوعين مع Next.js.</p>`,
      tags: ["ecommerce", "Next.js", "Stripe", "متجر إلكتروني", "web development"], readTime: 9, cat: dev.id,
    },
    {
      title: "أفضل إضافات VS Code لمطور الويب العربي 2025",
      slug: "best-vscode-extensions-web-developer-2025",
      excerpt: "أفضل 20 إضافة VS Code ستجعل تجربة برمجتك أسرع وأكثر متعة في 2025.",
      content: `<h2>إضافات أساسية</h2><ul><li><strong>Prettier:</strong> تنسيق الكود تلقائياً</li><li><strong>ESLint:</strong> اكتشاف أخطاء JavaScript</li><li><strong>GitLens:</strong> تتبع Git متقدم</li><li><strong>Thunder Client:</strong> اختبار API بدون Postman</li></ul><h2>إضافات الإنتاجية</h2><ul><li><strong>Auto Rename Tag:</strong> تغيير HTML tags بشكل متزامن</li><li><strong>Path Intellisense:</strong> إكمال مسارات الملفات</li><li><strong>Error Lens:</strong> عرض الأخطاء inline</li><li><strong>Bookmarks:</strong> وضع علامات في الكود</li></ul><h2>إضافات للـ React/Next.js</h2><ul><li>ES7 React Snippets</li><li>Tailwind CSS IntelliSense</li><li>Prisma (syntax highlighting)</li></ul><h2>التخصيص</h2><p>One Dark Pro للثيم. JetBrains Mono للخط. Catppuccin للأيقونات.</p><h2>الخلاصة</h2><p>الإضافات الصحيحة تضاعف إنتاجيتك.</p>`,
      tags: ["VS Code", "extensions", "productivity", "developer tools"], readTime: 6, cat: dev.id,
    },
    {
      title: "كيف تتعلم البرمجة من الصفر في 2025",
      slug: "learn-programming-from-zero-2025",
      excerpt: "الخطة الكاملة لتعلم البرمجة من الصفر في 2025 — بدون جامعة، بدون مدرسة، فقط إرادة واتصال إنترنت.",
      content: `<h2>اختر مسارك</h2><ul><li><strong>Frontend:</strong> HTML → CSS → JavaScript → React → Next.js</li><li><strong>Backend:</strong> Python → Django/FastAPI أو Node.js → Express</li><li><strong>Full-Stack:</strong> الاثنان معاً</li></ul><h2>المصادر المجانية الأفضل</h2><ul><li>freeCodeCamp.org — شامل ومجاني</li><li>The Odin Project — Full-Stack مجاني</li><li>cs50.harvard.edu — مدخل ممتاز للبرمجة</li><li>YouTube: Traversy Media, Fireship, Kevin Powell</li></ul><h2>الخطة الزمنية</h2><p>3 أشهر: أساسيات. 6 أشهر: مشاريع حقيقية. 12 شهر: أول وظيفة أو فريلانس.</p><h2>نصائح مهمة</h2><ul><li>ابنِ مشاريع حقيقية من اليوم الأول</li><li>لا تقرأ الدروس فقط — طبّق</li><li>انضم لمجتمعات المطورين</li><li>الاستمرارية أهم من الكمالية</li></ul><h2>الخلاصة</h2><p>أفضل وقت لتعلم البرمجة كان بالأمس. أفضل وقت ثانٍ هو الآن.</p>`,
      tags: ["تعلم البرمجة", "learn programming", "مبتدئين", "coding", "2025"], readTime: 8, cat: dev.id,
    },
    {
      title: "7 نصائح لفريلانسر عربي ناجح يكسب بالدولار",
      slug: "7-tips-successful-arabic-freelancer",
      excerpt: "النصائح التي تفرق بين فريلانسر عادي يكافح وفريلانسر ناجح يختار عملاءه.",
      content: `<h2>1. تخصص ولا تتشتت</h2><p>فريلانسر متخصص في React يكسب 3 أضعاف فريلانسر "يعمل كل شيء".</p><h2>2. بروفايل يبيع</h2><p>أول 3 أسطر في الـ Overview تحدد إذا كان العميل سيواصل القراءة.</p><h2>3. الجودة فوق الكمية</h2><p>عميل واحد راضٍ يساوي 10 عملاء جدد من التوصيات.</p><h2>4. التواصل الاحترافي</h2><p>رد خلال ساعات. أبلغ عن التقدم دورياً. لا تختفي.</p><h2>5. التسعير الصحيح</h2><p>السعر المنخفض يوحي بجودة منخفضة. ارفع سعرك تدريجياً مع كل مشروع ناجح.</p><h2>6. بناء العلامة الشخصية</h2><p>LinkedIn + GitHub + موقع شخصي = ثقة إضافية من العملاء.</p><h2>7. التطوير المستمر</h2><p>خصص ساعة يومياً للتعلم. المجال يتطور سريعاً.</p><h2>الخلاصة</h2><p>الفريلانس الناجح هو مشروع تجاري — تعامل معه كذلك.</p>`,
      tags: ["فريلانس", "freelancing", "نصائح", "كسب المال", "remote work"], readTime: 7, cat: biz.id,
    },
    {
      title: "دخل سلبي من الإنترنت: الدليل العملي لـ 2025",
      slug: "passive-income-internet-2025-guide",
      excerpt: "طرق حقيقية ومجربة لبناء مصادر دخل سلبي من الإنترنت تعمل وأنت نائم.",
      content: `<h2>ما هو الدخل السلبي؟</h2><p>دخل لا يتطلب حضورك المستمر. تعمل مرة وتجني لسنوات. ليس "مجاناً" — يتطلب جهداً في البداية.</p><h2>أفضل مصادر الدخل السلبي</h2><h3>1. المنتجات الرقمية</h3><p>اصنع كتاباً أو كورساً مرة واحدة — يُباع إلى الأبد.</p><h3>2. التسويق بالعمولة</h3><p>اكتب مراجعات صادقة لأدوات تستخدمها. كل بيعة = عمولة.</p><h3>3. قنوات YouTube</h3><p>الإعلانات والـ Sponsorships. يتطلب وقتاً لبناء جمهور.</p><h3>4. تطبيقات وإضافات</h3><p>Chrome Extension يحل مشكلة بسيطة = 5-500$/شهر.</p><h3>5. استضافة مواقع</h3><p>اشترِ دومين وحوّله لموقع مفيد ثم ابعه أو استثمره بإعلانات.</p><h2>الجدول الزمني الواقعي</h2><p>شهر 1-3: صفر. شهر 4-6: 100-300$/شهر. سنة 2: 1000-5000$/شهر.</p><h2>الخلاصة</h2><p>الدخل السلبي ليس سريعاً لكنه يستحق. ابدأ الآن.</p>`,
      tags: ["دخل سلبي", "passive income", "كسب المال", "digital products", "online business"], readTime: 8, cat: biz.id,
    },
    {
      title: "بناء SaaS بـ Next.js من الصفر: دليل شامل",
      slug: "build-saas-nextjs-complete-guide",
      excerpt: "كيف تبني تطبيق SaaS كامل بـ Next.js — من الفكرة حتى الإطلاق مع Authentication وSubscriptions.",
      content: `<h2>ما هو SaaS؟</h2><p>Software as a Service — تطبيق تدفع له اشتراكاً شهرياً. أمثلة: Notion, Slack, Figma.</p><h2>Stack المثالي للـ SaaS</h2><ul><li>Next.js 14 + TypeScript</li><li>Prisma + PostgreSQL</li><li>NextAuth.js للمصادقة</li><li>Stripe للاشتراكات</li><li>Resend للإيميلات</li></ul><h2>Authentication</h2><pre><code>// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
export const { handlers, auth } = NextAuth({ providers: [Google] });</code></pre><h2>Subscription Tiers</h2><p>Free: محدود. Pro: 9$/شهر. Enterprise: مخصص. استخدم Stripe Webhooks لإدارة الاشتراكات.</p><h2>Multi-tenancy</h2><p>كل عميل له بيانات معزولة. استخدم organizationId في كل query.</p><h2>الخلاصة</h2><p>SaaS ناجح يتطلب: مشكلة حقيقية + حل بسيط + تسعير واضح.</p>`,
      tags: ["SaaS", "Next.js", "startup", "web development", "Stripe"], readTime: 10, cat: dev.id,
    },
    {
      title: "كيف تستخدم Midjourney لإنشاء تصاميم احترافية بالعربي",
      slug: "midjourney-arabic-design-guide",
      excerpt: "دليل عملي لاستخدام Midjourney لإنشاء صور وتصاميم احترافية — مع Prompts عربية جاهزة.",
      content: `<h2>ما هو Midjourney؟</h2><p>أقوى أداة لتوليد الصور بالذكاء الاصطناعي. تعمل عبر Discord.</p><h2>البدء</h2><p>1. اشترك في midjourney.com<br>2. انضم لـ Discord server<br>3. اكتب /imagine في أي channel</p><h2>Prompt فعّال</h2><p>subject + style + lighting + composition + quality</p><p>مثال: "Arabic calligraphy art, purple and gold colors, dark background, 8k, professional, minimalist"</p><h2>Parameters مهمة</h2><pre><code>--ar 16:9     (نسبة العرض)
--style raw   (أقل تزيين)
--v 6         (أحدث إصدار)
--q 2         (جودة أعلى)</code></pre><h2>استخدامات للمطورين والمصممين</h2><ul><li>صور Hero للمواقع</li><li>أيقونات وعناصر بصرية</li><li>صور مقالات المدونة</li><li>تصاميم منتجات رقمية</li></ul><h2>الخلاصة</h2><p>Midjourney يوفر تكلفة المصور وعشرات الساعات في التصميم.</p>`,
      tags: ["Midjourney", "AI", "design", "تصميم", "image generation"], readTime: 7, cat: des.id,
    },
    {
      title: "Git و GitHub: الدليل الشامل للمطور المبتدئ",
      slug: "git-github-complete-guide-beginners",
      excerpt: "تعلم Git وGitHub من الصفر — كل الأوامر الأساسية وكيفية التعاون مع الفريق.",
      content: `<h2>ما هو Git؟</h2><p>نظام تتبع التغييرات في الكود. يسمح بالعودة لأي نقطة في تاريخ المشروع.</p><h2>الأوامر الأساسية</h2><pre><code>git init                    # بدء repo جديد
git clone URL               # نسخ repo
git add .                   # إضافة الملفات
git commit -m "message"     # حفظ التغييرات
git push origin main        # رفع للـ GitHub
git pull origin main        # جلب التحديثات
git branch feature/new      # إنشاء branch
git merge feature/new       # دمج branch</code></pre><h2>Workflow مع الفريق</h2><p>1. Pull آخر تحديث<br>2. إنشاء branch جديد<br>3. العمل والـ commit<br>4. Push وإنشاء Pull Request<br>5. Code Review ثم Merge</p><h2>حل التعارضات</h2><p>Conflicts تحدث عند تعديل نفس السطر. VS Code يساعدك على حلها بشكل مرئي.</p><h2>الخلاصة</h2><p>Git مهارة لا غنى عنها لأي مطور. أتقنها من البداية.</p>`,
      tags: ["Git", "GitHub", "version control", "programming", "collaboration"], readTime: 8, cat: dev.id,
    },
    {
      title: "Python للمبتدئين: من الصفر حتى أول مشروع حقيقي",
      slug: "python-beginners-first-project-guide",
      excerpt: "تعلم Python من الصفر — الأساسيات والمكتبات وكيف تبني مشروعك الأول في أسبوعين.",
      content: `<h2>لماذا Python؟</h2><p>أسهل لغة للمبتدئين. تستخدم في AI وData Science وأتمتة وبناء APIs.</p><h2>الأساسيات</h2><pre><code>name = "ABUD"
age = 25
print(f"مرحباً {name}، عمرك {age}")

# Lists
skills = ["Python", "React", "AI"]
for skill in skills:
    print(skill)

# Functions
def greet(name: str) -> str:
    return f"أهلاً {name}!"</code></pre><h2>مكتبات مهمة</h2><ul><li>requests: طلبات HTTP</li><li>pandas: تحليل البيانات</li><li>FastAPI: بناء APIs</li><li>python-telegram-bot: بوتات تيليغرام</li></ul><h2>أول مشروع: بوت تيليغرام</h2><p>بوت بسيط يرد على رسائل المستخدمين — مثالي لتطبيق كل ما تعلمته.</p><h2>الخلاصة</h2><p>Python تُتعلم في أسبوعين. المهارة الحقيقية تأتي من بناء مشاريع.</p>`,
      tags: ["Python", "programming", "مبتدئين", "beginners", "AI"], readTime: 7, cat: dev.id,
    },
    {
      title: "SEO تقني للمطورين: اجعل موقعك يظهر في Google",
      slug: "technical-seo-developers-guide",
      excerpt: "كل ما يحتاجه المطور لتحسين SEO موقعه — من Metadata وStructured Data حتى Sitemap وPerformance.",
      content: `<h2>لماذا SEO تقني مهم؟</h2><p>المحتوى الجيد لا فائدة منه إذا لم يجده Google. SEO التقني هو الأساس.</p><h2>Metadata الصحيح</h2><pre><code>// في Next.js
export const metadata = {
  title: "عنوان الصفحة | ABUD",
  description: "وصف الصفحة (160 حرف)",
  openGraph: { title, description, image },
};</code></pre><h2>Structured Data (JSON-LD)</h2><pre><code>&lt;script type="application/ld+json"&gt;
{"@context":"https://schema.org","@type":"Article","headline":"العنوان"}
&lt;/script&gt;</code></pre><h2>Sitemap.xml</h2><p>في Next.js: أنشئ app/sitemap.ts تعيد كل URLs الموقع مع lastModified.</p><h2>robots.txt</h2><pre><code>User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://example.com/sitemap.xml</code></pre><h2>Core Web Vitals</h2><p>LCP < 2.5s. FID < 100ms. CLS < 0.1. استخدم Next/Image وNext/Font.</p><h2>الخلاصة</h2><p>SEO التقني عملية مستمرة. راقب Google Search Console أسبوعياً.</p>`,
      tags: ["SEO", "technical SEO", "Next.js", "web development", "Google"], readTime: 8, cat: dev.id,
    },
    {
      title: "كيف تسعّر خدماتك كمستقل: دليل التسعير الاحترافي",
      slug: "freelancer-pricing-guide-arabic",
      excerpt: "دليل شامل لتسعير خدماتك كفريلانسر — كيف تحسب تكلفتك وترفع أسعارك وتقنع العملاء بقيمتك.",
      content: `<h2>لماذا يصعب التسعير على الفريلانسر؟</h2><p>نخشى الرفض. لا نعرف قيمتنا الحقيقية. نقارن أنفسنا بأرخص من هو في السوق.</p><h2>حساب السعر الصحيح</h2><p>السعر الأدنى = (مصاريفك الشهرية ÷ ساعات العمل) × 1.5 للأرباح.</p><h2>نماذج التسعير</h2><ul><li><strong>بالساعة:</strong> مناسب للمشاريع غير المحددة</li><li><strong>بالمشروع:</strong> الأفضل للعميل والمطور</li><li><strong>اشتراك شهري:</strong> للعلاقات طويلة المدى</li></ul><h2>كيف ترفع أسعارك؟</h2><p>لا تفاجئ عملاءك. أبلغهم قبل شهر. قدّم قيمة إضافية مع الزيادة. بعض العملاء سيرفضون — هذا طبيعي.</p><h2>عبارات مفيدة للتفاوض</h2><p>"بناءً على حجم المشروع، سعري هو X. هل هذا يناسب ميزانيتك؟"</p><h2>الخلاصة</h2><p>السعر الصحيح يجذب عملاء أفضل. لا تبع نفسك بسعر رخيص.</p>`,
      tags: ["فريلانس", "تسعير", "pricing", "freelancing", "business"], readTime: 7, cat: biz.id,
    },
  ];

  for (const p of posts) {
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        status: "published",
        featured: false,
        tags: JSON.stringify(p.tags),
        categoryId: p.cat,
        publishedAt: new Date(),
        readTime: p.readTime,
      },
    });
    console.log(`✅ ${p.title}`);
  }

  console.log(`\n🎉 تم إنشاء ${posts.length} مقال SEO بنجاح!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
