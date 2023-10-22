import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
import SmallXIcon from "../svg/SmallXIcon";

export default function TagItem({
  id,
  tag,
  setTagListFunction,
  setTagArray,
  setMyTags
}: {
  id: number;
  tag: string;
  setTagListFunction: Dispatch<SetStateAction<JSX.Element[]>>;
  setTagArray:  Dispatch<SetStateAction<{
    id: number;
    tag: string;
}[]>>
setMyTags: Dispatch<SetStateAction<{
    id: number;
    tag: string;
}[]>>
}) {
  const [loading, setLoading] = useState(false);

  const Delete = async function DeleteUserTag() {
    setLoading(true);
    
    fetch("/api/update/user/tag", {
      method: "DELETE",
      body: JSON.stringify({ tagId: id }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          const DeletedTag: { id: number; tag: string } = await response.json();

          toast.success("Removed Tag");
          setMyTags( (allTags)=>{
            return allTags.filter((element)=>{
                return element.id != id
            })
          } )
          setTagArray( (allTags)=>{
            return allTags.filter((element)=>{
                return element.id != id
            })
          } )
          setTagListFunction((allTags) => {
            
            return allTags.filter((element) => {
                
              return element.props.id !== id;
            });
          });
          setLoading(false);
          return
        }
        setLoading(false);
        const { error } = await response.json();
        toast.error(error);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Unknown Error");
      });
  };

  return (
    <li className="border-b">
      <div
        className={`py-2 flex space-x-2 items-center ${
          loading ? "disabled:text-gray-400" : ""
        }`}
      >
        <span onClick={Delete}>
          <SmallXIcon />
        </span>
        <span className="capitalize">{tag}</span>
      </div>
    </li>
  );
}
