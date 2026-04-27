"use client";

import { useEffect, useState, useRef } from "react";

/* ── Token-based syntax highlighting ── */
type Token = { text: string; color: string };

const COLORS = {
  keyword:  "#c084fc", // purple
  string:   "#86efac", // green
  number:   "#fbbf24", // amber
  comment:  "#475569", // gray
  func:     "#67e8f9", // cyan
  prop:     "#f0abfc", // pink
  punct:    "#94a3b8", // slate
  base:     "#e2e8f0", // light
};

/** Pre-tokenized code lines (so we don't need a runtime tokenizer) */
const LINES: Token[][] = [
  [
    { text: "const ", color: COLORS.keyword },
    { text: "abud ", color: COLORS.base },
    { text: "= ", color: COLORS.punct },
    { text: "{", color: COLORS.punct },
  ],
  [
    { text: "  role: ", color: COLORS.prop },
    { text: '"Full-Stack Developer"', color: COLORS.string },
    { text: ",", color: COLORS.punct },
  ],
  [
    { text: "  stack: ", color: COLORS.prop },
    { text: "[", color: COLORS.punct },
    { text: '"Next.js"', color: COLORS.string },
    { text: ", ", color: COLORS.punct },
    { text: '"AI/LLMs"', color: COLORS.string },
    { text: ", ", color: COLORS.punct },
    { text: '"Python"', color: COLORS.string },
    { text: "]", color: COLORS.punct },
    { text: ",", color: COLORS.punct },
  ],
  [
    { text: "  building: ", color: COLORS.prop },
    { text: '"products + services"', color: COLORS.string },
    { text: ",", color: COLORS.punct },
  ],
  [
    { text: "  available: ", color: COLORS.prop },
    { text: "true", color: COLORS.keyword },
    { text: ",", color: COLORS.punct },
  ],
  [
    { text: "}", color: COLORS.punct },
    { text: ";", color: COLORS.punct },
  ],
  [{ text: "", color: COLORS.base }],
  [
    { text: "// ", color: COLORS.comment },
    { text: "Let's build something great 🚀", color: COLORS.comment },
  ],
  [
    { text: "abud", color: COLORS.base },
    { text: ".", color: COLORS.punct },
    { text: "ship", color: COLORS.func },
    { text: "(", color: COLORS.punct },
    { text: ")", color: COLORS.punct },
    { text: ";", color: COLORS.punct },
  ],
];

/* ── flatten total characters for typing ── */
function flatLength(line: Token[]) {
  return line.reduce((acc, t) => acc + t.text.length, 0);
}

function renderLineUpTo(line: Token[], chars: number) {
  const out: React.ReactNode[] = [];
  let remaining = chars;
  for (let i = 0; i < line.length; i++) {
    const t = line[i];
    if (remaining <= 0) break;
    const take = Math.min(remaining, t.text.length);
    out.push(
      <span key={i} style={{ color: t.color }}>
        {t.text.slice(0, take)}
      </span>
    );
    remaining -= take;
  }
  return out;
}

interface LiveTerminalProps {
  className?: string;
  /** ms per character */
  speed?: number;
  /** ms pause at end before restart */
  loopDelay?: number;
}

export default function LiveTerminal({
  className,
  speed = 35,
  loopDelay = 4500,
}: LiveTerminalProps) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (done) {
      timer.current = window.setTimeout(() => {
        setLineIdx(0);
        setCharIdx(0);
        setDone(false);
      }, loopDelay);
      return () => {
        if (timer.current) clearTimeout(timer.current);
      };
    }

    const currentLine = LINES[lineIdx];
    const lineLen = flatLength(currentLine);

    if (charIdx >= lineLen) {
      // line complete → next line
      if (lineIdx >= LINES.length - 1) {
        setDone(true);
        return;
      }
      timer.current = window.setTimeout(() => {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, 220);
      return () => {
        if (timer.current) clearTimeout(timer.current);
      };
    }

    timer.current = window.setTimeout(() => {
      setCharIdx((c) => c + 1);
    }, speed + Math.random() * 25);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [lineIdx, charIdx, done, speed, loopDelay]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: "1rem",
        overflow: "hidden",
        background: "linear-gradient(160deg, #0a0612 0%, #050308 100%)",
        border: "1px solid rgba(147,51,234,0.25)",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.6), 0 0 60px rgba(147,51,234,0.12), inset 0 1px 0 rgba(192,132,252,0.1)",
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
      }}
      dir="ltr"
    >
      {/* Terminal header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 14px",
          background: "rgba(15,8,24,0.95)",
          borderBottom: "1px solid rgba(40,28,65,0.9)",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ width: 11, height: 11, borderRadius: 6, background: "#ef4444", opacity: 0.85 }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: "#f59e0b", opacity: 0.85 }} />
          <span style={{ width: 11, height: 11, borderRadius: 6, background: "#22c55e", opacity: 0.85 }} />
        </div>
        <span style={{ color: "#64748b", fontSize: "11px", marginInlineStart: "8px" }}>
          ~/abud — zsh — 80×24
        </span>
      </div>

      {/* Code area */}
      <div
        style={{
          padding: "16px 18px",
          fontSize: "13.5px",
          lineHeight: 1.7,
          color: COLORS.base,
          minHeight: "240px",
        }}
      >
        {LINES.map((line, i) => {
          const completed = i < lineIdx;
          const active = i === lineIdx;
          const upTo = completed ? flatLength(line) : active ? charIdx : 0;
          return (
            <div
              key={i}
              style={{
                whiteSpace: "pre",
                opacity: i > lineIdx ? 0 : 1,
                minHeight: "1.7em",
                transition: "opacity 0.2s",
              }}
            >
              {renderLineUpTo(line, upTo)}
              {active && (
                <span
                  aria-hidden
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "1em",
                    background: COLORS.keyword,
                    marginInlineStart: "2px",
                    transform: "translateY(2px)",
                    animation: "abud-cursor-blink 1s steps(2) infinite",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @keyframes abud-cursor-blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
