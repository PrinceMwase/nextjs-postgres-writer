"use client";
import About from "@/components/about/about";
import Hero from "@/components/landing/hero";
import Create from "@/components/poem/create";
import Infinite from "@/components/poem/infinite";
export default function Home() {
  return (
    <div className="h-max">
      <Hero/>
      {/* <Create />
      <Infinite /> */}
    </div>
  );
}
