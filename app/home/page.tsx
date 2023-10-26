"use client";
import About from "@/components/about/about";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
export default function Home() {
  return (
    <div className="h-max">
      <Hero/>
      <About/>
      <Features/>
    </div>
  );
}
