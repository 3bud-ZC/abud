"use client";

import { motion } from "framer-motion";
import { Target, Zap, FileText, Users, GraduationCap, Scroll } from "lucide-react";
import HolographicCard from "@/components/effects/HolographicCard";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import AnimatedSection from "@/components/ui/AnimatedSection";

const PRINCIPLES = [
  {
    num: "01",
    icon: Target,
    title: "نتيجة واضحة قبل أي شيء",
    desc: "كل قرار تقني لازم يخدم هدف المشروع التجاري. بدون أثر واضح على النمو أو التشغيل، القرار بيتراجع.",
    accent: "#c084fc",
  },
  {
    num: "02",
    icon: Zap,
    title: "السرعة جزء من الجودة",
    desc: "موقع بطيء يعني فرص أقل. الأداء، responsiveness، وتجربة الاستخدام السريعة أساسيين من أول نسخة.",
    accent: "#67e8f9",
  },
  {
    num: "03",
    icon: FileText,
    title: "نظام قابل للتسليم والصيانة",
    desc: "تنظيم الكود، توثيق النقاط الحرجة، وإعدادات واضحة عشان فريقك يكمل بسهولة بعد التسليم.",
    accent: "#a78bfa",
  },
  {
    num: "04",
    icon: Users,
    title: "تواصل مباشر وشفاف",
    desc: "تحديثات منتظمة، وضوح في التقدم، وتنبيه مبكر لأي تحديات. الثقة تتبني بالمصارحة مش بالمفاجآت.",
    accent: "#f0abfc",
  },
  {
    num: "05",
    icon: GraduationCap,
    title: "تطوير مستمر بلا تعقيد زائد",
    desc: "أطور أسلوبي وأدواتي باستمرار، لكن باختيارات عملية تناسب مشروعك بدل التعقيد غير الضروري.",
    accent: "#34d399",
  },
];

const PRINCIPLES_NOTE =
  "المبادئ دي مش شعارات. دي طريقة التنفيذ اليومية في كل مرحلة من المشروع: من التخطيط لحد الإطلاق.";

export default function PrinciplesSection() {
  return (
    <section
      className="py-24 px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg,#070612 0%,#0a0814 50%,#070612 100%)",
        borderTop: "1px solid rgba(28,28,48,0.5)",
        borderBottom: "1px solid rgba(28,28,48,0.5)",
      }}
    >
      <FloatingOrbs count={5} />
      <ScanLine duration={13} direction="vertical" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_50%,rgba(147,51,234,0.07)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="section-badge mb-5 mx-auto">
            <Scroll className="w-2.5 h-2.5" />
            مبادئي
          </span>
          <h2 className="section-title mt-4 mb-3">القواعد التي أعمل بها</h2>
          <p className="section-subtitle text-center max-w-xl mx-auto">
            إطار عمل واضح يضمن تنفيذ أسرع، جودة أعلى، وتجربة تعاون مريحة
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <HolographicCard duration={6 + (i % 3)} delay={i * 0.4} className="h-full">
                  <div className="p-7 relative h-full overflow-hidden group">
                    {/* Big number watermark */}
                    <div
                      className="absolute -top-2 -left-2 font-black opacity-[0.07] pointer-events-none select-none"
                      style={{
                        fontSize: "8rem",
                        color: p.accent,
                        letterSpacing: "-0.05em",
                        lineHeight: 0.8,
                      }}
                    >
                      {p.num}
                    </div>

                    {/* Top accent bar */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-px"
                      animate={{ opacity: [0.3, 0.9, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, ${p.accent} 50%, transparent 100%)`,
                      }}
                    />

                    {/* Halo on hover */}
                    <div
                      className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${p.accent}40 0%, transparent 70%)`,
                        filter: "blur(20px)",
                      }}
                    />

                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${p.accent}30, ${p.accent}08)`,
                            border: `1px solid ${p.accent}55`,
                            boxShadow: `inset 0 0 14px ${p.accent}20, 0 0 18px ${p.accent}25`,
                          }}
                        >
                          <Icon className="w-5 h-5" style={{ color: p.accent }} />
                        </div>
                        <span
                          className="text-[10px] font-black tracking-widest"
                          style={{ color: `${p.accent}cc` }}
                        >
                          PRINCIPLE / {p.num}
                        </span>
                      </div>

                      <h3
                        className="text-white font-black text-lg mb-3 leading-tight"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {p.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#a0a0c0" }}>
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>
            );
          })}
        </div>

        <AnimatedSection delay={0.2} className="text-center mt-8">
          <p className="text-xs max-w-2xl mx-auto" style={{ color: "#8d8dae" }}>
            {PRINCIPLES_NOTE}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
