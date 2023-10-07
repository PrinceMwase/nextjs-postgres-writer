"use client";
import Infinite from "@/components/poem/infinite";
import { useSession, getSession, SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <>
      <SessionProvider>
        <Infinite />
      </SessionProvider>
    </>
  );
}
