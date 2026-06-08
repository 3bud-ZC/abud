"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Send } from "lucide-react";
import { trackContactFormStart, trackContactFormSubmit } from "@/lib/analytics";
import HolographicCard from "@/components/effects/HolographicCard";

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

interface ContactFormClientProps {
  initialSubject?: string;
  initialMessage?: string;
  fallbackEmail: string;
}

export default function ContactFormClient({
  initialSubject,
  initialMessage,
  fallbackEmail,
}: ContactFormClientProps) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: initialSubject || "",
      message: initialMessage || "",
    },
  });

  async function onSubmit(data: FormData) {
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

      if (!res.ok) {
        throw new Error("submit_failed");
      }

      setDone(true);
      reset({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        budget: "",
        timeline: "",
        subject: initialSubject || "",
        message: initialMessage || "",
      });
      toast.success("تم إرسال رسالتك بنجاح! هرد عليك قريبًا.");
    } catch {
      toast.error(
        `تعذر الإرسال الآن. تقدر تتواصل مباشرة على البريد: ${fallbackEmail}`
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <HolographicCard duration={5}>
        <div className="p-8 text-center">
          <h3 className="text-2xl font-black text-white mb-2">تم إرسال رسالتك ✅</h3>
          <p className="text-[#a0a0b8] mb-5">هراجع التفاصيل وأرجع لك بخطة مبدئية وتكلفة تقريبية.</p>
          <button onClick={() => setDone(false)} className="btn-outline">
            إرسال رسالة أخرى
          </button>
        </div>
      </HolographicCard>
    );
  }

  return (
    <HolographicCard duration={6}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 space-y-5"
        onFocus={() => {
          if (!formStarted) {
            trackContactFormStart();
            setFormStarted(true);
          }
        }}
      >
        <div className="mb-2">
          <h2 className="text-xl font-bold text-white mb-2">طلب مشروع / استفسار</h2>
          <p className="text-sm text-[#8888a8]">املأ البيانات الأساسية، ولو تحب التفاصيل الدقيقة ابعت مباشرة على واتساب أو تيليجرام.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[#a0a0b8] mb-1.5">الاسم الكامل *</label>
            <input
              {...register("name")}
              placeholder="اسمك الكامل"
              className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-[#a0a0b8] mb-1.5">البريد الإلكتروني *</label>
            <input
              {...register("email")}
              type="email"
              placeholder="email@example.com"
              dir="ltr"
              className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[#a0a0b8] mb-1.5">رقم الهاتف</label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="اختياري"
              dir="ltr"
              className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-[#a0a0b8] mb-1.5">الموضوع *</label>
            <input
              {...register("subject")}
              placeholder="مثال: تطوير موقع شركة"
              className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors"
            />
            {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 pt-2 pb-2 border-t border-[#1a1a2e]/50">
          <div>
            <label className="block text-sm text-[#a0a0b8] mb-1.5">نوع الطلب</label>
            <select
              {...register("inquiryType")}
              className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
            >
              <option value="">اختياري</option>
              <option value="service">طلب خدمة</option>
              <option value="consultation">استشارة</option>
              <option value="support">دعم فني</option>
              <option value="other">أخرى</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[#a0a0b8] mb-1.5">الميزانية</label>
            <select
              {...register("budget")}
              className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
            >
              <option value="">اختياري</option>
              <option value="under-5k">أقل من 5,000 ج.م</option>
              <option value="5k-15k">5,000 - 15,000 ج.م</option>
              <option value="15k-30k">15,000 - 30,000 ج.م</option>
              <option value="30k-plus">أكثر من 30,000 ج.م</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[#a0a0b8] mb-1.5">المدة المتوقعة</label>
            <select
              {...register("timeline")}
              className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
            >
              <option value="">اختياري</option>
              <option value="urgent">عاجل (أسبوع)</option>
              <option value="soon">قريب (2-4 أسابيع)</option>
              <option value="flexible">مرن (شهر+)</option>
              <option value="planning">في مرحلة التخطيط</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-[#a0a0b8] mb-1.5">تفاصيل المشروع *</label>
          <textarea
            {...register("message")}
            rows={6}
            placeholder="اكتب فكرتك، هدف المشروع، والمشكلة اللي محتاج تحلها..."
            className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors resize-none"
          />
          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary btn-glow w-full justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              جاري الإرسال...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              إرسال الطلب
            </>
          )}
        </button>
      </form>
    </HolographicCard>
  );
}
