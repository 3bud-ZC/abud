import { PrismaClient } from "@prisma/client";
import { PRIMARY_SERVICES } from "../src/data/services";

const prisma = new PrismaClient();

async function main() {
  for (const item of PRIMARY_SERVICES) {
    await prisma.service.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        description: item.description,
        longDesc: `${item.longDesc}\n\nمدة التسليم: ${item.deliveryTime}`,
        useCase: item.category,
        icon: item.icon,
        priceType: item.priceType,
        price: item.price,
        ctaType: "contact",
        ctaLabel: item.ctaLabel,
        featured: item.featured,
        isActive: true,
        order: item.order,
      },
      create: {
        title: item.title,
        slug: item.slug,
        description: item.description,
        longDesc: `${item.longDesc}\n\nمدة التسليم: ${item.deliveryTime}`,
        useCase: item.category,
        icon: item.icon,
        priceType: item.priceType,
        price: item.price,
        ctaType: "contact",
        ctaLabel: item.ctaLabel,
        featured: item.featured,
        isActive: true,
        order: item.order,
      },
    });
  }

  console.log(`✅ Seeded ${PRIMARY_SERVICES.length} services`);
}

main()
  .catch((e) => {
    console.error("❌ seed-services failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

