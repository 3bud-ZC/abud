"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="overflow-hidden rounded-xl transition-all duration-200"
      style={{
        background: open
          ? "linear-gradient(160deg, rgba(18,10,30,0.9), rgba(10,10,18,0.8))"
          : "rgba(10,10,18,0.6)",
        border: open ? "1px solid rgba(147,51,234,0.3)" : "1px solid rgba(28,28,48,0.8)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-right"
      >
        <span
          className="font-semibold text-sm leading-snug transition-colors duration-200"
          style={{ color: open ? "#e2d4f8" : "#c0c0d8" }}
        >
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className="w-4 h-4 transition-colors duration-200"
            style={{ color: open ? "#c084fc" : "#505070" }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div
              className="px-5 pb-5 text-sm leading-relaxed"
              style={{ color: "#707090", borderTop: "1px solid rgba(28,28,48,0.6)" }}
            >
              <div className="pt-4">{a}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FAQGroup {
  category: string;
  color: string;
  items: { q: string; a: string }[];
}

export default function FAQAccordion({ groups }: { groups: FAQGroup[] }) {
  return (
    <div className="relative z-10 max-w-3xl mx-auto space-y-12">
      {groups.map(({ category, color, items }, ci) => (
        <div key={ci}>
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              animate={{ boxShadow: [`0 0 12px ${color}40`, `0 0 24px ${color}80`, `0 0 12px ${color}40`] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: ci * 0.3 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: `${color}25`, border: `1px solid ${color}55` }}
            >
              <span style={{ color, fontWeight: 700, fontSize: 14 }}>?</span>
            </motion.div>
            <h2 className="text-white font-bold text-lg" style={{ letterSpacing: "-0.02em" }}>
              {category}
            </h2>
          </div>
          <div className="space-y-2">
            {items.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
