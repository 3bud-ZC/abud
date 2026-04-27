import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar, Tag, BookOpen } from "lucide-react";
import { formatDate, estimateReadTime } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import ReadingProgress from "@/components/ui/ReadingProgress";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import ScanLine from "@/components/effects/ScanLine";
import HolographicCard from "@/components/effects/HolographicCard";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, status: "published" },
    include: { category: true },
  });

  if (!post) notFound();

  const tags: string[] = Array.isArray(post.tags)
    ? post.tags
    : (() => { try { return JSON.parse(post.tags as string); } catch { return []; } })();

  const readTime = post.readTime || estimateReadTime(post.content);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? "",
    image: post.coverImage ?? "https://abud.fun/opengraph-image",
    datePublished: post.publishedAt?.toISOString() ?? post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: "ABUD", url: "https://abud.fun/about" },
    publisher: { "@type": "Organization", name: "ABUD", url: "https://abud.fun" },
    url: `https://abud.fun/blog/${post.slug}`,
    keywords: tags.join(", "),
    articleSection: post.category?.name ?? "تقنية",
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${readTime}M`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://abud.fun" },
      { "@type": "ListItem", position: 2, name: "المدونة", item: "https://abud.fun/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://abud.fun/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ReadingProgress />

      <div className="pt-20 pb-20 relative overflow-hidden">
        <FloatingOrbs count={5} />
        <ScanLine duration={14} direction="vertical" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-10">
          <Breadcrumb items={[
            { label: "المدونة", href: "/blog" },
            { label: post.title },
          ]} />
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 mb-10 group text-[#505070] hover:text-[#c084fc]">
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            العودة للمدونة
          </Link>

          {post.coverImage && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-10 relative"
              style={{ border: "1px solid rgba(168,85,247,0.4)", boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 50px rgba(147,51,234,0.25)" }}>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 672px"
                priority
              />
            </div>
          )}

          <div className="mb-8">
            {post.category && (
              <Link href={`/blog?category=${post.category.slug}`} className="tag-pill mb-4 inline-flex">
                {post.category.name}
              </Link>
            )}
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              {post.title}
            </h1>
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
            </div>
          </div>

          <article className="prose-arabic" dangerouslySetInnerHTML={{ __html: post.content }} />

          {tags.length > 0 && (
            <div className="mt-12 pt-6" style={{ borderTop: "1px solid rgba(28,28,48,0.8)" }}>
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-3.5 h-3.5 text-purple-500/60" />
                {tags.map((tag: string) => (
                  <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="tag-pill">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            <HolographicCard duration={6}>
              <div className="p-8 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-3" style={{ color: "#c084fc", filter: "drop-shadow(0 0 12px rgba(168,85,247,0.7))" }} />
                <p className="text-white font-semibold mb-1">أعجبك هذا المقال؟</p>
                <p className="text-[#9090b0] text-sm mb-5">تصفح المزيد من مساحتي الكتابية</p>
                <Link href="/blog" className="btn-primary btn-glow inline-flex">
                  جميع المقالات
                </Link>
              </div>
            </HolographicCard>
          </div>
        </div>
      </div>
    </>
  );
}
