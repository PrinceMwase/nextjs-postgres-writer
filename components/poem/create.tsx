"use client";
import { useState } from "react";
import Line from "@/components/poem/line"
// write
// edit
// post

export default function CreatePoem() {
  const [content, setContent] = useState<string>();

  let myContentObject = {
    "content" : content,
    "conf":{
        "text-alignment": "left",
    },
    "lines":{
        "1":{
            "bold":true,
            "italic": false,
            "color": null,
        }
    },
  }

  return (
    <form action="" method="post" className="bg-gray-50 px-4 py-8 sm:px-16 ">
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          Draft
        </label>
        <br />
        <textarea
          id="content"
          name="content"
          placeholder="panic@thedis.co"
          autoComplete="content"
          rows={4}
          required
          onChange={(e) => {setContent(e.currentTarget.value );}}
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        ></textarea>
        <div>
          {content?.split("\n")?.map(function (e: string, index) {

            return <Line key={index} index={index} text={e}/>

          })}
        </div>
        <button className="btn border-black border" disabled> Preview</button>
        <button className="btn border-black border rounded-full" disabled> post </button>
      </div>
    </form>
  );
}
