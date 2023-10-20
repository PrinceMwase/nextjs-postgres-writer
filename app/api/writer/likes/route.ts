import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const reqValues = await req.json();
  const session = await auth();
  if (session === null) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  if (session?.user?.email === null || session?.user?.email === undefined) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const user = await prisma.user.findUniqueOrThrow({
    select: {
      id: true,
    },
    where: {
      email: session?.user?.email,
    },
  });

  const result = await prisma.writerLike.create({
    data: {
      writerId: reqValues.writerId,
      userId: user?.id,
    },
  });
  return NextResponse.json({ result }, { status: 200 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let stringified = searchParams.get("slug") ?? "";

  let writerId = parseInt(stringified);

  const session = await auth();

  if (session === null) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  if (session?.user?.email === null || session?.user?.email === undefined) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const user = await prisma.user.findUniqueOrThrow({
    select: {
      id: true,
    },
    where: {
      email: session.user.email,
    },
  });

  let like = await prisma.writerLike.findUniqueOrThrow({
    select: {
      userId: true,
    },
    where: {
      userId_writerId: { writerId, userId: user.id },
    },
  });

  return NextResponse.json({ like }, { status: 200 });
}

export async function DELETE(req: Request) {
  const reqValues = await req.json();
  const session = await auth();

  if (session === null) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  if (session?.user?.email === null || session?.user?.email === undefined) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const user = await prisma.user.findUniqueOrThrow({
    select: {
      id: true,
    },
    where: {
      email: session.user.email,
    },
  });

  const result = await prisma.writerLike.delete({
    where: {
      userId_writerId: { userId: user.id, writerId: reqValues.writerId },
    },
  });

  return NextResponse.json({ result }, { status: 200 });
}
