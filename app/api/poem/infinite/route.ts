import prisma from "../../../../lib/prisma";

import { NextResponse } from "next/server";
type parameters = {
    skip: number;
    take: number;
}
type LineProperty = {
    line: string;
    align: "left" | "right" | "center";
    color: string;
  };
  
type payload = {
    background: "light" | "dark";
    lines: LineProperty[];
    title: string;
    date: Date;
    writer: string;
  };


export async function POST(req: Request){
    let retrievedPayload: payload[] = [];
    const values: parameters = await req.json()

    const poems = await prisma.poem.findMany({
        skip: values.skip,
        take: values.take, // Adjust the number of posts to load at once
        select:{
            content: true,
            title: true,
            background: true,
            createdAt: true,
            writer:{
              select: {
                username: true
              }
            }
          }
      });

      if(poems){
        poems.forEach((value)=>{
          let plainContent = value.content?.toString() === undefined ? '' : value.content?.toString()

          let content:LineProperty[] = JSON.parse(plainContent);

            retrievedPayload.push({
                title: value.title,
                background: value.background == "dark" || value.background == "light"  ? value.background : "light",
                lines: content,
                date: value.createdAt,
                writer: value.writer.username
            })
        })
        
        return NextResponse.json(retrievedPayload, {status:200})
    }else{
      console.log(poems)
      return NextResponse.json({ error: "Failed to retrieve" }, { status: 400 });
    }
}