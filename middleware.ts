import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";

// Admin email - only this user can access admin panel
const ADMIN_EMAIL = "salamhani697@gmail.com";

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  const pathname = request.nextUrl.pathname;
  const user = (session as any)?.user;
  const isLoggedIn = !!user;
  const userEmail = user?.email;
  const isAdmin = userEmail === ADMIN_EMAIL;

  // Protect admin routes - only admin email can access
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!isAdmin) {
      // Redirect non-admin users to home
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect account routes
  if (pathname.startsWith("/account") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/login", "/signup"],
};
