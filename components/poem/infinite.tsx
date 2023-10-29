"use client";
// components/InfiniteScroll.js
import { payload, payload as payloadType } from "../../types/poem";

import React, { useEffect, useState } from "react";
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
};

export default function Infinite({
  writerId,
  children,
  writersId,
  notWritersId,
  genreId,
}: {
  writerId?: number;
  children?: React.ReactNode;
  writersId?: boolean;
  notWritersId?: boolean;
  genreId?: string;
}) {
  const [allPoems, setAllPoems] = useState<payload[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [likes, setLikes] = useState<number[] | null>(null);

  const fetchLikes = async function likesRequest() {
    const result = await retrieveLikes();
    setLikes(result ?? null);
  };

  const fetchMorePosts = async function postRequest() {
    try {
      await fetch("/api/poem/infinite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          writerId,
          writersId,
          notWritersId,
          genreId,
          skip: allPoems.length,
          take: 20, // Adjust the number of posts to load at once
        }),
      }).then(async (response) => {
        if (response.status == 200) {
          const newPoems: payloadType[] = await response.json();
          if (newPoems.length === 0) {
            setHasMore(false);
          } else {
            if (allPoems.length === 0) {
              setAllPoems(newPoems);
            } else {
              setAllPoems((oldPoems) => {
                return [...oldPoems, ...newPoems];
              });
            }
          }
        }
      });
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
    return () => {
      setAllPoems([]);
      setHasMore(true);
    };
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={allPoems.length} //This is important field to render the next data
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<h4 className="mx-auto w-max">Loading... Pull down to refresh</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>
              Yay! You have seen it all{" "}
              <button
                onClick={async () => {
                  setAllPoems([]);
                  setHasMore(true);
                  await fetchMorePosts();
                }}
                className="text-gray-900 border border-black px-1 hover:text-black transition-all"
              >
                Refresh
              </button>{" "} or Pull down
            </b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={async () => {
          setAllPoems([]);
          setHasMore(true);
          await fetchMorePosts();
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
        <div className="select-none">
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
