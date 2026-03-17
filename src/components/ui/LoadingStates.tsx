"use client";

import { motion } from "framer-motion";

export function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="aspect-video bg-[#0a0a12] relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/10 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="h-3 bg-[#1a1a2e] rounded-full w-1/3 animate-pulse" />
        <div className="h-4 bg-[#1a1a2e] rounded-full w-4/5 animate-pulse" />
        <div className="h-3 bg-[#1a1a2e] rounded-full w-2/3 animate-pulse" />
        <div className="flex items-center gap-2 pt-2">
          <div className="h-8 bg-[#1a1a2e] rounded-lg flex-1 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonBlogCard() {
  return (
    <div className="glass-card overflow-hidden flex flex-col">
      <div className="aspect-video bg-[#0a0a12] relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/10 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="p-5 flex-1 flex flex-col space-y-3">
        <div className="h-3 bg-[#1a1a2e] rounded-full w-1/4 animate-pulse" />
        <div className="h-4 bg-[#1a1a2e] rounded-full w-full animate-pulse" />
        <div className="h-3 bg-[#1a1a2e] rounded-full w-3/4 animate-pulse" />
        <div className="flex-1" />
        <div className="flex items-center justify-between pt-3 border-t border-[#1a1a2e]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#1a1a2e] animate-pulse" />
            <div className="h-3 bg-[#1a1a2e] rounded-full w-16 animate-pulse" />
          </div>
          <div className="h-3 bg-[#1a1a2e] rounded-full w-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonListItem() {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#0a0a12] border border-[#1a1a2e]">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-9 h-9 rounded-xl bg-[#1a1a2e] animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-[#1a1a2e] rounded-full w-3/4 animate-pulse" />
          <div className="h-2 bg-[#1a1a2e] rounded-full w-1/2 animate-pulse" />
        </div>
      </div>
      <div className="w-4 h-4 rounded bg-[#1a1a2e] animate-pulse" />
    </div>
  );
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full border-purple-600 border-t-transparent animate-spin`} />
  );
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center"
        >
          <div className="w-8 h-8 rounded-xl bg-[#050508]" />
        </motion.div>
        <p className="text-sm text-[#8888a8]">جاري التحميل...</p>
      </div>
    </div>
  );
}
