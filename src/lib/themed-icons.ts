import {
  Sparkles,
  Code2,
  Bot,
  BrainCircuit,
  Workflow,
  Shield,
  Rocket,
  Globe,
  ShoppingBag,
  Smartphone,
  Server,
  TrendingUp,
  Lightbulb,
  Layers,
  type LucideIcon,
} from "lucide-react";

export type ThemedIconKey =
  | "sparkles"
  | "code2"
  | "bot"
  | "brain"
  | "workflow"
  | "shield"
  | "rocket"
  | "globe"
  | "shopping-bag"
  | "smartphone"
  | "server"
  | "trending-up"
  | "lightbulb"
  | "layers";

export interface ThemedIconPreset {
  key: ThemedIconKey;
  label: string;
  icon: LucideIcon;
  color: string;
  aliases: string[];
}

export const THEMED_ICONS: ThemedIconPreset[] = [
  {
    key: "sparkles",
    label: "إبداع",
    icon: Sparkles,
    color: "#c084fc",
    aliases: ["sparkles", "sparkle", "star", "✨", "⚡"],
  },
  {
    key: "code2",
    label: "تطوير",
    icon: Code2,
    color: "#60a5fa",
    aliases: ["code2", "code", "dev", "web", "💻", "</>", "<>", "{}"],
  },
  {
    key: "bot",
    label: "بوت",
    icon: Bot,
    color: "#67e8f9",
    aliases: ["bot", "robot", "telegram", "🤖"],
  },
  {
    key: "brain",
    label: "ذكاء اصطناعي",
    icon: BrainCircuit,
    color: "#a78bfa",
    aliases: ["brain", "ai", "llm", "🧠"],
  },
  {
    key: "workflow",
    label: "أتمتة",
    icon: Workflow,
    color: "#34d399",
    aliases: ["workflow", "automation", "gear", "⚙", "⚙️"],
  },
  {
    key: "shield",
    label: "حماية",
    icon: Shield,
    color: "#f87171",
    aliases: ["shield", "security", "cyber", "🛡", "🛡️"],
  },
  {
    key: "rocket",
    label: "إطلاق",
    icon: Rocket,
    color: "#fbbf24",
    aliases: ["rocket", "launch", "growth", "🚀"],
  },
  {
    key: "globe",
    label: "ويب",
    icon: Globe,
    color: "#67e8f9",
    aliases: ["globe", "global", "site", "web", "🌐"],
  },
  {
    key: "shopping-bag",
    label: "متجر",
    icon: ShoppingBag,
    color: "#f59e0b",
    aliases: ["shopping-bag", "shopping", "store", "ecommerce", "🛒", "🛍️"],
  },
  {
    key: "smartphone",
    label: "موبايل",
    icon: Smartphone,
    color: "#22d3ee",
    aliases: ["smartphone", "mobile", "phone", "📱"],
  },
  {
    key: "server",
    label: "خلفية / API",
    icon: Server,
    color: "#818cf8",
    aliases: ["server", "api", "backend", "database", "🗄️"],
  },
  {
    key: "trending-up",
    label: "تسويق / SEO",
    icon: TrendingUp,
    color: "#fb7185",
    aliases: ["trending-up", "trending", "seo", "marketing", "📈"],
  },
  {
    key: "lightbulb",
    label: "استشارة",
    icon: Lightbulb,
    color: "#facc15",
    aliases: ["lightbulb", "consulting", "idea", "💡"],
  },
  {
    key: "layers",
    label: "مشروع / منصة",
    icon: Layers,
    color: "#c4b5fd",
    aliases: ["layers", "stack", "app", "project", "📦"],
  },
];

const ICON_BY_KEY = THEMED_ICONS.reduce((acc, preset) => {
  acc[preset.key] = preset;
  return acc;
}, {} as Record<ThemedIconKey, ThemedIconPreset>);

const ICON_ALIASES = THEMED_ICONS.reduce((acc, preset) => {
  preset.aliases.forEach((alias) => {
    acc[alias.toLowerCase()] = preset.key;
  });
  return acc;
}, {} as Record<string, ThemedIconKey>);

export function normalizeThemedIconKey(
  raw?: string | null,
  fallback: ThemedIconKey = "sparkles"
): ThemedIconKey {
  const normalized = String(raw || "").trim().toLowerCase();
  if (!normalized) return fallback;

  if (normalized in ICON_BY_KEY) {
    return normalized as ThemedIconKey;
  }

  return ICON_ALIASES[normalized] || fallback;
}

export function getThemedIconPreset(
  raw?: string | null,
  fallback: ThemedIconKey = "sparkles"
): ThemedIconPreset {
  return ICON_BY_KEY[normalizeThemedIconKey(raw, fallback)];
}

export const SERVICE_ICON_FALLBACK: Record<string, ThemedIconKey> = {
  "web-development": "code2",
  "business-systems": "layers",
  telegram: "bot",
  "ai-automation": "workflow",
  development: "code2",
  ecommerce: "shopping-bag",
  mobile: "smartphone",
  ai: "brain",
  automation: "workflow",
  bots: "bot",
  devops: "server",
  marketing: "trending-up",
  security: "shield",
  consulting: "lightbulb",
};

export function resolveServiceIconKey(icon?: string | null, useCase?: string | null): ThemedIconKey {
  if (icon && icon.trim()) {
    return normalizeThemedIconKey(icon, "sparkles");
  }

  const category = String(useCase || "").trim().toLowerCase();
  return SERVICE_ICON_FALLBACK[category] || "sparkles";
}
