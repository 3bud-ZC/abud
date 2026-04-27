"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Final integer to count to (use 0 if "value" is non-numeric like "∞") */
  to: number;
  /** Animation duration in ms */
  duration?: number;
  /** Prefix shown before number (e.g. "+") */
  prefix?: string;
  /** Suffix after number (e.g. "+") */
  suffix?: string;
  /** Static text fallback when value is non-numeric (e.g. "∞") */
  fallback?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function CountUp({
  to,
  duration = 1600,
  prefix = "",
  suffix = "",
  fallback,
  className,
  style,
}: CountUpProps) {
  const [shown, setShown] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || fallback) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, fallback]);

  return (
    <span ref={ref} className={className} style={style}>
      {fallback ? fallback : `${prefix}${shown}${suffix}`}
    </span>
  );
}
