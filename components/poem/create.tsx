"use client";
import { FormEvent, useState } from "react";
import Line from "@/components/poem/line";
import toast from "react-hot-toast";
import LoadingDots from "../loading-dots";

import {createType} from '../../types/poem'
import { useRouter } from "next/navigation";


export default function CreatePoem() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [preview, setPreview] = useState<boolean>(false);
  const [confirm, setConfirmation] = useState<boolean>(false);

  return (
    <form
      className="bg-gray-50 px-4 py-4 sm:px-16 flex-auto w-full"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const lines = content?.split("\n");

        console.log(lines);

        if (lines === undefined) {
          return;
        }

        let thisPayload: createType = {
          background: theme,
          lines: [],
          title: "",
        };
        let target = e.target as HTMLElement;
        let inputs = target.getElementsByTagName("input");

        for (let index = 0; index < inputs.length; index++) {
          console.log(inputs[index]);
          let alignment = inputs[index].getAttribute("id")?.split("line")[1];

          if (alignment === undefined) {
            continue;
          }

          if (
            alignment === "center" ||
            alignment === "left" ||
            alignment === "right"
          )
            thisPayload.lines.push({
              line: lines[index],
              align: alignment,
              color: inputs[index].value,
            });
        }
        thisPayload.title = title;

        fetch("/api/poem/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(thisPayload),
        }).then(async (res) => {
          setLoading(false);
          if (res.status === 200) {
            toast.success("Posted...");
            router.refresh();
        
            router.push("/");
          } else {
            const { error } = await res.json();
            toast.error(error);
          }
        });
      }}
    >
      <div className="py-4">
        <label
          htmlFor="content"
          className="block text-xs text-gray-600 opacity-80 hover:opacity-100 cursor-pointer uppercase fixed bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </label>
        <div className="h-96 w-full my-5 px-8">
          {!preview && (
            <textarea
              id="content"
              name="content"
              placeholder="What's on your mind?"
              required
              value={content}
              onChange={(e) => {
                setContent(e.currentTarget.value);
              }}
              className="my-1 block w-full appearance-none rounded-md border h-full border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            ></textarea>
          )}
          {preview && (
            <div
              className={`h-full lg:w-fit m-auto  overflow-auto p-8 ${
                theme == "dark" ? "bg-slate-900" : "bg-slate-50"
              }`}
            >
              <span
                className="font-bold  py-4 block"
                style={{ color: theme == "light" ? "#000000" : "#ffffff" }}
              >
                {title}
              </span>
              {content?.split("\n")?.map(function (e: string, index) {
                return (
                  <Line
                    key={index}
                    index={index}
                    confirm={confirm}
                    text={e}
                    theme={theme}
                    readonly={false}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="px-8">
          <label
            htmlFor="mode"
            className="block text-xs text-gray-600 uppercase"
          >
            Dark Background
          </label>
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setTheme("dark");
              } else {
                setTheme("light");
              }
            }}
            name="mode"
            id="mode"
          />
        </div>

        <div className="px-8 ">
          {!preview && (
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              placeholder="Title"
              name="title"
              id="title"
              className="my-1 block w-full appearance-none rounded-md border h-full border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          )}
        </div>

        <div className="px-8 space-x-2">
          {!confirm && (
            <button
              className="h-10 px-6 font-semibold rounded-md bg-black text-white"
              onClick={() => setPreview((value) => !value)}
              type="button"
            >
              {" "}
              {preview ? "Edit" : "Preview"}
            </button>
          )}
          {preview && (
            <button
              disabled={loading}
              onClick={(e) => {
                if (!confirm) {
                  e.preventDefault();
                  setConfirmation(() => true);
                }
              }}
              className="h-10 px-6 font-semibold border rounded-md bg-white text-black"
              type="submit"
            >
              {" "}
              {confirm ? (
                loading ? (
                  <LoadingDots color="#808080" />
                ) : (
                  "Post"
                )
              ) : (
                "Confirm?"
              )}{" "}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
