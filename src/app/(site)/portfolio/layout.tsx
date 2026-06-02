import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "أعمالي — تطبيقات وروابط مباشرة",
  description:
    "روابط مباشرة لأحدث التطبيقات اللي بنيتها — جرّبها فورًا وشوف النتيجة على أرض الواقع.",
  keywords: [
    "portfolio",
    "projects",
    "apps",
    "مشاريع",
    "تطبيقات",
    "Next.js",
    "AI",
    "أعمال مطور",
  ],
  openGraph: {
    title: "Portfolio | ABUD",
    description: "روابط مباشرة لأحدث التطبيقات اللي بنيتها.",
    url: siteUrl("/portfolio"),
  },
  alternates: { canonical: siteUrl("/portfolio") },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
