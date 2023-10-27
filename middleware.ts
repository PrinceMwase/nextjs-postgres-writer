import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isTokenExpired } from "./lib/isTokenExpired";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && path === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!session) {
    if (
      path.startsWith("/profile") ||
      path.startsWith("/genres") ||
      path.startsWith("/poem") ||
      path.startsWith("/settings") ||
      path.startsWith("/writer")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      return NextResponse.next();
    }
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
