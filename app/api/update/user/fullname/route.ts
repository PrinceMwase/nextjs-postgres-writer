import { NextResponse } from "next/server";
import prisma from "lib/prisma";
import { auth } from "lib/auth";

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

  const { currentFullName } = await req.json();

  const currentFullNameTrimmed: string = currentFullName.trim();

  if (currentFullNameTrimmed.length === 0) {
    return NextResponse.json({ error: "Invalid Name" }, { status: 400 });
  }

  const splitFullName: string[] = currentFullNameTrimmed
    .split(" ")
    .filter((v: string) => {
      return v.length > 0;
    });

  const firstname = splitFullName[0];

  const lastname = splitFullName
    .filter((v, i) => {
      return i > 0;
    })
    .join(" ");

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      firstname,
      lastname,
    },
  });
  const newFullName = `${firstname} ${lastname}`;

  return NextResponse.json({ newFullName }, { status: 200 });
}
