"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { token: string } }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL("api/user/verify", window.location.origin);

      url.search = new URLSearchParams(params).toString();

      fetch(url)
        .then((response) => {
          if (response.status === 200) {
            router.push("/verification-success");
          }
        })
        .catch((error) => {
          router.push("/verification-failure");
        });
    }
  }, [params, router]);

  if (loading) {
    return <div>loading....</div>;
  }

  return <></>;
}
