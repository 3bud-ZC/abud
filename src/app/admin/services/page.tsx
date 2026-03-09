"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Briefcase, Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { generateSlug } from "@/lib/utils";

interface Service {
  id: string; title: string; slug: string; description: string;
  longDesc?: string; icon?: string; priceType: string; price?: number;
  ctaLabel?: string; featured: boolean; isActive: boolean;
}

const emptyForm = {
  title: "", slug: "", description: "", longDesc: "", icon: "",
  priceType: "fixed", price: "", ctaLabel: "", featured: false, isActive: true,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data.services || []);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }

  function openCreate() { setForm(emptyForm); setEditing(null); setModal("create"); }
  function openEdit(s: Service) {
    setForm({
      title: s.title, slug: s.slug, description: s.description,
      longDesc: s.longDesc || "", icon: s.icon || "",
      priceType: s.priceType, price: s.price ? String(s.price) : "",
      ctaLabel: s.ctaLabel || "", featured: s.featured, isActive: s.isActive,
    });
    setEditing(s); setModal("edit");
  }

  async function handleSave() {
    if (!form.title || !form.description) { toast.error("العنوان والوصف مطلوبان"); return; }
    setSaving(true);
    try {
      const body = {
        title: form.title,
        slug: form.slug || generateSlug(form.title),
        description: form.description,
        longDesc: form.longDesc || null,
        icon: form.icon || null,
        priceType: form.priceType,
        price: form.price ? parseFloat(form.price) : null,
        ctaLabel: form.ctaLabel || null,
        featured: form.featured,
        isActive: form.isActive,
      };
      const url = modal === "edit" && editing ? `/api/services/${editing.slug}` : "/api/services";
      const method = modal === "edit" ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error();
      toast.success(modal === "edit" ? "تم التحديث" : "تم الإنشاء");
      setModal(null); loadData();
    } catch { toast.error("حدث خطأ"); }
    finally { setSaving(false); }
  }

  async function handleDelete(slug: string) {
    if (!confirm("تأكيد الحذف؟")) return;
    try { await fetch(`/api/services/${slug}`, { method: "DELETE" }); toast.success("تم الحذف"); loadData(); }
    catch { toast.error("فشل الحذف"); }
  }

  const F = (k: keyof typeof emptyForm, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const priceTypeLabels: Record<string, string> = { fixed: "سعر ثابت", hourly: "بالساعة", request: "بالطلب", free: "مجاني" };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-white flex items-center gap-2"><Briefcase className="w-5 h-5 text-purple-400" />الخدمات</h1>
        <button onClick={openCreate} className="btn-primary text-sm gap-1.5"><Plus className="w-4 h-4" />خدمة جديدة</button>
      </div>

      <div className="card-base overflow-hidden">
        {loading ? <div className="p-8 text-center"><div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin mx-auto" /></div>
          : services.length === 0 ? <div className="p-8 text-center text-[#a0a0b8] text-sm">لا توجد خدمات</div>
          : (
            <div className="divide-y divide-[#1a1a2e]">
              {services.map(s => (
                <div key={s.id} className="flex items-center justify-between px-5 py-3 hover:bg-[#0d0d18] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/15 flex items-center justify-center text-xl">{s.icon || "⚡"}</div>
                    <div>
                      <div className="text-white text-sm font-medium">{s.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {s.price && <span className="text-purple-400 text-xs">{s.price} ج.م</span>}
                        <span className="text-xs text-[#606080]">{priceTypeLabels[s.priceType] || s.priceType}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full border ${s.isActive ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-[#808090] bg-[#1a1a2e] border-[#2a2a3e]"}`}>
                          {s.isActive ? "نشط" : "مخفي"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(s)} className="p-2 rounded-lg text-[#808090] hover:text-purple-400 hover:bg-purple-600/10 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(s.slug)} className="p-2 rounded-lg text-[#808090] hover:text-red-400 hover:bg-red-600/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#080810] border border-[#1a1a2e] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[#1a1a2e]">
              <h2 className="text-white font-bold">{modal === "edit" ? "تعديل الخدمة" : "خدمة جديدة"}</h2>
              <button onClick={() => setModal(null)} className="text-[#606080] hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: "العنوان *", key: "title", placeholder: "اسم الخدمة" },
                { label: "الـ Slug", key: "slug", placeholder: "سيُولَّد تلقائيًا", dir: "ltr" },
                { label: "الأيقونة (emoji)", key: "icon", placeholder: "⚡" },
                { label: "تسمية CTA", key: "ctaLabel", placeholder: "مثال: يبدأ من" },
              ].map(({ label, key, placeholder, dir }) => (
                <div key={key}>
                  <label className="block text-sm text-[#a0a0b8] mb-1">{label}</label>
                  <input type="text" placeholder={placeholder} dir={dir}
                    value={(form as Record<string, unknown>)[key] as string}
                    onChange={e => F(key as keyof typeof emptyForm, e.target.value)}
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-1">نوع السعر</label>
                  <select value={form.priceType} onChange={e => F("priceType", e.target.value)}
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-colors">
                    <option value="fixed">ثابت</option>
                    <option value="hourly">بالساعة</option>
                    <option value="request">بالطلب</option>
                    <option value="free">مجاني</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-1">السعر</label>
                  <input type="number" placeholder="0.00" dir="ltr" value={form.price}
                    onChange={e => F("price", e.target.value)}
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#a0a0b8] mb-1">الوصف القصير *</label>
                <textarea rows={2} placeholder="وصف مختصر للخدمة" value={form.description}
                  onChange={e => F("description", e.target.value)}
                  className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors resize-none" />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0b8] mb-1">الوصف التفصيلي / المميزات</label>
                <textarea rows={4} placeholder="مميزات الخدمة والتفاصيل الكاملة..." value={form.longDesc}
                  onChange={e => F("longDesc", e.target.value)}
                  className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors resize-none" />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => F("featured", e.target.checked)} className="w-4 h-4 accent-purple-600" />
                  <span className="text-sm text-[#a0a0b8]">مميز</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={e => F("isActive", e.target.checked)} className="w-4 h-4 accent-purple-600" />
                  <span className="text-sm text-[#a0a0b8]">نشط</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-[#1a1a2e]">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center gap-2 disabled:opacity-60">
                {saving ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Save className="w-4 h-4" />}حفظ
              </button>
              <button onClick={() => setModal(null)} className="btn-outline flex-1 justify-center">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
