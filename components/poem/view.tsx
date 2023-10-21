"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import { Read } from "./line";
import Link from "next/link";
import { payload, commentType } from "../../types/poem";
import { useRouter } from "next/navigation";
import Like from "./like";
import Delete from "./delete";
import ChatIcon from "../svg/ChatIcon";
import MiniSendIcon from "../svg/MiniSendIcon";

export default function ViewPoem({
  payload,
  liked,
}: {
  payload: payload;
  liked?: boolean;
}) {
  const myPayload: payload = payload;
  const [loading, setLoading] = useState(false);
  const [commentBox, setCommentBox] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [commentCount, setCommentCount] = useState<number>(
    myPayload._count?.comments
  );
  const color = myPayload.background == "light" ? "#000000" : "#ffffff";
  if ("error" in myPayload) {
    return <></>;
  }

  async function sendComment() {
    if (checkForComment()) {
      return;
    }

    let commentPayload: commentType = {
      comment,
      poemId: myPayload.id,
      writer: undefined,
    };
    setLoading(true);
    await fetch("/api/comment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentPayload),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        setComment("");
        toast.success("commented...");
        setCommentCount((e) => ++e);
      } else {
        const { error } = await res.json();
        toast.error(error);
      }
    });
  }

  function checkForComment() {
    return comment.trim().length < 1 || loading;
  }

  return (
    <div
      className={`${
        myPayload.background == "dark" ? "bg-slate-900" : "bg-slate-50"
      } px-4 py-8 sm:px-16 w-full`}
    >
      <div className="w-full my-5">
        <article className="h-full lg:w-fit w-full m-auto overflow-auto shadow-md block space-y-2">
          <header className="flex items-baseline justify-between leading-tight px-2 md:p-4">
            <h1 className="text-lg text-left basis-3/4">
              <Link
                className="no-underline hover:underline capitalize font-bold tracking-wider block"
                style={{ color }}
                href={`/poem/${myPayload.id}`}
              >
                {myPayload.title}
              </Link>
            </h1>
            <p className="text-white text-sm" style={{ color }}>
              {myPayload.date?.toString().split("T")[0].replaceAll("-", "/")}
            </p>
          </header>

          <div className="px-20">
            <Link
              className="flex space-x-2 text-md no-underline"
              style={{ color }}
              href={`/writer/${myPayload.writer.name}`}
            >
              <span>BY</span>{" "}
              <p className="uppercase underline">{myPayload.writer.name}</p>
            </Link>
          </div>

          <div className="px-20">
            {myPayload.lines.map((line, index) => {
              return (
                <Read
                  key={index}
                  text={line.line}
                  color={line.color}
                  textAlign={line.align}
                />
              );
            })}
          </div>

          {/* comment input box */}
          <div className={`flex ${commentBox ? "" : "hidden"} items-center`}>
            <input
              type="text"
              placeholder="Comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id="comment"
              className={`${
                myPayload.background == "dark"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 text-black"
              } my-1 block w-full appearance-none rounded-none border-b-2 h-full border-gray-300 px-4 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm`}
            />

            {/* send button */}
            <a
              className={`btn ${
                checkForComment()
                  ? "opacity-5 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={sendComment}
            >
              <MiniSendIcon color={color}/>
            </a>
          </div>

          {/* Footer */}
          <footer className="flex items-center justify-between leading-none p-2 space-x-20  md:p-4">
            <Delete id={payload.id} color={color} />

            {/* like and comment */}
            <div className="flex space-x-4 items-center">
              {/* like */}
              <Like
                id={payload.id}
                liked={liked ? liked : false}
                color={color}
              />

              {/* comment */}
              <a
                className="no-underline"
                style={{ color }}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCommentBox((cur: boolean) => !cur);
                }}
              >
                {/* Comments Count */}
                <span className="absolute -my-2 ">{commentCount}</span>
                <ChatIcon color={color} />
              </a>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
