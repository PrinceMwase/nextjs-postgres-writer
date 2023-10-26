import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request){
    const { searchParams } = new URL(req.url);
    let token = searchParams.get("token")

    if (!token) {
      return NextResponse.error();
    }

    const user = await prisma.user.update({
      where: {
        verificationToken: token,
      },
      data: {
        emailVerified: true,
      },
      select:{
        verificationToken: true
      }
    });

    // Compare the token with the stored token in the database
    if (token === user.verificationToken) {
      // Mark the user as verified in the database
      // Redirect the user to a success page
      return NextResponse.json({success:"verified"}, {status:200});
    } else {
      // Handle invalid or expired tokens
      return NextResponse.error()
    }
}