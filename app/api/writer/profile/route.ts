import prisma from "../../../../lib/prisma";
import { auth } from "../../../../lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authStatus = await auth();

  if (!authStatus) {
    return NextResponse.json(
      { message: "not authenticated  ???" },
      { status: 401 }
    );
  }
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: authStatus.user.email,
    },
    select: {
      writer: {
        select: {
          id: true,
          username: true,
        },
        take: 1,
      },
    },
  });

  const writer = user.writer[0];

  return NextResponse.json(
    {
      writer,
    },
    { status: 200 }
  );
}
