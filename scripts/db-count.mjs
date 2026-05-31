import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

const r = {
  blogPost: await p.blogPost.count(),
  blogCategory: await p.blogCategory.count(),
  portfolioProject: await p.portfolioProject.count(),
  service: await p.service.count(),
  contactMessage: await p.contactMessage.count(),
  newsletterSubscriber: await p.newsletterSubscriber.count(),
  siteSetting: await p.siteSetting.count(),
  socialLink: await p.socialLink.count(),
  heroSection: await p.heroSection.count(),
  aboutSection: await p.aboutSection.count(),
};

console.log(JSON.stringify(r, null, 2));
process.exit(0);
