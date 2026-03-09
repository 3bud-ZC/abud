"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, X, ShoppingBag, BookOpen, Wrench, Globe, Zap, ArrowLeft, Command } from "lucide-react";
import { formatPrice } from "@/lib/utils";

/* ── Types ── */
interface SearchItem {
  id: string;
  title: string;
  desc?: string;
  href: string;
  category: "product" | "service" | "blog" | "resource" | "page";
  price?: number;
}

/* ── Static catalog ── */
const CATALOG: SearchItem[] = [
  { id: "p1",  title: "دليل الأمن السيبراني للمبتدئين",  desc: "أساسيات الأمن الرقمي في 80+ صفحة",           href: "/store/cybersecurity-starter-guide",        category: "product",  price: 149  },
  { id: "p2",  title: "الدليل الشامل للأمن المتقدم",     desc: "اختراق أخلاقي وحماية متقدمة",                 href: "/store/advanced-cybersecurity-handbook",     category: "product",  price: 349  },
  { id: "p3",  title: "دليل أدوات AI للمطورين",           desc: "أفضل أدوات الذكاء الاصطناعي للمطورين",        href: "/store/ai-tools-developers-guide",           category: "product",  price: 149  },
  { id: "p4",  title: "خارطة طريق Full Stack Developer", desc: "من الصفر إلى الاحتراف",                        href: "/store/fullstack-developer-roadmap",         category: "product",  price: 129  },
  { id: "p5",  title: "حقيبة أدوات المستقل المحترف",     desc: "عقود وفواتير وقوالب جاهزة",                   href: "/store/freelancer-toolkit",                 category: "product",  price: 119  },
  { id: "p6",  title: "قالب موقع بورتفوليو احترافي",     desc: "قالب Next.js جاهز للنشر",                     href: "/store/portfolio-website-template",         category: "product",  price: 199  },
  { id: "p7",  title: "دليل تحسين أداء الألعاب",          desc: "رفع FPS بدون تغيير الأجهزة",                  href: "/store/gaming-performance-guide",           category: "product",  price: 119  },
  { id: "p8",  title: "دليل إنتاجية المطور المحترف",      desc: "منظومة عمل للمطورين المحترفين",               href: "/store/developer-productivity-guide",       category: "product",  price: 99   },
  { id: "p9",  title: "دليل احتراف Git وGitHub",           desc: "Branching, CI/CD, GitHub Actions",            href: "/store/git-github-mastery-guide",           category: "product",  price: 99   },
  { id: "s1",  title: "فحص أمني شامل للموقع",             desc: "تقييم الثغرات وتقرير تفصيلي",                 href: "/store/website-security-audit",             category: "service",  price: 1499 },
  { id: "s2",  title: "تطوير موقع بورتفوليو شخصي",        desc: "موقع Next.js احترافي مكتمل",                  href: "/store/portfolio-website-development",      category: "service",  price: 3999 },
  { id: "s3",  title: "إصلاح الأخطاء البرمجية",           desc: "تشخيص وإصلاح في 24-48 ساعة",                 href: "/store/bug-fixing-service",                 category: "service",  price: 799  },
  { id: "s4",  title: "استشارة مسار مهني تقني",           desc: "جلسة مخصصة لرسم مسارك التقني",               href: "/store/tech-career-consultation",           category: "service",  price: 599  },
  { id: "s5",  title: "تحسين سرعة وأداء الموقع",          desc: "PageSpeed 90+ و Core Web Vitals",              href: "/store/website-performance-optimization",   category: "service",  price: 1199 },
  { id: "s6",  title: "تأمين الخادم Linux/VPS",            desc: "إعداد وتأمين خادمك بمعايير عالمية",           href: "/store/server-security-hardening",          category: "service",  price: 2499 },
  { id: "pg1", title: "المتجر",                            desc: "تصفح المنتجات والخدمات",                      href: "/store",                                    category: "page"                },
  { id: "pg2", title: "المدونة",                           desc: "مقالات تقنية متخصصة",                         href: "/blog",                                     category: "page"                },
  { id: "pg3", title: "المصادر",                           desc: "أدوات ومصادر مجانية",                         href: "/resources",                                category: "page"                },
  { id: "pg4", title: "تواصل معنا",                        desc: "تحدث معنا مباشرةً",                           href: "/contact",                                  category: "page"                },
  { id: "pg5", title: "من أنا",                            desc: "تعرف على ABUD",                               href: "/about",                                    category: "page"                },
];

const CAT_META = {
  product:  { label: "منتج",    Icon: ShoppingBag, color: "#c084fc", bg: "rgba(147,51,234,0.12)"  },
  service:  { label: "خدمة",    Icon: Wrench,      color: "#67e8f9", bg: "rgba(6,182,212,0.1)"    },
  blog:     { label: "مقال",    Icon: BookOpen,    color: "#86efac", bg: "rgba(34,197,94,0.1)"    },
  resource: { label: "مورد",    Icon: Globe,       color: "#fbbf24", bg: "rgba(251,191,36,0.1)"   },
  page:     { label: "صفحة",    Icon: Zap,         color: "#94a3b8", bg: "rgba(148,163,184,0.08)" },
};

const QUICK_LINKS: SearchItem[] = [
  { id: "q1", title: "استعراض المتجر",    href: "/store",     category: "page" },
  { id: "q2", title: "قراءة المدونة",     href: "/blog",      category: "page" },
  { id: "q3", title: "مكتبة المصادر",    href: "/resources", category: "page" },
  { id: "q4", title: "تواصل معنا",        href: "/contact",   category: "page" },
];

/* ── Hook: Ctrl+K toggle ── */
export function useGlobalSearch() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(o => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return { open, setOpen };
}

/* ── Main component ── */
interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const [query, setQuery]       = useState("");
  const [results, setResults]   = useState<SearchItem[]>([]);
  const [focused, setFocused]   = useState(0);
  const [loading, setLoading]   = useState(false);
  const inputRef                = useRef<HTMLInputElement>(null);
  const listRef                 = useRef<HTMLDivElement>(null);

  /* Focus input when opened */
  useEffect(() => {
    if (open) { setQuery(""); setFocused(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  /* Search logic */
  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return; }
    const lower = q.toLowerCase();

    /* Static match */
    const staticMatches = CATALOG.filter(item =>
      item.title.toLowerCase().includes(lower) ||
      (item.desc || "").toLowerCase().includes(lower)
    );

    /* Live blog search */
    setLoading(true);
    try {
      const res = await fetch(`/api/blog?search=${encodeURIComponent(q)}&status=published`);
      if (res.ok) {
        const data = await res.json();
        const blogItems: SearchItem[] = (data.posts || []).slice(0, 5).map((p: {id: string; title: string; slug: string; excerpt?: string}) => ({
          id: `b-${p.id}`,
          title: p.title,
          desc: p.excerpt,
          href: `/blog/${p.slug}`,
          category: "blog" as const,
        }));
        const combined = [...staticMatches, ...blogItems];
        /* Deduplicate by id */
        const seen = new Set<string>();
        setResults(combined.filter(r => { if (seen.has(r.id)) return false; seen.add(r.id); return true; }).slice(0, 12));
      } else {
        setResults(staticMatches.slice(0, 12));
      }
    } catch {
      setResults(staticMatches.slice(0, 12));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => search(query), 200);
    return () => clearTimeout(t);
  }, [query, search]);

  /* Keyboard navigation */
  useEffect(() => {
    if (!open) return;
    const items = query ? results : QUICK_LINKS;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setFocused(f => Math.min(f + 1, items.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
      if (e.key === "Enter" && items[focused]) {
        window.location.href = items[focused].href;
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, results, focused, query, onClose]);

  /* Scroll focused item into view */
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${focused}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [focused]);

  const displayItems = query ? results : QUICK_LINKS;
  const grouped = query
    ? (["product","service","blog","resource","page"] as const).map(cat => ({
        cat,
        items: results.filter(r => r.category === cat),
      })).filter(g => g.items.length > 0)
    : null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[8vh] left-1/2 -translate-x-1/2 z-[101] w-full"
            style={{ maxWidth: "min(640px, calc(100vw - 2rem))" }}
          >
            <div className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(8,8,14,0.98)",
                border: "1px solid rgba(60,40,100,0.45)",
                borderTop: "1px solid rgba(180,120,255,0.18)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(147,51,234,0.08), 0 0 60px rgba(147,51,234,0.08)",
              }}>

              {/* Input row */}
              <div className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderBottom: "1px solid rgba(30,20,50,0.8)" }}>
                <Search className="w-4.5 h-4.5 flex-shrink-0" style={{ width:"18px", height:"18px", color: "#9333ea" }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setFocused(0); }}
                  placeholder="ابحث عن منتجات، خدمات، مقالات، أدوات..."
                  className="flex-1 bg-transparent text-white text-sm placeholder-[#404060] outline-none"
                  dir="auto"
                />
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {loading && <div className="w-3.5 h-3.5 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />}
                  <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono"
                    style={{ background: "rgba(30,20,50,0.8)", border: "1px solid rgba(60,40,100,0.5)", color: "#605080" }}>
                    <Command className="w-2.5 h-2.5" />K
                  </kbd>
                  <button onClick={onClose} className="p-1 rounded-lg transition-colors hover:bg-white/5">
                    <X className="w-4 h-4" style={{ color: "#505070" }} />
                  </button>
                </div>
              </div>

              {/* Results */}
              <div ref={listRef} className="overflow-y-auto" style={{ maxHeight: "60vh", scrollbarWidth: "none" }}>
                {!query && (
                  <div className="p-3">
                    <p className="text-[10px] font-semibold px-2 mb-2" style={{ color: "#404060" }}>روابط سريعة</p>
                    {QUICK_LINKS.map((item, idx) => {
                      const { Icon, color } = CAT_META[item.category];
                      const isFocused = idx === focused;
                      return (
                        <Link key={item.id} href={item.href} onClick={onClose}
                          data-idx={idx}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                          style={{ background: isFocused ? "rgba(147,51,234,0.1)" : "transparent" }}
                          onMouseEnter={() => setFocused(idx)}>
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(147,51,234,0.1)", border: "1px solid rgba(147,51,234,0.2)" }}>
                            <Icon className="w-3.5 h-3.5" style={{ color }} />
                          </div>
                          <span className="text-sm font-medium" style={{ color: isFocused ? "#e2d4f8" : "#c0b8d8" }}>
                            {item.title}
                          </span>
                          <ArrowLeft className="w-3.5 h-3.5 mr-auto flex-shrink-0" style={{ color: isFocused ? "#c084fc" : "#303050" }} />
                        </Link>
                      );
                    })}
                  </div>
                )}

                {query && results.length === 0 && !loading && (
                  <div className="py-12 text-center">
                    <Search className="w-8 h-8 mx-auto mb-2 text-purple-800/50" />
                    <p className="text-sm font-medium" style={{ color: "#505070" }}>لا نتائج لـ &ldquo;{query}&rdquo;</p>
                    <p className="text-xs mt-1" style={{ color: "#404060" }}>حاول البحث بكلمات مختلفة</p>
                  </div>
                )}

                {query && grouped && grouped.map(({ cat, items }) => {
                  const { label, Icon, color } = CAT_META[cat];
                  return (
                    <div key={cat} className="px-3 pt-3 pb-1 last:pb-3">
                      <div className="flex items-center gap-1.5 px-2 mb-1.5">
                        <Icon className="w-3 h-3" style={{ color }} />
                        <p className="text-[10px] font-bold tracking-wider uppercase" style={{ color }}>
                          {label}
                        </p>
                      </div>
                      {items.map(item => {
                        const globalIdx = displayItems.findIndex(d => d.id === item.id);
                        const isFocused = globalIdx === focused;
                        return (
                          <Link key={item.id} href={item.href} onClick={onClose}
                            data-idx={globalIdx}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                            style={{ background: isFocused ? "rgba(147,51,234,0.1)" : "transparent" }}
                            onMouseEnter={() => setFocused(globalIdx)}>
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: CAT_META[cat].bg, border: `1px solid ${color}25` }}>
                              <Icon className="w-3.5 h-3.5" style={{ color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium leading-none mb-0.5 truncate"
                                style={{ color: isFocused ? "#e2d4f8" : "#c0b8d8" }}>
                                {item.title}
                              </div>
                              {item.desc && (
                                <div className="text-[11px] truncate" style={{ color: "#505070" }}>
                                  {item.desc}
                                </div>
                              )}
                            </div>
                            {item.price !== undefined && (
                              <span className="text-xs font-black flex-shrink-0" style={{ color }}>
                                {formatPrice(item.price)}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 px-4 py-2.5 text-[10px]"
                style={{ borderTop: "1px solid rgba(30,20,50,0.8)", color: "#353550" }}>
                <span>↑↓ للتنقل</span>
                <span>↵ للفتح</span>
                <span>Esc للإغلاق</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
