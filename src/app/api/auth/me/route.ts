import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) {
    return NextResponse.json({ admin: null }, { status: 401 });
  }

  const admin = await prisma.adminUser.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, username: true, createdAt: true },
  });

  if (!admin) {
    return NextResponse.json({ admin: null }, { status: 404 });
  }

  return NextResponse.json({ admin });
}
