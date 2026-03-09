import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مكتبة المصادر — أدوات مجانية للمطورين والمستقلين",
  description: "أكثر من 40 أداة ومصدر مجاني مختار: أدوات AI، أدوات المطورين، منصات الفريلانس، الأمن السيبراني، وبناء المواقع.",
  keywords: ["أدوات مجانية", "AI tools", "developer tools", "freelancing", "cybersecurity", "productivity", "ChatGPT", "VS Code", "GitHub"],
  openGraph: {
    title: "مكتبة المصادر | ABUD",
    description: "40+ أداة ومصدر مجاني للمطورين والمستقلين وعشاق الأمن السيبراني",
    url: "/resources",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
