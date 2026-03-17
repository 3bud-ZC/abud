import { NextRequest, NextResponse } from "next/server";
import { createAIModelService } from "@/lib/ai-model";
import { verifySession } from "@/lib/session";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limiter";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  // Rate limiting
  const rateLimit = checkRateLimit(req, "ai");
  if (!rateLimit.allowed) {
    logger.rateLimitHit("ai", req.ip || "unknown");
    return NextResponse.json(rateLimitResponse(rateLimit.resetTime), { status: 429 });
  }

  // Authentication - AI endpoint is admin-only
  const session = await verifySession(req);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح - يتطلب تسجيل دخول" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Validate prompt length to prevent abuse
    if (prompt.length > 2000) {
      return NextResponse.json({ error: "Prompt too long (max 2000 characters)" }, { status: 400 });
    }

    const aiService = createAIModelService();
    const response = await aiService.generateResponse(prompt);

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    logger.apiError("POST", "/api/ai", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate response" },
      { status: 500 }
    );
  }
}
