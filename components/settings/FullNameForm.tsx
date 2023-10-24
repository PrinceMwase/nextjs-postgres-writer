import React, { useEffect, useState } from "react";
import EditIcon from "../svg/EditIcon";
import profile from "types/profile";
import { toast } from "react-hot-toast";
import ActionButton from "./ActionButton";

export default function FullNameForm({ profile }: { profile: profile }) {
  const [fullName, setFullName] = useState<string>(
    `${profile.firstname ?? ""} ${profile.lastname ?? ""}`
  );
  const [fullNameError, setFullNameError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showFullNameInput, setShowFullNameInput] = useState<boolean>(false);

  const updateNames = async function updateFirstNameAndLastName() {
    setLoading(true);
    setShowFullNameInput(false);

    const currentFullName = fullName.trim();
    if (currentFullName.length === 0) {
      setLoading(false);
      setFullNameError(true);
      return;
    }
    if (fullName === `${profile.firstname ?? ""} ${profile.lastname ?? ""}`) {
      setLoading(false);
      setFullNameError(true);
      toast.error("Full Name Has Not Been Updated");
      return;
    }
    fetch("/api/update/user/fullname", {
      method: "POST",
      body: JSON.stringify({ currentFullName }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          toast.success("updated user detail");
          setLoading(false);
          const { newFullName }: { newFullName: string } =
            await response.json();
          setFullName(newFullName);
        }
      })
      .catch(async (error) => {
        setLoading(false);

        toast.error(error);
      });
  };

  return (
    <div className="mx-auto">
      <label
        htmlFor="fullName"
        className="block text-xs"
        onClick={() => {
          setShowFullNameInput((current) => {
            return !current;
          });
        }}
      >
        <div className="text-lg font-semibold uppercase flex space-x-2 items-center">
          <span>Full Name</span> <EditIcon />
        </div>
        <div
          className={`ease-in-out duration-200 transition-all text-gray-600 ${
            showFullNameInput ? "opacity-0" : "opacity-100 py-1"
          }`}
        >
          {fullName}
        </div>
      </label>
      {showFullNameInput && (
        <div className="flex justify-between space-x-2">
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={fullName}
            onChange={(e) => {
              if (fullNameError) {
                setFullNameError(false);
              }
              setFullName(e.currentTarget.value);
            }}
            autoComplete="fullName"
            className={`mt-1 grow appearance-none border-b ${
              fullNameError ? "border-red-500" : "border-gray-300"
            }   placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm`}
          />
          <ActionButton
            onClick={() => {
              setShowFullNameInput(false);
            }}
          >
            Cancel
          </ActionButton>
          <ActionButton disabled={loading} onClick={updateNames}>
            Update
          </ActionButton>
        </div>
      )}
    </div>
  );
}
