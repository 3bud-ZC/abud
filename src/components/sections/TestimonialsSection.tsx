"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import HolographicCard from "@/components/effects/HolographicCard";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
  initials: string;
  accent: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "عابد بنالنا بوت تيليجرام كامل لإدارة طلبات العملاء — وفرعلينا 6 ساعات شغل يومي. شغل احترافي ومدروس في كل التفاصيل.",
    name: "أحمد سامي",
    role: "صاحب متجر إلكتروني",
    rating: 5,
    initials: "أس",
    accent: "#c084fc",
  },
  {
    quote: "أداة AI اللي بناها لينا حسّنت إنتاجية الفريق بشكل ملحوظ. التواصل ممتاز والتنفيذ في الوقت المحدد بالظبط.",
    name: "Sarah Mostafa",
    role: "Marketing Lead",
    rating: 5,
    initials: "SM",
    accent: "#67e8f9",
  },
  {
    quote: "موقع شغّال زي الساعة، تصميم نظيف وأداء قوي. ده تالت مشروع ليه معاه وكل مرة بيكون في الـ top.",
    name: "محمد علي",
    role: "Founder, Stack Studio",
    rating: 5,
    initials: "مع",
    accent: "#a78bfa",
  },
  {
    quote: "خدمة الأتمتة بتاعته خلت كل الـ workflows عندنا تشتغل لوحدها. وفرت علينا فلوس كتير وموظفين كتير.",
    name: "Karim Hassan",
    role: "CTO, FinFlow",
    rating: 5,
    initials: "KH",
    accent: "#f0abfc",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotate every 6s
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  function next() { setActive((a) => (a + 1) % TESTIMONIALS.length); }
  function prev() { setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); }

  const t = TESTIMONIALS[active];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <FloatingOrbs count={5} />
      <ScanLine duration={13} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(147,51,234,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="section-badge mb-5 mx-auto">
            <Star className="w-2.5 h-2.5" />
            آراء العملاء
          </span>
          <h2 className="section-title mt-4 mb-3">ماذا يقول من عملوا معي</h2>
          <p className="section-subtitle text-center max-w-xl mx-auto">
            شهادات حقيقية من عملاء ساعدتهم في بناء حضورهم الرقمي
          </p>
        </AnimatedSection>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <HolographicCard duration={6}>
            <div className="p-8 md:p-12 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <Quote
                      className="w-10 h-10 flex-shrink-0"
                      style={{ color: t.accent, opacity: 0.6, filter: `drop-shadow(0 0 12px ${t.accent}55)` }}
                    />
                    <div className="flex gap-0.5 ml-auto">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#fbbf24" }} />
                      ))}
                    </div>
                  </div>

                  <p
                    className="text-white text-lg md:text-xl leading-relaxed mb-8 font-medium"
                    style={{ letterSpacing: "-0.005em" }}
                  >
                    {t.quote}
                  </p>

                  <div className="flex items-center gap-4 pt-5" style={{ borderTop: "1px solid rgba(168,85,247,0.18)" }}>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${t.accent}40, ${t.accent}10)`,
                        border: `1px solid ${t.accent}55`,
                        boxShadow: `0 0 16px ${t.accent}30, inset 0 0 12px ${t.accent}15`,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {t.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold text-base truncate" style={{ letterSpacing: "-0.01em" }}>
                        {t.name}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: `${t.accent}cc` }}>
                        {t.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </HolographicCard>

          {/* Nav buttons */}
          <button
            onClick={prev}
            aria-label="السابق"
            className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(10,8,18,0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(168,85,247,0.4)",
              boxShadow: "0 0 16px rgba(147,51,234,0.25)",
            }}
          >
            <ChevronRight className="w-5 h-5 text-purple-200" />
          </button>
          <button
            onClick={next}
            aria-label="التالي"
            className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(10,8,18,0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(168,85,247,0.4)",
              boxShadow: "0 0 16px rgba(147,51,234,0.25)",
            }}
          >
            <ChevronLeft className="w-5 h-5 text-purple-200" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`الانتقال إلى الشهادة ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 28 : 8,
                background: i === active ? "#c084fc" : "rgba(168,85,247,0.3)",
                boxShadow: i === active ? "0 0 8px rgba(192,132,252,0.6)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
