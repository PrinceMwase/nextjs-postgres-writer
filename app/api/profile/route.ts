import { NextResponse } from "next/server";
import { auth } from "lib/auth";
import prisma from "lib/prisma";
import profile, { Writer } from "types/profile";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

const userQuery: Prisma.UserSelect<DefaultArgs> = {
  firstname: true,
  lastname: true,
  userTags: {
    select: {
      tag: {
        select: {
          id: true,
          tag: true,
        },
      },
    },
  },
};
const writerQuery: Prisma.WriterSelect<DefaultArgs> = {
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
      genre: {
        select: {
          genre: true,
          photo: {
            select: {
              link: true,
            },
          },
        },
      },
    },
    take: 6,
    orderBy: {
      id: "desc",
    },
  },
};

export async function POST(request: Request) {
  const authStatus = await auth();

  if (!authStatus) {
    return NextResponse.json(
      { message: "not authenticated  ???" },
      { status: 401 }
    );
  }

  const { username }: { username: string } = await request.json();

  const myWriter = await prisma.writer.findUnique({
    where: {
      username,
    },
    select: {
      ...writerQuery,
      user: {
        select: {
          ...userQuery,
        },
      },
    },
  });

  if (myWriter === null) {
    return NextResponse.json({ error: "No Writer" }, { status: 404 });
  }

  const { user, ...writerDetails } = myWriter;

  const writer = {
    ...writerDetails,
  };

  const myProfile = {
    ...user,
    writer: [writer],
  };

  return NextResponse.json({ user: myProfile });
}

export async function GET(request: Request) {
  const authStatus = await auth();

  if (!authStatus) {
    return NextResponse.json(
      { message: "not authenticated  ???" },
      { status: 401 }
    );
  }
  const email = authStatus.user?.email;

  if (!email) {
    return NextResponse.json({ message: "No Email  ???" }, { status: 401 });
  }

  const user = await prisma.user.findFirstOrThrow({
    where: {
      email,
    },
    select: {
      ...userQuery,
      writer: {
        select: { ...writerQuery },
      },
    },
  });

  return NextResponse.json({ user });
}
