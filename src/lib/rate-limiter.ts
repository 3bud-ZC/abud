import { NextRequest } from "next/server";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

const RATE_LIMITS = {
  auth: { maxRequests: 5, windowMs: 15 * 60 * 1000 },
  upload: { maxRequests: 10, windowMs: 60 * 1000 },
  contact: { maxRequests: 3, windowMs: 60 * 1000 },
  ai: { maxRequests: 10, windowMs: 60 * 1000 },
  newsletter: { maxRequests: 5, windowMs: 60 * 1000 },
  default: { maxRequests: 30, windowMs: 60 * 1000 },
};

export type RateLimitType = keyof typeof RATE_LIMITS;

function getClientIdentifier(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : req.ip || "unknown";
  return ip;
}

function cleanupExpiredEntries() {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}

export function checkRateLimit(
  req: NextRequest,
  type: RateLimitType = "default"
): { allowed: boolean; remaining: number; resetTime: number } {
  const config = RATE_LIMITS[type];
  const identifier = getClientIdentifier(req);
  const key = `${type}:${identifier}`;
  const now = Date.now();

  if (Math.random() < 0.01) {
    cleanupExpiredEntries();
  }

  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: store[key].resetTime,
    };
  }

  store[key].count++;

  if (store[key].count > config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: store[key].resetTime,
    };
  }

  return {
    allowed: true,
    remaining: config.maxRequests - store[key].count,
    resetTime: store[key].resetTime,
  };
}

export function rateLimitResponse(resetTime: number) {
  const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
  return {
    error: "تم تجاوز الحد المسموح من الطلبات، يرجى المحاولة لاحقًا",
    retryAfter,
  };
}
