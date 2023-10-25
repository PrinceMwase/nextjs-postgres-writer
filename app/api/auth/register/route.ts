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
    const verificationLink = `https://${process.env.DOMAIN}/verify?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Email Verification',
      html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
    };
    const info = await mailTransporter(mailOptions).catch(console.error);
    console.log("Message sent: %s", info.messageId);


    const user = await prisma.user.create({
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
    return NextResponse.json(user);
  }
}
