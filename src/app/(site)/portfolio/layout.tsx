import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أعمالي — مشاريع ويب وذكاء اصطناعي احترافية",
  description: "استعرض مشاريعي في تطوير الويب، الذكاء الاصطناعي، الأمن السيبراني، وبناء المنصات الرقمية. مشاريع حقيقية بتقنيات حديثة.",
  keywords: [
    "portfolio", "مشاريع برمجية", "Next.js projects", "AI projects",
    "web development portfolio", "أعمال مطور", "مشاريع تيليغرام",
  ],
  openGraph: {
    title: "أعمالي | ABUD",
    description: "مشاريع في تطوير الويب، AI، والأمن السيبراني — كل مشروع قصة نجاح حقيقية",
    url: "/portfolio",
  },
  alternates: { canonical: "https://abud.fun/portfolio" },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
