"use client";

interface GlitchTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** "always" = continuous loop, "hover" = only on hover */
  mode?: "always" | "hover";
}

export default function GlitchText({
  text,
  className,
  style,
  mode = "always",
}: GlitchTextProps) {
  const cls = `abud-glitch ${mode === "hover" ? "abud-glitch-hover" : ""} ${className || ""}`;
  return (
    <span className={cls} data-text={text} style={style}>
      {text}
      <style jsx global>{`
        .abud-glitch {
          position: relative;
          display: inline-block;
        }
        .abud-glitch::before,
        .abud-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: transparent;
          pointer-events: none;
        }
        .abud-glitch::before {
          color: #c084fc;
          text-shadow: 1px 0 #c084fc;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(0, 0);
        }
        .abud-glitch::after {
          color: #67e8f9;
          text-shadow: -1px 0 #67e8f9;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          transform: translate(0, 0);
        }
        .abud-glitch:not(.abud-glitch-hover)::before {
          animation: abud-glitch-top 4.5s infinite linear alternate-reverse;
        }
        .abud-glitch:not(.abud-glitch-hover)::after {
          animation: abud-glitch-bottom 4.5s infinite linear alternate-reverse;
        }
        .abud-glitch-hover:hover::before {
          animation: abud-glitch-top 1s infinite linear alternate-reverse;
        }
        .abud-glitch-hover:hover::after {
          animation: abud-glitch-bottom 1s infinite linear alternate-reverse;
        }
        @keyframes abud-glitch-top {
          0%   { transform: translate(0, 0); opacity: 0; }
          88%  { transform: translate(0, 0); opacity: 0; }
          90%  { transform: translate(-3px, -1px); opacity: 0.85; }
          92%  { transform: translate(2px, 1px); opacity: 0.7; }
          94%  { transform: translate(-1px, 0); opacity: 0.5; }
          96%  { transform: translate(0, 0); opacity: 0; }
          100% { transform: translate(0, 0); opacity: 0; }
        }
        @keyframes abud-glitch-bottom {
          0%   { transform: translate(0, 0); opacity: 0; }
          88%  { transform: translate(0, 0); opacity: 0; }
          90%  { transform: translate(3px, 1px); opacity: 0.85; }
          92%  { transform: translate(-2px, -1px); opacity: 0.7; }
          94%  { transform: translate(1px, 0); opacity: 0.5; }
          96%  { transform: translate(0, 0); opacity: 0; }
          100% { transform: translate(0, 0); opacity: 0; }
        }
      `}</style>
    </span>
  );
}
