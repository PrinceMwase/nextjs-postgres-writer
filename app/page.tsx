"use client";
import Create from "@/components/poem/create";
import Infinite from "@/components/poem/infinite";
export default function Home() {
  return (
    <div className="h-screen">
      <Create />
      <Infinite />
    </div>
  );
}
