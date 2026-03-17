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
    
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: "البريد الإلكتروني وكلمة المرور مطلوبان" }, { status: 400 });
    }

    logger.authAttempt(email);

    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) {
      logger.authFailure(email, "user_not_found");
      return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      logger.authFailure(email, "invalid_password");
      return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
    }

    await createSession({ userId: admin.id, email: admin.email });
    logger.authSuccess(email);
    
    const response = NextResponse.json({ ok: true, admin: { id: admin.id, name: admin.name, email: admin.email } });
    return response;
  } catch (e) {
    logger.apiError("POST", "/api/auth/login", e);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
