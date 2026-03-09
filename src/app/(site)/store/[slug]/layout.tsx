import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

const BASE = "https://abud.fun";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      select: { title: true, shortDesc: true, coverImage: true, slug: true, price: true },
    });

    if (!product) {
      return { title: "منتج غير موجود | ABUD" };
    }

    const description = product.shortDesc || `اشترِ ${product.title} — ${product.price} جنيه مصري`;

    return {
      title: `${product.title} | المتجر الرقمي ABUD`,
      description,
      openGraph: {
        title: product.title,
        description,
        url: `${BASE}/store/${product.slug}`,
        type: "website",
        images: product.coverImage
          ? [{ url: product.coverImage, width: 1200, height: 630, alt: product.title }]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: product.title,
        description,
        images: product.coverImage ? [product.coverImage] : undefined,
      },
      alternates: { canonical: `${BASE}/store/${product.slug}` },
    };
  } catch {
    return { title: "ABUD Store" };
  }
}

export default function StoreSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
