import NextAuth, { type NextAuthOptions } from "next-auth"
import { config } from "@/lib/auth";

export const authOptions: NextAuthOptions = {
  providers: config.providers,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

