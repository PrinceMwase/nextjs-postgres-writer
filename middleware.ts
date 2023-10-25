import { verify } from "crypto";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If it's the root path, IT NEEDS AUTHENTICATION

  // const { searchParams } = new URL(req.url)
  // let stringified = searchParams.get('slug') ?? ''

  // let id  = parseInt(stringified)

  if (path === "/verify") {
    const { searchParams } = new URL(req.url);
    let token = searchParams.get("token") ?? "";

    const user = await prisma.user.update({
      where: {
        verificationToken: token,
      },
      data: {
        emailVerified: true,
      },
    });
    
    // Compare the token with the stored token in the database
    if (token === user.verificationToken) {
      // Mark the user as verified in the database
      // Redirect the user to a success page
      NextResponse.redirect(new URL("/verification-success", req.url));
    } else {
      // Handle invalid or expired tokens
      NextResponse.redirect(new URL("/verification-failure", req.url));
    }
  }

  if (!session && path === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  if (!session && path === "/profile") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!session && path === "/protected") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/protected", req.url));
  }

  return NextResponse.next();
}
