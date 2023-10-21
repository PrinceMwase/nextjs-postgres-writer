import { useState, useEffect } from "react";
import profile from "types/profile";
import EditIcon from "../svg/EditIcon";
import FullNameForm from "./FullNameForm";

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
  const updateNames = async function updateFirstNameAndLastName() {
    const currentFullName = fullName.trim();
    if (currentFullName.length === 0) {
      setFullNameError(true);
      return;
    }
    fetch("/api/update/user/fullname", {
      method: "POST",
      body: JSON.stringify({ currentFullName }),
    }).then(async (response) => {
      if (response.status === 200) {
        const { newFullName }: { newFullName: string } = await response.json();

        setFullName(newFullName);
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
          className={`py-10 px-4 ease-in-out duration-300 transition-opacity ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          <FullNameForm profile={profile} />
        </div>
      )}
    </>
  );
}
