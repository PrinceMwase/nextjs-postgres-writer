"use client"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

export default function ActionButton({
  children,
  ...args
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  const { pending } = useFormStatus()

  return (
    <button
      className="ease-in-out my-auto w-12 duration-300 transition-all font-semibold border-none rounded-none bg-white text-black active:bg-gray-400 disabled:text-gray-400"
      
      {...args}
      aria-disabled={pending}
    >
      {children}
    </button>
  );
}
