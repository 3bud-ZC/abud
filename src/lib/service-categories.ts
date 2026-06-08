import {
  Sparkles,
  Code2,
  ShoppingBag,
  BrainCircuit,
  Bot,
  Layers,
  Server,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_CATEGORIES = [
  { id: "all", label: "الكل", icon: Sparkles },
  { id: "web-development", label: "Web Development", icon: Code2 },
  { id: "business-systems", label: "Business Systems", icon: Layers },
  { id: "telegram", label: "Telegram", icon: Bot },
  { id: "ai-automation", label: "AI & Automation", icon: BrainCircuit },
  { id: "devops", label: "DevOps", icon: Server },
  { id: "ecommerce", label: "التجارة الإلكترونية", icon: ShoppingBag },
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
    development: "web-development",
    dev: "web-development",
    web: "web-development",
    website: "web-development",
    "web-development": "web-development",
    site: "web-development",
    landing: "web-development",

    business: "business-systems",
    crm: "business-systems",
    erp: "business-systems",
    dashboard: "business-systems",
    "business-systems": "business-systems",
    management: "business-systems",
    system: "business-systems",

    telegram: "telegram",
    bot: "telegram",
    bots: "telegram",
    miniapp: "telegram",
    "mini-app": "telegram",
    "mini-apps": "telegram",

    ai: "ai-automation",
    automation: "ai-automation",
    workflow: "ai-automation",
    "ai-automation": "ai-automation",

    devops: "devops",
    vps: "devops",
    server: "devops",
    deployment: "devops",
    api: "devops",

    ecommerce: "ecommerce",
    commerce: "ecommerce",
    store: "ecommerce",
    shop: "ecommerce",

    security: "devops",
    cyber: "devops",
    consulting: "business-systems",
    consult: "business-systems",
    mobile: "web-development",
    app: "web-development",
    marketing: "web-development",
    seo: "web-development",
  };

  return aliases[raw] || "web-development";
}

