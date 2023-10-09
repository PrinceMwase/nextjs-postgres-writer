import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function WriterLike({
  poemId,
  isLiked,
}: {
  poemId: number;
  isLiked: boolean;
}) {
  const [like, setLike] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLike(isLiked);
  }, []);

  const request = function toggleWriterLike() {
    setLoading(true)
    fetch("/api/writer/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poemId,
      }),
    }).then( (response) =>{
        if(response.status == 200){
            setLoading(false)
            setLike(true)
        }
        return response
    } ).catch((error)=>{
        setLoading(false)
        toast.error('something happened')
    })
  };

  return <button onClick={request}>{like ? "liked" : "not liked"}</button>;
}
