import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, MessageSquare, Tag } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import HolographicCard from "@/components/effects/HolographicCard";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import JsonLd from "@/components/JsonLd";
import { getPublicServiceBySlug } from "@/lib/public-services";
import { SERVICE_CATEGORY_MAP, normalizeServiceCategory } from "@/lib/service-categories";
import { siteUrl } from "@/lib/site-url";

function extractPoints(longDesc?: string | null): string[] {
  if (!longDesc) return [];
  return longDesc
    .split(/\r?\n|•/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("مدة التسليم"));
}

function extractDeliveryTime(longDesc?: string | null): string {
  const match = (longDesc || "").match(/مدة التسليم\s*[:：]\s*(.+)/);
  return match?.[1]?.trim() || "حسب نطاق المشروع";
}

function formatPrice(priceType: string, price?: number | null): string {
  if (priceType === "free") return "مجاني";
  if (priceType === "hourly") return price ? `${price} ج.م / ساعة` : "سعر بالساعة";
  if (priceType === "fixed") return price ? `${price} ج.م` : "سعر ثابت";
  return price ? `يبدأ من ${price} ج.م` : "حسب الطلب";
}

function buildContactLink(title: string): string {
  const params = new URLSearchParams({
    subject: `طلب خدمة: ${title}`,
    message: `مرحبًا، مهتم بخدمة "${title}".\n\nأحتاج خطة تنفيذ وتكلفة تقريبية.`,
  });
  return `/contact?${params.toString()}`;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getPublicServiceBySlug(params.slug);

  if (!service) notFound();

  const category = SERVICE_CATEGORY_MAP[normalizeServiceCategory(service.useCase)];
  const points = extractPoints(service.longDesc);
  const delivery = extractDeliveryTime(service.longDesc);
  const price = formatPrice(service.priceType, service.price);
  const contactHref = buildContactLink(service.title);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Person",
      name: "Abdullah Ragab (ABUD)",
      url: siteUrl("/about"),
    },
    serviceType: category.label,
    areaServed: "EG",
    url: siteUrl(`/services/${service.slug}`),
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: service.price || undefined,
      availability: "https://schema.org/InStock",
      url: siteUrl(`/services/${service.slug}`),
    },
  };

  return (
    <div className="pt-24 pb-20 px-4 relative overflow-hidden">
      <JsonLd data={serviceSchema} />
      <FloatingOrbs count={4} />
      <ScanLine duration={12} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <AnimatedSection>
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-[#9e9ebe] hover:text-purple-300 transition-colors mb-5">
            <ArrowLeft className="w-4 h-4" />
            العودة لكل الخدمات
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full border border-purple-600/25 bg-purple-600/10 text-purple-200 inline-flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {category.label}
            </span>
            {service.featured ? (
              <span className="text-xs px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-300">
                خدمة موصى بها
              </span>
            ) : null}
          </div>

          <h1 className="text-white font-black mb-4" style={{ fontSize: "clamp(1.9rem,5vw,3rem)", letterSpacing: "-0.02em" }}>
            {service.title}
          </h1>

          <p className="text-[#a0a0c0] leading-relaxed text-base mb-6">{service.description}</p>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            <div className="rounded-xl p-4 border border-[#2b2440] bg-[#0e0b18]">
              <div className="text-xs text-[#8a86a8] mb-1">السعر المبدئي</div>
              <div className="text-purple-300 font-bold text-base">{price}</div>
            </div>
            <div className="rounded-xl p-4 border border-[#2b2440] bg-[#0e0b18]">
              <div className="text-xs text-[#8a86a8] mb-1 inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                مدة التسليم
              </div>
              <div className="text-white font-semibold text-base">{delivery}</div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.06}>
          <HolographicCard duration={6}>
            <div className="p-6 md:p-8">
              <h2 className="text-white font-bold text-xl mb-4">تفاصيل الخدمة</h2>
              <p className="text-[#b2b2cf] leading-relaxed text-sm mb-5">{service.longDesc?.replace(/\n\nمدة التسليم[:：].+$/, "")}</p>
              {points.length > 0 ? (
                <ul className="space-y-2">
                  {points.slice(0, 6).map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-[#d4d4ea]">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </HolographicCard>
        </AnimatedSection>

        <AnimatedSection delay={0.12} className="mt-8">
          <HolographicCard duration={6}>
            <div className="p-8 text-center">
              <h3 className="text-white font-black text-2xl mb-2">جاهز تبدأ مشروعك؟</h3>
              <p className="text-[#a7a7c6] mb-6">ابعت فكرة مشروعك وهرد عليك بخطة مبدئية وتكلفة تقريبية.</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href={contactHref} className="btn-primary btn-glow inline-flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  {service.ctaLabel || "اطلب عرض سعر"}
                </Link>
                <Link href="/portfolio" className="btn-outline inline-flex items-center gap-2">
                  اطلب مشروع مشابه
                </Link>
              </div>
            </div>
          </HolographicCard>
        </AnimatedSection>
      </div>
    </div>
  );
}
