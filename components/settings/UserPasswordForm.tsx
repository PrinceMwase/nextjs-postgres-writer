import { useState } from "react";
import { toast } from "react-hot-toast";
import EditIcon from "../svg/EditIcon";
import ActionButton from "./ActionButton";

export default function UserPasswordForm() {
  const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
  const [oldPasswordError, setOldPasswordError] = useState<boolean>(false);
  const [showFormInput, setShowFormInput] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const update = async function updatePassword() {
    if (loading) {
      return;
    }
    setLoading(true);

    if (newPassword.length < 8) {
      setNewPasswordError(true);
      setLoading(false)
      return;
    }
    if(oldPassword.length === 0){
      setLoading(false)
      setOldPasswordError(true)
      return
    }

    fetch("/api/update/user/password",{
      method: "POST",
      body: JSON.stringify({oldPassword, newPassword})
    }).then(async (response)=>{
        if(response.status === 200){
          setNewPassword("")
          setOldPassword("")
          const {success} = await response.json()
          toast.success(success)
          setLoading(false)
        }else{
          const {error} = await response.json()
          toast.error(error)
          setLoading(false)
        }
    }).catch(()=>{
      toast.error("An error Occurred")
      setLoading(false)
    })
  };

  return (
    <div className="mx-auto">
      <label
        htmlFor="oldPassword"
        className="block text-xs"
        onClick={() => {
          setShowFormInput((current) => {
            return !current;
          });
        }}
      >
        <div className="text-lg font-semibold uppercase flex space-x-2 items-center">
          <span>Password</span> <EditIcon />
        </div>
        <div
          className={`ease-in-out duration-200 transition-al ${
            showFormInput ? "py-0" : "py-1"
          }`}
        >
          <div>
         Password should be a Minimum of 8 characters
          </div>
          <div className={`ease-in-out duration-200 transition-all text-gray-600 ${
            showFormInput ? "opacity-0" : "opacity-100"
          }`}>
          Update Password, action can not be reversed
          </div>
        </div>
      </label>
      {showFormInput && (
        <div>
          <div className="flex">
            <input
              type="password"
              placeholder="Old Password"
              name="oldPassword"
              onChange={(e) => {
                if (oldPasswordError) {
                  setOldPasswordError(false);
                }
                setOldPassword(e.currentTarget.value);
              }}
              id="oldPassword"
              className={`mt-1 h-10 grow appearance-none border-b ${
                oldPasswordError ? "border-red-500" : "border-gray-300"
              }   placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm`}
            />
          </div>
          <div className="flex justify-between space-x-2">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                if (newPasswordError) {
                  setNewPasswordError(false);
                }
                setNewPassword(e.currentTarget.value);
              }}
              placeholder="New Password"
              name="newPassword"
              id="newPassword"
              className={`mt-1 h-10 grow appearance-none border-b ${
                newPasswordError ? "border-red-500" : "border-gray-300"
              }   placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm`}
            />
            <ActionButton
              onClick={() => {
                setShowFormInput(false);
              }}
            >
              Cancel
            </ActionButton>
            <ActionButton onClick={update} disabled={loading}>Update</ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
