import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limiter";
import { logger } from "@/lib/logger";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, "auth");
  if (!rateLimit.allowed) {
    logger.rateLimitHit("auth/login", req.ip || "unknown");
    return NextResponse.json(rateLimitResponse(rateLimit.resetTime), { status: 429 });
  }

  try {
    const body = await req.json();

    // Accept either { identifier, password } (preferred) or { email, password } (legacy).
    const identifier: string | undefined = body.identifier ?? body.username ?? body.email;
    const password: string | undefined = body.password;

    if (!identifier || !password) {
      return NextResponse.json({ error: "اسم المستخدم وكلمة المرور مطلوبان" }, { status: 400 });
    }

    const id = identifier.trim().toLowerCase();
    logger.authAttempt(id);

    // Lookup by email OR username (case-insensitive on the identifier we stored)
    let admin = await prisma.adminUser.findFirst({
      where: {
        OR: [
          { email: id },
          { username: id },
        ],
      },
    });

    // Auto-bootstrap: if there are NO admin users in DB at all and the caller
    // provided the default bootstrap credentials, create the initial admin.
    // This makes first-deploy on a fresh DB just work without a separate seed step.
    if (!admin) {
      const totalAdmins = await prisma.adminUser.count();
      if (totalAdmins === 0) {
        const bootstrapUser = (process.env.ADMIN_USERNAME || "abud").toLowerCase();
        const bootstrapEmail = (process.env.ADMIN_EMAIL || "abud@abud.fun").toLowerCase();
        const bootstrapPassword = process.env.ADMIN_PASSWORD || "abud";
        if ((id === bootstrapUser || id === bootstrapEmail) && password === bootstrapPassword) {
          const hashed = await bcrypt.hash(bootstrapPassword, 12);
          admin = await prisma.adminUser.create({
            data: {
              username: bootstrapUser,
              email: bootstrapEmail,
              password: hashed,
              name: "Abud",
            },
          });
          logger.authSuccess(`bootstrap:${bootstrapUser}`);
        }
      }
    }

    if (!admin) {
      logger.authFailure(id, "user_not_found");
      return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      logger.authFailure(id, "invalid_password");
      return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
    }

    await createSession({ userId: admin.id, email: admin.email });
    logger.authSuccess(id);

    const response = NextResponse.json({
      ok: true,
      admin: { id: admin.id, name: admin.name, email: admin.email, username: admin.username },
    });
    return response;
  } catch (e) {
    logger.apiError("POST", "/api/auth/login", e);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
