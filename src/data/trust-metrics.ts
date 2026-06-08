export type TrustMetricId =
  | "projects"
  | "clients"
  | "years"
  | "published_apps"
  | "quality";

export interface TrustMetric {
  id: TrustMetricId;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  shortLabel: string;
}

export const TRUST_METRICS: TrustMetric[] = [
  {
    id: "projects",
    value: 50,
    prefix: "",
    suffix: "+",
    label: "مشروع تم تنفيذه",
    shortLabel: "مشروع",
  },
  {
    id: "clients",
    value: 30,
    prefix: "",
    suffix: "+",
    label: "عميل وتجربة عمل",
    shortLabel: "عميل",
  },
  {
    id: "years",
    value: 5,
    prefix: "",
    suffix: "+",
    label: "سنوات خبرة عملية",
    shortLabel: "سنوات",
  },
  {
    id: "published_apps",
    value: 8,
    prefix: "",
    suffix: "+",
    label: "تطبيقات ومنصات منشورة",
    shortLabel: "منصات منشورة",
  },
  {
    id: "quality",
    value: 99,
    prefix: "",
    suffix: "%",
    label: "تركيز على الاستقرار والجودة",
    shortLabel: "الجودة والاستقرار",
  },
];

export const TRUST_METRIC_BY_ID: Record<TrustMetricId, TrustMetric> = TRUST_METRICS.reduce(
  (acc, metric) => {
    acc[metric.id] = metric;
    return acc;
  },
  {} as Record<TrustMetricId, TrustMetric>
);

export function formatTrustMetricValue(metric: TrustMetric): string {
  return `${metric.prefix || ""}${metric.value}${metric.suffix || ""}`;
}
