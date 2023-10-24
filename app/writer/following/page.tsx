"use client";

import Infinite from "@/components/poem/infinite";
export default function Writer() {
  return (
    <div className="h-max">
      <Infinite writersId={true}></Infinite>
    </div>
  );
}
