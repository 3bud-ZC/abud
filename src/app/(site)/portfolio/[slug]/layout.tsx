import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

const BASE = "https://abud.fun";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const project = await prisma.portfolioProject.findUnique({
      where: { slug: params.slug },
      select: { title: true, description: true, thumbnail: true, slug: true },
    });

    if (!project) {
      return { title: "مشروع غير موجود | ABUD" };
    }

    return {
      title: `${project.title} | أعمال ABUD`,
      description: project.description || `تفاصيل مشروع ${project.title}`,
      openGraph: {
        title: project.title,
        description: project.description || `تفاصيل مشروع ${project.title}`,
        url: `${BASE}/portfolio/${project.slug}`,
        images: project.thumbnail
          ? [{ url: project.thumbnail, width: 1200, height: 630, alt: project.title }]
          : undefined,
      },
      alternates: { canonical: `${BASE}/portfolio/${project.slug}` },
    };
  } catch {
    return { title: "ABUD Portfolio" };
  }
}

export default function PortfolioSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
