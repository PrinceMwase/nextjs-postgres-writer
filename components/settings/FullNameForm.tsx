import React, { useEffect, useState } from "react";
import EditIcon from "../svg/EditIcon";
import profile from "types/profile";
import { toast } from "react-hot-toast";

export default function FullNameForm({ profile }: { profile: profile }) {
  const [fullName, setFullName] = useState<string>(
    `${profile.firstname ?? ""} ${profile.lastname ?? ""}`
  );
  const [fullNameError, setFullNameError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showFullNameInput, setShowFullNameInput] = useState<boolean>(false);

  const updateNames = async function updateFirstNameAndLastName() {
    setLoading(true);
    setShowFullNameInput(false)

    const currentFullName = fullName.trim();
    if (currentFullName.length === 0) {
      setLoading(false);
      setFullNameError(true);
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
    <div className="mx-auto md:w-3/4 lg:1/3">
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
        <div className="text-gray-600">{fullName}</div>
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
            className={`mt-1 h-10 grow appearance-none border-b ${
              fullNameError ? "border-red-500" : "border-gray-300"
            }   py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm`}
          />
          <button
            className="ease-in-out duration-300 transition-all mt-1 align-text-bottom  px-6 font-semibold border-none rounded-none bg-white text-black active:bg-gray-400  "
            type="button"
            onClick={() => {
              setShowFullNameInput(false);
            }}
          >
            Cancel
          </button>
          <button
            className="ease-in-out duration-300 transition-all mt-1  px-6 font-semibold border-none rounded-none bg-white text-black disabled:text-gray-400 active:bg-gray-400  "
            type="button"
            disabled={loading}
            onClick={updateNames}
          >
            UPDATE
          </button>
        </div>
      )}
    </div>
  );
}
