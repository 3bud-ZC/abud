"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mail, Phone, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "201080672974";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("أهلاً! وصلت من موقعك abud.fun وأحب أتواصل معاك بخصوص مشروع.")}`;
const EMAIL = "abed@abud.fun";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setShowPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  // Hide on /contact page (already has WhatsApp prominent)
  if (!mounted || pathname?.startsWith("/contact") || pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[60] flex flex-col items-start gap-3" dir="ltr">
      {/* Expanded menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl overflow-hidden backdrop-blur-xl"
            style={{
              background: "linear-gradient(160deg, rgba(18,10,30,0.96) 0%, rgba(10,10,18,0.96) 100%)",
              border: "1px solid rgba(168,85,247,0.4)",
              boxShadow: "0 12px 48px rgba(0,0,0,0.6), 0 0 30px rgba(147,51,234,0.25)",
              minWidth: "260px",
            }}
          >
            <div className="p-4" dir="rtl">
              <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: "1px solid rgba(168,85,247,0.18)" }}>
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span className="text-white font-bold text-sm">تواصل سريع</span>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl transition-all group mb-1.5"
                style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(34,197,94,0.18)";
                  e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(34,197,94,0.08)";
                  e.currentTarget.style.borderColor = "rgba(34,197,94,0.2)";
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(34,197,94,0.2)", border: "1px solid rgba(34,197,94,0.4)" }}>
                  <MessageCircle className="w-4 h-4 text-green-300" />
                </div>
                <div className="flex-1 text-right">
                  <div className="text-white font-semibold text-sm">واتساب</div>
                  <div className="text-[#9090b0] text-xs">رد فوري خلال دقائق</div>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 p-3 rounded-xl transition-all group mb-1.5"
                style={{ background: "rgba(147,51,234,0.08)", border: "1px solid rgba(147,51,234,0.2)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(147,51,234,0.18)";
                  e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(147,51,234,0.08)";
                  e.currentTarget.style.borderColor = "rgba(147,51,234,0.2)";
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(147,51,234,0.22)", border: "1px solid rgba(168,85,247,0.4)" }}>
                  <Mail className="w-4 h-4 text-purple-200" />
                </div>
                <div className="flex-1 text-right">
                  <div className="text-white font-semibold text-sm">البريد الإلكتروني</div>
                  <div className="text-[#9090b0] text-xs" dir="ltr">{EMAIL}</div>
                </div>
              </a>

              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="flex items-center gap-3 p-3 rounded-xl transition-all group"
                style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(96,165,250,0.18)";
                  e.currentTarget.style.borderColor = "rgba(96,165,250,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(96,165,250,0.08)";
                  e.currentTarget.style.borderColor = "rgba(96,165,250,0.2)";
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(96,165,250,0.22)", border: "1px solid rgba(96,165,250,0.4)" }}>
                  <Phone className="w-4 h-4 text-blue-300" />
                </div>
                <div className="flex-1 text-right">
                  <div className="text-white font-semibold text-sm">اتصال مباشر</div>
                  <div className="text-[#9090b0] text-xs" dir="ltr">+20 108 067 2974</div>
                </div>
              </a>

              <p className="text-center text-[10px] mt-3 pt-2.5" style={{ color: "#7878a0", borderTop: "1px solid rgba(40,40,60,0.6)" }}>
                ⚡ متاح للمشاريع الجديدة
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="تواصل سريع"
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{
          background: open
            ? "linear-gradient(135deg, #7e22ce 0%, #4c1d95 100%)"
            : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          border: open ? "1px solid rgba(168,85,247,0.5)" : "1px solid rgba(74,222,128,0.5)",
          boxShadow: open
            ? "0 8px 28px rgba(0,0,0,0.5), 0 0 24px rgba(147,51,234,0.6)"
            : "0 8px 28px rgba(0,0,0,0.5), 0 0 24px rgba(34,197,94,0.55)",
        }}
      >
        {/* Pulse ring (only first 8s) */}
        {showPulse && !open && (
          <>
            <motion.span
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ border: "2px solid rgba(74,222,128,0.6)" }}
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ border: "2px solid rgba(74,222,128,0.4)" }}
              animate={{ scale: [1, 1.8, 1.8], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            />
          </>
        )}

        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="w-6 h-6 text-white" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="msg"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.5} fill="rgba(255,255,255,0.15)" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
