"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Github, Linkedin, Twitter, Send, Mail, Download, MapPin, Zap } from "lucide-react";
import HolographicWordmark from "@/components/effects/HolographicWordmark";

const SOCIALS = [
  { icon: Github,   label: "GitHub",   href: "https://github.com/3bud-ZC",      accent: "#c084fc" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/abud",     accent: "#67e8f9" },
  { icon: Twitter,  label: "X",        href: "https://x.com/abud",               accent: "#a78bfa" },
  { icon: Send,     label: "Telegram", href: "https://t.me/abud",                accent: "#34d399" },
  { icon: Mail,     label: "Email",    href: "mailto:hello@abud.fun",            accent: "#f0abfc" },
];

export default function ProfileHero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

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
          <span className="text-green-300 text-xs font-bold tracking-wider">متاح للمشاريع الجديدة</span>
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
          مطور <span className="text-purple-300 font-bold">Full-Stack</span> وصانع{" "}
          <span className="text-cyan-300 font-bold">أدوات الذكاء الاصطناعي</span> ─ أبني الحلول التقنية
          المتكاملة بعقلية سيبرانية وشغف حقيقي بالتقنية.
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 mb-7 justify-center lg:justify-end items-center"
        >
          <span className="inline-flex items-center gap-2 text-sm" style={{ color: "#9090b0" }}>
            <MapPin className="w-4 h-4 text-purple-400" />
            <span>القاهرة، مصر • UTC+3</span>
          </span>
          <span className="inline-flex items-center gap-2 text-sm" style={{ color: "#9090b0" }}>
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>5+ سنوات خبرة</span>
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-end"
        >
          <a href="/contact" className="btn-primary btn-glow inline-flex gap-2 items-center">
            <span>تواصل معي</span>
          </a>
          <a
            href="/cv-abud.pdf"
            download
            className="btn-outline inline-flex gap-2 items-center"
          >
            <Download className="w-4 h-4" />
            <span>تحميل CV</span>
          </a>
        </motion.div>

        {/* Social row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-2 justify-center lg:justify-end"
        >
          {SOCIALS.map((s, i) => {
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
                  className="relative w-36 h-36 rounded-full flex items-center justify-center overflow-hidden"
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
                        src="/avatar.jpeg"
                        alt="Abud"
                        fill
                        sizes="144px"
                        priority
                        unoptimized
                        onError={() => setImgError(true)}
                        className="object-cover"
                        style={{ objectPosition: "center 22%" }}
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
                Abud
              </h3>
              <p className="text-purple-300 text-xs font-semibold mb-4" style={{ letterSpacing: "0.05em" }}>
                Full-Stack Developer • AI Engineer
              </p>

              {/* Inline stats */}
              <div className="grid grid-cols-3 gap-3 w-full pt-4" style={{ borderTop: "1px solid rgba(168,85,247,0.2)" }}>
                <div>
                  <div className="text-white font-black text-base">+50</div>
                  <div className="text-[10px]" style={{ color: "#9090b0" }}>مشروع</div>
                </div>
                <div style={{ borderInline: "1px solid rgba(168,85,247,0.15)" }}>
                  <div className="text-white font-black text-base">5+</div>
                  <div className="text-[10px]" style={{ color: "#9090b0" }}>سنوات</div>
                </div>
                <div>
                  <div className="text-white font-black text-base">+30</div>
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
