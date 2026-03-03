import { type NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_token";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24h

function signToken(email: string, secret: string): string {
  // Simple HMAC-like token : base64(email:timestamp):base64(secret_hash)
  const payload = Buffer.from(`${email}:${Date.now()}`).toString("base64");
  const signature = Buffer.from(`${secret}:${payload}`).toString("base64");
  return `${payload}.${signature}`;
}

export async function POST(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const action = searchParams.get("action");

  // Logout
  if (action === "logout") {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });
    return response;
  }

  // Login
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminEmail || !adminPassword || !adminSecret) {
    return NextResponse.json(
      { error: "Configuration admin manquante" },
      { status: 500 },
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide" },
      { status: 400 },
    );
  }

  if (body.email !== adminEmail || body.password !== adminPassword) {
    return NextResponse.json(
      { error: "Identifiants incorrects" },
      { status: 401 },
    );
  }

  const token = signToken(adminEmail, adminSecret);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return response;
}
