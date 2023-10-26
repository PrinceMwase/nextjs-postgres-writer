import Link from "next/link";
import NavBar from "../navigation/navbar";

export default function About() {
  return (
    <div className="w-full h-full min-h-screen flex bg-fixed flex-row bg-[url('/male.jpeg')] bg-no-repeat bg-cover">
      <div className="lg:basis-1/2 md:basis-1/3 ">
        <div></div>
      </div>

      <div className="lg:basis-1/2 md:basis-2/3 ">
        <div className="flex flex-col">

          <div className="py-10 space-y-8 bg-white bg-[url('/note.jpeg')] bg-no-repeat bg-cover">
            

            <div className="px-2 font-medium">
              <div className="text-justify text-heading-color text-lg w-4/5">
                Our poetic journey began with a simple truth: poetry is the
                language of the soul. Each poem is a portal to another world, a
                melody that resonates with the core of human experience. As
                curators of this enchanting art, we set out to create a
                sanctuary where poets and poetry enthusiasts alike can immerse
                themselves in the symphony of language.
              </div>
            </div>
            <div className="px-2 text-heading-color font-medium">
              <div>A Poet&apos;s haven</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
