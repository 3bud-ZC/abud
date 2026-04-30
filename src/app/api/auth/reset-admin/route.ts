import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

function isMissingUsernameColumnError(error: unknown): boolean {
  if (!error) return false;
  const maybe = error as { code?: string; message?: string };
  const message = (maybe.message || "").toLowerCase();
  return maybe.code === "P2022" || (message.includes("username") && message.includes("column"));
}

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
    
    let admin;
    let usingLegacy = false;
    
    try {
      // Try with username (new schema)
      admin = await prisma.adminUser.create({
        data: {
          username: "abud",
          email: "abud@abud.fun",
          password: hashedPassword,
          name: "Abud",
        },
      });
    } catch (createError) {
      if (!isMissingUsernameColumnError(createError)) {
        throw createError;
      }
      
      // Fallback: create without username (legacy schema)
      usingLegacy = true;
      admin = await prisma.adminUser.create({
        data: {
          email: "abud@abud.fun",
          password: hashedPassword,
          name: "Abud",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Admin reset complete",
      deletedCount: deleted.count,
      legacyMode: usingLegacy,
      admin: {
        id: admin.id,
        username: usingLegacy ? null : (admin as any).username,
        email: admin.email,
        name: admin.name,
      },
      credentials: {
        username: usingLegacy ? null : "abud",
        email: "abud@abud.fun",
        password: "abud",
        note: usingLegacy ? "Use email for login (username column missing)" : "Use username or email",
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
