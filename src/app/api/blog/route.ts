import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      readTime: true,
      publishedAt: true,
      createdAt: true,
      featured: true,
      status: true,
      tags: true,
      category: { select: { name: true, slug: true } },
    },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });

  return NextResponse.json({
    posts: posts.map((post) => ({
      ...post,
      tags:
        typeof post.tags === "string" ? JSON.parse(post.tags) : post.tags,
    })),
  });
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
      tags: Array.isArray(body.tags) ? JSON.stringify(body.tags) : body.tags || "[]",
      publishedAt: body.status === "published" ? new Date() : null,
    },
  });
  revalidatePath("/blog");
  revalidatePath("/");
  return NextResponse.json({ post }, { status: 201 });
}
