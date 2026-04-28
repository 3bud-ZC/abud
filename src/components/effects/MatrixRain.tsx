"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
  /** Opacity multiplier 0..1, default 0.18 (subtle) */
  opacity?: number;
  /** Font size in px, default 14 */
  fontSize?: number;
  /** Tail fade per frame 0..1 (lower = longer trails), default 0.06 */
  fade?: number;
  /** Speed multiplier, default 1 */
  speed?: number;
  className?: string;
}

const CHARS =
  "01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン{}<>[]()=>;|&!?+-*/#$_const fnletvar=>";

export default function MatrixRain({
  opacity = 0.18,
  fontSize = 14,
  fade = 0.06,
  speed = 1,
  className,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Honour prefers-reduced-motion: render nothing.
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // On small screens we drop the FPS further to keep mobile smooth.
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const targetFps = isMobile ? 16 : 24;
    const frameDuration = 1000 / targetFps;

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    let raf = 0;
    let lastTime = 0;
    let paused = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -height);
      ctx.font = `${fontSize}px ui-monospace, "SF Mono", Menlo, monospace`;
    };

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (paused) return;
      if (time - lastTime < frameDuration) return;
      lastTime = time;

      ctx.fillStyle = `rgba(4, 4, 8, ${fade})`;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < columns; i++) {
        const ch = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
        const x = i * fontSize;
        const y = drops[i];

        ctx.fillStyle = `rgba(216, 180, 254, ${opacity * 1.3})`;
        ctx.fillText(ch, x, y);
        ctx.fillStyle = `rgba(147, 51, 234, ${opacity})`;
        ctx.fillText(ch, x, y - fontSize);

        if (y > height + Math.random() * 200) {
          drops[i] = -fontSize * (Math.random() * 20);
        } else {
          drops[i] += fontSize * speed * 0.6;
        }
      }
    };

    // Pause when the tab is hidden — saves CPU on background tabs.
    const onVisibility = () => {
      paused = document.hidden;
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [opacity, fontSize, fade, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
      aria-hidden
    />
  );
}
