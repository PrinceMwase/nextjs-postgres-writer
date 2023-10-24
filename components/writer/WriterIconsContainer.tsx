import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import HeartIcon, { SolidHeartIcon } from "../svg/HeartIcon";
import NotificationIcon from "../svg/NotificationIcon";
import WriterFollowButton from "./WriterFollowButton";
import WriterMuteButton from "./WriterMuteButton";

export default function WriterIconsContainer({
  params,
}: {
  params: { slug: string };
}) {
  const [following, setFollowing] = useState<boolean>(false);
  const [mute, setMuted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [followingLoading, setFollowingLoading] = useState<boolean>(false);
  const [muteLoading, setMuteLoading] = useState<boolean>(false);

  const requestLikes = (function retrieveIfWriterLikes() {
    if (typeof window !== "undefined") {
      const url = new URL("api/writer/likes", window.location.origin);

      url.search = new URLSearchParams(params).toString();

      return async function fetchLike() {
        if (followingLoading) {
          return;
        }
        setFollowingLoading(true);
        await fetch(url)
          .then(async (response) => {
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
      return async () => {};
    }
  })();

  const requestMutes = (function retrieveIfWriterLikes() {
    if (typeof window !== "undefined") {
      const url = new URL("api/writer/mutes", window.location.origin);

      url.search = new URLSearchParams(params).toString();

      return async function fetchLike() {
        if (muteLoading) {
          return;
        }
        setMuteLoading(true);
        await fetch(url)
          .then(async (response) => {
            if (response.status === 200) {
              setMuted(true);
              setMuteLoading(false);
            } else {
              setMuteLoading(false);
            }
          })
          .catch((error) => {
            toast.error(error);
            setMuteLoading(false);
          });
      };
    } else {
      return async () => {};
    }
  })();

  const load = async function requestLikeAndNotificationStatus() {
    await requestLikes();
    await requestMutes();
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <div>loading....</div>;
  }

  return (
    <div className="flex space-x-4 py-4 px-2">
      <span>
        <WriterMuteButton params={params} muted={mute} />
      </span>

      <WriterFollowButton params={params} followed={following} />
    </div>
  );
}
