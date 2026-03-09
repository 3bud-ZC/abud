"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MessageSquare, Trash2, Mail, Phone, CheckCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Message {
  id: string; name: string; email: string; phone?: string;
  subject: string; message: string; isRead: boolean; createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setMessages(data.messages || []);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }

  async function markRead(id: string) {
    try {
      await fetch(`/api/contact/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isRead: true }) });
      setMessages(msgs => msgs.map(m => m.id === id ? { ...m, isRead: true } : m));
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, isRead: true } : null);
    } catch { /* ignore */ }
  }

  async function handleDelete(id: string) {
    if (!confirm("تأكيد الحذف؟")) return;
    try {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
      toast.success("تم الحذف");
      setMessages(msgs => msgs.filter(m => m.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch { toast.error("فشل الحذف"); }
  }

  const unread = messages.filter(m => !m.isRead).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-400" />
          الرسائل
          {unread > 0 && <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5">{unread}</span>}
        </h1>
        <span className="text-sm text-[#808090]">{messages.length} رسالة</span>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2 card-base overflow-hidden">
          {loading ? <div className="p-8 text-center"><div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin mx-auto" /></div>
            : messages.length === 0 ? <div className="p-8 text-center text-[#a0a0b8] text-sm">لا توجد رسائل</div>
            : (
              <div className="divide-y divide-[#1a1a2e]">
                {messages.map(m => (
                  <button key={m.id} onClick={() => { setSelected(m); if (!m.isRead) markRead(m.id); }}
                    className={`w-full text-right px-4 py-3 hover:bg-[#0d0d18] transition-colors ${selected?.id === m.id ? "bg-purple-600/5 border-r-2 border-purple-600" : ""}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${m.isRead ? "text-[#a0a0b8]" : "text-white"}`}>{m.name}</div>
                        <div className="text-xs text-[#606080] truncate mt-0.5">{m.subject}</div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-xs text-[#606080]">{formatDate(m.createdAt)}</div>
                        {!m.isRead && <div className="w-2 h-2 rounded-full bg-purple-500 ml-auto mt-1" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <div className="card-base p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-bold">{selected.subject}</h3>
                  <p className="text-[#808090] text-sm mt-0.5">{formatDate(selected.createdAt)}</p>
                </div>
                <div className="flex gap-2">
                  {!selected.isRead && (
                    <button onClick={() => markRead(selected.id)}
                      className="p-2 rounded-lg text-[#808090] hover:text-green-400 hover:bg-green-600/10 transition-colors" title="تعيين كمقروء">
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => handleDelete(selected.id)}
                    className="p-2 rounded-lg text-[#808090] hover:text-red-400 hover:bg-red-600/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-[#0d0d14] rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-purple-600/15 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">{selected.name}</span>
                    <span className="text-[#606080] mx-2">•</span>
                    <span className="text-[#808090]" dir="ltr">{selected.email}</span>
                  </div>
                </div>
                {selected.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-7 h-7 rounded-lg bg-purple-600/15 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className="text-[#808090]" dir="ltr">{selected.phone}</span>
                  </div>
                )}
              </div>

              <div className="text-[#c0c0d0] text-sm leading-relaxed bg-[#080810] border border-[#1a1a2e] rounded-xl p-4 whitespace-pre-wrap">
                {selected.message}
              </div>

              <a href={`mailto:${selected.email}?subject=رد: ${selected.subject}`}
                className="btn-primary w-full justify-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                الرد عبر البريد الإلكتروني
              </a>
            </div>
          ) : (
            <div className="card-base p-8 text-center text-[#808090] text-sm">
              اختر رسالة لعرض تفاصيلها
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
