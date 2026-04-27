"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Layers, MessageSquare, Briefcase, Clock, ArrowUpRight, Mail } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Stats {
  posts: number;
  projects: number;
  services: number;
  messages: number;
  unreadMessages: number;
  subscribers: number;
}

interface RecentMessage {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  isRead: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [bRes, ptRes, sRes, mRes, nRes] = await Promise.all([
          fetch("/api/blog"),
          fetch("/api/portfolio"),
          fetch("/api/services"),
          fetch("/api/contact"),
          fetch("/api/newsletter"),
        ]);
        const [bd, ptd, sd, md, nd] = await Promise.all([
          bRes.json(), ptRes.json(), sRes.json(), mRes.json(), nRes.json(),
        ]);

        const messages: RecentMessage[] = md.messages || [];

        setStats({
          posts: bd.posts?.length || 0,
          projects: ptd.projects?.length || 0,
          services: sd.services?.length || 0,
          messages: messages.length,
          unreadMessages: messages.filter((m) => !m.isRead).length,
          subscribers: nd.subscribers?.length || 0,
        });
        setRecentMessages(messages.slice(0, 5));
      } catch { /* ignore */ }
      finally { setLoading(false); }
    }
    load();
  }, []);

  const cards = [
    { label: "المقالات",    value: stats?.posts,                                   icon: BookOpen,       href: "/admin/blog",      accent: "text-blue-400 bg-blue-600/15 border-blue-600/20" },
    { label: "المشاريع",    value: stats?.projects,                                icon: Layers,         href: "/admin/portfolio", accent: "text-green-400 bg-green-600/15 border-green-600/20" },
    { label: "الخدمات",      value: stats?.services,                                icon: Briefcase,      href: "/admin/services",  accent: "text-purple-400 bg-purple-600/15 border-purple-600/20" },
    { label: "الرسائل",     value: stats?.messages, badge: stats?.unreadMessages,  icon: MessageSquare,  href: "/admin/messages",  accent: "text-pink-400 bg-pink-600/15 border-pink-600/20" },
    { label: "المشتركون",   value: stats?.subscribers,                             icon: Mail,           href: "/admin/newsletter",accent: "text-amber-400 bg-amber-600/15 border-amber-600/20" },
  ];

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "صباح الخير" : hour < 17 ? "مساء الخير" : "مساء النور";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#505070] text-xs font-medium tracking-wide uppercase mb-1">{greeting}</p>
          <h1 className="text-2xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>لوحة التحكم</h1>
        </div>
        <div className="text-left">
          <div className="text-xs text-[#505070]">{now.toLocaleDateString("ar-EG", { weekday: "long", day: "numeric", month: "long" })}</div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card-base p-5 animate-pulse">
              <div className="h-4 bg-[#1a1a2e] rounded w-1/2 mb-3" />
              <div className="h-8 bg-[#1a1a2e] rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {cards.map(({ label, value, badge, icon: Icon, href, accent }) => (
            <Link key={label} href={href} className="card-base p-5 group relative overflow-hidden"
              style={{ transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(147,51,234,0.05) 0%, transparent 70%)" }} />
              <div className="flex items-start justify-between mb-4 relative">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${accent}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1.5">
                  {badge !== undefined && badge > 0 && (
                    <span className="text-xs text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-bold"
                      style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", boxShadow: "0 2px 8px rgba(220,38,38,0.4)" }}>
                      {badge}
                    </span>
                  )}
                  <ArrowUpRight className="w-3 h-3 text-[#303050] group-hover:text-purple-500 transition-colors" />
                </div>
              </div>
              <div className="text-2xl font-black mb-0.5 relative" style={{ letterSpacing: "-0.02em" }}>
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #ffffff 0%, #e9d5ff 100%)" }}>
                  {value ?? "—"}
                </span>
              </div>
              <div className="text-[#505070] text-xs font-medium relative">{label}</div>
            </Link>
          ))}
        </div>
      )}

      <div className="card-base overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(28,28,48,0.8)" }}>
          <h2 className="text-white font-bold text-sm flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            آخر الرسائل
          </h2>
          <Link href="/admin/messages" className="text-xs font-medium transition-colors"
            style={{ color: "rgba(147,51,234,0.7)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#c084fc")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(147,51,234,0.7)")}>
            عرض الكل →
          </Link>
        </div>
        {recentMessages.length === 0 ? (
          <div className="p-10 text-center">
            <MessageSquare className="w-8 h-8 text-purple-700/30 mx-auto mb-2" />
            <p className="text-[#505070] text-sm">لا توجد رسائل بعد</p>
          </div>
        ) : (
          <div>
            {recentMessages.map((msg, i) => (
              <Link key={msg.id} href="/admin/messages"
                className="flex items-center justify-between px-5 py-3.5 group transition-colors"
                style={{ borderBottom: i < recentMessages.length - 1 ? "1px solid rgba(22,22,38,0.8)" : "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(15,15,24,0.8)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(147,51,234,0.1)", border: "1px solid rgba(147,51,234,0.15)" }}>
                    <span className="text-purple-400 text-xs font-bold">{msg.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium leading-tight">{msg.name}</div>
                    <div className="text-[#404060] text-xs" dir="ltr">{msg.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {msg.subject && (
                    <span className="text-xs text-[#808090] max-w-[140px] truncate hidden sm:inline">{msg.subject}</span>
                  )}
                  <span className="text-xs text-[#505070]">{formatDate(msg.createdAt)}</span>
                  {!msg.isRead && (
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
