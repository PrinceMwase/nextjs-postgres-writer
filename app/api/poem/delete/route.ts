import { getServerSession } from "next-auth/next";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export type deletePoemType = {
  poemId: number;
};

export async function POST(req: Request) {
  const payload: deletePoemType = await req.json();
  const session = await getServerSession();

  const poem = await prisma.poem.findFirstOrThrow({
    select: {
      id: true,
    },
    where: {
      writerId: session?.user?.writer?.id,
      id: payload.poemId,
    },
  });
  
  const results = await prisma.poem.delete({
    where: {
      id: poem.id,
    }
  });
  

  if (results) {
    return NextResponse.json(results, { status: 200 });
  } else {
    return NextResponse.json({ success: "Failed to Delete" }, { status: 400 });
  }
}
