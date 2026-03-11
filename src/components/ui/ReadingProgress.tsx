"use client";

import { useState, useEffect, useRef } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    articleRef.current = document.querySelector("article");
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const article = articleRef.current;
        if (!article) return;
        const { top, height } = article.getBoundingClientRect();
        const winH = window.innerHeight;
        const scrolled = Math.max(0, winH - top);
        setProgress(Math.min(100, Math.round((scrolled / (height + winH)) * 100)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]" style={{ background: "rgba(15,15,24,0.5)" }}>
      <div
        className="h-full transition-all duration-100"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)",
          boxShadow: progress > 5 ? "0 0 8px rgba(168,85,247,0.6)" : "none",
        }}
      />
    </div>
  );
}
