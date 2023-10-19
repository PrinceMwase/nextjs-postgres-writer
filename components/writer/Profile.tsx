"use client";
import Details from "@/components/writer/writerDetail";
import Featured from "@/components/writer/featured";
import Categories from "@/components/writer/categories";
import profile, { ProfilePoemType } from "types/profile";
import { useState, useEffect } from "react";


export default function Profile({ username, isProfile }: { username?: string, isProfile?:boolean }) {
  const [profile, setProfile] = useState<profile>();
  const [poems, setPoems] = useState<ProfilePoemType[] | null>(null);

  const request = async function retrieveProfile() {

    if (username !== undefined) {
      return await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({
          username: username,
        }),
      }).then(async (response) => {
        if (response.ok) {
          const data = await response.json();

          const user: profile = data.user;

          setPoems(user.writer[0].Poem);
          setProfile(user);
        }
      });
    }

    await fetch("/api/profile", {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();

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
    <div className="flex flex-col lg:flex-row px-4 py-10 h-full">
      <div className="sm:w-full  mb-4 lg:mb-0 lg:basis-1/3">
        {profile !== undefined && (
          <Details
            firstname={profile.firstname}
            lastname={profile.lastname}
            userTags={profile.userTags}
            pfp={profile.writer[0].photo?.link}
            about={profile.writer[0].about}
            username={username ?? profile.writer[0].username}
            isProfile={!isProfile}
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
