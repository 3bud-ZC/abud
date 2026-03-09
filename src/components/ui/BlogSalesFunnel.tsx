"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Wrench, Zap, MessageSquare, Download } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface RecoItem {
  title: string;
  desc: string;
  price: number;
  slug: string;
  topics: string[];
}

const PRODUCTS: RecoItem[] = [
  { title: "دليل الأمن السيبراني للمبتدئين",   desc: "أساسيات الأمن الرقمي في 80+ صفحة عملية",             price: 149, slug: "cybersecurity-starter-guide",       topics: ["cyber","security","beginner","hacking"] },
  { title: "الدليل الشامل للأمن المتقدم",       desc: "تقنيات الاختراق الأخلاقي والحماية المتقدمة",         price: 349, slug: "advanced-cybersecurity-handbook",     topics: ["cyber","security","advanced","pentest"] },
  { title: "دليل أدوات AI للمطورين",             desc: "أفضل أدوات الذكاء الاصطناعي للمطورين والمستقلين",   price: 149, slug: "ai-tools-developers-guide",           topics: ["ai","developer","productivity","automation","tools"] },
  { title: "خارطة طريق Full Stack Developer",   desc: "دليل شامل من الصفر إلى الاحتراف",                   price: 129, slug: "fullstack-developer-roadmap",          topics: ["developer","career","beginner","web","fullstack"] },
  { title: "حقيبة أدوات المستقل المحترف",       desc: "عقود وفواتير وقوالب جاهزة للعمل الحر",              price: 119, slug: "freelancer-toolkit",                  topics: ["freelance","income","career","money","client"] },
  { title: "قالب موقع بورتفوليو احترافي",       desc: "قالب Next.js جاهز للتخصيص والنشر الفوري",           price: 199, slug: "portfolio-website-template",          topics: ["portfolio","template","developer","web","career"] },
  { title: "دليل تحسين أداء الألعاب الشامل",   desc: "رفع FPS وتحسين الأداء بدون تغيير الأجهزة",          price: 119, slug: "gaming-performance-guide",            topics: ["gaming","performance","fps"] },
  { title: "دليل إنتاجية المطور المحترف",       desc: "منظومة العمل والإنتاجية للمطورين المحترفين",         price: 99,  slug: "developer-productivity-guide",        topics: ["productivity","developer","tools","workflow"] },
  { title: "دليل احتراف Git وGitHub",            desc: "Branching، CI/CD، GitHub Actions، وعمل الفرق",    price: 99,  slug: "git-github-mastery-guide",             topics: ["developer","git","devops","tools"] },
];

const SERVICES: RecoItem[] = [
  { title: "فحص أمني شامل للموقع",              desc: "تقييم الثغرات وتقرير تفصيلي في 48 ساعة",            price: 1499, slug: "website-security-audit",              topics: ["cyber","security","web"] },
  { title: "تطوير موقع بورتفوليو شخصي",         desc: "موقع Next.js احترافي يعرض هويتك المهنية",           price: 3999, slug: "portfolio-website-development",       topics: ["portfolio","developer","web","career"] },
  { title: "خدمة إصلاح الأخطاء البرمجية",       desc: "تشخيص وإصلاح أي خطأ في 24-48 ساعة",               price: 799,  slug: "bug-fixing-service",                  topics: ["developer","debugging","web"] },
  { title: "استشارة مسار مهني تقني",             desc: "جلسة مخصصة لرسم مسارك في التقنية",                 price: 599,  slug: "tech-career-consultation",            topics: ["career","beginner","freelance","income"] },
  { title: "تحسين سرعة وأداء الموقع",           desc: "PageSpeed 90+ وتحسين Core Web Vitals",              price: 1199, slug: "website-performance-optimization",    topics: ["developer","performance","web","productivity"] },
  { title: "تأمين الخادم Linux/VPS",             desc: "إعداد وتأمين خادمك بمعايير أمنية عالمية",          price: 2499, slug: "server-security-hardening",           topics: ["cyber","security","server","devops"] },
];

function score(item: RecoItem, kw: string[]): number {
  return item.topics.filter(t => kw.some(k => k.includes(t) || t.includes(k))).length;
}

interface Props {
  category?: { name: string; slug: string } | null;
  tags?: string[];
}

const cardAnim = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};
const gridAnim = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.07 } },
};

export default function BlogSalesFunnel({ category, tags = [] }: Props) {
  const kw = [
    ...(category?.slug || "").split(/[-_\s]/),
    ...tags.map(t => t.toLowerCase()),
  ].filter(Boolean);

  const products = [...PRODUCTS]
    .sort((a, b) => score(b, kw) - score(a, kw))
    .slice(0, 3);

  const services = [...SERVICES]
    .sort((a, b) => score(b, kw) - score(a, kw))
    .slice(0, 3);

  return (
    <div className="mt-16 space-y-12">

      {/* ── Divider ── */}
      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(147,51,234,0.25), rgba(6,182,212,0.2), transparent)" }} />

      {/* ── Recommended Products ── */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(147,51,234,0.15)", border: "1px solid rgba(147,51,234,0.3)" }}>
            <ShoppingBag className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className="text-white font-black text-lg leading-none" style={{ letterSpacing: "-0.02em" }}>
              منتجات موصى بها
            </h3>
            <p className="text-xs mt-1" style={{ color: "#505070" }}>
              بناءً على هذا المقال قد يهمك
            </p>
          </div>
        </div>

        <motion.div
          variants={gridAnim} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {products.map(p => (
            <motion.div key={p.slug} variants={cardAnim} whileHover={{ y: -4 }}
              className="rounded-2xl p-4 flex flex-col group"
              style={{ background: "rgba(12,8,22,0.9)", border: "1px solid rgba(40,28,65,0.8)", transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(147,51,234,0.35)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(40,28,65,0.8)")}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: "rgba(147,51,234,0.1)", border: "1px solid rgba(147,51,234,0.2)" }}>
                <Download className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="text-white font-bold text-sm leading-snug mb-1.5 group-hover:text-purple-200 transition-colors line-clamp-2"
                style={{ letterSpacing: "-0.01em" }}>
                {p.title}
              </h4>
              <p className="text-xs leading-relaxed flex-1 mb-4 line-clamp-2" style={{ color: "#606080" }}>
                {p.desc}
              </p>
              <div className="flex items-center justify-between gap-2 pt-3"
                style={{ borderTop: "1px solid rgba(40,28,65,0.5)" }}>
                <span className="font-black text-sm" style={{ color: "#c084fc" }}>
                  {formatPrice(p.price)}
                </span>
                <Link href={`/store/${p.slug}`}
                  className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-all"
                  style={{ background: "rgba(147,51,234,0.1)", border: "1px solid rgba(147,51,234,0.22)", color: "#c084fc" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(147,51,234,0.22)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(147,51,234,0.1)")}>
                  <Zap className="w-3 h-3" /> اشتر الآن
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Recommended Services ── */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)" }}>
            <Wrench className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-black text-lg leading-none" style={{ letterSpacing: "-0.02em" }}>
              خدمات ذات صلة
            </h3>
            <p className="text-xs mt-1" style={{ color: "#505070" }}>
              اطلب خدمة احترافية لتطبيق ما تعلمته
            </p>
          </div>
        </div>

        <motion.div
          variants={gridAnim} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {services.map(s => (
            <motion.div key={s.slug} variants={cardAnim} whileHover={{ y: -4 }}
              className="rounded-2xl p-4 flex flex-col group"
              style={{ background: "rgba(5,8,18,0.9)", border: "1px solid rgba(6,182,212,0.1)", transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(6,182,212,0.1)")}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)" }}>
                <Wrench className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="text-white font-bold text-sm leading-snug mb-1.5 group-hover:text-cyan-200 transition-colors line-clamp-2"
                style={{ letterSpacing: "-0.01em" }}>
                {s.title}
              </h4>
              <p className="text-xs leading-relaxed flex-1 mb-4 line-clamp-2" style={{ color: "#606080" }}>
                {s.desc}
              </p>
              <div className="flex items-center justify-between gap-2 pt-3"
                style={{ borderTop: "1px solid rgba(6,182,212,0.08)" }}>
                <span className="font-black text-sm" style={{ color: "#67e8f9" }}>
                  {formatPrice(s.price)}
                </span>
                <Link href={`/store/${s.slug}`}
                  className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-all"
                  style={{ background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.2)", color: "#67e8f9" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(6,182,212,0.18)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(6,182,212,0.07)")}>
                  <MessageSquare className="w-3 h-3" /> طلب الخدمة
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Browse all CTA ── */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/store"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{ background: "rgba(147,51,234,0.1)", border: "1px solid rgba(147,51,234,0.25)", color: "#c084fc" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(147,51,234,0.2)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(147,51,234,0.1)")}>
          <ShoppingBag className="w-4 h-4" /> استعراض المتجر الكامل
        </Link>
        <Link href="/resources"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{ background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.2)", color: "#67e8f9" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(6,182,212,0.15)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(6,182,212,0.07)")}>
          📁 مكتبة الأدوات المجانية
        </Link>
      </div>
    </div>
  );
}
