import { NextResponse } from "next/server";
import prisma from "lib/prisma";
import { auth } from "lib/auth";

export async function POST(req: Request) {
  const authStatus = await auth();

  if (!authStatus) {
    return NextResponse.json(
      { error: "not authenticated  ???" },
      { status: 401 }
    );
  }
  const email = authStatus.user?.email;

  if (!email) {
    return NextResponse.json({ error: "No Email  ???" }, { status: 401 });
  }

  const { currentAbout} = await req.json();

  const about: string = currentAbout.trim();

  if (about.length > 200) {
    return NextResponse.json({ error: "Invalid About, check  length" }, { status: 400 });
  }


  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
    select:{
        id: true
    }
  });

  await prisma.writer.update({
    where:{
        userId: user.id
    },
    data:{
        about
    }
  })
  

  return NextResponse.json({ newAbout: about }, { status: 200 });
}
