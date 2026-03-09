import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { generateSlug } from "@/lib/utils";

export async function GET() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });
  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  const slug = body.slug || generateSlug(body.title);
  const service = await prisma.service.create({
    data: { ...body, slug },
  });
  return NextResponse.json({ service }, { status: 201 });
}
