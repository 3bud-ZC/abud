"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Settings, Save, KeyRound, User } from "lucide-react";
import { isStrongPassword, PASSWORD_POLICY_MESSAGE } from "@/lib/password-policy";
import ImageCropUploader from "@/components/admin/ImageCropUploader";

const SITE_FIELDS = [
  { key: "site_title", label: "عنوان الموقع", placeholder: "ABUD Platform" },
  { key: "site_description", label: "وصف الموقع", placeholder: "متجر رقمي..." },
];

const CONTACT_FIELDS = [
  { key: "site_email", label: "البريد الإلكتروني", placeholder: "contact@abud.com", dir: "ltr" },
  { key: "site_phone", label: "رقم الهاتف", placeholder: "+20 1xx xxx xxxx", dir: "ltr" },
  { key: "whatsapp_number", label: "رقم واتساب", placeholder: "+20 1xx xxx xxxx", dir: "ltr" },
];

const SOCIAL_FIELDS = [
  { key: "social_twitter", label: "تويتر (X)", placeholder: "https://x.com/...", dir: "ltr" },
  { key: "social_github", label: "GitHub", placeholder: "https://github.com/...", dir: "ltr" },
  { key: "social_linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/...", dir: "ltr" },
  { key: "social_instagram", label: "Instagram", placeholder: "https://instagram.com/...", dir: "ltr" },
];

const ABOUT_FIELDS = [
  { key: "about_name", label: "الاسم", placeholder: "Abud" },
  { key: "about_role", label: "الوظيفة / الدور", placeholder: "Full-Stack Developer · AI & Automation Engineer" },
  { key: "about_intro", label: "نبذة تعريفية", placeholder: "أحوّل أفكار المشاريع إلى منتجات رقمية..." },
  { key: "about_status_badge", label: "شارة الحالة", placeholder: "متاح للمشاريع الجديدة" },
  { key: "about_location", label: "الموقع", placeholder: "القاهرة، مصر · UTC+3" },
  { key: "about_experience", label: "الخبرة", placeholder: "6+ سنوات خبرة عملية" },
  { key: "about_cv_url", label: "رابط السيرة الذاتية", placeholder: "/cv-abud.pdf", dir: "ltr" },
  { key: "about_profile_image", label: "رابط صورة البروفايل", placeholder: "/uploads/your-image.jpg", dir: "ltr" },
  { key: "about_profile_image_position", label: "مكان الصورة (object-position)", placeholder: "58% 65%", dir: "ltr" },
];

interface FieldDef {
  key: string;
  label: string;
  placeholder: string;
  dir?: string;
}

function FieldGroup({ title, fields, values, onChange }: {
  title: string;
  fields: FieldDef[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-white font-bold text-sm">{title}</h3>
      <div className="space-y-3">
        {fields.map(({ key, label, placeholder, dir }) => (
          <div key={key}>
            <label className="block text-sm text-[#a0a0b8] mb-1">{label}</label>
            <input
              type="text"
              placeholder={placeholder}
              dir={dir}
              value={values[key] || ""}
              onChange={(e) => onChange(key, e.target.value)}
              className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface AdminInfo {
  id: string;
  name: string;
  email: string;
  username: string | null;
  createdAt: string;
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const [sRes, mRes] = await Promise.all([
        fetch("/api/settings"),
        fetch("/api/auth/me"),
      ]);
      const sData = await sRes.json();
      const mData = await mRes.json();
      setValues(sData.settings || {});
      setAdmin(mData.admin || null);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      toast.success("تم حفظ الإعدادات");
    } catch { toast.error("فشل الحفظ"); }
    finally { setSaving(false); }
  }

  async function handleChangePassword() {
    if (!currentPassword || !newPassword) {
      toast.error("املأ الحقول كلها");
      return;
    }
    if (!isStrongPassword(newPassword)) {
      toast.error(PASSWORD_POLICY_MESSAGE);
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }
    setChangingPassword(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "فشل تغيير كلمة المرور");
        return;
      }
      toast.success("تم تغيير كلمة المرور ─ سجّل الدخول من جديد");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      setTimeout(() => router.push("/admin/login"), 1200);
    } catch {
      toast.error("حدث خطأ");
    } finally {
      setChangingPassword(false);
    }
  }

  if (loading) return <div className="p-8 text-center"><div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Site settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-400" />
            إعدادات الموقع
          </h1>
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm gap-1.5 disabled:opacity-60">
            {saving ? <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            حفظ الكل
          </button>
        </div>

        <div className="card-base p-5 space-y-6">
          <div>
            <label className="block text-sm text-[#a0a0b8] mb-2">رفع وقص صورة صفحة من أنا</label>
            <ImageCropUploader
              value={values.about_profile_image}
              onUploaded={(url) => setValues((v) => ({ ...v, about_profile_image: url }))}
            />
            <p className="text-[#606080] text-xs mt-2">
              يمكنك بعدها تعديل مكان ظهورها من حقل "مكان الصورة" (مثال: 58% 65%).
            </p>
          </div>

          <FieldGroup title="معلومات الموقع" fields={SITE_FIELDS} values={values} onChange={(k, v) => setValues((prev) => ({ ...prev, [k]: v }))} />
          <FieldGroup title="بيانات التواصل" fields={CONTACT_FIELDS} values={values} onChange={(k, v) => setValues((prev) => ({ ...prev, [k]: v }))} />
          <FieldGroup title="روابط السوشيال ميديا" fields={SOCIAL_FIELDS} values={values} onChange={(k, v) => setValues((prev) => ({ ...prev, [k]: v }))} />
          <FieldGroup title="صفحة من أنا" fields={ABOUT_FIELDS} values={values} onChange={(k, v) => setValues((prev) => ({ ...prev, [k]: v }))} />
        </div>
      </div>

      {/* Admin account */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <User className="w-5 h-5 text-purple-400" />
          حساب الادمن
        </h2>

        {admin && (
          <div className="card-base p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-[#606080] text-xs mb-1">اسم المستخدم</div>
                <div className="text-white font-mono" dir="ltr">{admin.username || "—"}</div>
              </div>
              <div>
                <div className="text-[#606080] text-xs mb-1">البريد</div>
                <div className="text-white font-mono" dir="ltr">{admin.email}</div>
              </div>
            </div>
          </div>
        )}

        <div className="card-base p-5 space-y-4">
          <h3 className="text-white font-bold text-sm flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-purple-400" />
            تغيير كلمة المرور
          </h3>
          <div>
            <label className="block text-sm text-[#a0a0b8] mb-1">كلمة المرور الحالية</label>
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              dir="ltr"
              autoComplete="current-password"
              className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-[#a0a0b8] mb-1">كلمة المرور الجديدة</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              dir="ltr"
              autoComplete="new-password"
              className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-[#a0a0b8] mb-1">تأكيد كلمة المرور</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              dir="ltr"
              autoComplete="new-password"
              className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors"
            />
          </div>
          <button
            onClick={handleChangePassword}
            disabled={changingPassword}
            className="btn-primary text-sm gap-1.5 disabled:opacity-60"
          >
            {changingPassword
              ? <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              : <KeyRound className="w-3.5 h-3.5" />
            }
            تحديث كلمة المرور
          </button>
          <p className="text-[#606080] text-xs">
            ⚠️ بعد التحديث، سيتم تسجيل خروجك تلقائيًا ─ سجّل الدخول مرة أخرى بكلمة المرور الجديدة.
          </p>
        </div>
      </div>
    </div>
  );
}
