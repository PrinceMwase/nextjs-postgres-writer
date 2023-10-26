"use client"
import ActionButton from "@/components/settings/ActionButton";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import mailTransporter from "@/lib/mailTransporter";
import { redirect } from "next/navigation";
import LoadingDots from "@/components/loading-dots";
import create from "./create";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
 

  return (
    <div className="px-4 ">
      <form action={create} className="h-screen w-full flex">
        <div className="m-auto space-y-4">
          <label htmlFor="email" className="block text-xs">
            <div className="text-lg font-semibold capitalize flex space-x-2 items-center">
              <span>
                Enter Your Email address to send a password reset token
              </span>
            </div>
          </label>
          <div className="flex space-x-2">
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Enter Your Email"
              autoComplete="email"
              className={`mt-1 grow appearance-none border-b border-gray-300
             placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm`}
            />
            <ActionButton
              disabled={loading}
              type="submit"
              onClick={() => {
                setLoading(true);
              }}
            >
              {loading ? <LoadingDots color="#808080" /> : <span>send</span>}
            </ActionButton>
          </div>
        </div>
      </form>
    </div>
  );
}
