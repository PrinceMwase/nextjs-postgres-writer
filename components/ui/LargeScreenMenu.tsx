import Link from "next/link";
import HamBurgerIcon from "../svg/HamBurgerIcon";
import { links } from "./navbar";
export default function LargeScreenMenu() {
  return (
    <>
      {links.map((link, index) => {
        return (
          <Link
            href={link.link}
            key={index}
            className="hidden md:flex text-gray-950 hover:text-gray-800 space-x-2 "
          >
            <link.Icon />
            <span className="text-xl font-medium">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
