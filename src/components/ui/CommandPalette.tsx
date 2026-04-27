"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Home, User, Briefcase, Folder, BookOpen, HelpCircle,
  MessageSquare, Mail, Github, Send, Sparkles, ArrowLeft, Globe,
  BrainCircuit, Layers, Shield, Code2, Zap, FileText, Calculator,
} from "lucide-react";

type Item = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  external?: boolean;
  action?: () => void;
  keywords?: string[];
  group: "navigate" | "services" | "resources" | "external" | "actions";
};

const ITEMS: Item[] = [
  // Navigate
  { id: "home", label: "الرئيسية", hint: "/", icon: Home, href: "/", group: "navigate", keywords: ["home", "main"] },
  { id: "about", label: "من أنا", hint: "/about", icon: User, href: "/about", group: "navigate", keywords: ["about", "bio"] },
  { id: "services", label: "الخدمات", hint: "/services", icon: Briefcase, href: "/services", group: "navigate", keywords: ["services", "work"] },
  { id: "portfolio", label: "أعمالي", hint: "/portfolio", icon: Folder, href: "/portfolio", group: "navigate", keywords: ["portfolio", "projects", "github"] },
  { id: "blog", label: "المدونة", hint: "/blog", icon: BookOpen, href: "/blog", group: "navigate", keywords: ["blog", "articles", "posts"] },
  { id: "resources", label: "المصادر", hint: "/resources", icon: Sparkles, href: "/resources", group: "navigate", keywords: ["resources", "tools"] },
  { id: "faq", label: "أسئلة شائعة", hint: "/faq", icon: HelpCircle, href: "/faq", group: "navigate", keywords: ["faq", "questions"] },
  { id: "contact", label: "تواصل معي", hint: "/contact", icon: MessageSquare, href: "/contact", group: "navigate", keywords: ["contact", "email", "reach"] },

  // Services shortcuts
  { id: "svc-web", label: "تطوير مواقع احترافية", hint: "خدمة تطوير", icon: Globe, href: "/services#web", group: "services" },
  { id: "svc-ai", label: "أدوات الذكاء الاصطناعي", hint: "خدمة AI", icon: BrainCircuit, href: "/services#ai", group: "services" },
  { id: "svc-bot", label: "بوتات تيليجرام", hint: "خدمة Bots", icon: Send, href: "/services#bots", group: "services" },
  { id: "svc-cyber", label: "الأمن السيبراني", hint: "خدمة Security", icon: Shield, href: "/services#cyber", group: "services" },
  { id: "svc-auto", label: "الأتمتة وسير العمل", hint: "خدمة Automation", icon: Layers, href: "/services#automation", group: "services" },

  // Resources categories
  { id: "res-ai", label: "أدوات AI", hint: "مصادر", icon: BrainCircuit, href: "/resources#ai-tools", group: "resources" },
  { id: "res-dev", label: "أدوات المطورين", hint: "مصادر", icon: Code2, href: "/resources#dev-tools", group: "resources" },
  { id: "res-free", label: "منصات الفريلانس", hint: "مصادر", icon: Briefcase, href: "/resources#freelancing", group: "resources" },
  { id: "res-prod", label: "الإنتاجية", hint: "مصادر", icon: Zap, href: "/resources#productivity", group: "resources" },

  // Actions
  { id: "act-quote", label: "حساب سعر مشروع", hint: "/quote", icon: Calculator, href: "/quote", group: "actions", keywords: ["quote", "price", "calculator", "سعر"] },
  { id: "act-whatsapp", label: "تواصل واتساب", hint: "WhatsApp", icon: MessageSquare, external: true, href: "https://wa.me/201080672974", group: "actions", keywords: ["whatsapp", "wa"] },
  { id: "act-email", label: "إرسال بريد إلكتروني", hint: "Email", icon: Mail, external: true, href: "mailto:abed@abud.fun", group: "actions", keywords: ["mail", "email"] },
  { id: "act-terms", label: "شروط الخدمة", hint: "/terms", icon: FileText, href: "/terms", group: "actions" },
  { id: "act-privacy", label: "سياسة الخصوصية", hint: "/privacy-policy", icon: Shield, href: "/privacy-policy", group: "actions" },

  // External
  { id: "ext-github", label: "GitHub", hint: "github.com/3bud-ZC", icon: Github, external: true, href: "https://github.com/3bud-ZC", group: "external" },
  { id: "ext-tg", label: "تيليجرام", hint: "@abud_dev", icon: Send, external: true, href: "https://t.me/abud_dev", group: "external" },
];

const GROUP_LABELS: Record<Item["group"], string> = {
  navigate: "التنقل",
  services: "الخدمات",
  resources: "المصادر",
  actions: "إجراءات سريعة",
  external: "روابط خارجية",
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // Hotkey: Cmd/Ctrl + K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = original; };
    }
  }, [open]);

  const handleSelect = (item: Item) => {
    if (item.action) {
      item.action();
      setOpen(false);
      return;
    }
    if (!item.href) return;
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
    setOpen(false);
  };

  const groups = ITEMS.reduce<Record<string, Item[]>>((acc, item) => {
    (acc[item.group] = acc[item.group] || []).push(item);
    return acc;
  }, {});

  if (!mounted) return null;

  return (
    <>
      {/* Hint button (bottom-right) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="فتح بحث الموقع"
        className="hidden md:flex fixed bottom-5 right-5 z-[55] items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-xl transition-all hover:scale-105"
        style={{
          background: "linear-gradient(160deg, rgba(18,10,30,0.85) 0%, rgba(10,10,18,0.85) 100%)",
          border: "1px solid rgba(168,85,247,0.4)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.4), 0 0 18px rgba(147,51,234,0.2)",
        }}
      >
        <Search className="w-3.5 h-3.5 text-purple-300" />
        <span className="text-xs text-[#b0b0d0] font-medium">بحث</span>
        <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(147,51,234,0.18)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)" }}>
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.96, y: -12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: -12, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, rgba(15,10,28,0.98) 0%, rgba(8,8,16,0.98) 100%)",
                border: "1px solid rgba(168,85,247,0.4)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 60px rgba(147,51,234,0.25)",
              }}
            >
              {/* Animated gradient top bar */}
              <div className="h-[2px] w-full overflow-hidden">
                <motion.div
                  className="h-full w-[200%]"
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, #a855f7 30%, #22d3ee 50%, #a855f7 70%, transparent 100%)",
                  }}
                />
              </div>

              <Command label="Site Command Palette" loop className="bg-transparent">
                <div className="flex items-center gap-2 px-4 py-3.5" style={{ borderBottom: "1px solid rgba(40,40,60,0.6)" }}>
                  <Search className="w-4 h-4 text-purple-300 flex-shrink-0" />
                  <Command.Input
                    autoFocus
                    placeholder="ابحث عن صفحة، خدمة، مورد..."
                    className="flex-1 bg-transparent text-white text-sm placeholder-[#7070a0] outline-none"
                  />
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(40,40,60,0.6)", color: "#9090b0", border: "1px solid rgba(60,60,80,0.6)" }}>
                    ESC
                  </kbd>
                </div>

                <Command.List className="max-h-[60vh] overflow-y-auto p-2 cmdk-list">
                  <Command.Empty className="py-10 text-center">
                    <Search className="w-8 h-8 text-purple-600/40 mx-auto mb-2" />
                    <p className="text-sm text-[#9090b0]">لا توجد نتائج</p>
                    <p className="text-xs text-[#606080] mt-1">جرّب كلمة أخرى</p>
                  </Command.Empty>

                  {(Object.keys(groups) as Item["group"][]).map((groupKey) => (
                    <Command.Group key={groupKey} heading={GROUP_LABELS[groupKey]} className="cmdk-group mb-2">
                      {groups[groupKey].map((item) => {
                        const Icon = item.icon;
                        const value = `${item.label} ${item.keywords?.join(" ") ?? ""} ${item.hint ?? ""}`;
                        return (
                          <Command.Item
                            key={item.id}
                            value={value}
                            onSelect={() => handleSelect(item)}
                            className="cmdk-item flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(147,51,234,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}>
                              <Icon className="w-3.5 h-3.5 text-purple-300" />
                            </div>
                            <span className="text-white font-medium flex-1">{item.label}</span>
                            {item.hint && <span className="text-[10px] text-[#7070a0] font-mono">{item.hint}</span>}
                            <ArrowLeft className="w-3 h-3 text-[#5050a0] cmdk-arrow flex-shrink-0" />
                          </Command.Item>
                        );
                      })}
                    </Command.Group>
                  ))}
                </Command.List>

                <div className="flex items-center justify-between px-4 py-2.5 text-[10px]" style={{ borderTop: "1px solid rgba(40,40,60,0.6)", color: "#7070a0" }}>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <kbd className="font-mono px-1 py-0.5 rounded" style={{ background: "rgba(40,40,60,0.6)", color: "#a0a0c0" }}>↑↓</kbd>
                      تنقل
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="font-mono px-1 py-0.5 rounded" style={{ background: "rgba(40,40,60,0.6)", color: "#a0a0c0" }}>↵</kbd>
                      اختيار
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    abud.fun search
                  </span>
                </div>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
