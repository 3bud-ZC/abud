import type { MetadataRoute } from "next";
import { SEED_POSTS } from "@/data/blog-seed";
import { PRIMARY_SERVICES } from "@/data/services";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl(),              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: siteUrl("/blog"),       lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: siteUrl("/services"),   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: siteUrl("/portfolio"),  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: siteUrl("/resources"),   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.78 },
    { url: siteUrl("/faq"),        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: siteUrl("/about"),      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: siteUrl("/contact"),    lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: siteUrl("/quote"),      lastModified: new Date(), changeFrequency: "monthly", priority: 0.55 },
    { url: siteUrl("/privacy-policy"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.35 },
    { url: siteUrl("/terms"),      lastModified: new Date(), changeFrequency: "yearly", priority: 0.35 },
  ];

  // Seed data is always included so the sitemap never errors out
  const seedBlogRoutes: MetadataRoute.Sitemap = SEED_POSTS.map((s) => ({
    url: siteUrl(`/blog/${s.slug}`),
    lastModified: new Date(s.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const seedServiceRoutes: MetadataRoute.Sitemap = PRIMARY_SERVICES.map((service) => ({
    url: siteUrl(`/services/${service.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.72,
  }));

  const portfolioSlugs = [
    "abud-platform",
    "3bud-erp",
    "promptforge-ai",
    "3bud-store-telegram-mini-app",
    "vps-monitor-bot",
    "task-manager-bot",
    "mohamy-platform",
    "iqtida-platform",
  ];
  const seedPortfolioRoutes: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
    url: siteUrl(`/portfolio/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  let dbBlogRoutes: MetadataRoute.Sitemap = [];
  let dbPortfolioRoutes: MetadataRoute.Sitemap = [];
  let dbServiceRoutes: MetadataRoute.Sitemap = [];
  const dbBlogSlugs = new Set<string>();

  // Only try DB if DATABASE_URL is available (avoids Prisma init crash during static generation)
  if (process.env.DATABASE_URL) {
    try {
      // Dynamic import prevents PrismaClient from being instantiated at module load time
      const { prisma } = await import("@/lib/prisma");

      const posts = await prisma.blogPost.findMany({
        where: { status: "published" },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
      });
      dbBlogRoutes = posts.map((p) => {
        dbBlogSlugs.add(p.slug);
        return {
          url: siteUrl(`/blog/${p.slug}`),
          lastModified: p.updatedAt,
          changeFrequency: "weekly" as const,
          priority: 0.8,
        };
      });

      const projects = await prisma.portfolioProject.findMany({
        where: { status: "published" },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
      });
      dbPortfolioRoutes = projects.map((p) => ({
        url: siteUrl(`/portfolio/${p.slug}`),
        lastModified: p.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.65,
      }));

      const services = await prisma.service.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
        orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
      });

      dbServiceRoutes = services.map((service) => ({
        url: siteUrl(`/services/${service.slug}`),
        lastModified: service.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.72,
      }));
    } catch {
      // DB unreachable — seed data below covers everything
    }
  }

  // Deduplicate: use DB routes when present, otherwise seed routes
  const dbBlogSlugsArray = Array.from(dbBlogSlugs);
  const dedupedSeedBlog = seedBlogRoutes.filter(
    (s) => !dbBlogSlugsArray.some((slug) => s.url.endsWith(`/blog/${slug}`))
  );

  const dbPortfolioSlugs = dbPortfolioRoutes.map((p) => p.url.split("/").pop());
  const dedupedSeedPortfolio = seedPortfolioRoutes.filter(
    (s) => !dbPortfolioSlugs.some((slug) => s.url.endsWith(`/portfolio/${slug}`))
  );

  const dbServiceSlugs = dbServiceRoutes.map((s) => s.url.split("/").pop());
  const dedupedSeedService = seedServiceRoutes.filter(
    (s) => !dbServiceSlugs.some((slug) => s.url.endsWith(`/services/${slug}`))
  );

  return [
    ...staticRoutes,
    ...dbBlogRoutes,
    ...dedupedSeedBlog,
    ...dbPortfolioRoutes,
    ...dedupedSeedPortfolio,
    ...dbServiceRoutes,
    ...dedupedSeedService,
  ];
}
