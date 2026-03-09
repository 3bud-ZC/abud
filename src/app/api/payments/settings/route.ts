import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

export async function GET() {
  const settings = await prisma.paymentSetting.findMany({ orderBy: { method: "asc" } });
  return NextResponse.json({ settings });
}

export async function PUT(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  const { method, instructions, destination, label, isActive } = body;

  const setting = await prisma.paymentSetting.upsert({
    where: { method },
    update: { instructions, destination, label, isActive },
    create: { method, label: label || method, instructions, destination, isActive: isActive ?? true },
  });
  return NextResponse.json({ setting });
}
