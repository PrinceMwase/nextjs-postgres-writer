import Link from "next/link";
import HamBurgerIcon from "../svg/HamBurgerIcon";
import { links } from "./navbar";

export default function SmallScreenMenu() {
  return (
    <>
      {links.map((link, index) => {
        return (
          <Link
            href={link.link}
            key={index}
            className="md:hidden text-gray-950 hover:text-gray-800 space-x-2 flex "
          >
            <link.Icon />
          </Link>
        );
      })}
    </>
  );
}
