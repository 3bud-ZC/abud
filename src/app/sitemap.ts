import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SEED_POSTS } from "@/data/blog-seed";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://abud.fun";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/blog`,    lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/services`,lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/portfolio`,lastModified: new Date(),changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/faq`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  let portfolioRoutes: MetadataRoute.Sitemap = [];
  const dbBlogSlugs = new Set<string>();

  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    blogRoutes = posts.map(p => {
      dbBlogSlugs.add(p.slug);
      return {
        url: `${BASE}/blog/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    });

    const projects = await prisma.portfolioProject.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    portfolioRoutes = projects.map(p => ({
      url: `${BASE}/portfolio/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));
  } catch {
    // silently continue if DB unavailable at build time
  }

  // Append seed posts (curated fallback content) deduped against DB
  const seedRoutes: MetadataRoute.Sitemap = SEED_POSTS
    .filter((s) => !dbBlogSlugs.has(s.slug))
    .map((s) => ({
      url: `${BASE}/blog/${s.slug}`,
      lastModified: new Date(s.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));

  return [...staticRoutes, ...blogRoutes, ...seedRoutes, ...portfolioRoutes];
}
