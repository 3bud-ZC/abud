import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { generateSlug } from "@/lib/utils";

export async function GET() {
  const projects = await prisma.portfolioProject.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  const slug = body.slug || generateSlug(body.title);
  const project = await prisma.portfolioProject.create({
    data: { ...body, slug, tags: body.tags || [], links: body.links || [] },
  });
  return NextResponse.json({ project }, { status: 201 });
}
