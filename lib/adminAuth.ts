import { NextRequest } from "next/server";

const COOKIE_NAME = "admin_token";
const TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24h

export function verifyAdminToken(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;

  // Vérification de la signature
  const expectedSignature = Buffer.from(`${secret}:${payload}`).toString("base64");
  if (signature !== expectedSignature) return false;

  // Vérification de l'expiration (24h)
  try {
    const decoded = Buffer.from(payload, "base64").toString("utf8");
    const colonIdx = decoded.lastIndexOf(":");
    const timestamp = parseInt(decoded.slice(colonIdx + 1), 10);
    if (Date.now() - timestamp > TOKEN_MAX_AGE_MS) return false;
  } catch {
    return false;
  }

  return true;
}
