import { LineProperty, payload } from "../../../../types/poem";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(re: Request){

    let retrievedPayload: payload[] = [];

    const results = await prisma.poem.findMany({
      select:{
        id: true,
        content: true,
        title: true,
        background: true,
        createdAt: true,
        writer:{
          select: {
            id:  true,
            username: true
          }
        },
        _count:{
          select:{
            comments:true
          }
        }
      }
    });

    if(results){
        results.forEach((value)=>{
          let plainContent = value.content?.toString() === undefined ? '' : value.content?.toString()

          let content:LineProperty[] = JSON.parse(plainContent);

            retrievedPayload.push({
                id: value.id,
                title: value.title,
                background: value.background == "dark" || value.background == "light"  ? value.background : "light",
                lines: content,
                date: value.createdAt,
                writer: {
                  id: value.writer.id,
                  name:value.writer.username,
                },
                _count:value._count
            })
        })
        
        return NextResponse.json(retrievedPayload, {status:200})
    }else{
      console.log(results)
      return NextResponse.json({ error: "Failed to retrieve" }, { status: 400 });
    }




}