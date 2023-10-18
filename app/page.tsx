"use client";
import Infinite from "@/components/poem/infinite";
import { useSession, getSession, SessionProvider } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Add event listener to open drawer
    const openDrawerButton = document.getElementById("open-drawer-button");
    openDrawerButton?.addEventListener("click", () => {
      const drawer = document.getElementById("drawer");
      drawer?.classList.add("translate-x-0");
    });

    // Add event listener to close drawer
    const closeDrawerButton = document.getElementById("close-drawer-button");
    closeDrawerButton?.addEventListener("click", () => {
      const drawer = document.getElementById("drawer");
      drawer?.classList.remove("translate-x-0");
    });
  }, []);

  return (
    <>
      <SessionProvider>
        <Infinite />
      </SessionProvider>
    </>
  );
}
