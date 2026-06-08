export interface ServiceSeedData {
  title: string;
  slug: string;
  category: string;
  description: string;
  longDesc: string;
  priceType: "request";
  price: number;
  deliveryTime: string;
  ctaLabel: string;
  featured: boolean;
  icon: string;
  order: number;
}

export const PRIMARY_SERVICES: ServiceSeedData[] = [
  {
    title: "تطوير مواقع احترافية",
    slug: "web-development",
    category: "web-development",
    description:
      "تصميم وبرمجة مواقع سريعة، متجاوبة، واحترافية للشركات، المشاريع، والمتاجر.",
    longDesc:
      "أبني لك موقع كامل مناسب لهدفك التجاري، سواء Landing Page، موقع شركة، متجر بسيط، أو منصة مخصصة. التركيز يكون على السرعة، التصميم، تجربة المستخدم، وتحويل الزوار إلى عملاء.",
    priceType: "request",
    price: 3000,
    deliveryTime: "5–14 يوم",
    ctaLabel: "اطلب موقعك الآن",
    featured: true,
    icon: "globe",
    order: 1,
  },
  {
    title: "أنظمة ERP و CRM مخصصة",
    slug: "erp-crm-systems",
    category: "business-systems",
    description:
      "أنظمة إدارة مبيعات، مخزون، عملاء، فواتير، وتقارير مصممة حسب نشاطك.",
    longDesc:
      "تطوير أنظمة ERP/CRM مخصصة للشركات والمحلات والفرق الصغيرة، تشمل إدارة العملاء، الموردين، المبيعات، المخزون، الفواتير، التقارير، والصلاحيات.",
    priceType: "request",
    price: 10000,
    deliveryTime: "14–45 يوم",
    ctaLabel: "اطلب نظام مخصص",
    featured: true,
    icon: "layers",
    order: 2,
  },
  {
    title: "بوتات تيليجرام و Mini Apps",
    slug: "telegram-bots-mini-apps",
    category: "telegram",
    description:
      "بوتات تيليجرام احترافية لإدارة الطلبات، التنبيهات، العملاء، والأنظمة.",
    longDesc:
      "إنشاء بوتات تيليجرام وتطبيقات Mini Apps مرتبطة بقاعدة بيانات ولوحات تحكم، مناسبة للمتاجر، الخدمات، التنبيهات، إدارة VPS، الاشتراكات، والعملاء.",
    priceType: "request",
    price: 2500,
    deliveryTime: "3–14 يوم",
    ctaLabel: "اطلب بوت تيليجرام",
    featured: true,
    icon: "bot",
    order: 3,
  },
  {
    title: "أدوات AI وأتمتة الأعمال",
    slug: "ai-automation-tools",
    category: "ai-automation",
    description:
      "أدوات ذكاء اصطناعي و workflows تقلل الشغل اليدوي وتسرّع التشغيل.",
    longDesc:
      "بناء أدوات AI و automation workflows باستخدام APIs و n8n وربط الخدمات المختلفة لإنشاء محتوى، إدارة عملاء، إرسال رسائل، متابعة طلبات، أو تنفيذ عمليات متكررة تلقائيًا.",
    priceType: "request",
    price: 2000,
    deliveryTime: "3–21 يوم",
    ctaLabel: "ابدأ أتمتة شغلك",
    featured: true,
    icon: "brain",
    order: 4,
  },
  {
    title: "نشر وإدارة المشاريع على VPS",
    slug: "vps-deployment-maintenance",
    category: "devops",
    description:
      "نشر مشاريعك على VPS باحتراف مع Nginx و PM2 و PostgreSQL و SSL.",
    longDesc:
      "تجهيز السيرفر، رفع المشروع، إعداد Nginx reverse proxy، تشغيل التطبيق بـ PM2، ربط الدومين، إعداد SSL، وتجهيز تقرير نشر واضح مع مسارات المشروع وأوامر المتابعة والرجوع.",
    priceType: "request",
    price: 1500,
    deliveryTime: "1–5 أيام",
    ctaLabel: "انشر مشروعي",
    featured: false,
    icon: "server",
    order: 5,
  },
  {
    title: "متاجر ومنصات رقمية",
    slug: "ecommerce-digital-platforms",
    category: "ecommerce",
    description:
      "متاجر ومنصات رقمية لعرض المنتجات، استقبال الطلبات، وربط التواصل.",
    longDesc:
      "بناء متجر أو منصة رقمية لعرض المنتجات والخدمات بشكل احترافي مع صفحات منتجات، أسعار، CTA للتواصل، لوحة إدارة، وتجربة موبايل ممتازة.",
    priceType: "request",
    price: 5000,
    deliveryTime: "7–21 يوم",
    ctaLabel: "اطلب منصة رقمية",
    featured: true,
    icon: "shopping-bag",
    order: 6,
  },
];

export function findPrimaryService(slug: string) {
  return PRIMARY_SERVICES.find((service) => service.slug === slug);
}
