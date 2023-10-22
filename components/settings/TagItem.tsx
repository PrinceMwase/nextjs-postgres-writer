import SmallXIcon from "../svg/SmallXIcon";

export default function TagItem({ id, tag }: { id: number; tag: string }) {
  return (
    <li className="border-b">
      <div className="py-2 flex space-x-2 items-center">
        <SmallXIcon />
        <span className="capitalize">{tag}</span>
      </div>
    </li>
  );
}
