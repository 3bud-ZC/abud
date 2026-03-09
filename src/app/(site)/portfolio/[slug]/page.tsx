"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, Layers, CheckCircle2, Zap, Code2, Target, Lightbulb,
  BarChart3, ExternalLink, Github, Tag as TagIcon,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface LongDesc {
  category?: string;
  overview?: string;
  problem?: string;
  features?: string[];
  tech?: string[];
  results?: string[];
}

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

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  AI:         { bg: "rgba(139,92,246,0.12)", text: "#a78bfa", border: "rgba(139,92,246,0.3)" },
  Business:   { bg: "rgba(16,185,129,0.12)", text: "#34d399", border: "rgba(16,185,129,0.3)" },
  Automation: { bg: "rgba(245,158,11,0.12)", text: "#fbbf24", border: "rgba(245,158,11,0.3)" },
  Security:   { bg: "rgba(239,68,68,0.12)",  text: "#f87171", border: "rgba(239,68,68,0.3)" },
  Tool:       { bg: "rgba(56,189,248,0.12)", text: "#38bdf8", border: "rgba(56,189,248,0.3)" },
};

function CategoryBadge({ category }: { category?: string }) {
  if (!category) return null;
  const c = CATEGORY_COLORS[category] || CATEGORY_COLORS.Tool;
  return (
    <span className="text-xs font-bold px-3 py-1 rounded-full"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
      {category}
    </span>
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/portfolio/${params.slug}`);
        if (!res.ok) { router.push("/portfolio"); return; }
        const data = await res.json();
        setProject(data.project);
      } catch { router.push("/portfolio"); }
      finally { setLoading(false); }
    }
    if (params.slug) load();
  }, [params.slug, router]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!project) return null;

  const tags: string[] = Array.isArray(project.tags) ? project.tags : (() => { try { return JSON.parse(project.tags as string); } catch { return []; } })();
  const links: string[] = Array.isArray(project.links) ? project.links : (() => { try { return JSON.parse(project.links as string); } catch { return []; } })();
  let ld: LongDesc = {};
  if (project.longDesc) {
    try { ld = JSON.parse(project.longDesc); } catch { ld = {}; }
  }

  return (
    <div className="pt-20 pb-20">
      {/* Back */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-4">
        <Link href="/portfolio"
          className="inline-flex items-center gap-2 text-sm transition-colors group"
          style={{ color: "#606070" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#c084fc")}
          onMouseLeave={e => (e.currentTarget.style.color = "#606070")}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
          Back to Portfolio
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 mb-10">
        <AnimatedSection>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {ld.category && <CategoryBadge category={ld.category} />}
            {project.featured && (
              <span className="badge-purple flex items-center gap-1 text-xs">
                <Zap className="w-2.5 h-2.5" /> Featured
              </span>
            )}
          </div>

          <h1 className="font-black text-white mb-4"
            style={{ fontSize: "clamp(1.8rem,5vw,3rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            {project.title}
          </h1>

          {project.description && (
            <p className="text-lg leading-relaxed mb-5" style={{ color: "#7070a0", maxWidth: "40rem" }}>
              {project.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map(tag => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>

          {links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {links.map((url, i) => {
                const isGithub = url.toLowerCase().includes("github.com");
                return (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                    className="btn-primary inline-flex gap-2 text-sm py-2.5 px-5">
                    {isGithub ? <Github className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                    {isGithub ? "View on GitHub" : "View Project"}
                  </a>
                );
              })}
            </div>
          )}
        </AnimatedSection>
      </section>

      {/* Cover Image */}
      {project.thumbnail && (
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <AnimatedSection>
            <div className="aspect-video relative rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(28,28,48,0.8)" }}>
              <Image src={project.thumbnail} alt={project.title} fill
                className="object-cover" sizes="(max-width:896px) 100vw, 896px" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </AnimatedSection>
        </section>
      )}

      {/* Content sections */}
      <div className="max-w-4xl mx-auto px-4 space-y-8">

        {/* Overview */}
        {ld.overview && (
          <AnimatedSection>
            <div className="glass-card p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(147,51,234,0.15)", border: "1px solid rgba(147,51,234,0.25)" }}>
                  <Lightbulb className="w-4 h-4 text-purple-400" />
                </div>
                <h2 className="text-white font-bold text-lg" style={{ letterSpacing: "-0.02em" }}>Project Overview</h2>
              </div>
              <p className="leading-relaxed" style={{ color: "#8080a0", lineHeight: 1.8 }}>{ld.overview}</p>
            </div>
          </AnimatedSection>
        )}

        {/* Problem */}
        {ld.problem && (
          <AnimatedSection delay={0.05}>
            <div className="glass-card p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
                  <Target className="w-4 h-4 text-amber-400" />
                </div>
                <h2 className="text-white font-bold text-lg" style={{ letterSpacing: "-0.02em" }}>Problem Solved</h2>
              </div>
              <p className="leading-relaxed" style={{ color: "#8080a0", lineHeight: 1.8 }}>{ld.problem}</p>
            </div>
          </AnimatedSection>
        )}

        {/* Features */}
        {ld.features && ld.features.length > 0 && (
          <AnimatedSection delay={0.08}>
            <div className="glass-card p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.25)" }}>
                  <Zap className="w-4 h-4 text-sky-400" />
                </div>
                <h2 className="text-white font-bold text-lg" style={{ letterSpacing: "-0.02em" }}>Key Features</h2>
              </div>
              <ul className="space-y-3">
                {ld.features.map((feat, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed" style={{ color: "#9090b0" }}>{feat}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        )}

        {/* Tech Stack */}
        {ld.tech && ld.tech.length > 0 && (
          <AnimatedSection delay={0.1}>
            <div className="glass-card p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)" }}>
                  <Code2 className="w-4 h-4 text-purple-400" />
                </div>
                <h2 className="text-white font-bold text-lg" style={{ letterSpacing: "-0.02em" }}>Technologies Used</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {ld.tech.map(t => (
                  <span key={t}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: "rgba(147,51,234,0.1)", border: "1px solid rgba(147,51,234,0.2)", color: "#c4b5fd" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Results */}
        {ld.results && ld.results.length > 0 && (
          <AnimatedSection delay={0.12}>
            <div className="glass-card p-7" style={{ borderColor: "rgba(16,185,129,0.2)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                </div>
                <h2 className="text-white font-bold text-lg" style={{ letterSpacing: "-0.02em" }}>Results & Benefits</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {ld.results.map((r, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2.5 p-3 rounded-xl"
                    style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm" style={{ color: "#a0c0b0" }}>{r}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <AnimatedSection>
          <div className="glass-card p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(147,51,234,0.1)_0%,transparent_65%)]" />
            <div className="relative">
              <p className="text-white font-bold text-lg mb-2">Interested in something similar?</p>
              <p className="text-sm mb-5" style={{ color: "#606070" }}>
                I build custom solutions tailored to your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-primary gap-2 text-sm py-2.5 px-6">
                  <TagIcon className="w-3.5 h-3.5" /> Get a Custom Quote
                </Link>
                <Link href="/portfolio" className="btn-outline text-sm py-2.5 px-5">
                  ← View All Projects
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
