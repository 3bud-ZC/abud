"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(147,51,234,0.08)_0%,transparent_60%)]" />

      <div className="relative text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a1a2e] border border-[#2a2a3e] font-mono text-sm text-[#a0a0b8] mb-8">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400">ERROR</span>
            <span>404: page_not_found</span>
          </div>

          <h1 className="text-8xl font-black text-transparent bg-clip-text mb-4"
            style={{ backgroundImage: "linear-gradient(135deg, #c084fc, #9333ea, #6b21a8)" }}>
            404
          </h1>
          <h2 className="text-2xl font-bold text-white mb-3">الصفحة غير موجودة</h2>
          <p className="text-[#a0a0b8] leading-relaxed mb-8">
            يبدو أن الصفحة التي تبحث عنها لا وجود لها أو تم نقلها.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link href="/" className="btn-primary gap-2">
            <Home className="w-4 h-4" />
            الصفحة الرئيسية
          </Link>
          <button onClick={() => window.history.back()} className="btn-outline gap-2">
            <ArrowLeft className="w-4 h-4" />
            العودة للخلف
          </button>
        </motion.div>
      </div>
    </div>
  );
}
