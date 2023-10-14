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
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

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
    <div className="flex flex-col lg:flex-row p-10 h-screen">
      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transform transition-transform ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Content */}
        {/* Add your drawer content here */}
      </div>

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
        <button
          onClick={toggleDrawer}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Toggle Drawer
        </button>
      </div>
    </div>
  );
}
