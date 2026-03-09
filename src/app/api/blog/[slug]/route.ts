import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { generateSlug } from "@/lib/utils";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: { select: { id: true, name: true, slug: true } } },
  });
  if (!post) return NextResponse.json({ error: "المقال غير موجود" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { slug } = await params;
  const body = await req.json();
  if (body.title && !body.slug) body.slug = generateSlug(body.title);
  if (body.status === "published" && !body.publishedAt) body.publishedAt = new Date();

  const post = await prisma.blogPost.update({ where: { slug }, data: body });
  return NextResponse.json({ post });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { slug } = await params;
  await prisma.blogPost.delete({ where: { slug } });
  return NextResponse.json({ ok: true });
}
