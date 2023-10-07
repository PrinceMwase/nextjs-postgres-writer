"use client";

import Link from "next/link";

export default function Featured() {
  return (
    <div className="flex flex-row">
      {/* First Column */}
      <div className="basis-1/3 p-6 ">
        <div>
          <h1 className="text-lg text-left">
            <Link
              className="no-underline hover:underline font-bold tracking-wider py-4 block"
              style={{ color: "black" }}
              href={`/poem/12`}
            >
              THe Verse
            </Link>
          </h1>
          <div className="description">
            When writing this poem, i felt like the happiest alive. i was coming
            from the hospital and...
          </div>
        </div>

        <div>
          <h1 className="text-lg text-left">
            <Link
              className="no-underline hover:underline font-bold tracking-wider py-4 block"
              style={{ color: "black" }}
              href={`/poem/12`}
            >
              THe Verse
            </Link>
          </h1>
          <div className="description">
            I witness two kids fighting over some ball and they were all covered
            in mud and the ball didnt belong to either of them, the owner of the
            ball..
          </div>
        </div>
      </div>

      {/* Second column */}
      <div className="basis-1/3 p-6 ">
        <div>
          <h1 className="text-lg text-left">
            <Link
              className="no-underline hover:underline font-bold tracking-wider py-4 block"
              style={{ color: "black" }}
              href={`/poem/12`}
            >
              THe Verse
            </Link>
          </h1>
          <div className="description">
            First Tuesday of may 2023 was the darkest moment of my life and the
            only thing that was in my mind was death
          </div>
        </div>

        <div>
          <h1 className="text-lg text-left">
            <Link
              className="no-underline hover:underline font-bold tracking-wider py-4 block"
              style={{ color: "black" }}
              href={`/poem/12`}
            >
              THe Verse
            </Link>
          </h1>
          <div className="description">
            im a sucker for lover really, i love for what it breeds so this was
            me taking my part
          </div>
        </div>
      </div>

      {/* Third Column */}
      <div className="basis-1/3 p-6 ">
        <div>
          <h1 className="text-lg text-left">
            <Link
              className="no-underline hover:underline font-bold tracking-wider py-4 block"
              style={{ color: "black" }}
              href={`/poem/12`}
            >
              THe Verse
            </Link>
          </h1>
          <div className="description">
            i can be religious sometimes, well i try to be
          </div>
        </div>

        <div>
          <h1 className="text-lg text-left">
            <Link
              className="no-underline hover:underline font-bold tracking-wider py-4 block"
              style={{ color: "black" }}
              href={`/poem/12`}
            >
              THe Verse
            </Link>
          </h1>
          <div className="description">
            if it wasnt for my nieces i would not have stuck around for this long
          </div>
        </div>
      </div>
    </div>
  );
}
