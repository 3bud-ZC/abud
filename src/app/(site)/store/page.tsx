"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { trackStorePageView, trackStoreFilterUsed, trackStoreSearchUsed, trackProductCardClick } from "@/lib/analytics";
import {
  ShoppingBag, Search, Star, Package, Zap, Shield, Code2, BookOpen,
  Gamepad2, Wrench, FileText, Globe, Lock, MessageSquare, Download,
  ArrowUpDown, X, ChevronDown,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  slug: string;
  shortDesc?: string;
  price: number;
  oldPrice?: number;
  coverImage?: string;
  featured: boolean;
  purchaseType: string;
  category?: { name: string; slug: string };
}

type FilterType = "all" | "instant" | "contact";
type SortOption = "default" | "price-asc" | "price-desc";

const catIcon = (slug?: string) => {
  if (!slug) return Package;
  if (slug.includes("cyber")) return Shield;
  if (slug.includes("gaming")) return Gamepad2;
  if (slug.includes("template")) return FileText;
  if (slug.includes("web") || slug.includes("dev")) return Code2;
  if (slug.includes("consulting")) return MessageSquare;
  if (slug.includes("digital")) return BookOpen;
  return Globe;
};

const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};
const gridAnim = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="glass-card overflow-hidden animate-pulse">
          <div className="aspect-video" style={{ background: "rgba(20,20,32,0.6)" }} />
          <div className="p-5 space-y-3">
            <div className="h-3 rounded w-1/3" style={{ background: "rgba(30,30,50,0.8)" }} />
            <div className="h-4 rounded w-3/4" style={{ background: "rgba(30,30,50,0.8)" }} />
            <div className="h-3 rounded w-full" style={{ background: "rgba(30,30,50,0.8)" }} />
            <div className="h-9 rounded" style={{ background: "rgba(30,30,50,0.8)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Featured Hero Card ── */
function FeaturedCard({ product }: { product: Product }) {
  const isService = product.purchaseType === "contact";
  const Icon = catIcon(product.category?.slug);
  return (
    <motion.div
      variants={cardAnim}
      whileHover={{ y: -5 }}
      className="relative rounded-2xl overflow-hidden group flex flex-col"
      style={{ border: "1px solid rgba(147,51,234,0.2)", background: "rgba(10,8,18,0.9)" }}
    >
      {/* Image */}
      <div className="h-48 bg-[#080810] relative overflow-hidden flex items-center justify-center">
        {product.coverImage ? (
          <Image src={product.coverImage} alt={product.title} fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15)_0%,transparent_65%)]" />
            <Icon className="w-16 h-16 text-purple-600/30" />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0812] via-black/20 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className="badge-purple flex items-center gap-1 text-[10px]">
            <Star className="w-2.5 h-2.5 fill-current" /> مميز
          </span>
          {isService ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(6,182,212,0.18)", border: "1px solid rgba(6,182,212,0.35)", color: "#67e8f9" }}>خدمة</span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399" }}>
              <Download className="w-2.5 h-2.5" /> تحميل فوري
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {product.category && (
          <span className="tag-pill mb-2 inline-flex text-[10px]">{product.category.name}</span>
        )}
        <h3 className="text-white font-black text-base mb-1.5 leading-snug line-clamp-2"
          style={{ letterSpacing: "-0.02em" }}>
          {product.title}
        </h3>
        {product.shortDesc && (
          <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: "#606080" }}>
            {product.shortDesc}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-3"
          style={{ borderTop: "1px solid rgba(28,28,48,0.6)" }}>
          <span className="text-xl font-black" style={{ color: isService ? "#67e8f9" : "#c084fc" }}>
            {formatPrice(product.price)}
          </span>
          {isService ? (
            <Link href={`/store/${product.slug}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
              style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.3)", color: "#67e8f9" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(6,182,212,0.22)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(6,182,212,0.12)")}>
              <MessageSquare className="w-3 h-3" /> طلب الخدمة
            </Link>
          ) : (
            <Link href={`/checkout?product=${product.id}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold"
              style={{ background: "linear-gradient(135deg,#9333ea,#6d28d9)", color: "white" }}>
              <Zap className="w-3 h-3" /> اشتر الآن
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Regular Product Card ── */
function ProductCard({ product }: { product: Product }) {
  const isService = product.purchaseType === "contact";
  const Icon = catIcon(product.category?.slug);
  const discount = product.oldPrice && product.oldPrice > product.price
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;
  const glowColor = isService ? "rgba(6,182,212,0.25)" : "rgba(147,51,234,0.25)";
  return (
    <motion.div
      variants={cardAnim}
      whileHover={{ y: -6, boxShadow: `0 20px 60px ${glowColor}, 0 4px 24px rgba(0,0,0,0.5)` }}
      className="glass-card overflow-hidden group flex flex-col cursor-default"
      style={{ transition: "box-shadow 0.3s ease" }}
    >
      {/* Cover */}
      <div className="aspect-video bg-[#080810] flex items-center justify-center relative overflow-hidden"
        style={{ borderBottom: "1px solid rgba(28,28,48,0.8)" }}>
        {product.coverImage ? (
          <Image src={product.coverImage} alt={product.title} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.12)_0%,transparent_65%)]" />
            <Icon className="w-12 h-12 text-purple-600/35" />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover overlay CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          {isService ? (
            <Link href={`/store/${product.slug}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-lg"
              style={{ background: "rgba(6,182,212,0.85)", color: "white", backdropFilter: "blur(8px)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(6,182,212,0.95)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(6,182,212,0.85)")}>
              <MessageSquare className="w-3.5 h-3.5" /> عرض الخدمة
            </Link>
          ) : (
            <Link href={`/checkout?product=${product.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-lg"
              style={{ background: "rgba(147,51,234,0.9)", color: "white", backdropFilter: "blur(8px)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(147,51,234,0.95)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(147,51,234,0.9)")}>
              <Zap className="w-3.5 h-3.5" /> احصل عليه
            </Link>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {product.featured && (
            <span className="badge-purple flex items-center gap-1 text-[10px]">
              <Star className="w-2.5 h-2.5 fill-current" /> مميز
            </span>
          )}
          {discount && (
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
              style={{ background: "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff" }}>
              -{discount}%
            </span>
          )}
        </div>
        {isService ? (
          <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(6,182,212,0.18)", border: "1px solid rgba(6,182,212,0.35)", color: "#67e8f9" }}>
            خدمة
          </span>
        ) : (
          <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
            style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)", color: "#34d399" }}>
            <Download className="w-2 h-2" /> فوري
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {product.category && (
          <span className="tag-pill mb-2.5 inline-flex text-[10px]">{product.category.name}</span>
        )}
        <h3 className="text-white font-bold text-sm mb-1.5 group-hover:text-purple-200 transition-colors leading-snug line-clamp-2"
          style={{ letterSpacing: "-0.01em" }}>
          {product.title}
        </h3>
        {product.shortDesc && (
          <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: "#606080" }}>
            {product.shortDesc}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-3 flex items-center justify-between gap-2"
        style={{ borderTop: "1px solid rgba(28,28,48,0.5)" }}>
        <div>
          <span className="font-black text-lg block" style={{ color: isService ? "#67e8f9" : "#c084fc", letterSpacing: "-0.03em" }}>
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs line-through" style={{ color: "#404060" }}>
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
        {isService ? (
          <Link href={`/store/${product.slug}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
            style={{ background: "linear-gradient(135deg,rgba(6,182,212,0.2),rgba(6,182,212,0.1))", border: "1px solid rgba(6,182,212,0.35)", color: "#67e8f9", boxShadow: "0 0 12px rgba(6,182,212,0.1)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,0.28)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(6,182,212,0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg,rgba(6,182,212,0.2),rgba(6,182,212,0.1))"; e.currentTarget.style.boxShadow = "0 0 12px rgba(6,182,212,0.1)"; }}
            onClick={() => trackProductCardClick({ product_id: product.id, product_slug: product.slug, product_type: 'contact', product_category: product.category?.name, product_price: product.price, cta_location: 'grid_card' })}>
            <MessageSquare className="w-3 h-3" /> عرض التفاصيل
          </Link>
        ) : (
          <Link href={`/checkout?product=${product.id}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all duration-200"
            style={{ background: "linear-gradient(135deg,#9333ea,#6d28d9)", boxShadow: "0 0 16px rgba(147,51,234,0.3)" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 28px rgba(147,51,234,0.55)"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 16px rgba(147,51,234,0.3)"; e.currentTarget.style.transform = "scale(1)"; }}
            onClick={() => trackProductCardClick({ product_id: product.id, product_slug: product.slug, product_type: 'instant', product_category: product.category?.name, product_price: product.price, cta_location: 'grid_card' })}>
            <Zap className="w-3 h-3" /> احصل عليه الآن
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/* ══════════════ Main Page ══════════════ */
export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortOption>("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [activeCat, setActiveCat] = useState("all");

  const hasTrackedPageView = useRef(false);

  useEffect(() => {
    // Track store page view only once
    if (!hasTrackedPageView.current) {
      trackStorePageView();
      hasTrackedPageView.current = true;
    }
    
    async function load() {
      fetch("/api/products?status=active")
        .then(r => r.json())
        .then(d => setProducts(d.products || []))
        .catch(() => setProducts([]))
        .finally(() => setLoading(false));
    }
    load();
  }, []);

  /* Derived category list */
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const list: { slug: string; name: string }[] = [];
    products.forEach(p => {
      if (p.category && !seen.has(p.category.slug)) {
        seen.add(p.category.slug);
        list.push(p.category);
      }
    });
    return list;
  }, [products]);

  /* Featured products */
  const featured = products.filter(p => p.featured);

  /* Filtered + sorted */
  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products.filter(p => {
      if (filterType === "instant" && p.purchaseType !== "instant") return false;
      if (filterType === "contact" && p.purchaseType !== "contact") return false;
      if (activeCat !== "all" && p.category?.slug !== activeCat) return false;
      if (q && !p.title.toLowerCase().includes(q) && !p.shortDesc?.toLowerCase().includes(q)) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, filterType, activeCat, search, sort]);

  const sortLabels: Record<SortOption, string> = {
    default:    "الافتراضي",
    "price-asc":  "السعر: من الأقل",
    "price-desc": "السعر: من الأعلى",
  };

  const digitalCount  = products.filter(p => p.purchaseType === "instant").length;
  const serviceCount  = products.filter(p => p.purchaseType === "contact").length;

  function handleSearchChange(val: string) {
    setSearch(val);
    if (val.length >= 3) {
      trackStoreSearchUsed(val);
    }
  }

  return (
    <div className="pt-20">

      {/* ── HERO ── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(147,51,234,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-badge mb-6">
              <ShoppingBag className="w-2.5 h-2.5" />
              المتجر الرقمي
            </span>
            <h1 className="font-black text-white mt-5 mb-4"
              style={{ fontSize: "clamp(2.2rem,6vw,4rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              منتجات رقمية جاهزة للتحميل الفوري
            </h1>
            <p style={{ color: "#606070", fontSize: "1rem", maxWidth: "36rem", margin: "0 auto", lineHeight: 1.7 }}>
              أدوات، قوالب، ومصادر احترافية — احصل عليها الآن وابدأ فورًا. أو اطلب خدمة تطوير مخصصة لمشروعك.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 text-sm" style={{ color: "#9090b0" }}>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-green-400" />
                <span><span className="font-bold text-white">{digitalCount}</span> منتج رقمي</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span><span className="font-bold text-white">{serviceCount}</span> خدمة مخصصة</span>
              </div>
            </div>
            <p className="mt-4 text-xs" style={{ color: "#7070a0" }}>
              أدلة رقمية وقوالب جاهزة للتحميل الفوري — وخدمات تطوير وأمن سيبراني. جميع الأسعار بالجنيه المصري.
            </p>
            {/* Stats row */}
            <div className="flex items-center justify-center gap-5 mt-6 text-sm">
              {[
                { label: "منتج رقمي", count: digitalCount, color: "#c084fc" },
                { label: "خدمة متاحة", count: serviceCount, color: "#67e8f9" },
                { label: "عميل سعيد", count: "200+", color: "#fbbf24" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span className="font-black text-lg" style={{ color: s.color }}>{s.count}</span>
                  <span style={{ color: "#606070" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FEATURED SECTION ── */}
      {!loading && featured.length > 0 && (
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,rgba(147,51,234,0.25),rgba(109,40,217,0.15))", border: "1px solid rgba(147,51,234,0.3)" }}>
                  <Star className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-white font-black text-xl" style={{ letterSpacing: "-0.02em" }}>المميزة والأكثر طلبًا</h2>
                  <p className="text-xs mt-0.5" style={{ color: "#505070" }}>اختياراتنا الموصى بها</p>
                </div>
              </div>
            </AnimatedSection>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={gridAnim} initial="hidden" animate="show"
            >
              {featured.map(p => <FeaturedCard key={p.id} product={p} />)}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── STICKY FILTER BAR ── */}
      <div className="sticky top-16 z-30 backdrop-blur-2xl py-3 px-4"
        style={{ background: "rgba(5,5,8,0.94)", borderTop: "1px solid rgba(28,28,48,0.6)", borderBottom: "1px solid rgba(28,28,48,0.8)" }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2">

          {/* Search */}
          <div className="relative flex-1 min-w-[160px] max-w-xs">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "#505070" }} />
            <input type="text" placeholder="ابحث في المتجر..." value={search}
              onChange={e => handleSearchChange(e.target.value)}
              className="w-full rounded-xl py-2 pr-9 pl-8 text-white text-sm placeholder-[#505070] outline-none transition-all"
              style={{ background: "rgba(12,12,20,0.9)", border: "1px solid rgba(35,35,55,0.8)" }}
              onFocus={e => (e.target.style.borderColor = "rgba(147,51,234,0.5)")}
              onBlur={e => (e.target.style.borderColor = "rgba(35,35,55,0.8)")}
            />
            {search && (
              <button onClick={() => handleSearchChange("")} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#505070] hover:text-white transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "rgba(12,12,20,0.9)", border: "1px solid rgba(35,35,55,0.8)" }}>
            {([["all","الكل"], ["instant","منتجات"], ["contact","خدمات"]] as [FilterType, string][]).map(([val, label]) => (
              <button key={val} onClick={() => { setFilterType(val); trackStoreFilterUsed('type', val); }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                style={filterType === val
                  ? { background: "rgba(147,51,234,0.2)", color: "#c084fc", border: "1px solid rgba(147,51,234,0.35)" }
                  : { color: "#606070", border: "1px solid transparent" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Category filter */}
          {categories.length > 0 && (
            <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
              {[{ slug: "all", name: "كل التصنيفات" }, ...categories].map(cat => (
                <button key={cat.slug} onClick={() => setActiveCat(cat.slug)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0"
                  style={activeCat === cat.slug
                    ? { background: "rgba(147,51,234,0.15)", color: "#c084fc", border: "1px solid rgba(147,51,234,0.3)" }
                    : { background: "transparent", color: "#606070", border: "1px solid rgba(35,35,55,0.7)" }}>
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Sort dropdown */}
          <div className="relative ml-auto flex-shrink-0">
            <button onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: "rgba(12,12,20,0.9)", border: "1px solid rgba(35,35,55,0.8)", color: "#808090" }}>
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortLabels[sort]}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-1 rounded-xl overflow-hidden z-50 min-w-[160px]"
                  style={{ background: "rgba(12,12,22,0.98)", border: "1px solid rgba(35,35,55,0.9)", boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}>
                  {(Object.entries(sortLabels) as [SortOption, string][]).map(([val, label]) => (
                    <button key={val} onClick={() => { setSort(val); setSortOpen(false); }}
                      className="w-full text-right px-4 py-2.5 text-xs font-semibold transition-colors"
                      style={sort === val
                        ? { color: "#c084fc", background: "rgba(147,51,234,0.1)" }
                        : { color: "#808090" }}
                      onMouseEnter={e => { if (sort !== val) (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                      onMouseLeave={e => { if (sort !== val) (e.currentTarget as HTMLButtonElement).style.color = "#808090"; }}>
                      {label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Result count */}
          {!loading && (
            <span className="text-xs flex-shrink-0" style={{ color: "#404055" }}>
              {visible.length} نتيجة
            </span>
          )}
        </div>
      </div>

      {/* ── ALL PRODUCTS GRID ── */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <SkeletonGrid count={9} />
          ) : visible.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-12 h-12 text-purple-600/25 mx-auto mb-3" />
              <p className="font-semibold text-white mb-1">لا توجد نتائج</p>
              <p className="text-sm" style={{ color: "#505070" }}>حاول تغيير مصطلح البحث أو الفلتر</p>
              <button onClick={() => { setSearch(""); setFilterType("all"); setActiveCat("all"); setSort("default"); }}
                className="mt-4 text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2">
                إعادة ضبط الفلاتر
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${filterType}-${activeCat}-${sort}`}
                variants={gridAnim} initial="hidden" animate="show"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {visible.map(p => <ProductCard key={p.id} product={p} />)}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-12 px-4"
        style={{ borderTop: "1px solid rgba(28,28,48,0.8)", background: "linear-gradient(to bottom, rgba(8,8,14,1), rgba(5,5,8,1))" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Zap,         title: "تسليم فوري",  desc: "بعد تأكيد الدفع",   color: "#c084fc" },
            { icon: Lock,        title: "دفع آمن",      desc: "بيانات محمية 100%",  color: "#67e8f9" },
            { icon: Star,        title: "دعم مخصص",     desc: "مساعدة بعد الشراء",  color: "#fbbf24" },
            { icon: ShoppingBag, title: "جودة مضمونة", desc: "أو استرداد كامل",    color: "#34d399" },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title}
              className="flex flex-col items-center gap-2.5 text-center p-4 rounded-2xl group transition-all duration-300 hover:-translate-y-1"
              style={{ background: "linear-gradient(160deg,rgba(15,15,24,0.6),rgba(10,10,18,0.4))", border: "1px solid rgba(30,30,50,0.6)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div className="font-bold text-white text-sm">{title}</div>
              <div className="text-xs" style={{ color: "#606080" }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
