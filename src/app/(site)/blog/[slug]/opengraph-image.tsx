import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const alt = "ABUD Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: { slug: string } }) {
  let title = "ABUD";
  let category = "مقال";
  let readTime: number | null = null;
  let publishedAt: string | null = null;

  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
      include: { category: true },
    });
    if (post) {
      title = post.title;
      category = post.category?.name ?? "مقال";
      readTime = post.readTime ?? null;
      const date = post.publishedAt ?? post.createdAt;
      publishedAt = date
        ? new Date(date).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })
        : null;
    }
  } catch {
    // fallback to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #050508 0%, #0d0a1a 50%, #060410 100%)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          position: "relative",
          padding: "60px 70px",
        }}
      >
        {/* Aurora glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(147,51,234,0.35) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.6,
          }}
        />

        {/* Top bar - logo + brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #1a0a2e, #2d1654)",
              border: "2px solid rgba(168,85,247,0.6)",
              boxShadow: "0 0 24px rgba(147,51,234,0.5)",
            }}
          >
            <span
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: "#e9d5ff",
                lineHeight: 1,
              }}
            >
              A
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", letterSpacing: -1 }}>
              ABUD
            </span>
            <span style={{ fontSize: 16, color: "#a78bfa", fontWeight: 600 }}>
              abud.fun/blog
            </span>
          </div>
        </div>

        {/* Category pill */}
        <div
          style={{
            display: "flex",
            marginTop: 56,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(147,51,234,0.18)",
              border: "1px solid rgba(168,85,247,0.5)",
              color: "#d8b4fe",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {category}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            marginTop: 24,
            position: "relative",
            flex: 1,
          }}
        >
          <h1
            style={{
              fontSize: title.length > 70 ? 52 : title.length > 40 ? 62 : 72,
              fontWeight: 900,
              color: "#f8f8ff",
              margin: 0,
              letterSpacing: -2,
              lineHeight: 1.15,
              textShadow: "0 4px 24px rgba(0,0,0,0.6)",
              maxWidth: 1060,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom row - meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            paddingTop: 28,
            borderTop: "1px solid rgba(168,85,247,0.25)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 20, color: "#9ca3af" }}>
            {publishedAt && (
              <span style={{ display: "flex", alignItems: "center" }}>📅 {publishedAt}</span>
            )}
            {readTime && (
              <span style={{ display: "flex", alignItems: "center" }}>⏱ {readTime} دقائق قراءة</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 12,
              background: "linear-gradient(135deg, rgba(147,51,234,0.25), rgba(34,211,238,0.15))",
              border: "1px solid rgba(168,85,247,0.4)",
              color: "#e9d5ff",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            اقرأ المقال →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
