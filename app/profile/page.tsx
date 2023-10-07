"use client";
import Image from "next/image";

import Details from "@/components/writer/writerDetail";
import Featured from "@/components/writer/featured";
import Categories from "@/components/writer/categories";

export default function Profile() {
  return (
    <div className="flex flex-row m-20 h-screen">
      <div className="basis-1/4 ">
        <Details />
      </div>

      <div className="basis-3/4   ">
        <Featured />

        {/* categories */}
        <Categories/>

      </div>
    </div>
  );
}
