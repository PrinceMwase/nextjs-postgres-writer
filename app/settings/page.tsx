"use client";

import UserDetailsForm from "@/components/settings/UserDetailsForm";
import { MouseEventHandler, useState } from "react";
import BackIcon from "@/components/svg/BackIcon";

const SettingsList = function allTheSettingsOptions({
  userDetailsTrigger,
}: {
  userDetailsTrigger: MouseEventHandler<HTMLLIElement>;
}) {  
  return (
    <ul className="">
      <li
        className="border-b cursor-pointer hover:bg-slate-100"
        onClick={userDetailsTrigger}
      >
        <div className="p-4 flex justify-between items-center">
          <div>
            <span className="font-semibold text-lg text-left">
              Update User Information
            </span>
            <div className="text-sm">
              Name, Password, About, Tags
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
  const [clickedUserDetailsList, setShowUserDetails] = useState(false);
  return (
    <div className="py-8  w-full">
      <div
        className={`mb-4 w-max mx-4 cursor-pointer ${clickedUserDetailsList ? "" : "hidden"}`}
        onClick={() => {
          setShowUserDetails(false);
        }}
      >
        <BackIcon />
      </div>
      <div className={`px-4 ${clickedUserDetailsList ? "hidden" : ""}`}>
        <SettingsList
          userDetailsTrigger={function showUserDetails(){
            setShowUserDetails(true);
          }}
        />
      </div>
      <UserDetailsForm show={clickedUserDetailsList} />
    </div>
  );
}
