import { prisma } from "@/lib/prisma";
import { SEED_POSTS, SEED_CATEGORIES, type SeedPost } from "@/data/blog-seed";
import BlogPageClient from "./BlogPageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

function seedToClient(p: SeedPost): ClientPost {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    coverImage: p.coverImage,
    readTime: p.readTime,
    publishedAt: p.publishedAt,
    category: p.category,
    tags: p.tags,
    featured: p.featured,
  };
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
        tags = Array.isArray(p.tags) ? (p.tags as unknown as string[]) : JSON.parse(p.tags as string);
      } catch {
        tags = [];
      }
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
    // DB unreachable — return empty so seed becomes the source of truth
    console.error("[blog] DB fetch failed, falling back to seed:", (e as Error).message);
    return { posts: [], categories: [] };
  }
}

export default async function BlogPage() {
  const { posts: dbPosts, categories: dbCategories } = await loadFromDb();

  // Merge: DB takes precedence; seed fills gaps (deduped by slug)
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const seedFiltered = SEED_POSTS.filter((p) => !dbSlugs.has(p.slug)).map(seedToClient);
  const allPosts = [
    ...dbPosts.filter((p) => p.featured),
    ...seedFiltered.filter((p) => p.featured),
    ...dbPosts.filter((p) => !p.featured),
    ...seedFiltered.filter((p) => !p.featured),
  ];

  // Categories: union (DB first, seed fills)
  const dbCatSlugs = new Set(dbCategories.map((c) => c.slug));
  const seedCats = SEED_CATEGORIES.filter((c) => !dbCatSlugs.has(c.slug));
  const allCategories = [...dbCategories, ...seedCats];

  return <BlogPageClient initialPosts={allPosts} initialCategories={allCategories} />;
}
