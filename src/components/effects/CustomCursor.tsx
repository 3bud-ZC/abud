"use client";

import { useEffect, useRef } from "react";

/**
 * Cyber cursor: a small purple dot exactly on the pointer + a larger ring
 * that lags behind smoothly. Ring grows on interactive elements (a, button, [data-cursor=hover]).
 * Hidden on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (
        t.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
        )
      ) {
        targetScale = 2.4;
        ring.style.borderColor = "rgba(192,132,252,0.95)";
        ring.style.background = "rgba(147,51,234,0.12)";
      } else {
        targetScale = 1;
        ring.style.borderColor = "rgba(192,132,252,0.55)";
        ring.style.background = "transparent";
      }
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      scale += (targetScale - scale) * 0.15;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#c084fc",
          boxShadow: "0 0 12px rgba(192,132,252,0.9), 0 0 24px rgba(147,51,234,0.6)",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "screen",
          transition: "opacity 0.2s",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "1.5px solid rgba(192,132,252,0.55)",
          pointerEvents: "none",
          zIndex: 99998,
          mixBlendMode: "screen",
          transition: "border-color 0.18s, background 0.18s, opacity 0.2s",
        }}
      />
    </>
  );
}
