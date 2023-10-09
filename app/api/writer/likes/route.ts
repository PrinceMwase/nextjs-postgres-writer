import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request){
    const reqValues = await req.json();
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    select: {
        id:true
    },
    where: {
      email: session?.user?.email,
    },
  });

  const result = await prisma.writerLike.create({
    data: {
      writerId: reqValues.poemId,
      userId: user?.id,
    },
  });
  return NextResponse.json({ result }, { status: 200 });
}

export async function GET(req: Request) {
    const session = await getServerSession();
  
    const user = await prisma.user.findUnique({
      select: {
          id:true
      },
      where: {
        email: session?.user?.email,
      },
    });
      
    let likes = await prisma.writerLike.findMany({
      select: {
        userId: true,
      },
      where: {
        userId: user?.id,
      },
    });
     const liked = Array.from(likes, (like)=>{
      return like.userId
    })
    
    
    
    return NextResponse.json({ liked }, { status: 200 });
  }