import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "كود الخصم مطلوب" }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.trim().toUpperCase() },
    });

    if (!coupon) {
      return NextResponse.json({ error: "كود الخصم غير صحيح" }, { status: 404 });
    }
    if (!coupon.isActive) {
      return NextResponse.json({ error: "كود الخصم غير نشط" }, { status: 400 });
    }
    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return NextResponse.json({ error: "كود الخصم منتهي الصلاحية" }, { status: 400 });
    }
    if (coupon.usageLimit !== null && coupon.usageCount >= coupon.usageLimit) {
      return NextResponse.json({ error: "تم استنفاد هذا الكود" }, { status: 400 });
    }

    return NextResponse.json({
      valid: true,
      discount: coupon.discount,
      code: coupon.code,
      message: `🎉 خصم ${coupon.discount}% تم تطبيقه!`,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "حدث خطأ في التحقق" }, { status: 500 });
  }
}
