import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { generateSlug } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const categorySlug = searchParams.get("category");
  const featured = searchParams.get("featured");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (featured === "true") where.featured = true;
  if (categorySlug) where.category = { slug: categorySlug };

  const products = await prisma.product.findMany({
    where,
    include: { category: { select: { id: true, name: true, slug: true } } },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  try {
    const body = await req.json();
    const slug = body.slug || generateSlug(body.title);
    const product = await prisma.product.create({
      data: { ...body, slug, payMethods: body.payMethods || ["vodafone_cash"] },
    });
    return NextResponse.json({ product }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "فشل إنشاء المنتج" }, { status: 500 });
  }
}
