import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ coupons });
}

export async function POST(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  try {
    const body = await req.json();
    const coupon = await prisma.coupon.create({
      data: {
        code: body.code.trim().toUpperCase(),
        discount: Number(body.discount),
        isActive: body.isActive ?? true,
        usageLimit: body.usageLimit ? Number(body.usageLimit) : null,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
      },
    });
    return NextResponse.json({ coupon }, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "فشل إنشاء الكوبون";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const { id, ...data } = await req.json();
  const coupon = await prisma.coupon.update({ where: { id }, data });
  return NextResponse.json({ coupon });
}

export async function DELETE(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const { id } = await req.json();
  await prisma.coupon.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
