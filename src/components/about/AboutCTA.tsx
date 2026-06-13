"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Code2, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import HolographicCard from "@/components/effects/HolographicCard";

const PROJECT_INTENTS = [
  {
    id: "website",
    label: "موقع / متجر",
    description: "تحتاج حضور رقمي قوي يقدّم خدماتك بوضوح ويحوّل الزائر إلى عميل بشكل أسرع.",
    quoteHref: "/quote?service=website",
    quoteLabel: "احسب تكلفة الموقع",
    contactHref: "/contact?topic=website",
    contactLabel: "مكالمة تخطيط الموقع",
  },
  {
    id: "system",
    label: "ERP / CRM",
    description: "تحتاج نظام داخلي ينظم العمليات، يقلل الأخطاء، ويوفر رؤية أوضح لاتخاذ القرار.",
    quoteHref: "/quote?service=system",
    quoteLabel: "احسب تكلفة النظام",
    contactHref: "/contact?topic=system",
    contactLabel: "مكالمة تحليل النظام",
  },
  {
    id: "ai",
    label: "أداة AI",
    description: "تحتاج أداة ذكاء اصطناعي مخصصة تسرّع فريقك وتخفض الوقت المهدور في المهام المتكررة.",
    quoteHref: "/quote?service=ai",
    quoteLabel: "احسب تكلفة أداة AI",
    contactHref: "/contact?topic=ai",
    contactLabel: "مكالمة اكتشاف AI",
  },
] as const;

export default function AboutCTA() {
  const [selectedIntentId, setSelectedIntentId] = useState<(typeof PROJECT_INTENTS)[number]["id"]>("website");
  const selectedIntent = PROJECT_INTENTS.find((intent) => intent.id === selectedIntentId) ?? PROJECT_INTENTS[0];

  return (
    <section id="cta" className="py-20 px-4 bg-[#080810] relative overflow-hidden scroll-mt-32">
      <FloatingOrbs count={4} />
      <ScanLine duration={11} />
      <div className="relative z-10 max-w-3xl mx-auto">
        <AnimatedSection>
          <HolographicCard duration={6}>
            <div className="p-8 md:p-12 relative text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(147,51,234,0.15)_0%,transparent_60%)] pointer-events-none" />
              <div className="relative">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                  style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-medium">متاح للمشاريع الجديدة</span>
                </div>
                <h2
                  className="font-black text-white mb-3"
                  style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", letterSpacing: "-0.025em" }}
                >
                  جاهز نبدأ مشروعك بشكل احترافي؟
                </h2>
                <p className="mb-5 max-w-lg mx-auto" style={{ color: "#a0a0c0", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  اختار نوع مشروعك، وخد أقصر طريق لبداية واضحة بخطة تنفيذ واقعية.
                </p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 justify-center mb-3">
                    {PROJECT_INTENTS.map((intent) => {
                      const isActive = selectedIntent.id === intent.id;
                      return (
                        <button
                          key={intent.id}
                          type="button"
                          onClick={() => setSelectedIntentId(intent.id)}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                          style={
                            isActive
                              ? {
                                  color: "#ffffff",
                                  border: "1px solid rgba(192,132,252,0.45)",
                                  background: "linear-gradient(135deg, rgba(192,132,252,0.25), rgba(167,139,250,0.16))",
                                  boxShadow: "0 0 12px rgba(192,132,252,0.2)",
                                }
                              : {
                                  color: "#cfcfe6",
                                  border: "1px solid rgba(168,85,247,0.25)",
                                  background: "rgba(168,85,247,0.08)",
                                }
                          }
                        >
                          {intent.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs max-w-xl mx-auto" style={{ color: "#9e9ebe", lineHeight: 1.8 }}>
                    {selectedIntent.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <Link href={selectedIntent.quoteHref} className="btn-primary btn-glow gap-2 inline-flex items-center">
                    <Sparkles className="w-4 h-4" />
                    {selectedIntent.quoteLabel}
                  </Link>
                  <Link href={selectedIntent.contactHref} className="btn-outline gap-2 inline-flex items-center">
                    <ArrowLeft className="w-4 h-4" />
                    {selectedIntent.contactLabel}
                  </Link>
                  <Link href="/portfolio" className="btn-outline gap-2 inline-flex items-center">
                    <Code2 className="w-4 h-4" />
                    استعرض أعمالي
                  </Link>
                </div>
              </div>
            </div>
          </HolographicCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
