import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { generateSlug } from "@/lib/utils";
import { findPrimaryService } from "@/data/services";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const service = await prisma.service.findUnique({ where: { slug } });
    if (service) return NextResponse.json({ service });
  } catch {
    // fallback below
  }

  const fallback = findPrimaryService(slug);
  if (!fallback) return NextResponse.json({ error: "الخدمة غير موجودة" }, { status: 404 });

  return NextResponse.json({
    service: {
      id: `seed-${fallback.slug}`,
      title: fallback.title,
      slug: fallback.slug,
      description: fallback.description,
      longDesc: `${fallback.longDesc}\n\nمدة التسليم: ${fallback.deliveryTime}`,
      useCase: fallback.category,
      icon: fallback.icon,
      priceType: fallback.priceType,
      price: fallback.price,
      ctaType: "contact",
      ctaLabel: fallback.ctaLabel,
      featured: fallback.featured,
      isActive: true,
      order: fallback.order,
    },
  });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { slug } = await params;
  const body = await req.json();
  if (body.title && !body.slug) body.slug = generateSlug(body.title);
  const service = await prisma.service.update({ where: { slug }, data: body });
  return NextResponse.json({ service });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { slug } = await params;
  await prisma.service.delete({ where: { slug } });
  return NextResponse.json({ ok: true });
}
