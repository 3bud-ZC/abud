import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من أنا — ABUD مطور ويب وصانع منتجات رقمية",
  description: "تعرف على ABUD — مطور Full-Stack وصانع منتجات رقمية متخصص في تطوير الويب، الذكاء الاصطناعي، الأمن السيبراني، وأنظمة الأتمتة.",
  keywords: ["ABUD", "مطور ويب", "full stack developer", "AI developer", "cybersecurity", "freelancer", "digital products"],
  openGraph: {
    title: "من أنا | ABUD",
    description: "مطور Full-Stack وصانع منتجات رقمية — بعقلية سيبرانية وشغف حقيقي بالتقنية",
    url: "/about",
  },
  alternates: { canonical: "https://abud.fun/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
