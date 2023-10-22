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
      <div className={`mb-4 w-max mx-4 cursor-pointer ${clicked ? "" : "hidden"}`} onClick={()=>{
        setClicked(false)
      }}>
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
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </div>
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
