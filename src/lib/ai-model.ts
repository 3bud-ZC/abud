export interface AIModelConfig {
  apiKey: string;
  provider: "openai" | "anthropic" | "google";
  model?: string;
}

export class AIModelService {
  private config: AIModelConfig;

  constructor(config: AIModelConfig) {
    this.config = config;
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      switch (this.config.provider) {
        case "openai":
          return await this.openaiRequest(prompt);
        case "anthropic":
          return await this.anthropicRequest(prompt);
        case "google":
          return await this.googleRequest(prompt);
        default:
          throw new Error("Unsupported AI provider");
      }
    } catch (error) {
      console.error("AI Model Error:", error);
      throw new Error("فشل توليد استجابة الذكاء الاصطناعي، يرجى المحاولة لاحقًا.");
    }
  }

  private async openaiRequest(prompt: string): Promise<string> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model || "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async anthropicRequest(prompt: string): Promise<string> {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.config.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: this.config.model || "claude-3-sonnet-20240229",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  private async googleRequest(prompt: string): Promise<string> {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.config.model || "gemini-pro"}:generateContent?key=${this.config.apiKey}`,
      {
        method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }
}

export function createAIModelService(): AIModelService {
  const apiKey = process.env.AI_MODEL_API_KEY;
  const rawProvider = process.env.AI_MODEL_PROVIDER || "openai";

  const allowedProviders: AIModelConfig["provider"][] = ["openai", "anthropic", "google"];
  const provider = (allowedProviders.includes(rawProvider as AIModelConfig["provider"])
    ? rawProvider
    : "openai") as AIModelConfig["provider"];

  if (!apiKey) {
    // في حالة عدم ضبط مفتاح الذكاء الاصطناعي نرجع رسالة واضحة للمستخدم
    throw new Error(
      "خدمة الذكاء الاصطناعي غير مفعّلة حالياً. يرجى ضبط المتغير AI_MODEL_API_KEY في ملف البيئة (.env) ثم إعادة تشغيل الخادم."
    );
  }

  return new AIModelService({
    apiKey,
    provider,
  });
}
