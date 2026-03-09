"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, Mail, Home } from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-black text-white mb-3">تم تقديم طلبك!</h1>
          <p className="text-[#a0a0b8] mb-6 leading-relaxed">
            شكرًا لطلبك. سيتم مراجعته وتسليمك المنتج على بريدك الإلكتروني بعد تأكيد الدفع.
          </p>

          {orderNumber && (
            <div className="card-base p-4 mb-6">
              <p className="text-[#808090] text-sm mb-1">رقم الطلب</p>
              <p className="text-purple-400 font-mono font-bold text-lg" dir="ltr">{orderNumber}</p>
            </div>
          )}

          <div className="space-y-3 text-right bg-[#080810] border border-[#1a1a2e] rounded-2xl p-5 mb-8">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-purple-600/15 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">تحقق من بريدك الإلكتروني</p>
                <p className="text-[#808090] text-xs">ستصلك رسالة تأكيد قريبًا</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-purple-600/15 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">مراجعة إيصال الدفع</p>
                <p className="text-[#808090] text-xs">سيتم التحقق خلال 24 ساعة</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/store" className="btn-primary gap-2">
              <ShoppingBag className="w-4 h-4" />
              تصفح المزيد
            </Link>
            <Link href="/" className="btn-outline gap-2">
              <Home className="w-4 h-4" />
              الصفحة الرئيسية
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
