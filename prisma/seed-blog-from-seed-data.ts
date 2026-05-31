/**
 * Seeds BlogCategory + BlogPost rows from src/data/blog-seed.ts
 * Run:  npx tsx prisma/seed-blog-from-seed-data.ts
 * Safe to re-run — upsert by slug (existing rows updated, not duplicated).
 */
import { PrismaClient } from "@prisma/client";
import { SEED_POSTS, SEED_CATEGORIES } from "../src/data/blog-seed";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 زرع مقالات المدونة من blog-seed.ts...\n");

  // 1. Upsert categories
  const catMap: Record<string, string> = {}; // slug → id
  for (const cat of SEED_CATEGORIES) {
    const created = await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: { name: cat.name, slug: cat.slug },
    });
    catMap[cat.slug] = created.id;
    console.log(`  ✅ تصنيف: ${cat.name} (${cat.slug})`);
  }
  console.log();

  // 2. Upsert posts
  let count = 0;
  for (const post of SEED_POSTS) {
    const categoryId = catMap[post.category.slug];
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        readTime: post.readTime,
        featured: post.featured,
        tags: JSON.stringify(post.tags),
        status: "published",
        publishedAt: new Date(post.publishedAt),
        categoryId,
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        readTime: post.readTime,
        featured: post.featured,
        tags: JSON.stringify(post.tags),
        status: "published",
        publishedAt: new Date(post.publishedAt),
        categoryId,
      },
    });
    count++;
    console.log(`  ✅ مقال (${count}): ${post.title.substring(0, 60)}`);
  }

  console.log(`\n✅ تم: ${SEED_CATEGORIES.length} تصنيفات + ${count} مقالات في DB.`);
}

main()
  .catch((e) => { console.error("❌ خطأ:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
