"use client";

import UserDetailsForm from "@/components/settings/UserDetailsForm";
import { MouseEventHandler, useState } from "react";

const SettingsList = function allTheSettingsOptions({
  trigger,
}: {
  trigger: MouseEventHandler<HTMLLIElement> | undefined;
}) {
  return (
    <ul className="">
      <li
        className="border-b cursor-pointer hover:bg-slate-100"
        onClick={trigger}
      >
        <div className="p-4 flex justify-between items-center">
          <div>
            <span className="font-semibold text-lg text-left">
              User Details
            </span>
            <div className="text-sm">
              Update Firstname, Lastname, Password, About
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </li>
    </ul>
  );
};

export default function Settings() {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="py-8  w-full">
      <div className={`px-4 ${clicked ? "hidden" : ""}`}>
        <SettingsList
          trigger={() => {
            setClicked(true);
          }}
        />
      </div>
      <UserDetailsForm show={clicked} />
    </div>
  );
}
