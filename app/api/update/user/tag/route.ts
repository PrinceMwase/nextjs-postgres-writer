import { NextResponse } from "next/server";
import prisma from "lib/prisma";
import { auth } from "lib/auth";

export async function DELETE(req: Request) {
  const authStatus = await auth();

  if (!authStatus) {
    return NextResponse.json(
      { error: "not authenticated  ???" },
      { status: 401 }
    );
  }
  const email = authStatus.user?.email;

  if (!email) {
    return NextResponse.json({ error: "No Email  ???" }, { status: 401 });
  }

  let { tagId }: { tagId: number } = await req.json();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  const { tag } = await prisma.userTags.delete({
    where: {
      userId_tagId: { tagId, userId: user.id },
    },
    select: {
      tag: true,
    },
  });

  return NextResponse.json({ deletedTag: tag }, { status: 200 });
}

export async function POST(req: Request) {
  const authStatus = await auth();

  if (!authStatus) {
    return NextResponse.json(
      { error: "not authenticated  ???" },
      { status: 401 }
    );
  }
  const email = authStatus.user?.email;

  if (!email) {
    return NextResponse.json({ error: "No Email  ???" }, { status: 401 });
  }

  let { currentTag }: { currentTag: string } = await req.json();

  currentTag = currentTag.replace("#", "").trim().split(" ")[0];

  if (currentTag.length === 0) {
    return NextResponse.json({ error: "No Tag" }, { status: 403 });
  }

  let tag = await prisma.tag.findUnique({
    where: {
      tag: currentTag,
    },
  });

  if (!tag) {
    tag = await prisma.tag.create({
      data: {
        tag: currentTag,
      },
    });
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
    select: {
      id: true,
      _count: {
        select: {
          userTags: true,
        },
      },
    },
  });
  if (user._count.userTags > 2) {
    return NextResponse.json(
      { error: "Reached The Maximum amount of Tags you can have" },
      { status: 403 }
    );
  }
  await prisma.userTags.upsert({
    create: {
      tagId: tag.id,
      userId: user.id,
    },
    update: {},
    where: {
      userId_tagId: { tagId: tag.id, userId: user.id },
    },
  });

  return NextResponse.json({ newTag: tag }, { status: 200 });
}
