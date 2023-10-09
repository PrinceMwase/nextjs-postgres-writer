import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "not authenticated" }, { status: 304 });
  }
  const user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      email: session?.user?.email,
    },
  });

  let tags = await prisma.userTags.findMany({
    select: {
      tag:{
        select: {
            tag: true
        }
      }
    },
    where: {
      userId: user?.id,
    },
  });
//   const myResult = Array.from(tags, (tag) => {
//     return tag.tagId;
//   });

  return NextResponse.json({ tags }, { status: 200 });
}

export async function POST(req: Request) {
  const reqValues:{
    tagId: number
  } = await req.json();
  const session = await getServerSession();

  if(!session){
    return NextResponse.json({ error: "not authenticated" }, { status: 304 });
  }

  const user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      email: session?.user?.email,
    },
  });

  const result = await prisma.userTags.create({
    data: {
      tagId: reqValues.tagId,
      userId: user?.id,
    },
  });
  return NextResponse.json({ result }, { status: 200 });
}

export async function DELETE(req: Request) {
  const reqValues:{
    tagId: number
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

  const result = await prisma.userTags.delete({
    where: {
      userId_tagId: { userId: user?.id, tagId: reqValues.tagId },
    },
  });

  return NextResponse.json({ result }, { status: 200 });
}
