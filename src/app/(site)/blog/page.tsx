import { prisma } from "@/lib/prisma";
import BlogPageClient from "./BlogPageClient";

export const revalidate = 300;

interface ClientPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  readTime?: number | null;
  publishedAt?: Date | string | null;
  category?: { name: string; slug: string } | null;
  tags: string[];
  featured: boolean;
}

interface ClientCategory {
  id: string;
  name: string;
  slug: string;
}

async function loadFromDb(): Promise<{ posts: ClientPost[]; categories: ClientCategory[] }> {
  try {
    const [dbPosts, dbCategories] = await Promise.all([
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

    const posts: ClientPost[] = dbPosts.map((p) => {
      let tags: string[] = [];
      try {
        tags = Array.isArray(p.tags)
          ? (p.tags as unknown as string[])
          : JSON.parse(p.tags as string);
      } catch { tags = []; }

      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        coverImage: p.coverImage,
        readTime: p.readTime,
        publishedAt: p.publishedAt,
        featured: p.featured,
        tags,
        category: p.category,
      };
    });

    return { posts, categories: dbCategories };
  } catch (e) {
    console.error("[blog] DB fetch failed:", (e as Error).message);
    return { posts: [], categories: [] };
  }
}

export default async function BlogPage() {
  const { posts, categories } = await loadFromDb();
  return <BlogPageClient initialPosts={posts} initialCategories={categories} />;
}
