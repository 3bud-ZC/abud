import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المدونة التقنية — مقالات عن AI وتطوير الويب والأمن السيبراني",
  description: "مقالات تقنية متخصصة عن الذكاء الاصطناعي، تطوير الويب، الأمن السيبراني، الفريلانس، وأدوات الإنتاجية.",
  keywords: ["مدونة تقنية", "ذكاء اصطناعي", "أمن سيبراني", "تطوير ويب", "فريلانس", "AI blog", "cybersecurity", "web development", "tech blog"],
  openGraph: {
    title: "المدونة التقنية | ABUD",
    description: "مقالات تقنية متخصصة عن AI وتطوير الويب والأمن السيبراني والفريلانس",
    url: "/blog",
    type: "website",
  },
  alternates: { canonical: "https://abud.fun/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
