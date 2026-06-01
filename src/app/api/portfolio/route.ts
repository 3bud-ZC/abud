import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { generateSlug } from "@/lib/utils";

export async function GET() {
  const projects = await prisma.portfolioProject.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({
    projects: projects.map((project) => ({
      ...project,
      tags:
        typeof project.tags === "string" ? JSON.parse(project.tags) : project.tags,
      links:
        typeof project.links === "string"
          ? JSON.parse(project.links)
          : project.links,
    })),
  });
}

export async function POST(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  const slug = body.slug || generateSlug(body.title);
  const project = await prisma.portfolioProject.create({
    data: {
      ...body,
      slug,
      tags: Array.isArray(body.tags) ? JSON.stringify(body.tags) : body.tags || "[]",
      links: Array.isArray(body.links) ? JSON.stringify(body.links) : body.links || "[]",
    },
  });
  revalidatePath("/portfolio");
  revalidatePath("/");
  return NextResponse.json({ project }, { status: 201 });
}
