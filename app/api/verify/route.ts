import { NextResponse } from "next/server";
import { authorize } from "../poem/infinite/route";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let token = searchParams.get("token") ?? "";

  const email = await authorize();
  if (!email) {
    return NextResponse.json("Not authorized", { status: 401 });
  }
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
    select: {
      verificationToken: true,
    },
  });

  // Compare the token with the stored token in the database
  if (token === user.verificationToken) {
    // Mark the user as verified in the database
    // Redirect the user to a success page
    return NextResponse.json({ success: "verified" }, { status: 200 });
  } else {
    // Handle invalid or expired tokens
    return NextResponse.json({ error: "failed to verify" }, { status: 401 });
  }
}
