"use client";

import Image from "next/image";

export default function Categories() {
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
          <span>Popular Categories</span>
        </p>
      </div>

      <div className="flex py-2">
        <div className="m-auto flex space-x-10">
          
          {/* romantic */}
          <div>
            <span className="">
              <Image
                src="/haiku.jpeg"
                width={50}
                height={50}
                alt="Picture of the author"
                className="rounded-full m-auto"
              />
              <span className="m-auto">HAIKU</span>
            </span>
          </div>
          {/* End love */}
          
          {/* limerick */}
          <div>
            <span className="">
              <Image
                src="/limerick.jpeg"
                width={50}
                height={50}
                alt="Picture of the author"
                className="rounded-full m-auto"
              />
              <span className="m-auto">Limerick</span>
            </span>
          </div>
          {/* End limerick */}
          
          {/* ekphrastic */}
          <div>
            <span className="">
              <Image
                src="/ekphrastic.jpeg"
                width={50}
                height={50}
                alt="Picture of the author"
                className="rounded-full m-auto"
              />
              <span className="m-auto">Ekphrastic</span>
            </span>
          </div>
          {/* End love */}
          
          {/* sonnet */}
          <div>
            <span className="">
              <Image
                src="/sonnet.jpeg"
                width={50}
                height={50}
                alt="Picture of the author"
                className="rounded-full m-auto"
              />
              <span className="m-auto">Sonnet</span>
            </span>
          </div>
          {/* End love */}
          
          {/* blason */}
          <div>
            <span className="">
              <Image
                src="/blason.jpeg"
                width={50}
                height={50}
                alt="Picture of the author"
                className="rounded-full m-auto"
              />
              <span className="m-auto">Blason</span>
            </span>
          </div>
          {/* End love */}

          
        </div>
      </div>
    </>
  );
}
