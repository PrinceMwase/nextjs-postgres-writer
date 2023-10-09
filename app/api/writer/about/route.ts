import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// update a writer's about
export async function POST(req: Request) {
  const reqValues: {
    about: string;
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
    
        where:{
        userId: user.id,
        },
        data:{
            about: reqValues.about
        }

    
  });


  return NextResponse.json({ writer }, { status: 200 });
}
