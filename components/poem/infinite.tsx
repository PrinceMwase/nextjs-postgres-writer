'use client'
// components/InfiniteScroll.js

import PoemContext from "@/lib/poems_context";
import { payload, payload as payloadType } from "@/components/poem/view";

import React, {  useContext, useEffect, useState } from "react";
import ViewPoem from "@/components/poem/view";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Infinite({writerId}:{writerId?:number}) {
  const [allPoems, setAllPoems] = useState<payload[] | null>(null);
  const [hasMore, setHasMore] = useState<boolean >(true);

   const [skip, setSkip] = useState(0);

  const fetchMorePosts = async () => {
    try {
      fetch("/api/poem/infinite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          writerId,
          skip: allPoems?.length === 0 ? 0 : skip,
          take: 2, // Adjust the number of posts to load at once
        }),
      }).then(async (response) => {
       
        if (response.status == 200) {
          const newPoems: payloadType[] = await response.json();
          console.log(newPoems);

          if (newPoems.length === 0) {
            setHasMore(false);
          } else {
            if (allPoems === null || allPoems === undefined) {
              setAllPoems([...newPoems]);
            } else {
              setAllPoems([...allPoems, ...newPoems]);
            }

            setSkip((prevSkip) => prevSkip + newPoems.length);
          }
        }
      });
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  useEffect(() => {
    fetchMorePosts();
  }, [])

  return (
    <>
      <InfiniteScroll
        dataLength={allPoems?.length || 0} //This is important field to render the next data
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {allPoems?.map((value: payloadType, index) => {
          return <ViewPoem key={index} payload={value} />;
        })}
      </InfiniteScroll>
    </>
  );
}
// export default InfiniteScroll;
