import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "تواصل مع ABUD لبدء مشروعك الرقمي",
  description: "تواصل مع عبدالله Ragab لبدء مشروع موقع، نظام ERP/CRM، بوت تيليجرام، أو أداة AI مع خطة تنفيذ وتكلفة مبدئية واضحة.",
  keywords: ["تواصل", "طلب مشروع", "عرض سعر", "Contact ABUD", "ERP", "بوت تيليجرام", "AI"],
  openGraph: {
    title: "تواصل مع ABUD لبدء مشروعك الرقمي",
    description: "ابعت فكرة مشروعك وهرد عليك بخطة مبدئية وتكلفة تقريبية خلال وقت قصير.",
    url: siteUrl("/contact"),
    type: "website",
  },
  alternates: { canonical: siteUrl("/contact") },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
