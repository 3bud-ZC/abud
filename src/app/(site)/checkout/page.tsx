"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { trackCheckoutStart, trackCheckoutPaymentMethodSelected, trackCheckoutSubmit } from "@/lib/analytics";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import Image from "next/image";
import { ShoppingCart, CreditCard, CheckCircle, Upload, X, Loader2, ArrowRight, Tag } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const schema = z.object({
  buyerName: z.string().min(2, "الاسم مطلوب"),
  buyerEmail: z.string().email("بريد إلكتروني غير صحيح"),
  buyerPhone: z.string().optional(),
  paymentMethod: z.enum(["vodafone_cash", "instapay", "paypal"]),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Product {
  id: string;
  title: string;
  price: number;
  coverImage?: string;
  category?: { name: string };
}

interface PaymentSetting {
  method: string;
  label?: string;
  instructions: string;
  destination?: string;
  isActive: boolean;
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("product");

  const [product, setProduct] = useState<Product | null>(null);
  const [payments, setPayments] = useState<PaymentSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("vodafone_cash");
  const [couponInput, setCouponInput] = useState("");
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const hasTrackedCheckoutStart = useRef(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { paymentMethod: "vodafone_cash" },
  });

  const payMethod = watch("paymentMethod");

  useEffect(() => {
    // Track checkout start only once
    if (productId && !hasTrackedCheckoutStart.current) {
      trackCheckoutStart({ product_id: productId });
      hasTrackedCheckoutStart.current = true;
    }

    async function load() {
      try {
        const [pRes, payRes] = await Promise.all([
          productId ? fetch(`/api/products/${productId}?by=id`) : Promise.resolve(null),
          fetch("/api/payments/settings"),
        ]);
        if (pRes) {
          const pData = await pRes.json();
          if (pData.product) setProduct(pData.product);
        }
        if (payRes.ok) {
          const payData = await payRes.json();
          setPayments(payData.settings || []);
        }
      } catch { /* ignore */ }
      finally { setLoading(false); }
    }
    load();
  }, [productId]);

  const activePayments = payments.filter((p) => p.isActive);
  const currentPayment = activePayments.find((p) => p.method === payMethod);
  const needsProof = payMethod === "vodafone_cash" || payMethod === "instapay";

  async function applyCoupon() {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput.trim() }),
      });
      const json = await res.json();
      if (!res.ok) { setCouponError(json.error || "كود غير صحيح"); setCouponDiscount(0); setCouponCode(null); }
      else { setCouponCode(json.code); setCouponDiscount(json.discount); setCouponError(""); toast.success(json.message); }
    } catch { setCouponError("حدث خطأ في التحقق"); }
    finally { setCouponLoading(false); }
  }

  function removeCoupon() { setCouponCode(null); setCouponDiscount(0); setCouponError(""); setCouponInput(""); }

  const finalPrice = product ? Math.round(product.price * (1 - couponDiscount / 100)) : 0;
  const savings = product ? product.price - finalPrice : 0;

  async function onSubmit(data: FormData) {
    if (!product) { toast.error("لم يتم تحديد منتج"); return; }
    if (needsProof && !proofFile) { toast.error("يرجى رفع إيصال الدفع"); return; }

    // Track checkout submit
    trackCheckoutSubmit({
      product_id: product.id,
      payment_method: data.paymentMethod,
      order_value: finalPrice,
    });

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("productId", product.id);
      formData.append("buyerName", data.buyerName);
      formData.append("buyerEmail", data.buyerEmail);
      if (data.buyerPhone) formData.append("buyerPhone", data.buyerPhone);
      formData.append("paymentMethod", data.paymentMethod);
      if (data.notes) formData.append("notes", data.notes);
      if (proofFile) formData.append("proofFile", proofFile);

      const res = await fetch("/api/orders", { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      const orderData = await res.json();
      router.push(`/checkout/success?order=${orderData.orderNumber}`);
    } catch {
      toast.error("حدث خطأ أثناء إنشاء الطلب");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShoppingCart className="w-16 h-16 text-purple-600/30 mx-auto" />
          <p className="text-[#a0a0b8] mb-4">لم يتم تحديد منتج للشراء</p>
          <a href="/store" className="btn-primary inline-flex gap-2">
            <ArrowRight className="w-4 h-4" />
            تصفح المتجر
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black text-white">إتمام الشراء</h1>
          </div>
          <p className="text-sm text-[#8888a8] mr-9">احصل على منتجك فورًا بعد إتمام الدفع — عملية آمنة ومشفرة 100%</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left — Form */}
            <div className="md:col-span-2 space-y-6">
              {/* Customer Info */}
              <div className="card-base p-6">
                <h2 className="text-white font-bold mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                  بياناتك
                </h2>
                <p className="text-xs text-[#8888a8] mb-5 mr-8">سنرسل لك المنتج على البريد الإلكتروني فور التأكيد</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#a0a0b8] mb-1.5">الاسم الكامل *</label>
                    <input {...register("buyerName")} placeholder="اسمك الكامل"
                      className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
                    {errors.buyerName && <p className="text-red-400 text-xs mt-1">{errors.buyerName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-[#a0a0b8] mb-1.5">البريد الإلكتروني *</label>
                    <input {...register("buyerEmail")} type="email" placeholder="email@example.com" dir="ltr"
                      className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
                    {errors.buyerEmail && <p className="text-red-400 text-xs mt-1">{errors.buyerEmail.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-[#a0a0b8] mb-1.5">رقم الهاتف</label>
                    <input {...register("buyerPhone")} type="tel" placeholder="اختياري" dir="ltr"
                      className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#a0a0b8] mb-1.5">ملاحظات</label>
                    <input {...register("notes")} placeholder="أي ملاحظات إضافية"
                      className="w-full bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#606080] outline-none transition-colors" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card-base p-6">
                <h2 className="text-white font-bold mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  طريقة الدفع
                </h2>
                <p className="text-xs text-[#8888a8] mb-5 mr-8">اختر الطريقة الأنسب لك — جميع المعاملات آمنة ومشفرة</p>
                <div className="space-y-3">
                  {activePayments.length === 0 ? (
                    <div className="text-center py-6 text-[#a0a0b8] text-sm">لا توجد طرق دفع متاحة حاليًا — تواصل معنا لإتمام الشراء</div>
                  ) : (
                    <div className="grid sm:grid-cols-3 gap-3">
                    {activePayments.map((pay) => {
                      const meta: Record<string, { label: string; icon: string; color: string }> = {
                        vodafone_cash: { label: "فودافون كاش", icon: "📱", color: "border-red-600/40 bg-red-600/5" },
                        instapay: { label: "إنستاباي", icon: "💳", color: "border-blue-600/40 bg-blue-600/5" },
                        paypal: { label: "PayPal", icon: "🌐", color: "border-sky-600/40 bg-sky-600/5" },
                      };
                      const m = meta[pay.method] || { label: pay.method, icon: "💰", color: "border-[#2a2a3e] bg-[#0d0d14]" };
                      const isSelected = payMethod === pay.method;
                      return (
                        <label key={pay.method} className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                          isSelected
                            ? "border-purple-600 bg-purple-600/10 shadow-[0_0_20px_rgba(147,51,234,0.15)]"
                            : `${m.color} hover:border-purple-600/40`
                        }`}>
                          <input type="radio" value={pay.method}
                            {...register("paymentMethod")}
                            onChange={() => { 
                              setValue("paymentMethod", pay.method as FormData["paymentMethod"]); 
                              setSelectedMethod(pay.method);
                              trackCheckoutPaymentMethodSelected(pay.method);
                            }}
                            className="hidden" />
                          <span className="text-2xl">{m.icon}</span>
                          <span className={`text-sm font-bold ${isSelected ? "text-purple-300" : "text-white"}`}>{m.label}</span>
                          {pay.destination && (
                            <span className="text-xs text-[#808090] font-mono" dir="ltr">{pay.destination}</span>
                          )}
                          {isSelected && (
                            <CheckCircle className="w-4 h-4 text-purple-400" />
                          )}
                        </label>
                      );
                    })}
                    </div>
                  )}
                </div>

                {currentPayment?.instructions && (
                  <div className="mt-4 p-4 bg-purple-600/5 border border-purple-600/20 rounded-xl">
                    <p className="text-sm text-white font-medium mb-1">تعليمات الدفع:</p>
                    <p className="text-[#a0a0b8] text-sm leading-relaxed whitespace-pre-line">{currentPayment.instructions}</p>
                  </div>
                )}

                {needsProof && (
                  <div className="mt-4">
                    <label className="block text-sm text-[#a0a0b8] mb-2">رفع إيصال الدفع *</label>
                    {proofFile ? (
                      <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-green-400 text-sm flex-1 truncate">{proofFile.name}</span>
                        <button type="button" onClick={() => setProofFile(null)} className="text-[#a0a0b8] hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-[#2a2a3e] rounded-xl cursor-pointer hover:border-purple-600/40 transition-colors">
                        <Upload className="w-6 h-6 text-purple-400" />
                        <span className="text-[#a0a0b8] text-sm">اضغط لرفع الإيصال</span>
                        <span className="text-[#606080] text-xs">PNG, JPG, PDF مسموح</span>
                        <input type="file" accept="image/*,.pdf" className="hidden"
                          onChange={(e) => { if (e.target.files?.[0]) setProofFile(e.target.files[0]); }} />
                      </label>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right — Summary */}
            <div>
              <div className="card-base p-6 sticky top-24">
                <h2 className="text-white font-bold mb-5 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  ملخص الطلب
                </h2>
                <div className="flex items-start gap-3 mb-5 pb-5 border-b border-[#1a1a2e]">
                  {product.coverImage ? (
                    <div className="relative w-14 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={product.coverImage} alt={product.title} fill className="object-cover" sizes="56px" />
                    </div>
                  ) : (
                    <div className="w-14 h-12 rounded-lg bg-[#1a1a2e] flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-purple-600/40" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium line-clamp-2">{product.title}</div>
                    {product.category && <div className="text-[#808090] text-xs mt-0.5">{product.category.name}</div>}
                  </div>
                </div>

                {/* Coupon */}
                <div className="mb-4">
                  {couponCode ? (
                    <div className="flex items-center justify-between p-3 rounded-xl"
                      style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}>
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400 text-sm font-bold font-mono">{couponCode}</span>
                        <span className="text-green-400 text-xs">-{couponDiscount}%</span>
                      </div>
                      <button type="button" onClick={removeCoupon}
                        className="text-[#606080] hover:text-white transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); applyCoupon(); } }}
                          placeholder="كود الخصم"
                          dir="ltr"
                          className="flex-1 bg-[#0d0d14] border border-[#1a1a2e] focus:border-purple-600/50 rounded-xl px-3 py-2 text-white text-sm placeholder-[#606080] outline-none transition-colors font-mono"
                        />
                        <button type="button" onClick={applyCoupon}
                          disabled={couponLoading || !couponInput.trim()}
                          className="px-3 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-40"
                          style={{ background: "linear-gradient(135deg,#9333ea,#6d28d9)", color: "white" }}>
                          {couponLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "تطبيق"}
                        </button>
                      </div>
                      {couponError && <p className="text-red-400 text-xs mt-1">{couponError}</p>}
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#a0a0b8]">السعر</span>
                    <span className="text-white">{formatPrice(product.price)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">خصم {couponDiscount}%</span>
                      <span className="text-green-400">-{formatPrice(savings)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#a0a0b8]">رسوم التوصيل</span>
                    <span className="text-green-400">مجاني</span>
                  </div>
                </div>

                <div className="flex justify-between font-black text-lg border-t border-[#1a1a2e] pt-4 mb-6">
                  <span className="text-white">الإجمالي</span>
                  <span className="text-purple-400">{formatPrice(finalPrice)}</span>
                </div>

                <button type="submit" disabled={submitting}
                  className="btn-primary w-full justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting
                    ? <><Loader2 className="w-4 h-4 animate-spin" />جاري المعالجة...</>
                    : <><CheckCircle className="w-4 h-4" />تأكيد الطلب</>}
                </button>

                <p className="text-[#606080] text-xs text-center mt-3">
                  بالضغط على تأكيد أنت توافق على شروط الاستخدام
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
