import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { generateSlug } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const includeAll = new URL(req.url).searchParams.get("all") === "1";

  if (includeAll) {
    const session = await verifySession(req);
    if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const services = await prisma.service.findMany({
    where: includeAll ? undefined : { isActive: true },
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  const slug = body.slug || generateSlug(body.title);

  const maxOrder = await prisma.service.findFirst({
    select: { order: true },
    orderBy: { order: "desc" },
  });

  const service = await prisma.service.create({
    data: {
      ...body,
      slug,
      order:
        typeof body.order === "number" && Number.isFinite(body.order)
          ? body.order
          : (maxOrder?.order || 0) + 1,
    },
  });

  return NextResponse.json({ service }, { status: 201 });
}
