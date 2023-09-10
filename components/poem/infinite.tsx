// components/InfiniteScroll.js

import React, { useState, useEffect } from "react";
import { payload as payloadType } from "@/components/poem/view";
import ViewPoem from "@/components/poem/view";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Infinite()  {
  const [poems, setPoems] = useState<payloadType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);


  const fetchMorePosts = async () => {
    console.log(poems.length);
    
    try {
      fetch("api/poem/infinite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skip: poems.length === 0 ? 0 :  skip,
          take: 2, // Adjust the number of posts to load at once
        }),
      }).then(async (response) => {
        console.log("success");
        console.log(response.status);
        
        
        if (response.status == 200) {
          const newPoems: payloadType[] = await response.json();
          
          if (newPoems.length === 0) {
            setHasMore(false);
          } else {
            setPoems((prevPosts) => [...prevPosts, ...newPoems]);
            setSkip((prevSkip) => prevSkip + newPoems.length);
          }
        }
      });
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
}
    useEffect(() => {
      fetchMorePosts();
    }, []);

    return (
      <>
        <InfiniteScroll
          dataLength={poems.length} //This is important field to render the next data
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {poems.map((value: payloadType, index) => {
            return <ViewPoem key={index} payload={value} />;
          })}
        </InfiniteScroll>
      </>
    );
  
};
// export default InfiniteScroll;
