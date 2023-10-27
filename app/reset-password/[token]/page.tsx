"use client"
import ActionButton from "@/components/settings/ActionButton";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import mailTransporter from "@/lib/mailTransporter";
import { redirect, useRouter } from "next/navigation";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import create from "./create";
import LoadingDots from "@/components/loading-dots";

export default function Page({ params }: { params: { token: string }}) {

  const [verification, setVerification] = useState(true)
  const [loading, setLoading] = useState(false);

  const router = useRouter()
    
 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL("api/user/verify-reset", window.location.origin);

      url.search = new URLSearchParams(params).toString();

      fetch(url)
        .then((response) => {
          if (response.status === 200) {
            setVerification(false)
          }else{
            toast.error("token expired")
            router.push("/forgot-password")
          }
        })
        .catch((error) => {
          router.push("/forgot-password");
        });
    }
  }, [params, router]);


  if(verification){
    return <div>
      Verifying token....
    </div>
  }
  

  return (
    <div className="px-4 ">
      <form action={create} className="h-screen w-full flex">
        <div className="m-auto space-y-4">
          <label htmlFor="password" className="block text-xs">
            <div className="text-lg font-semibold capitalize flex space-x-2 items-center">
              <span>
                Reset Your Password, you will need be able to do this again for 24hrs
              </span>
            </div>
          </label>
          <div className="flex space-x-2">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Your new password"
              autoComplete="password"
              className={`mt-1 grow appearance-none border-b border-gray-300
             placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm`}
            />
            <input
              id="token"
              name="token"
              type="text"
              hidden
              value={params.token}
              readOnly
               />
            <ActionButton type="submit"
            onClick={() => {
              setLoading(true);
            }}
            >
            {loading ? <LoadingDots color="#808080" /> : <span>Reset</span>}
            </ActionButton>
          </div>
        </div>
      </form>
    </div>
  );
}
