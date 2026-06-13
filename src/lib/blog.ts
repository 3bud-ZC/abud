import { prisma } from "@/lib/prisma";
import { SEED_POSTS } from "@/data/blog-seed";

export interface BlogPostForMeta {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  readTime: number | null;
  publishedAt: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  tags: string[];
  category: { name: string; slug: string } | null;
  categoryId?: string | null;
}

export async function getPostBySlug(slug: string): Promise<BlogPostForMeta | null> {
  try {
    const dbPost = await prisma.blogPost.findUnique({
      where: { slug, status: "published" },
      include: { category: true },
    });
    if (dbPost) {
      const tags: string[] = Array.isArray(dbPost.tags)
        ? (dbPost.tags as unknown as string[])
        : (() => { try { return JSON.parse(dbPost.tags as string); } catch { return []; } })();
      return {
        title: dbPost.title,
        slug: dbPost.slug,
        excerpt: dbPost.excerpt,
        content: dbPost.content,
        coverImage: dbPost.coverImage,
        readTime: dbPost.readTime,
        publishedAt: dbPost.publishedAt,
        createdAt: dbPost.createdAt,
        updatedAt: dbPost.updatedAt,
        tags,
        category: dbPost.category ? { name: dbPost.category.name, slug: dbPost.category.slug } : null,
        categoryId: dbPost.categoryId,
      };
    }
  } catch {
    // DB unavailable — fall through to seed
  }

  const seed = SEED_POSTS.find((p) => p.slug === slug);
  if (seed) {
    return {
      title: seed.title,
      slug: seed.slug,
      excerpt: seed.excerpt,
      content: seed.content,
      coverImage: seed.coverImage,
      readTime: seed.readTime,
      publishedAt: seed.publishedAt,
      createdAt: seed.publishedAt,
      updatedAt: seed.publishedAt,
      tags: seed.tags,
      category: seed.category,
      categoryId: seed.category.slug,
    };
  }

  return null;
}

export async function getAllPublishedSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  try {
    const dbSlugs = await prisma.blogPost.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    const seedSlugs = SEED_POSTS
      .filter((s) => !dbSlugs.some((d) => d.slug === s.slug))
      .map((s) => ({ slug: s.slug, updatedAt: new Date(s.publishedAt) }));
    return [...dbSlugs, ...seedSlugs];
  } catch {
    return SEED_POSTS.map((s) => ({ slug: s.slug, updatedAt: new Date(s.publishedAt) }));
  }
}
