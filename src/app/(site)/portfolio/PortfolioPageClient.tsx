"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, User } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import HolographicCard from "@/components/effects/HolographicCard";
import { getThemedIconPreset } from "@/lib/themed-icons";

export interface AppCard {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  href: string;
  links: { url: string; label: string; type: "live" | "demo" | "github" | "private" | "other" }[];
  accent: string;
  iconType: string;
  badge: string;
  problem: string;
  features: string[];
  techStack: string[];
}

const GITHUB_URL = "https://github.com/3bud-ZC";

const cardAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function PortfolioPageClient({ apps }: { apps: AppCard[] }) {
  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <FloatingOrbs count={6} />
        <ScanLine duration={9} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-badge mb-6">
              <ExternalLink className="w-2.5 h-2.5" />
              Portfolio
            </span>
            <h1
              className="font-black text-white mt-5 mb-4"
              style={{ fontSize: "clamp(2.1rem, 5vw, 3.3rem)", letterSpacing: "-0.02em" }}
            >
              أعمالي ومشاريع قمت بتنفيذها
            </h1>
            <p
              className="text-base md:text-lg max-w-2xl mx-auto mb-8"
              style={{ color: "#a8a8c8", lineHeight: 1.8 }}
            >
              كل مشروع هنا مع عرض المشكلة والحل والتقنيات المستخدمة، مع روابط Live / Demo / GitHub حسب حالة المشروع.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="tag-pill text-xs px-3 py-1.5">✦ {apps.length} مشاريع منشورة</span>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="tag-pill text-xs px-3 py-1.5 inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── APPS GRID ── */}
      <section className="py-14 px-4 relative overflow-hidden">
        <FloatingOrbs count={6} />
        <ScanLine duration={10} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {apps.map((app) => {
              const iconPreset = getThemedIconPreset(app.iconType, "layers");
              const Icon = iconPreset.icon;

              return (
                <motion.div key={app.slug} variants={cardAnim} initial="hidden" animate="show">
                  <HolographicCard duration={6}>
                    <div className="p-6 md:p-7 h-full flex flex-col">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `${app.accent}1a`,
                              border: `1px solid ${app.accent}40`,
                              boxShadow: `0 0 18px ${app.accent}22`,
                              color: app.accent,
                            }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3
                                className="text-white font-black text-lg leading-tight"
                                style={{ letterSpacing: "-0.02em" }}
                              >
                                {app.title}
                              </h3>
                              {app.badge ? (
                                <span
                                  className="text-[11px] px-2 py-0.5 rounded-full"
                                  style={{
                                    background: `${app.accent}1a`,
                                    border: `1px solid ${app.accent}40`,
                                    color: app.accent,
                                  }}
                                >
                                  {app.badge}
                                </span>
                              ) : null}
                            </div>
                            <p className="text-xs mt-1" style={{ color: app.accent, opacity: 0.9 }}>
                              {app.tagline}
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed mb-3" style={{ color: "#9090b0" }}>
                        {app.desc}
                      </p>

                      <div className="mb-3 p-3 rounded-xl border border-white/10 bg-white/5">
                        <div className="text-[11px] text-[#a8a8c8] mb-1">Problem Solved</div>
                        <p className="text-xs text-[#c5c5de] leading-relaxed">{app.problem}</p>
                      </div>

                      {app.features.length > 0 && (
                        <div className="mb-3">
                          <div className="text-[11px] text-[#a8a8c8] mb-1">Key Features</div>
                          <div className="flex flex-wrap gap-1.5">
                            {app.features.map((feature) => (
                              <span key={feature} className="text-[10px] px-2 py-1 rounded-full border border-purple-600/30 bg-purple-600/10 text-purple-100">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {app.techStack.length > 0 && (
                        <div className="mb-5">
                          <div className="text-[11px] text-[#a8a8c8] mb-1">Tech Stack</div>
                          <div className="flex flex-wrap gap-1.5">
                            {app.techStack.map((tech) => (
                              <span key={tech} className="text-[10px] px-2 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-100">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-[11px] text-[#c7c7df] mb-4">
                        Status: <span className="font-semibold" style={{ color: app.accent }}>{app.badge || "Private"}</span>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-2">
                        {app.href !== "#" ? (
                          <a
                            href={app.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary btn-glow gap-2 text-sm py-2.5 px-5 inline-flex items-center"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>View Live</span>
                          </a>
                        ) : (
                          <span className="btn-outline text-sm py-2.5 px-5 inline-flex items-center opacity-60 cursor-not-allowed">
                            Private Project
                          </span>
                        )}
                        <Link
                          href={`/portfolio/${app.slug}`}
                          className="btn-outline gap-2 text-sm py-2.5 px-5 inline-flex items-center"
                        >
                          <span>View Details</span>
                        </Link>
                        <Link
                          href={`/contact?subject=${encodeURIComponent(`طلب مشروع مشابه: ${app.title}`)}&message=${encodeURIComponent(`مرحبًا، أحتاج مشروع مشابه لـ ${app.title}.\n\nأريد معرفة الخطة والتكلفة المتوقعة.`)}`}
                          className="btn-outline gap-2 text-sm py-2.5 px-5 inline-flex items-center"
                        >
                          <span>Request Similar Project</span>
                        </Link>
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ABOUT AUTHOR ── */}
      <section className="py-10 px-4 relative overflow-hidden">
        <FloatingOrbs count={4} />
        <ScanLine duration={12} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <AnimatedSection>
            <HolographicCard duration={7}>
              <Link href="/about" className="block group">
                <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-1 rounded-full"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0%, #c084fc 25%, transparent 50%, #67e8f9 75%, transparent 100%)",
                        padding: "2px",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                    <div
                      className="relative w-20 h-20 rounded-full overflow-hidden"
                      style={{
                        border: "2px solid rgba(192,132,252,0.5)",
                        boxShadow: "0 0 20px rgba(168,85,247,0.35)",
                      }}
                    >
                      <Image
                        src="/avatar.jpeg"
                        alt="Abud"
                        fill
                        sizes="80px"
                        unoptimized
                        className="object-cover"
                        style={{ objectPosition: "58% 65%", transform: "scale(1.05)" }}
                      />
                    </div>
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-[#0a0814]"
                      style={{ background: "#34d399", boxShadow: "0 0 10px #34d399" }}
                    />
                  </div>

                  {/* Bio */}
                  <div className="flex-1 min-w-0">
                    <span className="section-badge mb-3 inline-flex">
                      <User className="w-2.5 h-2.5" />
                      تعرّف على المطوّر
                    </span>
                    <h2
                      className="text-white font-black text-xl md:text-2xl mb-2 group-hover:text-purple-200 transition-colors"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      Abud — Full-Stack & AI Engineer
                    </h2>
                    <p className="text-sm mb-3" style={{ color: "#9090b0", lineHeight: 1.7 }}>
                      ورا كل المشاريع دي شخص واحد بيحب يبني حلول حقيقية. اعرف القصة الكاملة والمسيرة من 2019 لحد
                      دلوقتي.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-300 group-hover:text-purple-100 transition-colors">
                      <span>قصة Abud الكاملة</span>
                      <motion.span
                        animate={{ x: [0, -3, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </motion.span>
                    </span>
                  </div>
                </div>
              </Link>
            </HolographicCard>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 relative overflow-hidden">
        <FloatingOrbs count={5} />
        <ScanLine duration={11} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <AnimatedSection>
            <HolographicCard duration={6}>
              <div className="p-8 md:p-10 text-center">
                <h2 className="text-white font-black text-2xl mb-2" style={{ letterSpacing: "-0.02em" }}>
                  اطلب مشروع مشابه
                </h2>
                <p className="text-sm mb-5" style={{ color: "#9090b0" }}>
                  لو عندك فكرة مشابهة لأي مشروع من الأعمال المعروضة، ابعت التفاصيل وهرد عليك بخطة تنفيذ وتكلفة تقريبية.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/contact" className="btn-primary btn-glow gap-2 text-sm py-2.5 px-6">
                    اطلب مشروع مشابه
                  </Link>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline gap-2 text-sm py-2.5 px-5 inline-flex items-center"
                  >
                    <Github className="w-4 h-4" />
                    Follow on GitHub
                  </a>
                </div>
              </div>
            </HolographicCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
