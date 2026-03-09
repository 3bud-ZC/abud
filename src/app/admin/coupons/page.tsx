"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tag, Plus, Trash2, ToggleLeft, ToggleRight, X, Loader2, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  isActive: boolean;
  usageLimit: number | null;
  usageCount: number;
  expiresAt: string | null;
  createdAt: string;
}

interface NewCoupon {
  code: string;
  discount: string;
  usageLimit: string;
  expiresAt: string;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<NewCoupon>({ code: "", discount: "", usageLimit: "", expiresAt: "" });

  async function load() {
    try {
      const res = await fetch("/api/coupons");
      const data = await res.json();
      setCoupons(data.coupons || []);
    } catch { setCoupons([]); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.code || !form.discount) return;
    setSaving(true);
    try {
      await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: form.code,
          discount: Number(form.discount),
          usageLimit: form.usageLimit ? Number(form.usageLimit) : null,
          expiresAt: form.expiresAt || null,
        }),
      });
      setForm({ code: "", discount: "", usageLimit: "", expiresAt: "" });
      setShowForm(false);
      load();
    } finally { setSaving(false); }
  }

  async function toggleActive(c: Coupon) {
    await fetch("/api/coupons", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id, isActive: !c.isActive }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("حذف هذا الكوبون؟")) return;
    await fetch("/api/coupons", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(147,51,234,0.15)", border: "1px solid rgba(147,51,234,0.25)" }}>
            <Tag className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h1 className="text-white font-black text-xl">كوبونات الخصم</h1>
            <p className="text-xs" style={{ color: "#505070" }}>{coupons.length} كوبون</p>
          </div>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="btn-primary gap-2 text-sm py-2 px-4">
          <Plus className="w-4 h-4" />
          كوبون جديد
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold">إنشاء كوبون جديد</h2>
            <button onClick={() => setShowForm(false)} className="text-[#606070] hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <form onSubmit={handleCreate} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#8080a0" }}>كود الخصم *</label>
              <input value={form.code}
                onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                placeholder="مثال: SAVE20"
                dir="ltr"
                required
                className="w-full admin-input font-mono" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#8080a0" }}>نسبة الخصم % *</label>
              <input value={form.discount}
                onChange={e => setForm(p => ({ ...p, discount: e.target.value }))}
                type="number" min="1" max="100" placeholder="20" required
                className="w-full admin-input" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#8080a0" }}>حد الاستخدام (اختياري)</label>
              <input value={form.usageLimit}
                onChange={e => setForm(p => ({ ...p, usageLimit: e.target.value }))}
                type="number" min="1" placeholder="غير محدود"
                className="w-full admin-input" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#8080a0" }}>تاريخ الانتهاء (اختياري)</label>
              <input value={form.expiresAt}
                onChange={e => setForm(p => ({ ...p, expiresAt: e.target.value }))}
                type="datetime-local"
                className="w-full admin-input" />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)}
                className="btn-outline text-sm py-2 px-4">إلغاء</button>
              <button type="submit" disabled={saving}
                className="btn-primary gap-2 text-sm py-2 px-5">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                حفظ
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
        </div>
      ) : coupons.length === 0 ? (
        <div className="text-center py-20" style={{ color: "#505070" }}>
          <Tag className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>لا توجد كوبونات بعد</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {coupons.map(c => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-4 flex flex-wrap items-center gap-4"
            >
              <div className="flex-1 min-w-0 flex items-center gap-3">
                <span className="font-mono font-black text-sm"
                  style={{ color: c.isActive ? "#c084fc" : "#404060" }}>
                  {c.code}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    background: "rgba(147,51,234,0.12)",
                    border: "1px solid rgba(147,51,234,0.2)",
                    color: "#a78bfa",
                  }}>
                  {c.discount}% خصم
                </span>
                {!c.isActive && (
                  <span className="px-2 py-0.5 rounded-full text-xs"
                    style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                    معطل
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs" style={{ color: "#505070" }}>
                <span>الاستخدام: {c.usageCount}{c.usageLimit ? `/${c.usageLimit}` : ""}</span>
                {c.expiresAt && <span>ينتهي: {formatDate(c.expiresAt)}</span>}
                <span>تاريخ الإنشاء: {formatDate(c.createdAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => toggleActive(c)} title={c.isActive ? "تعطيل" : "تفعيل"}
                  className="text-[#606070] hover:text-purple-400 transition-colors">
                  {c.isActive
                    ? <ToggleRight className="w-5 h-5 text-purple-400" />
                    : <ToggleLeft className="w-5 h-5" />}
                </button>
                <button onClick={() => handleDelete(c.id)} title="حذف"
                  className="text-[#606070] hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
