import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, locale: "ar" });
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ABUD-${timestamp}-${random}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export const paymentMethodLabels: Record<string, string> = {
  paypal: "PayPal",
  vodafone_cash: "فودافون كاش",
  instapay: "إنستاباي",
};

export const orderStatusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "قيد الانتظار", color: "yellow" },
  processing: { label: "قيد المعالجة", color: "blue" },
  completed: { label: "مكتمل", color: "green" },
  cancelled: { label: "ملغي", color: "red" },
  refunded: { label: "مُسترد", color: "gray" },
};

export const paymentStatusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "معلق", color: "yellow" },
  paid: { label: "مدفوع", color: "green" },
  failed: { label: "فشل", color: "red" },
  refunded: { label: "مُسترد", color: "gray" },
};
