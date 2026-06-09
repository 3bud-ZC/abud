"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator, Globe, BrainCircuit, Shield, Layers,
  Zap, Clock, Plus, Check, MessageSquare, Sparkles, ArrowLeft, Code2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import HolographicCard from "@/components/effects/HolographicCard";
import { PRIMARY_SERVICES } from "@/data/services";
import { getThemedIconPreset, resolveServiceIconKey } from "@/lib/themed-icons";

interface QuoteService {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDesc?: string | null;
  useCase?: string | null;
  icon?: string | null;
  price?: number | null;
}

interface ProjectTypeOption {
  id: string;
  slug: string;
  label: string;
  description: string;
  iconKey: string;
  basePrice: number;
  baseDays: number;
  supportsPages: boolean;
  extraPagePrice: number;
}

interface AddonOption {
  id: string;
  label: string;
  icon: LucideIcon;
  type: "mult" | "flat";
  value: number;
  desc: string;
}

interface TimelineOption {
  id: string;
  label: string;
  icon: LucideIcon;
  mult: number;
  daysMult: number;
  desc: string;
}

interface PriceBreakdownLine {
  label: string;
  value: number;
}

const FALLBACK_SERVICES: QuoteService[] = PRIMARY_SERVICES.map((service) => ({
  id: `seed-${service.slug}`,
  title: service.title,
  slug: service.slug,
  description: service.description,
  longDesc: `${service.longDesc}\n\nمدة التسليم: ${service.deliveryTime}`,
  useCase: service.category,
  icon: service.icon,
  price: service.price,
}));

const FALLBACK_PRICE_BY_SLUG = PRIMARY_SERVICES.reduce<Record<string, number>>((acc, service) => {
  acc[service.slug] = service.price;
  return acc;
}, {});

const PAGE_BASED_SERVICE_SLUGS = new Set(["web-development", "ecommerce-digital-platforms"]);

const DEFAULT_DAYS_BY_SLUG: Record<string, number> = {
  "web-development": 10,
  "erp-crm-systems": 24,
  "telegram-bots-mini-apps": 7,
  "ai-automation-tools": 12,
  "vps-deployment-maintenance": 3,
  "ecommerce-digital-platforms": 14,
};

/* ── Add-ons (multipliers + flat) ── */
const ADDONS: AddonOption[] = [
  { id: "design", label: "تصميم UI/UX مخصص", icon: Sparkles, type: "mult", value: 0.2, desc: "تصميم بصري احترافي + Figma" },
  { id: "auth", label: "نظام مستخدمين / Auth", icon: Shield, type: "flat", value: 3000, desc: "تسجيل + Login + إدارة صلاحيات" },
  { id: "payments", label: "بوابات دفع", icon: Zap, type: "flat", value: 3500, desc: "بطاقات/محافظ إلكترونية + تكامل كامل" },
  { id: "dashboard", label: "لوحة تحكم Admin", icon: Layers, type: "flat", value: 4500, desc: "إدارة محتوى + تقارير + صلاحيات" },
  { id: "ai-int", label: "تكامل AI متقدم", icon: BrainCircuit, type: "flat", value: 3000, desc: "تكامل GPT/Claude/Gemini حسب المطلوب" },
  { id: "api", label: "REST API كامل", icon: Code2, type: "flat", value: 2500, desc: "API موثقة + حماية + Rate limit" },
  { id: "rtl-ar", label: "دعم RTL عربي + EN", icon: Globe, type: "mult", value: 0.1, desc: "نسخة عربية/إنجليزية كاملة" },
  { id: "seo", label: "SEO تقني متقدم", icon: Sparkles, type: "flat", value: 1500, desc: "Schema + Sitemap + Technical SEO" },
];

/* ── Timeline modes ── */
const TIMELINES: TimelineOption[] = [
  { id: "rush", label: "عاجل", icon: Zap, mult: 1.25, daysMult: 0.75, desc: "أولوية تنفيذ وتسليم أسرع" },
  { id: "normal", label: "عادي", icon: Clock, mult: 1.0, daysMult: 1.0, desc: "الوضع الطبيعي" },
  { id: "flex", label: "مرن", icon: Layers, mult: 0.9, daysMult: 1.25, desc: "خصم بسيط مقابل وقت أطول" },
];

const EGP_FORMATTER = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

function formatEgp(amount: number): string {
  return `${EGP_FORMATTER.format(Math.max(0, Math.round(amount)))} ج.م`;
}

function parseDeliveryDays(longDesc: string | null | undefined, fallbackDays: number): number {
  if (!longDesc) return fallbackDays;

  const rangeMatch = longDesc.match(/مدة التسليم\s*[:：]\s*(\d+)\s*[–-]\s*(\d+)\s*(?:يوم|أيام)/);
  if (rangeMatch) {
    const minDays = Number(rangeMatch[1]);
    const maxDays = Number(rangeMatch[2]);
    if (Number.isFinite(minDays) && Number.isFinite(maxDays)) {
      return Math.max(2, Math.round((minDays + maxDays) / 2));
    }
  }

  const singleMatch = longDesc.match(/مدة التسليم\s*[:：]\s*(\d+)\s*(?:يوم|أيام)/);
  if (singleMatch) {
    const days = Number(singleMatch[1]);
    if (Number.isFinite(days)) return Math.max(2, days);
  }

  return fallbackDays;
}

function getStartingPrice(slug: string, price?: number | null): number {
  if (typeof price === "number" && Number.isFinite(price) && price > 0) return Math.round(price);
  return FALLBACK_PRICE_BY_SLUG[slug] || 3000;
}

export default function QuotePage() {
  const [services, setServices] = useState<QuoteService[]>(FALLBACK_SERVICES);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [pages, setPages] = useState(5);
  const [addons, setAddons] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("normal");

  useEffect(() => {
    let cancelled = false;

    async function loadServices() {
      setServicesLoading(true);
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        const data = await res.json();
        const apiServices = Array.isArray(data?.services) ? (data.services as QuoteService[]) : [];

        if (!cancelled) {
          setServices(apiServices.length > 0 ? apiServices : FALLBACK_SERVICES);
        }
      } catch {
        if (!cancelled) {
          setServices(FALLBACK_SERVICES);
        }
      } finally {
        if (!cancelled) {
          setServicesLoading(false);
        }
      }
    }

    void loadServices();

    return () => {
      cancelled = true;
    };
  }, []);

  const projectTypes = useMemo<ProjectTypeOption[]>(() => {
    return services.map((service) => {
      const basePrice = getStartingPrice(service.slug, service.price);
      const fallbackDays = DEFAULT_DAYS_BY_SLUG[service.slug] || 10;
      const baseDays = parseDeliveryDays(service.longDesc, fallbackDays);
      const supportsPages = PAGE_BASED_SERVICE_SLUGS.has(service.slug);
      const extraPagePrice = supportsPages
        ? Math.max(service.slug === "ecommerce-digital-platforms" ? 900 : 600, Math.round(basePrice * 0.08))
        : 0;

      return {
        id: service.slug,
        slug: service.slug,
        label: service.title,
        description: service.description,
        iconKey: resolveServiceIconKey(service.icon, service.useCase),
        basePrice,
        baseDays,
        supportsPages,
        extraPagePrice,
      };
    });
  }, [services]);

  useEffect(() => {
    if (projectTypes.length === 0) {
      setProjectType(null);
      return;
    }

    setProjectType((current) => {
      if (current && projectTypes.some((project) => project.id === current)) {
        return current;
      }
      return projectTypes[0].id;
    });
  }, [projectTypes]);

  const selectedProject = useMemo(
    () => projectTypes.find((project) => project.id === projectType) || null,
    [projectTypes, projectType],
  );

  const toggleAddon = (id: string) => {
    setAddons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const calc = useMemo(() => {
    if (!selectedProject) {
      return {
        total: 0,
        min: 0,
        max: 0,
        days: 0,
        breakdown: [] as PriceBreakdownLine[],
      };
    }

    let total = selectedProject.basePrice;
    const breakdown: PriceBreakdownLine[] = [
      { label: `${selectedProject.label} (سعر البداية)`, value: selectedProject.basePrice },
    ];

    if (selectedProject.supportsPages && pages > 5) {
      const extraPages = pages - 5;
      const extra = extraPages * selectedProject.extraPagePrice;
      total += extra;
      breakdown.push({ label: `صفحات إضافية (${extraPages})`, value: extra });
    }

    const selectedAddons = addons
      .map((id) => ADDONS.find((item) => item.id === id))
      .filter((item): item is AddonOption => Boolean(item));

    selectedAddons
      .filter((addon) => addon.type === "flat")
      .forEach((addon) => {
        total += addon.value;
        breakdown.push({ label: addon.label, value: addon.value });
      });

    const multiplierAddons = selectedAddons.filter((addon) => addon.type === "mult");
    if (multiplierAddons.length > 0) {
      const beforeMultiplier = total;
      let multiplierIncrease = 0;

      multiplierAddons.forEach((addon) => {
        const addonValue = Math.round(beforeMultiplier * addon.value);
        multiplierIncrease += addonValue;
        breakdown.push({ label: `${addon.label} (+${Math.round(addon.value * 100)}%)`, value: addonValue });
      });

      total += multiplierIncrease;
    }

    const tl = TIMELINES.find((t) => t.id === timeline) ?? TIMELINES[1];
    const beforeTimeline = total;
    total = Math.round(total * tl.mult);
    if (tl.mult !== 1) {
      breakdown.push({
        label: `${tl.label} (${tl.mult > 1 ? "+" : ""}${Math.round((tl.mult - 1) * 100)}%)`,
        value: total - beforeTimeline,
      });
    }

    const pageLoadFactor = selectedProject.supportsPages ? Math.max(0, pages - 5) * 0.03 : 0;
    const days = Math.max(2, Math.round(selectedProject.baseDays * tl.daysMult * (1 + addons.length * 0.05 + pageLoadFactor)));

    const min = Math.round(total * 0.9);
    const max = Math.round(total * 1.15);

    return { total, min, max, days, breakdown };
  }, [selectedProject, pages, addons, timeline]);

  const buildContactPrefill = () => {
    if (!selectedProject) return "/contact";

    const tl = TIMELINES.find((t) => t.id === timeline) ?? TIMELINES[1];
    const addonLabels = addons
      .map((id) => ADDONS.find((a) => a.id === id)?.label)
      .filter(Boolean)
      .join("، ");

    const msg = encodeURIComponent(
      `أهلاً، عندي مشروع وحبيت أرسل التفاصيل بناءً على الحاسبة:\n\n` +
      `• نوع المشروع: ${selectedProject.label}\n` +
      (selectedProject.supportsPages ? `• عدد الصفحات: ${pages}\n` : "") +
      (addonLabels ? `• إضافات: ${addonLabels}\n` : "") +
      `• الجدول الزمني: ${tl.label}\n` +
      `• الميزانية التقديرية: ${formatEgp(calc.total)}\n` +
      `• النطاق المتوقع: من ${formatEgp(calc.min)} إلى ${formatEgp(calc.max)}\n` +
      `• المدة المتوقعة: ${calc.days} يوم\n\n` +
      `حابب نتفق على التفاصيل النهائية.`
    );

    return `/contact?subject=${encodeURIComponent("عرض سعر مشروع")}&message=${msg}`;
  };

  const selectedTimeline = TIMELINES.find((item) => item.id === timeline) ?? TIMELINES[1];

  const pagesInfoText = selectedProject?.supportsPages
    ? `كل صفحة إضافية بعد أول 5 صفحات ≈ ${formatEgp(selectedProject.extraPagePrice)}`
    : "";

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
                  {projectTypes.map(({ id, label, description, iconKey, basePrice }) => {
                    const active = projectType === id;
                    const iconPreset = getThemedIconPreset(iconKey, "sparkles");
                    const Icon = iconPreset.icon;

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
                          <div className="text-[10px] leading-snug" style={{ color: "#9090b0" }}>{description}</div>
                          <div className="text-[10px] mt-1" style={{ color: "#67e8f9" }}>
                            يبدأ من {formatEgp(basePrice)}
                          </div>
                        </div>
                        {active && <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#c084fc" }} />}
                      </button>
                    );
                  })}
                </div>
                {servicesLoading ? (
                  <div className="mt-3 text-[11px]" style={{ color: "#7f7fa5" }}>
                    جاري مزامنة الخدمات من لوحة الأدمن...
                  </div>
                ) : null}
              </div>
            </HolographicCard>

            {/* Step 2: Pages (only for website/webapp) */}
            <AnimatePresence>
              {selectedProject?.supportsPages ? (
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
                      <div className="text-[10px] mt-2" style={{ color: "#67e8f9" }}>
                        {pagesInfoText}
                      </div>
                    </div>
                  </HolographicCard>
                </motion.div>
              ) : null}
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
                                {type === "flat" ? `+${formatEgp(value)}` : `+${Math.round(value * 100)}%`}
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

                  {!selectedProject ? (
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
                          {formatEgp(calc.total)}
                        </motion.div>
                        <div className="text-[10px] mt-1" style={{ color: "#a78bfa" }}>EGP • تقدير مبدئي لسوق مصر</div>
                        <div className="text-[10px] mt-1" style={{ color: "#67e8f9" }}>
                          النطاق المتوقع: {formatEgp(calc.min)} — {formatEgp(calc.max)}
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 mb-4 text-xs" style={{ color: "#a0a0c0" }}>
                        <Clock className="w-3.5 h-3.5" style={{ color: "#fbbf24" }} />
                        <span>المدة المتوقعة:</span>
                        <span className="font-bold" style={{ color: "#fbbf24" }}>{calc.days} يوم ({selectedTimeline.label})</span>
                      </div>

                      {/* Breakdown */}
                      <div className="space-y-1.5 mb-5 pb-5" style={{ borderBottom: "1px solid rgba(168,85,247,0.18)" }}>
                        {calc.breakdown.map((b, i) => (
                          <div key={i} className="flex items-center justify-between text-[11px]">
                            <span className="truncate ml-2" style={{ color: "#9090b0" }}>{b.label}</span>
                            <span className="font-mono flex-shrink-0" style={{ color: b.value < 0 ? "#34d399" : "#d0d0e8" }}>
                              {b.value < 0 ? "−" : "+"}{formatEgp(Math.abs(b.value))}
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
