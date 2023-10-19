"use client";
// components/InfiniteScroll.js
import { payload, payload as payloadType } from "../../types/poem";

import React, { useContext, useEffect, useState } from "react";
import ViewPoem from "@/components/poem/view";
import InfiniteScroll from "react-infinite-scroll-component";


export const retrieveLikes = async function retrieveLikesRequest() {
  return fetch("/api/poem/likes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    if (response.status == 200) {
      const allMyLikes: { myResult: number[] } = await response.json();

      return allMyLikes.myResult;
    }
  });
}

export default function Infinite({ writerId, children }: { writerId?: number; children?: React.ReactNode; }) {

  const [allPoems, setAllPoems] = useState<payload[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [likes, setLikes] = useState<number[] | null>(null);

  const [skip, setSkip] = useState(0);

  const fetchLikes = async function likesRequest() {
    const result = await retrieveLikes();
    setLikes( result ?? null);
    await fetchMorePosts();
  };

  const fetchMorePosts = async function postRequest() {
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
    fetchLikes();
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={allPoems.length} //This is important field to render the next data
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={() => {
          setAllPoems([]);
          setHasMore(true);
          setSkip(() => {
            return 0;
          });
          fetchMorePosts();
        }}
        pullDownToRefresh={true}
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        <div className="">
          {children}
          {likes &&
            allPoems?.map((value: payloadType, index) => {
              return (
                <ViewPoem
                  key={index}
                  payload={value}
                  liked={likes?.includes(value.id) ? true : false}
                />
              );
            })}
        </div>
      </InfiniteScroll>
    </>
  );
}

