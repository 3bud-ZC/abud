import { prisma } from "@/lib/prisma";
import HomePageClient from "./HomePageClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function HomePage() {
  const [products, posts] = await Promise.all([
    prisma.product.findMany({
      where: { status: "active", featured: true },
      select: {
        id: true, title: true, slug: true, price: true, oldPrice: true,
        coverImage: true, featured: true,
        category: { select: { name: true } },
      },
      take: 3,
    }),
    prisma.blogPost.findMany({
      where: { status: "published" },
      select: {
        id: true, title: true, slug: true,
        category: { select: { name: true } },
        publishedAt: true, createdAt: true,
      },
      take: 3,
      orderBy: { publishedAt: "desc" },
    }),
  ]);

  return <HomePageClient initialProducts={products} initialPosts={posts} />;
}
