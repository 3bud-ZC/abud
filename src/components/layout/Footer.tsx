"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { Zap, Heart, Github, Twitter, Instagram, Youtube, Send } from "lucide-react";

const footerLinks = {
  pages: [
    { href: "/about", label: "من أنا" },
    { href: "/services", label: "الخدمات" },
    { href: "/portfolio", label: "أعمالي" },
    { href: "/blog", label: "المدونة" },
    { href: "/contact", label: "تواصل" },
  ],
  services: [
    { href: "/services#web", label: "تطوير مواقع" },
    { href: "/services#ai", label: "أدوات الذكاء الاصطناعي" },
    { href: "/services#automation", label: "الأتمتة والأنظمة" },
    { href: "/services#bots", label: "بوتات تيليجرام" },
    { href: "/services#consulting", label: "استشارات تقنية" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com/3bud-ZC", label: "GitHub" },
  { icon: Twitter, href: "#", label: "تويتر / X" },
  { icon: Instagram, href: "#", label: "إنستغرام" },
  { icon: Youtube, href: "#", label: "يوتيوب" },
  { icon: Send, href: "#", label: "تيليجرام" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050508] border-t border-[#1a1a2e] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_30%_at_50%_0%,rgba(147,51,234,0.06)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(147,51,234,0.6)] transition-all duration-300">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-xl tracking-widest text-white">ABUD</span>
            </Link>
            <p className="text-[#a0a0b8] text-sm leading-relaxed mb-6 max-w-xs">
              صانع تقني وباني حلول رقمية بعقلية سيبرانية. أبني الأدوات والمواقع والأنظمة الذكية.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <m.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-8 h-8 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] flex items-center justify-center text-[#a0a0b8] hover:text-purple-400 hover:border-purple-600/40 hover:bg-purple-600/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </m.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">الصفحات</h3>
            <ul className="space-y-2.5">
              {footerLinks.pages.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[#a0a0b8] text-sm hover:text-purple-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-600/50 group-hover:bg-purple-400 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">الخدمات</h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[#a0a0b8] text-sm hover:text-purple-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-600/50 group-hover:bg-purple-400 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">تواصل معي</h3>
            <div className="space-y-3">
              <p className="text-[#a0a0b8] text-sm">للمشاريع والاستفسارات:</p>
              <Link
                href="/contact"
                className="btn-primary text-sm py-2.5 w-full justify-center"
              >
                ابدأ المحادثة
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a2e] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#606080] text-sm flex items-center gap-1.5">
            <span>© {currentYear} ABUD. صُنع بـ</span>
            <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500" />
            <span>في مصر</span>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-[#606080] text-xs hover:text-purple-400 transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="text-[#606080] text-xs hover:text-purple-400 transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
