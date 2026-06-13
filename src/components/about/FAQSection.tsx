"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import HolographicCard from "@/components/effects/HolographicCard";

const FAQS = [
  {
    q: "إزاي بتمّ التعاون من أول يوم؟",
    a: "بنبدأ بمكالمة تشخيص قصيرة (15-20 دقيقة) نفهم فيها هدفك، جمهورك، والميزانية المتاحة. بعدها بنرسل خطة تنفيذ واضحة مع جدول زمني وتكلفة مبدئية. مفيش التزام قبل الموافقة.",
  },
  {
    q: "السعر بتحدد إزاي؟",
    a: "السعر بيعتمد على حجم المشروع، التكاملات المطلوبة، والوقت المتاح. بنقدّم دايماً تكلفة مبدئية واضحة قبل ما نبدأ، مع تقسيم دفعات مرهونة بمراحل التنفيذ.",
  },
  {
    q: "بقدر أتابع تقدم المشروع إزاي؟",
    a: "تحديثات أسبوعية واضحة + مشاركة على GitHub أو Notion حسب راحتك. بنفضل التواصل المباشر على Telegram أو WhatsApp للرد السريع على الأسئلة.",
  },
  {
    q: "بتسلم المشاريع في مواعيدها؟",
    a: "نعم. الجدول الزمني اللي بنحدده في البداية بيكون واقعي 100% — مبنى على خبرة فعلية في تنفيذ مشاريع مشابهة. لو في أي تغيير، بنبلغك قبلها بوقت كافي.",
  },
  {
    q: "لو عايز تعديل بعد التسليم؟",
    a: "بنقدّم فترة صيانة مجانية 14 يوم بعد الإطلاق لتعديلات بسيطة. بعدها التعديلات بتكون بسعر مخفض للعملاء الحاليين. الهدف دايماً إن المشروع يشتغل بشكل مثالي.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-4 relative overflow-hidden scroll-mt-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(147,51,234,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="section-badge mb-5 mx-auto">
            <HelpCircle className="w-2.5 h-2.5" />
            أسئلة شائعة
          </span>
          <h2 className="section-title mt-4 mb-3">اللي بيسأله كل عميل</h2>
          <p className="section-subtitle text-center max-w-xl mx-auto">
            إجابات مباشرة بدون لفّ ولا دوران — عشان تبدأ بثقة ووضوح
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <AnimatedSection key={i} delay={i * 0.06}>
                <HolographicCard duration={6} delay={i * 0.2}>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-right"
                    >
                      <span className="text-white font-bold text-sm" style={{ letterSpacing: "-0.01em" }}>
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-4 h-4 text-purple-400" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div
                            className="px-5 pb-5 text-sm leading-relaxed"
                            style={{ color: "#a0a0c0", borderTop: "1px solid rgba(168,85,247,0.15)", paddingTop: "1rem" }}
                          >
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </HolographicCard>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
