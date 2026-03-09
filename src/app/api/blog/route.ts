import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { generateSlug } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const categorySlug = searchParams.get("category");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (categorySlug) where.category = { slug: categorySlug };

  const posts = await prisma.blogPost.findMany({
    where,
    include: { category: { select: { id: true, name: true, slug: true } } },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });

  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  const slug = body.slug || generateSlug(body.title);
  const post = await prisma.blogPost.create({
    data: {
      ...body,
      slug,
      tags: body.tags || [],
      publishedAt: body.status === "published" ? new Date() : null,
    },
  });
  return NextResponse.json({ post }, { status: 201 });
}
