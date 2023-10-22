import EditIcon from "../svg/EditIcon";

export default function UserPasswordForm() {
  return (
    <div className="mx-auto">
      <label htmlFor="tag" className="block text-xs">
        <div className="text-lg font-semibold uppercase flex space-x-2 items-center">
          <span>Password</span> <EditIcon />
        </div>
        <div className="py-1">
          Update User Password, Action can not be reverted
        </div>
      </label>
    </div>
  );
}
