import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🎟️  إنشاء كوبونات الخصم...");

  const coupons = [
    { code: "WELCOME20", discount: 20, isActive: true, usageLimit: null, expiresAt: null },
    { code: "FIRSTBUY10", discount: 10, isActive: true, usageLimit: 100, expiresAt: null },
    { code: "CYBER15", discount: 15, isActive: true, usageLimit: 50, expiresAt: null },
    { code: "AITOOLS25", discount: 25, isActive: true, usageLimit: 30, expiresAt: null },
    { code: "STUDENT30", discount: 30, isActive: true, usageLimit: 200, expiresAt: null },
  ];

  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: { discount: c.discount, isActive: c.isActive, usageLimit: c.usageLimit },
      create: c,
    });
    console.log(`  ✅ ${c.code} → ${c.discount}% off`);
  }

  console.log("✅ كوبونات الخصم جاهزة!");
}

main()
  .catch(e => { console.error("❌", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
