import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limiter";
import { logger } from "@/lib/logger";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح").min(5).max(100),
  name: z.string().max(100).optional(),
  source: z.string().max(50).optional(),
});

export async function POST(req: NextRequest) {
  // Rate limiting
  const rateLimit = checkRateLimit(req, "newsletter");
  if (!rateLimit.allowed) {
    logger.rateLimitHit("newsletter", req.ip || "unknown");
    return NextResponse.json(rateLimitResponse(rateLimit.resetTime), { status: 429 });
  }

  try {
    const body = await req.json();
    
    // Validate input
    const validation = newsletterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ 
        error: validation.error.errors[0].message 
      }, { status: 400 });
    }

    const { email, name, source } = validation.data;
    const emailLower = email.trim().toLowerCase();
    
    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email: emailLower } });
    if (existing) {
      if (!existing.isActive) {
        await prisma.newsletterSubscriber.update({ where: { email: emailLower }, data: { isActive: true } });
        return NextResponse.json({ ok: true, message: "تم تفعيل اشتراكك مجددًا!" });
      }
      return NextResponse.json({ ok: true, message: "أنت مشترك بالفعل!" });
    }
    
    await prisma.newsletterSubscriber.create({
      data: { email: emailLower, name: name?.trim() || null, source: source || "newsletter" },
    });
    logger.apiSuccess("POST", "/api/newsletter", { email: emailLower });
    return NextResponse.json({ ok: true, message: "تم الاشتراك بنجاح! 🎉" });
  } catch (e) {
    logger.apiError("POST", "/api/newsletter", e);
    return NextResponse.json({ error: "حدث خطأ — حاول مجددًا" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ subscribers, total: subscribers.length });
}

export async function DELETE(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const { id } = await req.json();
  await prisma.newsletterSubscriber.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
