import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "خدمات برمجة وتطوير مواقع وأنظمة رقمية | ABUD",
  description: "خدمات تطوير مواقع، أنظمة ERP/CRM، بوتات تيليجرام، أدوات AI، أتمتة الأعمال، ونشر المشاريع على VPS.",
  keywords: [
    "تطوير مواقع",
    "Web Development",
    "ERP",
    "CRM",
    "بوتات تيليجرام",
    "AI Automation",
    "VPS Deployment",
  ],
  openGraph: {
    title: "خدمات برمجة وتطوير مواقع وأنظمة رقمية | ABUD",
    description: "حلول رقمية متكاملة تشمل المواقع والأنظمة والبوتات وأدوات الأتمتة والنشر على VPS.",
    url: siteUrl("/services"),
    type: "website",
  },
  alternates: { canonical: siteUrl("/services") },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
