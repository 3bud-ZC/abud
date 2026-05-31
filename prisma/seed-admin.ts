/**
 * Idempotent admin seed.
 * Creates (or upserts) the default admin user used for the dashboard at /admin.
 *
 * Required env vars:
 *   ADMIN_USERNAME
 *   ADMIN_EMAIL
 *   ADMIN_PASSWORD
 *
 * Run with:
 *   npx tsx prisma/seed-admin.ts
 *   or:  npm run seed:admin
 */
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { isStrongPassword, PASSWORD_POLICY_MESSAGE } from "../src/lib/password-policy";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Abud";

  if (!username || !email || !password) {
    throw new Error("Missing required env vars: ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD");
  }
  if (!isStrongPassword(password)) {
    throw new Error(PASSWORD_POLICY_MESSAGE);
  }

  const hashed = await hash(password, 12);

  // Try to find an existing admin by username or email and update it ─ otherwise create.
  const existing = await prisma.adminUser.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (existing) {
    await prisma.adminUser.update({
      where: { id: existing.id },
      data: { username, email, password: hashed, name },
    });
    console.log(`✅ Admin updated: ${username} / ${email}`);
  } else {
    await prisma.adminUser.create({
      data: { username, email, password: hashed, name },
    });
    console.log(`✅ Admin created: ${username} / ${email}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("❌ seed-admin failed:", e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
