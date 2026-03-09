"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, BrainCircuit, Layers, Bot, Shield, Terminal, ArrowLeft, CheckCircle, Zap, MessageSquare } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "تطوير مواقع احترافية",
    desc: "أبني مواقع ويب متكاملة وعالية الأداء بأحدث التقنيات. من المواقع الشخصية إلى المنصات المتقدمة.",
    longDesc: "أستخدم Next.js وReact لبناء مواقع سريعة ومتجاوبة وقابلة للتطوير. كل موقع أبنيه يتميز بتصميم فريد وأداء ممتاز وتجربة مستخدم سلسة.",
    useCase: "للأعمال والعلامات التجارية والمشاريع الشخصية",
    features: ["تصميم UI/UX مخصص", "Next.js / React", "متجاوب 100%", "SEO متقدم", "لوحة تحكم كاملة"],
    priceType: "project",
    ctaLabel: "اطلب الخدمة",
    ctaType: "contact",
    color: "from-purple-600 to-purple-800",
  },
  {
    id: "ai",
    icon: BrainCircuit,
    title: "بناء أدوات الذكاء الاصطناعي",
    desc: "أصمم وأبني أدوات ذكاء اصطناعي مخصصة تعتمد على نماذج GPT وLLMs الأخرى.",
    longDesc: "من الشات بوت الذكي إلى أنظمة تحليل النصوص والمحتوى التلقائي. أستخدم OpenAI API وLangChain وأدوات الـ AI الأحدث لبناء تطبيقات عملية ومفيدة.",
    useCase: "لأتمتة المهام وتحسين الإنتاجية وبناء منتجات AI",
    features: ["تكامل OpenAI API", "Custom AI Agents", "RAG Systems", "تحليل النصوص", "التوليد التلقائي"],
    priceType: "project",
    ctaLabel: "اطلب الخدمة",
    ctaType: "contact",
    color: "from-violet-600 to-purple-800",
  },
  {
    id: "automation",
    icon: Layers,
    title: "أتمتة المهام والأنظمة",
    desc: "أبني أنظمة أتمتة كاملة تعمل 24/7 لتوفير وقتك ورفع إنتاجيتك.",
    longDesc: "من أتمتة السوشيال ميديا إلى سير العمل التجارية المعقدة. أستخدم Python وn8n وMake وApis مختلفة لبناء حلول أتمتة قوية وموثوقة.",
    useCase: "للشركات والأفراد الذين يريدون توفير الوقت",
    features: ["Python Scripts", "Workflow Automation", "API Integration", "Scheduled Jobs", "تقارير تلقائية"],
    priceType: "project",
    ctaLabel: "اطلب الخدمة",
    ctaType: "contact",
    color: "from-indigo-600 to-purple-700",
  },
  {
    id: "bots",
    icon: Bot,
    title: "بناء بوتات تيليجرام",
    desc: "أصمم وأبني بوتات تيليجرام احترافية من البسيط للمتقدم جدًا.",
    longDesc: "بوتات إدارة مجموعات، متاجر رقمية، نظم اشتراك، AI Bots، وأكثر. كل بوت أبنيه يعمل بكفاءة عالية ويتحمل الاستخدام الكثيف.",
    useCase: "للقنوات والمجموعات والمشاريع التجارية على تيليجرام",
    features: ["Inline Keyboards", "Payments Integration", "Admin Panel", "Statistics", "AI Integration"],
    priceType: "fixed",
    price: "تبدأ من 200 ج.م",
    ctaLabel: "اطلب بوت",
    ctaType: "contact",
    color: "from-purple-700 to-pink-800",
  },
  {
    id: "digital",
    icon: Shield,
    title: "حلول رقمية مخصصة",
    desc: "لديك فكرة مميزة ولا تجدها في الحلول الجاهزة؟ أبنيها لك من الصفر.",
    longDesc: "كل مشروع مختلف، وأنا أحب التحديات. سواء كانت منصة متخصصة أو أداة داخلية أو نظام إدارة مخصص — أقرأ احتياجك وأبني الحل المثالي له.",
    useCase: "للأفكار الجديدة والمشاريع المتخصصة",
    features: ["تحليل المتطلبات", "تصميم Architecture", "Full Stack Dev", "Testing & QA", "دعم ما بعد الإطلاق"],
    priceType: "request",
    ctaLabel: "ناقش فكرتك",
    ctaType: "contact",
    color: "from-blue-700 to-purple-800",
  },
  {
    id: "consulting",
    icon: Terminal,
    title: "استشارات تقنية",
    desc: "هل تحتاج رأيًا تقنيًا متخصصًا قبل البدء في مشروعك؟ أنا هنا.",
    longDesc: "أقدم استشارات تقنية في اختيار التقنيات المناسبة، تصميم البنية التحتية، مراجعة الكود، وتقييم الأفكار. جلسة واحدة قد توفر عليك أشهرًا من الأخطاء.",
    useCase: "للمطورين وأصحاب الأعمال والمشاريع الناشئة",
    features: ["تقييم الأفكار", "اختيار التقنيات", "Code Review", "مراجعة Architecture", "خارطة الطريق"],
    priceType: "hourly",
    price: "بالساعة",
    ctaLabel: "احجز استشارة",
    ctaType: "contact",
    color: "from-purple-600 to-violet-800",
  },
];

const faq = [
  { q: "ما هي مدة تنفيذ المشاريع؟", a: "تعتمد على المشروع، المشاريع البسيطة من 3-7 أيام، والمتقدمة من 2-4 أسابيع." },
  { q: "هل تقدم خدمة الصيانة بعد التسليم؟", a: "نعم، أقدم دعمًا فنيًا وصيانة شهرية كخدمة منفصلة." },
  { q: "ما هي طرق الدفع المتاحة؟", a: "فودافون كاش، إنستاباي، وPayPal. يمكن تقسيم المبلغ 50% مقدمًا والباقي عند التسليم." },
  { q: "هل يمكنني رؤية أعمال سابقة؟", a: "بالتأكيد، تصفح صفحة أعمالي لترى مشاريع حقيقية منجزة." },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(147,51,234,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 mb-6">
              <Zap className="w-3 h-3 text-purple-400" />
              <span className="text-purple-400 text-xs font-medium">الخدمات</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">ماذا أبني لك؟</h1>
            <p className="text-[#a0a0b8] text-xl max-w-2xl mx-auto leading-relaxed">
              خدمات تقنية متخصصة بأعلى جودة وأفضل الأسعار. كل خدمة مبنية على خبرة حقيقية ونتائج ملموسة.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {services.map(({ id, icon: Icon, title, desc, longDesc, useCase, features, priceType, price, ctaLabel, color }, i) => (
            <AnimatedSection key={id} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -3 }}
                id={id}
                className="card-base overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-7">
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center`}
                        style={{ boxShadow: "0 4px 20px rgba(147,51,234,0.3)" }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <h2 className="text-xl md:text-2xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>{title}</h2>
                        {(priceType === "fixed" || priceType === "hourly") && price ? (
                          <span className="badge-purple">{price}</span>
                        ) : priceType === "project" ? (
                          <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: "rgba(25,25,40,0.8)", border: "1px solid rgba(40,40,60,0.8)", color: "#505070" }}>
                            حسب المشروع
                          </span>
                        ) : (
                          <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: "rgba(25,25,40,0.8)", border: "1px solid rgba(40,40,60,0.8)", color: "#505070" }}>
                            بعد الاستشارة
                          </span>
                        )}
                      </div>

                      <p className="text-[#8080a0] mb-2 leading-relaxed text-sm">{desc}</p>
                      <p className="text-[#606070] text-sm mb-4 leading-relaxed">{longDesc}</p>

                      <div className="flex items-center gap-2 text-xs mb-5" style={{ color: "rgba(168,85,247,0.8)" }}>
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{useCase}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {features.map((f) => (
                          <span key={f} className="tag-pill">{f}</span>
                        ))}
                      </div>

                      <Link href="/contact" className="btn-primary inline-flex gap-2 text-sm">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {ctaLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[#080810]">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title mb-3">أسئلة شائعة</h2>
          </AnimatedSection>
          <div className="space-y-3">
            {faq.map(({ q, a }, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div className="p-6 rounded-2xl transition-all duration-200"
                  style={{
                    background: "linear-gradient(160deg, rgba(13,13,20,1), rgba(10,10,16,1))",
                    border: "1px solid rgba(26,26,44,0.8)",
                    borderTop: "1px solid rgba(40,40,60,0.5)"
                  }}>
                  <h3 className="text-white font-bold mb-2 text-sm" style={{ letterSpacing: "-0.01em" }}>{q}</h3>
                  <p className="text-[#606070] text-sm leading-relaxed">{a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-black text-white mb-4">جاهز للبدء؟</h2>
            <p className="text-[#a0a0b8] mb-8">تواصل معي الآن ونبدأ العمل على مشروعك.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="btn-primary gap-2">
                <MessageSquare className="w-4 h-4" />
                تواصل معي
              </Link>
              <Link href="/portfolio" className="btn-outline gap-2">
                <ArrowLeft className="w-4 h-4" />
                شاهد أعمالي
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
