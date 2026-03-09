import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";
import AIAssistant from "@/components/ui/AIAssistant";
import JsonLd from "@/components/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "ABUD",
  url: "https://abud.fun",
  email: "abed@abud.fun",
  jobTitle: "Full-Stack Developer & Digital Product Creator",
  description: "صانع تقني • باني حلول رقمية • بعقلية سيبرانية. أبني المواقع والأدوات والأنظمة الذكية.",
  sameAs: [
    "https://github.com/3bud-ZC",
    "https://t.me/abud_dev",
  ],
  knowsAbout: [
    "Web Development", "Next.js", "React", "TypeScript", "Cybersecurity",
    "Artificial Intelligence", "Telegram Bots", "DevOps", "Digital Products",
  ],
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <Navbar />
      <main className="min-h-screen">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}
