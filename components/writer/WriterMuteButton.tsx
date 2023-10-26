import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MuteIcon from "../svg/MuteIcon";
import NotificationIcon, { NotificationDisabledIcon } from "../svg/NotificationIcon";
import SpeakerIcon from "../svg/SpeakerIcon";

export default function WriterMuteButton(
  {
    params,
    muted,
  }: {
    params: { slug: string }
    muted: boolean
  }
) {
  const [mute, setMute] = useState<boolean>(muted);
  const [muteLoading, setMuteLoading] = useState<boolean>(false);

  const muteChecks = function RequestChecks() {
    if (muteLoading) {
      toast.success("a request is already being processed")
      return true;
    }
    if (mute === true) {
      return true;
    }
    setMuteLoading(true);
  };

  const muteRequest = function requestAMute() {
    if (muteChecks()) {
      return;
    }

    fetch("/api/writer/mutes", {
      method: "POST",
      body: JSON.stringify({ writerId: parseInt(params.slug)}),
    })
      .then(async (response) => {
        setMuteLoading(false);
        if (response.status === 200) {
          setMute(true);
        } else {
          const { error } = await response.json();
          toast.error(error);
        }
      })
      .catch(() => {
        toast.error("An Error Occurred!");
        setMuteLoading(false);
      });
  };

  const unmuteChecks = function followRequestChecks() {
    if (muteLoading) {
      toast.success("a request is already being processed")
      return true;
    }
    if (mute === false) {
      return true;
    }
    setMuteLoading(true);
  };

  const unMute = function requestUnFollow() {
    if (unmuteChecks() === true) {
      return;
    }

    fetch("/api/writer/mutes", {
      method: "DELETE",
      body: JSON.stringify({ writerId: parseInt(params.slug) }),
    })
      .then(async (response) => {
        setMuteLoading(false);
        if (response.status === 200) {
          setMute(false);
        } else {
          const { error } = await response.json();
          toast.error(error);
        }
      })
      .catch(() => {
        toast.error("An Error Occurred!");
        setMuteLoading(false);
      });
  };


  return mute ? (
    <span onClick={unMute} className="cursor-pointer">
      <MuteIcon />
    </span>
  ) : (
    <span onClick={muteRequest} className="cursor-pointer">
      <SpeakerIcon />
    </span>
  )
}
