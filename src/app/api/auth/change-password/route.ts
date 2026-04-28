import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession, deleteSession } from "@/lib/session";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limiter";
import { logger } from "@/lib/logger";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, "auth");
  if (!rateLimit.allowed) {
    logger.rateLimitHit("auth/change-password", req.ip || "unknown");
    return NextResponse.json(rateLimitResponse(rateLimit.resetTime), { status: 429 });
  }

  const session = await verifySession(req);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const currentPassword: string | undefined = body.currentPassword;
    const newPassword: string | undefined = body.newPassword;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "كلمة المرور الحالية والجديدة مطلوبتان" }, { status: 400 });
    }
    if (newPassword.length < 4) {
      return NextResponse.json({ error: "كلمة المرور الجديدة قصيرة جداً (على الأقل 4 حروف)" }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { id: session.userId } });
    if (!admin) {
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
    }

    const valid = await bcrypt.compare(currentPassword, admin.password);
    if (!valid) {
      logger.authFailure(admin.email, "invalid_current_password");
      return NextResponse.json({ error: "كلمة المرور الحالية غير صحيحة" }, { status: 401 });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { password: hashed },
    });

    // Invalidate the current session ─ user must log in again with the new password.
    await deleteSession();

    logger.authSuccess(`password_changed:${admin.email}`);
    return NextResponse.json({ ok: true, message: "تم تغيير كلمة المرور. سجّل الدخول من جديد." });
  } catch (e) {
    logger.apiError("POST", "/api/auth/change-password", e);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
