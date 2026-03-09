import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدماتي — تطوير مواقع وذكاء اصطناعي وأمن سيبراني",
  description: "أقدم خدمات احترافية في تطوير مواقع الويب، بناء بوتات التيليغرام، تطبيقات الذكاء الاصطناعي، الأمن السيبراني، وأنظمة الأتمتة.",
  keywords: [
    "تطوير مواقع", "web development", "بوت تيليغرام", "telegram bot",
    "ذكاء اصطناعي", "AI development", "أمن سيبراني", "cybersecurity",
    "أتمتة", "automation", "Next.js developer", "freelance developer",
  ],
  openGraph: {
    title: "خدماتي | ABUD",
    description: "تطوير مواقع احترافية، بوتات تيليغرام، تطبيقات AI، وأنظمة أتمتة متكاملة",
    url: "/services",
  },
  alternates: { canonical: "https://abud.fun/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
