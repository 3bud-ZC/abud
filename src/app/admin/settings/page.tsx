"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Settings, Save } from "lucide-react";

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

export default function AdminSettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setValues(data.settings || {});
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

  if (loading) return <div className="p-8 text-center"><div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-5 max-w-2xl">
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
  );
}
