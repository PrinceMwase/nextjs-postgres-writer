import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { auth } from "@/lib/auth";

export async function authorize() {
  const authStatus = await auth();

  if (!authStatus) {
    return null;
  }
  const email = authStatus.user?.email;

  if (!email) {
    return null;
  }
  return email;
}

export async function POST(req: Request) {
  const reqValues = await req.json();

  const email = await authorize();
  if (!email) {
    return NextResponse.json({ error: "not authorized" }, { status: 401 });
  }
  const user = await prisma.user.findUniqueOrThrow({
    select: {
      id: true,
    },
    where: {
      email,
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

  const email = await authorize();
  if (!email) {
    return NextResponse.json({ error: "not authorized" }, { status: 401 });
  }
  const user = await prisma.user
    .findUniqueOrThrow({
      select: {
        id: true,
      },
      where: {
        email,
      },
    })
    .catch(() => {
      return null;
    });

    if(user === null){
      return NextResponse.json({ error: "not following" }, { status: 403 });
    }

  let like = await prisma.writerLike
    .findUniqueOrThrow({
      select: {
        userId: true,
      },
      where: {
        userId_writerId: { writerId, userId: user.id },
      },
    })
    .catch(() => {
      return null;
    });

  if (like === null) {
    return NextResponse.json({ error: "not following" }, { status: 403 });
  }

  return NextResponse.json({ like }, { status: 200 });
}

export async function DELETE(req: Request) {
  const reqValues = await req.json();
  const email = await authorize();
  if (!email) {
    return NextResponse.json({ error: "not authorized" }, { status: 401 });
  }
  const user = await prisma.user.findUniqueOrThrow({
    select: {
      id: true,
    },
    where: {
      email,
    },
  });

  const result = await prisma.writerLike.delete({
    where: {
      userId_writerId: { userId: user.id, writerId: reqValues.writerId },
    },
  });

  return NextResponse.json({ result }, { status: 200 });
}
