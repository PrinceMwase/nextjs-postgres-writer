import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function WriterMute({
  poemId,
  isMute,
}: {
  poemId: number;
  isMute: boolean;
}) {
  const [mute, setMute] = useState<boolean>(isMute);
  const [loading, setLoading] = useState<boolean>(false);

  const request = function toggleWriterLike() {
    setLoading(true)
    fetch("/api/writer/mutes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poemId,
      }),
    }).then( (response) =>{
        if(response.status == 200){
            
            setMute(true)
        }
        return response
    } ).catch((error)=>{
        
        toast.error('something happened')
        
    }).finally(()=>{
        setLoading(false)
    })
  };

  return <button disabled={loading}  onClick={request}>{mute ? "muted" : "not mute"}</button>;
}
