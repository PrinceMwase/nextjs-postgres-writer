"use client";
import { signOut } from "next-auth/react";
import InfoIcon from "../svg/InfoIcon";

export default function SignOutDrawer() {
  
  return (
    <button onClick={() => signOut()}>
      <div className="p-4 flex space-x-2 items-center">
        <InfoIcon /> <span className="font-semibold text-lg">Sign Out</span>
      </div>
    </button>
  );
}
