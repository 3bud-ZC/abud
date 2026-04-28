"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen, Clock, ChevronLeft, Zap, Search, User, Calendar, ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { EmptySearchState } from "@/components/ui/EmptyStates";
import { formatDate } from "@/lib/utils";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import HolographicCard from "@/components/effects/HolographicCard";

const AUTHOR_NAME = "Abud";
const AUTHOR_AVATAR = "/avatar.jpeg";

// Gradient cover palette per category (matches Home page hero)
const CATEGORY_ACCENT: Record<string, { from: string; to: string }> = {
  "ai":            { from: "#a855f7", to: "#67e8f9" },
  "web-dev":       { from: "#6366f1", to: "#a855f7" },
  "automation":    { from: "#34d399", to: "#a855f7" },
  "freelance":     { from: "#f59e0b", to: "#a855f7" },
  "cybersecurity": { from: "#ef4444", to: "#a855f7" },
  "tools":         { from: "#67e8f9", to: "#a855f7" },
};

function categoryAccent(slug?: string | null) {
  return (slug && CATEGORY_ACCENT[slug]) || { from: "#a855f7", to: "#67e8f9" };
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  readTime?: number | null;
  publishedAt?: Date | string | null;
  category?: { name: string; slug: string } | null;
  tags: string[];
  featured: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function PostCard({ post, idx = 0 }: { post: Post; idx?: number }) {
  const accent = categoryAccent(post.category?.slug);
  return (
    <motion.article
      variants={cardVariants}
      className="flex flex-col"
    >
    <HolographicCard duration={6 + (idx % 3)} delay={(idx % 5) * 0.3}>
    <div className="overflow-hidden group flex flex-col">
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className="aspect-video flex items-center justify-center relative overflow-hidden"
          style={{
            background: post.coverImage
              ? "#080812"
              : `linear-gradient(135deg, ${accent.from}1a 0%, ${accent.to}14 100%)`,
            borderBottom: post.coverImage
              ? "1px solid rgba(28,28,48,0.8)"
              : `1px solid ${accent.from}33`,
          }}
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at 30% 30%, ${accent.from}55 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, ${accent.to}40 0%, transparent 55%)`,
                }}
              />
              <span
                className="relative font-black text-7xl opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  letterSpacing: "-0.05em",
                }}
              >
                { }
              </span>
              <BookOpen
                className="absolute w-9 h-9 opacity-50 group-hover:opacity-80 transition-opacity"
                style={{ color: accent.from, filter: `drop-shadow(0 0 12px ${accent.from}55)` }}
              />
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {post.featured && (
            <span className="absolute top-3 right-3 badge-purple flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" /> Featured
            </span>
          )}
          {post.category && (
            <span className="absolute bottom-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${accent.from}55`,
                color: accent.from,
              }}>
              {post.category.name}
            </span>
          )}
        </div>
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-xs mb-3" style={{ color: "#484860" }}>
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishedAt)}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime} دقيقة قراءة
            </span>
          )}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-white font-bold text-base mb-2 group-hover:text-purple-200 transition-colors duration-200 line-clamp-2 leading-snug"
            style={{ letterSpacing: "-0.01em" }}>
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className="text-[#606080] text-xs leading-relaxed line-clamp-2 flex-1 mb-4">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3"
          style={{ borderTop: "1px solid rgba(28,28,48,0.8)" }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden relative flex-shrink-0"
              style={{ border: "1px solid rgba(147,51,234,0.35)" }}>
              <Image src={AUTHOR_AVATAR} alt={AUTHOR_NAME} fill className="object-cover" sizes="24px" />
            </div>
            <span className="text-xs font-medium" style={{ color: "#7070a0" }}>{AUTHOR_NAME}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group/btn"
            style={{ color: "#c084fc" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#e0bbff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#c084fc")}
          >
            اقرأ المزيد
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
    </HolographicCard>
    </motion.article>
  );
}

export default function BlogPageClient({
  initialPosts,
  initialCategories,
}: {
  initialPosts: Post[];
  initialCategories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = initialPosts.filter((p) => {
    const matchCat = activeCategory === "all" || p.category?.slug === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const featuredPost = filtered.find(p => p.featured);
  const gridPosts = featuredPost ? filtered.filter(p => p !== featuredPost) : filtered;

  return (
    <div className="pt-20">
      <section className="relative py-24 px-4 overflow-hidden">
        <FloatingOrbs count={6} />
        <ScanLine duration={10} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-badge mb-6">
              <BookOpen className="w-2.5 h-2.5" />
              المدونة
            </span>
            <h1 className="font-black text-white mt-5 mb-5"
              style={{ fontSize: "clamp(2.2rem,6vw,4rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              مقالات وأدلة عملية
            </h1>
            <p style={{ color: "#505070", fontSize: "0.95rem", maxWidth: "34rem", margin: "0 auto", lineHeight: 1.75 }}>
              مقالات عملية عن الذكاء الاصطناعي، المنتجات الرقمية، العمل الحر، الأتمتة، وبناء دخل من الإنترنت.
            </p>
            <div className="flex items-center justify-center gap-2 mt-5">
              <div className="w-7 h-7 rounded-full overflow-hidden relative flex-shrink-0"
                style={{ border: "1px solid rgba(147,51,234,0.4)" }}>
                <Image src={AUTHOR_AVATAR} alt={AUTHOR_NAME} fill className="object-cover" sizes="28px" />
              </div>
              <span className="text-sm" style={{ color: "#707090" }}>
                يكتبها <span className="text-white font-semibold">{AUTHOR_NAME}</span>
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="sticky top-16 z-30 backdrop-blur-2xl py-3.5 px-4"
        style={{ background: "rgba(5,5,8,0.92)", borderBottom: "1px solid rgba(28,28,48,0.8)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar w-full sm:w-auto">
            {[{ slug: "all", name: "All Posts" }, ...initialCategories].map((cat) => {
              const active = activeCategory === cat.slug;
              return (
                <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)}
                  className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                  style={active ? {
                    background: "linear-gradient(135deg, #9333ea, #6d28d9)",
                    color: "white",
                    boxShadow: "0 0 16px rgba(147,51,234,0.4), 0 1px 0 rgba(255,255,255,0.1) inset"
                  } : {
                    background: "rgba(20,20,32,0.8)",
                    border: "1px solid rgba(35,35,55,0.8)",
                    color: "#7070a0"
                  }}>
                  {cat.name}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs hidden sm:block" style={{ color: "#404060" }}>
              <span className="text-white font-medium">{filtered.length}</span> مقال
            </span>
            <div className="relative w-full sm:w-56">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#505070]" />
              <input type="text" placeholder="ابحث في المقالات..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full rounded-xl py-2 pr-9 pl-4 text-white text-sm placeholder-[#505070] outline-none transition-all"
                style={{ background: "rgba(12,12,20,0.9)", border: "1px solid rgba(35,35,55,0.8)" }}
                onFocus={e => (e.target.style.borderColor = "rgba(147,51,234,0.5)")}
                onBlur={e => (e.target.style.borderColor = "rgba(35,35,55,0.8)")} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 relative overflow-hidden">
        <FloatingOrbs count={5} />
        <div className="relative z-10 max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <EmptySearchState onClear={() => { setActiveCategory("all"); setSearch(""); }} />
          ) : (
            <>
              {featuredPost && (() => {
                const fAccent = categoryAccent(featuredPost.category?.slug);
                return (
                <AnimatedSection className="mb-10">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="group overflow-hidden rounded-2xl relative"
                      style={{
                        background: "linear-gradient(160deg, rgba(18,10,30,1) 0%, rgba(10,10,18,1) 100%)",
                        border: `1px solid ${fAccent.from}33`,
                        borderTop: `1px solid ${fAccent.from}26`,
                        boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 40px ${fAccent.from}10`,
                      }}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div
                          className="md:w-5/12 aspect-video flex items-center justify-center relative overflow-hidden"
                          style={{
                            background: featuredPost.coverImage
                              ? "#080812"
                              : `linear-gradient(135deg, ${fAccent.from}24 0%, ${fAccent.to}1a 100%)`,
                          }}
                        >
                          {featuredPost.coverImage
                            ? <Image src={featuredPost.coverImage} alt={featuredPost.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 50vw" />
                            : <>
                              <div
                                className="absolute inset-0"
                                style={{
                                  background: `radial-gradient(ellipse at 30% 30%, ${fAccent.from}55 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, ${fAccent.to}40 0%, transparent 55%)`,
                                }}
                              />
                              <span
                                className="relative font-black opacity-25 group-hover:opacity-40 transition-opacity duration-500"
                                style={{
                                  fontSize: "5.5rem",
                                  background: `linear-gradient(135deg, ${fAccent.from}, ${fAccent.to})`,
                                  WebkitBackgroundClip: "text",
                                  backgroundClip: "text",
                                  color: "transparent",
                                  letterSpacing: "-0.05em",
                                }}
                              >
                                { }
                              </span>
                              <BookOpen
                                className="absolute w-12 h-12"
                                style={{ color: fAccent.from, filter: `drop-shadow(0 0 18px ${fAccent.from}80)`, opacity: 0.6 }}
                              />
                            </>}
                          <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a12]/60 via-transparent to-transparent hidden md:block" />
                          <span className="absolute top-3 right-3 badge-purple flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5" /> Featured
                          </span>
                        </div>
                        <div className="p-7 md:p-10 flex-1 flex flex-col justify-center">
                          {featuredPost.category && (
                            <span className="tag-pill mb-4 inline-flex">{featuredPost.category.name}</span>
                          )}
                          <h2 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-purple-200 transition-colors duration-200 leading-snug"
                            style={{ letterSpacing: "-0.01em" }}>
                            {featuredPost.title}
                          </h2>
                          {featuredPost.excerpt && (
                            <p className="text-[#707090] text-sm leading-relaxed mb-5 line-clamp-2">{featuredPost.excerpt}</p>
                          )}
                          <div className="flex items-center gap-4 text-xs" style={{ color: "#505070" }}>
                            <div className="flex items-center gap-1.5">
                              <User className="w-3 h-3" />
                              {AUTHOR_NAME}
                            </div>
                            {featuredPost.publishedAt && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(featuredPost.publishedAt)}
                              </span>
                            )}
                            {featuredPost.readTime && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {featuredPost.readTime} دقيقة قراءة
                              </span>
                            )}
                            <span className="mr-auto text-purple-500 group-hover:text-purple-300 transition-colors flex items-center gap-1 font-medium">
                              اقرأ المقال <ChevronLeft className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </AnimatedSection>
                );
              })()}

              {gridPosts.length > 0 && (
                <motion.div
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  initial="hidden"
                  animate="show"
                  variants={gridVariants}
                >
                  {gridPosts.map((post, idx) => <PostCard key={post.id} post={post} idx={idx} />)}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
