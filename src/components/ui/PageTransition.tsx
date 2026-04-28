"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Lightweight fade-in on route change.
 * No `mode="wait"` — the new page mounts immediately so navigation
 * feels instant. The exit animation is dropped entirely (it was the
 * source of the perceived "lag" between pages).
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
