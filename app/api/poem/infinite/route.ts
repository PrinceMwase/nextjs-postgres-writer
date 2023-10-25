import { LineProperty, payload } from "../../../../types/poem";
import prisma from "../../../../lib/prisma";

import { NextResponse } from "next/server";

import { auth } from "lib/auth";

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
type parameters = {
  skip: number;
  take: number;
  writerId?: number;
  writersId?: boolean;
  notWritersId?: boolean;
  genreId?: string;
};
export async function query(values: parameters) {
  // Define the fields to select from the database
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

  // Check if poems should be filtered by liked writers
  if (values.writersId) {
    // Authorize the user
    const result = await authorize();
    if (result) {
      // Retrieve liked and muted writers' IDs for the authorized user
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email: result,
        },
        select: {
          writerLike: true,
          WriterMute: true,
        },
      });

      const LikedWritersId = user.writerLike.map((v) => v.writerId);
      const MutedWritersId = user.WriterMute.map((v) => v.writerId);

      // Retrieve poems from liked writers excluding muted writers
      return await prisma.poem.findMany({
        where: {
          writerId: {
            in: LikedWritersId,
            notIn: MutedWritersId,
          },
        },
        select: select,
        skip: values.skip,
        take: values.take,
        orderBy: {
          id: "desc",
        },
      });
    }
    return;
  }

  // Check if poems should be filtered by muted writers
  if (values.notWritersId) {
    // Authorize the user
    const result = await authorize();
    if (result) {
      // Retrieve muted writers' IDs for the authorized user
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email: result,
        },
        select: {
          WriterMute: true,
        },
      });

      const MutedWritersId = user.WriterMute.map((v) => v.writerId);

      // Retrieve poems from muted writers
      return await prisma.poem.findMany({
        where: {
          writerId: {
            in: MutedWritersId,
          },
        },
        select: select,
        skip: values.skip,
        take: values.take,
        orderBy: {
          id: "desc",
        },
      });
    }
    return;
  }

  // Check if poems should be filtered by genre
  if (values.genreId) {
    // Authorize the user
    const email = await authorize();
    if (!email) {
      return;
    }

    // Retrieve muted writers' IDs for the authorized user
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
      select: {
        WriterMute: true,
      },
    });

    const MutedWritersId = user.WriterMute.map((v) => v.writerId);

    // Retrieve poems with a specific genre, excluding muted writers
    return await prisma.poem.findMany({
      where: {
        writerId: {
          notIn: MutedWritersId,
        },
        genre:{
          genre: values.genreId
        }
      },
      select: select,
      skip: values.skip,
      take: values.take,
      orderBy: {
        id: "desc",
      },
    });
  }

  // Check if poems should be filtered by a specific writer ID
  if (values.writerId) {
    // Retrieve poems by a specific writer
    return await prisma.poem.findMany({
      where: {
        writerId: values.writerId,
      },
      select: select,
      skip: values.skip,
      take: values.take,
      orderBy: {
        id: "desc",
      },
    });
  } else {
    // Retrieve all poems excluding muted writers
    const email = await authorize();
    if (!email) {
      return;
    }

    // Retrieve muted writers' IDs for the authorized user
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
      select: {
        WriterMute: true,
      },
    });

    const MutedWritersId = user.WriterMute.map((v) => v.writerId);

    return await prisma.poem.findMany({
      where: {
        writerId: {
          notIn: MutedWritersId,
        },
      },
      select: select,
      skip: values.skip,
      take: values.take,
      orderBy: {
        id: "desc",
      },
    });
  }
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
