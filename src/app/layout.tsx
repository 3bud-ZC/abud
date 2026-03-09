import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Tajawal, IBM_Plex_Sans_Arabic } from "next/font/google";
import MotionProvider from "@/components/providers/MotionProvider";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
  preload: true,
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "ABUD | صانع تقني وباني حلول رقمية",
    template: "%s | ABUD",
  },
  description: "صانع تقني • باني حلول رقمية • بعقلية سيبرانية. أبني المواقع والأدوات والأنظمة الذكية.",
  keywords: [
    "ABUD", "تطوير مواقع", "ذكاء اصطناعي", "برمجة", "منتجات رقمية", "تقنية",
    "make money online", "AI tools", "digital products", "online business", "freelancing",
    "passive income", "automation tools", "productivity tools", "online income ideas",
    "cybersecurity", "web development", "full stack developer", "telegram bots",
    "أمن سيبراني", "فريلانس", "دخل سلبي", "أتمتة", "كسب المال أونلاين",
  ],
  authors: [{ name: "ABUD" }],
  creator: "ABUD",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "ABUD Platform",
    title: "ABUD | صانع تقني وباني حلول رقمية",
    description: "صانع تقني • باني حلول رقمية • بعقلية سيبرانية",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABUD | صانع تقني وباني حلول رقمية",
    description: "صانع تقني • باني حلول رقمية • بعقلية سيبرانية",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={`${tajawal.variable} ${ibmPlexArabic.variable}`}>
      <head>
        <meta name="theme-color" content="#050508" />
      </head>
      <body className="bg-[#050508] text-[#f8f8ff] antialiased">
        <MotionProvider>
          {children}
        </MotionProvider>
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: "#0d0d14",
              color: "#f8f8ff",
              border: "1px solid #1a1a2e",
              fontFamily: "IBM Plex Sans Arabic, Tajawal, sans-serif",
              direction: "rtl",
            },
            success: {
              iconTheme: { primary: "#9333ea", secondary: "#f8f8ff" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#f8f8ff" },
            },
          }}
        />
      </body>
    </html>
  );
}
