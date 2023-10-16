import Link from "next/link";
import HamBurgerIcon from "../svg/HamBurgerIcon";
import { links } from "./navbar";

export default function SmallScreenMenu() {
  return (
    <div className="md:hidden flex items-center space-x-4">
      {links.map((link, index) => {
        return (
          <Link
            href={link.link}
            key={index}
            className="text-gray-800 hover:text-gray-950 space-x-2 flex "
          >
            <link.Icon />
          </Link>
        );
      })}

      <form action="">
        <input
          type="text"
          placeholder="search"
          className="ring-1 focus-visible:outline-none px-2 focus-visible:border-none ring-gray-800 rounded-full"
        />
      </form>
      <button className="text-gray-800 focus:outline-none">
        <HamBurgerIcon />
      </button>
    </div>
  );
}
