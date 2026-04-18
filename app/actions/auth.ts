"use server";

/**
 * Kangala Sovereign — Server-Side Password Gate
 * 
 * Password NEVER reaches the client bundle.
 * Verification runs exclusively on the server.
 * Authentication persists via HTTP-only signed cookie.
 * 
 * Config: set GATE_PASSWORD and AUTH_SECRET in .env.local
 */

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

const COOKIE_NAME = "kg_sov_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours
const TOKEN_PREFIX = "v1:";

function getPassword(): string {
  return (process.env.GATE_PASSWORD || "KANGALA2026").trim();
}

function getSecret(): string {
  if (!process.env.AUTH_SECRET) {
    console.warn(
      "[Kangala Auth] WARNING: AUTH_SECRET is not set in environment variables. " +
      "Using insecure default. Set AUTH_SECRET in .env.local before deploying. " +
      "Run: openssl rand -hex 32"
    );
  }
  return (
    process.env.AUTH_SECRET ||
    "kangala-sovereign-change-me-in-env-local-for-production"
  );
}

function signToken(payload: string): string {
  const hmac = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  return `${TOKEN_PREFIX}${payload}.${hmac}`;
}

function verifyToken(token: string | undefined): boolean {
  if (!token || !token.startsWith(TOKEN_PREFIX)) return false;
  const body = token.slice(TOKEN_PREFIX.length);
  const dotIdx = body.lastIndexOf(".");
  if (dotIdx < 0) return false;
  const payload = body.slice(0, dotIdx);
  const received = body.slice(dotIdx + 1);
  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  try {
    // timing-safe compare
    return crypto.timingSafeEqual(
      Buffer.from(received, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

// ───────────────────────────────── Public API ─────────────────────────────────

export type LoginState = { ok: boolean; error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const input = String(formData.get("password") || "").trim();

  // Small artificial delay to discourage brute force + improves UX drama
  await new Promise((r) => setTimeout(r, 500));

  if (input.toUpperCase() !== getPassword().toUpperCase()) {
    return { ok: false, error: "الرمز غير صحيح" };
  }

  const token = signToken(`authed:${Date.now()}`);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  revalidatePath("/");
  return { ok: true };
}

export async function logoutAction(): Promise<void> {
  cookies().delete(COOKIE_NAME);
  revalidatePath("/");
}

export async function isAuthenticated(): Promise<boolean> {
  const token = cookies().get(COOKIE_NAME)?.value;
  return verifyToken(token);
}
