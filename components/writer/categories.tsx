"use client";

import Image from "next/image";
import { ProfilePoemType } from "types/profile";

export default function Categories({ poems }: { poems: ProfilePoemType[] }) {
  const uniqueCategoriesSet = new Set<string>();

  const categories = poems
    .map((poem) => poem.genre)
    .filter(
      (genre): genre is { genre: string; photo: { link: string } } =>
        genre !== null &&
        !uniqueCategoriesSet.has(genre.genre) &&
        uniqueCategoriesSet.add(genre.genre)
    );
  return (
    <>
      <div className="flex py-2">
        <p className="m-auto font-semibold text-xl uppercase flex-row flex space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
            />
          </svg>
          <span>Recent Categories</span>
        </p>
      </div>

      <div className="flex py-2">
        <div className="m-auto flex space-x-10">
          {categories.map((category, index) => (
            <div key={index}>
              <span className="">
                <Image
                  src={category.photo.link}
                  width={100}
                  height={100}
                  alt={`Picture of ${category.genre}`}
                  className="rounded-full m-auto"
                />
                <div className="m-auto w-full text-center text-ellipsis capitalize font-semibold">{category.genre}</div>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
