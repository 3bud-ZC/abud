/**
 * Curated blog posts ─ used as a fallback when the database is empty
 * or unreachable. Posts in the database take precedence (deduped by slug).
 *
 * To replace any of these with a DB-managed post, simply create a post
 * in /admin/blog with the same slug — the DB version will win.
 */

export interface SeedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML rendered with .prose-arabic
  coverImage: string | null;
  readTime: number;
  publishedAt: string; // ISO
  featured: boolean;
  tags: string[];
  category: { name: string; slug: string };
}

export const SEED_CATEGORIES = [
  { id: "c-ai", name: "ذكاء اصطناعي", slug: "ai" },
  { id: "c-web", name: "تطوير الويب", slug: "web-dev" },
  { id: "c-automation", name: "أتمتة", slug: "automation" },
  { id: "c-freelance", name: "فريلانس", slug: "freelance" },
  { id: "c-cyber", name: "أمن سيبراني", slug: "cybersecurity" },
  { id: "c-tools", name: "أدوات وإنتاجية", slug: "tools" },
];

export const SEED_POSTS: SeedPost[] = [
  {
    id: "seed-1",
    slug: "build-ai-agent-from-scratch",
    title: "كيف تبني وكيل ذكاء اصطناعي (AI Agent) من الصفر",
    excerpt:
      "دليل عملي لبناء AI Agent بـ Python + OpenAI ─ من فهم الـ Tools و Function Calling لحد deployment على VPS مع تيليجرام bot.",
    coverImage: "/blog/build-ai-agent-from-scratch.jpg",
    readTime: 12,
    publishedAt: "2026-04-22T10:00:00Z",
    featured: true,
    tags: ["AI", "Python", "OpenAI", "Agent", "Telegram"],
    category: { name: "ذكاء اصطناعي", slug: "ai" },
    content: `
<h2>ليه AI Agent مش مجرد ChatGPT؟</h2>
<p>الـ <strong>Agent</strong> مش بس بيرد على الأسئلة ─ ده بياخد قرارات، بيشغّل أدوات (Tools)، وبيكمّل خطوات متسلسلة لحد ما يحقق الهدف. الفرق بين شات بسيط وأي agent حقيقي هو حاجة واحدة: <strong>قدرة استدعاء الـ Functions</strong>.</p>

<h2>1. الأساس ─ Function Calling</h2>
<p>OpenAI و Anthropic بيوفروا API بيخلّي النموذج يقرر إمتى يستدعي function معينة. مثال:</p>
<pre><code>tools = [{
  "type": "function",
  "function": {
    "name": "search_web",
    "description": "ابحث في الإنترنت عن معلومة",
    "parameters": {
      "type": "object",
      "properties": {"query": {"type": "string"}}
    }
  }
}]</code></pre>

<h2>2. حلقة الـ Agent (Agent Loop)</h2>
<p>الـ agent بيتحرك في loop:</p>
<ol>
  <li>المستخدم بيبعت رسالة</li>
  <li>النموذج بيقرر: أرد مباشرة، ولا أستدعي tool؟</li>
  <li>لو tool ─ نشغّلها ونرجّع النتيجة للنموذج</li>
  <li>كرر لحد ما النموذج يقول "خلصت"</li>
</ol>

<h2>3. أدوات لازمة لأي Agent جدّي</h2>
<ul>
  <li><strong>web_search</strong> ─ للوصول للمعلومات الجديدة</li>
  <li><strong>read_file / write_file</strong> ─ للعمل على ملفات المستخدم</li>
  <li><strong>run_code</strong> ─ في sandbox آمن</li>
  <li><strong>send_message</strong> ─ لإشعار المستخدم</li>
</ul>

<h2>4. Memory ─ ذاكرة طويلة الأمد</h2>
<p>أي agent بدون ذاكرة هيكرر الأخطاء. استخدم <strong>vector database</strong> زي Qdrant أو Pinecone عشان تخزن خلاصة كل محادثة.</p>

<h2>5. النشر ─ Deploy على VPS</h2>
<p>بعد ما تجرّبه محلياً، خلّي الـ agent يشتغل 24/7:</p>
<ul>
  <li>Docker container</li>
  <li>PM2 أو systemd service</li>
  <li>nginx reverse proxy + SSL</li>
  <li>Telegram bot كـ interface</li>
</ul>

<blockquote>
<p>الـ Agent الشاطر مش اللي بيرد بسرعة ─ ده اللي بيعرف إمتى ميردش، ويقول "محتاج مساعدة".</p>
</blockquote>

<p>في المقالات الجاية هانبني agent متخصص في <em>الفريلانس</em> ─ بيتابع المشاريع، يكتب proposals، ويرسلهم تلقائياً.</p>
`,
  },

  {
    id: "seed-2",
    slug: "next-15-app-router-real-world",
    title: "Next.js 15 — تجربتي بعد سنة كاملة في الإنتاج",
    excerpt:
      "App Router، Server Components، Server Actions ─ إيه شغّال فعلاً وإيه اللي مش هتحتاجه. تجربة من 12+ مشروع حقيقي.",
    coverImage: "/blog/next-15-app-router-real-world.jpg",
    readTime: 9,
    publishedAt: "2026-04-15T08:00:00Z",
    featured: true,
    tags: ["Next.js", "React", "App Router", "Server Components"],
    category: { name: "تطوير الويب", slug: "web-dev" },
    content: `
<h2>الـ App Router ─ خلاص استقر</h2>
<p>بعد سنة من الفوضى، Next.js 15 بقت متماسكة. الـ App Router دلوقتي خيار افتراضي لأي مشروع جديد ─ مش تجربة.</p>

<h2>إيه اللي اتعلمته الصعب؟</h2>
<ul>
  <li><strong>Server Components by default</strong> ─ <code>"use client"</code> هي الاستثناء، مش العكس</li>
  <li><strong>Server Actions</strong> بدّلت 70% من API routes اللي كنت بكتبها</li>
  <li><strong>Streaming + Suspense</strong> غيّرت تجربة المستخدم على الصفحات البطيئة</li>
  <li><strong>Parallel Routes</strong> فعلاً مفيدة في dashboards معقدة</li>
</ul>

<h2>الفخاخ الشائعة</h2>
<p>أكتر 3 أخطاء بشوفها عند المبتدئين:</p>
<ol>
  <li>وضع <code>"use client"</code> في كل ملف ─ ده بيكسر الـ streaming</li>
  <li>استخدام <code>useEffect</code> للـ data fetching بدل ما تستخدم Server Components</li>
  <li>تجاهل <code>cache()</code> و <code>revalidate</code> ─ بيخلي الموقع بطيء بدون داعي</li>
</ol>

<h2>Stack أنا بستخدمه دلوقتي</h2>
<ul>
  <li>Next.js 15 + TypeScript</li>
  <li>Prisma + PostgreSQL</li>
  <li>Tailwind CSS + shadcn/ui</li>
  <li>Framer Motion للـ animations</li>
  <li>Vercel للـ deployment</li>
</ul>

<blockquote><p>القاعدة الذهبية: ابدأ Server، اطلع Client بس لما تحتاج interactivity حقيقية.</p></blockquote>
`,
  },

  {
    id: "seed-3",
    slug: "telegram-bot-business-2026",
    title: "بوتات تيليجرام كبيزنس ─ خطة من الصفر لـ 250 ألف جنيه شهرياً",
    excerpt:
      "ليه بوتات تيليجرام لسه فرصة ذهبية في 2026، أنواع البوتات اللي بتجيب فلوس فعلاً، وإزاي تسعّر شغلك صح.",
    coverImage: "/blog/telegram-bot-business-2026.jpg",
    readTime: 10,
    publishedAt: "2026-04-08T14:00:00Z",
    featured: false,
    tags: ["Telegram", "Bots", "Freelance", "SaaS", "Business"],
    category: { name: "أتمتة", slug: "automation" },
    content: `
<h2>ليه تيليجرام لسه فرصة في 2026؟</h2>
<p>WhatsApp Business API غالي ومعقد. Discord للجيمينج. تيليجرام؟ <strong>API مفتوح، مجاني، وسريع</strong>. كمان عدد المستخدمين العرب فيه بيتضاعف كل سنة.</p>

<h2>أنواع البوتات اللي بتجيب فلوس</h2>
<ol>
  <li><strong>Customer Support Bot</strong> ─ بيرد أسئلة العملاء (RAG على docs الشركة)</li>
  <li><strong>E-commerce Bot</strong> ─ كاتالوج + سلة + دفع</li>
  <li><strong>Booking Bot</strong> ─ حجز مواعيد للعيادات/الكوافير</li>
  <li><strong>Notification Bot</strong> ─ تنبيهات للأسعار، مباريات، إلخ</li>
  <li><strong>AI Tutor Bot</strong> ─ مدرّس مادة معينة بـ GPT</li>
</ol>

<h2>التسعير</h2>
<table>
<tr><th>نوع</th><th>سعر</th><th>متوسط الوقت</th></tr>
<tr><td>بوت بسيط</td><td>10,000 ─ 25,000 جنيه</td><td>3-5 أيام</td></tr>
<tr><td>بوت متوسط (مع DB)</td><td>40,000 ─ 75,000 جنيه</td><td>1-2 أسبوع</td></tr>
<tr><td>SaaS Bot كامل</td><td>150,000+ جنيه</td><td>3-4 أسابيع</td></tr>
</table>

<h2>Stack تقني مقترح</h2>
<ul>
  <li><strong>Python</strong>: <code>aiogram</code> أو <code>python-telegram-bot</code></li>
  <li><strong>Node.js</strong>: <code>grammY</code> ─ الأخف والأسرع</li>
  <li><strong>Database</strong>: PostgreSQL أو SQLite للبدايات</li>
  <li><strong>Hosting</strong>: VPS بـ 250 جنيه/شهر شغّال</li>
</ul>

<h2>إزاي تجيب أول 3 عملاء؟</h2>
<p>اعمل بوت واحد عظيم لـ"نفسك" أو لقطاع تعرفه. حطه مجانًا وخلي الناس تجربه. <strong>الـ portfolio عُملة الفريلانس الحقيقية.</strong></p>
`,
  },

  {
    id: "seed-4",
    slug: "rag-system-arabic-content",
    title: "بناء نظام RAG للمحتوى العربي ─ التحديات والحلول",
    excerpt:
      "الـ RAG شغال زي الفل بالإنجليزي ─ بس مع العربي بتظهر مشاكل التشكيل والـ tokenization. إزاي تبني نظام يفهم العربي صح.",
    coverImage: "/blog/rag-system-arabic-content.jpg",
    readTime: 11,
    publishedAt: "2026-04-01T09:00:00Z",
    featured: false,
    tags: ["RAG", "Arabic NLP", "Embeddings", "Vector DB"],
    category: { name: "ذكاء اصطناعي", slug: "ai" },
    content: `
<h2>RAG في كلمتين</h2>
<p><strong>Retrieval-Augmented Generation</strong>: بدل ما تعلّم نموذج على بياناتك (غالي وبطيء)، بتدوّر على المعلومة وقت السؤال وبتدّيها للنموذج كـ context.</p>

<h2>المشاكل اللي مش بتظهر في الإنجليزي</h2>
<ol>
  <li><strong>التشكيل</strong> ─ "كَتَبَ" و "كتب" ممكن يبقوا embeddings مختلفين</li>
  <li><strong>التطبيع</strong> ─ ا/أ/إ/آ ─ كلها متشابهة لكن مختلفة بايتياً</li>
  <li><strong>Chunking</strong> ─ النصوص العربية أطول، فالحجم الأمثل بيتغير</li>
</ol>

<h2>Pipeline اللي بستخدمه</h2>
<ul>
  <li><strong>Preprocessing</strong>: <code>arabic-reshaper</code> + إزالة التشكيل</li>
  <li><strong>Embeddings</strong>: <code>cohere/embed-multilingual-v3</code> أو <code>BAAI/bge-m3</code></li>
  <li><strong>Vector DB</strong>: Qdrant (بـ Arabic analyzer)</li>
  <li><strong>Reranking</strong>: <code>cohere/rerank-multilingual</code></li>
  <li><strong>LLM</strong>: GPT-4o أو Claude 3.5 Sonnet</li>
</ul>

<h2>قياس الجودة</h2>
<p>متستناش الفيدباك من المستخدم. اعمل dataset صغير من 30 سؤال + إجابة "صح" واختبر بـ <strong>RAGAS</strong>.</p>

<blockquote><p>الـ RAG الجيد مش اللي بيلاقي المعلومة ─ ده اللي بيلاقي الجواب الصحيح من بين 10 معلومات متشابهة.</p></blockquote>
`,
  },

  {
    id: "seed-5",
    slug: "freelancer-pricing-guide-arab",
    title: "إزاي تسعّر شغلك كفريلانسر عربي ─ من تجربة 100+ مشروع",
    excerpt:
      "أكبر غلط بيعمله الفريلانسر العربي: السعر بالساعة. هنا إزاي تتحول لـ value-based pricing وتزوّد دخلك 3-5×.",
    coverImage: "/blog/freelancer-pricing-guide-arab.jpg",
    readTime: 8,
    publishedAt: "2026-03-25T11:00:00Z",
    featured: false,
    tags: ["Freelance", "Pricing", "Business", "Career"],
    category: { name: "فريلانس", slug: "freelance" },
    content: `
<h2>المشكلة مع التسعير بالساعة</h2>
<p>لما بتقول "السعر بالساعة 1000 جنيه" ─ العميل بيحط في دماغه إنك "موظف عن بُعد". ده بيقفلك سقف خفي.</p>

<h2>الـ 3 طُرق الأساسية</h2>
<ol>
  <li><strong>Hourly</strong> ─ حلو للاستشارات السريعة فقط</li>
  <li><strong>Fixed Price</strong> ─ سعر ثابت للمشروع كله</li>
  <li><strong>Value-Based</strong> ─ سعر بناءً على القيمة اللي بتضيفها</li>
</ol>

<h2>إزاي تنتقل لـ Value-Based</h2>
<p>قبل ما تدّي السعر، اسأل:</p>
<ul>
  <li>المشروع ده هيوفّر/يجيب كام للعميل في السنة؟</li>
  <li>إيه المخاطر لو ماتمش؟</li>
  <li>ليه أنت بالذات (مش حد تاني)؟</li>
</ul>

<h2>قاعدة الـ 10%</h2>
<p>سعرك = <strong>10%</strong> من القيمة المتوقعة سنوياً للعميل.</p>
<p>مثال: متجر إلكتروني بيتوقع يبيع 2.5 مليون جنيه في السنة الأولى ─ سعر بنائه: 250 ألف جنيه. منطقي؟ منطقي.</p>

<h2>لما العميل يقول "غالي"</h2>
<p>متخفّضش. اسأل: <em>"غالي مقارنة بإيه؟"</em>. غالباً جوابه هيوضّح إنه مش فاهم القيمة، مش إن السعر فعلاً غالي.</p>

<blockquote><p>السعر اللي بيخوّفك شوية ─ ده غالباً السعر الصحيح.</p></blockquote>
`,
  },

  {
    id: "seed-6",
    slug: "n8n-vs-make-vs-zapier-2026",
    title: "n8n vs Make vs Zapier ─ أنهي أداة أتمتة تختار في 2026؟",
    excerpt:
      "مقارنة عملية بعد استخدام التلاتة في مشاريع حقيقية ─ إيه الفروقات في السعر، السرعة، التحكم، والتعقيد.",
    coverImage: "/blog/n8n-vs-make-vs-zapier-2026.jpg",
    readTime: 7,
    publishedAt: "2026-03-18T10:00:00Z",
    featured: false,
    tags: ["Automation", "n8n", "Make", "Zapier", "No-Code"],
    category: { name: "أتمتة", slug: "automation" },
    content: `
<h2>السؤال الأهم: حسب المشروع</h2>
<p>مفيش "أحسن أداة" ─ في أداة مناسبة لكل حالة. خلينا نشوف.</p>

<h2>Zapier ─ الأسهل</h2>
<ul>
  <li>✅ واجهة بسيطة، مفيش learning curve</li>
  <li>✅ 7000+ تكامل جاهز</li>
  <li>❌ غالي جداً مع كثرة العمليات</li>
  <li>❌ محدود في الـ logic المعقد</li>
</ul>
<p><strong>الأفضل لـ:</strong> non-developers، مهام بسيطة بحجم متوسط</p>

<h2>Make (سابقاً Integromat) ─ الأقوى Visual</h2>
<ul>
  <li>✅ visual builder ممتاز</li>
  <li>✅ تسعير أرخص من Zapier</li>
  <li>✅ تحكم أكتر في الـ flow</li>
  <li>❌ debugging صعب أحياناً</li>
</ul>
<p><strong>الأفضل لـ:</strong> agencies، مشاريع متوسطة بـ logic معقد</p>

<h2>n8n ─ الأقوى تقنياً (وأنا بستخدمه)</h2>
<ul>
  <li>✅ <strong>Self-hosted مجاناً</strong> ─ ده الفرق الأكبر</li>
  <li>✅ بيدعم JavaScript code nodes</li>
  <li>✅ Open source، خصوصية كاملة</li>
  <li>❌ يحتاج VPS وإدارة</li>
</ul>
<p><strong>الأفضل لـ:</strong> developers، شركات عندها بيانات حساسة، أي حد عاوز scale بدون فلوس كتير</p>

<h2>قراري الشخصي</h2>
<p>للمشاريع الشخصية وعملاء عندهم data sensitive ─ <strong>n8n self-hosted</strong>. للعملاء اللي عاوزين حاجة سريعة من غير VPS ─ <strong>Make</strong>.</p>
`,
  },

  {
    id: "seed-7",
    slug: "cybersecurity-basics-developer",
    title: "أساسيات الأمن السيبراني لازم تعرفها كمطوّر",
    excerpt:
      "10 ثغرات شائعة بشوفها في مواقع العملاء ─ كلها قابلة للحل في 30 دقيقة. لو موقعك ما اتفحصش، احتمال 80% فيها ثغرة منهم.",
    coverImage: "/blog/cybersecurity-basics-developer.jpg",
    readTime: 9,
    publishedAt: "2026-03-10T15:00:00Z",
    featured: false,
    tags: ["Security", "OWASP", "Web Security", "Pentesting"],
    category: { name: "أمن سيبراني", slug: "cybersecurity" },
    content: `
<h2>الـ 10 ثغرات الأكثر شيوعاً</h2>
<ol>
  <li><strong>SQL Injection</strong> ─ لسه موجودة في 2026! استخدم prepared statements دايماً.</li>
  <li><strong>XSS</strong> ─ <code>dangerouslySetInnerHTML</code> بدون sanitization</li>
  <li><strong>CSRF</strong> ─ ولا تنسى double-submit cookies</li>
  <li><strong>Open Redirect</strong> ─ <code>?next=...</code> بدون validation</li>
  <li><strong>IDOR</strong> ─ <code>/api/users/123</code> بدون authorization check</li>
  <li><strong>Weak Authentication</strong> ─ JWT في localStorage = خطر</li>
  <li><strong>Misconfigured CORS</strong> ─ <code>*</code> مع credentials</li>
  <li><strong>Exposed .env</strong> ─ شوفت ده 3 مرات الشهر اللي فات</li>
  <li><strong>Outdated dependencies</strong> ─ <code>npm audit</code> أصدقاؤك</li>
  <li><strong>No rate limiting</strong> ─ login endpoint بدون حماية = brute force جنة</li>
</ol>

<h2>Checklist سريعة لأي موقع جديد</h2>
<ul>
  <li>✅ HTTPS only + HSTS</li>
  <li>✅ Content Security Policy header</li>
  <li>✅ Rate limiting على /login، /signup، /forgot-password</li>
  <li>✅ Input validation (Zod أو Yup)</li>
  <li>✅ SQL queries بـ ORM (Prisma، Drizzle)</li>
  <li>✅ Sessions في httpOnly cookies، مش localStorage</li>
  <li>✅ Logs بدون passwords أو tokens</li>
  <li>✅ Backups يومياً</li>
</ul>

<h2>أدوات بستخدمها</h2>
<ul>
  <li><strong>Burp Suite</strong> ─ للـ manual testing</li>
  <li><strong>OWASP ZAP</strong> ─ بديل مجاني</li>
  <li><strong>Snyk</strong> ─ لـ dependencies</li>
  <li><strong>Mozilla Observatory</strong> ─ فحص headers سريع</li>
</ul>

<blockquote><p>الأمن مش feature بتضيفها في الآخر ─ ده mindset من السطر الأول.</p></blockquote>
`,
  },

  {
    id: "seed-8",
    slug: "developer-productivity-stack-2026",
    title: "Stack الإنتاجية اللي بستخدمه يومياً ─ 2026",
    excerpt:
      "كل أداة بستخدمها يومياً مع السبب ─ من الـ IDE للـ note-taking للـ time tracking. كله مجاني أو أرخص من 500 جنيه شهرياً.",
    coverImage: "/blog/developer-productivity-stack-2026.jpg",
    readTime: 6,
    publishedAt: "2026-03-03T08:00:00Z",
    featured: false,
    tags: ["Productivity", "Tools", "Developer", "Workflow"],
    category: { name: "أدوات وإنتاجية", slug: "tools" },
    content: `
<h2>Code & Development</h2>
<ul>
  <li><strong>VS Code + Cursor</strong> ─ AI pair programming</li>
  <li><strong>iTerm2 + zsh + starship</strong> ─ terminal جميل وسريع</li>
  <li><strong>GitHub Copilot</strong> ─ بيوفر 30% من وقت الكتابة</li>
  <li><strong>Postman</strong> ─ لتجربة الـ APIs</li>
</ul>

<h2>تخطيط ومتابعة</h2>
<ul>
  <li><strong>Notion</strong> ─ كل حاجة في مكان واحد</li>
  <li><strong>Linear</strong> ─ task management للمشاريع الكبيرة</li>
  <li><strong>Toggl Track</strong> ─ time tracking خفيف</li>
</ul>

<h2>تواصل</h2>
<ul>
  <li><strong>Telegram</strong> ─ مع العملاء العرب</li>
  <li><strong>Slack</strong> ─ مع فرق العمل</li>
  <li><strong>Cal.com</strong> ─ حجز مواعيد بدون ذهاب وإياب</li>
</ul>

<h2>تعلم</h2>
<ul>
  <li><strong>YouTube</strong> ─ Theo، Fireship، Web Dev Simplified</li>
  <li><strong>Twitter/X</strong> ─ متابعة المطورين الكبار</li>
  <li><strong>Hacker News</strong> ─ أهم الأخبار التقنية</li>
</ul>

<h2>إنتاجية شخصية</h2>
<ul>
  <li><strong>Pomofocus</strong> ─ Pomodoro web</li>
  <li><strong>Cold Turkey</strong> ─ blocker للسوشيال أثناء العمل العميق</li>
  <li><strong>Spotify (Lo-fi)</strong> ─ فوكس + موسيقى = جنة</li>
</ul>

<blockquote><p>أحسن أداة هي اللي بتنساها وأنت بتستخدمها.</p></blockquote>
`,
  },

  {
    id: "seed-9",
    slug: "vibe-coding-with-cascade",
    title: "الـ Vibe Coding ─ إزاي بطوّر بسرعة 5× مع AI Pair Programming",
    excerpt:
      "اشتغال مع Cascade و Cursor و Copilot غيّر طريقة كتابتي للكود. هنا الـ workflow اللي بستخدمه يومياً وبيخلّي شغل 8 ساعات في 90 دقيقة.",
    coverImage: "/blog/vibe-coding-with-cascade.jpg",
    readTime: 10,
    publishedAt: "2026-02-24T13:00:00Z",
    featured: true,
    tags: ["AI", "Productivity", "Cascade", "Cursor", "Copilot"],
    category: { name: "ذكاء اصطناعي", slug: "ai" },
    content: `
<h2>Vibe Coding ─ مصطلح جديد، مفهوم قديم</h2>
<p><strong>Vibe Coding</strong>: إنك تشتغل مع AI كأنه زميل ─ توصف اللي عاوزه بلغة طبيعية، الـ AI يكتب، أنت تراجع.</p>

<h2>Stack بستخدمه</h2>
<ul>
  <li><strong>Cascade (Windsurf)</strong> ─ للمشاريع الكبيرة وـ multi-file edits</li>
  <li><strong>Cursor</strong> ─ بديل ممتاز كمان</li>
  <li><strong>GitHub Copilot</strong> ─ inline autocomplete</li>
  <li><strong>Claude 3.5</strong> ─ للـ architecture والـ reviews</li>
</ul>

<h2>القواعد الذهبية</h2>
<ol>
  <li><strong>Plan قبل Code</strong> ─ كلّم الـ AI 10 دقايق عن الـ design قبل ما يبدأ يكتب</li>
  <li><strong>Small steps</strong> ─ لا تطلب feature كاملة، اطلب function واحدة</li>
  <li><strong>Always review</strong> ─ AI ممكن يكتب bugs ─ راجع كل سطر</li>
  <li><strong>Test as you go</strong> ─ ما تستناش لما تخلص لتعمل tests</li>
</ol>

<h2>إيه اللي AI بيعمله أحسن منك؟</h2>
<ul>
  <li>كتابة boilerplate (forms، CRUD، API routes)</li>
  <li>تحويل design لـ JSX/Tailwind</li>
  <li>كتابة الـ tests</li>
  <li>الـ documentation والـ comments</li>
  <li>refactoring لكود طويل</li>
</ul>

<h2>إيه اللي لسه أنت بتعمله أحسن؟</h2>
<ul>
  <li>القرارات المعمارية الكبيرة</li>
  <li>اختيار الـ libraries الصح</li>
  <li>فهم الـ business logic</li>
  <li>الـ debugging العميق</li>
  <li>تحسين الأداء</li>
</ul>

<blockquote><p>الـ AI مش هيحلّ محلّك ─ المطوّر اللي بيستخدم AI هيحلّ محلّ المطوّر اللي مش بيستخدمه.</p></blockquote>
`,
  },

  {
    id: "seed-10",
    slug: "monorepo-or-not-2026",
    title: "Monorepo أو لا؟ خبرة من مشاريع كبيرة وصغيرة",
    excerpt:
      "Turborepo، Nx، pnpm workspaces ─ كلهم بيقولوا monorepo هو الحل. بس امتى فعلاً تحتاجه؟ تجربتي بعد 4 مشاريع.",
    coverImage: "/blog/monorepo-or-not-2026.jpg",
    readTime: 7,
    publishedAt: "2026-02-17T09:00:00Z",
    featured: false,
    tags: ["Monorepo", "Architecture", "Turborepo", "Nx"],
    category: { name: "تطوير الويب", slug: "web-dev" },
    content: `
<h2>الـ Hype مش دايماً صح</h2>
<p>كل twitter بيقول monorepo. لكن في مشاريع صغيرة ─ ده بيزود التعقيد بدون فايدة.</p>

<h2>إمتى تستخدم Monorepo؟</h2>
<ul>
  <li>✅ عندك 2+ apps بيشاركوا نفس الـ packages</li>
  <li>✅ عندك design system / UI library مشترك</li>
  <li>✅ فريق 3+ مطورين</li>
  <li>✅ Backend + Frontend + Mobile كلهم في مكان واحد</li>
</ul>

<h2>إمتى ما تستخدمهوش؟</h2>
<ul>
  <li>❌ مشروع واحد، مطور واحد</li>
  <li>❌ MVP بسرعة</li>
  <li>❌ ما عندكش experience في الـ build tools</li>
</ul>

<h2>الأدوات</h2>
<ol>
  <li><strong>pnpm workspaces</strong> ─ الأبسط، كافي لمعظم الحالات</li>
  <li><strong>Turborepo</strong> ─ لو عندك build pipeline معقد</li>
  <li><strong>Nx</strong> ─ enterprise، fully-featured، learning curve أكبر</li>
</ol>

<h2>النصيحة</h2>
<p>ابدأ بـ <strong>single repo</strong>. لما تحس فعلاً إنك بتنسخ كود ─ وقتها فكّر في monorepo. مش قبل.</p>

<blockquote><p>التعقيد المبكّر هو سبب موت أكتر من 50% من الـ side projects.</p></blockquote>
`,
  },

  {
    id: "seed-11",
    slug: "abud-platform-case-study",
    title: "كيف بنيت منصة ABUD الكاملة ─ من الفكرة للنشر على VPS",
    excerpt:
      "Case study عملي لبناء منصة شخصية متكاملة: Next.js 15 + Prisma + PostgreSQL + لوحة إدارة + SEO. كل خطوة من التخطيط لحد الـ deployment.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80",
    readTime: 14,
    publishedAt: "2026-05-10T10:00:00Z",
    featured: true,
    tags: ["Next.js", "Case Study", "Full-Stack", "VPS", "Prisma"],
    category: { name: "تطوير الويب", slug: "web-dev" },
    content: `
<h2>ليه بنيت المنصة دي من الصفر؟</h2>
<p>كل مرة كنت بفتح portfolio أو بعمل update لموقعي، كنت بضيع وقت في تعديلات صغيرة. المحتوى مبعثر، البيانات يدوية، ولوحة الإدارة غير موجودة. <strong>الحل</strong>: منصة واحدة تجمع كل حاجة — بورتفوليو، مدونة، خدمات، متجر، ولوحة إدارة كاملة.</p>

<h2>1. التخطيط المعماري</h2>
<p>اخترت <strong>Next.js 15 App Router</strong> لأنها بتديني:</p>
<ul>
  <li>Server Components افتراضيًا — سرعة وSEO أحسن</li>
  <li>Server Actions — خلاص على API routes</li>
  <li>Streaming + Suspense — تجربة مستخدم سلسة</li>
  <li>Route Groups — فصل الـ Admin عن الـ Site بسهولة</li>
</ul>

<h2>2. قاعدة البيانات والـ ORM</h2>
<p><strong>PostgreSQL + Prisma</strong> — Prisma بتوفر type safety وmigration سهلة. الجداول الأساسية:</p>
<ul>
  <li><code>PortfolioProject</code> — بيانات المشاريع مع JSON fields للتفاصيل</li>
  <li><code>BlogPost</code> — مقالات مع tags وcategories</li>
  <li><code>Service</code> — الخدمات التجارية</li>
  <li><code>Settings</code> — إعدادات الموقع القابلة للتعديل</li>
</ul>

<h2>3. لوحة الإدارة</h2>
<p>بنيت لوحة Admin داخلية مش منفصلة:</p>
<ul>
  <li>Auth بـ NextAuth.js (Credentials Provider)</li>
  <li>Dashboard cards بـ stats حقيقية</li>
  <li>CRUD كامل لكل المحتوى</li>
  <li>Seed scripts للبيانات الافتراضية</li>
</ul>

<h2>4. SEO والأداء</h2>
<ul>
  <li>generateMetadata ديناميكي لكل صفحة</li>
  <li>Structured Data (BlogPosting, BreadcrumbList, FAQPage)</li>
  <li>Dynamic Open Graph images لكل مقال</li>
  <li>Sitemap.ts + robots.ts</li>
  <li>Framer Motion للـ animations بدون تأثير على LCP</li>
</ul>

<h2>5. Deployment على VPS</h2>
<p>مستخدمش Vercel عشين:</p>
<ul>
  <li><strong>Full control</strong> على السيرفر والـ environment</li>
  <li><strong>Cost</strong> — VPS بـ 5$ شهريًا بيكفيني</li>
  <li><strong>CI/CD</strong> — GitHub Actions → VPS عبر SSH</li>
</ul>
<p>الـ Stack: Ubuntu + Nginx + PM2 + PostgreSQL + Node.js 22.</p>

<h2>النتائج</h2>
<ul>
  <li>100% TypeScript — zero runtime errors</li>
  <li>Core Web Vitals Green على كل الصفحات</li>
  <li>إدارة محتوى كاملة من لوحة واحدة</li>
  <li>مشروع مفتوح المصدر قابل لإعادة الاستخدام</li>
</ul>

<blockquote><p>المنصة الجيدة مش اللي بتظهر بس ─ ده اللي بتقدر تدير محتواك منها بسهولة.</p></blockquote>
`,
  },

  {
    id: "seed-12",
    slug: "3bud-erp-system-case-study",
    title: "بناء ERP عربي من الصفر ─ تجربة 3BUD ERP",
    excerpt:
      "Case study لنظام ERP متكامل لإدارة المتاجر: المبيعات، المخزون، العملاء، والفواتير. إزاي حلّينا مشكلة التشتت في الأدوات المنفصلة.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80",
    readTime: 11,
    publishedAt: "2026-05-05T08:00:00Z",
    featured: false,
    tags: ["ERP", "Business", "Next.js", "PostgreSQL", "Dashboard"],
    category: { name: "تطوير الويب", slug: "web-dev" },
    content: `
<h2>المشكلة: كل حاجة في مكان</h2>
<p>أصحاب المتاجر الصغيرة بيستخدموا Excel للمخزون، WhatsApp للطلبات، ودفتر للفواتير. <strong>النتيجة</strong>: أخطاء يومية، طلبات بتضيع، ومفيش رؤية واضحة للأداء.</p>

<h2>التحليل</h2>
<p>قعدت 3 أيام أتابع عملية يومية كاملة لمتجر إلكتروني صغير. اكتشفت إن 60% من الوقت بيروح في:</p>
<ol>
  <li>التحويل بين التطبيقات المختلفة</li>
  <li>إعادة إدخال نفس البيانات</li>
  <li>البحث عن معلومة قديمة</li>
</ol>

<h2>الحل: نظام واحد بـ 5 وحدات</h2>
<ul>
  <li><strong>Orders</strong> — استلام وتتبع الطلبات من الاستلام للتسليم</li>
  <li><strong>Inventory</strong> — مخزون فعلي مع تنبيهات عند النقص</li>
  <li><strong>Customers</strong> — سجل عملاء شامل بتاريخ المشتريات</li>
  <li><strong>Invoices</strong> — فواتير تلقائية مع PDF export</li>
  <li><strong>Reports</strong> — تقارير يومية وأسبوعية وشهرية</li>
</ul>

<h2>التقنية</h2>
<ul>
  <li><strong>Frontend</strong>: Next.js 15 + Tailwind + shadcn/ui</li>
  <li><strong>Backend</strong>: Server Actions + Prisma + PostgreSQL</li>
  <li><strong>Auth</strong>: NextAuth.js (role-based)</li>
  <li><strong>Charts</strong>: Recharts للتقارير المرئية</li>
  <li><strong>PDF</strong>: jsPDF للفواتير</li>
</ul>

<h2>التحدي الأكبر</h2>
<p>تصميم الـ data model. كل منتج بيتأثر بالمخزون، كل طلب بيأثر بالمخزون، كل عميل بيتأثر بتاريخ الطلبات. الحل كان <strong>Prisma relations</strong> دقيقة مع <code>onDelete</code> و <code>onUpdate</code> rules واضحة.</p>

<h2>النتائج</h2>
<ul>
  <li>تقليل وقت المتابعة اليومية بنسبة 70%</li>
  <li>صفر أخطاء في الفواتير (قبل كانت 2-3 يوميًا)</li>
  <li>رؤية فورية للأداء والمخزون</li>
</ul>

<blockquote><p>الـ ERP الناجح مش اللي فيه ميزات كتير ─ ده اللي بيختصر خطوات يومية حقيقية.</p></blockquote>
`,
  },

  {
    id: "seed-13",
    slug: "promptforge-ai-case-study",
    title: "PromptForge AI ─ إزاي ساعدت الناس يصيّغوا Prompts أحسن",
    excerpt:
      "Case study لمنصة هندسة الـ Prompts بالعربي. إزاي حوّلنا مشكلة صعوبة التعامل مع LLMs لمنتج عملي ومفيد.",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&auto=format&fit=crop&q=80",
    readTime: 9,
    publishedAt: "2026-04-28T12:00:00Z",
    featured: false,
    tags: ["AI", "LLM", "Prompt Engineering", "Next.js", "Case Study"],
    category: { name: "ذكاء اصطناعي", slug: "ai" },
    content: `
<h2>المشكلة: LLMs بـتفهمش العربي كويس؟</h2>
<p>الناس بتقول "ChatGPT مش بيفهم العربي". الحقيقة: <strong>المشكلة في الـ Prompt مش في النموذج</strong>. جملة غير دقيقة بالعربي بتدي نتيجة ضعيفة — نفس الجملة مترجمة للإنجليزي بتدي نتيجة أحسن. ليه؟ لأن الناس بيعرفوا يصيّغوا بالإنجليزي أحسن.</p>

<h2>الفكرة</h2>
<p>أعمل منصة تساعد المستخدم العربي في:</p>
<ul>
  <li>صياغة Prompts دقيقة بالعربي</li>
  <li>تحويل Prompts للإنجليزي بجودة عالية</li>
  <li>تخزين وإعادة استخدام القوالب</li>
  <li>تعلم Pattern Engineering بالتدريج</li>
</ul>

<h2>التصميم التقني</h2>
<ul>
  <li><strong>UI</strong>: واجهة بسيطة — input للموضوع، واختيار الغرض (كتابة، ترجمة، شرح، إلخ)</li>
  <li><strong>Backend</strong>: Server Action بتبعت للـ LLM prompt محسّن مسبقًا</li>
  <li><strong>Optimization</strong>: chain-of-thought prompting مدمج في الـ system prompt</li>
  <li><strong>Storage</strong>: localStorage للقوالب (نسخة MVP)</li>
</ul>

<h2>الـ Prompt Engineering اللي استخدمته</h2>
<ol>
  <li><strong>Role Prompting</strong>: "أنت خبير في [المجال]"</li>
  <li><strong>Few-shot</strong>: أمثلة على الـ output المطلوب</li>
  <li><strong>Chain-of-Thought</strong>: "فكّر خطوة بخطوة"</li>
  <li><strong>Output Formatting</strong>: JSON أو Markdown حسب الاستخدام</li>
</ol>

<h2>النتائج</h2>
<ul>
  <li>تحسين جودة الـ responses بنسبة 40% (مقارنة بـ prompts عشوائية)</li>
  <li>توفير 50% من وقت التجربة والتعديل</li>
  <li>قاعدة بيانات 200+ prompt template</li>
</ul>

<blockquote><p>LLM بيفهم العربي كويس — بس محتاج يتكلم معاه بشكل صحيح.</p></blockquote>
`,
  },

  {
    id: "seed-14",
    slug: "telegram-mini-app-store-case-study",
    title: "Telegram Mini App لمتجر إلكتروني ─ لماذا اخترنا تيليجرام بدل التطبيقات العادية",
    excerpt:
      "Case study لتطبيق متجر مصغّر داخل تيليجرام. إزاي حلّينا مشكلة التسرب في رحلة الشراء باستخدام Mini Apps API.",
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&auto=format&fit=crop&q=80",
    readTime: 10,
    publishedAt: "2026-04-20T09:00:00Z",
    featured: false,
    tags: ["Telegram", "Mini App", "E-commerce", "Mobile UX", "Case Study"],
    category: { name: "أتمتة", slug: "automation" },
    content: `
<h2>المشكلة: كل خطوة زيادة = عميل أقل</h2>
<p>إحصائيات التجارة الإلكترونية بتقول إن <strong>كل خطوة إضافية في checkout بتفقدك 20-30% من العملاء</strong>. العميل بيشوف منتج على Instagram، يدوس link، يستنى التطبيق يفتح (أو ينزل)، يسجل، يدفع. 5 خطوات = 80% تسرب.</p>

<h2>لماذا Telegram Mini App؟</h2>
<ul>
  <li><strong>لا تحميل</strong> — التطبيق موجود جوا تيليجرام نفسه</li>
  <li><strong>لا تسجيل</strong> — الـ user معروف بالفعل من Telegram</li>
  <li><strong>Speed</strong> — WebView سريع، لا store approval</li>
  <li><strong>Distribution</strong> — Bot يبعت الكاتالوج، Mini App يخلّي الشراء</li>
  <li><strong>Payments</strong> — Telegram Payments API مدعومة</li>
</ul>

<h2>تجربة المستخدم</h2>
<p>رحلة الشراء بقت 3 خطوات:</p>
<ol>
  <li>العميل يفتح البوت ويشوف الكاتالوج</li>
  <li>يدوس على منتج → يفتح Mini App</li>
  <li>يضيف للسلة ويدفع — كله داخل تيليجرام</li>
</ol>

<h2>التقنية</h2>
<ul>
  <li><strong>Framework</strong>: Next.js 15 (Static Export للـ Mini App)</li>
  <li><strong>Styling</strong>: Tailwind CSS — lightweight وresponsive</li>
  <li><strong>Telegram SDK</strong>: <code>@telegram-apps/sdk</code> للـ theme وUser data</li>
  <li><strong>State</strong>: React Context (المتجر صغير، مش محتاج Redux)</li>
  <li><strong>Payment</strong>: Telegram Payments API + webhook confirmation</li>
</ul>

<h2>التحدي: الـ WebView</h2>
<p>Telegram WebView فيه قيود:</p>
<ul>
  <li>no external links (مفتوحة في browser خارجي)</li>
  <li>restricted access للـ localStorage</li>
  <li>theme بيتغير حسب إعدادات المستخدم</li>
</ul>
<p>الحل: استخدمنا <code>Telegram SDK</code> لقراءة الـ theme variables وعملنا fallback للـ colors.</p>

<h2>النتائج</h2>
<ul>
  <li>تقليل خطوات الشراء من 5 لـ 3</li>
  <li>تحسين معدل التحويل بنسبة 35% (مقارنة بمتجر خارجي)</li>
  <li>وقت التطوير: 10 أيام فقط (MVP)</li>
</ul>

<blockquote><p>العميل مش بيدور على "تطبيق" ─ بيدور على "سهولة".</p></blockquote>
`,
  },

  {
    id: "seed-15",
    slug: "vps-monitor-bot-case-study",
    title: "بوت مراقبة VPS على تيليجرام ─ DevOps للمبتدئين",
    excerpt:
      "Case study لبوت بسيط يراقب موارد السيرفر ويبعت تنبيهات فورية. إزاي بنيت أداة DevOps عملية بـ Python في يوم واحد.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format&fit=crop&q=80",
    readTime: 8,
    publishedAt: "2026-04-12T14:00:00Z",
    featured: false,
    tags: ["DevOps", "Telegram Bot", "Python", "Monitoring", "VPS"],
    category: { name: "أدوات وإنتاجية", slug: "tools" },
    content: `
<h2>المشكلة: السيرفر بيقع وأنا نايم</h2>
<p>بعد ما نشرت مشروع على VPS، كنت بفتح SSH كل ساعتين أتأكد إن السيرفر شغال. <strong>ده مش DevOps ─ ده paranoia</strong>. محتاج أداة تراقب لوحدها وتنبّهني.</p>

<h2>المتطلبات</h2>
<ul>
  <li>مراقبة CPU و RAM و Disk Usage</li>
  <li>تنبيه فوري لو الاستهلاك تجاوز 80%</li>
  <li>تقرير دوري يومي (صباحًا)</li>
  <li>أوامر بسيطة: /status، /alert، /logs</li>
  <li>تشغيل 24/7 بدون تعقيد</li>
</ul>

<h2>التقنية</h2>
<ul>
  <li><strong>Language</strong>: Python 3.11</li>
  <li><strong>Bot Framework</strong>: <code>python-telegram-bot</code> (v20+ async)</li>
  <li><strong>System Metrics</strong>: <code>psutil</code> — cross-platform وموثوق</li>
  <li><strong>Scheduling</strong>: <code>APScheduler</code> للتقارير الدورية</li>
  <li><strong>Deployment</strong>: Docker + systemd على Ubuntu VPS</li>
</ul>

<h2>الهيكل</h2>
<pre><code>/vps_bot
├── bot.py           # التشغيل الرئيسي
├── monitor.py       # قراءة الموارد
├── alerts.py        # منطق التنبيهات
├── commands.py      # أوامر التيليجرام
├── config.py        # الإعدادات
└── Dockerfile       # containerization</code></pre>

<h2>منطق التنبيهات</h2>
<p>مش بس "لو CPU > 80%". بنتظر <strong>5 دقائق متتالية</strong> عشان نتجنب الـ false positives. التنبيه بيجي بصيغة:</p>
<pre><code>⚠️ تنبيه: CPU Usage 87%
Server: abud-vps-01
Time: 2026-04-12 02:15 UTC
Action: جاري مراجعة الـ logs...</code></pre>

<h2>Deployment سريع</h2>
<ol>
  <li>Build Docker image</li>
  <li>Push لـ VPS</li>
  <li>systemd service مع auto-restart</li>
  <li>GitHub Actions للـ CI/CD</li>
</ol>

<h2>النتائج</h2>
<ul>
  <li>اكتشاف مشكلة Disk 95% قبل ما السيرفر يعلق</li>
  <li>تقرير يومي بيخليني أعرف لو في traffic spike</li>
  <li>وقت التطوير: يوم واحد</li>
  <li>تشغيل مستمر من 3 شهور بدون restart</li>
</ul>

<blockquote><p>DevOps مش بس Kubernetes ─ DevOps هو إنك تعرف حالة سيرفرك في أي وقت.</p></blockquote>
`,
  },

  {
    id: "seed-16",
    slug: "task-manager-bot-case-study",
    title: "بوت إدارة المهام الشخصي ─ لماذا استخدمت SQLite بدل PostgreSQL",
    excerpt:
      "Case study لبوت تيليجرام لإدارة المهام اليومية. تحليل لماذا اخترت SQLite لبيانات شخصية وكيف بنيت نظام تذكيرات ذكي.",
    coverImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&auto=format&fit=crop&q=80",
    readTime: 9,
    publishedAt: "2026-04-05T11:00:00Z",
    featured: false,
    tags: ["Telegram Bot", "Productivity", "Python", "SQLite", "Case Study"],
    category: { name: "أدوات وإنتاجية", slug: "tools" },
    content: `
<h2>المشكلة: أدوات كتيرة = مهام ضايعة</h2>
<p>كنت باستخدم Notion للمشاريع الكبيرة، Reminders للتذكيرات، وWhatsApp notes للحاجات السريعة. <strong>النتيجة</strong>: مهام بتتكرر، deadlines بتتعدى، وشعور دائم إني ناسي حاجة.</p>

<h2>القرار: بوت داخل تيليجرام</h2>
<p>ليه تيليجرام؟</p>
<ul>
  <li>مفتوح 24/7 على الموبايل</li>
  <li>سريع — أضيف مهمة في 3 ثواني</li>
  <li>ما فيش switching cost — مش محتاج أفتح app تاني</li>
  <li>أوامر نصية سهلة: <code>/add اجتماع مع العميل الساعة 3</code></li>
</ul>

<h2>لماذا SQLite؟</h2>
<p>أغلب الناس هيقول "PostgreSQL أحسن". فعلاً، بس للبيانات <strong>الشخصية والمحلية</strong>:</p>
<ul>
  <li>✅ Zero setup — ملف واحد</li>
  <li>✅ No server process — أخف بكتير</li>
  <li>✅ Backups سهلة — نسخ الملف كفاية</li>
  <li>✅ Single user — مفيش concurrency issues</li>
  <li>❌ لو 1000+ user في نفس الوقت → PostgreSQL</li>
</ul>
<p>الـ Bot ده شخصي (وأصدقائي). SQLite كافي ومثالي.</p>

<h2>التقنية</h2>
<ul>
  <li><strong>Language</strong>: Python 3.11</li>
  <li><strong>Bot</strong>: <code>python-telegram-bot</code> (async)</li>
  <li><strong>Database</strong>: SQLite + <code>sqlite3</code> (stdlib)</li>
  <li><strong>Scheduling</strong>: <code>APScheduler</code> (background thread)</li>
  <li><strong>NLP</strong>: regex-based parsing للتواريخ والأولويات</li>
  <li><strong>Deploy</strong>: Docker + VPS</li>
</ul>

<h2>الأوامر</h2>
<ul>
  <li><code>/add [مهمة]</code> — إضافة مهمة</li>
  <li><code>/today</code> — المهام اليوم</li>
  <li><code>/week</code> — ملخص الأسبوع</li>
  <li><code>/done [id]</code> — إكمال مهمة</li>
  <li><code>/remind [مهمة] [وقت]</code> — تذكير مخصص</li>
</ul>

<h2>نظام التذكيرات</h2>
<p>التذكيرات مش مجرد alarm. البوت بيحلّل:</p>
<ol>
  <li>لو مهمة عاجلة (priority: high) → تذكير قبلها بـ 30 دقيقة وقبلها بـ 5 دقائق</li>
  <li>لو مهمة عادية → تذكير واحد قبلها بـ 15 دقيقة</li>
  <li>ملخص يومي الساعة 8 صباحًا بكل المهام المتبقية</li>
</ol>

<h2>النتائج</h2>
<ul>
  <li>تقليل نسيان المهام بنسبة 90%</li>
  <li>تحسين الالتزام بالمواعيد</li>
  <li>أخف من أي تطبيق إدارة مهام</li>
  <li>مفتوح المصدر — قابل للتخصيص لأي حد</li>
</ul>

<blockquote><p>أحسن أداة إنتاجية هي اللي بتكون في مكانك الأساسي — تيليجرام.</p></blockquote>
`,
  },

  {
    id: "seed-17",
    slug: "mohamy-platform-case-study",
    title: "بناء منصة قانونية عربية ─ كيف نقلت خدمة المحاماة للرقمية",
    excerpt:
      "Case study لمنصة Mohamy: تحويل الخدمات القانونية لوجود رقمي موثوق. التحديات، التصميم، والتقنية من وراء الكواليس.",
    coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&auto=format&fit=crop&q=80",
    readTime: 10,
    publishedAt: "2026-03-28T08:00:00Z",
    featured: false,
    tags: ["Legal Tech", "Next.js", "RTL", "UX", "Case Study"],
    category: { name: "تطوير الويب", slug: "web-dev" },
    content: `
<h2>المشكلة: العميل بيدور على محامي على Google بس بيلاقي بطاقات بيزنس فاضية</h2>
<p>القطاع القانوني في المنطقة العربية من أكتر القطاعات اللي بتفتقر لوجود رقمي فعّال. العميل لما بيحتاج استشارة قانونية، بيتصل بصديق يسأله عن "محامي كويس" بدل ما يلاقي خدمة واضحة اونلاين.</p>

<h2>التحليل: إيه اللي بيخلي العميل يختار محامي؟</h2>
<p>قعدت أدرس سلوك 20 عميل طلبوا خدمات قانونية:</p>
<ul>
  <li><strong>الثقة</strong> — العميل مش بيدفع فلوس، بيدفع لمؤسسة قانونية</li>
  <li><strong>الوضوح</strong> — محتاج يعرف بالظبط إيه الخدمة وكام سعرها</li>
  <li><strong>السرعة</strong> — مش هينتظر 3 أيام رد على إيميل</li>
  <li><strong>اللغة</strong> — العربي أسهل من الإنجليزي في السياق القانوني</li>
</ul>

<h2>الحل: منصة Mohamy</h2>
<p>منصة بسيطة بس مركّزة على <strong>3 حاجات فقط</strong>:</p>
<ol>
  <li><strong>عرض الخدمات</strong> — كل خدمة واضحة، بسعرها، وبمدة تنفيذها</li>
  <li><strong>طلب استشارة</strong> — نموذج مباشر بدون تعقيد</li>
  <li><strong>توثيق المحتوى</strong> — مقالات قانونية تبني الثقة</li>
</ol>

<h2>تصميم الثقة (Trust by Design)</h2>
<p>المنصة القانونية مش زي متجر ملابس. العميل هنا بيدفع مقابل وعد. عشان كده التصميم ركز على:</p>
<ul>
  <li>Colors محايدة ومهنية — بعيد عن التدرجات الصارخة</li>
  <li>Typography واضحة — خطوط عربية ثقيلة تعكس الجدية</li>
  <li>Whitespace كتير — كل element بيتنفس، مفيش ازدحام</li>
  <li>Testimonials حقيقية — بأسماء حقيقية (بموافقتهم)</li>
  <li>خطوات واضحة — العميل يعرف واقف فين في رحلته</li>
</ul>

<h2>التقنية</h2>
<ul>
  <li><strong>Next.js 14</strong> — SSR لـ SEO (العملاء بيدوروا على Google)</li>
  <li><strong>TypeScript</strong> — type safety للبيانات القانونية</li>
  <li><strong>Prisma + PostgreSQL</strong> — تخزين الخدمات والطلبات</li>
  <li><strong>Tailwind CSS</strong> — تصميم RTL سريع ومرن</li>
  <li><strong>NextAuth.js</strong> — auth للعملاء وللوحة الإدارة</li>
</ul>

<h2>التحدي الأكبر</h2>
<p>التصنيف القانوني. القانون مش مقسم لـ "أحوال شخصية" و"تجاري" بس. فيه sub-categories كتير. الحل:</p>
<ul>
  <li>Tree structure للخدمات — parent + child categories</li>
  <li>Search بـ autocomplete مع synonyms</li>
  <li>FAQ page مرتبطة بكل خدمة</li>
</ul>

<h2>النتائج</h2>
<ul>
  <li>قاعدة تقنية جاهزة للتوسع (ممكن تضيف مدن، مكاتب، محامين)</li>
  <li>تجربة استخدام مهنية تبني الثقة من أول visit</li>
  <li>SEO-optimized للبحث المحلي ("محامي في القاهرة")</li>
</ul>

<blockquote><p>العميل القانوني مش بيدور على "موقع حلو" ─ بيدور على "مؤسسة موثوقة".</p></blockquote>
`,
  },

  {
    id: "seed-18",
    slug: "iqtida-platform-case-study",
    title: "Iqtida ─ بناء منصة للاقتداء والنماذج الملهمة في بيئة رقمية",
    excerpt:
      "Case study لمنصة Iqtida: إزاي جمعنا نماذج القدوات من فيديوهات متفرقة لمكتبة رقمية منظمة تساعد الناس على التعلم الموجّه.",
    coverImage: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=1600&auto=format&fit=crop&q=80",
    readTime: 9,
    publishedAt: "2026-03-20T10:00:00Z",
    featured: false,
    tags: ["Education", "Content Platform", "Next.js", "Community", "Case Study"],
    category: { name: "تطوير الويب", slug: "web-dev" },
    content: `
<h2>المشكلة: النماذج الملهمة موجودة بس مش منظمة</h2>
<p>فيديوهات يوتيوب ملهمة، مقالات على Medium، بودكاستس على Spotify، وتويتر threads. المحتوى موجود بس <strong>مبعثر</strong>. لو حد عايز يتعلم من قدوة في مجال معين، بيضيع وقت في البحث بدل التعلم.</p>

<h2>التحليل</h2>
<p>سألت 15 شخص: "لو عايز تتعلم حاجة جديدة، إزاي بتختار قدوتك؟"</p>
<ul>
  <li>60% بيعتمد على "فلان قالي عن فلان"</li>
  <li>25% بيدوروا على YouTube بس بيضيعوا في noise</li>
  <li>15% بيقروا كتب — بس الكتب مش كلها practical</li>
</ul>
<p>الاحتياج واضح: <strong>مكتبة منظمة لنماذج حقيقية</strong>، مش نظريات.</p>

<h2>الفكرة: Iqtida</h2>
<p>منصة بسيطة بتجمع نماذج ملهمة (قدوات) في مجالات مختلفة:</p>
<ul>
  <li>كل قدوة ليها profile واضح: مجاله، إنجازاته، مصادر التعلم</li>
  <li>تصنيفات حسب المجال: تقنية، ريادة أعمال، فنون، علوم، إلخ</li>
  <li>محتوى عربي موجّه — لأن معظم المحتوى الملهم إنجليزي</li>
  <li>Community-driven: أي حد يقدر يقترح قدوة جديدة</li>
</ul>

<h2>بناء Taxonomy واضح</h2>
<p>التحدي الأكبر: إزاي نصنّف القدوات؟ حد ممكن يكون "مبرمج" و"كاتب" و"رائد أعمال" في نفس الوقت. الحل:</p>
<ol>
  <li><strong>Primary category</strong> — المجال الرئيسي (واحد)</li>
  <li><strong>Tags</strong> — المهارات الفرعية (متعدد)</li>
  <li><strong>Era/Context</strong> — القرن أو البيئة (عشان القدوات التاريخية)</li>
  <li><strong>Resources</strong> — كتب، فيديوهات، مقالات مرتبطة</li>
</ol>

<h2>التقنية</h2>
<ul>
  <li><strong>Next.js 14</strong> — App Router مع ISR لـ content-heavy pages</li>
  <li><strong>TypeScript</strong> — strict types للـ taxonomy</li>
  <li><strong>Tailwind CSS</strong> — تصميم بسيط يركز على المحتوى</li>
  <li><strong>Node.js</strong> — API lightweight لإضافة القدوات</li>
  <li><strong>Prisma</strong> — relational data للتصنيفات والقدوات</li>
</ul>

<h2>تجربة المستخدم</h2>
<p>الـ landing page مش "hero section ضخم" — ده directory واضح:</p>
<ul>
  <li>بحث سريع في أول الصفحة</li>
  <li>فلتر حسب المجال</li>
  <li>بطاقة لكل قدوة: صورة، اسم، مجال، 3 إنجازات</li>
  <li>صفحة detail: سيرة، مصادر، اقتباسات</li>
</ul>

<h2>النتائج</h2>
<ul>
  <li>مكتبة منظمة لـ 50+ قدوة في مجالات مختلفة</li>
  <li>محتوى عربي موجّه — ملأ فجوة في المحتوى التعليمي</li>
  <li>قاعدة تقنية تسمح بإضافة مجالات وقدوات جديدة بسهولة</li>
  <li>Architecture جاهز لـ user-generated content مستقبلًا</li>
</ul>

<blockquote><p>التعلم من القدوات أسرع من التعلم من الكتب ─ بس لازم القدوة تكون واضحة ومنظمة.</p></blockquote>
`,
  },
];
