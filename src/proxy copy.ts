import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { jwtVerify } from "jose";

interface DecodedToken {
  userId: string;
  role: string;
  exp: number;
}

const publicRoutes = ["/login", "/register", "/"];
const adminRoutes = ["/dashboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if accessing admin routes
  if (pathname.startsWith("/dashboard")) {
    // No token - redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // try {
    //   const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    //   await jwtVerify(token, secret);
    // } catch (error) {
    //   // Clear cookies and redirect to login
    //   const response = NextResponse.redirect(new URL("/login", request.url));
    //   response.cookies.delete("token");
    //   response.cookies.delete("user");
    //   return response;
    // }

    try {
      // Decode and validate token
      const decoded = jwtDecode<DecodedToken>(token);

      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        return response;
      }

      // Check if user has admin role
      if (!["ADMIN", "SUPER_ADMIN"].includes(decoded.role)) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      // Invalid token - redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  // For other protected routes, just check if token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
