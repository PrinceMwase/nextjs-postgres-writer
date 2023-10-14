import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    
    CredentialsProvider({
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          const { email, password } = credentials ?? {}
          if (!email || !password) {
            throw new Error("Missing username or password");
          }
          const user = await prisma.user.findUnique({
            select:{
              id: true,
              email:true,
              password: true,
              writer:{
                select:{
                  id: true,
                  username: true
                }
              }
            },
            where: {
              email,
            },
          });
          // if user doesn't exist or password doesn't match
          if (!user || !(await compare(password, user.password))) {
            throw new Error("Invalid username or password");
          }
          return user;
        },
      }),

  ], // rest of your config
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, config)
}