import Link from "next/link";

export default function Page() {
  return (
    <div className="py-10 px-4 h-screen w-full flex  bg-black">
      <div className="m-auto flex space-x-2">
        <span className="text-stone-400">Password has been reset</span>
        <Link href="/login" className="text-stone-400 border px-4 hover:text-stone-200 transition-all">
          Sign In!
        </Link>
      </div>
    </div>
  );
}
