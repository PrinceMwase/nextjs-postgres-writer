"use client";
import Create from "@/components/poem/create";
import Infinite from "@/components/poem/infinite";
import {SessionProvider } from "next-auth/react";


export default function Home() {

  return (
    <>
      <SessionProvider>
        <Infinite>
          <Create />
        </Infinite>
      </SessionProvider>
    </>
  );
}
