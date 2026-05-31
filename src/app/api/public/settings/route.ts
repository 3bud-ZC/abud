import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ALLOWED_PUBLIC_KEYS = [
  "brand_name",
  "home_hero_badge",
  "home_hero_title",
  "home_hero_subtitle",
  "home_hero_primary_text",
  "home_hero_primary_link",
  "home_hero_secondary_text",
  "home_hero_secondary_link",
  "home_about_title",
  "home_about_desc",
  "home_final_cta_title",
  "home_final_cta_desc",
  "home_final_cta_primary_text",
  "home_final_cta_primary_link",
  "home_final_cta_secondary_text",
  "home_final_cta_secondary_link",
  "about_name",
  "about_role",
  "about_intro",
  "about_status_badge",
  "about_location",
  "about_experience",
  "about_cv_url",
  "about_profile_image",
  "about_profile_image_position",
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
