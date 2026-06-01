"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Layers, Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { generateSlug } from "@/lib/utils";
import ImageUpload from "@/components/admin/ImageUpload";
import {
  THEMED_ICONS,
  getThemedIconPreset,
  normalizeThemedIconKey,
} from "@/lib/themed-icons";

interface PortfolioLink {
  label?: string;
  type?: string;
  url: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string;
  longDesc?: string | null;
  thumbnail?: string;
  featured: boolean;
  status: string;
  order: number;
  tags: string[];
  links: unknown;
}

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  thumbnail: "",
  tags: "",
  liveUrl: "",
  repoUrl: "",
  demoUrl: "",
  featured: false,
  status: "published",
  order: "",
  tagline: "",
  badge: "",
  accent: "#a855f7",
  iconType: "layers",
};

function normalizeAccent(value?: string | null): string {
  const cleaned = String(value || "").trim();
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(cleaned) ? cleaned : "#a855f7";
}

function normalizeLinks(raw: unknown): PortfolioLink[] {
  if (!Array.isArray(raw)) return [];

  return raw.reduce<PortfolioLink[]>((acc, item) => {
      if (typeof item === "string") {
        const url = item.trim();
        if (!url) return acc;
        const isGithub = /github\.com/i.test(url);
        acc.push({
          url,
          label: isGithub ? "GitHub" : "الموقع",
          type: isGithub ? "github" : "live",
        });
        return acc;
      }

      if (item && typeof item === "object") {
        const candidate = item as Record<string, unknown>;
        const url = String(candidate.url || "").trim();
        if (!url) return acc;

        acc.push({
          url,
          label: typeof candidate.label === "string" ? candidate.label : undefined,
          type: typeof candidate.type === "string" ? candidate.type : undefined,
        });
      }

      return acc;
    }, []);
}

function parseCardSettings(longDesc?: string | null) {
  const fallback = {
    tagline: "",
    badge: "",
    accent: "#a855f7",
    iconType: "layers",
    extra: {} as Record<string, unknown>,
  };

  if (!longDesc) return fallback;

  try {
    const parsed = JSON.parse(longDesc);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fallback;

    const obj = parsed as Record<string, unknown>;
    const { tagline, badge, accent, iconType, ...extra } = obj;

    return {
      tagline: typeof tagline === "string" ? tagline : "",
      badge: typeof badge === "string" ? badge : "",
      accent: normalizeAccent(typeof accent === "string" ? accent : null),
      iconType: normalizeThemedIconKey(typeof iconType === "string" ? iconType : null, "layers"),
      extra,
    };
  } catch {
    return fallback;
  }
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [longDescExtra, setLongDescExtra] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData() {
    try {
      const res = await fetch("/api/portfolio", { cache: "no-store" });
      const data = await res.json();
      setProjects(Array.isArray(data.projects) ? data.projects : []);
    } catch {
      toast.error("تعذر تحميل المشاريع");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setForm(emptyForm);
    setLongDescExtra({});
    setEditing(null);
    setModal("create");
  }

  function openEdit(project: Project) {
    const links = normalizeLinks(project.links);
    const cardSettings = parseCardSettings(project.longDesc);

    const repo = links.find((l) => l.type === "github" || /github\.com/i.test(l.url));
    const demo = links.find((l) => l.type === "demo" || /demo/i.test(l.label || ""));
    const live =
      links.find((l) => l.type === "live") ||
      links.find((l) => !repo || l.url !== repo.url);

    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description || "",
      thumbnail: project.thumbnail || "",
      tags: project.tags.join(", "),
      liveUrl: live?.url || "",
      repoUrl: repo?.url || "",
      demoUrl: demo?.url || "",
      featured: !!project.featured,
      status: project.status || "published",
      order: Number.isFinite(project.order) ? String(project.order) : "",
      tagline: cardSettings.tagline,
      badge: cardSettings.badge,
      accent: cardSettings.accent,
      iconType: cardSettings.iconType,
    });
    setLongDescExtra(cardSettings.extra);
    setEditing(project);
    setModal("edit");
  }

  async function handleSave() {
    if (!form.title.trim()) {
      toast.error("العنوان مطلوب");
      return;
    }

    setSaving(true);
    try {
      const links: PortfolioLink[] = [];
      if (form.liveUrl.trim()) {
        links.push({ label: "الموقع", type: "live", url: form.liveUrl.trim() });
      }
      if (form.repoUrl.trim()) {
        links.push({ label: "GitHub", type: "github", url: form.repoUrl.trim() });
      }
      if (form.demoUrl.trim()) {
        links.push({ label: "Demo", type: "demo", url: form.demoUrl.trim() });
      }

      const payload = {
        title: form.title.trim(),
        slug: (form.slug || generateSlug(form.title)).trim(),
        description: form.description.trim() || null,
        thumbnail: form.thumbnail.trim() || null,
        featured: form.featured,
        status: form.status,
        order: form.order.trim() ? parseInt(form.order, 10) : undefined,
        tags: form.tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        links,
        longDesc: JSON.stringify({
          ...longDescExtra,
          tagline: form.tagline.trim(),
          badge: form.badge.trim(),
          accent: normalizeAccent(form.accent),
          iconType: normalizeThemedIconKey(form.iconType, "layers"),
        }),
      };

      const isEdit = modal === "edit" && editing;
      const url = isEdit ? `/api/portfolio/${editing.slug}` : "/api/portfolio";
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

      toast.success(isEdit ? "تم تحديث المشروع" : "تم إضافة المشروع");
      setModal(null);
      await loadData();
    } catch {
      toast.error("فشل حفظ المشروع");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("تأكيد حذف المشروع؟")) return;
    try {
      const res = await fetch(`/api/portfolio/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete_failed");
      toast.success("تم حذف المشروع");
      await loadData();
    } catch {
      toast.error("فشل حذف المشروع");
    }
  }

  const setField = (key: keyof typeof emptyForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const activeIconPreset = useMemo(() => getThemedIconPreset(form.iconType, "layers"), [form.iconType]);
  const ActiveIcon = activeIconPreset.icon;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          إدارة البورتفوليو
        </h1>
        <button onClick={openCreate} className="btn-primary text-sm gap-1.5">
          <Plus className="w-4 h-4" />
          مشروع جديد
        </button>
      </div>

      <div className="card-base overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin mx-auto" />
          </div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-[#a0a0b8] text-sm">لا توجد مشاريع حتى الآن</div>
        ) : (
          <div className="divide-y divide-[#1a1a2e]">
            {projects.map((project) => {
              const card = parseCardSettings(project.longDesc);
              const iconPreset = getThemedIconPreset(card.iconType, "layers");
              const CardIcon = iconPreset.icon;

              return (
                <div key={project.id} className="flex items-center justify-between px-5 py-3 hover:bg-[#0d0d18] transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    {project.thumbnail ? (
                      <img src={project.thumbnail} alt={project.title} className="w-10 h-10 rounded-lg object-cover border border-[#232338]" />
                    ) : (
                      <span className="w-10 h-10 rounded-lg bg-[#131324] border border-[#27273c] flex items-center justify-center">
                        <CardIcon className="w-4 h-4" style={{ color: iconPreset.color }} />
                      </span>
                    )}

                    <div className="min-w-0">
                      <div className="text-white text-sm font-medium truncate">{project.title}</div>
                      <div className="flex gap-1.5 mt-0.5 flex-wrap items-center">
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                            project.status === "published"
                              ? "text-green-400 bg-green-500/10 border-green-500/25"
                              : "text-[#9a9ab5] bg-[#1a1a2e] border-[#2a2a42]"
                          }`}
                        >
                          {project.status === "published" ? "منشور" : "مسودة"}
                        </span>
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-purple-600/15 text-purple-300 border border-purple-600/20">
                            {tag}
                          </span>
                        ))}
                        <span className="text-[10px] text-[#7f7f9d]">ترتيب: {project.order}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(project)}
                      className="p-2 rounded-lg text-[#808090] hover:text-purple-400 hover:bg-purple-600/10 transition-colors"
                      aria-label="تعديل"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => void handleDelete(project.slug)}
                      className="p-2 rounded-lg text-[#808090] hover:text-red-400 hover:bg-red-600/10 transition-colors"
                      aria-label="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#080810] border border-[#1a1a2e] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[#1a1a2e]">
              <h2 className="text-white font-bold">{modal === "edit" ? "تعديل المشروع" : "مشروع جديد"}</h2>
              <button onClick={() => setModal(null)} className="text-[#606080] hover:text-white" aria-label="إغلاق">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-1">العنوان *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setField("title", e.target.value)}
                    placeholder="اسم المشروع"
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
                  />
                </div>

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
              </div>

              <div>
                <label className="block text-sm text-[#a0a0b8] mb-2">صورة المشروع</label>
                <ImageUpload
                  value={form.thumbnail}
                  onChange={(url) => setField("thumbnail", url)}
                  placeholder="ارفع صورة المشروع أو أدخل رابط الصورة"
                />
              </div>

              <div>
                <label className="block text-sm text-[#a0a0b8] mb-1">الوصف المختصر</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="وصف يظهر في بطاقة المشروع"
                  className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-1">الوسوم (بفواصل)</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setField("tags", e.target.value)}
                    placeholder="Next.js, TypeScript, AI"
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-[#a0a0b8] mb-1">الحالة</label>
                    <select
                      value={form.status}
                      onChange={(e) => setField("status", e.target.value)}
                      className="w-full bg-[#0d0d14] border border-[#1a1a2e] rounded-xl px-3 py-2.5 text-white text-sm outline-none"
                    >
                      <option value="published">منشور</option>
                      <option value="draft">مسودة</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#a0a0b8] mb-1">الترتيب</label>
                    <input
                      type="number"
                      dir="ltr"
                      value={form.order}
                      onChange={(e) => setField("order", e.target.value)}
                      placeholder="1"
                      className="w-full bg-[#0d0d14] border border-[#1a1a2e] rounded-xl px-3 py-2.5 text-white text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#1a1a2e] bg-[#0d0d14] p-4 space-y-3">
                <h3 className="text-white text-sm font-bold">روابط المشروع</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="url"
                    dir="ltr"
                    value={form.liveUrl}
                    onChange={(e) => setField("liveUrl", e.target.value)}
                    placeholder="رابط الموقع / التطبيق"
                    className="bg-[#090914] border border-[#1a1a2e] rounded-xl px-3 py-2 text-white text-sm outline-none"
                  />
                  <input
                    type="url"
                    dir="ltr"
                    value={form.repoUrl}
                    onChange={(e) => setField("repoUrl", e.target.value)}
                    placeholder="رابط GitHub"
                    className="bg-[#090914] border border-[#1a1a2e] rounded-xl px-3 py-2 text-white text-sm outline-none"
                  />
                  <input
                    type="url"
                    dir="ltr"
                    value={form.demoUrl}
                    onChange={(e) => setField("demoUrl", e.target.value)}
                    placeholder="رابط Demo إضافي"
                    className="bg-[#090914] border border-[#1a1a2e] rounded-xl px-3 py-2 text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[#1a1a2e] bg-[#0d0d14] p-4 space-y-3">
                <h3 className="text-white text-sm font-bold">إعدادات بطاقة المشروع (صفحة أعمالي)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-[#a0a0b8] mb-1">Tagline</label>
                    <input
                      type="text"
                      value={form.tagline}
                      onChange={(e) => setField("tagline", e.target.value)}
                      placeholder="سطر تعريفي قصير"
                      className="w-full bg-[#090914] border border-[#1a1a2e] rounded-xl px-3 py-2 text-white text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#a0a0b8] mb-1">Badge</label>
                    <input
                      type="text"
                      value={form.badge}
                      onChange={(e) => setField("badge", e.target.value)}
                      placeholder="New / SaaS / AI"
                      className="w-full bg-[#090914] border border-[#1a1a2e] rounded-xl px-3 py-2 text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end">
                  <div>
                    <label className="block text-sm text-[#a0a0b8] mb-1">لون التمييز (Accent)</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={form.accent}
                      onChange={(e) => setField("accent", e.target.value)}
                      placeholder="#a855f7"
                      className="w-full bg-[#090914] border border-[#1a1a2e] rounded-xl px-3 py-2 text-white text-sm outline-none"
                    />
                  </div>
                  <span
                    className="w-11 h-11 rounded-xl border border-white/10"
                    style={{ background: normalizeAccent(form.accent) }}
                    title="معاينة اللون"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-2">أيقونة المشروع</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto rounded-xl border border-[#1a1a2e] p-2 bg-[#090914]">
                    {THEMED_ICONS.map((preset) => {
                      const Icon = preset.icon;
                      const active = form.iconType === preset.key;

                      return (
                        <button
                          key={preset.key}
                          type="button"
                          onClick={() => setField("iconType", preset.key)}
                          className={`rounded-lg px-2 py-1.5 text-xs inline-flex items-center gap-1.5 border transition-colors ${
                            active
                              ? "border-purple-500/60 bg-purple-600/20 text-white"
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

                <div className="rounded-xl border border-[#25253d] bg-[#090914] p-3">
                  <span className="text-xs text-[#80809d] block mb-2">معاينة البطاقة</span>
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-xl border flex items-center justify-center"
                      style={{ background: `${normalizeAccent(form.accent)}1A`, borderColor: `${normalizeAccent(form.accent)}55` }}
                    >
                      <ActiveIcon className="w-4 h-4" style={{ color: normalizeAccent(form.accent) }} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-white text-sm font-semibold truncate">{form.title || "اسم المشروع"}</div>
                      <div className="text-xs" style={{ color: normalizeAccent(form.accent) }}>
                        {form.tagline || "سطر تعريفي للمشروع"}
                      </div>
                    </div>
                    {form.badge && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full border"
                        style={{ color: normalizeAccent(form.accent), borderColor: `${normalizeAccent(form.accent)}55`, background: `${normalizeAccent(form.accent)}1A` }}
                      >
                        {form.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setField("featured", e.target.checked)}
                  className="w-4 h-4 accent-purple-600"
                />
                <span className="text-sm text-[#a0a0b8]">مشروع مميز</span>
              </label>
            </div>

            <div className="flex gap-3 p-5 border-t border-[#1a1a2e]">
              <button onClick={() => void handleSave()} disabled={saving} className="btn-primary flex-1 justify-center gap-2 disabled:opacity-60">
                {saving ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Save className="w-4 h-4" />}
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
