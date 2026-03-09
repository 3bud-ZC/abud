import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 إضافة التصنيفات والمنتجات...");

  // ── Categories ──────────────────────────────────────────
  const [
    catCyber,
    catWeb,
    catConsulting,
    catDigital,
    catTemplates,
    catGaming,
    catDevTools,
    catPremium,
  ] = await Promise.all([
    prisma.productCategory.upsert({ where: { slug: "cybersecurity" },    update: {}, create: { name: "Cybersecurity",    slug: "cybersecurity"    } }),
    prisma.productCategory.upsert({ where: { slug: "web-development" }, update: {}, create: { name: "Web Development",  slug: "web-development"  } }),
    prisma.productCategory.upsert({ where: { slug: "consulting" },      update: {}, create: { name: "Consulting",       slug: "consulting"       } }),
    prisma.productCategory.upsert({ where: { slug: "digital-products" },update: {}, create: { name: "Digital Products", slug: "digital-products" } }),
    prisma.productCategory.upsert({ where: { slug: "templates" },       update: {}, create: { name: "Templates",        slug: "templates"        } }),
    prisma.productCategory.upsert({ where: { slug: "gaming" },          update: {}, create: { name: "Gaming",           slug: "gaming"           } }),
    prisma.productCategory.upsert({ where: { slug: "developer-tools" }, update: {}, create: { name: "Developer Tools",  slug: "developer-tools"  } }),
    prisma.productCategory.upsert({ where: { slug: "premium-guides" },  update: {}, create: { name: "Premium Guides",   slug: "premium-guides"   } }),
  ]);
  console.log("✅ تم إنشاء التصنيفات");

  // ── Products ─────────────────────────────────────────────
  const products = [
    // Cybersecurity (10)
    { title: "Website Security Audit",         slug: "website-security-audit",         shortDesc: "Full website security vulnerability scan.",                      price: 50,  purchaseType: "contact", categoryId: catCyber.id },
    { title: "Advanced Security Audit",        slug: "advanced-security-audit",        shortDesc: "Deep security testing and vulnerability analysis.",               price: 90,  purchaseType: "contact", categoryId: catCyber.id },
    { title: "Bug Bounty Vulnerability Scan",  slug: "bug-bounty-vulnerability-scan",  shortDesc: "Identify vulnerabilities like professional bug bounty hunters.",  price: 70,  purchaseType: "contact", categoryId: catCyber.id },
    { title: "Website Malware Removal",        slug: "website-malware-removal",        shortDesc: "Remove malware and secure infected websites.",                   price: 45,  purchaseType: "contact", categoryId: catCyber.id },
    { title: "Security Hardening",             slug: "security-hardening",             shortDesc: "Strengthen website and server protection.",                      price: 60,  purchaseType: "contact", categoryId: catCyber.id },
    { title: "Server Security Setup",          slug: "server-security-setup",          shortDesc: "Secure server configuration and protection setup.",              price: 80,  purchaseType: "contact", categoryId: catCyber.id },
    { title: "WordPress Security Setup",       slug: "wordpress-security-setup",       shortDesc: "Harden WordPress security and remove vulnerabilities.",          price: 40,  purchaseType: "contact", categoryId: catCyber.id },
    { title: "API Security Review",            slug: "api-security-review",            shortDesc: "Security review of APIs and authentication flows.",              price: 65,  purchaseType: "contact", categoryId: catCyber.id },
    { title: "Login System Security Check",    slug: "login-system-security-check",    shortDesc: "Testing authentication systems and login security.",             price: 35,  purchaseType: "contact", categoryId: catCyber.id },
    { title: "Cybersecurity Consultation",     slug: "cybersecurity-consultation",     shortDesc: "30-minute cybersecurity consultation.",                         price: 25,  purchaseType: "contact", categoryId: catCyber.id },

    // Web Development (10)
    { title: "Landing Page Development",       slug: "landing-page-development",       shortDesc: "Professional landing page creation.",                           price: 80,  purchaseType: "contact", categoryId: catWeb.id },
    { title: "Personal Portfolio Website",     slug: "personal-portfolio-website",     shortDesc: "Full portfolio website development.",                           price: 120, purchaseType: "contact", categoryId: catWeb.id },
    { title: "Business Website Development",   slug: "business-website-development",   shortDesc: "Professional company website.",                                 price: 150, purchaseType: "contact", categoryId: catWeb.id },
    { title: "Full Website Development",       slug: "full-website-development",       shortDesc: "Complete custom website development.",                          price: 250, purchaseType: "contact", categoryId: catWeb.id },
    { title: "Website Performance Optimization",slug: "website-performance-optimization",shortDesc: "Improve website speed and performance.",                     price: 40,  purchaseType: "contact", categoryId: catWeb.id },
    { title: "SEO Basic Optimization",         slug: "seo-basic-optimization",         shortDesc: "Basic search engine optimization.",                             price: 30,  purchaseType: "contact", categoryId: catWeb.id },
    { title: "Bug Fixing Service",             slug: "bug-fixing-service",             shortDesc: "Fix bugs and technical issues.",                                price: 25,  purchaseType: "contact", categoryId: catWeb.id },
    { title: "UI Improvement Service",         slug: "ui-improvement-service",         shortDesc: "Improve UI and design quality.",                                price: 35,  purchaseType: "contact", categoryId: catWeb.id },
    { title: "Website Redesign",               slug: "website-redesign",               shortDesc: "Full redesign for modern appearance.",                          price: 90,  purchaseType: "contact", categoryId: catWeb.id },
    { title: "Website Deployment Setup",       slug: "website-deployment-setup",       shortDesc: "Deploy website to server.",                                     price: 30,  purchaseType: "contact", categoryId: catWeb.id },

    // Consulting (5)
    { title: "Tech Career Consultation",       slug: "tech-career-consultation",       shortDesc: "Guidance for tech career paths.",                               price: 20,  purchaseType: "contact", categoryId: catConsulting.id },
    { title: "Programming Mentorship Session", slug: "programming-mentorship-session", shortDesc: "One-on-one coding mentorship.",                                 price: 25,  purchaseType: "contact", categoryId: catConsulting.id },
    { title: "Startup Tech Strategy",          slug: "startup-tech-strategy",          shortDesc: "Technical strategy for startups.",                              price: 40,  purchaseType: "contact", categoryId: catConsulting.id },
    { title: "Website Idea Evaluation",        slug: "website-idea-evaluation",        shortDesc: "Evaluate website project ideas.",                               price: 15,  purchaseType: "contact", categoryId: catConsulting.id },
    { title: "Freelancing Advice Session",     slug: "freelancing-advice-session",     shortDesc: "Freelancing tips and strategy.",                                price: 20,  purchaseType: "contact", categoryId: catConsulting.id },

    // Digital Products (5)
    { title: "Cybersecurity Starter Guide",    slug: "cybersecurity-starter-guide",    shortDesc: "Beginner cybersecurity guide.",                                 price: 15,  purchaseType: "instant", categoryId: catDigital.id },
    { title: "Web Developer Starter Pack",     slug: "web-developer-starter-pack",     shortDesc: "Essential tools for developers.",                               price: 12,  purchaseType: "instant", categoryId: catDigital.id },
    { title: "Freelancer Toolkit",             slug: "freelancer-toolkit",             shortDesc: "Tools and resources for freelancers.",                          price: 10,  purchaseType: "instant", categoryId: catDigital.id },
    { title: "Developer Productivity Guide",   slug: "developer-productivity-guide",   shortDesc: "Improve developer productivity.",                               price: 8,   purchaseType: "instant", categoryId: catDigital.id },
    { title: "Website Launch Checklist",       slug: "website-launch-checklist",       shortDesc: "Checklist for launching websites.",                             price: 5,   purchaseType: "instant", categoryId: catDigital.id },

    // Templates (5)
    { title: "Portfolio Website Template",     slug: "portfolio-website-template",     shortDesc: "Ready-to-use portfolio template.",                              price: 18,  purchaseType: "instant", categoryId: catTemplates.id },
    { title: "Landing Page Template Pack",     slug: "landing-page-template-pack",     shortDesc: "Modern landing page templates.",                                price: 20,  purchaseType: "instant", categoryId: catTemplates.id },
    { title: "Startup Landing Template",       slug: "startup-landing-template",       shortDesc: "Startup landing page design.",                                  price: 22,  purchaseType: "instant", categoryId: catTemplates.id },
    { title: "Cyberpunk Portfolio Template",   slug: "cyberpunk-portfolio-template",   shortDesc: "Cyberpunk style portfolio template.",                           price: 25,  purchaseType: "instant", categoryId: catTemplates.id },
    { title: "Developer Blog Template",        slug: "developer-blog-template",        shortDesc: "Developer blog website template.",                              price: 18,  purchaseType: "instant", categoryId: catTemplates.id },

    // Gaming (5)
    { title: "Gaming Performance Optimization Guide", slug: "gaming-performance-optimization-guide", shortDesc: "Guide to optimize gaming performance.", price: 10, purchaseType: "instant", categoryId: catGaming.id },
    { title: "FPS Boost Configuration Guide",  slug: "fps-boost-configuration-guide",  shortDesc: "Improve FPS settings.",                                         price: 8,   purchaseType: "instant", categoryId: catGaming.id },
    { title: "Ultimate Gaming Setup Guide",    slug: "ultimate-gaming-setup-guide",    shortDesc: "Complete gaming setup guide.",                                  price: 12,  purchaseType: "instant", categoryId: catGaming.id },
    { title: "Streaming Setup Guide",          slug: "streaming-setup-guide",          shortDesc: "Guide to start streaming.",                                     price: 10,  purchaseType: "instant", categoryId: catGaming.id },
    { title: "Gaming PC Build Guide",          slug: "gaming-pc-build-guide",          shortDesc: "Build a gaming PC step by step.",                               price: 9,   purchaseType: "instant", categoryId: catGaming.id },

    // Developer Tools (5)
    { title: "VS Code Ultimate Setup Guide",   slug: "vs-code-ultimate-setup-guide",   shortDesc: "Best VS Code setup for developers.",                            price: 6,   purchaseType: "instant", categoryId: catDevTools.id },
    { title: "Git & GitHub Mastery Guide",     slug: "git-github-mastery-guide",       shortDesc: "Learn Git workflow.",                                           price: 7,   purchaseType: "instant", categoryId: catDevTools.id },
    { title: "Developer Workflow System",      slug: "developer-workflow-system",      shortDesc: "Efficient workflow for developers.",                            price: 9,   purchaseType: "instant", categoryId: catDevTools.id },
    { title: "Bug Hunting Guide",              slug: "bug-hunting-guide",              shortDesc: "Guide to finding software bugs.",                               price: 8,   purchaseType: "instant", categoryId: catDevTools.id },
    { title: "Full Stack Developer Roadmap",   slug: "full-stack-developer-roadmap",   shortDesc: "Complete roadmap for developers.",                              price: 12,  purchaseType: "instant", categoryId: catDevTools.id },

    // Premium Guides (5)
    { title: "Advanced Cybersecurity Handbook",slug: "advanced-cybersecurity-handbook",shortDesc: "Advanced cybersecurity techniques.",                            price: 30,  purchaseType: "instant", categoryId: catPremium.id },
    { title: "Complete Web Development Notes", slug: "complete-web-development-notes", shortDesc: "Comprehensive web development notes.",                          price: 25,  purchaseType: "instant", categoryId: catPremium.id },
    { title: "Startup Tech Stack Guide",       slug: "startup-tech-stack-guide",       shortDesc: "Choosing the right tech stack.",                                price: 18,  purchaseType: "instant", categoryId: catPremium.id },
    { title: "Ultimate Freelancer Playbook",   slug: "ultimate-freelancer-playbook",   shortDesc: "Full freelancing strategy guide.",                              price: 22,  purchaseType: "instant", categoryId: catPremium.id },
    { title: "AI Tools for Developers Guide",  slug: "ai-tools-for-developers-guide",  shortDesc: "AI tools every developer should use.",                         price: 15,  purchaseType: "instant", categoryId: catPremium.id },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        title:        p.title,
        slug:         p.slug,
        shortDesc:    p.shortDesc,
        price:        p.price,
        purchaseType: p.purchaseType,
        status:       "active",
        featured:     false,
        categoryId:   p.categoryId,
      },
    });
  }

  console.log(`✅ تم إضافة ${products.length} منتجاً بنجاح`);
}

main()
  .catch((e) => { console.error("❌ خطأ:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
