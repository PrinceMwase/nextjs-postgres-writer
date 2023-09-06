"use client";
import Create, { payload as payloadType } from "@/components/poem/create";
import ViewPoem from "@/components/poem/view";
import { log } from "console";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [poems, setPoems] = useState<payloadType[]>([]);
 

    useEffect(() => {
      fetch("api/poem/retrieve", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
    
          
          if(response.status == 200){
            
            const results: payloadType[] = await response.json()

            setPoems( results );
            
          }
          
          if(response.status == 404){
            toast.error("Failed to  load poems");
          }
        })
        .catch(() => {
          toast.error("Failed to  load poems");
        });
    }, [])
    

  return( <div className="h-screen">

    <Create />
    {
      poems.map( (value: payloadType, index)=>{
        return <ViewPoem key={index} payload={value} />
      })
     
    }
    
  </div>)
}
