import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ProjectData {
  title: string; slug: string; description: string;
  thumbnail: string; tags: string[]; links: string[];
  featured: boolean; order: number;
  longDesc: string; // JSON string: { category, overview, problem, features, tech, results }
}

function p(data: ProjectData) { return data; }

const projects: ProjectData[] = [
  p({
    title: "AI Productivity Toolkit",
    slug: "ai-productivity-toolkit",
    description: "A comprehensive toolkit of AI-powered automation scripts, prompt templates, and workflow integrations that cut repetitive work by 70%.",
    thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900",
    tags: ["AI", "Automation", "ChatGPT", "Productivity"],
    links: [],
    featured: true,
    order: 1,
    longDesc: JSON.stringify({
      category: "AI",
      overview: "A collection of battle-tested AI workflows, prompt libraries, and automation scripts built to eliminate repetitive daily tasks for developers and content creators.",
      problem: "Knowledge workers waste 15–20 hours per week on repetitive tasks: formatting documents, writing boilerplate emails, generating reports, and doing research that AI can handle instantly.",
      features: [
        "100+ curated ChatGPT and Claude prompt templates for business, writing, and coding",
        "Automated email drafting and response system using GPT-4",
        "AI-powered meeting notes summarizer with action items extraction",
        "One-click content repurposing: long-form → social media → newsletter",
        "Browser automation scripts for data collection and form filling",
        "Weekly report generator from raw data inputs",
      ],
      tech: ["ChatGPT API", "Claude API", "Python", "n8n", "Notion API", "Google Apps Script"],
      results: [
        "70% reduction in time spent on repetitive writing tasks",
        "50+ hours saved per month for active users",
        "Adopted by 200+ freelancers and small business owners",
        "Average 4.9/5 rating from users",
      ],
    }),
  }),

  p({
    title: "Digital Product Store System",
    slug: "digital-product-store-system",
    description: "A fully-featured e-commerce platform for digital products with instant delivery, coupon system, payment gateway integration, and an admin dashboard.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900",
    tags: ["Next.js", "Prisma", "E-commerce", "TypeScript"],
    links: [],
    featured: true,
    order: 2,
    longDesc: JSON.stringify({
      category: "Business",
      overview: "A complete, production-ready digital storefront built with Next.js 14 App Router, Prisma ORM, and SQLite. Features instant product delivery, multiple payment methods, coupon codes, and a full admin panel.",
      problem: "Most e-commerce solutions are bloated and expensive for creators selling digital goods. There was a need for a lightweight, fast, and fully-owned solution without recurring platform fees.",
      features: [
        "Instant digital download delivery via email after payment confirmation",
        "Multi-payment method support: Vodafone Cash, InstaPay, PayPal",
        "Coupon and discount code system with usage limits and expiry",
        "Full admin dashboard: order management, product editing, payment settings",
        "Blog system with categories, SEO optimization, and reading progress",
        "AI assistant chatbot to guide visitors to the right products",
        "Mobile-first responsive design with dark cyber theme",
      ],
      tech: ["Next.js 14", "TypeScript", "Prisma ORM", "SQLite", "Tailwind CSS", "Framer Motion", "Zod"],
      results: [
        "Full store operational in under 1 week of development",
        "Zero platform fees — 100% margin on all sales",
        "Sub-100ms page loads with Next.js static optimization",
        "Scales to hundreds of products without performance degradation",
      ],
    }),
  }),

  p({
    title: "Automated Freelancing Workflow",
    slug: "automated-freelancing-workflow",
    description: "End-to-end freelance business automation: client onboarding, proposal generation, invoice tracking, follow-ups, and project delivery — all on autopilot.",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900",
    tags: ["Automation", "n8n", "Zapier", "Freelancing"],
    links: [],
    featured: true,
    order: 3,
    longDesc: JSON.stringify({
      category: "Automation",
      overview: "A fully automated freelancing operations system that handles everything from first client contact to final payment — built on n8n, Zapier, and Google Workspace.",
      problem: "Freelancers spend 30-40% of their working time on non-billable admin work: writing proposals, tracking invoices, sending follow-ups, and managing client communication. This system eliminates that overhead.",
      features: [
        "AI-generated proposal creation from a short project brief",
        "Automated client onboarding: welcome email → contract → kickoff form",
        "Invoice generation and automated payment reminder sequences",
        "Project status dashboard with Notion integration",
        "Client communication templates with AI personalization",
        "Automatic project delivery checklist and sign-off workflow",
        "Monthly earnings report generated automatically",
      ],
      tech: ["n8n", "Zapier", "Make.com", "Google Workspace API", "Notion API", "ChatGPT API", "Airtable"],
      results: [
        "Saved 15+ hours per month on admin tasks",
        "Invoice collection time reduced by 60%",
        "Client onboarding time cut from 2 days to 2 hours",
        "Zero dropped leads from manual follow-up failures",
      ],
    }),
  }),

  p({
    title: "Online Business Starter Kit",
    slug: "online-business-starter-kit",
    description: "A complete system for launching an online business: brand identity, landing page, email funnel, content strategy, and monetization roadmap — all in one kit.",
    thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=900",
    tags: ["Business", "Marketing", "Strategy", "Digital"],
    links: [],
    featured: false,
    order: 4,
    longDesc: JSON.stringify({
      category: "Business",
      overview: "A structured, proven system for launching a profitable online business from scratch — covering brand positioning, audience building, content strategy, and first sales.",
      problem: "Most people who want to start an online business get stuck at the beginning: they don't know what to build, who to target, or how to get their first customers. This kit provides a clear step-by-step system.",
      features: [
        "Brand positioning framework: niche selection, ideal customer profile, USP definition",
        "Landing page template with conversion-optimized copywriting structure",
        "Email welcome sequence (7 emails) with value-delivery and soft-sell structure",
        "Content calendar system: 90-day plan with topic frameworks",
        "Monetization roadmap: from first $100 to $1,000/month",
        "Competitive analysis framework for any niche",
        "Launch checklist: pre-launch, launch day, post-launch actions",
      ],
      tech: ["Notion", "Canva", "Mailchimp", "Google Analytics", "Ahrefs", "Figma"],
      results: [
        "Used by 150+ aspiring online business owners",
        "Average first sale achieved within 30 days of implementation",
        "4.8/5 average user rating",
        "Covers 7 proven online business models",
      ],
    }),
  }),

  p({
    title: "AI Content Creation Toolkit",
    slug: "ai-content-creation-toolkit",
    description: "A systematic AI-powered content engine: generate, repurpose, schedule, and publish blog posts, social content, and newsletters at 5x normal speed.",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900",
    tags: ["AI", "Content", "GPT-4", "Marketing"],
    links: [],
    featured: false,
    order: 5,
    longDesc: JSON.stringify({
      category: "AI",
      overview: "A complete AI content production system that takes a topic idea and outputs fully-drafted blog posts, social media content, email newsletters, and short-form video scripts — all optimized for SEO and engagement.",
      problem: "Content creation is the biggest bottleneck for online businesses. A single blog post takes 4–8 hours to research, write, edit, and format. This system reduces that to under 45 minutes.",
      features: [
        "One-click long-form blog post generation from a single topic keyword",
        "Automatic content repurposing: article → 10 tweets → LinkedIn post → newsletter",
        "SEO optimization layer: keyword insertion, meta description, heading structure",
        "AI image prompt generation for every piece of content",
        "Content calendar integration with automatic Notion publishing",
        "Tone and brand voice consistency system",
        "Fact-checking workflow with source citation",
      ],
      tech: ["GPT-4 API", "Claude API", "Perplexity API", "Python", "Notion API", "Buffer API", "Midjourney"],
      results: [
        "Content production speed increased by 5x",
        "SEO traffic growth of 300% in 6 months for pilot users",
        "Consistent publishing schedule maintained with 80% less effort",
        "Over 500 pieces of content generated and published",
      ],
    }),
  }),

  p({
    title: "Passive Income Automation System",
    slug: "passive-income-automation-system",
    description: "A complete framework and automation stack for building multiple passive income streams: digital products, affiliate marketing, and content monetization — running 24/7.",
    thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=900",
    tags: ["Passive Income", "Automation", "Monetization", "Business"],
    links: [],
    featured: false,
    order: 6,
    longDesc: JSON.stringify({
      category: "Automation",
      overview: "A documented system for building and automating multiple passive income streams simultaneously — combining digital product sales, affiliate partnerships, and content-based revenue into a single manageable operation.",
      problem: "Most passive income advice focuses on a single stream, ignoring how to build a diversified, resilient system. Without automation, managing multiple income streams becomes a full-time job itself.",
      features: [
        "Income stream tracker dashboard: real-time earnings across all channels",
        "Digital product delivery automation: payment → file delivery → receipt",
        "Affiliate link management and performance tracking system",
        "Automated email sequences for product upsells and cross-sells",
        "Monthly passive income report generation",
        "Traffic routing system: SEO → email list → product recommendations",
        "A/B testing framework for pricing and offer optimization",
      ],
      tech: ["n8n", "Gumroad API", "Mailchimp", "Google Analytics API", "Notion", "Python", "Airtable"],
      results: [
        "4 passive income streams running simultaneously",
        "30-40% month-over-month revenue growth in first 6 months",
        "Less than 5 hours/week maintenance after initial setup",
        "Diversified income: no single stream exceeds 50% of total",
      ],
    }),
  }),

  p({
    title: "Cybersecurity Audit Toolkit",
    slug: "cybersecurity-audit-toolkit",
    description: "A professional web application security audit framework with automated scanning, manual testing checklists, vulnerability reporting templates, and remediation guides.",
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=900",
    tags: ["Cybersecurity", "Security", "Python", "Penetration Testing"],
    links: [],
    featured: false,
    order: 7,
    longDesc: JSON.stringify({
      category: "Security",
      overview: "A professional-grade cybersecurity toolkit designed for freelance security consultants and small security teams to perform thorough web application audits efficiently.",
      problem: "Junior security consultants and freelancers lack structured workflows for client audits, leading to missed vulnerabilities and inconsistent reporting. Professional tooling is expensive and overkill for smaller engagements.",
      features: [
        "Automated vulnerability scanner for OWASP Top 10 vulnerabilities",
        "Manual testing checklist with 150+ security test cases",
        "Professional audit report template (PDF + Notion format)",
        "Remediation code snippets for common vulnerabilities",
        "CVSS score calculator and severity classification system",
        "Client communication templates for disclosure and remediation",
        "Post-remediation verification testing workflow",
      ],
      tech: ["Python", "Burp Suite", "OWASP ZAP", "Nmap", "SQLmap", "Nikto", "Bash scripting"],
      results: [
        "Audit time reduced by 40% compared to manual workflow",
        "Zero critical vulnerabilities missed across 20+ client audits",
        "Professional reports generated in under 2 hours",
        "Used by 80+ security consultants globally",
      ],
    }),
  }),

  p({
    title: "Telegram Bot Platform",
    slug: "telegram-bot-platform",
    description: "A modular Telegram bot development framework with pre-built modules for payments, user management, notifications, subscriptions, and admin controls.",
    thumbnail: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900",
    tags: ["Telegram", "Python", "Bot", "Automation"],
    links: [],
    featured: false,
    order: 8,
    longDesc: JSON.stringify({
      category: "Automation",
      overview: "A production-ready Telegram bot framework with plug-and-play modules for common bot features — built for developers and business owners who need custom Telegram bots fast.",
      problem: "Building Telegram bots from scratch for each client is time-consuming. The same features — payment handling, user subscriptions, admin panels, broadcast messaging — get rebuilt every time.",
      features: [
        "User registration, profile management, and role-based access control",
        "Payment integration: Stripe, Stars (Telegram Payments), and custom methods",
        "Subscription management with expiry and auto-renewal logic",
        "Broadcast messaging system with scheduling and audience segmentation",
        "Admin panel bot for managing users and content remotely",
        "Multi-language support with dynamic string management",
        "Analytics dashboard: user growth, message stats, revenue tracking",
      ],
      tech: ["Python", "aiogram 3", "PostgreSQL", "Redis", "Stripe API", "Telegram Bot API", "Docker"],
      results: [
        "Average bot development time reduced from 2 weeks to 3 days",
        "10+ production bots deployed using this framework",
        "Handles 10,000+ users per bot without performance issues",
        "99.9% uptime across all deployed bots",
      ],
    }),
  }),

  p({
    title: "Website Monetization System",
    slug: "website-monetization-system",
    description: "A complete framework for turning website traffic into revenue: SEO optimization, affiliate integration, digital product sales, and ad placement strategy.",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900",
    tags: ["SEO", "Monetization", "Affiliate", "Marketing"],
    links: [],
    featured: false,
    order: 9,
    longDesc: JSON.stringify({
      category: "Business",
      overview: "A systematic approach to monetizing website traffic across multiple revenue streams — combining SEO-driven organic traffic with affiliate marketing, digital product placement, and strategic ad revenue.",
      problem: "Many website owners have decent traffic but poor monetization. They rely on a single revenue stream or use generic monetization approaches instead of testing and optimizing for their specific audience.",
      features: [
        "Monetization audit: identifies highest-value opportunities for your existing traffic",
        "SEO content strategy aligned with high-purchase-intent keywords",
        "Affiliate program selection framework for relevant, high-commission offers",
        "Digital product funnel integration with existing content",
        "Ad placement testing framework: position, format, and network optimization",
        "Revenue tracking dashboard across all monetization channels",
        "Monthly optimization checklist for continuous improvement",
      ],
      tech: ["Google Analytics", "Google Search Console", "Ahrefs", "Ezoic", "Gumroad", "ConvertKit", "Hotjar"],
      results: [
        "Average 3-5x revenue increase within 90 days of implementation",
        "Diversified to 4+ revenue streams per site",
        "Organic traffic growth of 150%+ in 6 months",
        "Applied successfully to 12 different websites across niches",
      ],
    }),
  }),
];

async function main() {
  console.log("🚀 إنشاء مشاريع المحفظة...");
  for (const proj of projects) {
    await prisma.portfolioProject.upsert({
      where: { slug: proj.slug },
      update: { ...proj, tags: JSON.stringify(proj.tags), links: JSON.stringify(proj.links) },
      create: { ...proj, tags: JSON.stringify(proj.tags), links: JSON.stringify(proj.links) },
    });
    process.stdout.write(".");
  }
  console.log(`\n✅ تم إنشاء ${projects.length} مشروع بنجاح`);
}

main()
  .catch(e => { console.error("❌", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
