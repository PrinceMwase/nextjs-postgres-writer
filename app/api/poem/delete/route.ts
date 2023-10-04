import { getServerSession } from "next-auth/next";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export type deletePoemType = {
    poemId: number
}

export async function POST(req: Request){
    const payload: deletePoemType = await req.json();
    const session = await getServerSession();

    const writer = await prisma.writer.findFirstOrThrow({
       where:{
        userId: session?.user?.id
       },
       select:{
        Poem:{
            select:{
                id:true
            },
            where:{
                id:payload.poemId
            }
        }
       }
    })
    

   const results =  await prisma.poem.delete({
        where:{
            id: writer.Poem[0].id,
        }
    })

    if (results) {
        return NextResponse.json(results, { status: 200 });
      } else {
        return NextResponse.json(
          { success: "Failed to Delete" },
          { status: 400 }
        );
      }
    

}