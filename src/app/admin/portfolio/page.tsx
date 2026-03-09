"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Layers, Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { generateSlug } from "@/lib/utils";

interface Project {
  id: string; title: string; slug: string; description?: string;
  thumbnail?: string; featured: boolean; tags: string[]; links: string[];
}

const emptyForm = { title: "", slug: "", description: "", coverImage: "", featured: false, tags: "", links: "" };

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }

  function openCreate() { setForm(emptyForm); setEditing(null); setModal("create"); }
  function openEdit(p: Project) {
    setForm({ title: p.title, slug: p.slug, description: p.description || "", coverImage: p.thumbnail || "", featured: p.featured, tags: p.tags.join(", "), links: p.links.join(", ") });
    setEditing(p); setModal("edit");
  }

  async function handleSave() {
    if (!form.title) { toast.error("العنوان مطلوب"); return; }
    setSaving(true);
    try {
      const body = {
        title: form.title,
        slug: form.slug || generateSlug(form.title),
        description: form.description,
        thumbnail: form.coverImage,
        featured: form.featured,
        tags: form.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
        links: form.links.split(",").map((l: string) => l.trim()).filter(Boolean),
      };
      const url = modal === "edit" && editing ? `/api/portfolio/${editing.slug}` : "/api/portfolio";
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
    try { await fetch(`/api/portfolio/${slug}`, { method: "DELETE" }); toast.success("تم الحذف"); loadData(); }
    catch { toast.error("فشل الحذف"); }
  }

  const F = (k: keyof typeof emptyForm, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-white flex items-center gap-2"><Layers className="w-5 h-5 text-purple-400" />البورتفوليو</h1>
        <button onClick={openCreate} className="btn-primary text-sm gap-1.5"><Plus className="w-4 h-4" />مشروع جديد</button>
      </div>

      <div className="card-base overflow-hidden">
        {loading ? <div className="p-8 text-center"><div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin mx-auto" /></div>
          : projects.length === 0 ? <div className="p-8 text-center text-[#a0a0b8] text-sm">لا توجد مشاريع</div>
          : (
            <div className="divide-y divide-[#1a1a2e]">
              {projects.map(p => (
                <div key={p.id} className="flex items-center justify-between px-5 py-3 hover:bg-[#0d0d18] transition-colors">
                  <div className="flex items-center gap-3">
                    {p.thumbnail ? <img src={p.thumbnail} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                      : <div className="w-10 h-10 rounded-lg bg-[#1a1a2e] flex items-center justify-center"><Layers className="w-4 h-4 text-purple-600/40" /></div>}
                    <div>
                      <div className="text-white text-sm font-medium">{p.title}</div>
                      <div className="flex gap-1.5 mt-0.5 flex-wrap">
                        {p.tags.slice(0, 3).map(t => <span key={t} className="text-xs px-1.5 py-0.5 rounded-full bg-purple-600/15 text-purple-400 border border-purple-600/20">{t}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-[#808090] hover:text-purple-400 hover:bg-purple-600/10 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(p.slug)} className="p-2 rounded-lg text-[#808090] hover:text-red-400 hover:bg-red-600/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
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
              <h2 className="text-white font-bold">{modal === "edit" ? "تعديل المشروع" : "مشروع جديد"}</h2>
              <button onClick={() => setModal(null)} className="text-[#606080] hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: "العنوان *", key: "title", placeholder: "اسم المشروع" },
                { label: "الـ Slug", key: "slug", placeholder: "سيُولَّد تلقائيًا", dir: "ltr" },
                { label: "رابط الصورة", key: "coverImage", placeholder: "https://...", dir: "ltr" },
                { label: "الوسوم (مفصولة بفواصل)", key: "tags", placeholder: "Next.js, TypeScript, Tailwind" },
                { label: "الروابط (مفصولة بفواصل)", key: "links", placeholder: "https://github.com/...", dir: "ltr" },
              ].map(({ label, key, placeholder, dir }) => (
                <div key={key}>
                  <label className="block text-sm text-[#a0a0b8] mb-1">{label}</label>
                  <input type="text" placeholder={placeholder} dir={dir}
                    value={(form as Record<string, unknown>)[key] as string}
                    onChange={e => F(key as keyof typeof emptyForm, e.target.value)}
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-sm text-[#a0a0b8] mb-1">الوصف</label>
                <textarea rows={3} placeholder="وصف المشروع"
                  value={form.description} onChange={e => F("description", e.target.value)}
                  className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors resize-none" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => F("featured", e.target.checked)} className="w-4 h-4 accent-purple-600" />
                <span className="text-sm text-[#a0a0b8]">مشروع مميز</span>
              </label>
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
