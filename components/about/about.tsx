import Link from "next/link";
import NavBar from "../navigation/navbar";

export default function About() {
  return (
    <div className="w-full h-full min-h-screen flex flex-row py-8 bg-[url('/aboutBG.png')] bg-no-repeat bg-cover">
      <div className="lg:basis-1/2 md:basis-1/3 ">
        <div></div>
      </div>

      <div className="lg:basis-1/2 md:basis-2/3 ">
        <div className="flex flex-col">
          <NavBar page="about"/>

          <div className="py-20 space-y-8">
            <div className="px-2 ">
              <span className="text-4xl md:text-6xl sm:text-6xl lg:text-8xl font-semibold text-left text-heading-color font-maglite">
                <span className="border-b-2">Ab</span>out Us
              </span>
            </div>

            <div className="px-2 text-white font-medium">
              <div className="text-justify w-4/5">
                Our poetic journey began with a simple truth: poetry is the
                language of the soul. Each poem is a portal to another world, a
                melody that resonates with the core of human experience. As
                curators of this enchanting art, we set out to create a
                sanctuary where poets and poetry enthusiasts alike can immerse
                themselves in the symphony of language.
              </div>
            </div>
            <div className="px-2 text-white font-medium">
              <div>A poet's haven</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
