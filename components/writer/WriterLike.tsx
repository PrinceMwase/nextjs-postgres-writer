import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function WriterLike({
  poemId,
  isLiked,
}: {
  poemId: number;
  isLiked: boolean;
}) {
  const [like, setLike] = useState<boolean>(isLiked);
  const [loading, setLoading] = useState<boolean>(false);

  

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
            
            setLike(true)
        }
        return response
    } ).catch((error)=>{
        
        toast.error('something happened')
    }).finally(()=>{
        setLoading(false)
    })
  };

  return <button disabled={loading} onClick={request}>{like ? "liked" : "not liked"}</button>;
}
