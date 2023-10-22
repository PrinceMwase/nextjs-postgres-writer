import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

export default function ActionButton({
  children,
  ...args
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className="ease-in-out h-min my-auto duration-300 transition-all  px-6 font-semibold border-none rounded-none bg-white text-black active:bg-gray-400 disabled:text-gray-400"
      type="button"
      {...args}
    >
      {children}
    </button>
  );
}
