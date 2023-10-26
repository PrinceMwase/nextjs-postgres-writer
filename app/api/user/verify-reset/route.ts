import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isTokenExpired } from "@/lib/isTokenExpired";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.error();
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      resetToken: token,
    },
    select: {
      resetTokenExpiry: true,
    },
  });

  if (user) {
    if (user.resetTokenExpiry !== null) {
      const isExpired = isTokenExpired(user.resetTokenExpiry);
      if (isExpired) {
        return NextResponse.json({ message: "token expired" }, { status: 401 });
      } else {
        return NextResponse.json({ message: "accepted" }, { status: 200 });
      }
    } else {
      return NextResponse.error();
    }
  } else {
    return NextResponse.error();
  }
}
