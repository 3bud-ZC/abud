"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar, Tag, BookOpen, Eye } from "lucide-react";
import { formatDate, estimateReadTime } from "@/lib/utils";
import BlogSalesFunnel from "@/components/ui/BlogSalesFunnel";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  readTime?: number;
  publishedAt?: string;
  category?: { name: string; slug: string };
  tags: string[];
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/blog/${params.slug}`);
        if (!res.ok) { router.push("/blog"); return; }
        const data = await res.json();
        setPost(data.post);
      } catch { router.push("/blog"); }
      finally { setLoading(false); }
    }
    if (params.slug) load();
  }, [params.slug, router]);

  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const article = articleRef.current;
        if (!article) return;
        const { top, height } = article.getBoundingClientRect();
        const winH = window.innerHeight;
        const scrolled = Math.max(0, winH - top);
        setProgress(Math.min(100, Math.round((scrolled / (height + winH)) * 100)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [post]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  const readTime = post?.content ? estimateReadTime(post.content) : post?.readTime;

  return (
    <div className="pt-20 pb-20">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]" style={{ background: "rgba(15,15,24,0.5)" }}>
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)",
            boxShadow: progress > 5 ? "0 0 8px rgba(168,85,247,0.6)" : "none"
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 mb-10 group"
          style={{ color: "#505070" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#c084fc")}
          onMouseLeave={e => (e.currentTarget.style.color = "#505070")}>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          العودة للمدونة
        </Link>

        {post.coverImage && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-10 relative"
            style={{ border: "1px solid rgba(35,35,55,0.8)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 672px" />
          </div>
        )}

        <div className="mb-8">
          {post.category && (
            <Link href={`/blog?category=${post.category.slug}`} className="tag-pill mb-4 inline-flex">
              {post.category.name}
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>{post.title}</h1>
          {post.excerpt && (
            <p className="text-[#8080a0] text-lg leading-relaxed mb-6"
              style={{ borderRight: "2px solid rgba(147,51,234,0.25)", paddingRight: "1rem" }}>
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-5 text-xs pb-8"
            style={{ color: "#484860", borderBottom: "1px solid rgba(28,28,48,0.8)" }}>
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt)}
              </span>
            )}
            {readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readTime} دقائق قراءة
              </span>
            )}
            <span className="flex items-center gap-1.5 mr-auto">
              <Eye className="w-3.5 h-3.5" />
              <span style={{ color: progress > 0 ? "#a78bfa" : "#484860" }}>{progress}%</span>
            </span>
          </div>
        </div>

        <article ref={articleRef} className="prose-arabic" dangerouslySetInnerHTML={{ __html: post.content }} />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6" style={{ borderTop: "1px solid rgba(28,28,48,0.8)" }}>
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-purple-500/60" />
              {post.tags.map((tag: string) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          </div>
        )}

        <BlogSalesFunnel category={post.category} tags={post.tags} />

        <div className="mt-12 p-8 rounded-2xl text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, rgba(18,10,30,1) 0%, rgba(10,10,18,1) 100%)",
            border: "1px solid rgba(147,51,234,0.2)",
            borderTop: "1px solid rgba(192,132,252,0.15)",
            boxShadow: "0 0 40px rgba(147,51,234,0.07)"
          }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(147,51,234,0.1)_0%,transparent_65%)]" />
          <div className="relative">
            <BookOpen className="w-7 h-7 mx-auto mb-3" style={{ color: "rgba(168,85,247,0.7)" }} />
            <p className="text-white font-semibold mb-1">أعجبك هذا المقال؟</p>
            <p className="text-[#606070] text-sm mb-5">تصفح المزيد من مساحتي الكتابية</p>
            <Link href="/blog" className="btn-primary inline-flex">
              جميع المقالات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
