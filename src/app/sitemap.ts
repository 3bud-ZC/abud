import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SEED_POSTS } from "@/data/blog-seed";
import { PRIMARY_SERVICES } from "@/data/services";
import { siteUrl } from "@/lib/site-url";

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

  let blogRoutes: MetadataRoute.Sitemap = [];
  let portfolioRoutes: MetadataRoute.Sitemap = [];
  let serviceRoutes: MetadataRoute.Sitemap = [];
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
    portfolioRoutes = projects.map(p => ({
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

    serviceRoutes = services.map((service) => ({
      url: siteUrl(`/services/${service.slug}`),
      lastModified: service.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.72,
    }));
  } catch {
    serviceRoutes = PRIMARY_SERVICES.map((service) => ({
      url: siteUrl(`/services/${service.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.72,
    }));
  }

  // Append seed posts (curated fallback content) deduped against DB
  const seedRoutes: MetadataRoute.Sitemap = SEED_POSTS
    .filter((s) => !dbBlogSlugs.has(s.slug))
    .map((s) => ({
      url: siteUrl(`/blog/${s.slug}`),
      lastModified: new Date(s.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));

  return [...staticRoutes, ...blogRoutes, ...seedRoutes, ...portfolioRoutes, ...serviceRoutes];
}
