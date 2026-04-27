"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HelpCircle, ChevronDown, ShoppingBag, MessageSquare, Zap } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import AuroraBeams from "@/components/effects/AuroraBeams";
import HolographicCard from "@/components/effects/HolographicCard";
import ParticleField from "@/components/effects/ParticleField";

const faqs = [
  {
    category: "الشراء والمنتجات",
    icon: ShoppingBag,
    color: "#c084fc",
    items: [
      {
        q: "كيف أستلم المنتجات الرقمية بعد الشراء؟",
        a: "بعد تأكيد طلبك ومراجعة الدفع، ستصلك رابط التحميل مباشرةً على بريدك الإلكتروني خلال دقائق. إذا لم تجد الرسالة تحقق من مجلد Spam أو تواصل معنا مباشرةً.",
      },
      {
        q: "هل المنتجات مناسبة للمبتدئين؟",
        a: "نعم تمامًا. معظم منتجاتنا مصممة لتكون شاملة وواضحة لأي مستوى. كل دليل يبدأ من الأساسيات ويتدرج للمستوى المتقدم مع أمثلة عملية.",
      },
      {
        q: "هل هناك ضمان استرداد الأموال؟",
        a: "نعم، نقدم ضمان استرداد كامل خلال 7 أيام إذا لم يعجبك المنتج لأي سبب. فقط تواصل معنا وسنعالج الطلب فورًا.",
      },
      {
        q: "هل يمكنني شراء أكثر من منتج دفعة واحدة؟",
        a: "حاليًا يتم الشراء منتجًا واحدًا في كل مرة. للحصول على خصم على الحزمة تواصل معنا مباشرةً وسنعدّ لك عرضًا مخصصًا.",
      },
    ],
  },
  {
    category: "الدفع",
    icon: Zap,
    color: "#67e8f9",
    items: [
      {
        q: "ما هي طرق الدفع المتاحة؟",
        a: "نقبل الدفع عبر: فودافون كاش، إنستاباي، وPayPal. جميع المعاملات آمنة ومشفرة. بعد الدفع أرسل لنا إيصال العملية لتأكيد طلبك.",
      },
      {
        q: "كيف أستخدم كوبون الخصم؟",
        a: "في صفحة الدفع ستجد حقل 'كود الخصم' أسفل ملخص الطلب. أدخل الكود واضغط تطبيق وسيُحسب الخصم تلقائيًا من السعر الإجمالي.",
      },
      {
        q: "متى يتم تأكيد طلبي؟",
        a: "بعد استلام إيصال الدفع يتم مراجعته وتأكيد الطلب خلال 1-3 ساعات في الغالب. في أوقات الذروة قد يصل لـ 24 ساعة.",
      },
    ],
  },
  {
    category: "الخدمات",
    icon: MessageSquare,
    color: "#a3e635",
    items: [
      {
        q: "كيف أطلب خدمة مخصصة؟",
        a: "اضغط على 'طلب الخدمة' في صفحة الخدمة المطلوبة، أو تواصل معنا عبر صفحة Contact. سنرد خلال 24 ساعة ونضع معك خطة تنفيذية واضحة.",
      },
      {
        q: "كم يستغرق تسليم الخدمة؟",
        a: "يعتمد على نوع الخدمة: الخدمات الأمنية البسيطة تستغرق 2-5 أيام، تطوير صفحة هبوط 3-7 أيام، والمشاريع الكاملة 2-4 أسابيع. نحدد الجدول الزمني بدقة قبل بدء العمل.",
      },
      {
        q: "هل تقدمون دعمًا بعد الشراء؟",
        a: "نعم. للمنتجات الرقمية نقدم دعمًا عبر البريد الإلكتروني لمدة 30 يومًا لأي سؤال تقني. للخدمات نقدم فترة دعم وضمان تبدأ بعد التسليم.",
      },
      {
        q: "هل يمكن تخصيص الخدمات حسب احتياجي؟",
        a: "بالطبع. نبني الحلول حسب متطلباتك بالضبط. تواصل معنا أولًا بوصف واضح لما تحتاجه وسنضع لك عرضًا مفصلًا.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="overflow-hidden rounded-xl transition-all duration-200"
      style={{
        background: open
          ? "linear-gradient(160deg, rgba(18,10,30,0.9), rgba(10,10,18,0.8))"
          : "rgba(10,10,18,0.6)",
        border: open ? "1px solid rgba(147,51,234,0.3)" : "1px solid rgba(28,28,48,0.8)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-right"
      >
        <span
          className="font-semibold text-sm leading-snug transition-colors duration-200"
          style={{ color: open ? "#e2d4f8" : "#c0c0d8" }}
        >
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className="w-4 h-4 transition-colors duration-200"
            style={{ color: open ? "#c084fc" : "#505070" }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div
              className="px-5 pb-5 text-sm leading-relaxed"
              style={{ color: "#707090", borderTop: "1px solid rgba(28,28,48,0.6)" }}
            >
              <div className="pt-4">{a}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <AuroraBeams />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(147,51,234,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <FloatingOrbs count={5} />
        <ParticleField density={28} />
        <ScanLine duration={11} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-badge mb-6">
              <HelpCircle className="w-2.5 h-2.5" />
              الأسئلة الشائعة
            </span>
            <h1
              className="font-black text-white mt-5 mb-4"
              style={{ fontSize: "clamp(2rem,6vw,3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              كيف يمكننا مساعدتك؟
            </h1>
            <p style={{ color: "#606070", fontSize: "1rem", maxWidth: "32rem", margin: "0 auto", lineHeight: 1.7 }}>
              إجابات لأكثر الأسئلة شيوعًا حول المنتجات والخدمات وطرق الدفع.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 px-4 pb-24 relative overflow-hidden">
        <FloatingOrbs count={4} />
        <div className="relative z-10 max-w-3xl mx-auto space-y-12">
          {faqs.map(({ category, icon: Icon, color, items }, ci) => (
            <AnimatedSection key={ci} delay={ci * 0.05}>
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  animate={{ boxShadow: [`0 0 12px ${color}40`, `0 0 24px ${color}80`, `0 0 12px ${color}40`] }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: ci * 0.3 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}25`, border: `1px solid ${color}55` }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </motion.div>
                <h2 className="text-white font-bold text-lg" style={{ letterSpacing: "-0.02em" }}>
                  {category}
                </h2>
              </div>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section
        className="py-20 px-4 relative overflow-hidden"
        style={{ borderTop: "1px solid rgba(28,28,48,0.8)", background: "linear-gradient(to bottom, rgba(8,8,14,1), rgba(5,5,8,1))" }}
      >
        <FloatingOrbs count={4} />
        <ScanLine duration={12} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <AnimatedSection>
            <HolographicCard duration={6}>
              <div className="p-8 md:p-10 text-center">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <MessageSquare className="w-9 h-9 mx-auto mb-4" style={{ color: "#c084fc", filter: "drop-shadow(0 0 12px rgba(168,85,247,0.7))" }} />
                </motion.div>
                <h3 className="text-white font-bold text-xl mb-2" style={{ letterSpacing: "-0.02em" }}>
                  لم تجد إجابتك؟
                </h3>
                <p className="text-sm mb-6" style={{ color: "#9090b0" }}>
                  أنا جاهز للمساعدة — تواصل معي مباشرة وسأرد في أقرب وقت.
                </p>
                <Link href="/contact" className="btn-primary btn-glow inline-flex gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  تواصل معي
                </Link>
              </div>
            </HolographicCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
