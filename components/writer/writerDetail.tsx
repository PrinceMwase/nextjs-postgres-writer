"use client";


import { userDefinitions } from "types/profile";
import IdCardIcon from "../svg/IdCardIcon";
import InfoIcon from "../svg/InfoIcon";
import HashTagIcon from "../svg/HashTagIcon";
import WriterIconsContainer from "./WriterIconsContainer";
import { myFont } from "../ui/navbar";

interface Props extends userDefinitions {
  id?: number
  pfp: string | undefined;
  about: string | null;
  username: string;
  isProfile: boolean;
}

export default function Details({
  id,
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
     
      {/* user details */}
      <div className="px-2 space-y-4">
        <span className={`font-bold block text-4xl ${myFont.className}`}>
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
      {!isProfile && id && (
        <WriterIconsContainer params={{slug:id.toString()}} />
      )}
    </>
  );
}
