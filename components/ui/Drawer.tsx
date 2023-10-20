import InfoIcon from "@/components/svg/InfoIcon";
import Link from "next/link";
import SignOutDrawer from "./SignOutDrawer";
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
          <li className="border-b cursor-pointer hover:bg-slate-100 transition-all">
            <div className="p-4 flex space-x-2 items-center">
              <InfoIcon />{" "}
              <span className="font-semibold text-lg">Following</span>
            </div>
          </li>
          <li className="border-b cursor-pointer hover:bg-slate-100 transition-all">
            <div className="p-4 flex space-x-2 items-center">
              <InfoIcon /> <span className="font-semibold text-lg">Muted</span>
            </div>
          </li>
          <li className="border-b cursor-pointer hover:bg-slate-100 transition-all">
            <div className="p-4 flex space-x-2 items-center">
              <InfoIcon />{" "}
              <span className="font-semibold text-lg">Notifications</span>
            </div>
          </li>
          <li className="border-b cursor-pointer hover:bg-slate-100 transition-all">
            <div className="p-4 flex space-x-2 items-center">
              <InfoIcon />{" "}
              <span className="font-semibold text-lg">Settings & Privacy</span>
            </div>
          </li>
          <li className="border-b cursor-pointer hover:bg-slate-100 transition-all">
            <Link href="/about">
              <div className="p-4 flex space-x-2 items-center">
                <InfoIcon />{" "}
                <span className="font-semibold text-lg">About</span>
              </div>
            </Link>
          </li>
          <li className="border-b cursor-pointer hover:bg-slate-100 transition-all">
          <SignOutDrawer/>
          </li>
        </ul>
      </div>
    </div>
  );
}
