import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limiter";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل").max(100),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().optional(),
  subject: z.string().min(3, "الموضوع يجب أن يكون 3 أحرف على الأقل").max(200),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل").max(2000),
});

export async function POST(req: NextRequest) {
  // Rate limiting
  const rateLimit = checkRateLimit(req, "contact");
  if (!rateLimit.allowed) {
    return NextResponse.json(rateLimitResponse(rateLimit.resetTime), { status: 429 });
  }

  try {
    const body = await req.json();
    
    // Validate input
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ 
        error: validation.error.errors[0].message 
      }, { status: 400 });
    }

    const { name, email, phone, subject, message } = validation.data;
    
    const msg = await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, subject, message },
    });
    return NextResponse.json({ ok: true, id: msg.id }, { status: 201 });
  } catch (e) {
    console.error("Contact error:", e instanceof Error ? e.message : "Unknown error");
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await verifySession(req);
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ messages });
}
