import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معي — ABUD",
  description: "هل لديك مشروع أو فكرة أو استفسار؟ تواصل معي عبر النموذج أو البريد الإلكتروني abed@abud.fun أو منصات التواصل الاجتماعي.",
  keywords: ["تواصل", "contact", "freelancer", "hire developer", "web developer", "abed@abud.fun"],
  openGraph: {
    title: "تواصل مع ABUD",
    description: "تحدث معي حول مشروعك — أرد على الرسائل خلال 24 ساعة",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
