import { LineProperty, payload } from "@/components/poem/view";
import prisma from "../../../../lib/prisma";

import { NextResponse } from "next/server";
type parameters = {
  skip: number;
  take: number;
  writerId?: number;
};

export async function query(values: parameters) {
  const select = {
    id: true,
    content: true,
    title: true,
    background: true,
    createdAt: true,
    writer: {
      select: {
        id: true,
        username: true,
      },
    },
    _count: {
      select: {
        comments: true,
      },
    },
  };

  if (values.writerId)
    return await prisma.poem.findMany({
      where: {
        writerId: values.writerId,
      },
      select: select,
      skip: values.skip,
      take: values.take, // Adjust the number of posts to load at once
      orderBy: {
        id: "desc",
      },
    });
  else
    return await prisma.poem.findMany({
      select: select,
      skip: values.skip,
      take: values.take, // Adjust the number of posts to load at once
      orderBy: {
        id: "desc",
      },
    });
}

export async function POST(req: Request) {
  let retrievedPayload: payload[] = [];
  const values: parameters = await req.json();

  const poems = await query(values);

  if (poems) {
    poems.forEach((value) => {
      let plainContent =
        value.content?.toString() === undefined
          ? ""
          : value.content?.toString();

      let content: LineProperty[] = JSON.parse(plainContent);

      retrievedPayload.push({
        id: value.id,
        title: value.title,
        background:
          value.background == "dark" || value.background == "light"
            ? value.background
            : "light",
        lines: content,
        date: value.createdAt,
        writer: {
          id: value.writer.id,
          name: value.writer.username,
        },
        _count: value._count,
        comments: undefined,
      });
    });

    return NextResponse.json(retrievedPayload, { status: 200 });
  } else {
    return NextResponse.json({ error: "Failed to retrieve" }, { status: 400 });
  }
}
