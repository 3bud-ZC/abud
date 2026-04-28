import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limiter";
import { logger } from "@/lib/logger";
import bcrypt from "bcryptjs";

function isMissingUsernameColumnError(error: unknown): boolean {
  if (!error) return false;
  const maybe = error as { code?: string; message?: string };
  const message = (maybe.message || "").toLowerCase();
  return maybe.code === "P2022" || (message.includes("username") && message.includes("column"));
}

type AuthAdmin = {
  id: string;
  email: string;
  password: string;
  name: string;
  username: string | null;
};

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

    let usingLegacyEmailOnlyLookup = false;

    // Lookup by email OR username (case-insensitive on the identifier we stored)
    let admin: AuthAdmin | null = null;
    try {
      const found = await prisma.adminUser.findFirst({
        where: {
          OR: [
            { email: id },
            { username: id },
          ],
        },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
          username: true,
        },
      });

      admin = found
        ? {
            id: found.id,
            email: found.email,
            password: found.password,
            name: found.name,
            username: found.username,
          }
        : null;
    } catch (lookupError) {
      if (!isMissingUsernameColumnError(lookupError)) {
        throw lookupError;
      }

      usingLegacyEmailOnlyLookup = true;
      logger.warn("Login fallback to legacy email-only lookup", { identifier: id });

      const legacyFound = await prisma.adminUser.findFirst({
        where: { email: id },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
        },
      });

      admin = legacyFound
        ? {
            id: legacyFound.id,
            email: legacyFound.email,
            password: legacyFound.password,
            name: legacyFound.name,
            username: null,
          }
        : null;
    }

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
          if (usingLegacyEmailOnlyLookup) {
            const created = await prisma.adminUser.create({
              data: {
                email: bootstrapEmail,
                password: hashed,
                name: "Abud",
              },
              select: {
                id: true,
                email: true,
                password: true,
                name: true,
              },
            });

            admin = {
              id: created.id,
              email: created.email,
              password: created.password,
              name: created.name,
              username: null,
            };
          } else {
            const created = await prisma.adminUser.create({
              data: {
                username: bootstrapUser,
                email: bootstrapEmail,
                password: hashed,
                name: "Abud",
              },
              select: {
                id: true,
                email: true,
                password: true,
                name: true,
                username: true,
              },
            });

            admin = {
              id: created.id,
              email: created.email,
              password: created.password,
              name: created.name,
              username: created.username,
            };
          }
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
