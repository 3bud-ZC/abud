import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";
import AIAssistant from "@/components/ui/AIAssistant";
import JsonLd from "@/components/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://abud.fun/#organization",
  name: "ABUD",
  url: "https://abud.fun",
  logo: {
    "@type": "ImageObject",
    url: "https://abud.fun/logo.svg",
    width: 512,
    height: 512,
  },
  image: "https://abud.fun/logo.svg",
  description: "ABUD is a digital platform offering AI tools, automation systems, websites, digital products and modern online solutions.",
  email: "abed@abud.fun",
  founder: {
    "@type": "Person",
    name: "ABUD",
    jobTitle: "Full-Stack Developer & Digital Product Creator",
  },
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
