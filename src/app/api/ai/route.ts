import { NextRequest, NextResponse } from "next/server";
import { createAIModelService } from "@/lib/ai-model";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const aiService = createAIModelService();
    const response = await aiService.generateResponse(prompt);

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate response" },
      { status: 500 }
    );
  }
}
