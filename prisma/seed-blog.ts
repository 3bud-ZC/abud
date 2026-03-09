import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const AUTHOR = "Abud";

function post(
  slug: string, title: string, excerpt: string, coverImage: string,
  catId: string, tags: string[], readTime: number, featured: boolean,
  metaDesc: string, content: string
) {
  return { slug, title, excerpt, coverImage, categoryId: catId, tags: JSON.stringify(tags), readTime, featured, metaDesc, content, metaTitle: title, status: "published", publishedAt: new Date() };
}

async function main() {
  console.log("🌱 إنشاء تصنيفات ومقالات المدونة...");

  // ── Categories ──────────────────────────────────────────
  const [catAI, catDigital, catFreelance, catPassive, catBusiness, catProductivity] = await Promise.all([
    prisma.blogCategory.upsert({ where: { slug: "ai-tools" },           update: {}, create: { name: "AI Tools",         slug: "ai-tools" } }),
    prisma.blogCategory.upsert({ where: { slug: "digital-products-b" }, update: {}, create: { name: "Digital Products", slug: "digital-products-b" } }),
    prisma.blogCategory.upsert({ where: { slug: "freelancing" },        update: {}, create: { name: "Freelancing",       slug: "freelancing" } }),
    prisma.blogCategory.upsert({ where: { slug: "passive-income" },     update: {}, create: { name: "Passive Income",    slug: "passive-income" } }),
    prisma.blogCategory.upsert({ where: { slug: "online-business" },    update: {}, create: { name: "Online Business",   slug: "online-business" } }),
    prisma.blogCategory.upsert({ where: { slug: "productivity" },       update: {}, create: { name: "Productivity",      slug: "productivity" } }),
  ]);
  console.log("✅ تصنيفات المدونة جاهزة");

  // ── Posts ────────────────────────────────────────────────
  const posts = [

    // 1
    post("make-money-online-ai-tools-2025",
      "How to Make Money Online Using AI Tools in 2025",
      "AI tools are no longer just for tech giants. In 2025, anyone with a laptop and internet connection can use AI to build real income streams — here's exactly how.",
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200",
      catAI.id, ["AI", "make money online", "income"], 8, true,
      "Discover how to leverage AI tools in 2025 to build real online income streams — from freelancing to digital products.",
      `<h2>Why AI Changes Everything for Online Income</h2>
<p>Just a few years ago, building an online business required serious skills in design, coding, writing, and marketing. Today, AI tools handle most of that heavy lifting — and the playing field has never been more level.</p>
<p>In 2025, the people making serious money online aren't necessarily the most technically skilled. They're the ones who know <strong>how to use AI effectively</strong>.</p>

<h2>5 Real Ways to Make Money with AI Tools</h2>

<h3>1. AI-Assisted Freelancing</h3>
<p>Use tools like ChatGPT, Claude, and Midjourney to complete freelance work 3-5x faster. Writers, designers, and developers using AI earn more per hour because they can take on more projects.</p>
<ul>
  <li>Copywriting and content creation with ChatGPT</li>
  <li>Logo and graphic design with Midjourney or DALL-E</li>
  <li>Code assistance with GitHub Copilot</li>
  <li>Video scripts and editing with AI tools</li>
</ul>

<h3>2. Selling AI-Generated Digital Products</h3>
<p>Create e-books, templates, prompt packs, and guides using AI — then sell them on your own store or platforms like Gumroad. One well-crafted guide can sell for years.</p>

<h3>3. AI-Powered Content Monetization</h3>
<p>Use AI to produce consistent blog content, YouTube scripts, or newsletters. More content = more traffic = more affiliate income and ad revenue.</p>

<h3>4. Offer AI Consulting Services</h3>
<p>Most businesses have no idea how to implement AI. If you understand a few tools well, you can charge $50–$200/hour to advise small businesses on automation and workflow improvement.</p>

<h3>5. Build Micro-SaaS Products with AI</h3>
<p>Tools like Bubble, Glide, and AI APIs let you build small software products without deep coding knowledge. Solve a specific niche problem and charge a monthly subscription.</p>

<h2>Which AI Tools Should You Start With?</h2>
<ul>
  <li><strong>ChatGPT / Claude</strong> — content, research, customer support scripts</li>
  <li><strong>Midjourney</strong> — visual content, product mockups</li>
  <li><strong>GitHub Copilot</strong> — code faster, fix bugs instantly</li>
  <li><strong>Notion AI</strong> — organize your business and ideas</li>
  <li><strong>ElevenLabs</strong> — AI voice for videos and podcasts</li>
</ul>

<h2>The Key Mindset Shift</h2>
<p>Stop thinking of AI as a replacement for your skills. Think of it as a multiplier. A good freelancer using AI can do the work of three people — and charge accordingly.</p>
<p>The opportunity is massive right now because most people still aren't using these tools seriously. Early adopters always win.</p>

<h2>Conclusion</h2>
<p>AI tools in 2025 represent one of the biggest wealth-creation opportunities for regular people. Whether you freelance, sell digital products, or build a content business, AI gives you an unfair advantage — if you choose to use it.</p>
<p>Start small. Pick one income stream. Use AI to work faster. Then scale what works.</p>

<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(160deg,rgba(18,10,30,1),rgba(10,10,18,1));border:1px solid rgba(147,51,234,0.25);border-radius:1rem;text-align:center;">
  <p style="color:#c084fc;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Ready to take action?</p>
  <p style="color:#606080;margin-bottom:1rem;">Explore our AI Tools Guide and Developer resources to get started today.</p>
  <a href="/store" style="display:inline-block;padding:0.6rem 1.5rem;background:linear-gradient(135deg,#9333ea,#6d28d9);color:white;border-radius:0.75rem;font-weight:600;text-decoration:none;">Browse the Store →</a>
</div>`
    ),

    // 2
    post("10-digital-products-you-can-sell-online",
      "10 Digital Products You Can Sell Online (And Keep 100% Profit)",
      "Digital products have zero inventory cost, instant delivery, and unlimited scalability. Here are 10 proven types you can create and sell starting today.",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
      catDigital.id, ["digital products", "passive income", "online business"], 7, false,
      "10 proven digital product ideas you can create and sell online with zero inventory cost and 100% profit margin.",
      `<h2>Why Digital Products Are the Ultimate Business Model</h2>
<p>You create it once, and it sells forever. No shipping, no inventory, no manufacturing costs. The profit margins on digital products are among the highest of any business model — often 90% or more.</p>
<p>Better yet, you don't need to be a programmer or designer to create them. You just need knowledge and the right tools.</p>

<h2>10 Digital Product Types That Actually Sell</h2>

<h3>1. PDF Guides and E-Books</h3>
<p>Package your expertise into a structured guide. The best sellers solve a specific, painful problem. Price range: $7–$50.</p>

<h3>2. Templates</h3>
<p>Website templates, Notion dashboards, Figma UI kits, Excel spreadsheets — people pay good money to save time. Price range: $15–$97.</p>

<h3>3. Checklists and Swipe Files</h3>
<p>Short but high-value resources that save hours of research. A "Website Launch Checklist" or "Cold Email Swipe File" can sell for $5–$25.</p>

<h3>4. Online Courses and Video Tutorials</h3>
<p>The highest-earning digital product category. Even a 1-hour focused course on a specific skill can sell for $49–$299.</p>

<h3>5. Prompt Packs (AI Prompts)</h3>
<p>Collections of tested ChatGPT or Midjourney prompts for specific use cases. This is a booming market in 2025. Price range: $9–$49.</p>

<h3>6. Software Tools and Scripts</h3>
<p>Simple automation scripts, browser extensions, or utility apps. If you can code, even small tools sell well. Price range: $19–$199.</p>

<h3>7. Photography and Digital Art</h3>
<p>Stock photos, illustrations, icon packs, and digital art. Sell on your own store or platforms like Creative Market.</p>

<h3>8. Music and Audio Assets</h3>
<p>Background music tracks, sound effects, podcast intros. Used by content creators worldwide.</p>

<h3>9. Roadmaps and Study Plans</h3>
<p>Structured learning paths for popular skills (web dev, cybersecurity, etc.). Developers and students pay well for clarity.</p>

<h3>10. Consulting Packages (Digital Service)</h3>
<p>While not a "downloadable" product, productized consulting — where you offer a fixed service at a fixed price — scales beautifully when paired with digital downloads.</p>

<h2>How to Price Your Digital Products</h2>
<ul>
  <li>Price based on the <strong>value it delivers</strong>, not hours spent creating it</li>
  <li>Start lower to get reviews, then raise prices as social proof builds</li>
  <li>Bundle products for higher average order values</li>
  <li>Offer a free mini-version to build trust before the paid product</li>
</ul>

<h2>Conclusion</h2>
<p>Digital products are the fastest path to building truly passive income. Start with what you already know. Package it clearly, price it fairly, and promote it consistently. The first sale is the hardest — everything gets easier from there.</p>

<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(160deg,rgba(18,10,30,1),rgba(10,10,18,1));border:1px solid rgba(147,51,234,0.25);border-radius:1rem;text-align:center;">
  <p style="color:#c084fc;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">See our digital products in action</p>
  <p style="color:#606080;margin-bottom:1rem;">Browse our curated collection of guides, templates, and developer tools.</p>
  <a href="/store" style="display:inline-block;padding:0.6rem 1.5rem;background:linear-gradient(135deg,#9333ea,#6d28d9);color:white;border-radius:0.75rem;font-weight:600;text-decoration:none;">Visit the Store →</a>
</div>`
    ),

    // 3
    post("beginner-guide-to-freelancing",
      "Beginner Guide to Freelancing: Get Your First Client This Week",
      "No portfolio, no reviews, no experience — no problem. This guide shows you the exact steps to land your first freelancing client, even if you're starting from zero.",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
      catFreelance.id, ["freelancing", "clients", "beginner guide"], 9, false,
      "Step-by-step guide to landing your first freelancing client with no experience, no portfolio, and no reviews.",
      `<h2>The Biggest Lie About Freelancing</h2>
<p>"You need years of experience and a massive portfolio to start freelancing." That's completely false. Thousands of people land their first client every week with zero prior freelance experience. Here's how.</p>

<h2>Step 1: Pick One Skill and Own It</h2>
<p>The fastest way to get stuck is trying to offer everything. Pick ONE service and become the obvious choice for that specific thing.</p>
<ul>
  <li>Web development (a specific niche: e.g., WordPress for restaurants)</li>
  <li>Copywriting (e.g., email sequences for SaaS companies)</li>
  <li>Graphic design (e.g., social media graphics for coaches)</li>
  <li>Cybersecurity audits (e.g., small business website security)</li>
  <li>Video editing (e.g., YouTube shorts for course creators)</li>
</ul>
<p>Specialization is not limiting — it's <strong>clarifying</strong>. It makes it easier for clients to say yes.</p>

<h2>Step 2: Build a "Good Enough" Portfolio</h2>
<p>No clients? No problem. Create 2–3 spec projects (work you did for yourself or a fictional client). A portfolio shows what you <em>can</em> do, not just what you've done for others.</p>

<h2>Step 3: Set Up Your Profiles</h2>
<ul>
  <li><strong>Upwork</strong> — best for long-term client relationships</li>
  <li><strong>Fiverr</strong> — best for quick project-based work</li>
  <li><strong>LinkedIn</strong> — best for high-ticket B2B work</li>
  <li><strong>Personal website</strong> — your most credible online presence</li>
</ul>
<p>Your profile headline should state exactly who you help and how. Example: "I build fast, secure websites for small businesses."</p>

<h2>Step 4: Send 10 Outreach Messages Today</h2>
<p>Don't wait to be discovered. Find 10 potential clients right now and send personalized messages. The formula:</p>
<ul>
  <li>Compliment something specific about their work</li>
  <li>Identify one problem you noticed</li>
  <li>Offer a specific solution</li>
  <li>End with a low-commitment call to action</li>
</ul>

<h2>Step 5: Price Smart, Not Cheap</h2>
<p>Many beginners underprice themselves to get clients. This creates a race to the bottom. Instead, price at a level that still feels fair to the client but respects your time. You can always lower — but it's hard to raise once set.</p>

<h2>Conclusion</h2>
<p>Freelancing is one of the fastest ways to earn money online because you're trading real skill for real money — no algorithm, no viral moment required. Start with one skill, one profile, and ten outreach messages. Your first client is closer than you think.</p>

<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(160deg,rgba(18,10,30,1),rgba(10,10,18,1));border:1px solid rgba(147,51,234,0.25);border-radius:1rem;text-align:center;">
  <p style="color:#c084fc;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Equip yourself for freelancing success</p>
  <p style="color:#606080;margin-bottom:1rem;">Get the Freelancer Toolkit — contracts, proposals, invoices, and more, all ready to use.</p>
  <a href="/store" style="display:inline-block;padding:0.6rem 1.5rem;background:linear-gradient(135deg,#9333ea,#6d28d9);color:white;border-radius:0.75rem;font-weight:600;text-decoration:none;">Get the Toolkit →</a>
</div>`
    ),

    // 4
    post("best-ai-tools-productivity-automation-2025",
      "Best AI Tools for Productivity and Automation in 2025",
      "The right AI tools don't just save time — they completely change how you work. Here's the definitive list of AI tools that professionals are using to automate and accelerate their workflows.",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200",
      catAI.id, ["AI tools", "productivity", "automation"], 10, false,
      "The best AI tools for productivity and automation in 2025 — vetted, categorized, and explained for real-world use.",
      `<h2>The AI Productivity Stack in 2025</h2>
<p>AI tools have matured significantly. The question is no longer "should I use AI?" but "which tools actually deliver ROI?" Here's a curated breakdown by category.</p>

<h2>Writing and Content Creation</h2>
<ul>
  <li><strong>ChatGPT-4o</strong> — Research, drafting, editing, brainstorming. The most versatile tool available.</li>
  <li><strong>Claude 3.5</strong> — Superior for long-form writing and nuanced instruction-following.</li>
  <li><strong>Jasper</strong> — Specifically optimized for marketing copy and ads.</li>
  <li><strong>Grammarly AI</strong> — Real-time writing improvement, tone adjustment, and paraphrasing.</li>
</ul>

<h2>Code and Development</h2>
<ul>
  <li><strong>GitHub Copilot</strong> — Autocomplete entire functions. Essential for any developer.</li>
  <li><strong>Cursor</strong> — AI-first code editor that understands your entire codebase.</li>
  <li><strong>Tabnine</strong> — Privacy-focused AI code completion for enterprise teams.</li>
</ul>

<h2>Automation and Workflow</h2>
<ul>
  <li><strong>Zapier AI</strong> — Build automation workflows using natural language. No-code.</li>
  <li><strong>Make (Integromat)</strong> — Advanced automation with complex branching logic.</li>
  <li><strong>n8n</strong> — Open-source automation. Runs on your server for full control.</li>
</ul>

<h2>Design and Visuals</h2>
<ul>
  <li><strong>Midjourney</strong> — Best image quality for creative and marketing visuals.</li>
  <li><strong>Canva AI</strong> — Magic design tools, instant background removal, AI image generation.</li>
  <li><strong>Figma AI</strong> — Prototype and design with AI assistance built in.</li>
</ul>

<h2>Research and Knowledge Management</h2>
<ul>
  <li><strong>Perplexity AI</strong> — Search with citations. Replaces hours of Google research.</li>
  <li><strong>Notion AI</strong> — Summarize notes, generate content, organize projects intelligently.</li>
  <li><strong>Readwise Reader</strong> — AI-powered reading and knowledge retention tool.</li>
</ul>

<h2>How to Build Your AI Stack</h2>
<p>Don't try to use everything at once. Instead:</p>
<ol>
  <li>Identify your biggest time sink each day</li>
  <li>Find one AI tool that addresses it</li>
  <li>Use it for 30 days until it becomes habit</li>
  <li>Add the next tool</li>
</ol>

<h2>Conclusion</h2>
<p>The difference between a 40-hour workweek and a 20-hour one is increasingly just knowing which AI tools to use. Invest a few hours learning the right tools, and they'll pay you back in thousands of hours saved.</p>

<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(160deg,rgba(18,10,30,1),rgba(10,10,18,1));border:1px solid rgba(147,51,234,0.25);border-radius:1rem;text-align:center;">
  <p style="color:#c084fc;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Go deeper with our AI Tools Guide</p>
  <p style="color:#606080;margin-bottom:1rem;">Our dedicated guide shows you how to integrate these tools into real developer and business workflows.</p>
  <a href="/store" style="display:inline-block;padding:0.6rem 1.5rem;background:linear-gradient(135deg,#9333ea,#6d28d9);color:white;border-radius:0.75rem;font-weight:600;text-decoration:none;">Get the Guide →</a>
</div>`
    ),

    // 5
    post("start-online-business-zero-capital",
      "How to Start an Online Business with Zero Capital",
      "You don't need money to make money online — you need skills, consistency, and the right strategy. Here's a practical roadmap to launch your first online business starting from $0.",
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200",
      catBusiness.id, ["online business", "zero capital", "startup"], 8, false,
      "A practical roadmap to launching your first online business with zero starting capital in 2025.",
      `<h2>The Zero-Capital Business Reality</h2>
<p>When people say "start a business with no money," they usually mean: use your existing skills instead of buying products, use free tools instead of paid ones, and grow organically instead of buying ads.</p>
<p>This absolutely works — but it requires more time and effort upfront. Here's the honest roadmap.</p>

<h2>Phase 1: The Service Business (Month 1–3)</h2>
<p>The fastest zero-capital path is selling a service. You trade time and skill for money — no upfront investment required.</p>
<ul>
  <li>Identify your strongest skill (writing, coding, design, marketing, etc.)</li>
  <li>Create a simple one-page website or portfolio</li>
  <li>Reach out to 10 potential clients per day</li>
  <li>Deliver exceptional results for your first 3 clients</li>
</ul>
<p>Goal: Earn $500–$2,000 per month by month 3.</p>

<h2>Phase 2: Productize Your Service (Month 3–6)</h2>
<p>Once you're earning consistently, start converting your service knowledge into digital products. This is where you escape trading time for money.</p>
<ul>
  <li>Create a guide based on the most common questions your clients ask</li>
  <li>Build a template pack from your best deliverables</li>
  <li>Package your process into a mini-course</li>
</ul>

<h2>Phase 3: Build Systems and Scale (Month 6+)</h2>
<ul>
  <li>Automate repetitive tasks with free tools (Zapier, Make, n8n)</li>
  <li>Build an email list — own your audience, don't rent it from social media</li>
  <li>Reinvest early profits into tools that multiply your output</li>
  <li>Add more product offerings as you understand what your audience needs</li>
</ul>

<h2>Free Tools That Replace Paid Alternatives</h2>
<ul>
  <li><strong>Canva</strong> (free tier) → replaces paid design tools</li>
  <li><strong>Notion</strong> (free tier) → replaces project management software</li>
  <li><strong>Gumroad</strong> (zero upfront cost) → digital product sales platform</li>
  <li><strong>Mailchimp</strong> (free up to 500 contacts) → email marketing</li>
  <li><strong>ChatGPT</strong> (free tier) → content creation, research, copywriting</li>
</ul>

<h2>The One Thing That Matters Most</h2>
<p>Consistency beats strategy every time. Most people who fail at online businesses quit within the first 60 days. If you stick with a clear strategy for 90 days, you will see results. It's almost mathematical.</p>

<h2>Conclusion</h2>
<p>Zero capital doesn't mean zero effort. It means redirecting effort to replace money. Start with your skills, add products, build systems. The business that takes 6 months to build can run for years with minimal maintenance.</p>

<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(160deg,rgba(18,10,30,1),rgba(10,10,18,1));border:1px solid rgba(147,51,234,0.25);border-radius:1rem;text-align:center;">
  <p style="color:#c084fc;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Start with the right foundation</p>
  <p style="color:#606080;margin-bottom:1rem;">Browse our developer and business resources to fast-track your online business journey.</p>
  <a href="/store" style="display:inline-block;padding:0.6rem 1.5rem;background:linear-gradient(135deg,#9333ea,#6d28d9);color:white;border-radius:0.75rem;font-weight:600;text-decoration:none;">Explore Resources →</a>
</div>`
    ),

    // 6
    post("passive-income-ideas-that-actually-work",
      "Passive Income Ideas That Actually Work in 2025",
      "Most passive income advice is either outdated or misleading. This post cuts through the noise and shows you the legitimate, proven methods that generate real recurring income.",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200",
      catPassive.id, ["passive income", "income streams", "financial freedom"], 9, true,
      "Legitimate passive income ideas that work in 2025 — no hype, no scams, just proven methods with honest expectations.",
      `<h2>The Truth About Passive Income</h2>
<p>Passive income is real — but it's never truly passive at the start. Every "passive" income stream requires significant upfront work to build. The reward is that once it's running, it generates money with minimal ongoing effort.</p>
<p>Here are the methods that consistently work in 2025, ranked by startup difficulty.</p>

<h2>Low Barrier to Entry</h2>

<h3>1. Digital Products</h3>
<p><strong>How it works:</strong> Create a guide, template, or tool once and sell it indefinitely.</p>
<p><strong>Startup time:</strong> 1–4 weeks to create the product, 1–3 months to generate consistent sales.</p>
<p><strong>Earning potential:</strong> $200–$10,000/month depending on niche and audience size.</p>

<h3>2. Affiliate Marketing</h3>
<p><strong>How it works:</strong> Promote other people's products and earn a commission on each sale.</p>
<p><strong>Best for:</strong> People who already create content (blog, YouTube, newsletter).</p>
<p><strong>Earning potential:</strong> $100–$50,000+/month for established content creators.</p>

<h3>3. Stock Photography and Digital Assets</h3>
<p>Upload photos, illustrations, or video clips to platforms like Shutterstock, Adobe Stock, or Envato. Each download earns you a royalty — forever.</p>

<h2>Medium Barrier to Entry</h2>

<h3>4. Online Courses</h3>
<p>Record a course on a specific skill once and sell it on platforms like Udemy, Teachable, or your own site. Top courses earn thousands per month for years after creation.</p>

<h3>5. Software Tools (Micro-SaaS)</h3>
<p>Build a small tool that solves a specific problem and charge a monthly subscription. Even 50 users at $20/month = $1,000/month recurring revenue.</p>

<h3>6. Newsletter Monetization</h3>
<p>Grow an email list around a specific topic, then monetize through sponsorships, premium tiers, or affiliated product recommendations.</p>

<h2>Higher Barrier to Entry (But Higher Returns)</h2>

<h3>7. YouTube Channel</h3>
<p>Takes 12–24 months to reach monetization threshold, but once there, ad revenue compounds as your video library grows.</p>

<h3>8. Dividend Investing</h3>
<p>Invest in dividend-paying stocks or ETFs. Requires capital upfront but generates consistent quarterly income.</p>

<h2>Which Should You Start With?</h2>
<p>If you're a developer, designer, or writer: <strong>start with digital products or affiliate marketing</strong>. You can create sellable assets with your existing skills right now.</p>
<p>If you have some capital: combine digital products with selective reinvestment into content marketing to compound growth.</p>

<h2>Conclusion</h2>
<p>Passive income isn't a shortcut — it's a long game that pays off exponentially. Pick one method, commit to it for 6 months, and don't quit before you see results. The compound effect is real.</p>

<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(160deg,rgba(18,10,30,1),rgba(10,10,18,1));border:1px solid rgba(147,51,234,0.25);border-radius:1rem;text-align:center;">
  <p style="color:#c084fc;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Build your first passive income stream today</p>
  <p style="color:#606080;margin-bottom:1rem;">Our digital guides and templates help you launch faster and smarter.</p>
  <a href="/store" style="display:inline-block;padding:0.6rem 1.5rem;background:linear-gradient(135deg,#9333ea,#6d28d9);color:white;border-radius:0.75rem;font-weight:600;text-decoration:none;">Start Here →</a>
</div>`
    ),

    // 7
    post("how-to-build-personal-brand-online",
      "How to Build a Personal Brand Online (And Why It's Your Most Valuable Asset)",
      "Your personal brand is the foundation of every online income stream. Here's a practical, step-by-step guide to building one that attracts clients, followers, and opportunities.",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200",
      catBusiness.id, ["personal brand", "online presence", "marketing"], 7, false,
      "Step-by-step guide to building a personal brand online that attracts clients, opportunities, and income.",
      `<h2>Why Personal Branding Matters More Than Ever</h2>
<p>In a world of infinite content and unlimited options, trust is the ultimate competitive advantage. Your personal brand is simply how people perceive you when you're not in the room — and in the online world, that perception determines everything.</p>
<p>People hire people they know, like, and trust. A strong personal brand shortens that journey dramatically.</p>

<h2>Step 1: Define Your Brand Foundation</h2>
<p>Before creating any content, answer these questions:</p>
<ul>
  <li><strong>Who are you serving?</strong> Be specific. "Developers" is too broad. "Developers transitioning to cybersecurity" is a niche.</li>
  <li><strong>What unique value do you provide?</strong> Your combination of skills, experience, and perspective is unique to you.</li>
  <li><strong>What do you want to be known for?</strong> Pick 1–2 core topics and own them.</li>
</ul>

<h2>Step 2: Choose Your Primary Platform</h2>
<ul>
  <li><strong>LinkedIn</strong> — Best for B2B, professional services, consulting</li>
  <li><strong>Twitter/X</strong> — Best for tech, startup, and developer communities</li>
  <li><strong>YouTube</strong> — Best for in-depth educational content</li>
  <li><strong>Instagram/TikTok</strong> — Best for visual storytelling and younger audiences</li>
</ul>
<p>Start with ONE platform. Master it before expanding.</p>

<h2>Step 3: Create a Content System</h2>
<p>Consistency beats frequency. Posting 3 times per week for 6 months beats posting daily for 3 weeks then disappearing.</p>
<p>The Content Pyramid:</p>
<ul>
  <li><strong>Pillar content</strong> (1x/month) — long-form article or video on a core topic</li>
  <li><strong>Supporting content</strong> (3x/week) — shorter posts, tips, insights</li>
  <li><strong>Engagement content</strong> (daily) — comments, replies, community interaction</li>
</ul>

<h2>Step 4: Build Your Own Platform</h2>
<p>Social media platforms can change their algorithm, ban accounts, or disappear. Your personal website and email list are assets you own forever.</p>
<ul>
  <li>Set up a professional personal website with your portfolio and services</li>
  <li>Start an email newsletter — even 200 subscribers is a powerful asset</li>
  <li>Publish your best thinking as blog posts for SEO</li>
</ul>

<h2>Step 5: Monetize Your Brand</h2>
<p>Once you have an audience, monetization options multiply:</p>
<ul>
  <li>Consulting and coaching</li>
  <li>Digital products and courses</li>
  <li>Speaking and workshops</li>
  <li>Sponsored content and partnerships</li>
  <li>Affiliate marketing</li>
</ul>

<h2>Conclusion</h2>
<p>Your personal brand is an asset that compounds over time. Every piece of content you publish, every relationship you build, every problem you solve in public — it all adds up. Start small, stay consistent, and let the compounding do the work.</p>

<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(160deg,rgba(18,10,30,1),rgba(10,10,18,1));border:1px solid rgba(147,51,234,0.25);border-radius:1rem;text-align:center;">
  <p style="color:#c084fc;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Accelerate your brand with the right tools</p>
  <p style="color:#606080;margin-bottom:1rem;">From portfolio templates to freelancer systems — everything you need is in our store.</p>
  <a href="/store" style="display:inline-block;padding:0.6rem 1.5rem;background:linear-gradient(135deg,#9333ea,#6d28d9);color:white;border-radius:0.75rem;font-weight:600;text-decoration:none;">Explore the Store →</a>
</div>`
    ),

    // 8
    post("future-of-ai-in-online-business",
      "The Future of AI in Online Business: What's Coming and How to Prepare",
      "AI is changing online business faster than any technology before it. Here's an honest look at what's coming in the next 2–3 years and the practical moves you can make today to stay ahead.",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200",
      catAI.id, ["AI", "future", "online business trends"], 8, false,
      "An honest analysis of AI's impact on online business over the next 2-3 years and what you should do to prepare.",
      `<h2>We're at an Inflection Point</h2>
<p>The AI tools available today would have seemed like science fiction 5 years ago. And they're still improving rapidly. For online business owners, this creates both enormous opportunity and real disruption risk.</p>
<p>The key is to understand which trends to lean into and which threats to prepare for.</p>

<h2>Trends That Will Define the Next 3 Years</h2>

<h3>1. AI Agents Taking Over Repetitive Work</h3>
<p>AI agents — systems that can take sequences of actions autonomously — will handle customer support, content scheduling, data analysis, and basic coding tasks. Businesses that adopt this early will have significant cost advantages.</p>

<h3>2. Hyper-Personalization at Scale</h3>
<p>AI makes it possible to personalize website content, emails, and product recommendations for every individual user automatically. This will become a baseline expectation, not a premium feature.</p>

<h3>3. The Rise of One-Person Businesses</h3>
<p>AI enables individual creators and builders to run what previously required a team. We'll see more solo-operated businesses generating $1M+ annually. The barrier to entry for "real businesses" keeps dropping.</p>

<h3>4. Voice and Multimodal Interfaces</h3>
<p>Text-only interactions are giving way to voice, image, and video AI interfaces. E-commerce, customer service, and content consumption will fundamentally change.</p>

<h3>5. AI-Generated Content Saturation</h3>
<p>The internet will be flooded with AI-generated content. This is the threat: undifferentiated AI content will have zero value. The opportunity: human expertise, unique perspective, and verified trust will become <em>more</em> valuable, not less.</p>

<h2>What to Do Right Now</h2>
<ul>
  <li><strong>Become an AI power user</strong> — not just using it occasionally, but building it into every workflow</li>
  <li><strong>Build your email list now</strong> — owned audience beats algorithmic reach as AI content commoditizes SEO</li>
  <li><strong>Invest in your unique expertise</strong> — AI can generate generic content, not genuine expertise</li>
  <li><strong>Learn to build AI-assisted products</strong> — products that incorporate AI features will outcompete static alternatives</li>
  <li><strong>Document your processes</strong> — so you can automate them when the right AI tool arrives</li>
</ul>

<h2>The Skills That Won't Be Automated</h2>
<p>Critical thinking, original research, relationship building, strategic decision-making, creative direction, and ethical judgment — these remain uniquely human. Build your business around them.</p>

<h2>Conclusion</h2>
<p>The future of AI in online business is not AI replacing humans — it's AI replacing humans who aren't using AI. The opportunity for prepared, adaptable builders has never been bigger. Start learning, start building, and stay curious.</p>

<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(160deg,rgba(18,10,30,1),rgba(10,10,18,1));border:1px solid rgba(147,51,234,0.25);border-radius:1rem;text-align:center;">
  <p style="color:#c084fc;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Stay ahead of the curve</p>
  <p style="color:#606080;margin-bottom:1rem;">Get the AI Tools for Developers Guide and start building your AI-powered workflow today.</p>
  <a href="/store" style="display:inline-block;padding:0.6rem 1.5rem;background:linear-gradient(135deg,#9333ea,#6d28d9);color:white;border-radius:0.75rem;font-weight:600;text-decoration:none;">Get the Guide →</a>
</div>`
    ),

    // 9
    post("how-to-sell-digital-products-successfully",
      "How to Sell Digital Products Successfully: A Step-by-Step System",
      "Creating a digital product is only half the battle. The other half is building a system that finds buyers consistently. Here's the complete framework for sustainable digital product sales.",
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=1200",
      catDigital.id, ["digital products", "sales", "marketing"], 9, false,
      "Complete framework for consistently selling digital products — from product creation to traffic to conversion optimization.",
      `<h2>The Product-Market Fit Problem</h2>
<p>Most people who fail at selling digital products don't have a quality problem — they have a distribution problem. A great product with no marketing strategy earns nothing. A mediocre product marketed to the right audience consistently earns money.</p>
<p>Here's the complete system to do both well.</p>

<h2>Part 1: Create a Product Worth Buying</h2>
<ul>
  <li><strong>Solve a painful, specific problem.</strong> "How to get your first freelance client in 7 days" sells better than "The Complete Freelancing Guide."</li>
  <li><strong>Format for the buyer's lifestyle.</strong> PDFs for readers, videos for visual learners, templates for the action-oriented.</li>
  <li><strong>Price based on the value of the outcome,</strong> not your time to create it.</li>
</ul>

<h2>Part 2: Build a Sales System</h2>

<h3>The Traffic → Trust → Transaction Framework</h3>
<p>Sales don't happen in isolation. They happen at the end of a journey:</p>
<ol>
  <li><strong>Traffic</strong> — People discover you (SEO, social media, word of mouth)</li>
  <li><strong>Trust</strong> — They consume your free content and believe you can help them</li>
  <li><strong>Transaction</strong> — They buy your product because the outcome is clear and the price is fair</li>
</ol>

<h3>Free Content as Your Sales Engine</h3>
<p>The best digital product sellers are also generous content creators. Blog posts, YouTube videos, newsletters, and social content pre-sell your products by demonstrating your expertise for free.</p>
<p>One well-ranking blog post can drive consistent sales for years.</p>

<h2>Part 3: Optimize Your Sales Page</h2>
<ul>
  <li>Lead with the outcome, not the features</li>
  <li>Use social proof (testimonials, screenshots, reviews)</li>
  <li>Address the top 3 objections explicitly</li>
  <li>Make the CTA clear and repeated 2–3 times on the page</li>
  <li>Offer a money-back guarantee to reduce purchase friction</li>
</ul>

<h2>Part 4: Build an Email List</h2>
<p>An email list converts 3–5x better than social media. Offer a free mini-version of your product (a "lead magnet") in exchange for an email address, then nurture subscribers toward the paid version.</p>

<h2>Part 5: Scale What Works</h2>
<ul>
  <li>Identify which traffic source brings your best buyers</li>
  <li>Double down on that channel</li>
  <li>Create upsells and bundles to increase average order value</li>
  <li>Add affiliate partners who promote your products for a commission</li>
</ul>

<h2>Conclusion</h2>
<p>Successful digital product sales is a system, not luck. Build the right product, distribute it consistently, optimize based on data, and the revenue becomes predictable and scalable. Start with one product, learn the full cycle, then expand.</p>

<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(160deg,rgba(18,10,30,1),rgba(10,10,18,1));border:1px solid rgba(147,51,234,0.25);border-radius:1rem;text-align:center;">
  <p style="color:#c084fc;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Ready to launch your first digital product?</p>
  <p style="color:#606080;margin-bottom:1rem;">Browse our collection of templates and guides designed to help you build and sell online.</p>
  <a href="/store" style="display:inline-block;padding:0.6rem 1.5rem;background:linear-gradient(135deg,#9333ea,#6d28d9);color:white;border-radius:0.75rem;font-weight:600;text-decoration:none;">Browse Products →</a>
</div>`
    ),

    // 10
    post("best-side-hustles-for-students-2025",
      "The Best Side Hustles for Students in 2025",
      "Being a student doesn't mean being broke. These side hustles are specifically designed to fit around a student schedule — flexible, skill-building, and genuinely profitable.",
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200",
      catFreelance.id, ["side hustle", "students", "income"], 7, false,
      "The best side hustle ideas for students in 2025 — flexible, skill-building, and profitable with no experience required.",
      `<h2>Why Students Have an Unfair Advantage</h2>
<p>As a student, you have something most adults don't: time flexibility. Yes, you have classes and studying — but you also have the ability to work at 11pm, take on a project over a weekend, or spend a summer going all-in on a side hustle.</p>
<p>You also have lower financial pressure, meaning you can reinvest your early earnings to grow faster.</p>

<h2>Side Hustles Ranked by Income Potential</h2>

<h3>Tier 1: High Earning Potential (For Technically Skilled Students)</h3>
<ul>
  <li><strong>Freelance Web Development</strong> — Build websites for local businesses. $500–$3,000 per project. Learn React + basic backend and you're in demand immediately.</li>
  <li><strong>Freelance Cybersecurity</strong> — Website security audits, vulnerability testing. Even junior-level skills command $50–$100/hour.</li>
  <li><strong>UI/UX Design</strong> — If you can use Figma and understand user experience, small businesses will pay well for design work.</li>
</ul>

<h3>Tier 2: Medium Earning Potential (For Most Students)</h3>
<ul>
  <li><strong>Content Writing</strong> — $25–$100 per article for blogs and websites. Scales quickly as you build a portfolio.</li>
  <li><strong>Social Media Management</strong> — Manage Instagram/LinkedIn for small businesses. $200–$800/month per client.</li>
  <li><strong>Tutoring</strong> — Online tutoring in your strong subjects. $20–$60/hour with platforms like Wyzant or direct clients.</li>
  <li><strong>Video Editing</strong> — YouTube creators constantly need editors. $50–$500 per video depending on complexity.</li>
</ul>

<h3>Tier 3: Lower Earning (But Zero Experience Required)</h3>
<ul>
  <li>Data entry and virtual assistance</li>
  <li>Transcription services</li>
  <li>Survey and research platforms</li>
  <li>Stock photography</li>
</ul>

<h2>The Smart Strategy: Skill Up While Earning</h2>
<p>The best side hustles as a student aren't just about money — they're about building skills that compound. A student who spends 2 years freelancing as a web developer graduates with a portfolio, client testimonials, and real income experience that no classroom can replicate.</p>

<h2>How to Start This Week</h2>
<ol>
  <li>Pick one skill from Tier 1 or Tier 2 above</li>
  <li>Spend 20 hours learning the fundamentals (free resources abound)</li>
  <li>Create one sample project to demonstrate the skill</li>
  <li>Reach out to 5 people/businesses who could use it</li>
  <li>Do the first project even at a discount — the review is worth more than the money</li>
</ol>

<h2>Conclusion</h2>
<p>The best time to start building income skills is when you have the time to experiment without serious financial pressure — and that's exactly where you are as a student. Start one hustle, commit to it for 90 days, and see what's possible.</p>

<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(160deg,rgba(18,10,30,1),rgba(10,10,18,1));border:1px solid rgba(147,51,234,0.25);border-radius:1rem;text-align:center;">
  <p style="color:#c084fc;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Equip yourself with the right resources</p>
  <p style="color:#606080;margin-bottom:1rem;">The Freelancer Toolkit and Developer Roadmap are built specifically for people just getting started.</p>
  <a href="/store" style="display:inline-block;padding:0.6rem 1.5rem;background:linear-gradient(135deg,#9333ea,#6d28d9);color:white;border-radius:0.75rem;font-weight:600;text-decoration:none;">See Starter Resources →</a>
</div>`
    ),

    // 11
    post("how-automation-saves-hours-of-work",
      "How Automation Can Save You 20+ Hours Per Week",
      "Automation isn't just for developers and large companies. With today's no-code tools, anyone can automate the repetitive tasks stealing hours from their week.",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200",
      catProductivity.id, ["automation", "productivity", "no-code"], 8, false,
      "Practical guide to automating repetitive business and personal tasks using no-code tools — save 20+ hours every week.",
      `<h2>The Hidden Cost of Manual Tasks</h2>
<p>Write down every task you did last week that felt repetitive. Copying data between apps, sending the same email with slight variations, manually posting to social media, formatting reports — most knowledge workers waste 10–20 hours per week on tasks that could be automated.</p>
<p>That's 500–1,000 hours per year. At even a modest hourly rate, that's enormous financial and creative value being lost.</p>

<h2>The Automation Stack: Tools You Can Use Today</h2>

<h3>No-Code Automation Platforms</h3>
<ul>
  <li><strong>Zapier</strong> — Connects 6,000+ apps. Create "if this, then that" workflows without code. Best for simple automations.</li>
  <li><strong>Make (Integromat)</strong> — More powerful than Zapier for complex multi-step workflows. Visual drag-and-drop interface.</li>
  <li><strong>n8n</strong> — Open-source and self-hostable. Free to run on your server, with full control over your data.</li>
</ul>

<h3>AI-Powered Automation</h3>
<ul>
  <li><strong>Zapier AI / Make AI</strong> — Build automations using natural language</li>
  <li><strong>GPT + API</strong> — Automate content generation, email drafting, data categorization</li>
  <li><strong>Browser automation</strong> — Tools like Playwright can automate repetitive browser tasks</li>
</ul>

<h2>10 Tasks You Should Automate Right Now</h2>
<ol>
  <li>New lead → CRM entry + welcome email</li>
  <li>Form submission → Spreadsheet + notification</li>
  <li>Invoice sent → Follow-up reminder after 7 days</li>
  <li>New blog post → Auto-post to social media</li>
  <li>File uploaded → Rename and organize to correct folder</li>
  <li>New subscriber → Onboarding email sequence</li>
  <li>Support ticket → Auto-acknowledge + route to right person</li>
  <li>Daily report → Auto-generated and emailed at 8am</li>
  <li>Social mentions → Aggregated and delivered to inbox</li>
  <li>Calendar events → Automated prep reminders</li>
</ol>

<h2>How to Find Your Best Automation Opportunities</h2>
<p>Use the TRAF method:</p>
<ul>
  <li><strong>T — Trigger:</strong> What starts this process?</li>
  <li><strong>R — Repeat:</strong> Do you do it the same way every time?</li>
  <li><strong>A — Action:</strong> What exact steps are involved?</li>
  <li><strong>F — Frequency:</strong> How often does it happen?</li>
</ul>
<p>Tasks that score high on Repeat and Frequency are your best automation candidates.</p>

<h2>The Developer Automation Advantage</h2>
<p>If you can write code (even basic scripting), your automation possibilities multiply dramatically. Simple Python scripts can automate data processing, API calls, file management, and more — all for free.</p>

<h2>Conclusion</h2>
<p>Every hour you save through automation is an hour you can invest in creative work, client relationships, or simply better rest. Start by automating one task today. The mindset shift alone — constantly looking for what can be automated — is worth its weight in productivity.</p>

<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(160deg,rgba(18,10,30,1),rgba(10,10,18,1));border:1px solid rgba(147,51,234,0.25);border-radius:1rem;text-align:center;">
  <p style="color:#c084fc;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Work smarter with the Developer Workflow System</p>
  <p style="color:#606080;margin-bottom:1rem;">Our Developer Workflow System guide shows you how to automate and organize your entire development process.</p>
  <a href="/store" style="display:inline-block;padding:0.6rem 1.5rem;background:linear-gradient(135deg,#9333ea,#6d28d9);color:white;border-radius:0.75rem;font-weight:600;text-decoration:none;">Get the Guide →</a>
</div>`
    ),

    // 12
    post("step-by-step-guide-building-online-income-system",
      "Step-by-Step Guide to Building an Online Income System",
      "Stop chasing single income streams. This guide shows you how to build a complete, interconnected online income system — one that compounds and diversifies over time.",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
      catBusiness.id, ["income system", "online business", "passive income", "strategy"], 11, false,
      "Complete guide to building a diversified online income system that compounds over time — from first dollar to sustainable recurring revenue.",
      `<h2>Why Single Income Streams Fail</h2>
<p>Most people approach online income as a single bet: "I'll start a YouTube channel" or "I'll freelance as a designer." These can work — but they're fragile. One algorithm change, one slow month, one burnout period, and the income collapses.</p>
<p>A system is different. A system has multiple connected components that support and feed each other. When one slows down, others compensate. And the whole grows stronger over time.</p>

<h2>The Architecture of an Online Income System</h2>

<h3>Layer 1: The Skill Foundation</h3>
<p>Every sustainable online income system is built on a genuinely valuable skill. Before worrying about monetization, invest heavily in becoming excellent at something people pay for.</p>
<p>Examples: web development, copywriting, cybersecurity, video production, data analysis, UX design.</p>

<h3>Layer 2: The Service Business (Your Income Engine)</h3>
<p>Start by trading your skill directly for money. This is the fastest path to cash flow and provides the money to fund everything else.</p>
<ul>
  <li>Set a clear hourly or project rate</li>
  <li>Get 3–5 consistent clients</li>
  <li>Aim for $2,000–$5,000/month before moving to Layer 3</li>
</ul>

<h3>Layer 3: The Content Platform (Your Traffic Engine)</h3>
<p>Document what you do and what you learn. Publish it consistently. A blog, YouTube channel, or newsletter serves multiple purposes:</p>
<ul>
  <li>Attracts inbound clients (reducing sales effort)</li>
  <li>Builds your personal brand and credibility</li>
  <li>Creates the audience needed to sell digital products</li>
  <li>Generates SEO traffic that compounds over time</li>
</ul>

<h3>Layer 4: Digital Products (Your Leverage Engine)</h3>
<p>Once you have consistent service income and a growing content platform, start packaging your knowledge into digital products. This is where time-for-money breaks — one product can sell to thousands simultaneously.</p>
<ul>
  <li>Guides and e-books from your most-asked-about topics</li>
  <li>Templates and tools from your own workflows</li>
  <li>Online courses from your most successful service outcomes</li>
</ul>

<h3>Layer 5: Passive and Recurring Revenue</h3>
<p>The final layer adds income that doesn't require direct work:</p>
<ul>
  <li><strong>Affiliate marketing</strong> — recommend tools you actually use</li>
  <li><strong>Subscription products</strong> — templates or tools with monthly updates</li>
  <li><strong>Licensing</strong> — let others use your content or software</li>
  <li><strong>Dividend investing</strong> — reinvest profits into income-generating assets</li>
</ul>

<h2>The Timeline (Be Realistic)</h2>
<ul>
  <li><strong>Month 1–3:</strong> Skill sharpening + first service clients</li>
  <li><strong>Month 3–6:</strong> Consistent service income + start content platform</li>
  <li><strong>Month 6–12:</strong> Launch first digital product + build email list</li>
  <li><strong>Year 2:</strong> Digital products generate 30%+ of income</li>
  <li><strong>Year 3+:</strong> System runs with increasing automation, passive income growing</li>
</ul>

<h2>The One Rule That Makes This Work</h2>
<p>Never stop building. The people who build successful online income systems aren't smarter — they're more consistent. Every week, something gets built or improved. Not some weeks. Every week.</p>

<h2>Conclusion</h2>
<p>An online income system isn't built overnight, but it is built. Start with Layer 1 today. Add one layer at a time. In 18–24 months, you'll look back and realize you've built something that works whether you're actively working or not.</p>

<div style="margin-top:2rem;padding:1.5rem;background:linear-gradient(160deg,rgba(18,10,30,1),rgba(10,10,18,1));border:1px solid rgba(147,51,234,0.25);border-radius:1rem;text-align:center;">
  <p style="color:#c084fc;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Start building your system with the right tools</p>
  <p style="color:#606080;margin-bottom:1rem;">From Developer Roadmaps to Freelancer Toolkits — our store has everything you need for each layer of your income system.</p>
  <a href="/store" style="display:inline-block;padding:0.6rem 1.5rem;background:linear-gradient(135deg,#9333ea,#6d28d9);color:white;border-radius:0.75rem;font-weight:600;text-decoration:none;">Build Your System →</a>
</div>`
    ),

  ];

  // ── Upsert all posts ─────────────────────────────────────
  for (const p of posts) {
    await prisma.blogPost.upsert({
      where:  { slug: p.slug },
      update: p,
      create: p,
    });
    process.stdout.write(".");
  }

  console.log(`\n✅ تم إنشاء ${posts.length} مقال بنجاح`);
  console.log(`📝 الكاتب: ${AUTHOR}`);
}

main()
  .catch(e => { console.error("❌", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
