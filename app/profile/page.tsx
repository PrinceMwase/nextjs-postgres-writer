"use client";
import Image from "next/image";

import Details from "@/components/writer/writerDetail";
import Featured from "@/components/writer/featured";
import Categories from "@/components/writer/categories";
import profile, { ProfilePoemType } from "types/profile";
import { useState, useEffect } from "react";

export default function Profile() {
  const [profile, setProfile] = useState<profile>();
  const [poems, setPoems] = useState<ProfilePoemType[] | null>(null);

  const request = async function retrieveProfile() {
    await fetch("/api/profile", {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();

        console.log(data);

        const user: profile = data.user;

        setPoems(user.writer[0].Poem);
        setProfile(user);
      }
    });
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row m-10 h-screen">
      <div className="sm:w-full  mb-4 lg:mb-0 lg:basis-1/3">
        {profile !== undefined && (
          <Details
            firstname={profile.firstname}
            lastname={profile.lastname}
            userTags={profile.userTags}
            pfp={profile.writer[0].photo?.link}
            about={profile.writer[0].about}
            username={profile.writer[0].username}
          />
        )}
      </div>

      <div className="sm:w-full  mb-4 lg:mb-0">
        {poems && (
          <>
            <Featured poems={poems} />

            <Categories poems={poems} />
          </>
        )}
      </div>
    </div>
  );
}
