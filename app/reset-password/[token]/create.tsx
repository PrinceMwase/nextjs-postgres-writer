"use server";

import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";


export default async function create(formData: FormData) {
    const password = formData.get("password")?.toString();
    const token = formData.get("token")?.toString();
    
    if(!password || !token){
        return
    }
    
    const user = await prisma.user
    .update({
        where: {
            resetToken: token,
    },
    data: {
      password: await hash(password, 10),
    },
  })
  .catch(() => {
    redirect("/no-user");
  });

redirect("/password-successfully-reset");
}