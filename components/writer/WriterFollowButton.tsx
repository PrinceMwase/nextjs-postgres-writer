import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HeartIcon, { SolidHeartIcon } from "../svg/HeartIcon";

export default function WriterFollowButton(
  {
    params,
    followed,
  }: {
    params: { slug: string }
    followed: boolean
  }
) {
  const [following, setFollowing] = useState<boolean>(followed);
  const [followingLoading, setFollowingLoading] = useState<boolean>(false);

  const followChecks = function followRequestChecks() {
    if (followingLoading) {
      toast.success("a request is already being processed")
      return true;
    }
    if (following === true) {
      return true;
    }
    setFollowingLoading(true);
  };

  const follow = function requestAFollow() {
    if (followChecks()) {
      return;
    }

    fetch("/api/writer/likes", {
      method: "POST",
      body: JSON.stringify({ writerId: parseInt(params.slug)}),
    })
      .then(async (response) => {
        setFollowingLoading(false);
        if (response.status === 200) {
          setFollowing(true);
        } else {
          const { error } = await response.json();
          toast.error(error);
        }
      })
      .catch(() => {
        toast.error("An Error Occurred!");
        setFollowingLoading(false);
      });
  };

  const unFollowChecks = function followRequestChecks() {
    if (followingLoading) {
      toast.success("a request is already being processed")
      return true;
    }
    if (following === false) {
      return true;
    }
    setFollowingLoading(true);
  };

  const unFollow = function requestUnFollow() {
    if (unFollowChecks() === true) {
      return;
    }

    fetch("/api/writer/likes", {
      method: "DELETE",
      body: JSON.stringify({ writerId: parseInt(params.slug) }),
    })
      .then(async (response) => {
        setFollowingLoading(false);
        if (response.status === 200) {
          setFollowing(false);
        } else {
          const { error } = await response.json();
          toast.error(error);
        }
      })
      .catch(() => {
        toast.error("An Error Occurred!");
        setFollowingLoading(false);
      });
  };


  return following ? (
    <span onClick={unFollow} className="cursor-pointer">
      <SolidHeartIcon />
    </span>
  ) : (
    <span onClick={follow} className="cursor-pointer">
      <HeartIcon />
    </span>
  )
}
