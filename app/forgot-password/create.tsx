"use server"

import { generateVerificationToken } from "@/lib/generateVerificationToken";
import mailTransporter from "@/lib/mailTransporter";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";


export default async function create(formData: FormData) {
    "use server";
    const email = formData.get("email")?.toString();
    const today = new Date();

    // Create a new date object by adding 1 day to today's date
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const resetToken = generateVerificationToken();

    const user = await prisma.user
      .update({
        where: {
          email,
        },
        data: {
          resetToken,
          resetTokenExpiry: tomorrow,
        },
      })
      .catch(() => {
        redirect("/no-user");
      });

    const resetLink = `${process.env.DOMAIN}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Reset Password",
      html: `Click <a href="${resetLink}">${resetLink}</a> to Reset your Password.`,
    };
    const info = await mailTransporter(mailOptions).catch((e) => {
      console.log(e);

      redirect("/forgot-password");
    });
    console.log("Message sent: %s", info.messageId);

    redirect("/sent-reset-password");
  }