"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BookOpen, Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { formatDate, generateSlug } from "@/lib/utils";

interface Category { id: string; name: string; slug: string; }
interface Post {
  id: string; title: string; slug: string; excerpt?: string;
  content?: string; coverImage?: string; status: string;
  featured: boolean; categoryId?: string; tags: string[];
  category?: { name: string }; publishedAt?: string; createdAt: string;
}

const emptyForm = { title: "", slug: "", excerpt: "", content: "", coverImage: "", categoryId: "", status: "draft", featured: false, tags: "" };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const [pRes, cRes] = await Promise.all([fetch("/api/blog"), fetch("/api/blog/categories")]);
      const [pd, cd] = await Promise.all([pRes.json(), cRes.json()]);
      setPosts(pd.posts || []);
      setCategories(cd.categories || []);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }

  function openCreate() { setForm(emptyForm); setEditing(null); setModal("create"); }
  function openEdit(p: Post) {
    setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt || "", content: p.content || "", coverImage: p.coverImage || "", categoryId: p.categoryId || "", status: p.status, featured: p.featured, tags: p.tags.join(", ") });
    setEditing(p); setModal("edit");
  }

  async function handleSave() {
    if (!form.title) { toast.error("العنوان مطلوب"); return; }
    setSaving(true);
    try {
      const body = { ...form, slug: form.slug || generateSlug(form.title), tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) };
      const url = modal === "edit" && editing ? `/api/blog/${editing.slug}` : "/api/blog";
      const method = modal === "edit" ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error();
      toast.success(modal === "edit" ? "تم تحديث المقال" : "تم إنشاء المقال");
      setModal(null); loadData();
    } catch { toast.error("حدث خطأ"); }
    finally { setSaving(false); }
  }

  async function handleDelete(slug: string) {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    try {
      await fetch(`/api/blog/${slug}`, { method: "DELETE" });
      toast.success("تم الحذف"); loadData();
    } catch { toast.error("فشل الحذف"); }
  }

  const F = (k: keyof typeof emptyForm, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-white flex items-center gap-2"><BookOpen className="w-5 h-5 text-purple-400" />المدونة</h1>
        <button onClick={openCreate} className="btn-primary text-sm gap-1.5"><Plus className="w-4 h-4" />مقال جديد</button>
      </div>

      <div className="card-base overflow-hidden">
        {loading ? <div className="p-8 text-center"><div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin mx-auto" /></div>
          : posts.length === 0 ? <div className="p-8 text-center text-[#a0a0b8] text-sm">لا توجد مقالات</div>
          : (
            <div className="divide-y divide-[#1a1a2e]">
              {posts.map(p => (
                <div key={p.id} className="flex items-center justify-between px-5 py-3 hover:bg-[#0d0d18] transition-colors">
                  <div>
                    <div className="text-white text-sm font-medium">{p.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {p.category && <span className="text-[#606080] text-xs">{p.category.name}</span>}
                      <span className={`text-xs px-1.5 py-0.5 rounded-full border ${p.status === "published" ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-[#808090] bg-[#1a1a2e] border-[#2a2a3e]"}`}>
                        {p.status === "published" ? "منشور" : "مسودة"}
                      </span>
                      <span className="text-[#606080] text-xs">{formatDate(p.createdAt)}</span>
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
          <div className="bg-[#080810] border border-[#1a1a2e] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[#1a1a2e]">
              <h2 className="text-white font-bold">{modal === "edit" ? "تعديل المقال" : "مقال جديد"}</h2>
              <button onClick={() => setModal(null)} className="text-[#606080] hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: "العنوان *", key: "title", placeholder: "عنوان المقال" },
                { label: "الـ Slug", key: "slug", placeholder: "سيُولَّد تلقائيًا", dir: "ltr" },
                { label: "الملخص", key: "excerpt", placeholder: "ملخص قصير" },
                { label: "رابط الصورة", key: "coverImage", placeholder: "https://...", dir: "ltr" },
                { label: "الوسوم (مفصولة بفواصل)", key: "tags", placeholder: "برمجة, تصميم, تقنية" },
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
                <label className="block text-sm text-[#a0a0b8] mb-1">المحتوى (HTML)</label>
                <textarea rows={8} placeholder="<p>محتوى المقال...</p>"
                  value={form.content} onChange={e => F("content", e.target.value)} dir="ltr"
                  className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#606080] outline-none transition-colors resize-none font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-1">التصنيف</label>
                  <select value={form.categoryId} onChange={e => F("categoryId", e.target.value)}
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] rounded-xl px-4 py-2.5 text-white text-sm outline-none">
                    <option value="">بدون تصنيف</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-1">الحالة</label>
                  <select value={form.status} onChange={e => F("status", e.target.value)}
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] rounded-xl px-4 py-2.5 text-white text-sm outline-none">
                    <option value="draft">مسودة</option>
                    <option value="published">منشور</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => F("featured", e.target.checked)} className="w-4 h-4 accent-purple-600" />
                <span className="text-sm text-[#a0a0b8]">مقال مميز</span>
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
