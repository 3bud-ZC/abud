"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Layers, ExternalLink, Github, Zap, ArrowLeft,
  BrainCircuit, Globe, Shield, Bot, Terminal, BarChart3,
  Code2, Cpu, Wrench, Figma, Database,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string;
  longDesc?: string;
  thumbnail?: string;
  tags: string | string[];
  links: string | string[];
  featured: boolean;
  status: string;
}

const CATEGORIES = ["All", "AI", "Business", "Automation", "Security", "Tool"] as const;
type Category = typeof CATEGORIES[number];

const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  AI:         { bg: "rgba(139,92,246,0.12)", text: "#a78bfa", border: "rgba(139,92,246,0.3)" },
  Business:   { bg: "rgba(16,185,129,0.12)", text: "#34d399", border: "rgba(16,185,129,0.3)" },
  Automation: { bg: "rgba(245,158,11,0.12)", text: "#fbbf24", border: "rgba(245,158,11,0.3)" },
  Security:   { bg: "rgba(239,68,68,0.12)",  text: "#f87171", border: "rgba(239,68,68,0.3)" },
  Tool:       { bg: "rgba(56,189,248,0.12)", text: "#38bdf8", border: "rgba(56,189,248,0.3)" },
};

const ICON_BY_CAT: Record<string, React.ReactNode> = {
  AI:         <BrainCircuit className="w-8 h-8" style={{ color: "#a78bfa" }} />,
  Business:   <BarChart3    className="w-8 h-8" style={{ color: "#34d399" }} />,
  Automation: <Bot          className="w-8 h-8" style={{ color: "#fbbf24" }} />,
  Security:   <Shield       className="w-8 h-8" style={{ color: "#f87171" }} />,
  Tool:       <Wrench       className="w-8 h-8" style={{ color: "#38bdf8" }} />,
};

const TOOLS = [
  { icon: Code2,       label: "Next.js",        color: "#a78bfa" },
  { icon: BrainCircuit,label: "ChatGPT / GPT-4", color: "#a78bfa" },
  { icon: Bot,         label: "Telegram API",   color: "#fbbf24" },
  { icon: Terminal,    label: "Python",          color: "#34d399" },
  { icon: Database,    label: "PostgreSQL",      color: "#38bdf8" },
  { icon: Cpu,         label: "n8n / Make",      color: "#fbbf24" },
  { icon: Shield,      label: "Burp Suite",      color: "#f87171" },
  { icon: Globe,       label: "Vercel / VPS",    color: "#a78bfa" },
  { icon: Figma,       label: "Figma",           color: "#f87171" },
  { icon: BarChart3,   label: "Google Analytics",color: "#34d399" },
  { icon: Layers,      label: "Tailwind CSS",    color: "#38bdf8" },
  { icon: Wrench,      label: "Notion",          color: "#a78bfa" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

function getCategory(project: Project): string {
  if (!project.longDesc) return "Tool";
  try { return JSON.parse(project.longDesc).category || "Tool"; }
  catch { return "Tool"; }
}

function getTags(project: Project): string[] {
  if (Array.isArray(project.tags)) return project.tags;
  try { return JSON.parse(project.tags as string); }
  catch { return []; }
}

function getLinks(project: Project): string[] {
  if (Array.isArray(project.links)) return project.links;
  try { return JSON.parse(project.links as string); }
  catch { return []; }
}

function CategoryBadge({ category }: { category: string }) {
  const c = CAT_COLORS[category] || CAT_COLORS.Tool;
  return (
    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
      {category}
    </span>
  );
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/portfolio");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch { setProjects([]); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter(p => getCategory(p) === activeCategory);

  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(147,51,234,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-badge mb-6">
              <Layers className="w-2.5 h-2.5" />
              Portfolio
            </span>
            <h1 className="font-black text-white mt-5 mb-4"
              style={{ fontSize: "clamp(2.2rem,6vw,4rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Projects & Work
            </h1>
            <p style={{ color: "#606070", fontSize: "1rem", maxWidth: "36rem", margin: "0 auto", lineHeight: 1.75 }}>
              A curated collection of AI tools, automation systems, digital products, and web platforms — built to solve real problems.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CATEGORY FILTER ── */}
      <section className="px-4 pb-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat;
                const c = cat !== "All" ? CAT_COLORS[cat] : null;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={isActive ? {
                      background: c ? c.bg : "rgba(147,51,234,0.15)",
                      color: c ? c.text : "#c084fc",
                      border: `1px solid ${c ? c.border : "rgba(147,51,234,0.4)"}`,
                      boxShadow: `0 0 20px ${c ? c.bg : "rgba(147,51,234,0.12)"}`,
                    } : {
                      background: "transparent",
                      color: "#606070",
                      border: "1px solid rgba(28,28,48,0.8)",
                    }}
                  >
                    {cat}
                    {cat !== "All" && (
                      <span className="ml-2 text-xs opacity-60">
                        {projects.filter(p => getCategory(p) === cat).length}
                      </span>
                    )}
                    {cat === "All" && (
                      <span className="ml-2 text-xs opacity-60">{projects.length}</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PROJECT GRID ── */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card overflow-hidden animate-pulse">
                  <div className="aspect-video" style={{ background: "rgba(20,20,32,0.6)" }} />
                  <div className="p-5 space-y-3">
                    <div className="h-3 rounded w-1/4" style={{ background: "rgba(30,30,50,0.8)" }} />
                    <div className="h-4 rounded w-3/4" style={{ background: "rgba(30,30,50,0.8)" }} />
                    <div className="h-3 rounded w-full" style={{ background: "rgba(30,30,50,0.8)" }} />
                    <div className="h-3 rounded w-2/3" style={{ background: "rgba(30,30,50,0.8)" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Layers className="w-12 h-12 text-purple-600/25 mx-auto mb-4" />
              <p style={{ color: "#505070" }}>No projects in this category yet.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={container}
                initial="hidden"
                animate="show"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map(project => {
                  const tags = getTags(project);
                  const links = getLinks(project);
                  const category = getCategory(project);
                  const catColor = CAT_COLORS[category] || CAT_COLORS.Tool;
                  const fallbackIcon = ICON_BY_CAT[category] || ICON_BY_CAT.Tool;

                  return (
                    <motion.div
                      key={project.id}
                      variants={cardAnim}
                      whileHover={{ y: -6 }}
                      className="glass-card overflow-hidden group flex flex-col"
                    >
                      {/* Image */}
                      <div className="aspect-video bg-[#080810] relative overflow-hidden flex items-center justify-center"
                        style={{ borderBottom: "1px solid rgba(28,28,48,0.8)" }}>
                        {project.thumbnail ? (
                          <Image src={project.thumbnail} alt={project.title} fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.08)_0%,transparent_65%)]" />
                            {fallbackIcon}
                          </>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {project.featured && (
                          <span className="absolute top-3 right-3 badge-purple flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5" />Featured
                          </span>
                        )}

                        {/* Hover overlay CTA */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Link href={`/portfolio/${project.slug}`}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg"
                            style={{ background: "rgba(147,51,234,0.9)", color: "white", backdropFilter: "blur(8px)" }}>
                            View Project <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                          </Link>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <CategoryBadge category={category} />
                        </div>

                        <h3 className="text-white font-bold text-sm mb-2 group-hover:text-purple-200 transition-colors leading-snug"
                          style={{ letterSpacing: "-0.01em" }}>
                          {project.title}
                        </h3>

                        {project.description && (
                          <p className="text-sm leading-relaxed mb-4 line-clamp-2 flex-1" style={{ color: "#606070" }}>
                            {project.description}
                          </p>
                        )}

                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {tags.slice(0, 3).map(tag => (
                              <span key={tag} className="tag-pill">{tag}</span>
                            ))}
                            {tags.length > 3 && (
                              <span className="tag-pill">+{tags.length - 3}</span>
                            )}
                          </div>
                        )}

                        {/* Action row */}
                        <div className="flex items-center gap-2 mt-auto pt-3" style={{ borderTop: "1px solid rgba(28,28,48,0.6)" }}>
                          <Link href={`/portfolio/${project.slug}`}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                            style={{ background: catColor.bg, color: catColor.text, border: `1px solid ${catColor.border}` }}
                            onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                          >
                            View Project <ArrowLeft className="w-3 h-3 rotate-180" />
                          </Link>
                          {links.map((url, i) => {
                            const isGithub = url.toLowerCase().includes("github.com");
                            return (
                              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200"
                                style={{ background: "rgba(28,28,48,0.8)", border: "1px solid rgba(40,40,65,0.8)", color: "#606070" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#c084fc")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#606070")}
                                title={isGithub ? "GitHub" : "Live Demo"}
                              >
                                {isGithub ? <Github className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── TOOLS I USE ── */}
      <section className="py-20 px-4" style={{ borderTop: "1px solid rgba(28,28,48,0.6)", background: "linear-gradient(to bottom, rgba(8,8,14,1), rgba(5,5,8,1))" }}>
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="section-badge mb-5 mx-auto">
              <Wrench className="w-2.5 h-2.5" />
              Tech Stack
            </span>
            <h2 className="section-title mt-4 mb-3">Tools I Use</h2>
            <p className="section-subtitle text-center">
              The technology stack behind every project — from idea to production.
            </p>
          </AnimatedSection>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {TOOLS.map(({ icon: Icon, label, color }) => (
              <motion.div
                key={label}
                variants={cardAnim}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card p-4 flex items-center gap-3 cursor-default group"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-lg"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                  <Icon className="w-4 h-4 transition-colors duration-200" style={{ color }} />
                </div>
                <span className="text-xs font-semibold text-white/70 group-hover:text-white/90 transition-colors">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <div className="glass-card p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(147,51,234,0.12)_0%,transparent_65%)]" />
              <div className="relative">
                <h2 className="text-white font-black text-2xl mb-2" style={{ letterSpacing: "-0.02em" }}>
                  Want something built?
                </h2>
                <p className="text-sm mb-5" style={{ color: "#606070" }}>
                  I build custom AI tools, automation systems, and web products. Let&#39;s talk.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/contact" className="btn-primary gap-2 text-sm py-2.5 px-6">
                    Start a Project
                  </Link>
                  <Link href="/services" className="btn-outline text-sm py-2.5 px-5">
                    View Services
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
