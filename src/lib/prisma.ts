import { PrismaClient } from "@prisma/client";

// Fields stored as JSON strings in SQLite
const JSON_FIELDS: Record<string, string[]> = {
  HeroSection: ["ctaLinks"],
  AboutSection: ["skills", "highlights"],
  Product: ["payMethods"],
  PortfolioProject: ["tags", "links"],
  BlogPost: ["tags"],
};

function parseJsonFields(model: string, data: unknown): unknown {
  if (!data || typeof data !== "object") return data;
  if (Array.isArray(data)) return data.map((item) => parseJsonFields(model, item));
  const fields = JSON_FIELDS[model] ?? [];
  const result = { ...(data as Record<string, unknown>) };
  for (const f of fields) {
    if (typeof result[f] === "string") {
      try { result[f] = JSON.parse(result[f] as string); } catch { result[f] = []; }
    }
  }
  return result;
}

function stringifyJsonFields(model: string, data: unknown): unknown {
  if (!data || typeof data !== "object" || Array.isArray(data)) return data;
  const fields = JSON_FIELDS[model] ?? [];
  const result = { ...(data as Record<string, unknown>) };
  for (const f of fields) {
    if (result[f] !== undefined && typeof result[f] !== "string") {
      result[f] = JSON.stringify(result[f]);
    }
  }
  return result;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (client as any).$use(async (params: any, next: any) => {
    const model: string = params.model ?? "";
    // Stringify before write
    if (params.action === "upsert") {
      if (params.args?.create) params.args.create = stringifyJsonFields(model, params.args.create);
      if (params.args?.update) params.args.update = stringifyJsonFields(model, params.args.update);
    } else if (["create", "update", "createMany", "updateMany"].includes(params.action)) {
      if (params.args?.data) params.args.data = stringifyJsonFields(model, params.args.data);
    }
    const result = await next(params);
    // Parse after read/write
    return parseJsonFields(model, result);
  });

  return client;
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
