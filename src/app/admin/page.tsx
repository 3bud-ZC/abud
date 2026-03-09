"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, BookOpen, Layers, ShoppingCart, MessageSquare, DollarSign, Clock, ArrowUpRight } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

interface Stats {
  products: number;
  posts: number;
  projects: number;
  orders: number;
  pendingOrders: number;
  messages: number;
  unreadMessages: number;
  revenue: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  buyerName: string;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [pRes, bRes, ptRes, oRes, mRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/blog"),
          fetch("/api/portfolio"),
          fetch("/api/orders"),
          fetch("/api/contact"),
        ]);
        const [pd, bd, ptd, od, md] = await Promise.all([
          pRes.json(), bRes.json(), ptRes.json(), oRes.json(), mRes.json(),
        ]);

        const orders: RecentOrder[] = od.orders || [];
        const messages = md.messages || [];
        const revenue = orders
          .filter((o: RecentOrder) => o.orderStatus === "completed")
          .reduce((sum: number, o: RecentOrder) => sum + o.totalAmount, 0);

        setStats({
          products: pd.products?.length || 0,
          posts: bd.posts?.length || 0,
          projects: ptd.projects?.length || 0,
          orders: orders.length,
          pendingOrders: orders.filter((o: RecentOrder) => o.orderStatus === "pending").length,
          messages: messages.length,
          unreadMessages: messages.filter((m: { isRead: boolean }) => !m.isRead).length,
          revenue,
        });
        setRecentOrders(orders.slice(0, 5));
      } catch { /* ignore */ }
      finally { setLoading(false); }
    }
    load();
  }, []);

  const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: "قيد الانتظار", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
    processing: { label: "قيد المعالجة", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
    completed: { label: "مكتمل", color: "text-green-400 bg-green-400/10 border-green-400/20" },
    cancelled: { label: "ملغي", color: "text-red-400 bg-red-400/10 border-red-400/20" },
  };

  const cards = [
    { label: "المنتجات", value: stats?.products, icon: Package, href: "/admin/products", accent: "text-purple-400 bg-purple-600/15 border-purple-600/20" },
    { label: "المقالات", value: stats?.posts, icon: BookOpen, href: "/admin/blog", accent: "text-blue-400 bg-blue-600/15 border-blue-600/20" },
    { label: "المشاريع", value: stats?.projects, icon: Layers, href: "/admin/portfolio", accent: "text-green-400 bg-green-600/15 border-green-600/20" },
    { label: "الطلبات", value: stats?.orders, badge: stats?.pendingOrders, icon: ShoppingCart, href: "/admin/orders", accent: "text-orange-400 bg-orange-600/15 border-orange-600/20" },
    { label: "الرسائل", value: stats?.messages, badge: stats?.unreadMessages, icon: MessageSquare, href: "/admin/messages", accent: "text-pink-400 bg-pink-600/15 border-pink-600/20" },
    { label: "الإيرادات", value: stats ? formatPrice(stats.revenue) : "—", icon: DollarSign, href: "/admin/orders", accent: "text-emerald-400 bg-emerald-600/15 border-emerald-600/20" },
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
          {[...Array(6)].map((_, i) => (
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
            آخر الطلبات
          </h2>
          <Link href="/admin/orders" className="text-xs font-medium transition-colors"
            style={{ color: "rgba(147,51,234,0.7)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#c084fc")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(147,51,234,0.7)")}>
            عرض الكل →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-10 text-center">
            <Clock className="w-8 h-8 text-purple-700/30 mx-auto mb-2" />
            <p className="text-[#505070] text-sm">لا توجد طلبات بعد</p>
          </div>
        ) : (
          <div>
            {recentOrders.map((order, i) => {
              const st = statusLabels[order.orderStatus] || { label: order.orderStatus, color: "text-[#a0a0b8] bg-[#1a1a2e] border-[#2a2a3e]" };
              return (
                <Link key={order.id} href={`/admin/orders`}
                  className="flex items-center justify-between px-5 py-3.5 group transition-colors"
                  style={{ borderBottom: i < recentOrders.length - 1 ? "1px solid rgba(22,22,38,0.8)" : "none" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(15,15,24,0.8)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(147,51,234,0.1)", border: "1px solid rgba(147,51,234,0.15)" }}>
                      <span className="text-purple-400 text-xs font-bold">{order.buyerName.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium leading-tight">{order.buyerName}</div>
                      <div className="text-[#404060] text-xs font-mono" dir="ltr">{order.orderNumber}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm" style={{ color: "#c084fc" }}>{formatPrice(order.totalAmount)}</span>
                    <span className={`text-xs border rounded-full px-2.5 py-0.5 font-medium ${st.color}`}>{st.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
