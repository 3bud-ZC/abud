import { prisma } from "@/lib/prisma";
import { normalizeThemedIconKey } from "@/lib/themed-icons";
import JsonLd from "@/components/JsonLd";
import PortfolioPageClient, { type AppCard } from "./PortfolioPageClient";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PortfolioLink = {
  url: string;
  label: string;
  type: "live" | "demo" | "github" | "private" | "other";
};

function normalizeLinks(raw: unknown): PortfolioLink[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => {
      if (typeof item === "string") {
        const url = item.trim();
        if (!url) return null;
        if (/github\.com/i.test(url)) {
          return { url, label: "GitHub", type: "github" as const };
        }
        return { url, label: "View Live", type: "live" as const };
      }

      if (item && typeof item === "object") {
        const row = item as Record<string, unknown>;
        const url = String(row.url || "").trim();
        if (!url) return null;

        const guessed = String(row.type || "").toLowerCase();
        const type: PortfolioLink["type"] =
          guessed === "live"
            ? "live"
            : guessed === "demo"
              ? "demo"
              : guessed === "github"
                ? "github"
                : guessed === "private"
                  ? "private"
                  : /github\.com/i.test(url)
                    ? "github"
                    : "other";

        return {
          url,
          label: String(row.label || "").trim() || (type === "github" ? "GitHub" : type === "demo" ? "Demo" : "View Live"),
          type,
        };
      }

      return null;
    })
    .filter((item): item is PortfolioLink => Boolean(item));
}

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
        problem?: string;
        features?: string[];
        tech?: string[];
      } = {};
      if (p.longDesc) {
        try { ld = JSON.parse(p.longDesc); } catch { /* ignore */ }
      }

      let links: PortfolioLink[] = [];
      try {
        const parsed = Array.isArray(p.links)
          ? (p.links as unknown[])
          : JSON.parse(p.links as string);
        links = normalizeLinks(parsed);
      } catch { links = []; }

      const primaryStatus =
        ld.badge ||
        (links.some((link) => link.type === "live")
          ? "Live"
          : links.some((link) => link.type === "demo")
            ? "Demo"
            : links.some((link) => link.type === "github")
              ? "GitHub"
              : "Private");

      const firstLiveLink = links.find((link) => link.type === "live" || link.type === "demo");

      return {
        slug: p.slug,
        title: p.title,
        tagline: ld.tagline ?? "",
        desc: p.description ?? "",
        href: firstLiveLink?.url || links[0]?.url || "#",
        links,
        accent: ld.accent ?? "#a855f7",
        iconType: normalizeThemedIconKey(ld.iconType, "layers"),
        badge: primaryStatus,
        problem: ld.problem || "تحسين التشغيل وتبسيط تجربة المستخدم مع قابلية نمو واضحة.",
        features: Array.isArray(ld.features) ? ld.features.slice(0, 3) : [],
        techStack: Array.isArray(ld.tech) ? ld.tech.slice(0, 5) : [],
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
        url: siteUrl(`/portfolio/${app.slug}`),
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
