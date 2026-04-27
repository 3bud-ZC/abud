"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowLeft } from "lucide-react";
import HolographicCard from "@/components/effects/HolographicCard";

interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  readTime: number | null;
  category: { name: string } | null;
}

interface Props {
  posts: RelatedPost[];
}

export default function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{ boxShadow: ["0 0 12px rgba(147,51,234,0.4)", "0 0 24px rgba(168,85,247,0.7)", "0 0 12px rgba(147,51,234,0.4)"] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(147,51,234,0.2)", border: "1px solid rgba(168,85,247,0.5)" }}
        >
          <BookOpen className="w-4 h-4 text-purple-200" />
        </motion.div>
        <h2 className="text-white font-bold text-xl" style={{ letterSpacing: "-0.02em" }}>
          مقالات مرتبطة
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <HolographicCard duration={6 + (idx % 3)} delay={idx * 0.3}>
              <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                <div
                  className="aspect-video relative overflow-hidden flex items-center justify-center"
                  style={{ background: "#0a0a14", borderBottom: "1px solid rgba(168,85,247,0.18)" }}
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
                        className="absolute inset-0"
                        style={{ background: "radial-gradient(ellipse at center, rgba(147,51,234,0.18) 0%, transparent 70%)" }}
                      />
                      <BookOpen className="w-10 h-10 text-purple-600/50" />
                    </>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  {post.category && (
                    <span className="tag-pill mb-2 self-start" style={{ padding: "0.1rem 0.6rem", fontSize: "0.65rem" }}>
                      {post.category.name}
                    </span>
                  )}
                  <h3
                    className="text-white font-bold text-sm mb-2 group-hover:text-purple-200 transition-colors leading-snug line-clamp-2"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: "#9090b0" }}>
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: "1px solid rgba(168,85,247,0.15)" }}>
                    {post.readTime ? (
                      <span className="flex items-center gap-1 text-[10px]" style={{ color: "#7878a0" }}>
                        <Clock className="w-3 h-3" />
                        {post.readTime} د
                      </span>
                    ) : <span />}
                    <span className="flex items-center gap-1 text-[11px] font-semibold transition-all group-hover:translate-x-[-2px]" style={{ color: "#c084fc" }}>
                      اقرأ
                      <ArrowLeft className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </HolographicCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
