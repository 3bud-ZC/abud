import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة — ABUD",
  description: "أجوبة على أكثر الأسئلة شيوعاً حول خدماتي، أسعاري، طريقة العمل، وسياسة الاسترداد.",
  keywords: ["أسئلة شائعة", "FAQ", "أسعار", "طريقة الدفع", "مدة التسليم", "ضمان الجودة"],
  openGraph: {
    title: "الأسئلة الشائعة | ABUD",
    description: "كل ما تريد معرفته قبل التعامل معي — أسئلة وأجوبة واضحة",
    url: siteUrl("/faq"),
  },
  alternates: { canonical: siteUrl("/faq") },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
