import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { email, name, source } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "البريد الإلكتروني مطلوب" }, { status: 400 });
    }
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
    return NextResponse.json({ ok: true, message: "تم الاشتراك بنجاح! 🎉" });
  } catch (e) {
    console.error(e);
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
