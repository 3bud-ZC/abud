import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ALLOWED_PUBLIC_KEYS = [
  "site_email",
  "site_phone",
  "whatsapp_number",
  "social_twitter",
  "social_github",
  "social_linkedin",
  "social_instagram",
] as const;

export async function GET() {
  const settings = await prisma.siteSetting.findMany({
    where: { key: { in: [...ALLOWED_PUBLIC_KEYS] } },
    select: { key: true, value: true },
  });

  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;

  return NextResponse.json({ settings: map });
}
