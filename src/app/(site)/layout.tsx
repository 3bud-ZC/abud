import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";
import JsonLd from "@/components/JsonLd";
import ScrollProgress from "@/components/effects/ScrollProgress";
import GlobalBackground from "@/components/effects/GlobalBackground";
import FloatingContact from "@/components/ui/FloatingContact";
import CommandPalette from "@/components/ui/CommandPalette";
import { siteUrl } from "@/lib/site-url";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": siteUrl("/#organization"),
      name: "ABUD",
      url: siteUrl(),
      logo: {
        "@type": "ImageObject",
        url: siteUrl("/logo.svg"),
        width: 512,
        height: 512,
      },
      image: siteUrl("/logo.svg"),
      description:
        "ABUD provides web development, ERP/CRM systems, Telegram bots, AI tools, and VPS deployment services.",
      email: "abed@abud.fun",
      founder: { "@id": siteUrl("/#person") },
      sameAs: ["https://github.com/3bud-ZC", "https://t.me/abud_dev"],
    },
    {
      "@type": "Person",
      "@id": siteUrl("/#person"),
      name: "Abdullah Ragab",
      alternateName: "ABUD",
      url: siteUrl("/about"),
      image: siteUrl("/avatar.jpeg"),
      jobTitle: "Full-Stack Developer",
      worksFor: { "@id": siteUrl("/#organization") },
      sameAs: ["https://github.com/3bud-ZC", "https://t.me/abud_dev"],
      knowsAbout: [
        "Web Development",
        "ERP Systems",
        "CRM Systems",
        "Telegram Bots",
        "AI Automation",
        "VPS Deployment",
      ],
    },
    {
      "@type": "WebSite",
      "@id": siteUrl("/#website"),
      name: "ABUD",
      url: siteUrl(),
      inLanguage: ["ar", "en"],
      publisher: { "@id": siteUrl("/#organization") },
    },
    {
      "@type": "ProfessionalService",
      "@id": siteUrl("/#professional-service"),
      name: "ABUD Software Services",
      url: siteUrl("/services"),
      provider: { "@id": siteUrl("/#person") },
      areaServed: "EG",
      serviceType: [
        "Web Development",
        "ERP/CRM Systems",
        "Telegram Bots & Mini Apps",
        "AI & Automation Tools",
        "VPS Deployment and Maintenance",
      ],
    },
  ],
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={structuredData} />
      <GlobalBackground />
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen relative isolate">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingContact />
      <CommandPalette />
    </>
  );
}
