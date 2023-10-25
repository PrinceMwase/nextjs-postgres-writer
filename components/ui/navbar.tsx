"use client";
import HouseIcon from "../svg/HouseIcon";
import Link from "next/link";
import LargeScreenMenu from "./LargeScreenMenu";
import SmallScreenMenu from "./SmallSceenMenu";
import ProfileIcon from "../svg/ProfileIcon";
import CategoriesIcon from "../svg/CategoriesIcon";
import SearchIcon from "../svg/SearchIcon";
import HamBurgerIcon from "../svg/HamBurgerIcon";
import { useEffect } from "react";

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
  useEffect(() => {
    // Add event listener to close drawer
    const closeDrawerButton = document.getElementById("close-drawer-button");
    closeDrawerButton?.addEventListener("click", () => {
      const drawer = document.getElementById("drawer");
      drawer?.classList.remove("translate-x-0");
    });
  }, []);

  return (
    <nav className="backdrop-blur-md border-b border-slate-900/10 bg-white/30 py-4 sticky top-0 w-full">
      <div className="flex justify-between px-4 w-full">
        <div className="text-gray-950 text-xl font-semibold">
          <Link
            href="/"
            className="text-gray-950 flex hover:text-gray-800 space-x-2"
          >
            <HouseIcon />
            <span className="hidden md:inline text-xl font-medium">Home</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4 md:space-x-8">
          <LargeScreenMenu />

          <SmallScreenMenu />

          <form action="">
            <div className="flex border rounded-full border-gray-950 px-2 items-center">
              <SearchIcon />
              <input
                type="text"
                placeholder="search"
                className="focus-visible:outline-none bg-transparent px-2 focus-visible:border-none w-40 rounded-full"
              />
            </div>
          </form>

          <button
            className="text-gray-950 focus:outline-none"
            id="open-drawer-button"
            onClick={() => {
              const drawer = document.getElementById("drawer");

              drawer?.classList.contains("translate-x-0")
                ? drawer?.classList.remove("translate-x-0")
                : drawer?.classList.add("translate-x-0");
            }}
          >
            <HamBurgerIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
