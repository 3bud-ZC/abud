import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@abud.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@1234";

  console.log("🌱 Production seed starting…");
  console.log(`   admin email: ${email}`);

  const hashed = await hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { password: hashed },
    create: {
      email,
      password: hashed,
      name: "ABUD Admin",
    },
  });

  console.log(`✓ Admin user ready (id=${admin.id})`);

  // Default blog category so admin can publish right away
  await prisma.blogCategory.upsert({
    where: { slug: "general" },
    update: {},
    create: { name: "عام", slug: "general" },
  });

  console.log("✓ Default blog category 'general' ready");
  console.log("✅ Seed complete. Login at /admin/login with the admin credentials.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
