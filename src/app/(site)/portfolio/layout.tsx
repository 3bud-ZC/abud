import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "أعمال ومشاريع ABUD | Portfolio",
  description:
    "استعرض مشاريع ABUD بتفاصيل Case Study تشمل المشكلة والحل والمزايا والتقنيات وروابط Live/Demo/GitHub.",
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
    title: "أعمال ومشاريع ABUD | Portfolio",
    description: "مشاريع وبرمجيات منفذة فعليًا مع تفاصيل تقنية كاملة.",
    url: siteUrl("/portfolio"),
    type: "website",
  },
  alternates: { canonical: siteUrl("/portfolio") },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
