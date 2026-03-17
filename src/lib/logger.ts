type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";
  private isProduction = process.env.NODE_ENV === "production";

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  info(message: string, context?: LogContext): void {
    console.log(this.formatMessage("info", message, context));
  }

  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage("warn", message, context));
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext = {
      ...context,
      error: error instanceof Error ? {
        message: error.message,
        name: error.name,
        stack: this.isDevelopment ? error.stack : undefined,
      } : String(error),
    };
    console.error(this.formatMessage("error", message, errorContext));
  }

  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage("debug", message, context));
    }
  }

  // API-specific logging methods
  apiRequest(method: string, path: string, context?: LogContext): void {
    if (this.isDevelopment) {
      this.info(`API ${method} ${path}`, context);
    }
  }

  apiSuccess(method: string, path: string, context?: LogContext): void {
    this.info(`API ${method} ${path} - Success`, context);
  }

  apiError(method: string, path: string, error: Error | unknown, context?: LogContext): void {
    this.error(`API ${method} ${path} - Failed`, error, context);
  }

  // Auth-specific logging
  authAttempt(email: string): void {
    this.info("Auth attempt", { email });
  }

  authSuccess(email: string): void {
    this.info("Auth success", { email });
  }

  authFailure(email: string, reason: string): void {
    this.warn("Auth failure", { email, reason });
  }

  // Upload-specific logging
  uploadAttempt(fileName: string, size: number): void {
    this.info("Upload attempt", { fileName, size });
  }

  uploadSuccess(fileName: string, url: string): void {
    this.info("Upload success", { fileName, url });
  }

  uploadFailure(fileName: string, reason: string): void {
    this.error("Upload failure", undefined, { fileName, reason });
  }

  // Rate limit logging
  rateLimitHit(endpoint: string, ip: string): void {
    this.warn("Rate limit hit", { endpoint, ip });
  }

  // Database logging
  dbError(operation: string, error: Error | unknown): void {
    this.error(`Database ${operation} failed`, error);
  }

  // Health check logging
  healthCheck(status: "healthy" | "unhealthy", details?: LogContext): void {
    if (status === "healthy") {
      this.info("Health check - healthy", details);
    } else {
      this.error("Health check - unhealthy", undefined, details);
    }
  }
}

export const logger = new Logger();
