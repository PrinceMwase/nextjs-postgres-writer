import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const session = await getServerSession();
  
    if(!session){
      return NextResponse.json({ error: 'not authenticated' }, { status: 200 });
    }
    const user = await prisma.user.findUnique({
      select: {
          id:true
      },
      where: {
        email: session?.user?.email,
      },
    });
      
    let likes = await prisma.poemLike.findMany({
      select: {
        poemId: true,
      },
      where: {
        userId: user?.id,
      },
    });
     const myResult = Array.from(likes, (like)=>{
      return like.poemId
    })
    
    
    
    return NextResponse.json({ myResult }, { status: 200 });
  }
  
  export async function POST(req: Request) {
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
  
    const result = await prisma.poemLike.create({
      data: {
        poemId: reqValues.poemId,
        userId: user?.id,
      },
    });
    return NextResponse.json({ result }, { status: 200 });
  }
  
  
  export async function DELETE(req: Request) {
  
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
  
    const result = await prisma.poemLike.delete({
      where: {
        userId_poemId: { userId: user?.id, poemId: reqValues.poemId },
      },
    });
  
    return NextResponse.json({ result }, { status: 200 });
  }
  