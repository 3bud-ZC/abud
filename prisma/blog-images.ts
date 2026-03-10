import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=450&fit=crop&auto=format&q=80`;

const images: Record<string, string> = {
  "best-ai-tools-developers-2025":
    U("1677442135703-1787eea5ce01"),
  "freelancing-first-1000-dollars":
    U("1521737604893-d14cc237f11d"),
  "nextjs-14-complete-guide":
    U("1461749280684-dccba630e2f6"),
  "10-ways-make-money-online-2025":
    U("1553729459-efe14ef6055d"),
  "cybersecurity-beginners-protect-yourself":
    U("1550751827-4bd374c3f58b"),
  "build-telegram-bot-python":
    U("1526379879527-8559ecfcaec0"),
  "tailwind-css-complete-guide":
    U("1561070791-2526d30994b5"),
  "chatgpt-for-developers-15-uses":
    U("1620712943543-bcc4688e7485"),
  "github-actions-cicd-beginners":
    U("1667372393119-3d4c48d07fc9"),
  "vps-linux-setup-guide":
    U("1558494949-ef010cbdcc31"),
  "n8n-automate-your-work":
    U("1518770660439-4636190af475"),
  "typescript-beginners-guide":
    U("1542831371-29b0f74f9713"),
  "rest-api-nodejs-express":
    U("1558655146-d09347e92766"),
  "prompt-engineering-best-results-ai":
    U("1655720828012-5e08cd57f5ee"),
  "react-hooks-complete-guide":
    U("1633356122544-f134324a6cee"),
  "docker-developers-arabic":
    U("1605745341112-85968b19335b"),
  "prisma-orm-complete-guide":
    U("1544383835-bda2bc66a55d"),
  "nextjs-performance-optimization-pagespeed":
    U("1460925895917-afdab827c52f"),
  "uiux-design-principles-web-developer":
    U("1486312338219-ce68d2c6f44d"),
  "build-ecommerce-nextjs":
    U("1556742049-0cfed4f6a45d"),
  "best-vscode-extensions-2025":
    U("1484788984921-03950022c9ef"),
  "learn-programming-from-scratch-2025":
    U("1456513080510-7bf3a84b82f8"),
  "freelancer-arabic-7-tips-earn-dollars":
    U("1522071820081-009f0129c71c"),
  "passive-income-online-guide-2025":
    U("1579621970563-ebec7560ff3e"),
  "build-saas-nextjs-complete-guide":
    U("1551434678-e076c223a692"),
  "midjourney-arabic-professional-designs":
    U("1686191128892-3b37add4c844"),
  "git-github-complete-guide-beginners":
    U("1618477388954-7852f32655ec"),
  "python-beginners-first-project":
    U("1515879218367-8466d910aaa4"),
  "technical-seo-developers-google":
    U("1432888498266-38ffec3eaf0a"),
  "freelancer-pricing-guide-professional":
    U("1559526324-593bc073d938"),
};

async function main() {
  let updated = 0;
  for (const [slug, coverImage] of Object.entries(images)) {
    const res = await prisma.blogPost.updateMany({
      where: { slug },
      data: { coverImage },
    });
    if (res.count > 0) {
      console.log(`✅ ${slug}`);
      updated++;
    } else {
      console.log(`⚠️  لم يُعثر على: ${slug}`);
    }
  }
  console.log(`\n🎉 تم تحديث ${updated} مقال بصور الغلاف!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
