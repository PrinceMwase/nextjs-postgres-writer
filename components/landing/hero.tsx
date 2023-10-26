import Link from "next/link";
import NavBar from "../navigation/navbar";

export default function Hero() {
  return (
    <div className="w-full h-full min-h-screen flex flex-row py-8 bg-[url('/heroBG.png')] bg-no-repeat bg-cover">
      <div className="lg:basis-1/2 md:basis-1/3 "></div>

      <div className="lg:basis-1/2 md:basis-2/3">
        <div className="flex flex-col">
          <NavBar page="home" />

          <div className="font-maglite py-10">
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

          <div className="my-10">
            <div className="px-2 text-white font-medium">
              <div>You've written a poem, now is the time to let it</div>
              <div>be heard to the world and unheard voice to be read!</div>
            </div>
          </div>
          <div>
            <div className="px-2">
              <Link href={"/login"} className="text-black text-lg font-bold bg-button-color rounded-full px-4 py-2 uppercase">
                get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
