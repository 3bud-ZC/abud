"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "البداية" },
  { id: "work", label: "أعمال" },
  { id: "stats", label: "الأرقام" },
  { id: "skills", label: "المهارات" },
  { id: "stack", label: "الأدوات" },
  { id: "current", label: "الآن" },
  { id: "principles", label: "المبادئ" },
  { id: "timeline", label: "المسيرة" },
  { id: "faq", label: "الأسئلة" },
  { id: "cta", label: "ابدأ" },
];

export default function QuickNav() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsVisible(scrollY > 400);

    let current = SECTIONS[0].id;
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          current = section.id;
        }
      }
    }
    setActiveId(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="fixed top-[72px] left-0 right-0 z-40 px-4"
    >
      <div
        className="max-w-4xl mx-auto rounded-2xl px-3 py-2 flex gap-1 overflow-x-auto scrollbar-hide"
        style={{
          background: "rgba(10,8,18,0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(168,85,247,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollTo(section.id)}
              className="relative whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors flex-shrink-0"
              style={{
                color: isActive ? "#ffffff" : "#a0a0c0",
                background: isActive ? "rgba(168,85,247,0.25)" : "transparent",
                border: isActive ? "1px solid rgba(192,132,252,0.4)" : "1px solid transparent",
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="quick-nav-active"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "rgba(168,85,247,0.15)",
                    border: "1px solid rgba(192,132,252,0.35)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{section.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
