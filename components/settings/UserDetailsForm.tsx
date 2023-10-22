import { useState, useEffect } from "react";
import profile from "types/profile";
import EditIcon from "../svg/EditIcon";
import AboutForm from "./AboutForm";
import FullNameForm from "./FullNameForm";
import UserTagsForm from "./UserTagsForm";

export default function UserDetailsForm({ show }: { show: boolean }) {
  const [profile, setProfile] = useState<profile>();
  const [fullName, setFullName] = useState<string>("");
  const [fullNameError, setFullNameError] = useState<boolean>(false);
  const [showFullNameInput, setShowFullNameInput] = useState<boolean>(false);

  const request = async function retrieveProfile() {
    await fetch("/api/profile", {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();

        const user: profile = data.user;

        setProfile(user);

        setFullName(`${user.firstname ?? ""} ${user.lastname ?? ""}`);
      }
    });
  };


  useEffect(() => {
    request();
  }, []);

  return (
    <>
      {profile && (
        <div
          className={` px-4 ease-in-out duration-300 transition-opacity space-y-4 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          <FullNameForm profile={profile} />
          <AboutForm oldAbout={profile.writer[0].about} />
          <UserTagsForm userTags={profile.userTags ?? []} />
        </div>
      )}
    </>
  );
}
