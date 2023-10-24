import { useState } from "react";
import toast from "react-hot-toast";
import EditIcon from "../svg/EditIcon";
import ActionButton from "./ActionButton";

export default function AboutForm({ oldAbout }: { oldAbout: string | null }) {
  const [about, setAbout] = useState(oldAbout ?? "");
  const [loading, setLoading] = useState<boolean>(false);
  const [AboutError, setAboutError] = useState<boolean>(false);
  const [showAboutInput, setAboutInput] = useState<boolean>(false);

  const updateAbout = async function updateFirstNameAndLastName() {
    setLoading(true);
    setAboutInput(false);

    const currentAbout = about.trim();
    if (currentAbout.length === 0) {
      setLoading(false);
      setAboutError(true);
      return;
    }
    if (currentAbout === oldAbout) {
      setLoading(false);
      setAboutError(true);
      toast.error("About Has Not Been Updated");
      return;
    }
    fetch("/api/update/user/about", {
      method: "POST",
      body: JSON.stringify({ currentAbout }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          toast.success("Updated About");
          setLoading(false);
          const { newAbout }: { newAbout: string } = await response.json();
          setAbout(newAbout);
        }
        return response;
      })
      .catch(async (error) => {
        setLoading(false);

        toast.error(error);
      });
  };

  return (
    <div className="mx-auto">
      <label
        htmlFor="about"
        className="block text-xs"
        onClick={() => {
          setAboutInput((current) => {
            return !current;
          });
        }}
      >
        <div className="text-lg font-semibold uppercase flex space-x-2 items-center">
          <span>About</span> <EditIcon />
        </div>

        <div
          className={`ease-in-out duration-200 transition-all text-gray-600 ${
            showAboutInput ? "opacity-0" : "opacity-100 py-1"
          }`}
        >
          {about}
        </div>
      </label>
      {showAboutInput && (
        <div className="flex justify-between space-x-8">
          <textarea
            id="about"
            name="about"
            value={about}
            rows={3}
            maxLength={150}
            onChange={(e) => {
              if (AboutError) {
                setAboutError(false);
              }
              setAbout(e.currentTarget.value);
            }}
            autoComplete="fullName"
            className={`mt-1 grow appearance-none border-b ${
              AboutError ? "border-red-500" : "border-gray-300"
            }   placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm`}
          ></textarea>
          <ActionButton
            onClick={()=>{
                setAboutInput(false)
            }}
          >Cancel</ActionButton>
          <ActionButton disabled={loading} onClick={updateAbout}>Update</ActionButton>
        </div>
      )}
    </div>
  );
}
