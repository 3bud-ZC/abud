"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  /** Base font-size CSS (responsive clamp recommended) */
  fontSize?: string;
}

/**
 * HolographicWordmark — Cinematic combo wordmark
 *  • Letter-by-letter cascade reveal with glow burst
 *  • Liquid-chrome shimmer (animated gradient)
 *  • 3D parallax tilt that follows the mouse
 *  • One-shot scan beam after entrance
 *  • Continuous animated data-stream underline
 */
export default function HolographicWordmark({
  text,
  className = "",
  fontSize = "clamp(2.8rem, 9vw, 6rem)",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Mouse parallax — raw motion values
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring-smoothed values
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });

  // Map mouse position to tilt degrees
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);

  // Hue shift based on mouse X (foil holographic feel)
  const hueShift = useTransform(sx, [-0.5, 0.5], [-25, 25]);

  // Trigger entrance scan beam after letters revealed
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 700);
    return () => clearTimeout(t);
  }, []);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  const letters = text.split("");

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative inline-block ${className}`}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          filter: useTransform(hueShift, (v) => `hue-rotate(${v}deg)`),
        }}
        className="relative will-change-transform"
      >
        {/* The wordmark itself */}
        <h1
          className="font-black m-0 leading-none relative"
          style={{ fontSize, letterSpacing: "-0.04em", lineHeight: 1 }}
          aria-label={text}
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.6, rotateX: -60, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.08 + i * 0.11,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block relative liquid-chrome-letter"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "50% 100%",
              }}
              aria-hidden
            >
              {/* Glow burst at the moment of reveal */}
              <motion.span
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0, 1, 0], scale: [0.4, 2.2, 2.6] }}
                transition={{
                  duration: 1.0,
                  delay: 0.08 + i * 0.11,
                  ease: "easeOut",
                }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(192,132,252,0.7) 0%, rgba(168,85,247,0.3) 35%, transparent 70%)",
                  filter: "blur(14px)",
                  zIndex: -1,
                }}
              />
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}

          {/* One-shot scan beam after entrance */}
          {revealed && (
            <motion.span
              key="scan"
              initial={{ x: "-110%", opacity: 0 }}
              animate={{ x: "110%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.4, ease: "easeInOut", delay: 0.1 }}
              className="absolute inset-y-0 pointer-events-none"
              style={{
                width: "30%",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 35%, rgba(232,121,249,0.6) 50%, rgba(255,255,255,0.55) 65%, transparent 100%)",
                mixBlendMode: "overlay",
                filter: "blur(2px)",
                left: 0,
              }}
              aria-hidden
            />
          )}
        </h1>

        {/* Animated data-stream underline */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[3px] w-full mt-3 origin-center overflow-hidden rounded-full"
          style={{ transform: "translateZ(20px)" }}
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(192,132,252,0.5) 50%, transparent 100%)",
            }}
          />
          <motion.div
            className="absolute inset-y-0 w-1/3"
            initial={{ x: "-100%" }}
            animate={{ x: "300%" }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: 1.2 }}
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #f0abfc 30%, #ffffff 50%, #c084fc 70%, transparent 100%)",
              boxShadow: "0 0 14px rgba(232,121,249,0.8), 0 0 24px rgba(168,85,247,0.5)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Local styles for the liquid-chrome shimmer */}
      <style jsx>{`
        :global(.liquid-chrome-letter) {
          background-image: linear-gradient(
            115deg,
            #f0abfc 0%,
            #c084fc 18%,
            #ffffff 32%,
            #c084fc 46%,
            #9333ea 62%,
            #ffffff 78%,
            #c084fc 92%,
            #7c3aed 100%
          );
          background-size: 280% 100%;
          background-position: 0% 50%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: liquid-chrome-flow 5.5s linear infinite;
          will-change: background-position;
          /* Crisp inner edge */
          text-shadow: 0 0 0 transparent;
        }
        @keyframes liquid-chrome-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 280% 50%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.liquid-chrome-letter) {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
