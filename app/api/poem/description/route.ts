import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

// update a poem's description
export async function POST(req: Request) {

  const reqValues: {
    description: string;
    poemId: number
  } = await req.json();
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

  const writer = await prisma.writer.update({
    where: {
      userId: user?.id,
    },
    data:{
        Poem:{
            update:{
                where:{
                    id: reqValues.poemId
                },
                data:{
                    description: reqValues.description
                }
            }
        }
    }
  });

  return NextResponse.json({ writer }, { status: 200 });
}
