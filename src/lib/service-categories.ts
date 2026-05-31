import {
  Sparkles,
  Code2,
  ShoppingBag,
  Smartphone,
  BrainCircuit,
  Workflow,
  Bot,
  Server,
  TrendingUp,
  Shield,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_CATEGORIES = [
  { id: "all", label: "الكل", icon: Sparkles },
  { id: "development", label: "تطوير الويب", icon: Code2 },
  { id: "ecommerce", label: "التجارة الإلكترونية", icon: ShoppingBag },
  { id: "mobile", label: "تطبيقات الموبايل", icon: Smartphone },
  { id: "ai", label: "ذكاء اصطناعي", icon: BrainCircuit },
  { id: "automation", label: "الأتمتة", icon: Workflow },
  { id: "bots", label: "البوتات", icon: Bot },
  { id: "devops", label: "DevOps و API", icon: Server },
  { id: "marketing", label: "SEO وتسويق", icon: TrendingUp },
  { id: "security", label: "الأمن السيبراني", icon: Shield },
  { id: "consulting", label: "الاستشارات", icon: Lightbulb },
] as const;

export type ServiceCategoryId = (typeof SERVICE_CATEGORIES)[number]["id"];
export type ServiceCategoryKey = Exclude<ServiceCategoryId, "all">;

export const SERVICE_CATEGORY_MAP = SERVICE_CATEGORIES.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<ServiceCategoryId, { id: ServiceCategoryId; label: string; icon: LucideIcon }>
);

export function normalizeServiceCategory(value?: string | null): ServiceCategoryKey {
  const raw = (value || "").trim().toLowerCase();
  const aliases: Record<string, ServiceCategoryKey> = {
    development: "development",
    dev: "development",
    web: "development",
    ecommerce: "ecommerce",
    commerce: "ecommerce",
    store: "ecommerce",
    mobile: "mobile",
    app: "mobile",
    ai: "ai",
    automation: "automation",
    workflow: "automation",
    bots: "bots",
    bot: "bots",
    telegram: "bots",
    devops: "devops",
    api: "devops",
    marketing: "marketing",
    seo: "marketing",
    security: "security",
    cyber: "security",
    consulting: "consulting",
    consult: "consulting",
  };

  return aliases[raw] || "consulting";
}

