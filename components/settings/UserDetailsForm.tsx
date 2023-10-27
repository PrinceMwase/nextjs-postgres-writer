import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import profile from "types/profile";
import AboutForm from "./AboutForm";
import FullNameForm from "./FullNameForm";
import UserPasswordForm from "./UserPasswordForm";
import UserTagsForm from "./UserTagsForm";

export default function UserDetailsForm({ show }: { show: boolean }) {
  const [profile, setProfile] = useState<profile>();
  const [loading, setLoading] = useState<boolean>(true);

  const request = async function retrieveProfile() {
    await fetch("/api/profile", {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();

        const user: profile = data.user;

        setProfile(user);
        setLoading(false)
      }
    }).catch(()=>{
      toast.error("Failed to load user Profile")
    })
  };

  useEffect(() => {
    request();
  }, []);

  if (loading) {
    return (
      <div className={`px-4 ease-in-out duration-300 transition-opacity space-y-4 ${
        show ? "opacity-100" : "opacity-0"
      }`}>
        loading...
      </div>
    );
  }

  return (
    <>
      {profile && (
        <div
          className={` px-4 ease-in-out duration-200 transition-opacity space-y-4 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          <UserPasswordForm />
          <FullNameForm profile={profile} />
          <AboutForm oldAbout={profile.writer[0].about} />
          <UserTagsForm userTags={profile.userTags ?? []} />
        </div>
      )}
    </>
  );
}
