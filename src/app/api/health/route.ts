import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function GET() {
  const startTime = Date.now();
  
  try {
    // Check database connectivity with timeout
    const dbCheckStart = Date.now();
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Database timeout")), 5000)
      )
    ]);
    const dbLatency = Date.now() - dbCheckStart;

    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      checks: {
        database: {
          status: "connected",
          latency: `${dbLatency}ms`,
        },
        application: {
          status: "running",
          uptime: `${Math.floor(process.uptime())}s`,
          memory: {
            used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
            total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
          },
        },
      },
      environment: process.env.NODE_ENV,
      version: "1.0.0",
      responseTime: `${Date.now() - startTime}ms`,
    };

    logger.healthCheck("healthy", { dbLatency, responseTime: Date.now() - startTime });
    
    return NextResponse.json(healthData);
  } catch (error) {
    const errorData = {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      checks: {
        database: {
          status: "disconnected",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        application: {
          status: "degraded",
          uptime: `${Math.floor(process.uptime())}s`,
        },
      },
      environment: process.env.NODE_ENV,
      responseTime: `${Date.now() - startTime}ms`,
    };

    logger.healthCheck("unhealthy", { 
      error: error instanceof Error ? error.message : "Unknown",
      responseTime: Date.now() - startTime 
    });

    return NextResponse.json(errorData, { status: 503 });
  }
}
