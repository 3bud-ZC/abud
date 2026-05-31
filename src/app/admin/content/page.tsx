"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Save, Upload, FileText, ExternalLink } from "lucide-react";

type FieldDef = { key: string; label: string; placeholder?: string; dir?: "ltr" | "rtl" };

const homeFields: FieldDef[] = [
  { key: "brand_name", label: "اسم البراند", placeholder: "ABUD" },
  { key: "home_hero_badge", label: "شارة الهيرو", placeholder: "مطوّر Full-Stack • أدوات AI" },
  { key: "home_hero_title", label: "عنوان الهيرو", placeholder: "خدمات تطوير وذكاء اصطناعي وأتمتة" },
  { key: "home_hero_subtitle", label: "وصف الهيرو", placeholder: "وصف مختصر يظهر تحت العنوان" },
  { key: "home_hero_primary_text", label: "نص الزر الأساسي", placeholder: "استعرض خدماتي" },
  { key: "home_hero_primary_link", label: "رابط الزر الأساسي", placeholder: "/services", dir: "ltr" },
  { key: "home_hero_secondary_text", label: "نص الزر الثانوي", placeholder: "طلب خدمة مخصصة" },
  { key: "home_hero_secondary_link", label: "رابط الزر الثانوي", placeholder: "/contact", dir: "ltr" },
  { key: "home_about_title", label: "عنوان قسم من أنا في الهوم", placeholder: "أبني الأفكار وأحوّلها لواقع رقمي" },
  { key: "home_about_desc", label: "وصف قسم من أنا في الهوم", placeholder: "وصف مختصر" },
  { key: "home_final_cta_title", label: "عنوان CTA النهائي", placeholder: "جاهز لبناء مشروعك الرقمي؟" },
  { key: "home_final_cta_desc", label: "وصف CTA النهائي", placeholder: "وصف CTA النهائي" },
  { key: "home_final_cta_primary_text", label: "زر CTA الأساسي", placeholder: "تواصل معاي" },
  { key: "home_final_cta_primary_link", label: "رابط CTA الأساسي", placeholder: "/contact", dir: "ltr" },
  { key: "home_final_cta_secondary_text", label: "زر CTA الثانوي", placeholder: "استعرض الخدمات" },
  { key: "home_final_cta_secondary_link", label: "رابط CTA الثانوي", placeholder: "/services", dir: "ltr" },
];

const aboutFields: FieldDef[] = [
  { key: "about_name", label: "الاسم في صفحة من أنا", placeholder: "Abud" },
  { key: "about_role", label: "المسمى الوظيفي", placeholder: "Full-Stack Developer • AI Engineer" },
  { key: "about_intro", label: "نبذة شخصية", placeholder: "نبذة تظهر في صفحة من أنا" },
  { key: "about_status_badge", label: "شارة الحالة", placeholder: "متاح للمشاريع الجديدة" },
  { key: "about_location", label: "الموقع", placeholder: "القاهرة، مصر • UTC+3" },
  { key: "about_experience", label: "الخبرة", placeholder: "5+ سنوات خبرة" },
  { key: "about_cv_url", label: "رابط الـCV", placeholder: "/cv-abud.pdf", dir: "ltr" },
  { key: "about_profile_image", label: "رابط صورة من أنا", placeholder: "/uploads/profile.jpg", dir: "ltr" },
  { key: "about_profile_image_position", label: "مكان الصورة (object-position)", placeholder: "58% 65%", dir: "ltr" },
];

const socialFields: FieldDef[] = [
  { key: "social_github", label: "رابط GitHub", placeholder: "https://github.com/...", dir: "ltr" },
  { key: "social_linkedin", label: "رابط LinkedIn", placeholder: "https://linkedin.com/in/...", dir: "ltr" },
  { key: "social_twitter", label: "رابط X", placeholder: "https://x.com/...", dir: "ltr" },
  { key: "social_instagram", label: "رابط Instagram", placeholder: "https://instagram.com/...", dir: "ltr" },
  { key: "site_email", label: "إيميل التواصل", placeholder: "hello@abud.fun", dir: "ltr" },
  { key: "whatsapp_number", label: "رقم واتساب", placeholder: "2010xxxxxxxx", dir: "ltr" },
];

function Section({
  title,
  fields,
  values,
  onChange,
}: {
  title: string;
  fields: FieldDef[];
  values: Record<string, string>;
  onChange: (k: string, v: string) => void;
}) {
  return (
    <div className="card-base p-5 space-y-4">
      <h2 className="text-white font-bold text-sm">{title}</h2>
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block text-sm text-[#a0a0b8] mb-1">{f.label}</label>
          <input
            value={values[f.key] || ""}
            placeholder={f.placeholder}
            dir={f.dir}
            onChange={(e) => onChange(f.key, e.target.value)}
            className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors"
          />
        </div>
      ))}
    </div>
  );
}

export default function AdminContentPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setValues(data.settings || {});
      } catch {
        toast.error("تعذر تحميل المحتوى");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function updateValue(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("save_failed");
      toast.success("تم حفظ المحتوى بنجاح");
    } catch {
      toast.error("فشل حفظ المحتوى");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("context", "image");
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error("upload_failed");
      setValues((v) => ({ ...v, about_profile_image: data.url }));
      toast.success("تم رفع صورة من أنا");
    } catch {
      toast.error("فشل رفع الصورة");
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-400" />
          <h1 className="text-xl font-black text-white">إدارة محتوى الموقع</h1>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm gap-1.5 disabled:opacity-60">
          {saving ? <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          حفظ كل التعديلات
        </button>
      </div>

      <div className="card-base p-5 space-y-3">
        <h2 className="text-white font-bold text-sm">رفع صورة "من أنا"</h2>
        <div className="flex flex-wrap items-center gap-3">
          <label className="btn-outline text-sm cursor-pointer inline-flex items-center gap-2">
            <Upload className="w-4 h-4" />
            {uploading ? "جاري الرفع..." : "اختيار صورة ورفعها"}
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleUpload(file);
              }}
            />
          </label>
          {values.about_profile_image && (
            <span className="text-xs text-[#9090b0]" dir="ltr">{values.about_profile_image}</span>
          )}
        </div>
      </div>

      <Section title="الرئيسية (Home)" fields={homeFields} values={values} onChange={updateValue} />
      <Section title="صفحة من أنا (About)" fields={aboutFields} values={values} onChange={updateValue} />
      <Section title="روابط التواصل والسوشيال" fields={socialFields} values={values} onChange={updateValue} />

      <div className="card-base p-4 flex flex-wrap gap-3 text-sm">
        <Link href="/" target="_blank" className="btn-outline inline-flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          معاينة الرئيسية
        </Link>
        <Link href="/about" target="_blank" className="btn-outline inline-flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          معاينة من أنا
        </Link>
      </div>
    </div>
  );
}
