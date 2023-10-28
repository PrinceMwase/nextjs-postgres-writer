import prisma from "@/lib/prisma";

import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import mailTransporter from "@/lib/mailTransporter";

export async function POST(req: Request) {
  const { email, password, username } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const verificationToken = generateVerificationToken();
    const verificationLink = `${process.env.DOMAIN}/verify/${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Email Verification',
      html: `Click <a href="${verificationLink}">${verificationLink}</a> to verify your email.`,
    };
    
    await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
        verificationToken,
        writer:{
          create:[
            {
              username:  username
            }
          ]
        }
      },
      include:{
        writer: true
      }
    });
    mailTransporter(mailOptions).catch(console.error);
    return NextResponse.json({success: "success"}, {status: 200});
  }
}
