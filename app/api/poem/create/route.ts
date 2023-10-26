import { createType } from "../../../../types/poem";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authorize } from "../infinite/route";

export async function POST(req: Request) {
  const payload: createType = await req.json();
  const email = await authorize();
  if (!email) {
    return NextResponse.json(
      {
        error: "not authenticated",
      },
      { status: 401 }
    );
  }
  const user = await prisma.user.findUniqueOrThrow({
    select: {
      writer: {
        select: {
          id: true,
        },
      },
    },
    where: {
      email,
    },
  });

  // const writerId = user?.writer[0]?.id
  if (payload.lines.length > 1000) {
    return NextResponse.error();
  }
  if (user.writer.length > 0) {
    const results = await prisma.poem.create({
      data: {
        background: payload.background,
        title: payload.title,
        content: JSON.stringify(payload.lines),
        writerId: user.writer[0].id,
        description: payload.description ?? "",
        genreId: payload.genreId,
      },
    });
    if (results) {
      return NextResponse.json(results, { status: 200 });
    } else {
      return NextResponse.json({ error: "Failed to Create" }, { status: 400 });
    }
  } else {
    return NextResponse.json(
      { error: "Failed to Create you are not a writer" },
      { status: 400 }
    );
  }
}
