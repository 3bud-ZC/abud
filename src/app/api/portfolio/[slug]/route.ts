import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { generateSlug } from "@/lib/utils";

function safeParseArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.portfolioProject.findUnique({ where: { slug } });
  if (!project) return NextResponse.json({ error: "المشروع غير موجود" }, { status: 404 });
  return NextResponse.json({
    project: {
      ...project,
      tags: safeParseArray(project.tags),
      links: safeParseArray(project.links),
    },
  });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { slug } = await params;
  const body = await req.json();
  if (body.title && !body.slug) body.slug = generateSlug(body.title);
  const project = await prisma.portfolioProject.update({
    where: { slug },
    data: {
      ...body,
      tags: Array.isArray(body.tags) ? JSON.stringify(body.tags) : body.tags,
      links: Array.isArray(body.links) ? JSON.stringify(body.links) : body.links,
    },
  });
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${slug}`);
  if (body.slug && body.slug !== slug) revalidatePath(`/portfolio/${body.slug}`);
  revalidatePath("/");
  return NextResponse.json({ project });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { slug } = await params;
  await prisma.portfolioProject.delete({ where: { slug } });
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${slug}`);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
