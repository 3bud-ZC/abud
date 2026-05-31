import { prisma } from "@/lib/prisma";
import PortfolioPageClient, { type AppCard } from "./PortfolioPageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PortfolioPage() {
  let apps: AppCard[] = [];

  try {
    const projects = await prisma.portfolioProject.findMany({
      where: { status: "published" },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    apps = projects.map((p) => {
      let ld: {
        tagline?: string;
        accent?: string;
        iconType?: string;
        badge?: string;
      } = {};
      if (p.longDesc) {
        try { ld = JSON.parse(p.longDesc); } catch { /* ignore */ }
      }

      let links: string[] = [];
      try {
        links = Array.isArray(p.links)
          ? (p.links as unknown as string[])
          : JSON.parse(p.links as string);
      } catch { links = []; }

      return {
        slug: p.slug,
        title: p.title,
        tagline: ld.tagline ?? "",
        desc: p.description ?? "",
        href: links[0] ?? "#",
        accent: ld.accent ?? "#a855f7",
        iconType: ld.iconType ?? "layers",
        badge: ld.badge ?? "",
      };
    });
  } catch (e) {
    console.error("[portfolio] DB fetch failed:", (e as Error).message);
  }

  return <PortfolioPageClient apps={apps} />;
}
