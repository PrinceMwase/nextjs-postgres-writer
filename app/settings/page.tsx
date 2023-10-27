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
            <div className="text-sm text-gray-700">
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
        className={`mb-4 w-max mx-4 cursor-pointer ${
          clickedUserDetailsList ? "" : "hidden"
        }`}
        onClick={() => {
          setShowUserDetails(false);
        }}
      >
        <BackIcon />
      </div>
      <div
        className={`px-4 ${clickedUserDetailsList ? "hidden" : ""} space-y-4`}
      >
        <SettingsList
          userDetailsTrigger={function showUserDetails() {
            setShowUserDetails(true);
          }}
        />
        <div className="px-4 space-y-2">
          <div className="text-xl font-semibold">About YKTVibe</div>
          <div className="text-lg text-gray-700"> Version 1.0 (2023) </div>
          <div className="text-lg text-gray-700 flex space-x-2"> <span>&copy;2023 UIHEXED.</span> <span>All rights reserved</span>  </div>
          <div className="text-xl font-semibold">Disclaimer</div>
          <div>
            <p className="text-gray-700">
              YKTVibe does not employ any mechanism to check for plagiarism. We
              trust our users to contribute original content. If you believe any
              content violates copyright or intellectual property rights, please
              contact{" "}
              <a
                className="underline"
                href="mailto:princefranklinemwase@gmail.com"
              >
                Prince Mwase
              </a>{" "}
              with the necessary details, and we will promptly address the
              issue.
            </p>
          </div>
          <div className="text-xl font-semibold">Privacy</div>
          <div>
            <p className="text-gray-700">
              YKTVibe&apos;s data is securely self-hosted and it is not shared with
              no outside sources. This means that the app is managed and
              maintained by Prince Mwase personally, ensuring the highest level
              of control and security over the platform. Thank you for being a
              part of the YKTVibe community. We hope you find inspiration and
              connection within our poetic haven.
            </p>
          </div>
        </div>
      </div>
      <UserDetailsForm show={clickedUserDetailsList} />
    </div>
  );
}
