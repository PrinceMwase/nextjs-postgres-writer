"use client";

import ViewPoem from "@/components/poem/view";
import {payload} from "../../../types/poem"
import moment from 'moment';
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [poem, setPoem] = useState<payload>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL("api/poem/get", window.location.origin);

      url.search = new URLSearchParams(params).toString();

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          
          return setPoem(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  if (poem === undefined) {
    return;
  }

  return (
    <div className="h-screen">
      <ViewPoem payload={poem} />
      <div className="px-4 py-8 sm:px-16 w-full">
        {poem.comments?.map((comment, index) => {
          return (
            <div className="block" key={index}>
              <div className="flex items-center justify-between leading-none p-2 space-x-20  md:p-4">
                <span>{comment.comment}</span><span className="text-right text-sm text-gray-500">@{comment.writer.username}</span>
              </div>
              <div className="p-2 md:p-4">
                <span className="text-xs">{moment(comment.createdAt).fromNow()}</span>
              </div>

              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}
