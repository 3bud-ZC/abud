"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calculator, CheckCircle2, Clock, MessageSquare, Star } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import HolographicCard from "@/components/effects/HolographicCard";
import { SERVICE_CATEGORIES, SERVICE_CATEGORY_MAP, normalizeServiceCategory } from "@/lib/service-categories";
import { getThemedIconPreset, resolveServiceIconKey } from "@/lib/themed-icons";
import { siteUrl } from "@/lib/site-url";
import { TRUST_METRICS, formatTrustMetricValue } from "@/data/trust-metrics";

interface ServiceRow {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDesc?: string | null;
  useCase?: string | null;
  icon?: string | null;
  priceType: string;
  price?: number | null;
  ctaLabel?: string | null;
  featured: boolean;
  isActive: boolean;
  order: number;
}

function extractPoints(longDesc?: string | null): string[] {
  if (!longDesc) return [];
  return longDesc
    .split(/\r?\n|•|,|،|;/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function extractDeliveryTime(longDesc?: string | null): string | null {
  if (!longDesc) return null;
  const match = longDesc.match(/مدة التسليم\s*[:：]\s*(.+)/);
  return match?.[1]?.trim() || null;
}

function formatPrice(service: ServiceRow): string {
  if (service.priceType === "free") return "مجاني";
  if (service.priceType === "hourly") return service.price ? `${service.price} ج.م / ساعة` : "سعر بالساعة";
  if (service.priceType === "fixed") return service.price ? `${service.price} ج.م` : "سعر ثابت";
  return service.price ? `يبدأ من ${service.price} ج.م` : "حسب الطلب";
}

function buildContactLink(service: ServiceRow): string {
  const params = new URLSearchParams({
    subject: `طلب خدمة: ${service.title}`,
    message: `مرحبًا، مهتم بخدمة "${service.title}".\n\nأحتاج عرض سعر مبدئي وخطة تنفيذ مناسبة.`,
  });
  return `/contact?${params.toString()}`;
}

export default function ServicesPage() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [activeCategory, setActiveCategory] = useState<(typeof SERVICE_CATEGORIES)[number]["id"]>("all");

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        const data = await res.json();
        const rows = Array.isArray(data.services) ? data.services : [];
        setServices(rows);
      } catch {
        setServices([]);
      } finally {
        setLoading(false);
      }
    }
    void loadServices();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncCategoryFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const categoryFromQuery = params.get("category");
      const categoryFromHash = window.location.hash.replace("#", "").trim();
      const raw = (categoryFromQuery || categoryFromHash || "").toLowerCase();

      if (!raw) return;

      const direct = SERVICE_CATEGORIES.find((item) => item.id === raw && item.id !== "all");
      if (direct) {
        setActiveCategory(direct.id);
        return;
      }

      const normalized = normalizeServiceCategory(raw);
      if (normalized) setActiveCategory(normalized);
    };

    syncCategoryFromUrl();
    window.addEventListener("hashchange", syncCategoryFromUrl);
    return () => window.removeEventListener("hashchange", syncCategoryFromUrl);
  }, []);

  const featuredServices = useMemo(() => services.filter((s) => s.featured).slice(0, 6), [services]);

  const servicesSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "خدمات ABUD",
      description: "خدمات تطوير مواقع، ذكاء اصطناعي، أتمتة، SEO، وأمن سيبراني.",
      itemListElement: services.slice(0, 20).map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          serviceType: normalizeServiceCategory(service.useCase),
          provider: {
            "@type": "Person",
            name: "ABUD",
            url: siteUrl("/about"),
          },
          areaServed: "Worldwide",
          url: siteUrl(`/services#${normalizeServiceCategory(service.useCase)}`),
        },
      })),
    };
  }, [services]);

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return services;
    return services.filter((s) => normalizeServiceCategory(s.useCase) === activeCategory);
  }, [services, activeCategory]);

  const totalLabel = services.length > 0 ? `${services.length}+` : "0";

  return (
    <div className="relative min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <FloatingOrbs count={6} />
      <ScanLine duration={12} />

      <section className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-badge mb-4 mx-auto">خدمات ABUD</span>
            <h1 className="section-title mb-3">حلول رقمية تبني نمو مشروعك</h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              اختر من خدمات تطوير المواقع والأنظمة والأتمتة، أو اطلب خدمة مخصصة حسب احتياج مشروعك.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.08} className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <StatCard title="إجمالي الخدمات" value={totalLabel} />
              <StatCard title="الخدمات المميزة" value={`${featuredServices.length}`} />
              <StatCard title="فئات الخدمات" value={`${SERVICE_CATEGORIES.length - 1}`} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12} className="mt-4">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {TRUST_METRICS.map((metric) => (
                <StatCard key={metric.id} title={metric.label} value={formatTrustMetricValue(metric)} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative z-10 pb-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {SERVICE_CATEGORIES.map(({ id, label, icon: Icon }) => {
              const count =
                id === "all"
                  ? services.length
                  : services.filter((s) => normalizeServiceCategory(s.useCase) === id).length;
              const active = id === activeCategory;
              return (
                <motion.button
                  key={id}
                  onClick={() => {
                    setActiveCategory(id);

                    if (typeof window === "undefined") return;
                    const nextUrl = id === "all" ? "/services" : `/services#${id}`;
                    window.history.replaceState(null, "", nextUrl);
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px]"
                  style={
                    active
                      ? {
                          background: "linear-gradient(135deg, rgba(147,51,234,0.25), rgba(109,40,217,0.18))",
                          border: "1px solid rgba(168,85,247,0.5)",
                          color: "#f3e8ff",
                          boxShadow: "0 0 0 1px rgba(168,85,247,0.3), 0 4px 14px rgba(147,51,234,0.25)",
                        }
                      : {
                          background: "rgba(15,12,24,0.6)",
                          border: "1px solid rgba(45,35,70,0.5)",
                          color: "#9090b0",
                        }
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: active ? "rgba(168,85,247,0.3)" : "rgba(35,30,55,0.7)",
                      color: active ? "#e9d5ff" : "#606080",
                    }}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <div className="w-7 h-7 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mx-auto" />
            </div>
          ) : (
            <>
              {featuredServices.length > 0 && activeCategory === "all" && (
                <div className="mb-10">
                  <h2 className="text-white font-bold text-lg mb-4">الأكثر طلبًا</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredServices.map((service, i) => (
                      <AnimatedSection key={service.id} delay={i * 0.05}>
                        <FeaturedServiceCard service={service} />
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {filteredServices.map((service, i) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.25 }}
                    >
                      <ServiceCard service={service} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredServices.length === 0 && (
                <div className="text-center py-14 text-[#8f8faa]">
                  لا توجد خدمات في هذه الفئة حاليًا.
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="relative z-10 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <HolographicCard duration={6}>
              <div className="p-8 md:p-10 text-center">
                <h2 className="font-black text-white mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}>
                  هل تحتاج خدمة مخصصة خارج الباقات؟
                </h2>
                <p className="text-[#a0a0c0] mb-7 leading-relaxed">
                  ابعت فكرة مشروعك وهرد عليك بخطة مبدئية وتكلفة تقريبية مناسبة لميزانيتك.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link href="/quote" className="btn-primary btn-glow inline-flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    اطلب عرض سعر
                  </Link>
                  <Link href="/contact" className="btn-outline inline-flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    اطلب خدمة مخصصة
                  </Link>
                </div>
              </div>
            </HolographicCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      className="rounded-2xl p-4 text-center"
      style={{
        background: "linear-gradient(160deg, rgba(15,12,24,0.85), rgba(10,10,18,0.9))",
        border: "1px solid rgba(147,51,234,0.25)",
      }}
    >
      <div className="text-[#b9b9d6] text-sm mb-1">{title}</div>
      <div className="text-white font-black text-2xl">{value}</div>
    </div>
  );
}

function FeaturedServiceCard({ service }: { service: ServiceRow }) {
  const iconPreset = getThemedIconPreset(resolveServiceIconKey(service.icon, service.useCase));
  const ServiceIcon = iconPreset.icon;

  return (
    <Link href="/contact" className="block h-full group">
      <div
        className="h-full rounded-2xl p-5 transition-all duration-300 group-hover:-translate-y-1"
        style={{
          background: "linear-gradient(160deg, rgba(22,15,40,0.85), rgba(12,10,22,0.9))",
          border: "1px solid rgba(168,85,247,0.32)",
        }}
      >
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-yellow-200 border border-yellow-400/40 bg-yellow-400/10 mb-3">
          <Star className="w-2.5 h-2.5" fill="currentColor" />
          مميز
        </div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-white font-black text-lg leading-tight">{service.title}</h3>
          <span className="w-8 h-8 rounded-lg bg-purple-600/15 border border-purple-600/20 flex items-center justify-center flex-shrink-0">
            <ServiceIcon className="w-4 h-4" style={{ color: iconPreset.color }} />
          </span>
        </div>
        <p className="text-[#a3a3c3] text-sm leading-relaxed mb-4">{service.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-xs text-purple-300">{formatPrice(service)}</span>
          <span className="inline-flex items-center gap-1 text-xs text-white">
            اطلب الآن
            <ArrowLeft className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ServiceCard({ service }: { service: ServiceRow }) {
  const points = extractPoints(service.longDesc);
  const category = SERVICE_CATEGORY_MAP[normalizeServiceCategory(service.useCase)];
  const iconPreset = getThemedIconPreset(resolveServiceIconKey(service.icon, service.useCase));
  const ServiceIcon = iconPreset.icon;
  const delivery = extractDeliveryTime(service.longDesc);
  const contactLink = buildContactLink(service);

  return (
    <div
      className="h-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "linear-gradient(160deg, rgba(15,12,24,0.85), rgba(10,10,18,0.9))",
        border: "1px solid rgba(35,30,55,0.75)",
      }}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="text-white font-bold text-base">{service.title}</h3>
        <span className="w-9 h-9 rounded-xl bg-purple-600/15 border border-purple-600/20 flex items-center justify-center">
          <ServiceIcon className="w-[18px] h-[18px]" style={{ color: iconPreset.color }} />
        </span>
      </div>

      <div className="mb-3 text-[10px] px-2 py-1 rounded-full inline-flex border border-purple-600/30 bg-purple-600/10 text-purple-200">
        {category?.label || "خدمة تقنية"}
      </div>

      <p className="text-[#9898ba] text-sm leading-relaxed mb-4">{service.description}</p>

      {points.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {points.slice(0, 4).map((point) => (
            <span
              key={point}
              className="text-[10px] px-2 py-0.5 rounded-full border border-purple-600/30 bg-purple-600/10 text-purple-200"
            >
              {point}
            </span>
          ))}
          {points.length > 4 && <span className="text-[10px] text-[#68688d]">+{points.length - 4}</span>}
        </div>
      )}

      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-[10px] text-[#7f7fa5] inline-flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {delivery || "حسب نوع المشروع"}
          </div>
          <div className="text-xs font-bold text-purple-300">{formatPrice(service)}</div>
        </div>
        <Link href={contactLink} className="inline-flex items-center gap-1 text-xs text-white hover:text-purple-200 transition-colors">
          {service.ctaLabel || "اطلب"}
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link
          href={`/services/${service.slug}`}
          className="btn-outline text-xs py-2 px-3 inline-flex items-center justify-center gap-1"
        >
          عرض التفاصيل
        </Link>
        <Link
          href={contactLink}
          className="btn-primary btn-glow text-xs py-2 px-3 inline-flex items-center justify-center gap-1"
        >
          {service.ctaLabel || "اطلب الآن"}
        </Link>
      </div>

      {service.featured && (
        <div className="mt-3 inline-flex items-center gap-1 text-[10px] text-green-300">
          <CheckCircle2 className="w-3 h-3" />
          خدمة موصى بها
        </div>
      )}
    </div>
  );
}
