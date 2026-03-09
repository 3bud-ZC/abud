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
      title: "أفضل أدوات الذكاء الاصطناعي للمطورين في 2025",
      slug: "best-ai-tools-developers-2025",
      excerpt: "اكتشف أقوى أدوات AI ستغير طريقة عملك في 2025 — من توليد الكود إلى تحليل البيانات.",
      content: `<h2>لماذا AI ضروري للمطورين؟</h2><p>المطورون الذين يستخدمون AI ينتجون 3 أضعاف العمل في نفس الوقت.</p><h2>أفضل الأدوات</h2><ul><li><strong>GitHub Copilot:</strong> يكتب الكود معك ويوفر 40% من الوقت.</li><li><strong>ChatGPT-4o:</strong> للتفكير في المشاكل وكتابة الوثائق.</li><li><strong>Cursor IDE:</strong> بيئة تطوير مدمجة مع AI يفهم كامل مشروعك.</li><li><strong>Claude Sonnet:</strong> ممتاز للمهام التحليلية الطويلة.</li></ul><h2>كيف تختار؟</h2><p>مطور: Copilot + ChatGPT. مصمم: Midjourney + Figma AI. مستقل: Notion AI + ChatGPT.</p><h2>الخلاصة</h2><p>AI ليس منافساً — هو مضاعف لإنتاجيتك. ابدأ بأداة واحدة وأتقنها.</p>`,
      tags: ["ذكاء اصطناعي", "AI tools", "ChatGPT", "productivity"], readTime: 7, cat: dev.id,
    },
    {
      title: "كيف تبدأ العمل الحر وتكسب أول 1000 دولار",
      slug: "start-freelancing-earn-first-1000-dollars",
      excerpt: "دليل عملي لبدء الفريلانس من الصفر — اختيار التخصص، بناء البورتفوليو، وإيجاد العملاء.",
      content: `<h2>الخطوة 1: اختر تخصصك</h2><p>لا تكن كل شيء. اختر مجالاً واحداً وكن فيه الأفضل: برمجة، تصميم، كتابة، أو ترجمة.</p><h2>الخطوة 2: ابنِ بورتفوليو</h2><p>3-5 مشاريع حقيقية أو وهمية تثبت مهارتك. أضفها على GitHub وموقع شخصي.</p><h2>الخطوة 3: أنشئ ملفات على المنصات</h2><ul><li><strong>Upwork:</strong> للمشاريع الكبيرة</li><li><strong>Fiverr:</strong> للخدمات المحددة</li><li><strong>Mostaql:</strong> للعملاء العرب</li></ul><h2>التسعير</h2><p>مبتدئ: 10-20$/ساعة. متوسط: 30-50$/ساعة. خبير: 80-150$/ساعة.</p><h2>الخلاصة</h2><p>أول 3 أشهر صعبة — بعدها يبدأ كل شيء يتحسن. لا تستسلم.</p>`,
      tags: ["فريلانس", "freelancing", "Upwork", "كسب المال"], readTime: 8, cat: biz.id,
    },
    {
      title: "Next.js 14 الدليل الشامل: من الصفر حتى الاحتراف",
      slug: "nextjs-14-complete-guide-arabic",
      excerpt: "تعلم Next.js 14 مع App Router وTypeScript — من الإعداد حتى النشر على السيرفر.",
      content: `<h2>لماذا Next.js 14؟</h2><p>يدعم SSR وSSG وISR — مواقع سريعة ومحسّنة لـ SEO بشكل افتراضي.</p><h2>إنشاء مشروع</h2><pre><code>npx create-next-app@latest --typescript --tailwind --app</code></pre><h2>App Router</h2><p>كل مجلد في app/ = route. page.tsx = الصفحة. layout.tsx = الـ wrapper. loading.tsx = شاشة التحميل.</p><h2>Server vs Client</h2><p>Server Components (افتراضي): سريعة وجيدة لـ SEO. Client Components ("use client"): تدعم الـ hooks والتفاعل.</p><h2>الخلاصة</h2><p>Next.js 14 هو المستقبل. ابدأ مشروعاً حقيقياً وتعلم منه.</p>`,
      tags: ["Next.js", "React", "TypeScript", "web development"], readTime: 10, cat: dev.id,
    },
    {
      title: "10 طرق حقيقية لربح المال من الإنترنت في 2025",
      slug: "10-ways-make-money-online-2025",
      excerpt: "طرق مجربة وحقيقية لكسب المال أونلاين مع تفاصيل البدء والإيرادات المتوقعة لكل طريقة.",
      content: `<h2>1. الفريلانس</h2><p>بيع مهاراتك مباشرة. الدخل: 500-5000$/شهر. المنصات: Upwork, Fiverr.</p><h2>2. المنتجات الرقمية</h2><p>كتب، قوالب، كورسات. تعمل وأنت نائم.</p><h2>3. التسويق بالعمولة</h2><p>تروّج منتجات وتأخذ عمولة على كل بيعة.</p><h2>4. التدريس أونلاين</h2><p>علّم ما تعرفه على Udemy أو موقعك.</p><h2>5. كتابة المحتوى</h2><p>ابنِ جمهوراً واستثمر بإعلانات وعمولة.</p><h2>6. بيع مواقع الويب</h2><p>طوّر مواقع ضعيفة وابعها بـ 10-30 ضعف دخلها.</p><h2>7. أتمتة الأعمال بـ AI</h2><p>ساعد الشركات في أتمتة عملياتها.</p><h2>الخلاصة</h2><p>اختر طريقة واحدة وأتقنها 6 أشهر.</p>`,
      tags: ["ربح المال", "make money online", "دخل سلبي"], readTime: 7, cat: biz.id,
    },
    {
      title: "أمن سيبراني للمبتدئين: حماية نفسك وبياناتك",
      slug: "cybersecurity-beginners-guide",
      excerpt: "الدليل الشامل للأمن السيبراني للمبتدئين — أهم المفاهيم والأدوات لحماية نفسك من الهاكرز.",
      content: `<h2>أشهر أنواع الهجمات</h2><ul><li><strong>Phishing:</strong> رسائل مزيفة تسرق بياناتك</li><li><strong>Malware:</strong> فيروسات وبرامج تجسس</li><li><strong>Ransomware:</strong> تشفير ملفاتك ومطالبتك بفدية</li></ul><h2>قواعد الحماية الأساسية</h2><ul><li>كلمات مرور قوية (16+ حرف) مع Bitwarden</li><li>المصادقة الثنائية (2FA) على كل حساباتك</li><li>تحديث الأنظمة دائماً</li><li>VPN على الشبكات العامة</li></ul><h2>أدوات مجانية</h2><p>Bitwarden, ProtonMail, WireGuard, VeraCrypt.</p><h2>الخلاصة</h2><p>الأمن السيبراني مسؤولية الجميع. ابدأ اليوم بتأمين حساباتك.</p>`,
      tags: ["أمن سيبراني", "cybersecurity", "حماية", "VPN"], readTime: 7, cat: dev.id,
    },
    {
      title: "كيف تبني بوت تيليغرام بـ Python من الصفر",
      slug: "telegram-bot-python-guide",
      excerpt: "تعلم كيف تبني بوت تيليغرام فعّال بـ Python مع أمثلة عملية وكود جاهز للنسخ.",
      content: `<h2>إنشاء البوت</h2><p>1. افتح @BotFather في تيليغرام<br>2. اكتب /newbot<br>3. احفظ الـ Token</p><h2>أول كود</h2><pre><code>from telegram.ext import Application, CommandHandler
async def start(update, context):
    await update.message.reply_text("مرحباً! 🤖")
app = Application.builder().token("TOKEN").build()
app.add_handler(CommandHandler("start", start))
app.run_polling()</code></pre><h2>أفكار لبوتات مفيدة</h2><ul><li>بوت تذكير المهام</li><li>بوت أسعار العملات</li><li>بوت استقبال طلبات العملاء</li><li>بوت نشر المحتوى تلقائياً</li></ul><h2>الخلاصة</h2><p>بوتات تيليغرام سهلة البناء وقوية الاستخدام.</p>`,
      tags: ["تيليغرام", "Python", "telegram bot", "أتمتة"], readTime: 7, cat: dev.id,
    },
    {
      title: "Tailwind CSS: الدليل الشامل للتصميم السريع",
      slug: "tailwind-css-complete-guide-arabic",
      excerpt: "تعلم Tailwind CSS من الصفر — كل الـ utilities وأفضل الممارسات والحيل الاحترافية.",
      content: `<h2>ما هو Tailwind؟</h2><p>إطار CSS utility-first — تستخدم classes جاهزة بدلاً من كتابة CSS مخصص.</p><h2>الـ Classes الأساسية</h2><pre><code>// Layout
flex items-center justify-between gap-4 p-6
// Typography  
text-2xl font-bold text-gray-900
// Colors
bg-purple-600 text-white hover:bg-purple-700
// Responsive
md:grid-cols-3 lg:grid-cols-4</code></pre><h2>نصائح احترافية</h2><ul><li>استخدم @apply للـ classes المتكررة</li><li>Arbitrary values: text-[#9333ea]</li><li>Dark mode: dark:bg-gray-900</li></ul><h2>الخلاصة</h2><p>Tailwind يجعل التصميم أسرع. بعد أسبوع ممارسة لن تعود للـ CSS العادي.</p>`,
      tags: ["Tailwind CSS", "CSS", "web design", "frontend"], readTime: 6, cat: des.id,
    },
    {
      title: "ChatGPT للمطورين: 15 استخداماً يوفر عليك ساعات",
      slug: "chatgpt-developers-professional-uses",
      excerpt: "كيف يستخدم المطورون المحترفون ChatGPT لتسريع العمل — من Debug حتى كتابة الوثائق.",
      content: `<h2>أهم 15 استخدام</h2><ol><li>Debug الكود — الصق الكود والـ error معاً</li><li>Refactoring — "أعد كتابة هذا الكود أنظف"</li><li>كتابة Unit Tests تلقائياً</li><li>شرح كود معقد بالعربي</li><li>تحويل بين لغات البرمجة</li><li>كتابة Regex معقد</li><li>SQL Queries من وصف بالعربي</li><li>كتابة الوثائق (README, JSDoc)</li><li>Code Review ومراجعة الأمان</li><li>Git commit messages احترافية</li><li>تحسين الأداء</li><li>تصميم قواعد بيانات</li><li>حل مشاكل API</li><li>التخطيط لمعمارية المشاريع</li><li>كتابة Tailwind CSS من وصف التصميم</li></ol><h2>الخلاصة</h2><p>ChatGPT لا يستبدل المطور — يجعله أكثر إنتاجية بـ 3-5 أضعاف.</p>`,
      tags: ["ChatGPT", "AI", "developer tools", "productivity"], readTime: 8, cat: dev.id,
    },
    {
      title: "GitHub Actions: نشر مشاريعك تلقائياً (CI/CD للمبتدئين)",
      slug: "github-actions-cicd-guide",
      excerpt: "تعلم بناء CI/CD pipeline بـ GitHub Actions — نشر تلقائي على كل push لـ main.",
      content: `<h2>ما هو CI/CD؟</h2><p>كل push لـ GitHub = الموقع يتحدث تلقائياً. لا تدخل يدوي.</p><h2>أول Workflow</h2><pre><code>name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.VPS_HOST }}
          username: \${{ secrets.VPS_USER }}
          password: \${{ secrets.VPS_PASSWORD }}
          script: |
            cd /app && git pull
            npm install && npm run build
            pm2 restart app</code></pre><h2>الخلاصة</h2><p>CI/CD يوفر وقتاً كبيراً. بعد الإعداد الأول، كل شيء يحدث تلقائياً.</p>`,
      tags: ["GitHub Actions", "CI/CD", "DevOps", "automation"], readTime: 7, cat: dev.id,
    },
    {
      title: "VPS من الصفر: تثبيت وإدارة خادم Linux احترافياً",
      slug: "vps-linux-setup-guide",
      excerpt: "دليل شامل لإعداد VPS — تثبيت Nginx وSSL وPM2 وتأمين السيرفر من الصفر.",
      content: `<h2>اختيار مزود VPS</h2><ul><li>Hostinger: رخيص للبداية</li><li>DigitalOcean: الأفضل للمطورين</li><li>Hetzner: الأرخص في أوروبا</li></ul><h2>الخطوات الأولى</h2><pre><code>sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install nodejs nginx</code></pre><h2>SSL مجاني</h2><pre><code>sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com</code></pre><h2>PM2</h2><pre><code>npm install -g pm2
pm2 start ecosystem.config.js
pm2 startup && pm2 save</code></pre><h2>الخلاصة</h2><p>الإعداد يأخذ ساعتين — الفائدة تدوم سنوات.</p>`,
      tags: ["VPS", "Linux", "Nginx", "DevOps", "SSL"], readTime: 9, cat: dev.id,
    },
    {
      title: "n8n: أتمتة عملك بالكامل بدون كود",
      slug: "n8n-workflow-automation-guide",
      excerpt: "تعرف على n8n — أداة الأتمتة مفتوحة المصدر لربط التطبيقات وأتمتة العمليات.",
      content: `<h2>ما هو n8n؟</h2><p>workflow automation مفتوح المصدر. يربط تطبيقات مختلفة تلقائياً. بديل مجاني لـ Zapier.</p><h2>مزايا n8n</h2><ul><li>مفتوح المصدر ومجاني للاستضافة الذاتية</li><li>بياناتك تبقى عندك</li><li>يدعم JavaScript إذا احتجت</li></ul><h2>أفكار أتمتة</h2><ul><li>إشعار تلقائي على تيليغرام عند وصول email</li><li>نشر محتوى على جميع المنصات معاً</li><li>تقارير تلقائية يومية</li><li>إدارة العملاء (CRM automation)</li></ul><h2>الخلاصة</h2><p>n8n يوفر ساعات أسبوعياً. استثمر ساعتين في تعلمه.</p>`,
      tags: ["n8n", "automation", "أتمتة", "no-code", "workflow"], readTime: 6, cat: biz.id,
    },
    {
      title: "TypeScript للمبتدئين: من JavaScript إلى كود آمن",
      slug: "typescript-beginners-complete-guide",
      excerpt: "دليل شامل لتعلم TypeScript — الأنواع والـ Interfaces والـ Generics بالعربي.",
      content: `<h2>ما هو TypeScript؟</h2><p>JavaScript + Types. يكتشف الأخطاء قبل تشغيل الكود.</p><h2>الأنواع الأساسية</h2><pre><code>const name: string = "ABUD";
const age: number = 25;
const skills: string[] = ["React", "Next.js"];
const user: { id: string; email: string } = { id: "1", email: "a@b.com" };</code></pre><h2>Interfaces</h2><pre><code>interface User {
  id: string;
  name: string;
  email?: string; // optional
}
type Status = "active" | "inactive";</code></pre><h2>TypeScript مع React</h2><pre><code>interface Props { title: string; onClick: () => void; }
const Button: React.FC<Props> = ({ title, onClick }) => (
  <button onClick={onClick}>{title}</button>
);</code></pre><h2>الخلاصة</h2><p>TypeScript يبدو صعباً في البداية لكنه يوفر وقتاً. أضفه تدريجياً لمشروعك.</p>`,
      tags: ["TypeScript", "JavaScript", "programming", "React"], readTime: 8, cat: dev.id,
    },
    {
      title: "كيف تبني REST API بـ Node.js و Express",
      slug: "nodejs-express-rest-api-guide",
      excerpt: "دليل عملي لبناء API احترافي بـ Node.js وExpress مع المصادقة وقواعد البيانات.",
      content: `<h2>إعداد المشروع</h2><pre><code>npm init -y
npm install express cors helmet dotenv
npm install -D typescript ts-node-dev</code></pre><h2>أول Server</h2><pre><code>import express from 'express';
const app = express();
app.use(express.json());
app.get('/', (req, res) => res.json({ ok: true }));
app.listen(3000);</code></pre><h2>CRUD Routes</h2><pre><code>app.get('/items', getAll);
app.get('/items/:id', getOne);
app.post('/items', create);
app.put('/items/:id', update);
app.delete('/items/:id', remove);</code></pre><h2>JWT Auth</h2><p>npm install jsonwebtoken bcryptjs — أنشئ token عند تسجيل الدخول، تحقق منه في middleware.</p><h2>الخلاصة</h2><p>Node.js + Express + Prisma + JWT = API كامل وقوي.</p>`,
      tags: ["Node.js", "Express", "API", "backend", "REST API"], readTime: 8, cat: dev.id,
    },
    {
      title: "Prompt Engineering: احصل على أفضل نتائج من الـ AI",
      slug: "prompt-engineering-arabic-guide",
      excerpt: "تعلم فن كتابة الـ Prompts الاحترافية للحصول على نتائج مبهرة من ChatGPT وClaude.",
      content: `<h2>قواعد Prompt جيد</h2><h3>1. كن محدداً</h3><p>بدلاً من: "اكتب مقالاً عن AI"<br>اكتب: "اكتب مقالاً تعليمياً بالعربية عن أفضل 5 أدوات AI للمطورين في 2025، مع أمثلة، للمبتدئين"</p><h3>2. حدد الدور</h3><p>"أنت خبير في الأمن السيبراني مع 10 سنوات خبرة..."</p><h3>3. أعطِ أمثلة (Few-Shot)</h3><p>أعطِ مثالاً على الأسلوب الذي تريده.</p><h3>4. Chain of Thought</h3><p>"فكّر خطوة بخطوة" — للمشاكل المعقدة.</p><h2>Prompts للمطورين</h2><ul><li>"Debug هذا الكود وشرح كل خطوة"</li><li>"حوّل إلى TypeScript مع أنواع صحيحة"</li><li>"10 طرق لتحسين أداء هذه الـ function"</li></ul><h2>الخلاصة</h2><p>Prompt Engineering مهارة تتحسن بالممارسة.</p>`,
      tags: ["prompt engineering", "ChatGPT", "AI", "productivity"], readTime: 6, cat: dev.id,
    },
    {
      title: "React Hooks: الدليل الشامل من useState حتى Custom Hooks",
      slug: "react-hooks-comprehensive-guide",
      excerpt: "إتقن React Hooks — useState, useEffect, useContext, useMemo, useCallback وCustom Hooks.",
      content: `<h2>useState</h2><pre><code>const [count, setCount] = useState(0);
setCount(prev => prev + 1);</code></pre><h2>useEffect</h2><pre><code>useEffect(() => { fetchData(); }, []); // mount
useEffect(() => { document.title = count; }, [count]); // dependency
useEffect(() => {
  const t = setInterval(tick, 1000);
  return () => clearInterval(t); // cleanup
}, []);</code></pre><h2>useMemo & useCallback</h2><pre><code>const sorted = useMemo(() => items.sort(), [items]);
const handleClick = useCallback(() => { ... }, [deps]);</code></pre><h2>Custom Hook</h2><pre><code>function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData).finally(() => setLoading(false));
  }, [url]);
  return { data, loading };
}</code></pre><h2>الخلاصة</h2><p>Hooks هي قلب React الحديث. أتقنها وستكتب كوداً أنظف.</p>`,
      tags: ["React", "React Hooks", "JavaScript", "frontend"], readTime: 9, cat: dev.id,
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
