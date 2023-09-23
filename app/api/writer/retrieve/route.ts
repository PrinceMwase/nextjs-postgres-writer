import SlugID from '../../../../lib/slug_id'
import prisma from "../../../../lib/prisma";
import { NextResponse } from 'next/server';


export async function GET(req: Request){
    let {stringified} = SlugID(req.url)


    const  writer = await prisma.writer.findUniqueOrThrow({
        where:{
            username: stringified
        },
        select:{
            username: true,
            Poem: true
        }
    })

    return NextResponse.json(writer, {status:200})
}