import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SEED_POSTS, SEED_CATEGORIES } from "@/data/blog-seed";
import BlogPageClient from "./BlogPageClient";
import { siteUrl } from "@/lib/site-url";
import JsonLd from "@/components/JsonLd";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "المدونة | ABUD",
  description:
    "مقالات عملية في تطوير الويب، الذكاء الاصطناعي، الأتمتة، الأمن السيبراني، والفريلانس — مبنية على تجربة تنفيذ حقيقية.",
  alternates: { canonical: siteUrl("/blog") },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteUrl("/blog"),
    siteName: "ABUD",
    title: "المدونة | ABUD",
    description:
      "مقالات عملية في تطوير الويب، الذكاء الاصطناعي، الأتمتة، الأمن السيبراني، والفريلانس — مبنية على تجربة تنفيذ حقيقية.",
    images: [{ url: siteUrl("/opengraph-image"), width: 1200, height: 630, alt: "مدونة ABUD" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "المدونة | ABUD",
    description:
      "مقالات عملية في تطوير الويب، الذكاء الاصطناعي، الأتمتة، الأمن السيبراني، والفريلانس.",
    images: [siteUrl("/opengraph-image")],
  },
};

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
  }

  // Fallback: serve from seed data if DB is empty or unreachable
  const seedPosts: ClientPost[] = SEED_POSTS.map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    excerpt: s.excerpt,
    coverImage: s.coverImage,
    readTime: s.readTime,
    publishedAt: s.publishedAt,
    featured: s.featured,
    tags: s.tags,
    category: s.category,
  }));

  const seedCategories: ClientCategory[] = SEED_CATEGORIES.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));

  return { posts: seedPosts, categories: seedCategories };
}

export default async function BlogPage() {
  const { posts, categories } = await loadFromDb();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "مدونة ABUD",
    description:
      "مقالات عملية في تطوير الويب، الذكاء الاصطناعي، الأتمتة، الأمن السيبراني، والفريلانس.",
    url: siteUrl("/blog"),
    inLanguage: "ar",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: siteUrl(`/blog/${p.slug}`),
      image: p.coverImage ?? undefined,
      datePublished: p.publishedAt ? new Date(p.publishedAt).toISOString() : undefined,
      articleSection: p.category?.name ?? undefined,
    })),
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      <BlogPageClient initialPosts={posts} initialCategories={categories} />
    </>
  );
}
