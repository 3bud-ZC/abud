import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Tajawal, IBM_Plex_Sans_Arabic } from "next/font/google";
import MotionProvider from "@/components/providers/MotionProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
    default: "ABUD | AI Tools, Digital Solutions & Automation",
    template: "%s | ABUD",
  },
  description: "ABUD is a digital platform offering AI tools, automation systems, websites, digital products and modern online solutions.",
  keywords: [
    "ABUD", "AI tools", "digital solutions", "automation", "web development", "digital products",
    "online business", "freelancing", "passive income", "cybersecurity", "telegram bots",
    "full stack developer", "Next.js", "React", "productivity tools", "online income",
    "تطوير مواقع", "ذكاء اصطناعي", "منتجات رقمية", "أتمتة", "أمن سيبراني", "فريلانس",
  ],
  authors: [{ name: "ABUD", url: "https://abud.fun" }],
  creator: "ABUD",
  publisher: "ABUD",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://abud.fun"),
  alternates: { canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://abud.fun" },
  icons: {
    icon: [
      { url: "/favicon.ico",       sizes: "any",      type: "image/x-icon" },
      { url: "/icon",              sizes: "32x32",   type: "image/png" },
      { url: "/apple-icon",        sizes: "180x180", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://abud.fun",
    siteName: "ABUD",
    title: "ABUD | AI Tools, Digital Solutions & Automation",
    description: "ABUD is a digital platform offering AI tools, automation systems, websites, digital products and modern online solutions.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ABUD - AI Tools & Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABUD | AI Tools, Digital Solutions & Automation",
    description: "ABUD is a digital platform offering AI tools, automation systems, websites, digital products and modern online solutions.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
        <meta name="google-site-verification" content="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <GoogleAnalytics />
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
