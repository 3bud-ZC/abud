"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackContactFormStart, trackContactQualificationField, trackContactFormSubmit } from "@/lib/analytics";
import { z } from "zod";
import toast from "react-hot-toast";
import { MessageSquare, Mail, Send, Instagram, Zap, Music2, Ghost, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const schema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  email: z.string().email("بريد إلكتروني غير صحيح"),
  phone: z.string().optional(),
  inquiryType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  subject: z.string().min(2, "الموضوع مطلوب"),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

type FormData = z.infer<typeof schema>;

const socials = [
  { icon: Music2,         label: "تيك توك",     handle: "@a_do",       href: "https://www.tiktok.com/@a_do?_r=1&_t=ZS-94J5UfXanZ4",                                          color: "#ff2d55" },
  { icon: Instagram,      label: "إنستغرام",    handle: "@x90ar_",     href: "https://www.instagram.com/x90ar_?igsh=MXdrMjYwMTdodDJmNg%3D%3D&utm_source=qr",            color: "#e1306c" },
  { icon: Ghost,          label: "سناب شات",    handle: "Snapchat",    href: "https://snapchat.com/t/RmpeWTPE",                                                             color: "#fffc00" },
  { icon: Send,           label: "تيليجرام",    handle: "@x7abo123",   href: "https://t.me/x7abo123",                                                                       color: "#2aabee" },
  { icon: MessageCircle,  label: "واتس آب",     handle: "+201080672974",href: "https://wa.me/201080672974",                                                                   color: "#25d366" },
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    // Track contact form submit
    trackContactFormSubmit({
      inquiry_type: data.inquiryType,
      budget_range: data.budget,
      timeline_range: data.timeline,
    });

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setDone(true);
      reset();
      toast.success("تم إرسال رسالتك بنجاح! سأرد عليك قريبًا.");
    } catch {
      toast.error("حدث خطأ، يرجى المحاولة مرة أخرى");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="pt-20">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(147,51,234,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 mb-6">
              <MessageSquare className="w-3 h-3 text-purple-400" />
              <span className="text-purple-400 text-xs font-medium">تواصل</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">لنبني مشروعك معًا</h1>
            <p className="text-[#a0a0b8] text-xl max-w-2xl mx-auto leading-relaxed">
              هل لديك مشروع أو فكرة؟ أخبرني بالتفاصيل وسأرد عليك خلال 24 ساعة برؤية واضحة وعرض سعر.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10">
          {/* Form */}
          <div className="md:col-span-3">
            <AnimatedSection>
              {done ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="card-base p-10 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-[#a0a0b8] mb-2">شكرًا لتواصلك! إليك ما سيحدث الآن:</p>
                  <div className="text-right space-y-2 mb-6 text-sm text-[#9090b0]">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>سأراجع رسالتك خلال الساعات القادمة</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>سأرد عليك خلال 24 ساعة برؤية واضحة</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>إذا كان مشروعًا، سأرسل لك عرض سعر تفصيلي</span>
                    </div>
                  </div>
                  <button onClick={() => setDone(false)} className="btn-outline">
                    إرسال رسالة أخرى
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="card-base p-8 space-y-5"
                  onFocus={() => {
                    if (!formStarted) {
                      trackContactFormStart();
                      setFormStarted(true);
                    }
                  }}>
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-white mb-2">أرسل رسالة</h2>
                    <p className="text-sm text-[#8888a8]">سأرد عليك خلال 24 ساعة برؤية واضحة لمشروعك. الحقول الإضافية تساعدني في تقديم عرض أدق.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#a0a0b8] mb-1.5">الاسم الكامل *</label>
                      <input {...register("name")} placeholder="اسمك الكامل"
                        className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-[#a0a0b8] mb-1.5">البريد الإلكتروني *</label>
                      <input {...register("email")} type="email" placeholder="email@example.com" dir="ltr"
                        className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#a0a0b8] mb-1.5">رقم الهاتف</label>
                      <input {...register("phone")} type="tel" placeholder="اختياري" dir="ltr"
                        className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm text-[#a0a0b8] mb-1.5">الموضوع *</label>
                      <input {...register("subject")} placeholder="موضوع رسالتك"
                        className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
                      {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 pt-2 pb-2 border-t border-[#1a1a2e]/50">
                    <div>
                      <label className="block text-sm text-[#a0a0b8] mb-1.5">نوع الاستفسار</label>
                      <select {...register("inquiryType")}
                        className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors">
                        <option value="">اختياري</option>
                        <option value="product">شراء منتج</option>
                        <option value="service">طلب خدمة</option>
                        <option value="consultation">استشارة</option>
                        <option value="support">دعم فني</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-[#a0a0b8] mb-1.5">الميزانية التقريبية</label>
                      <select {...register("budget")}
                        className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors">
                        <option value="">اختياري</option>
                        <option value="under-5k">أقل من 5,000 ج.م</option>
                        <option value="5k-15k">5,000 - 15,000 ج.م</option>
                        <option value="15k-30k">15,000 - 30,000 ج.م</option>
                        <option value="30k-plus">أكثر من 30,000 ج.م</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-[#a0a0b8] mb-1.5">الإطار الزمني</label>
                      <select {...register("timeline")}
                        className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors">
                        <option value="">اختياري</option>
                        <option value="urgent">عاجل (أسبوع)</option>
                        <option value="soon">قريب (2-4 أسابيع)</option>
                        <option value="flexible">مرن (شهر+)</option>
                        <option value="planning">مجرد تخطيط</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#a0a0b8] mb-1.5">الرسالة *</label>
                    <textarea {...register("message")} rows={5} placeholder="اكتب رسالتك هنا..."
                      className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors resize-none" />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <button type="submit" disabled={submitting}
                    className="btn-primary w-full justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? (
                      <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />جاري الإرسال...</>
                    ) : (
                      <><Send className="w-4 h-4" />إرسال الرسالة</>
                    )}
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-2 space-y-5">
            <AnimatedSection delay={0.1}>
              <div className="card-base p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">البريد الإلكتروني</div>
                    <a href="mailto:abed@abud.fun" className="text-[#a0a0b8] text-xs hover:text-purple-400 transition-colors" dir="ltr">abed@abud.fun</a>
                  </div>
                </div>
                <p className="text-[#808090] text-xs">⚡ رد سريع خلال 24 ساعة • 100% خصوصية</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="card-base p-6">
                <h3 className="text-white font-semibold text-sm mb-4">تواصل عبر المنصات</h3>
                <div className="space-y-3">
                  {socials.map(({ icon: Icon, label, handle, href, color }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 transition-all group"
                      style={{ color: "#a0a0b8" }}
                      onMouseEnter={e => (e.currentTarget.style.color = color)}
                      onMouseLeave={e => (e.currentTarget.style.color = "#a0a0b8")}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                        style={{ background: "#1a1a2e" }}
                        onMouseEnter={e => (e.currentTarget.style.background = `${color}18`)}
                        onMouseLeave={e => (e.currentTarget.style.background = "#1a1a2e")}>
                        <Icon className="w-4 h-4" style={{ color: "inherit" }} />
                      </div>
                      <div>
                        <div className="text-xs font-medium">{label}</div>
                        <div className="text-[#606080] text-xs" dir="ltr">{handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="card-base p-6 bg-[radial-gradient(ellipse_at_top,rgba(147,51,234,0.08)_0%,transparent_70%)]">
                <h3 className="text-white font-semibold text-sm mb-2">تواصل عبر واتساب</h3>
                <p className="text-[#a0a0b8] text-xs mb-4 leading-relaxed">للمشاريع العاجلة والاستفسارات السريعة</p>
                <a href="https://wa.me/201080672974" target="_blank" rel="noopener noreferrer"
                  className="btn-primary text-sm py-2.5 w-full justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  ابدأ محادثة
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
