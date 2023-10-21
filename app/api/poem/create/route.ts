import { createType } from "../../../../types/poem";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload: createType = await req.json();
  const session = await getServerSession();

  const user = await prisma.user.findUnique({
    select: {
      writer: {
        select: {
          id: true,
        },
      },
    },
    where: {
      email: session?.user?.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "You are not authenticated" },
      { status: 400 }
    );
  }

  // const writerId = user?.writer[0]?.id
  if (user?.writer.length !== undefined && user?.writer.length > 0) {
    const results = await prisma.poem.create({
      data: {
        background: payload.background,
        title: payload.title,
        content: JSON.stringify(payload.lines),
        writerId: user?.writer[0].id ? user?.writer[0].id : 1,
        description: payload.description ?? "",
        genreId: payload.genreId
      },
    });
    if (results) {
      return NextResponse.json(results, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Failed to Create" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Failed to Create you are not a writer" },
      { status: 400 }
    );
  }
}
