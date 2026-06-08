import type { Metadata } from "next";
import { getPublicServiceBySlug } from "@/lib/public-services";
import { siteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getPublicServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "خدمة غير موجودة | ABUD",
      description: "الخدمة المطلوبة غير متاحة حالياً.",
      robots: { index: false, follow: true },
    };
  }

  return {
    title: `${service.title} | خدمات ABUD`,
    description: service.description,
    alternates: { canonical: siteUrl(`/services/${service.slug}`) },
    openGraph: {
      title: `${service.title} | ABUD`,
      description: service.description,
      url: siteUrl(`/services/${service.slug}`),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ABUD`,
      description: service.description,
    },
  };
}

export default function ServiceSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
