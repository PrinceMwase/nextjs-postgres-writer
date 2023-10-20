// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/ui/navbar";
import InfoIcon from "@/components/svg/InfoIcon";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster />
        <Navbar />
        {/* Drawer */}
        <div className="main-content">

        {children}
        </div>
        <div
          id="drawer"
          className="fixed inset-y-0 left-0 w-64 bg-white border-r  text-gray-950 p-4 transform transition-transform ease-in-out duration-300 -translate-x-full"
        >
          {/* Drawer Content */}
          {/* Add your drawer content here */}
          <button
            id="close-drawer-button"
            className="bg-red-500 text-white p-2 rounded"
          >
            Close Drawer
          </button>

          <div className="py-10">
            <ul className="space-y-8">
              <li>
                <div className="flex space-x-2 items-center">
                  <InfoIcon />{" "}
                  <span className="font-semibold text-lg">Following</span>
                </div>
              </li>
              <li>
                <div className="flex space-x-2 items-center">
                  <InfoIcon />{" "}
                  <span className="font-semibold text-lg">Muted</span>
                </div>
              </li>
              <li>
                <div className="flex space-x-2 items-center">
                  <InfoIcon />{" "}
                  <span className="font-semibold text-lg">Notifications</span>
                </div>
              </li>
              <li>
                <div className="flex space-x-2 items-center">
                  <InfoIcon />{" "}
                  <span className="font-semibold text-lg">Settings & Privacy</span>
                </div>
              </li>
              <li>
                <div className="flex space-x-2 items-center">
                  <InfoIcon />{" "}
                  <span className="font-semibold text-lg">About</span>
                </div>
              </li>
              <li>
                <div className="flex space-x-2 items-center">
                  <InfoIcon />{" "}
                  <span className="font-semibold text-lg">Sign Out</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
}
