"use client";

import Infinite from "@/components/poem/infinite";
import { useEffect, useState } from "react";
import { useSession, getSession, SessionProvider } from "next-auth/react";

export default function writer({ params }: { params: { slug: string } }) {
  const [username, setUsername] = useState<{
    username: string;
    id: number;
  }>();

  useEffect(() => {
    // fetch("api/writer/retrieve")
    if (typeof window !== "undefined") {
      const url = new URL("api/writer/retrieve", window.location.origin);

      url.search = new URLSearchParams(params).toString();

      fetch(url).then(async (response) => {
        const writer: { username: string; id: number } = await response.json();
        setUsername(writer);
      });
    }
  }, []);

  return (
    <div className="h-max">
      <SessionProvider>
        {username && <Infinite writerId={username.id} />}
      </SessionProvider>
    </div>
  );
}
