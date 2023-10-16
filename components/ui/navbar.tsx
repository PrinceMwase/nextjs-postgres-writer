import HouseIcon from "../svg/HouseIcon";
import Link from "next/link";
import LargeScreenMenu from "./LargeScreenMenu";
import SmallScreenMenu from "./SmallSceenMenu";
import ProfileIcon from "../svg/ProfileIcon";
import CategoriesIcon from "../svg/CategoriesIcon";

export type navLink = {
  link: string;
  Icon: () => JSX.Element;
  name: string;
};

export const links: navLink[] = [
  { link: "/profile", Icon: ProfileIcon, name: "Profile" },
  { link: "/genres", Icon: CategoriesIcon, name: "Genres" },
];

const Navbar = () => {
  
  return (
    <nav className="backdrop-blur-sm border-b border-slate-900/10 bg-white/30 p-4 sticky top-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-800 text-xl font-semibold">
          <Link
            href="/"
            className="text-gray-800 flex hover:text-gray-950 space-x-2"
          >
            <HouseIcon />
            <span className="text-xl font-medium">Home</span>
          </Link>
        </div>
        <LargeScreenMenu />

        <SmallScreenMenu />
      </div>
    </nav>
  );
};

export default Navbar;
