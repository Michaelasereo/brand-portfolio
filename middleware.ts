import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Require a non-empty secret and valid session for any admin route
  if (!adminSecret) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const cookie = request.cookies.get("admin_session")?.value;
  const querySecret = request.nextUrl.searchParams.get("secret");

  const isAuthenticated =
    (cookie && cookie === adminSecret) ||
    (querySecret && querySecret === adminSecret);

  if (isAuthenticated) {
    const res = NextResponse.next();
    if (querySecret && querySecret === adminSecret) {
      res.cookies.set("admin_session", adminSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }
    return res;
  }

  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
