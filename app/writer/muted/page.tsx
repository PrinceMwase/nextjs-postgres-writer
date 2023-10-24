"use client";

import Infinite from "@/components/poem/infinite";
export default function Writer() {
  return (
    <div className="h-max">
      <Infinite notWritersId={true}></Infinite>
    </div>
  );
}
