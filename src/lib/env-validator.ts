const REQUIRED_ENV_VARS = [
  "DATABASE_URL",
  "SESSION_SECRET",
  "NODE_ENV",
] as const;

const OPTIONAL_ENV_VARS = [
  "NEXT_PUBLIC_SITE_URL",
  "UPLOAD_DIR",
  "AI_MODEL_API_KEY",
  "AI_MODEL_PROVIDER",
] as const;

interface EnvValidationResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
}

export function validateEnv(): EnvValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  for (const varName of REQUIRED_ENV_VARS) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  if (process.env.SESSION_SECRET === "fallback-secret-change-in-production-32ch") {
    missing.push("SESSION_SECRET (using insecure fallback)");
  }

  if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length < 32) {
    warnings.push("SESSION_SECRET should be at least 32 characters long");
  }

  if (process.env.NODE_ENV === "production") {
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      warnings.push("NEXT_PUBLIC_SITE_URL is not set in production");
    }
  }

  return {
    valid: missing.length === 0,
    missing,
    warnings,
  };
}

export function validateEnvOrThrow(): void {
  const result = validateEnv();

  if (!result.valid) {
    const errorMessage = [
      "❌ Environment validation failed!",
      "",
      "Missing required environment variables:",
      ...result.missing.map((v) => `  - ${v}`),
      "",
      "Please check your .env file and ensure all required variables are set.",
    ].join("\n");

    throw new Error(errorMessage);
  }

  if (result.warnings.length > 0) {
    console.warn("⚠️  Environment warnings:");
    result.warnings.forEach((w) => console.warn(`  - ${w}`));
  }
}
