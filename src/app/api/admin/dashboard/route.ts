import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const [posts, projects, services, messages, subscribers] = await Promise.all([
    prisma.blogPost.count(),
    prisma.portfolioProject.count(),
    prisma.service.count(),
    prisma.contactMessage.count(),
    prisma.newsletterSubscriber.count(),
  ]);

  const unreadMessages = await prisma.contactMessage.count({
    where: { isRead: false },
  });

  const recentMessages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
    select: {
      id: true,
      name: true,
      email: true,
      subject: true,
      isRead: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    stats: {
      posts,
      projects,
      services,
      messages,
      unreadMessages,
      subscribers,
    },
    recentMessages,
  });
}
