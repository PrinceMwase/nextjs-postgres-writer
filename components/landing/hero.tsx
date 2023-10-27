import Link from "next/link";
import Image from "next/image";
import { myFont } from "../ui/navbar";

export default function Hero() {
  return (
    <div className="w-full h-full min-h-screen bg-fixed flex flex-row py-8 bg-[url('/heroBG.jpeg')] bg-no-repeat bg-cover">
      <div className="lg:basis-1/2 md:basis-1/3 ">

        <div className="">
        <Image
          src="/logo.png"
          width={400}
          height={400}
          alt="Picture of the author"
          className="rounded-full m-auto"
        />
      </div>
      </div>

      <div className="lg:basis-1/2 md:basis-2/3">
        <div className="flex flex-col">
          <div className={`${myFont.className} py-8`}>
            <div className="px-2">
              <span className="text-8xl font-semibold text-left text-heading-color">
                Poet&apos;s
              </span>
            </div>
            <div className="px-2">
              <span className="text-6xl font-medium text-heading-color">
                Haven
              </span>
            </div>
          </div>

          <div className="my-4">
            <div className="px-2 text-white leading-loose text-2xl font-light">
              <div>
                {" "}
                creative space for writers to share their poems and connect with
                readers from around the world. 
              </div>
            </div>
          </div>
          <div>
            <div className="px-2">
              <Link
                href={"/login"}
                className="text-black hover:text-heading-color text-lg font-bold bg-button-color hover:bg-white rounded-full px-4 py-2 uppercase ease-in-out my-auto w-12 duration-300 transition-all"
              >
                get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
