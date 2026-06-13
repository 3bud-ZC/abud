import { SEED_POSTS } from "@/data/blog-seed";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const posts = SEED_POSTS.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>مدونة ABUD</title>
    <link>${siteUrl("/blog")}</link>
    <description>مقالات عملية في تطوير الويب، الذكاء الاصطناعي، الأتمتة، والأمن السيبراني.</description>
    <language>ar</language>
    <atom:link href="${siteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl(`/blog/${post.slug}`)}</link>
      <guid isPermaLink="true">${siteUrl(`/blog/${post.slug}`)}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      ${post.coverImage ? `<enclosure url="${post.coverImage}" type="image/jpeg"/>` : ""}
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
