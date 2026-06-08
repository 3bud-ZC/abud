import { prisma } from "@/lib/prisma";
import { PRIMARY_SERVICES } from "@/data/services";

export interface PublicService {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDesc: string | null;
  useCase: string | null;
  icon: string | null;
  priceType: string;
  price: number | null;
  ctaType: string;
  ctaLabel: string | null;
  featured: boolean;
  isActive: boolean;
  order: number;
}

function mapSeedService(item: (typeof PRIMARY_SERVICES)[number]): PublicService {
  return {
    id: `seed-${item.slug}`,
    title: item.title,
    slug: item.slug,
    description: item.description,
    longDesc: `${item.longDesc}\n\nمدة التسليم: ${item.deliveryTime}`,
    useCase: item.category,
    icon: item.icon,
    priceType: item.priceType,
    price: item.price,
    ctaType: "contact",
    ctaLabel: item.ctaLabel,
    featured: item.featured,
    isActive: true,
    order: item.order,
  };
}

export function getSeedServices(): PublicService[] {
  return PRIMARY_SERVICES.map(mapSeedService);
}

export async function getPublicServices(): Promise<PublicService[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });

    if (rows.length > 0) {
      return rows as PublicService[];
    }
  } catch {
    // fallback to seed data
  }

  return getSeedServices();
}

export async function getPublicServiceBySlug(slug: string): Promise<PublicService | null> {
  try {
    const row = await prisma.service.findUnique({ where: { slug } });
    if (row?.isActive) return row as PublicService;
  } catch {
    // fallback to seed data
  }

  const fallback = getSeedServices().find((service) => service.slug === slug);
  return fallback || null;
}
