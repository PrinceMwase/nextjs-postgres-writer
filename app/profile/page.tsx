"use client";
import { useState, useEffect } from "react";
import WriterProfile from "@/components/writer/Profile";
import Infinite from "@/components/poem/infinite";

export default function Profile() {
  const [username, setUsername] = useState<{
    username: string;
    id: number;
  }>();

  useEffect(() => {
    fetch("api/writer/profile").then(async (response) => {
      const writer: { username: string; id: number } = await response.json();
      setUsername(writer);
    });
  }, []);

  return (
    <div className="h-max">
      {username && (
        <Infinite writerId={username.id}>
          <WriterProfile username={username.username} />
        </Infinite>
      )}
    </div>
  );
}
