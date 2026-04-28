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
    coverImage: null,
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
    coverImage: null,
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
    title: "بوتات تيليجرام كبيزنس ─ خطة من الصفر للـ$5K شهرياً",
    excerpt:
      "ليه بوتات تيليجرام لسه فرصة ذهبية في 2026، أنواع البوتات اللي بتجيب فلوس فعلاً، وإزاي تسعّر شغلك صح.",
    coverImage: null,
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
<tr><td>بوت بسيط</td><td>$200-500</td><td>3-5 أيام</td></tr>
<tr><td>بوت متوسط (مع DB)</td><td>$800-1500</td><td>1-2 أسبوع</td></tr>
<tr><td>SaaS Bot كامل</td><td>$3000+</td><td>3-4 أسابيع</td></tr>
</table>

<h2>Stack تقني مقترح</h2>
<ul>
  <li><strong>Python</strong>: <code>aiogram</code> أو <code>python-telegram-bot</code></li>
  <li><strong>Node.js</strong>: <code>grammY</code> ─ الأخف والأسرع</li>
  <li><strong>Database</strong>: PostgreSQL أو SQLite للبدايات</li>
  <li><strong>Hosting</strong>: VPS بـ$5/شهر شغّال</li>
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
    coverImage: null,
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
    coverImage: null,
    readTime: 8,
    publishedAt: "2026-03-25T11:00:00Z",
    featured: false,
    tags: ["Freelance", "Pricing", "Business", "Career"],
    category: { name: "فريلانس", slug: "freelance" },
    content: `
<h2>المشكلة مع التسعير بالساعة</h2>
<p>لما بتقول "السعر بالساعة $20" ─ العميل بيحط في دماغه إنك "موظف عن بُعد". ده بيقفلك سقف خفي.</p>

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
<p>مثال: متجر إلكتروني بيتوقع يبيع $50K في السنة الأولى ─ سعر بنائه: $5K. منطقي؟ منطقي.</p>

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
    coverImage: null,
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
    coverImage: null,
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
      "كل أداة بستخدمها يومياً مع السبب ─ من الـ IDE للـ note-taking للـ time tracking. كله مجاني أو ارخص من $10/شهر.",
    coverImage: null,
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
    coverImage: null,
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
    coverImage: null,
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
];
