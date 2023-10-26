"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";
import LoadingDots from "../loading-dots";
import SignOutIcon from "../svg/SignOutIcon";

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={() => {
        setLoading(true);
        signOut();
      }}
      className="w-full"
      type="button"
    >
      <div className="p-4 flex space-x-2 items-center">
        <SignOutIcon />
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <span className="font-semibold text-lg">Sign Out</span>
        )}
      </div>
    </button>
  );
}
