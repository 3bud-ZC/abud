import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "abud_session";

// Validate SESSION_SECRET
function getSessionSecret(): Uint8Array {
  const sessionSecret = process.env.SESSION_SECRET;
  
  if (!sessionSecret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "CRITICAL SECURITY ERROR: SESSION_SECRET environment variable is not set. " +
        "Application cannot start without a secure session secret. " +
        "Generate one using: openssl rand -base64 32"
      );
    } else {
      console.warn(
        "⚠️  WARNING: SESSION_SECRET is not set in development mode. " +
        "This is insecure. Generate one using: openssl rand -base64 32"
      );
      throw new Error("SESSION_SECRET is required even in development mode for security");
    }
  }

  if (sessionSecret.length < 32) {
    throw new Error(
      "SECURITY ERROR: SESSION_SECRET must be at least 32 characters long. " +
      "Current length: " + sessionSecret.length
    );
  }

  return new TextEncoder().encode(sessionSecret);
}

const secret = getSessionSecret();

export interface SessionPayload {
  userId: string;
  email: string;
  expiresAt: Date;
}

export async function createSession(payload: Omit<SessionPayload, "expiresAt">) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const token = await new SignJWT({ ...payload, expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  const cookieStore = cookies();
  (await cookieStore).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "strict",
    path: "/",
  });

  return token;
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get(SESSION_COOKIE)?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = cookies();
  (await cookieStore).delete(SESSION_COOKIE);
}

export async function verifySession(request: NextRequest): Promise<SessionPayload | null> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export function setSessionCookie(response: NextResponse, token: string, expiresAt: Date) {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "strict",
    path: "/",
  });
}
