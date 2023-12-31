// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/ui/navbar";
import Drawer from "@/components/ui/Drawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


const title = "Poet's Haven";
const description =
  "This is an inclusive place for anyone who wants to jot down a poem";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://yktvibe.ccom"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} max-h-max antialiased`}>
        <Toaster />
        <Navbar />
        {/* Drawer */}
        {children}
        <Drawer/>
      </body>
    </html>
  );
}
