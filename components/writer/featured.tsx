"use client";

import chunkArray from "@/lib/chuckArray";
import Link from "next/link";
import { ProfilePoemType } from "types/profile";

export default function Featured({ poems }: { poems: ProfilePoemType[] }) {
  const chunkSize = 2; // Number of poems in each column

  const columns = chunkArray(poems, chunkSize);
  
  return (
    <div className="flex flex-col lg:flex-row">
      {columns.map((column, columnIndex) => (
        <div className="basis-1/3 p-4" key={columnIndex}>
          {column.map((poem, poemIndex) => (
            <div key={poemIndex}>
              <h1 className="text-lg text-left">
                <Link
                  className="no-underline hover:underline font-bold tracking-wider py-4 block"
                  style={{ color: "black" }}
                  href={`/poem/${columnIndex * chunkSize + poemIndex + 1}`}
                >
                  {poem.title}
                </Link>
              </h1>
              <div className="description">{poem.description}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
