import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { LineProperty, payload, commentType } from "@/components/poem/view";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  let stringified = searchParams.get('slug') ?? ''

  let id  = parseInt(stringified)
  

  const poem = await prisma.poem.findUnique({
    where: {
      id: id,
    },
    select: {
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
      comments: {
        select: {
          id: true,
          content: true,
          writer: true,
          createdAt: true,
        },
      },
    },
  });

  if (poem) {
    let plainContent =
      poem.content?.toString() === undefined ? "" : poem.content?.toString();

    let content: LineProperty[] = JSON.parse(plainContent);
    let comments: commentType[] = [];

    poem.comments.forEach((value) => {
      comments.push({
        poemId: undefined,
        comment: value.content,
        writer: value.writer,
        createdAt: value.createdAt
      });
    });

    let retrievedPayload: payload = {
      id: poem.id,
      title: poem.title,
      background:
        poem.background == "dark" || poem.background == "light"
          ? poem.background
          : "light",
      lines: content,
      date: poem.createdAt,
      writer: {
        id: poem.writer.id,
        name: poem.writer.username,
      },
      _count: poem._count,
      comments: comments,
    };

    return NextResponse.json(retrievedPayload, { status: 200 });
  } else {
    return NextResponse.json({ error: "Failed to retrieve" }, { status: 400 });
  }
}
