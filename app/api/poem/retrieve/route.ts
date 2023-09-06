import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
type LineProperty = {
    line: string;
    align: "left" | "right" | "center";
    color: string;
  };
  
type payload = {
    background: "light" | "dark";
    lines: LineProperty[];
    title: string;
  };

export async function GET(re: Request){

    let retrievedPayload: payload[] = [];

    const results = await prisma.poem.findMany();

    if(results){
        results.forEach((value)=>{
          let plainContent = value.content?.toString() === undefined ? '' : value.content?.toString()

          let content:LineProperty[] = JSON.parse(plainContent);

            retrievedPayload.push({
                title: value.title,
                background: value.background == "dark" || value.background == "light"  ? value.background : "light",
                lines: content
            })
        })
        
        return NextResponse.json(retrievedPayload, {status:200})
    }else{
      console.log(results)
      return NextResponse.json({ error: "Failed to retrieve" }, { status: 400 });
    }




}