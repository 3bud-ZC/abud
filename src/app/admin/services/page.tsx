"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Briefcase, Plus, Pencil, Trash2, X, Save, ArrowDownUp } from "lucide-react";
import { generateSlug } from "@/lib/utils";
import { SERVICE_CATEGORIES, normalizeServiceCategory } from "@/lib/service-categories";
import {
  THEMED_ICONS,
  getThemedIconPreset,
  normalizeThemedIconKey,
  resolveServiceIconKey,
} from "@/lib/themed-icons";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDesc?: string | null;
  useCase?: string | null;
  icon?: string | null;
  priceType: string;
  price?: number | null;
  ctaLabel?: string | null;
  featured: boolean;
  isActive: boolean;
  order: number;
}

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  longDesc: "",
  useCase: "consulting",
  icon: "sparkles",
  priceType: "request",
  price: "",
  ctaLabel: "",
  featured: false,
  isActive: true,
  order: "",
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData() {
    try {
      const res = await fetch("/api/services?all=1", { cache: "no-store" });
      const data = await res.json();
      setServices(Array.isArray(data.services) ? data.services : []);
    } catch {
      toast.error("تعذر تحميل الخدمات");
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setForm(emptyForm);
    setEditing(null);
    setModal("create");
  }

  function openEdit(s: Service) {
    setForm({
      title: s.title,
      slug: s.slug,
      description: s.description || "",
      longDesc: s.longDesc || "",
      useCase: normalizeServiceCategory(s.useCase),
      icon: resolveServiceIconKey(s.icon, s.useCase),
      priceType: s.priceType || "request",
      price: s.price ? String(s.price) : "",
      ctaLabel: s.ctaLabel || "",
      featured: !!s.featured,
      isActive: !!s.isActive,
      order: Number.isFinite(s.order) ? String(s.order) : "",
    });
    setEditing(s);
    setModal("edit");
  }

  async function handleSave() {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("العنوان والوصف مطلوبان");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug: (form.slug || generateSlug(form.title)).trim(),
        description: form.description.trim(),
        longDesc: form.longDesc.trim() || null,
        useCase: normalizeServiceCategory(form.useCase),
        icon: normalizeThemedIconKey(form.icon, resolveServiceIconKey(null, form.useCase)),
        priceType: form.priceType,
        price: form.price.trim() ? parseFloat(form.price) : null,
        ctaLabel: form.ctaLabel.trim() || null,
        featured: form.featured,
        isActive: form.isActive,
        order: form.order.trim() ? parseInt(form.order, 10) : undefined,
      };

      const isEdit = modal === "edit" && editing;
      const url = isEdit ? `/api/services/${editing.slug}` : "/api/services";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "save_failed");
      }

      toast.success(isEdit ? "تم تحديث الخدمة" : "تم إضافة الخدمة");
      setModal(null);
      await loadData();
    } catch {
      toast.error("فشل حفظ الخدمة");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("هل تريد حذف الخدمة؟")) return;
    try {
      const res = await fetch(`/api/services/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete_failed");
      toast.success("تم حذف الخدمة");
      await loadData();
    } catch {
      toast.error("فشل حذف الخدمة");
    }
  }

  const setField = (key: keyof typeof emptyForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const groupedCounts = useMemo(() => {
    const map = new Map<string, number>();
    services.forEach((s) => {
      const category = normalizeServiceCategory(s.useCase);
      map.set(category, (map.get(category) || 0) + 1);
    });
    return map;
  }, [services]);

  const priceTypeLabels: Record<string, string> = {
    fixed: "سعر ثابت",
    hourly: "بالساعة",
    request: "حسب الطلب",
    free: "مجاني",
  };

  const activeIconPreset = getThemedIconPreset(form.icon, resolveServiceIconKey(null, form.useCase));
  const ActiveServiceIcon = activeIconPreset.icon;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-purple-400" />
          إدارة الخدمات
        </h1>
        <button onClick={openCreate} className="btn-primary text-sm gap-1.5">
          <Plus className="w-4 h-4" />
          خدمة جديدة
        </button>
      </div>

      <div className="card-base p-4">
        <div className="flex flex-wrap gap-2">
          {SERVICE_CATEGORIES.filter((c) => c.id !== "all").map((category) => (
            <span
              key={category.id}
              className="text-xs px-2.5 py-1 rounded-full border border-purple-600/25 bg-purple-600/10 text-purple-200"
            >
              {category.label}: {groupedCounts.get(category.id) || 0}
            </span>
          ))}
        </div>
      </div>

      <div className="card-base overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin mx-auto" />
          </div>
        ) : services.length === 0 ? (
          <div className="p-8 text-center text-[#a0a0b8] text-sm">لا توجد خدمات حتى الآن</div>
        ) : (
          <div className="divide-y divide-[#1a1a2e]">
            {services.map((s) => (
              <div key={s.id} className="flex items-center justify-between px-5 py-3 hover:bg-[#0d0d18] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  {(() => {
                    const iconPreset = getThemedIconPreset(resolveServiceIconKey(s.icon, s.useCase));
                    const ServiceIcon = iconPreset.icon;

                    return (
                      <div className="w-10 h-10 rounded-xl bg-purple-600/15 border border-purple-600/20 flex items-center justify-center">
                        <ServiceIcon className="w-5 h-5" style={{ color: iconPreset.color }} />
                      </div>
                    );
                  })()}
                  <div className="min-w-0">
                    <div className="text-white text-sm font-medium truncate">{s.title}</div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs text-purple-300">
                        {SERVICE_CATEGORIES.find((c) => c.id === normalizeServiceCategory(s.useCase))?.label || "استشارات"}
                      </span>
                      <span className="text-xs text-[#606080]">{priceTypeLabels[s.priceType] || s.priceType}</span>
                      {typeof s.price === "number" && <span className="text-xs text-[#a0a0b8]">{s.price} ج.م</span>}
                      <span className="text-xs text-[#606080] inline-flex items-center gap-1">
                        <ArrowDownUp className="w-3 h-3" />
                        {s.order}
                      </span>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full border ${
                          s.isActive
                            ? "text-green-400 bg-green-400/10 border-green-400/20"
                            : "text-[#808090] bg-[#1a1a2e] border-[#2a2a3e]"
                        }`}
                      >
                        {s.isActive ? "نشط" : "مخفي"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(s)}
                    className="p-2 rounded-lg text-[#808090] hover:text-purple-400 hover:bg-purple-600/10 transition-colors"
                    aria-label="تعديل"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => void handleDelete(s.slug)}
                    className="p-2 rounded-lg text-[#808090] hover:text-red-400 hover:bg-red-600/10 transition-colors"
                    aria-label="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#080810] border border-[#1a1a2e] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[#1a1a2e]">
              <h2 className="text-white font-bold">{modal === "edit" ? "تعديل الخدمة" : "إضافة خدمة"}</h2>
              <button onClick={() => setModal(null)} className="text-[#606080] hover:text-white" aria-label="إغلاق">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm text-[#a0a0b8] mb-1">العنوان *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                  placeholder="اسم الخدمة"
                  className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-1">الـ Slug</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={form.slug}
                    onChange={(e) => setField("slug", e.target.value)}
                    placeholder="auto-generated"
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-1">الفئة</label>
                  <select
                    value={form.useCase}
                    onChange={(e) => setField("useCase", e.target.value)}
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
                  >
                    {SERVICE_CATEGORIES.filter((c) => c.id !== "all").map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-1">أيقونة الخدمة (ثيم الموقع)</label>
                  <div className="rounded-xl border border-[#1a1a2e] bg-[#0d0d14] p-2">
                    <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto">
                      {THEMED_ICONS.map((preset) => {
                        const Icon = preset.icon;
                        const active = form.icon === preset.key;

                        return (
                          <button
                            key={preset.key}
                            type="button"
                            onClick={() => setField("icon", preset.key)}
                            className={`rounded-lg px-2 py-1.5 text-xs inline-flex items-center gap-1.5 border transition-colors ${
                              active
                                ? "border-purple-500/50 bg-purple-600/20 text-white"
                                : "border-[#25253a] bg-[#121222] text-[#a0a0b8] hover:border-purple-500/25 hover:text-white"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" style={{ color: preset.color }} />
                            <span>{preset.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-1">ترتيب الظهور</label>
                  <input
                    type="number"
                    dir="ltr"
                    value={form.order}
                    onChange={(e) => setField("order", e.target.value)}
                    placeholder="1"
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[#1a1a2e] bg-[#0d0d14] p-3">
                <span className="text-xs text-[#80809d] block mb-2">معاينة الأيقونة</span>
                <div className="inline-flex items-center gap-2 text-sm text-white">
                  <span className="w-9 h-9 rounded-xl bg-purple-600/15 border border-purple-600/20 flex items-center justify-center">
                    <ActiveServiceIcon className="w-4 h-4" style={{ color: activeIconPreset.color }} />
                  </span>
                  <span>{activeIconPreset.label}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-1">نوع السعر</label>
                  <select
                    value={form.priceType}
                    onChange={(e) => setField("priceType", e.target.value)}
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
                  >
                    <option value="request">حسب الطلب</option>
                    <option value="fixed">ثابت</option>
                    <option value="hourly">بالساعة</option>
                    <option value="free">مجاني</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-1">السعر</label>
                  <input
                    type="number"
                    dir="ltr"
                    value={form.price}
                    onChange={(e) => setField("price", e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#a0a0b8] mb-1">عنوان CTA</label>
                <input
                  type="text"
                  value={form.ctaLabel}
                  onChange={(e) => setField("ctaLabel", e.target.value)}
                  placeholder="اطلب الآن"
                  className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-[#a0a0b8] mb-1">وصف قصير *</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="وصف مختصر للخدمة"
                  className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-[#a0a0b8] mb-1">
                  تفاصيل إضافية (سطر لكل ميزة)
                </label>
                <textarea
                  rows={5}
                  value={form.longDesc}
                  onChange={(e) => setField("longDesc", e.target.value)}
                  placeholder={"ميزة 1\nميزة 2\nميزة 3"}
                  className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none resize-y"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setField("featured", e.target.checked)}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <span className="text-sm text-[#a0a0b8]">مميز</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setField("isActive", e.target.checked)}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <span className="text-sm text-[#a0a0b8]">نشط</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 p-5 border-t border-[#1a1a2e]">
              <button onClick={() => void handleSave()} disabled={saving} className="btn-primary flex-1 justify-center gap-2 disabled:opacity-60">
                {saving ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                حفظ
              </button>
              <button onClick={() => setModal(null)} className="btn-outline flex-1 justify-center">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

