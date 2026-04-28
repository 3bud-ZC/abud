"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Settings, Save, KeyRound, User } from "lucide-react";

const settingFields = [
  { key: "site_title", label: "عنوان الموقع", placeholder: "ABUD Platform" },
  { key: "site_description", label: "وصف الموقع", placeholder: "متجر رقمي..." },
  { key: "site_email", label: "البريد الإلكتروني", placeholder: "contact@abud.com", dir: "ltr" },
  { key: "site_phone", label: "رقم الهاتف", placeholder: "+20 1xx xxx xxxx", dir: "ltr" },
  { key: "whatsapp_number", label: "رقم واتساب", placeholder: "+20 1xx xxx xxxx", dir: "ltr" },
  { key: "social_twitter", label: "تويتر (X)", placeholder: "https://x.com/...", dir: "ltr" },
  { key: "social_github", label: "GitHub", placeholder: "https://github.com/...", dir: "ltr" },
  { key: "social_linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/...", dir: "ltr" },
  { key: "social_instagram", label: "Instagram", placeholder: "https://instagram.com/...", dir: "ltr" },
];

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
    if (newPassword.length < 4) {
      toast.error("كلمة المرور الجديدة قصيرة (على الأقل 4 حروف)");
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

        <div className="card-base p-5 space-y-4">
          {settingFields.map(({ key, label, placeholder, dir }) => (
            <div key={key}>
              <label className="block text-sm text-[#a0a0b8] mb-1">{label}</label>
              <input
                type="text"
                placeholder={placeholder}
                dir={dir}
                value={values[key] || ""}
                onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors"
              />
            </div>
          ))}
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
