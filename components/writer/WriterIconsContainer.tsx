import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import HeartIcon, { SolidHeartIcon } from "../svg/HeartIcon";
import NotificationIcon from "../svg/NotificationIcon";

export default function WriterIconsContainer({
  params,
}: {
  params: { slug: string };
}) {
  const [following, setFollowing] = useState<boolean>(false);
  const [followingLoading, setFollowingLoading] = useState<boolean>(false);

  const requestLikes = (function retrieveIfWriterLikes() {
    if (typeof window !== "undefined") {
      const url = new URL("api/writer/likes", window.location.origin);

      url.search = new URLSearchParams(params).toString();

      return function fetchLike() {
        setFollowingLoading(true);
        if (followingLoading) {
          return;
        }
        fetch(url)
          .then(async (response) => {
            console.log("complete");
            console.log(response.status);

            if (response.status === 200) {
              setFollowing(true);
              setFollowingLoading(false);
            } else {
              setFollowingLoading(false);
            }
          })
          .catch((error) => {
            toast.error(error);
            setFollowingLoading(false);
          });
      };
    } else {
      return () => {};
    }
  })();

  useEffect(() => {
    requestLikes();
  }, []);

  return (
    <div className="flex space-x-4 py-4 px-2">
      <span>
        <NotificationIcon />
      </span>
      <span>
      {following ? (
        <SolidHeartIcon/>
      ) : (
        <HeartIcon/>
      )}
      </span>
    </div>
  );
}
