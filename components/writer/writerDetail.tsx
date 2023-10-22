"use client";

import Image from "next/image";
import { useEffect } from "react";

import { userDefinitions } from "types/profile";
import IdCardIcon from "../svg/IdCardIcon";
import InfoIcon from "../svg/InfoIcon";
import HeartIcon from "../svg/HeartIcon";
import NotificationIcon from "../svg/NotificationIcon";
import HashTagIcon from "../svg/HashTagIcon";

interface Props extends userDefinitions {
  pfp: string | undefined;
  about: string | null;
  username: string;
  isProfile: boolean;
}

export default function Details({
  username,
  userTags,
  about,
  firstname,
  lastname,
  pfp,
  isProfile,
}: Props) {
  return (
    <>
      {/* profile image  */}
      <div className="p-4">
        <Image
          src={pfp ?? "/pfp.jpeg"}
          width={400}
          height={400}
          alt="Picture of the author"
          className="rounded-full m-auto"
        />
      </div>

      {/* user details */}
      <div className="px-2 space-y-4">
        <span className="font-bold block text-4xl font-maglite">
          {username}
        </span>

        <div className="flex space-x-2">
          <span>
            <IdCardIcon />
          </span>
          <span className="font-medium">
            {firstname} {lastname}
          </span>
        </div>

        <div className="flex space-x-2">
          <span>
            <InfoIcon />
          </span>

          <div className="text-lg text-gray-600">{about}</div>
        </div>

        <div className="flex space-x-4">
          {userTags &&
            userTags.map((value, key) => {
              return (
                <span className="flex" key={key}>
                  <HashTagIcon />
                  {value.tag.tag}
                </span>
              );
            })}
        </div>
      </div>

      {/* user icons */}
      {!isProfile && (
        <div className="flex space-x-4 py-4 px-2">
          <span>
            <NotificationIcon />
          </span>
          <span>
            <HeartIcon />
          </span>
        </div>
      )}
    </>
  );
}
