import { prisma } from "@/lib/prisma";
import { SEED_POSTS } from "@/data/blog-seed";
import HomePageClient, { type HomeBlogPost } from "./HomePageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function loadLatestPosts(limit = 3): Promise<HomeBlogPost[]> {
  let dbPosts: HomeBlogPost[] = [];
  try {
    const rows = await prisma.blogPost.findMany({
      where: { status: "published" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        readTime: true,
        publishedAt: true,
        createdAt: true,
        category: { select: { name: true, slug: true } },
      },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      take: limit * 2, // grab a few extra so seed merge keeps top items
    });
    dbPosts = rows.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      coverImage: p.coverImage,
      readTime: p.readTime,
      publishedAt: p.publishedAt ? p.publishedAt.toISOString() : p.createdAt.toISOString(),
      category: p.category,
    }));
  } catch {
    // DB unreachable — seed will provide everything
  }

  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const seedExtras: HomeBlogPost[] = SEED_POSTS
    .filter((s) => !dbSlugs.has(s.slug))
    .map((s) => ({
      id: s.id,
      title: s.title,
      slug: s.slug,
      excerpt: s.excerpt,
      coverImage: s.coverImage,
      readTime: s.readTime,
      publishedAt: s.publishedAt,
      category: s.category,
    }));

  // Merge by recency (publishedAt desc), DB items still keep their priority order
  const merged = [...dbPosts, ...seedExtras];
  // Sort by date descending
  merged.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  return merged.slice(0, limit);
}

export default async function HomePage() {
  const latestPosts = await loadLatestPosts(3);
  return <HomePageClient initialPosts={[]} latestPosts={latestPosts} />;
}
