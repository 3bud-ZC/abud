"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Github, Linkedin, Twitter, Send, Mail, Download, MapPin, Zap, Instagram } from "lucide-react";
import HolographicWordmark from "@/components/effects/HolographicWordmark";
import { TRUST_METRIC_BY_ID } from "@/data/trust-metrics";

const DEFAULT_SOCIALS = [
  { icon: Github,   label: "GitHub",   href: "https://github.com/3bud-ZC",      accent: "#c084fc" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/abud",     accent: "#67e8f9" },
  { icon: Twitter,  label: "X",        href: "https://x.com/abud",               accent: "#a78bfa" },
  { icon: Send,     label: "Telegram", href: "https://t.me/abud",                accent: "#34d399" },
  { icon: Mail,     label: "Email",    href: "mailto:hello@abud.fun",            accent: "#f0abfc" },
];

const DELIVERY_PILLARS = [
  { title: "تشخيص سريع", detail: "تحليل الهدف والمشكلة قبل أي كود" },
  { title: "تنفيذ مرحلي", detail: "نسخ قابلة للاختبار بدل انتظار طويل" },
  { title: "تسليم قابل للصيانة", detail: "بنية واضحة وسهلة التطوير لاحقاً" },
];

const CLIENT_FIT = [
  "إطلاق MVP احترافي بسرعة",
  "أتمتة العمليات اليومية وتقليل الهدر",
  "بناء نظام مستقر قابل للتوسع",
];

function isValidObjectPosition(value: string): boolean {
  const v = value.trim().toLowerCase();
  const keyword = "(left|center|right|top|bottom)";
  const percent = "(\\d{1,3}%)";
  const token = `(${keyword}|${percent})`;
  const re = new RegExp(`^${token}\\s+${token}$`);
  return re.test(v);
}

export default function ProfileHero() {
  const projectsMetric = TRUST_METRIC_BY_ID.projects;
  const yearsMetric = TRUST_METRIC_BY_ID.years;
  const clientsMetric = TRUST_METRIC_BY_ID.clients;

  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const [profileImage, setProfileImage] = useState("/avatar.jpeg");
  const [profileImagePosition, setProfileImagePosition] = useState("58% 65%");
  const [socials, setSocials] = useState(DEFAULT_SOCIALS);
  const [about, setAbout] = useState({
    name: "Abud",
    role: "Full-Stack Developer • AI & Automation Engineer",
    intro:
      "أحوّل أفكار المشاريع إلى منتجات رقمية جاهزة للسوق: مواقع سريعة، أنظمة تشغيل داخلية، وأدوات AI مخصصة ترفع الإنتاجية وتقلل الهدر.",
    statusBadge: "متاح للمشاريع الجديدة",
    location: "القاهرة، مصر • UTC+3",
    experience: `${yearsMetric.value}+ سنوات خبرة عملية`,
    cvUrl: "/cv-abud.pdf",
  });

  useEffect(() => {
    async function loadPublicSettings() {
      try {
        const res = await fetch("/api/public/settings");
        if (!res.ok) return;
        const data = await res.json();
        const s = data.settings || {};
        if (s.about_profile_image) setProfileImage(s.about_profile_image);
        if (s.about_profile_image_position && isValidObjectPosition(s.about_profile_image_position)) {
          setProfileImagePosition(s.about_profile_image_position);
        }
        setAbout((prev) => ({
          ...prev,
          name: s.about_name || prev.name,
          role: s.about_role || prev.role,
          intro: s.about_intro || prev.intro,
          statusBadge: s.about_status_badge || prev.statusBadge,
          location: s.about_location || prev.location,
          experience: s.about_experience || prev.experience,
          cvUrl: s.about_cv_url || prev.cvUrl,
        }));
        setSocials([
          { icon: Github, label: "GitHub", href: s.social_github || "https://github.com/3bud-ZC", accent: "#c084fc" },
          { icon: Linkedin, label: "LinkedIn", href: s.social_linkedin || "https://linkedin.com/in/abud", accent: "#67e8f9" },
          { icon: Instagram, label: "Instagram", href: s.social_instagram || "", accent: "#f472b6" },
          { icon: Twitter, label: "X", href: s.social_twitter || "", accent: "#a78bfa" },
          { icon: Mail, label: "Email", href: s.site_email ? `mailto:${s.site_email}` : "mailto:hello@abud.fun", accent: "#f0abfc" },
        ]);
      } catch {
        // keep defaults
      }
    }
    loadPublicSettings();
  }, []);

  // 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 20 });
  const sy = useSpring(my, { stiffness: 100, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
      {/* LEFT: Wordmark + intro + socials */}
      <div className="text-center lg:text-right order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
          style={{
            background: "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.05))",
            borderColor: "rgba(34,197,94,0.3)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-green-300 text-xs font-bold tracking-wider">{about.statusBadge}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-3 flex justify-center lg:justify-end"
        >
          <span className="text-white/85 text-2xl md:text-3xl font-bold">مرحباً، أنا</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 flex justify-center lg:justify-end"
        >
          <HolographicWordmark text="{ Abud }" fontSize="clamp(2.5rem, 7vw, 5rem)" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base md:text-lg leading-relaxed mb-6 max-w-xl mx-auto lg:mr-0 lg:ml-auto"
          style={{ color: "#a0a0c0" }}
        >
          {about.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.43 }}
          className="mb-6"
        >
          <p className="text-xs mb-2.5 font-semibold" style={{ color: "#d8d8ef" }}>
            أقدر أساعدك لو هدفك:
          </p>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
            {CLIENT_FIT.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold"
                style={{
                  color: "#d7f7ff",
                  background: "rgba(103,232,249,0.1)",
                  border: "1px solid rgba(103,232,249,0.28)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="grid sm:grid-cols-3 gap-2 mb-7 max-w-2xl mx-auto lg:mr-0 lg:ml-auto"
        >
          {DELIVERY_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl px-3 py-2 text-center"
              style={{
                background: "rgba(192,132,252,0.08)",
                border: "1px solid rgba(192,132,252,0.2)",
              }}
            >
              <div className="text-[11px] font-bold" style={{ color: "#f4f4ff" }}>
                {pillar.title}
              </div>
              <div className="text-[10px] mt-0.5" style={{ color: "#a0a0c0" }}>
                {pillar.detail}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 mb-7 justify-center lg:justify-end items-center"
        >
          <span className="inline-flex items-center gap-2 text-sm" style={{ color: "#9090b0" }}>
            <MapPin className="w-4 h-4 text-purple-400" />
            <span>{about.location}</span>
          </span>
          <span className="inline-flex items-center gap-2 text-sm" style={{ color: "#9090b0" }}>
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>{about.experience}</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.56 }}
          className="grid grid-cols-3 gap-2 mb-7 max-w-md mx-auto lg:mr-0 lg:ml-auto"
        >
          <div
            className="rounded-lg px-2.5 py-2 text-center"
            style={{ background: "rgba(192,132,252,0.1)", border: "1px solid rgba(192,132,252,0.25)" }}
          >
            <div className="text-sm font-black" style={{ color: "#f7f3ff" }}>
              {projectsMetric.value}+
            </div>
            <div className="text-[10px]" style={{ color: "#b4a8cc" }}>
              مشروع منفّذ
            </div>
          </div>
          <div
            className="rounded-lg px-2.5 py-2 text-center"
            style={{ background: "rgba(103,232,249,0.1)", border: "1px solid rgba(103,232,249,0.25)" }}
          >
            <div className="text-sm font-black" style={{ color: "#effcff" }}>
              {clientsMetric.value}+
            </div>
            <div className="text-[10px]" style={{ color: "#9cb7c0" }}>
              تجربة عميل
            </div>
          </div>
          <div
            className="rounded-lg px-2.5 py-2 text-center"
            style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)" }}
          >
            <div className="text-sm font-black" style={{ color: "#fff9e7" }}>
              {yearsMetric.value}+
            </div>
            <div className="text-[10px]" style={{ color: "#c6bca0" }}>
              سنوات عملية
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-end"
        >
          <a href="/quote" className="btn-primary btn-glow inline-flex gap-2 items-center">
            <span>ابدأ بتكلفة مبدئية واضحة</span>
          </a>
          <a href="/contact" className="btn-outline inline-flex gap-2 items-center">
            <span>احجز مكالمة تشخيص</span>
          </a>
        </motion.div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.68 }}
          href={about.cvUrl}
          download
          className="inline-flex items-center gap-2 text-xs font-semibold mb-8"
          style={{ color: "#c9b4f9" }}
        >
          <Download className="w-3.5 h-3.5" />
          تحميل السيرة الذاتية
        </motion.a>

        {/* Social row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-2 justify-center lg:justify-end"
        >
          {socials.filter((s) => s.href).map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.06 }}
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all group relative"
                style={{
                  background: "rgba(10,8,18,0.7)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${s.accent}33`,
                  boxShadow: `0 0 12px ${s.accent}15`,
                }}
              >
                <Icon className="w-5 h-5 transition-colors" style={{ color: s.accent }} />
                <span
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ color: s.accent }}
                >
                  {s.label}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* RIGHT: 3D Avatar card */}
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        initial={{ opacity: 0, scale: 0.85, rotateY: -20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="relative mx-auto order-1 lg:order-2 w-full max-w-sm"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative rounded-3xl p-8 will-change-transform"
        >
          {/* Card body */}
          <div
            className="relative rounded-3xl p-8 overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(20,15,35,0.95) 0%, rgba(15,10,28,0.9) 100%)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(168,85,247,0.35)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04), 0 30px 60px -20px rgba(0,0,0,0.8), 0 0 60px rgba(147,51,234,0.18)",
            }}
          >
            {/* Animated holographic top bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #c084fc 50%, transparent 100%)",
              }}
            />

            {/* Background glow orbs */}
            <motion.div
              className="absolute -top-16 -right-16 w-44 h-44 rounded-full pointer-events-none"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{
                background: "radial-gradient(circle, rgba(192,132,252,0.4) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <motion.div
              className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full pointer-events-none"
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 7, repeat: Infinity, delay: 1 }}
              style={{
                background: "radial-gradient(circle, rgba(103,232,249,0.35) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Avatar */}
            <div className="relative flex flex-col items-center text-center" style={{ transform: "translateZ(50px)" }}>
              <div className="relative mb-5">
                {/* Pulsing ring */}
                <motion.div
                  animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #c084fc, #67e8f9, #a78bfa, #f0abfc, #c084fc)",
                    filter: "blur(8px)",
                  }}
                />
                {/* Rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0%, #c084fc 25%, transparent 50%, #67e8f9 75%, transparent 100%)",
                    padding: "2px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <div
                  className="relative w-40 h-40 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(192,132,252,0.25) 0%, rgba(103,232,249,0.15) 100%)",
                    border: "2px solid rgba(192,132,252,0.6)",
                    boxShadow: "inset 0 0 30px rgba(147,51,234,0.3), 0 0 24px rgba(192,132,252,0.4)",
                  }}
                >
                  {!imgError ? (
                    <>
                      <Image
                        src={profileImage}
                        alt="Abud"
                        fill
                        sizes="160px"
                        priority
                        unoptimized
                        onError={() => setImgError(true)}
                        className="object-cover"
                        style={{
                          objectPosition: profileImagePosition,
                          transform: "scale(1.05) translateX(-3px)",
                        }}
                      />
                      {/* Subtle holographic overlay tint */}
                      <div
                        className="absolute inset-0 pointer-events-none mix-blend-overlay"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(192,132,252,0.15) 0%, transparent 40%, rgba(103,232,249,0.12) 100%)",
                        }}
                      />
                      {/* Inner ring vignette */}
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          boxShadow:
                            "inset 0 0 24px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)",
                        }}
                      />
                    </>
                  ) : (
                    <span
                      className="font-black text-5xl"
                      style={{
                        background: "linear-gradient(135deg, #f0abfc, #c084fc, #67e8f9)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      AB
                    </span>
                  )}
                </div>
                {/* Status dot */}
                <span
                  className="absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-[#0a0814]"
                  style={{
                    background: "#34d399",
                    boxShadow: "0 0 12px #34d399",
                  }}
                />
              </div>

              <h3 className="text-white font-black text-xl mb-1" style={{ letterSpacing: "-0.02em" }}>
                {about.name}
              </h3>
              <p className="text-purple-300 text-xs font-semibold mb-4" style={{ letterSpacing: "0.05em" }}>
                {about.role}
              </p>

              {/* Inline stats */}
              <div className="grid grid-cols-3 gap-3 w-full pt-4" style={{ borderTop: "1px solid rgba(168,85,247,0.2)" }}>
                <div>
                  <div className="text-white font-black text-base">{projectsMetric.value}+</div>
                  <div className="text-[10px]" style={{ color: "#9090b0" }}>مشروع</div>
                </div>
                <div style={{ borderInline: "1px solid rgba(168,85,247,0.15)" }}>
                  <div className="text-white font-black text-base">{yearsMetric.value}+</div>
                  <div className="text-[10px]" style={{ color: "#9090b0" }}>سنوات</div>
                </div>
                <div>
                  <div className="text-white font-black text-base">{clientsMetric.value}+</div>
                  <div className="text-[10px]" style={{ color: "#9090b0" }}>عميل</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
