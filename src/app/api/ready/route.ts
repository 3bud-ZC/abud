import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Readiness probe endpoint
 * Returns 200 only when the application is fully ready to serve traffic
 * Used by load balancers and orchestrators to determine if the app can receive requests
 */
export async function GET() {
  try {
    // Quick database check (lighter than health check)
    await prisma.$queryRaw`SELECT 1`;

    // Check if critical environment variables are set
    const criticalEnvVars = ["DATABASE_URL", "SESSION_SECRET"];
    const missingVars = criticalEnvVars.filter((v) => !process.env[v]);

    if (missingVars.length > 0) {
      return NextResponse.json(
        {
          ready: false,
          reason: "Missing critical environment variables",
          missing: missingVars,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      ready: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ready: false,
        reason: "Database not ready",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
