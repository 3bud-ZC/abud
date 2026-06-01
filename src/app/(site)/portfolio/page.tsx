import { prisma } from "@/lib/prisma";
import { normalizeThemedIconKey } from "@/lib/themed-icons";
import JsonLd from "@/components/JsonLd";
import PortfolioPageClient, { type AppCard } from "./PortfolioPageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function normalizeLinks(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (item && typeof item === "object") {
        const value = String((item as Record<string, unknown>).url || "").trim();
        return value;
      }
      return "";
    })
    .filter(Boolean);
}

export default async function PortfolioPage() {
  let apps: AppCard[] = [];
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://abud.fun";

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
        const parsed = Array.isArray(p.links)
          ? (p.links as unknown[])
          : JSON.parse(p.links as string);
        links = normalizeLinks(parsed);
      } catch { links = []; }

      return {
        slug: p.slug,
        title: p.title,
        tagline: ld.tagline ?? "",
        desc: p.description ?? "",
        href: links[0] ?? "#",
        accent: ld.accent ?? "#a855f7",
        iconType: normalizeThemedIconKey(ld.iconType, "layers"),
        badge: ld.badge ?? "",
      };
    });
  } catch (e) {
    console.error("[portfolio] DB fetch failed:", (e as Error).message);
  }

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "مشاريع ABUD",
    itemListElement: apps.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: app.title,
        description: app.desc,
        applicationCategory: app.tagline || "Web Application",
        url: `${base}/portfolio/${app.slug}`,
      },
    })),
  };

  return (
    <>
      <JsonLd data={portfolioSchema} />
      <PortfolioPageClient apps={apps} />
    </>
  );
}
