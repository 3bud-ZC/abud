import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المتجر الرقمي — أدلة ومنتجات رقمية احترافية",
  description: "تصفح أدلة الأمن السيبراني، تطوير الويب، الذكاء الاصطناعي، الفريلانس، وقوالب المواقع. منتجات رقمية بأسعار بالجنيه المصري.",
  keywords: ["منتجات رقمية", "أمن سيبراني", "تطوير ويب", "ذكاء اصطناعي", "فريلانس", "digital products", "cybersecurity guide", "AI tools"],
  openGraph: {
    title: "المتجر الرقمي | ABUD",
    description: "أدلة ومنتجات رقمية احترافية للمطورين والمستقلين — أسعار بالجنيه المصري",
    url: "/store",
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
