"use client";

import Infinite from "@/components/poem/infinite";
export default function genre({ params }: { params: { slug: string } }) {
  return (
    <div className="h-max">
      <Infinite genreId={ params.slug }></Infinite>
    </div>
  );
}
