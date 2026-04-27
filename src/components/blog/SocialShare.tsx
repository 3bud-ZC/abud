"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Send, Copy, Check, Share2 } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  url: string;
  title: string;
}

export default function SocialShare({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const text = encodeURIComponent(title);
  const u = encodeURIComponent(url);

  const links = [
    {
      label: "X / Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${text}&url=${u}`,
      color: "#1DA1F2",
      bg: "rgba(29,161,242,0.12)",
      border: "rgba(29,161,242,0.35)",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      color: "#0A66C2",
      bg: "rgba(10,102,194,0.12)",
      border: "rgba(10,102,194,0.35)",
    },
    {
      label: "WhatsApp",
      icon: Send,
      href: `https://wa.me/?text=${text}%20${u}`,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.12)",
      border: "rgba(34,197,94,0.35)",
    },
    {
      label: "Telegram",
      icon: Send,
      href: `https://t.me/share/url?url=${u}&text=${text}`,
      color: "#229ED9",
      bg: "rgba(34,158,217,0.12)",
      border: "rgba(34,158,217,0.35)",
    },
  ];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("تم نسخ الرابط");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("فشل النسخ");
    }
  }

  async function handleNative() {
    if (typeof navigator !== "undefined" && (navigator as Navigator & { share?: (data: { title?: string; url?: string; text?: string }) => Promise<void> }).share) {
      try {
        await (navigator as Navigator & { share: (data: { title?: string; url?: string; text?: string }) => Promise<void> }).share({ title, url, text: title });
      } catch {
        /* user cancelled */
      }
    } else {
      handleCopy();
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold ml-1" style={{ color: "#9090b0" }}>
        شارك:
      </span>
      {links.map(({ label, icon: Icon, href, color, bg, border }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`شارك على ${label}`}
          whileHover={{ y: -2, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: bg, border: `1px solid ${border}` }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </motion.a>
      ))}

      <motion.button
        onClick={handleCopy}
        aria-label="نسخ الرابط"
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
        style={{ background: "rgba(147,51,234,0.12)", border: "1px solid rgba(168,85,247,0.4)" }}
      >
        {copied ? (
          <Check className="w-4 h-4" style={{ color: "#22c55e" }} />
        ) : (
          <Copy className="w-4 h-4" style={{ color: "#c084fc" }} />
        )}
      </motion.button>

      <motion.button
        onClick={handleNative}
        aria-label="مشاركة"
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
        style={{ background: "rgba(147,51,234,0.12)", border: "1px solid rgba(168,85,247,0.4)" }}
      >
        <Share2 className="w-4 h-4" style={{ color: "#c084fc" }} />
      </motion.button>
    </div>
  );
}
