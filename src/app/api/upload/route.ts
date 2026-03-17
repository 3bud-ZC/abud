import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/session";
import { validateUploadFile, getAllowedTypesForContext, MAX_IMAGE_SIZE, MAX_FILE_SIZE } from "@/lib/upload-validator";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limiter";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, "upload");
  if (!rateLimit.allowed) {
    return NextResponse.json(rateLimitResponse(rateLimit.resetTime), { status: 429 });
  }

  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const context = (formData.get("context") as string) || "image";

    if (!file) {
      return NextResponse.json({ error: "لم يتم إرفاق ملف" }, { status: 400 });
    }

    const allowedTypes = getAllowedTypesForContext(context as "image" | "document" | "proof");
    const maxSize = context === "document" ? MAX_FILE_SIZE : MAX_IMAGE_SIZE;
    const validation = validateUploadFile(file, allowedTypes, maxSize);

    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const safeFileName = validation.sanitizedName!;
    const filePath = path.join(uploadDir, safeFileName);
    
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ url: `/uploads/${safeFileName}`, fileName: safeFileName });
  } catch (e) {
    console.error("Upload error:", e instanceof Error ? e.message : "Unknown error");
    return NextResponse.json({ error: "فشل رفع الملف" }, { status: 500 });
  }
}
