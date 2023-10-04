import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;



  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

    // If it's the root path, IT NEEDS AUTHENTICATION
    if (!session && path === "/") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (path === "/home") {
      return NextResponse.redirect(new URL("/", req.url))
    }

  if (!session && path === "/protected") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/protected", req.url));
  }
  
  return NextResponse.next();
}
