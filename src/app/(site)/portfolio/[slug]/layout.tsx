import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/site-url";

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
        url: siteUrl(`/portfolio/${project.slug}`),
        images: project.thumbnail
          ? [{ url: project.thumbnail, width: 1200, height: 630, alt: project.title }]
          : undefined,
      },
      alternates: { canonical: siteUrl(`/portfolio/${project.slug}`) },
    };
  } catch {
    return { title: "ABUD Portfolio" };
  }
}

export default function PortfolioSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
