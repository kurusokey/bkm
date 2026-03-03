import { type NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/adminAuth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Laisser passer la page de login et l'API d'auth
  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/auth")) {
    return NextResponse.next();
  }

  // Protéger les API routes admin → retourner 401
  if (pathname.startsWith("/api/admin")) {
    if (!verifyAdminToken(request)) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Protéger les pages admin → rediriger vers login
  if (pathname.startsWith("/admin")) {
    if (!verifyAdminToken(request)) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
