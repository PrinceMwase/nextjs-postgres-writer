"use client";

import ViewPoem from "@/components/poem/view";
import {payload} from "../../../types/poem"
import moment from 'moment';
import { useEffect, useState } from "react";
import { retrieveLikes } from "@/components/poem/infinite";
export default function Page({ params }: { params: { slug: string } }) {
  const [poem, setPoem] = useState<payload>();
  const [likes, setLikes] = useState<number[] | null>(null);


  const fetchLikes = async ()=>{
    const result = await retrieveLikes()
    setLikes( result ? result : null )
  }

  useEffect(() => {

    fetchLikes();

    if (typeof window !== "undefined") {
      const url = new URL("api/poem/get", window.location.origin);

      url.search = new URLSearchParams(params).toString();

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
                    
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
      {likes && <ViewPoem payload={poem} liked={likes?.includes(poem.id) ? true : false} />}
      
      <div className="py-8 w-full">
        {poem.comments?.map((comment, index) => {
          return (
            <div className="block" key={index}>
              <div className="flex items-center justify-between leading-none p-4 space-x-20  md:p-4">
                <span>{comment.comment}</span><span className="text-right text-sm text-gray-500">@{comment.writer.username}</span>
              </div>
              <div className="p-4">
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
