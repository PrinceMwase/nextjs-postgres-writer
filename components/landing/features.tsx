import Link from "next/link";
import NavBar from "../navigation/navbar";

export default function Features() {
  return (
    <div className="w-full h-full min-h-max bg-fixed bg-[url('/female.jpeg')] bg-no-repeat bg-cover">
      <div className="space-y-16">
        <div className="relative -top-11 p-8 text-lg w-3/4 bg-white md:w-1/2 text-heading-color font-medium">
          <div>
            A platform designed and developed with love for poetry enthusiasts
          </div>
        </div>
        <div></div>

        <div className="p-8 text-lg w-3/4   bg-white md:w-1/2 text-heading-color font-medium">
          <div>
            {" "}
            Our app fosters a supportive community where users can explore the
            depths of poetic expression
          </div>
        </div>
      </div>
      <div className="my-10 space-y-20 w-full">
        <div className="p-8 text-lg w-3/4 bg-white md:w-1/2 text-heading-color font-medium">
          <div>
            We do not collect any personal or sensitive information from our
            users. Your privacy is paramount, and we do not store any data
            related to your identity, location, or browsing habits.
          </div>
        </div>
        <div></div>

        <div className="p-8 bg-white bottom-0  text-heading-color space-y-4 font-medium">
          <div className="flex space-x-4">
            
            <Link href={"https://twitter.com/yknowthevibe"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-twitter"
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </Link>
          </div>
          <div>
          &copy;2023 UIHEXED | Prince Mwase
          </div>
        </div>
      </div>
    </div>
  );
}
