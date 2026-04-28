"use client";

import { useEffect, useMemo, useState } from "react";

const SNIPPETS = [
  "const abud = () => build()",
  "import { AI } from 'future'",
  "<Component prop={magic} />",
  "function deploy() { ship() }",
  "type User = { name: string }",
  "await fetch('/api/services')",
  "git commit -m 'feat: 🚀'",
  "useEffect(() => glow(), [])",
  "export default Greatness;",
  "npm run build && deploy",
  "if (idea) build(it);",
  "const stack = ['Next', 'AI']",
  "<Bot intelligent={true} />",
  "while (creating) iterate()",
  "// TODO: change the world",
];

interface FloatingCodeSnippetsProps {
  className?: string;
  count?: number;
}

interface Snip {
  text: string;
  top: string;
  left: string;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  drift: number;
}

export default function FloatingCodeSnippets({
  className,
  count = 9,
}: FloatingCodeSnippetsProps) {
  const [config, setConfig] = useState<{ count: number; show: boolean }>({
    count,
    show: true,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setConfig({
      // Skip the effect entirely under reduced-motion preference.
      show: !reduceMotion,
      // Half the snippets on mobile for a calmer, lighter hero.
      count: isMobile ? Math.max(3, Math.floor(count / 2)) : count,
    });
  }, [count]);

  const items = useMemo<Snip[]>(() => {
    if (!config.show) return [];
    const arr: Snip[] = [];
    for (let i = 0; i < config.count; i++) {
      arr.push({
        text: SNIPPETS[i % SNIPPETS.length],
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`,
        delay: Math.random() * 8,
        duration: 14 + Math.random() * 10,
        size: 11 + Math.random() * 3,
        opacity: 0.08 + Math.random() * 0.12,
        drift: 20 + Math.random() * 40,
      });
    }
    return arr;
  }, [config.count, config.show]);

  return (
    <div
      className={className}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {items.map((s, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            color: "#c084fc",
            opacity: s.opacity,
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            fontSize: `${s.size}px`,
            whiteSpace: "nowrap",
            filter: "blur(0.3px)",
            animation: `abud-float-${i} ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        >
          {s.text}
          <style jsx>{`
            @keyframes abud-float-${i} {
              0%   { transform: translate(0, 0); }
              100% { transform: translate(${s.drift}px, -${s.drift / 2}px); }
            }
          `}</style>
        </span>
      ))}
    </div>
  );
}
