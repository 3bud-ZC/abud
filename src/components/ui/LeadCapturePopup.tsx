"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Mail, Loader2, CheckCircle2, Zap } from "lucide-react";

const POPUP_KEY = "lead_popup_dismissed";
const POPUP_DELAY_MS = 15000;

export default function LeadCapturePopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(POPUP_KEY)) return;
    const t = setTimeout(() => setVisible(true), POPUP_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(POPUP_KEY, "1");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "lead_popup" }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "حدث خطأ"); }
      else { setDone(true); setTimeout(dismiss, 3000); }
    } catch { setError("فشل الاتصال — حاول مجددًا"); }
    finally { setLoading(false); }
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, rgba(14,10,22,0.98) 0%, rgba(8,8,14,0.98) 100%)",
                border: "1px solid rgba(147,51,234,0.25)",
                boxShadow: "0 0 60px rgba(147,51,234,0.15), 0 25px 50px rgba(0,0,0,0.6)",
              }}>

              {/* Purple glow top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 blur-[60px] pointer-events-none"
                style={{ background: "rgba(147,51,234,0.25)" }} />

              {/* Close */}
              <button onClick={dismiss}
                className="absolute top-4 left-4 w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200 z-10"
                style={{ background: "rgba(28,28,48,0.8)", color: "#606070" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#c084fc")}
                onMouseLeave={e => (e.currentTarget.style.color = "#606070")}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative p-8 text-center">
                {done ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-4"
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-white font-black text-xl mb-2">شكرًا! 🎉</h3>
                    <p className="text-sm" style={{ color: "#606070" }}>
                      تحقق من بريدك — الدليل في طريقه إليك.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                      style={{ background: "rgba(147,51,234,0.12)", border: "1px solid rgba(147,51,234,0.3)", color: "#c084fc" }}>
                      <Gift className="w-3 h-3" />
                      هدية مجانية
                    </div>

                    <h3 className="font-black text-white mb-2"
                      style={{ fontSize: "clamp(1.4rem,4vw,1.8rem)", letterSpacing: "-0.025em" }}>
                      احصل على دليلك المجاني
                    </h3>
                    <h4 className="font-bold mb-3" style={{ color: "#c084fc", fontSize: "1rem" }}>
                      &ldquo;10 طرق لكسب المال أونلاين بالذكاء الاصطناعي&rdquo;
                    </h4>
                    <p className="text-sm mb-6 leading-relaxed" style={{ color: "#606070" }}>
                      دليل عملي مجاني — ابدأ مشروعك الرقمي هذا الأسبوع.
                    </p>

                    <div className="flex items-center gap-2 flex-wrap justify-center mb-4 text-xs" style={{ color: "#484860" }}>
                      {["✓ مجاني 100%", "✓ دون بطاقة ائتمان", "✓ تحميل فوري"].map(t => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                            style={{ color: "#505070" }} />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={e => { setEmail(e.target.value); setError(""); }}
                            placeholder="بريدك الإلكتروني"
                            dir="ltr"
                            className="w-full pr-9 pl-4 py-3 rounded-xl text-white text-sm placeholder-[#505070] outline-none transition-all"
                            style={{ background: "rgba(12,12,20,0.9)", border: "1px solid rgba(35,35,55,0.8)" }}
                            onFocus={e => (e.target.style.borderColor = "rgba(147,51,234,0.5)")}
                            onBlur={e => (e.target.style.borderColor = "rgba(35,35,55,0.8)")}
                          />
                        </div>
                        <button type="submit" disabled={loading || !email.trim()}
                          className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-bold disabled:opacity-50 flex-shrink-0"
                          style={{ background: "linear-gradient(135deg,#9333ea,#6d28d9)", color: "white" }}>
                          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Zap className="w-4 h-4" />احصل عليه</>}
                        </button>
                      </div>
                      {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                    </form>

                    <p className="text-xs mt-3" style={{ color: "#404060" }}>
                      بدون إزعاج — يمكنك إلغاء الاشتراك في أي وقت
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
