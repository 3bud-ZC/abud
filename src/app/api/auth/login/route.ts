import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Login attempt:", { email: body.email });
    
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: "البريد الإلكتروني وكلمة المرور مطلوبان" }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) {
      console.log("Admin not found:", email);
      return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      console.log("Invalid password for:", email);
      return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
    }

    await createSession({ userId: admin.id, email: admin.email });
    console.log("Login successful:", email);
    const response = NextResponse.json({ ok: true, admin: { id: admin.id, name: admin.name, email: admin.email } });
    return response;
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json({ error: "حدث خطأ داخلي", details: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
