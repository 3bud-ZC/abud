import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { generateSlug } from "@/lib/utils";
import { PRIMARY_SERVICES } from "@/data/services";

function fallbackServices() {
  return PRIMARY_SERVICES.map((service) => ({
    id: `seed-${service.slug}`,
    title: service.title,
    slug: service.slug,
    description: service.description,
    longDesc: `${service.longDesc}\n\nمدة التسليم: ${service.deliveryTime}`,
    useCase: service.category,
    icon: service.icon,
    priceType: service.priceType,
    price: service.price,
    ctaType: "contact",
    ctaLabel: service.ctaLabel,
    featured: service.featured,
    isActive: true,
    order: service.order,
    createdAt: new Date(0),
    updatedAt: new Date(0),
  }));
}

export async function GET(req: NextRequest) {
  const includeAll = new URL(req.url).searchParams.get("all") === "1";

  if (includeAll) {
    const session = await verifySession(req);
    if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    const services = await prisma.service.findMany({
      where: includeAll ? undefined : { isActive: true },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });

    if (!includeAll && services.length === 0) {
      return NextResponse.json({ services: fallbackServices() });
    }

    return NextResponse.json({ services });
  } catch {
    if (!includeAll) {
      return NextResponse.json({ services: fallbackServices() });
    }

    return NextResponse.json({ error: "فشل تحميل الخدمات" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  const slug = body.slug || generateSlug(body.title);

  const maxOrder = await prisma.service.findFirst({
    select: { order: true },
    orderBy: { order: "desc" },
  });

  const service = await prisma.service.create({
    data: {
      ...body,
      slug,
      order:
        typeof body.order === "number" && Number.isFinite(body.order)
          ? body.order
          : (maxOrder?.order || 0) + 1,
    },
  });

  return NextResponse.json({ service }, { status: 201 });
}
