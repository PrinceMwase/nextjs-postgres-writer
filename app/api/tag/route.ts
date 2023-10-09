import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "not authenticated" }, { status: 200 });
  }

  const user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      email: session?.user?.email,
    },
  });

  let userTags = await prisma.userTags.findMany({
    select: {
      tag: true,
    },
    where: {
      userId: user?.id,
    },
  });
  
  const myResult = Array.from(userTags, (userTag) => {
    return userTag.tag;
  });

  return NextResponse.json({ myResult }, { status: 200 });
}

export async function POST(req: Request) {
  const reqValues: {
    tag: string;
  } = await req.json();
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      email: session?.user?.email,
    },
  });

  const tag = await prisma.tag.upsert({
    where: {
      tag: reqValues.tag,
    },
    create: {
      tag: reqValues.tag,
    },
    update: {},
  });

  if (!user) {
    return NextResponse.json({ error: "not authenticated" }, { status: 200 });
  }

  const result = await prisma.userTags.create({
    data: {
      tagId: tag.id,
      userId: user?.id,
    },
  });
  return NextResponse.json({ result }, { status: 200 });
}

export async function DELETE(req: Request) {
  const reqValues = await req.json();
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      email: session?.user?.email,
    },
  });

  const result = await prisma.poemLike.delete({
    where: {
      userId_poemId: { userId: user?.id, poemId: reqValues.poemId },
    },
  });

  return NextResponse.json({ result }, { status: 200 });
}
