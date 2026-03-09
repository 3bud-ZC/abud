import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

const BASE = "https://abud.fun";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
      select: { title: true, excerpt: true, coverImage: true, slug: true, publishedAt: true },
    });

    if (!post) {
      return { title: "مقال غير موجود | ABUD" };
    }

    return {
      title: `${post.title} | ABUD`,
      description: post.excerpt || `اقرأ مقال: ${post.title}`,
      openGraph: {
        title: post.title,
        description: post.excerpt || `اقرأ مقال: ${post.title}`,
        url: `${BASE}/blog/${post.slug}`,
        type: "article",
        publishedTime: post.publishedAt?.toISOString(),
        authors: ["ABUD"],
        images: post.coverImage
          ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt || `اقرأ مقال: ${post.title}`,
        images: post.coverImage ? [post.coverImage] : undefined,
      },
      alternates: { canonical: `${BASE}/blog/${post.slug}` },
    };
  } catch {
    return { title: "ABUD Blog" };
  }
}

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
