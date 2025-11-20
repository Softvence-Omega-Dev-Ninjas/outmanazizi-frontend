import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  // If user is NOT logged in and trying to access dashboard
  if (path.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If accessing dashboard, verify token
  if (path.startsWith("/dashboard") && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      // Check if user has admin role
      if (!["ADMIN", "SUPER_ADMIN"].includes(payload.role as string)) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        response.cookies.delete("user");
        return response;
      }
    } catch (error) {
      // Clear cookies and redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      response.cookies.delete("user");
      return response;
    }
  }

  // If user IS logged in and trying to access login page
  if (path === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Run proxy on these paths
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};