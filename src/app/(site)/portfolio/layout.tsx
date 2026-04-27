import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أعمالي — مشاريع GitHub مفتوحة المصدر",
  description: "استعرض مشاريعي على GitHub: أدوات الذكاء الاصطناعي، بوتات تيليجرام، أنظمة أتمتة، ومنصات ويب — مباشرة من حسابي @3bud-ZC.",
  keywords: [
    "portfolio", "GitHub", "open source", "مشاريع برمجية",
    "Next.js projects", "AI projects", "Telegram bots", "أعمال مطور",
  ],
  openGraph: {
    title: "GitHub Portfolio | ABUD",
    description: "مشاريعي على GitHub — كود مفتوح، أدوات حقيقية، حلول مطبّقة.",
    url: "/portfolio",
  },
  alternates: { canonical: "https://abud.fun/portfolio" },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
