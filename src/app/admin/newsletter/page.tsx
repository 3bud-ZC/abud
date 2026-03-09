"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Trash2, Download, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  source: string;
  isActive: boolean;
  createdAt: string;
}

const SOURCE_LABELS: Record<string, string> = {
  newsletter:  "نشرة بريدية",
  lead_popup:  "نافذة العرض",
  homepage:    "الصفحة الرئيسية",
};

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch("/api/newsletter");
      const data = await res.json();
      setSubscribers(data.subscribers || []);
    } catch { setSubscribers([]); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("حذف هذا المشترك؟")) return;
    await fetch("/api/newsletter", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  function exportCSV() {
    const rows = [
      ["Email", "Name", "Source", "Date"],
      ...subscribers.map(s => [s.email, s.name || "", SOURCE_LABELS[s.source] || s.source, s.createdAt]),
    ];
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "subscribers.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  const active = subscribers.filter(s => s.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(147,51,234,0.15)", border: "1px solid rgba(147,51,234,0.25)" }}>
            <Mail className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h1 className="text-white font-black text-xl">المشتركون في النشرة</h1>
            <p className="text-xs" style={{ color: "#505070" }}>{active} مشترك نشط من {subscribers.length}</p>
          </div>
        </div>
        {subscribers.length > 0 && (
          <button onClick={exportCSV}
            className="btn-outline gap-2 text-sm py-2 px-4">
            <Download className="w-4 h-4" />
            تصدير CSV
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "إجمالي المشتركين", value: subscribers.length, icon: Users, color: "#a78bfa" },
          { label: "نشطون", value: active, icon: Mail, color: "#34d399" },
          { label: "من النافذة المنبثقة", value: subscribers.filter(s => s.source === "lead_popup").length, icon: Mail, color: "#fbbf24" },
        ].map(stat => (
          <div key={stat.label} className="glass-card p-4">
            <div className="text-2xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs" style={{ color: "#606070" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
        </div>
      ) : subscribers.length === 0 ? (
        <div className="text-center py-20" style={{ color: "#505070" }}>
          <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>لا يوجد مشتركون بعد</p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(28,28,48,0.8)" }}>
                  {["البريد الإلكتروني", "المصدر", "الحالة", "تاريخ الاشتراك", ""].map(h => (
                    <th key={h} className="text-right px-4 py-3 text-xs font-semibold" style={{ color: "#606070" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    style={{ borderBottom: "1px solid rgba(18,18,30,0.6)" }}
                    className="hover:bg-[rgba(147,51,234,0.04)] transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: "#c0c0d8" }} dir="ltr">{s.email}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#606070" }}>
                      {SOURCE_LABELS[s.source] || s.source}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs"
                        style={s.isActive
                          ? { background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }
                          : { background: "rgba(100,100,120,0.1)", color: "#606070", border: "1px solid rgba(100,100,120,0.2)" }}>
                        {s.isActive ? "نشط" : "ملغي"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#606070" }}>{formatDate(s.createdAt)}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(s.id)}
                        className="text-[#606070] hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
