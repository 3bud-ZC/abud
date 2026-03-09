"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CreditCard, Save } from "lucide-react";

interface PaymentSetting {
  id?: string; method: string; instructions: string;
  destination?: string; label?: string; isActive: boolean;
}

const methods = [
  { key: "vodafone_cash", label: "فودافون كاش", icon: "📱" },
  { key: "instapay", label: "إنستاباي", icon: "💳" },
  { key: "paypal", label: "PayPal", icon: "🌐" },
];

export default function AdminPaymentsPage() {
  const [settings, setSettings] = useState<Record<string, PaymentSetting>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const res = await fetch("/api/payments/settings");
      const data = await res.json();
      const map: Record<string, PaymentSetting> = {};
      for (const s of (data.settings || [])) map[s.method] = s;
      for (const m of methods) {
        if (!map[m.key]) map[m.key] = { method: m.key, instructions: "", destination: "", label: m.label, isActive: false };
      }
      setSettings(map);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }

  async function handleSave(method: string) {
    setSaving(method);
    try {
      const res = await fetch("/api/payments/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings[method]),
      });
      if (!res.ok) throw new Error();
      toast.success("تم الحفظ");
    } catch { toast.error("فشل الحفظ"); }
    finally { setSaving(null); }
  }

  function update(method: string, field: string, value: string | boolean) {
    setSettings(prev => ({ ...prev, [method]: { ...prev[method], [field]: value } }));
  }

  if (loading) return <div className="p-8 text-center"><div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-black text-white flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-purple-400" />
        إعدادات الدفع
      </h1>

      <div className="space-y-4">
        {methods.map(({ key, label, icon }) => {
          const s = settings[key] || { method: key, instructions: "", accountNumber: "", accountName: "", isActive: false };
          return (
            <div key={key} className="card-base p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <h2 className="text-white font-bold">{label}</h2>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-sm text-[#a0a0b8]">نشط</span>
                  <div className={`w-10 h-6 rounded-full transition-colors ${s.isActive ? "bg-purple-600" : "bg-[#2a2a3e]"}`}
                    onClick={() => update(key, "isActive", !s.isActive)}>
                    <div className={`w-4 h-4 rounded-full bg-white m-1 transition-transform ${s.isActive ? "translate-x-4" : ""}`} />
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-xs text-[#808090] mb-1">رقم الحساب / البريد الإلكتروني / رابط الدفع</label>
                <input type="text" dir="ltr" value={s.destination || ""}
                  onChange={e => update(key, "destination", e.target.value)}
                  placeholder="01xxxxxxxxx أو email@domain.com"
                  className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-xs text-[#808090] mb-1">تعليمات الدفع</label>
                <textarea rows={3} value={s.instructions}
                  onChange={e => update(key, "instructions", e.target.value)}
                  placeholder="الخطوات التي يجب على العميل اتباعها لإتمام الدفع..."
                  className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors resize-none" />
              </div>

              <div className="flex justify-end">
                <button onClick={() => handleSave(key)} disabled={saving === key}
                  className="btn-primary text-sm gap-1.5 disabled:opacity-60">
                  {saving === key ? <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  حفظ
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
