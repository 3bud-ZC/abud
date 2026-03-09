"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ShoppingCart, Eye, CheckCircle, XCircle, Clock, Search } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

interface Order {
  id: string;
  orderNumber: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  paymentMethod: string;
  proofImageUrl?: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  notes?: string;
  createdAt: string;
  items: { id: string; productId: string; price: number; quantity: number }[];
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "قيد الانتظار", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  processing: { label: "قيد المعالجة", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  completed: { label: "مكتمل", color: "text-green-400 bg-green-400/10 border-green-400/20" },
  cancelled: { label: "ملغي", color: "text-red-400 bg-red-400/10 border-red-400/20" },
};

const paymentStatusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "لم يُدفع", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  paid: { label: "مدفوع", color: "text-green-400 bg-green-400/10 border-green-400/20" },
  failed: { label: "فشل", color: "text-red-400 bg-red-400/10 border-red-400/20" },
  refunded: { label: "مُسترد", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => { fetchOrders(); }, []);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }

  async function updateStatus(id: string, status: string, paymentStatus?: string) {
    try {
      const body: Record<string, string> = { orderStatus: status };
      if (paymentStatus) body.paymentStatus = paymentStatus;
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      toast.success("تم تحديث حالة الطلب");
      fetchOrders();
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, orderStatus: status, paymentStatus: paymentStatus || prev.paymentStatus } : null);
    } catch { toast.error("فشل التحديث"); }
  }

  const filtered = orders.filter(o => {
    const matchFilter = filter === "all" || o.orderStatus === filter;
    const matchSearch = !search || o.buyerName.includes(search) || o.orderNumber.includes(search) || o.buyerEmail.includes(search);
    return matchFilter && matchSearch;
  });

  const payMethodLabels: Record<string, string> = {
    vodafone_cash: "فودافون كاش",
    instapay: "إنستاباي",
    paypal: "PayPal",
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-purple-400" />
          إدارة الطلبات
        </h1>
        <span className="text-sm text-[#808090]">{orders.length} طلب</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#606080]" />
          <input type="text" placeholder="ابحث باسم العميل أو رقم الطلب..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#0d0d14] border border-[#1a1a2e] rounded-xl px-4 py-2.5 pr-10 text-white text-sm placeholder-[#606080] outline-none focus:border-purple-600/50" />
        </div>
        <div className="flex gap-2">
          {["all", "pending", "processing", "completed", "cancelled"].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${filter === s ? "bg-purple-600 text-white" : "bg-[#1a1a2e] text-[#a0a0b8] hover:text-white"}`}>
              {s === "all" ? "الكل" : statusLabels[s]?.label || s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 card-base overflow-hidden">
          {loading ? (
            <div className="p-8 text-center"><div className="w-6 h-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin mx-auto" /></div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-[#a0a0b8] text-sm">لا توجد طلبات</div>
          ) : (
            <div className="divide-y divide-[#1a1a2e]">
              {filtered.map(order => {
                const st = statusLabels[order.orderStatus] || { label: order.orderStatus, color: "text-[#a0a0b8] bg-[#1a1a2e] border-[#2a2a3e]" };
                return (
                  <button key={order.id} onClick={() => setSelected(order)}
                    className={`w-full flex items-center justify-between px-5 py-4 text-right hover:bg-[#0d0d18] transition-colors ${selected?.id === order.id ? "bg-purple-600/5 border-r-2 border-purple-600" : ""}`}>
                    <div>
                      <div className="text-white text-sm font-medium">{order.buyerName}</div>
                      <div className="text-[#606080] text-xs" dir="ltr">{order.orderNumber}</div>
                      <div className="text-[#808090] text-xs mt-0.5">{formatDate(order.createdAt)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-400 text-sm font-bold mb-1">{formatPrice(order.totalAmount)}</div>
                      <span className={`text-xs border rounded-full px-2 py-0.5 ${st.color}`}>{st.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div className="card-base p-5 space-y-4 sticky top-20">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-sm">تفاصيل الطلب</h3>
                <button onClick={() => setSelected(null)} className="text-[#606080] hover:text-white text-lg leading-none">×</button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#808090]">رقم الطلب</span><span className="text-white font-mono text-xs" dir="ltr">{selected.orderNumber}</span></div>
                <div className="flex justify-between"><span className="text-[#808090]">العميل</span><span className="text-white">{selected.buyerName}</span></div>
                <div className="flex justify-between"><span className="text-[#808090]">البريد</span><span className="text-white text-xs" dir="ltr">{selected.buyerEmail}</span></div>
                {selected.buyerPhone && <div className="flex justify-between"><span className="text-[#808090]">الهاتف</span><span className="text-white" dir="ltr">{selected.buyerPhone}</span></div>}
                <div className="flex justify-between"><span className="text-[#808090]">الدفع</span><span className="text-white">{payMethodLabels[selected.paymentMethod] || selected.paymentMethod}</span></div>
                <div className="flex justify-between"><span className="text-[#808090]">الإجمالي</span><span className="text-purple-400 font-bold">{formatPrice(selected.totalAmount)}</span></div>
              </div>

              {selected.proofImageUrl && (
                <a href={selected.proofImageUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  عرض إيصال الدفع
                </a>
              )}

              <div className="border-t border-[#1a1a2e] pt-4 space-y-2">
                <p className="text-[#808090] text-xs mb-2">تغيير الحالة:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => updateStatus(selected.id, "processing")}
                    className="flex items-center justify-center gap-1 py-2 rounded-xl text-xs bg-blue-600/15 text-blue-400 border border-blue-600/20 hover:bg-blue-600/25 transition-colors">
                    <Clock className="w-3 h-3" />قيد المعالجة
                  </button>
                  <button onClick={() => updateStatus(selected.id, "completed", "paid")}
                    className="flex items-center justify-center gap-1 py-2 rounded-xl text-xs bg-green-600/15 text-green-400 border border-green-600/20 hover:bg-green-600/25 transition-colors">
                    <CheckCircle className="w-3 h-3" />مكتمل
                  </button>
                  <button onClick={() => updateStatus(selected.id, "cancelled")}
                    className="flex items-center justify-center gap-1 py-2 rounded-xl text-xs bg-red-600/15 text-red-400 border border-red-600/20 hover:bg-red-600/25 transition-colors col-span-2">
                    <XCircle className="w-3 h-3" />إلغاء الطلب
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-base p-8 text-center text-[#808090] text-sm">
              اختر طلبًا لعرض تفاصيله
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
