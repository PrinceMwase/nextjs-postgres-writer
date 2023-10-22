import { NextResponse } from "next/server";
import prisma from "lib/prisma";
import { auth } from "lib/auth";
import { hash } from "bcrypt";


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

    let { oldPassword, newPassword }: { oldPassword: string, newPassword: string } = await req.json();

    const user = await prisma.user.findUniqueOrThrow({
        where:{
            email
        },
        select:{
            password: true
        }
    })

    const oldHashed = await hash(oldPassword, 10)

    if(oldHashed !== user.password){
        return NextResponse.json(
            { error: "Incorrect Password" },
            { status: 401 }
          );
    }

    await prisma.user.update({
        where:{
            email
        },
        data:{
            password: await hash(newPassword, 10)
        }
    })

    return NextResponse.json({success: "Updated Password !"}, {status: 200})

}