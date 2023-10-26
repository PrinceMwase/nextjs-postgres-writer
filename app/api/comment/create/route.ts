import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authorize } from "../../poem/infinite/route";

type requestData = {
    comment: string;
    poemId: number;
}

export async function POST(req: Request){
    const comment: requestData = await req.json();
    const email = await authorize();
    if (!email) {
      return NextResponse.json(
        {
          error: "not authenticated",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUniqueOrThrow({
        select: {
          writer: {
            select: {
              id: true,
            },
          },
        },
        where: {
          email,
        },
      });
      if (user.writer.length !== undefined && user.writer.length > 0) {

        const results = await prisma.comment.create({
          data: {
              content: comment.comment,
              writerId:  user.writer[0].id ,
              poemId: comment.poemId
          }
        })

        if (results) {
          return NextResponse.json({ success: "commented" }, { status: 200 });
        } else {
          return NextResponse.json(
            { success: "Failed to Comment" },
            { status: 400 }
          );
        }
      }


}