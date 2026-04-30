import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// One-time admin reset endpoint
// Use: GET /api/auth/reset-admin?confirm=yes
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const confirm = searchParams.get("confirm");

  if (confirm !== "yes") {
    return NextResponse.json(
      { error: "Add ?confirm=yes to proceed" },
      { status: 400 }
    );
  }

  try {
    // Delete all existing admin users
    const deleted = await prisma.adminUser.deleteMany({});

    // Create fresh admin with abud/abud
    const hashedPassword = await bcrypt.hash("abud", 12);
    const admin = await prisma.adminUser.create({
      data: {
        username: "abud",
        email: "abud@abud.fun",
        password: hashedPassword,
        name: "Abud",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin reset complete",
      deletedCount: deleted.count,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
      },
      credentials: {
        username: "abud",
        email: "abud@abud.fun",
        password: "abud",
      },
    });
  } catch (error) {
    console.error("Admin reset failed:", error);
    return NextResponse.json(
      { error: "Reset failed", details: String(error) },
      { status: 500 }
    );
  }
}
