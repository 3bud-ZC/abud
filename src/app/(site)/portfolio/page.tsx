"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Layers, ExternalLink, Github, Star, GitFork, CircleDot,
  Code2, BrainCircuit, Bot, Terminal, BarChart3,
  Cpu, Wrench, Figma, Database, Globe, Shield,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import HolographicCard from "@/components/effects/HolographicCard";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  issues: number;
  pushed_at: string;
  updated_at: string;
  created_at: string;
}

const GITHUB_USER = "3bud-ZC";
const GITHUB_URL = `https://github.com/${GITHUB_USER}`;

// Brand-ish colors per language (subset)
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  PHP: "#4F5D95",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Ruby: "#701516",
};

function langColor(lang: string | null): string {
  if (!lang) return "#606070";
  return LANG_COLORS[lang] || "#a78bfa";
}

const TOOLS = [
  { icon: Code2,       label: "Next.js",         color: "#a78bfa" },
  { icon: BrainCircuit,label: "ChatGPT / GPT-4", color: "#a78bfa" },
  { icon: Bot,         label: "Telegram API",    color: "#fbbf24" },
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
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d ago`;
  const mon = Math.floor(day / 30);
  if (mon < 12) return `${mon}mo ago`;
  const yr = Math.floor(mon / 12);
  return `${yr}y ago`;
}

export default function PortfolioPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<string>("All");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/github");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to load");
          setRepos([]);
        } else {
          setRepos(data.repos || []);
        }
      } catch (e) {
        setError((e as Error).message);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => { if (r.language) set.add(r.language); });
    return ["All", ...Array.from(set).sort()];
  }, [repos]);

  const filtered = useMemo(() => {
    if (activeLang === "All") return repos;
    return repos.filter((r) => r.language === activeLang);
  }, [activeLang, repos]);

  const totalStars = useMemo(
    () => repos.reduce((sum, r) => sum + r.stars, 0),
    [repos]
  );

  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <FloatingOrbs count={6} />
        <ScanLine duration={9} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-badge mb-6">
              <Github className="w-2.5 h-2.5" />
              GitHub Portfolio
            </span>
            <h1 className="font-black text-white mt-5 mb-4"
              style={{ fontSize: "clamp(2.2rem,6vw,4rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Open Source & Projects
            </h1>
            <p style={{ color: "#606070", fontSize: "1rem", maxWidth: "36rem", margin: "0 auto", lineHeight: 1.75 }}>
              مشاريعي على GitHub — أدوات، بوتات، أتمتة، وحلول حقيقية. مباشرة من{" "}
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
                @{GITHUB_USER}
              </a>
              .
            </p>

            {!loading && repos.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <div className="glass-card px-4 py-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span className="text-white font-bold">{repos.length}</span>
                  <span className="text-xs" style={{ color: "#606070" }}>Repos</span>
                </div>
                <div className="glass-card px-4 py-2 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-bold">{totalStars}</span>
                  <span className="text-xs" style={{ color: "#606070" }}>Stars</span>
                </div>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-primary gap-2 text-sm py-2 px-4">
                  <Github className="w-4 h-4" />
                  Visit GitHub
                </a>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* ── LANGUAGE FILTER ── */}
      {!loading && languages.length > 1 && (
        <section className="px-4 pb-10">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {languages.map((lang) => {
                  const isActive = activeLang === lang;
                  const color = lang === "All" ? "#a78bfa" : langColor(lang);
                  const count = lang === "All"
                    ? repos.length
                    : repos.filter((r) => r.language === lang).length;
                  return (
                    <motion.button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      whileTap={{ scale: 0.96 }}
                      className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2"
                      style={isActive ? {
                        background: `${color}22`,
                        color,
                        border: `1px solid ${color}55`,
                        boxShadow: `0 0 20px ${color}22`,
                      } : {
                        background: "transparent",
                        color: "#606070",
                        border: "1px solid rgba(28,28,48,0.8)",
                      }}
                    >
                      {lang !== "All" && (
                        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                      )}
                      {lang}
                      <span className="text-xs opacity-60">{count}</span>
                    </motion.button>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ── REPO GRID ── */}
      <section className="pb-20 px-4 relative overflow-hidden">
        <FloatingOrbs count={5} />
        <div className="relative z-10 max-w-6xl mx-auto">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card overflow-hidden animate-pulse p-5 space-y-3">
                  <div className="h-5 rounded w-3/4" style={{ background: "rgba(30,30,50,0.8)" }} />
                  <div className="h-3 rounded w-full" style={{ background: "rgba(30,30,50,0.8)" }} />
                  <div className="h-3 rounded w-2/3" style={{ background: "rgba(30,30,50,0.8)" }} />
                  <div className="flex gap-2 pt-3">
                    <div className="h-6 rounded-full w-16" style={{ background: "rgba(30,30,50,0.8)" }} />
                    <div className="h-6 rounded-full w-16" style={{ background: "rgba(30,30,50,0.8)" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <Github className="w-12 h-12 text-red-500/40 mx-auto mb-4" />
              <p style={{ color: "#f87171" }} className="mb-2">تعذّر جلب المشاريع من GitHub.</p>
              <p style={{ color: "#505070" }} className="text-sm mb-6">{error}</p>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary gap-2 text-sm py-2 px-4 inline-flex">
                <Github className="w-4 h-4" />
                افتح GitHub مباشرة
              </a>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Layers className="w-12 h-12 text-purple-600/25 mx-auto mb-4" />
              <p style={{ color: "#505070" }}>No repositories in this language yet.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLang}
                variants={container}
                initial="hidden"
                animate="show"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((repo, idx) => {
                  const lc = langColor(repo.language);
                  return (
                    <motion.div key={repo.id} variants={cardAnim}>
                    <HolographicCard duration={6 + (idx % 4)} delay={(idx % 6) * 0.3}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-5 group flex flex-col cursor-pointer relative overflow-hidden"
                    >
                      {/* Glow on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${lc}25 0%, transparent 70%)`,
                        }}
                      />

                      <div className="relative flex items-center gap-2 mb-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${lc}18`, border: `1px solid ${lc}33` }}
                        >
                          <Github className="w-4 h-4" style={{ color: lc }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-white font-bold text-sm group-hover:text-purple-200 transition-colors leading-snug truncate"
                            style={{ letterSpacing: "-0.01em" }}>
                            {repo.name}
                          </h3>
                          <p className="text-[11px] truncate" style={{ color: "#505070" }}>
                            {repo.full_name}
                          </p>
                        </div>
                      </div>

                      {repo.description && (
                        <p className="relative text-sm leading-relaxed mb-4 line-clamp-2 flex-1" style={{ color: "#808090" }}>
                          {repo.description}
                        </p>
                      )}

                      {repo.topics.length > 0 && (
                        <div className="relative flex flex-wrap gap-1.5 mb-4">
                          {repo.topics.slice(0, 4).map((t) => (
                            <span key={t} className="tag-pill">{t}</span>
                          ))}
                          {repo.topics.length > 4 && (
                            <span className="tag-pill">+{repo.topics.length - 4}</span>
                          )}
                        </div>
                      )}

                      {/* Meta row */}
                      <div className="relative flex items-center gap-4 mt-auto pt-3 text-xs"
                        style={{ borderTop: "1px solid rgba(28,28,48,0.6)", color: "#606070" }}>
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <CircleDot className="w-3 h-3" style={{ color: lc }} />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {repo.forks}
                        </span>
                        <span className="ml-auto text-[10px] opacity-70">
                          {timeAgo(repo.pushed_at)}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="relative flex items-center gap-2 mt-3">
                        <span
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                          style={{ background: `${lc}1a`, color: lc, border: `1px solid ${lc}40` }}
                        >
                          <Github className="w-3.5 h-3.5" />
                          View Code
                        </span>
                        {repo.homepage && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(repo.homepage!, "_blank", "noopener,noreferrer");
                            }}
                            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
                            style={{ background: "rgba(28,28,48,0.8)", border: "1px solid rgba(40,40,65,0.8)", color: "#a0a0b8" }}
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </a>
                    </HolographicCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── TOOLS I USE ── */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ borderTop: "1px solid rgba(28,28,48,0.6)", background: "linear-gradient(to bottom, rgba(8,8,14,1), rgba(5,5,8,1))" }}>
        <FloatingOrbs count={4} />
        <ScanLine duration={13} direction="vertical" />
        <div className="relative z-10 max-w-5xl mx-auto">
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
            {TOOLS.map(({ icon: Icon, label, color }, idx) => (
              <motion.div
                key={label}
                variants={cardAnim}
              >
                <HolographicCard duration={6 + (idx % 3)} delay={(idx % 6) * 0.25}>
                  <div className="p-4 flex items-center gap-3 cursor-default group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ background: `${color}25`, border: `1px solid ${color}55`, boxShadow: `0 0 14px ${color}40` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <span className="text-xs font-semibold text-white/85 group-hover:text-white transition-colors">
                      {label}
                    </span>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 relative overflow-hidden">
        <FloatingOrbs count={5} />
        <ScanLine duration={11} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <AnimatedSection>
            <HolographicCard duration={6}>
              <div className="p-8 md:p-10 text-center">
                <h2 className="text-white font-black text-2xl mb-2" style={{ letterSpacing: "-0.02em" }}>
                  Want something built?
                </h2>
                <p className="text-sm mb-5" style={{ color: "#9090b0" }}>
                  I build custom AI tools, automation systems, and web products. Let&#39;s talk.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/contact" className="btn-primary btn-glow gap-2 text-sm py-2.5 px-6">
                    Start a Project
                  </Link>
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                    className="btn-outline gap-2 text-sm py-2.5 px-5 inline-flex items-center">
                    <Github className="w-4 h-4" />
                    Follow on GitHub
                  </a>
                </div>
              </div>
            </HolographicCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
