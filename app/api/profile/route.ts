import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  console.log("getting values");

  //   const { userEmail }: { userEmail: string | undefined } = await request.json();
  const authStatus = await auth();

  if (!authStatus) {
    return NextResponse.json(
      { message: "not authenticated  ???" },
      { status: 401 }
    );
  }
  console.log("finished getting them");

  const email = authStatus.user?.email;

  const user = await prisma.user.findFirstOrThrow({
    where: {
      email,
    },
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
      writer: {
        select: {
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
        },
      },
    },
  });

  console.log(user);

  return NextResponse.json({ user });
}
