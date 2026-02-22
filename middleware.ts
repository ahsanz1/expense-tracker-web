import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "expense_tracker_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and static assets
  if (pathname === "/login") {
    const session = request.cookies.get(SESSION_COOKIE)?.value;
    const secret = process.env.AUTH_SECRET;
    if (secret && session === secret) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/manifest") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const secret = process.env.AUTH_SECRET;
  if (!secret || session !== secret) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|workbox-|sw.js|sw.js.map).*)",
  ],
};
