import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
async function main() {
  const [allPr, activePr, instant, contact, posts, services] = await Promise.all([
    p.product.count(),
    p.product.count({ where: { status: "active" } }),
    p.product.count({ where: { status: "active", purchaseType: "instant" } }),
    p.product.count({ where: { status: "active", purchaseType: "contact" } }),
    p.blogPost.count(),
    p.service.count(),
  ]);
  console.log(`All products: ${allPr} | Active: ${activePr} (digital:${instant} services:${contact}) | Posts: ${posts} | Site services: ${services}`);
}
main().finally(() => p.$disconnect());
