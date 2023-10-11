import SlugID from "../../../../lib/slug_id";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  let { stringified } = SlugID(req.url);

  const writer = await prisma.writer.findUniqueOrThrow({
    where: {
      username: stringified,
    },
    select: {
      id: true,
      username: true,
    },
  });

  return NextResponse.json(writer, { status: 200 });
}

export async function POST(req: Request) {
  let { username, myUsername }: { username: string; myUsername: string } =
    await req.json();

  const writer = await prisma.writer.findUniqueOrThrow({
    where: {
      username,
    },
    select: {
      user: {
        select: {
          firstname: true,
          lastname: true,
          userTags: {
            select: {
              tag: {
                select: {
                  tag: true,
                },
              },
            },
          },
        },
      },
      username: true,
      about: true,
      photo: {
        select: {
          link: true,
        },
      },
      Poem: {
        select: {
          title: true,
          description: true,
          background: true,
          genre: true,
        },
        take: 6,
        orderBy: {
          id: "desc",
        },
      },
      writerLike: true,
      WriterMute: true,
    },
  });
}
