"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator, Globe, BrainCircuit, Bot, Shield, Layers,
  Zap, Clock, Plus, Check, MessageSquare, Sparkles, ArrowLeft, Code2,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import HolographicCard from "@/components/effects/HolographicCard";

/* ── Project types ── */
const PROJECT_TYPES = [
  { id: "landing", label: "صفحة هبوط", icon: Globe, base: 1500, days: 3, desc: "صفحة واحدة احترافية للتسويق" },
  { id: "website", label: "موقع كامل", icon: Globe, base: 4500, days: 10, desc: "موقع متعدد الصفحات + SEO" },
  { id: "webapp", label: "ويب آب", icon: Code2, base: 9000, days: 21, desc: "تطبيق ويب كامل + قاعدة بيانات" },
  { id: "ai-tool", label: "أداة AI", icon: BrainCircuit, base: 6500, days: 14, desc: "أداة مدعومة بـ AI + API" },
  { id: "telegram-bot", label: "بوت تيليجرام", icon: Bot, base: 2500, days: 5, desc: "بوت تفاعلي + Database" },
  { id: "automation", label: "أتمتة سير العمل", icon: Layers, base: 3500, days: 7, desc: "n8n / Make.com workflows" },
  { id: "cybersec", label: "أمن سيبراني", icon: Shield, base: 2000, days: 4, desc: "اختبار اختراق + تقرير" },
];

/* ── Add-ons (multipliers + flat) ── */
const ADDONS = [
  { id: "design", label: "تصميم UI/UX مخصص", icon: Sparkles, type: "mult", value: 0.35, desc: "تصميم بصري احترافي + Figma" },
  { id: "auth", label: "نظام مستخدمين / Auth", icon: Shield, type: "flat", value: 1200, desc: "تسجيل + Login + JWT" },
  { id: "payments", label: "بوابات دفع", icon: Zap, type: "flat", value: 1500, desc: "Stripe / PayPal / VF Cash" },
  { id: "dashboard", label: "لوحة تحكم Admin", icon: Layers, type: "flat", value: 2000, desc: "إدارة محتوى + إحصائيات" },
  { id: "ai-int", label: "تكامل AI متقدم", icon: BrainCircuit, type: "flat", value: 1800, desc: "GPT-4 / Claude / Gemini" },
  { id: "api", label: "REST API كامل", icon: Code2, type: "flat", value: 1500, desc: "API موثقة + Rate limit" },
  { id: "rtl-ar", label: "دعم RTL عربي + EN", icon: Globe, type: "mult", value: 0.15, desc: "موقع ثنائي اللغة كامل" },
  { id: "seo", label: "SEO تقني متقدم", icon: Sparkles, type: "flat", value: 800, desc: "Schema + Sitemap + AMP" },
];

/* ── Timeline modes ── */
const TIMELINES = [
  { id: "rush", label: "عاجل", icon: Zap, mult: 1.4, daysMult: 0.6, desc: "أسرع وقت ممكن" },
  { id: "normal", label: "عادي", icon: Clock, mult: 1.0, daysMult: 1.0, desc: "الوضع الطبيعي" },
  { id: "flex", label: "مرن", icon: Layers, mult: 0.85, daysMult: 1.3, desc: "خصم على الميزانية مقابل وقت أطول" },
];

export default function QuotePage() {
  const [projectType, setProjectType] = useState<string | null>(null);
  const [pages, setPages] = useState(5);
  const [addons, setAddons] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("normal");

  const toggleAddon = (id: string) => {
    setAddons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const calc = useMemo(() => {
    const project = PROJECT_TYPES.find((p) => p.id === projectType);
    if (!project) return { total: 0, days: 0, breakdown: [] as { label: string; value: number }[] };

    let total = project.base;
    const breakdown: { label: string; value: number }[] = [{ label: project.label + " (base)", value: project.base }];

    // Pages multiplier (only for website/webapp/landing)
    if (["website", "webapp"].includes(project.id) && pages > 5) {
      const extra = (pages - 5) * 250;
      total += extra;
      breakdown.push({ label: `صفحات إضافية (${pages - 5})`, value: extra });
    }

    // Add-ons
    let multiplierAcc = 0;
    addons.forEach((id) => {
      const a = ADDONS.find((x) => x.id === id);
      if (!a) return;
      if (a.type === "flat") {
        total += a.value;
        breakdown.push({ label: a.label, value: a.value });
      } else {
        multiplierAcc += a.value;
        breakdown.push({ label: `${a.label} (+${Math.round(a.value * 100)}%)`, value: Math.round(project.base * a.value) });
      }
    });
    if (multiplierAcc > 0) total = Math.round(total * (1 + multiplierAcc * 0.25)); // soften compound

    // Timeline multiplier
    const tl = TIMELINES.find((t) => t.id === timeline) ?? TIMELINES[1];
    const beforeTl = total;
    total = Math.round(total * tl.mult);
    if (tl.mult !== 1) {
      breakdown.push({
        label: `${tl.label} (${tl.mult > 1 ? "+" : ""}${Math.round((tl.mult - 1) * 100)}%)`,
        value: total - beforeTl,
      });
    }

    const days = Math.max(2, Math.round(project.days * tl.daysMult * (1 + addons.length * 0.08)));

    return { total, days, breakdown };
  }, [projectType, pages, addons, timeline]);

  const buildContactPrefill = () => {
    const project = PROJECT_TYPES.find((p) => p.id === projectType);
    if (!project) return "/contact";
    const tl = TIMELINES.find((t) => t.id === timeline) ?? TIMELINES[1];
    const addonLabels = addons.map((id) => ADDONS.find((a) => a.id === id)?.label).filter(Boolean).join("، ");
    const msg = encodeURIComponent(
      `أهلاً، عندي مشروع وحبيت أرسل التفاصيل بناءً على الحاسبة:\n\n` +
      `• نوع المشروع: ${project.label}\n` +
      (project.id === "website" || project.id === "webapp" ? `• عدد الصفحات: ${pages}\n` : "") +
      (addonLabels ? `• إضافات: ${addonLabels}\n` : "") +
      `• الجدول الزمني: ${tl.label}\n` +
      `• الميزانية التقديرية: ~$${calc.total.toLocaleString()}\n` +
      `• المدة المتوقعة: ${calc.days} يوم\n\n` +
      `حابب نتفق على التفاصيل النهائية.`
    );
    return `/contact?subject=${encodeURIComponent("عرض سعر مشروع")}&message=${msg}`;
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <FloatingOrbs count={6} />
        <ScanLine duration={10} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-badge mb-6">
              <Calculator className="w-2.5 h-2.5" />
              حاسبة الأسعار
            </span>
            <h1
              className="font-black text-white mt-5 mb-4"
              style={{ fontSize: "clamp(2.2rem,6vw,3.8rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              احسب سعر مشروعك في دقيقة
            </h1>
            <p className="text-[#a0a0c0] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              تقدير فوري لميزانية المشروع والمدة المتوقعة — اختر التفاصيل وشوف السعر مباشرة.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4 pb-24 relative overflow-hidden">
        <FloatingOrbs count={5} />
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Project type */}
            <HolographicCard duration={6}>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black" style={{ background: "rgba(168,85,247,0.25)", border: "1px solid rgba(168,85,247,0.5)", color: "#e9d5ff" }}>1</span>
                  <h2 className="text-white font-bold">نوع المشروع</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {PROJECT_TYPES.map(({ id, label, icon: Icon, desc }) => {
                    const active = projectType === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setProjectType(id)}
                        className="text-right p-3.5 rounded-xl transition-all duration-200 flex items-start gap-3"
                        style={{
                          background: active ? "rgba(147,51,234,0.18)" : "rgba(15,12,24,0.8)",
                          border: active ? "1px solid rgba(168,85,247,0.6)" : "1px solid rgba(40,30,60,0.7)",
                          boxShadow: active ? "0 0 18px rgba(147,51,234,0.3)" : "none",
                        }}
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: active ? "rgba(168,85,247,0.3)" : "rgba(30,25,45,0.8)", border: active ? "1px solid rgba(192,132,252,0.6)" : "1px solid rgba(60,50,80,0.6)" }}>
                          <Icon className="w-4 h-4" style={{ color: active ? "#e9d5ff" : "#a0a0c0" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-semibold text-sm mb-0.5">{label}</div>
                          <div className="text-[10px] leading-snug" style={{ color: "#9090b0" }}>{desc}</div>
                        </div>
                        {active && <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#c084fc" }} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </HolographicCard>

            {/* Step 2: Pages (only for website/webapp) */}
            <AnimatePresence>
              {projectType && ["website", "webapp"].includes(projectType) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HolographicCard duration={6}>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black" style={{ background: "rgba(168,85,247,0.25)", border: "1px solid rgba(168,85,247,0.5)", color: "#e9d5ff" }}>2</span>
                          <h2 className="text-white font-bold">عدد الصفحات</h2>
                        </div>
                        <span className="text-2xl font-black" style={{ color: "#c084fc" }}>{pages}</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={30}
                        value={pages}
                        onChange={(e) => setPages(Number(e.target.value))}
                        className="w-full accent-purple-500 cursor-pointer"
                        style={{ accentColor: "#a855f7" }}
                      />
                      <div className="flex justify-between text-[10px] mt-2" style={{ color: "#7070a0" }}>
                        <span>1 صفحة</span>
                        <span>5 (افتراضي)</span>
                        <span>30 صفحة</span>
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Add-ons */}
            <AnimatePresence>
              {projectType && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HolographicCard duration={6}>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-5">
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black" style={{ background: "rgba(168,85,247,0.25)", border: "1px solid rgba(168,85,247,0.5)", color: "#e9d5ff" }}>3</span>
                        <h2 className="text-white font-bold">الإضافات</h2>
                        <span className="text-xs ml-auto" style={{ color: "#9090b0" }}>اختيارية</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {ADDONS.map(({ id, label, icon: Icon, type, value, desc }) => {
                          const active = addons.includes(id);
                          return (
                            <button
                              key={id}
                              onClick={() => toggleAddon(id)}
                              className="text-right p-3 rounded-xl transition-all duration-200 flex items-center gap-3"
                              style={{
                                background: active ? "rgba(34,211,238,0.12)" : "rgba(15,12,24,0.8)",
                                border: active ? "1px solid rgba(34,211,238,0.5)" : "1px solid rgba(40,30,60,0.7)",
                                boxShadow: active ? "0 0 14px rgba(34,211,238,0.25)" : "none",
                              }}
                            >
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: active ? "rgba(34,211,238,0.22)" : "rgba(30,25,45,0.8)", border: active ? "1px solid rgba(34,211,238,0.5)" : "1px solid rgba(60,50,80,0.6)" }}>
                                {active ? <Check className="w-3.5 h-3.5" style={{ color: "#67e8f9" }} /> : <Icon className="w-3.5 h-3.5" style={{ color: "#a0a0c0" }} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white font-semibold text-xs mb-0.5">{label}</div>
                                <div className="text-[10px] truncate" style={{ color: "#9090b0" }}>{desc}</div>
                              </div>
                              <span className="text-[10px] font-mono flex-shrink-0" style={{ color: active ? "#67e8f9" : "#7070a0" }}>
                                {type === "flat" ? `+$${value}` : `+${Math.round(value * 100)}%`}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Timeline */}
            <AnimatePresence>
              {projectType && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  <HolographicCard duration={6}>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-5">
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black" style={{ background: "rgba(168,85,247,0.25)", border: "1px solid rgba(168,85,247,0.5)", color: "#e9d5ff" }}>4</span>
                        <h2 className="text-white font-bold">الجدول الزمني</h2>
                      </div>
                      <div className="grid grid-cols-3 gap-2.5">
                        {TIMELINES.map(({ id, label, icon: Icon, desc, mult }) => {
                          const active = timeline === id;
                          return (
                            <button
                              key={id}
                              onClick={() => setTimeline(id)}
                              className="p-3 rounded-xl transition-all duration-200 flex flex-col items-center gap-1.5 text-center"
                              style={{
                                background: active ? "rgba(251,191,36,0.12)" : "rgba(15,12,24,0.8)",
                                border: active ? "1px solid rgba(251,191,36,0.5)" : "1px solid rgba(40,30,60,0.7)",
                                boxShadow: active ? "0 0 14px rgba(251,191,36,0.25)" : "none",
                              }}
                            >
                              <Icon className="w-5 h-5" style={{ color: active ? "#fbbf24" : "#a0a0c0" }} />
                              <span className="text-white font-semibold text-xs">{label}</span>
                              <span className="text-[10px]" style={{ color: "#9090b0" }}>{desc}</span>
                              <span className="text-[10px] font-mono" style={{ color: active ? "#fbbf24" : "#7070a0" }}>
                                {mult === 1 ? "ثابت" : mult > 1 ? `+${Math.round((mult - 1) * 100)}%` : `${Math.round((mult - 1) * 100)}%`}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Sticky Result */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <HolographicCard duration={5}>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <motion.div
                      animate={{ boxShadow: ["0 0 12px rgba(147,51,234,0.4)", "0 0 24px rgba(168,85,247,0.7)", "0 0 12px rgba(147,51,234,0.4)"] }}
                      transition={{ duration: 2.6, repeat: Infinity }}
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(147,51,234,0.22)", border: "1px solid rgba(168,85,247,0.5)" }}
                    >
                      <Calculator className="w-4 h-4 text-purple-200" />
                    </motion.div>
                    <h2 className="text-white font-bold">الميزانية التقديرية</h2>
                  </div>

                  {!projectType ? (
                    <div className="text-center py-10">
                      <Sparkles className="w-10 h-10 text-purple-600/40 mx-auto mb-3" />
                      <p className="text-sm" style={{ color: "#9090b0" }}>اختر نوع المشروع من اليمين لعرض السعر</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-center py-4 mb-4 rounded-xl" style={{ background: "rgba(147,51,234,0.08)", border: "1px solid rgba(168,85,247,0.25)" }}>
                        <div className="text-[10px] mb-1" style={{ color: "#9090b0" }}>التكلفة المتوقعة</div>
                        <motion.div
                          key={calc.total}
                          initial={{ scale: 0.92, opacity: 0.7 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="text-4xl font-black"
                          style={{ color: "#e9d5ff", letterSpacing: "-0.03em" }}
                        >
                          ${calc.total.toLocaleString()}
                        </motion.div>
                        <div className="text-[10px] mt-1" style={{ color: "#a78bfa" }}>USD • تقدير مبدئي</div>
                      </div>

                      <div className="flex items-center justify-center gap-2 mb-4 text-xs" style={{ color: "#a0a0c0" }}>
                        <Clock className="w-3.5 h-3.5" style={{ color: "#fbbf24" }} />
                        <span>المدة المتوقعة:</span>
                        <span className="font-bold" style={{ color: "#fbbf24" }}>{calc.days} يوم</span>
                      </div>

                      {/* Breakdown */}
                      <div className="space-y-1.5 mb-5 pb-5" style={{ borderBottom: "1px solid rgba(168,85,247,0.18)" }}>
                        {calc.breakdown.map((b, i) => (
                          <div key={i} className="flex items-center justify-between text-[11px]">
                            <span className="truncate ml-2" style={{ color: "#9090b0" }}>{b.label}</span>
                            <span className="font-mono flex-shrink-0" style={{ color: b.value < 0 ? "#34d399" : "#d0d0e8" }}>
                              {b.value < 0 ? "−" : "+"}${Math.abs(b.value).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={buildContactPrefill()}
                        className="btn-primary btn-glow w-full justify-center gap-2 text-sm"
                      >
                        <MessageSquare className="w-4 h-4" />
                        تابع وأرسل الطلب
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </Link>

                      <p className="text-[10px] mt-3 text-center" style={{ color: "#7070a0" }}>
                        ⚡ السعر النهائي قد يختلف بعد مراجعة التفاصيل الكاملة
                      </p>
                    </>
                  )}
                </div>
              </HolographicCard>

              {/* Trust badges */}
              {projectType && (
                <div className="mt-4 p-4 rounded-2xl" style={{ background: "rgba(10,8,18,0.6)", border: "1px solid rgba(40,30,60,0.6)" }}>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { icon: "✓", label: "ضمان الجودة" },
                      { icon: "⚡", label: "تسليم سريع" },
                      { icon: "💎", label: "أسعار شفافة" },
                    ].map((b) => (
                      <div key={b.label} className="flex flex-col items-center gap-1">
                        <span className="text-base">{b.icon}</span>
                        <span className="text-[10px]" style={{ color: "#9090b0" }}>{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ-ish bottom */}
      <section className="px-4 pb-20 relative overflow-hidden">
        <FloatingOrbs count={4} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <HolographicCard duration={6}>
            <div className="p-8 md:p-10 text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-3" style={{ color: "#c084fc", filter: "drop-shadow(0 0 12px rgba(168,85,247,0.7))" }} />
              <h3 className="text-white font-bold text-lg mb-2">عاوز سعر دقيق ومخصص؟</h3>
              <p className="text-sm mb-5" style={{ color: "#a0a0c0", lineHeight: 1.7 }}>
                الحاسبة تدّيك تقدير مبدئي. لو محتاج عرض سعر تفصيلي بناءً على متطلبات دقيقة، تواصل مباشرة وسأرد خلال 24 ساعة.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/contact" className="btn-primary btn-glow inline-flex gap-2">
                  <MessageSquare className="w-4 h-4" />
                  تواصل مباشر
                </Link>
                <Link href="/services" className="btn-outline inline-flex gap-2">
                  <Plus className="w-4 h-4" />
                  استعرض الخدمات
                </Link>
              </div>
            </div>
          </HolographicCard>
        </div>
      </section>
    </div>
  );
}
