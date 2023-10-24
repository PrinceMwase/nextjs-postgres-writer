import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import EditIcon from "../svg/EditIcon";
import SmallHashTagIcon from "../svg/SmallHashTagIcon";
import ActionButton from "./ActionButton";
import TagItem from "./TagItem";

export default function UserTagsForm({
  userTags,
}: {
  userTags:
    | {
        tag: {
          id: number;
          tag: string;
        };
      }[];
}) {
  const [userTagsFiltered, setUserTagsFiltered] = useState(
    userTags.map((value) => {
      return value.tag;
    })
  );

  const [tag, setTag] = useState("");
  const [tagError, setTagError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [showTagForm, setShowTagForm] = useState<boolean>(false);

  const set = new Set(userTagsFiltered); // Convert array to Set
  const [myTags, setMyTags] = useState(Array.from(set));
  const [TagList, setTagList] = useState<JSX.Element[]>([]);

  const addTag = async function addNewTag() {
    if (loading) {
      return;
    }
    setLoading(true);
    setShowTagForm(false);

    const currentTag = tag.replace("#", "").trim().split(" ")[0];

    if (currentTag.length === 0) {
      setLoading(false);
      setTagError(true);
      setShowTagForm(true);
      return;
    }
    if (myTags.length >= 3) {
      setLoading(false);
      setTagError(true);
      setShowTagForm(true);
      toast.error("You can have a maximum of 3 Tags");
      return;
    }
    fetch("/api/update/user/tag", {
      method: "POST",
      body: JSON.stringify({ currentTag }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          const { newTag }: { newTag: { id: number; tag: string } } =
            await response.json();

         
          setMyTags((oldTags) => {
            oldTags.push(newTag);
            setUserTagsFiltered(Array.from(oldTags));
            setTagList(
              Array.from(oldTags).map((Tag, index) => (
                <TagItem
                setMyTags={setMyTags}
                  key={index}
                  {...Tag}
                  setTagArray={setUserTagsFiltered}
                  setTagListFunction={setTagList}
                />
              ))
            );
            return oldTags;
          });

          setLoading(false);
          toast.success("Added New Tag");
          return;
        }
        const { error } = await response.json();
        toast.error(error);
        setLoading(false);
      })
      .catch(async (error) => {
        setLoading(false);
        toast.error(error);
      });
  };

  useEffect(() => {
    setUserTagsFiltered(userTags.map((value) => value.tag));
    setTagList(
      Array.from(myTags).map((Tag, index) => (
        <TagItem
        setMyTags={setMyTags}
          key={index}
          {...Tag}
          setTagArray={setUserTagsFiltered}
          setTagListFunction={setTagList}
        />
      ))
    );
  }, []);
  return (
    <div className="mx-auto">
      <label
        htmlFor="tag"
        className="block text-xs"
        onClick={() => {
          setShowTagForm((current) => {
            return !current;
          });
        }}
      >
        <div className="text-lg font-semibold uppercase flex space-x-2 items-center">
          <span>Tags</span> <EditIcon />
        </div>
        <div className="py-1">Add Tags to Help in Recommendations and reach</div>
        <div
          className={`ease-in-out duration-200 transition-all flex space-x-4 text-gray-600 ${
            showTagForm ? "opacity-0" : "opacity-100 py-1"
          }`}
        >
          {userTagsFiltered.map((value, key) => {
            return (
              <span className="flex" key={key}>
                <SmallHashTagIcon />
                {value.tag}
              </span>
            );
          })}
        </div>
      </label>
      {showTagForm && (
        <>
          <div className="flex justify-between space-x-2">
            <input
              id="tag"
              name="tag"
              type="text"
              value={tag}
              onChange={(e) => {
                if (tagError) {
                  setTagError(false);
                }
                setTag(e.currentTarget.value);
              }}
              autoComplete="tag"
              className={`mt-1 grow appearance-none border-b ${
                tagError ? "border-red-500" : "border-gray-300"
              }   placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm`}
            />
            <ActionButton
              onClick={() => {
                setShowTagForm(false);
              }}
            >
              Cancel
            </ActionButton>
            <ActionButton disabled={loading} onClick={addTag}>
              Add Tag
            </ActionButton>
          </div>
          <div>
            <ul>{TagList}</ul>
          </div>
        </>
      )}
    </div>
  );
}
