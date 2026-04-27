"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  /** Per-character delay in ms */
  speed?: number;
  /** Delay before starting in ms */
  startDelay?: number;
  /** Show blinking cursor */
  cursor?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Called once typing completes */
  onDone?: () => void;
}

export default function TypewriterText({
  text,
  speed = 90,
  startDelay = 0,
  cursor = true,
  className,
  style,
  onDone,
}: TypewriterTextProps) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setShown("");
    setDone(false);
    let i = 0;
    let cancelled = false;

    const start = setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          setDone(true);
          onDone?.();
          return;
        }
        setTimeout(tick, speed + Math.random() * 30);
      };
      tick();
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [text, speed, startDelay, onDone]);

  return (
    <span className={className} style={style}>
      {shown}
      {cursor && (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "0.08em",
            marginInlineStart: "0.05em",
            background: "currentColor",
            opacity: done ? 0 : 1,
            animation: "abud-blink 1s steps(2) infinite",
            verticalAlign: "baseline",
            height: "0.9em",
            transform: "translateY(0.08em)",
          }}
        />
      )}
      <style jsx global>{`
        @keyframes abud-blink {
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
