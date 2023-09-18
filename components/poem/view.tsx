"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import { Read } from "./line";
import Link from "next/link";

export type LineProperty = {
  line: string;
  align: "left" | "right" | "center";
  color: string;
};

export type payload = {
  id: number;
  background: "light" | "dark";
  lines: LineProperty[];
  title: string;
  date: Date;
  writer: {
    id: number;
    name: string;
  };
  _count: {
    comments: number;
  };
  comments : commentType[] | undefined
};

export type commentType = {
  comment: string;
  poemId: number | undefined;
  writer: any | undefined

};

export default function ViewPoem({payload}: {payload: payload}) {
  const myPayload: payload = payload;
  const color = myPayload.background == "light" ? "#000000" : "#ffffff";
  const [loading, setLoading] = useState(false);
  const [commentBox, setCommentBox] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [commentCount, setCommentCount] = useState<number>(
    myPayload._count.comments
  );

  async function sendComment() {
    if (checkForComment()) {
      return;
    }

    let commentPayload: commentType = {
      comment,
      poemId: myPayload.id,
      writer: undefined
    };
    setLoading(true);
    await fetch("api/comment/create", {
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
        <article
          className={`h-full lg:w-fit w-full m-auto overflow-auto  block`}
        >
          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
            <h1 className="text-lg">
              <Link
                className="no-underline hover:underline font-bold  py-4 block"
                style={{ color }}
                href={`/poem/${myPayload.id}`}
              >
                {myPayload.title}
              </Link>
            </h1>
            <p className="text-white text-sm" style={{ color }}>
              {myPayload.date.toString().split("T")[0]}
            </p>
          </header>

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

          {/* comment input box */}
          <div className={`flex py-2 ${commentBox ? "" : "hidden"}`}>
            <input
              type="text"
              placeholder="Comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id="comment"
              className="my-1 block w-full cur appearance-none rounded-md border h-full border-gray-300 px-4 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 align-middle mx-2 py-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color }}
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </a>
          </div>

          {/* Footer */}
          <footer className="flex items-center justify-between leading-none p-2 space-x-20  md:p-4">
            <a
              className="flex items-center no-underline hover:underline"
              style={{ color }}
              href="#"
            >
              <p className="text-sm">{myPayload.writer.name}</p>
            </a>
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
              {commentCount}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={color}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </a>
          </footer>
        </article>
      </div>
    </div>
  );
}
