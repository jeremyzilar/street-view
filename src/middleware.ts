import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("streetview_auth");

  console.log("Middleware - Auth cookie present:", !!authCookie);
  console.log("Middleware - Auth cookie value:", authCookie?.value);
  console.log("Middleware - Current path:", request.nextUrl.pathname);
  console.log("Middleware - All cookies:", request.cookies.getAll());

  // If no auth cookie is present, redirect to the password page
  if (!authCookie || authCookie.value !== "true") {
    console.log("Middleware - Redirecting to root");
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("Middleware - Allowing access");
  return NextResponse.next();
}

// Configure which routes to run the middleware on
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api|$).*)"],
};
