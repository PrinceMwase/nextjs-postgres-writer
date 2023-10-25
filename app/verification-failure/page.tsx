import Link from "next/link";

export default function VerificationFailure() {
  return (
    <div className="py-10 px-4 h-screen w-full flex  bg-black">
      <div className="m-auto flex space-x-2">
        <span className="text-stone-400">Verification Token mismatch 🥺 Try Again</span>
      </div>
    </div>
  );
}
