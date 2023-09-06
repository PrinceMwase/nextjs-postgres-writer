"use client";
import Create, { payload as payloadType } from "@/components/poem/create";
import Infinite from "@/components/poem/infinite";
export default function Home() {

  return( <div className="h-screen">

    <Create />
    <Infinite/>
    
    
  </div>)
}
