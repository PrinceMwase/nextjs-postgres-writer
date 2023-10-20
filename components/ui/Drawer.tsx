import InfoIcon from "@/components/svg/InfoIcon";
import Link from "next/link";
import SignOutDrawer from "./SignOutDrawer";
import LikeIcon from "../svg/LikeIcon";
import MuteIcon from "../svg/MuteIcon";
import NotificationIcon from "../svg/NotificationIcon";
import SettingsIcon from "../svg/SettingsIcon";
export default function Drawer() {
  return (
    <div
      id="drawer"
      className="fixed inset-y-0 left-0 w-64 bg-white border-r  text-gray-950 py-4 transform transition-transform ease-in-out duration-300 -translate-x-full"
    >
      <button
        id="close-drawer-button"
        className="bg-red-500 text-white p-2 rounded"
      >
        Close Drawer
      </button>

      <div className="py-10">
        <ul>
          <li className="border-b cursor-pointer hover:bg-slate-100">
            <div className="p-4 flex space-x-2 items-center">
              <LikeIcon/>
              <span className="font-semibold text-lg">Following</span>
            </div>
          </li>
          <li className="border-b cursor-pointer hover:bg-slate-100">
            <div className="p-4 flex space-x-2 items-center">
              <MuteIcon/>
              <span className="font-semibold text-lg">Muted</span>
            </div>
          </li>
          <li className="border-b cursor-pointer hover:bg-slate-100">
            <div className="p-4 flex space-x-2 items-center">
              <NotificationIcon/>
              <span className="font-semibold text-lg">Notifications</span>
            </div>
          </li>
          <li className="border-b cursor-pointer hover:bg-slate-100">
            <Link href="/settings">
              <div className="p-4 flex space-x-2 items-center">
                <SettingsIcon/>
                <span className="font-semibold text-lg">
                  Settings & Privacy
                </span>
              </div>
            </Link>
          </li>
          <li className="border-b cursor-pointer hover:bg-slate-100">
            <Link href="/about">
              <div className="p-4 flex space-x-2 items-center">
                <InfoIcon />{" "}
                <span className="font-semibold text-lg">About Page</span>
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
