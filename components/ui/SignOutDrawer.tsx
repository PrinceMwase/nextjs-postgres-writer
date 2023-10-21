"use client";
import { signOut } from "next-auth/react";
import SignOutIcon from "../svg/SignOutIcon";

export default function SignOutButton() {
  return (
    <button onClick={() => signOut()}>
      <div className="p-4 flex space-x-2 items-center">
        <SignOutIcon /> <span className="font-semibold text-lg">Sign Out</span>
      </div>
    </button>
  );
}
