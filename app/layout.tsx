'use client'
// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense, useContext, useState } from "react";
import { payload, payload as payloadType } from "@/components/poem/view";
import PoemContext from "@/lib/poems_context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Next.js Prisma Postgres Auth Starter";
const description =
  "This is a Next.js starter kit that uses Next-Auth for simple email + password login and a Postgres database to persist the data.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  themeColor: "#FFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {

  const [currentPoem, setCurrentPoem] = useState<payload | null>(null);
  const [allPoems, setAllPoems] = useState<payload[] | null>(null);
  const [hasMore, setHasMore] = useState<boolean >(true);

  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster />
        <PoemContext.Provider value={{currentPoem, allPoems, hasMore,setCurrentPoem, setAllPoems, setHasMore}} >

        {children}
        </PoemContext.Provider>
      </body>
    </html>
  );
}
