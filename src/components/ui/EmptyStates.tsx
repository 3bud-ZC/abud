"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center py-16 px-4"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600/20 to-purple-800/10 border border-purple-600/20 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15)_0%,transparent_70%)]" />
          <Icon className="w-10 h-10 text-purple-400/70 relative z-10" />
        </motion.div>

        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-[#8888a8] text-sm leading-relaxed mb-6">{description}</p>

        {(actionLabel && (actionHref || onAction)) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {actionHref ? (
              <Link href={actionHref} className="btn-primary inline-flex">
                {actionLabel}
              </Link>
            ) : (
              <button onClick={onAction} className="btn-primary">
                {actionLabel}
              </button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function EmptySearchState({ onClear }: { onClear?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center">
        <svg className="w-8 h-8 text-purple-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <p className="text-[#a0a0b8] text-base mb-2">لا توجد نتائج مطابقة</p>
      <p className="text-[#606080] text-sm mb-4">جرب كلمات بحث مختلفة</p>
      {onClear && (
        <button onClick={onClear} className="btn-outline text-sm">
          مسح الفلاتر
        </button>
      )}
    </motion.div>
  );
}
