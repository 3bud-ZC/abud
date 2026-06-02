const DEFAULT_SITE_URL = "https://abud.fun";

export function getSiteBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

export function siteUrl(path = ""): string {
  const base = getSiteBaseUrl();
  if (!path) return base;

  return new URL(path, base).toString();
}
