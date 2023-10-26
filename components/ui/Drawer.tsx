import Link from "next/link";
import SignOutDrawer from "./SignOutDrawer";
import LikeIcon from "../svg/LikeIcon";
import MuteIcon from "../svg/MuteIcon";
import NotificationIcon from "../svg/NotificationIcon";
import SettingsIcon from "../svg/SettingsIcon";
import XIcon from "../svg/XIcon";
export default function Drawer() {
  return (
    <div
      id="drawer"
      className="fixed inset-y-0 left-0 w-64 bg-white border-r  text-gray-950 py-4 transform transition-transform ease-in-out duration-300 -translate-x-full"
    >
      <div className="w-full flex justify-between align-baseline">
        <div className="px-4 text-xl">
          <span>Menu</span>
        </div>
        <button id="close-drawer-button" className="px-4">
          <XIcon />
        </button>
      </div>

      <div className="py-10">
        <ul>
          <li className="border-b cursor-pointer hover:bg-slate-100">
            <Link href="/writer/following">
              <div className="p-4 flex space-x-2 items-center">
                <LikeIcon />
                <span className="font-semibold text-lg">Following</span>
              </div>
            </Link>
          </li>
          <li className="border-b cursor-pointer hover:bg-slate-100">
            <Link href="/writer/muted">
              <div className="p-4 flex space-x-2 items-center">
                <MuteIcon />
                <span className="font-semibold text-lg">Muted</span>
              </div>
            </Link>
          </li>
         
          <li className="border-b cursor-pointer hover:bg-slate-100">
            <Link href="/settings">
              <div className="p-4 flex space-x-2 items-center">
                <SettingsIcon />
                <span className="font-semibold text-lg">
                  Settings & Privacy
                </span>
              </div>
            </Link>
          </li>

          <li className="border-b cursor-pointer hover:bg-slate-100">
            <SignOutDrawer />
          </li>
        </ul>
      </div>
    </div>
  );
}
