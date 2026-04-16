import { prisma } from "@/lib/prisma";
import BlogPageClient from "./BlogPageClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where: { status: "published" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        readTime: true,
        publishedAt: true,
        featured: true,
        tags: true,
        category: { select: { name: true, slug: true } },
      },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    }),
    prisma.blogCategory.findMany({
      select: { id: true, name: true, slug: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return <BlogPageClient initialPosts={posts as any} initialCategories={categories} />;
}
