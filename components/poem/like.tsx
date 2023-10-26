import { useState } from "react";
import toast from "react-hot-toast";
import { poemLikeType } from "types/like";
import HeartIcon, { SolidHeartIcon } from "../svg/HeartIcon";

export default function Like({
  id,
  liked,
  color,
}: {
  id: number;
  liked: boolean;
  color: "#000000" | "#ffffff";
}) {
  const [thisLike, setThisLike] = useState<boolean>(liked);
  const [loading, setLoading] = useState(false);

  //   send a like or unset a like
  async function sendLike() {
    let like: poemLikeType = {
      poemId: id,
    };
    setLoading(true);

    await fetch("/api/poem/likes", {
      method: thisLike ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(like),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        setThisLike((current) => !current);
      }
    });
  }

  return (
    <a
      className="no-underline"
      style={{ color }}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        if (loading) {
          toast.success("a request is already being processed")
          return;
        } else {
          sendLike();
        }
      }}
    >
      {thisLike ? (
        <SolidHeartIcon/>
      ) : (
        <HeartIcon/>
      )}
    </a>
  );
}
