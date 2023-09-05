"use client";
import { useState } from "react";
import Line from "@/components/poem/line"
// write
// edit
// post



export default function CreatePoem() {
  const [content, setContent] = useState<string>();
  const [preview, setPreview] = useState<boolean>(false);
  const [confirm, setConfirmation] = useState<boolean>(false);


  return (
    <form action="" method="post" className="bg-gray-50 px-4 py-8 sm:px-16 flex-auto w-full" onSubmit={
      (e)=>{
        e.preventDefault();console.log(e); console.log(content);
        
    }}>
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          Compose
        </label>
        <br />
        <div className="h-96 w-full">
            {!preview && <textarea
          id="content"
          name="content"
          placeholder="What's on your mind?"
          required
          value={content}
          onChange={(e) => {setContent(e.currentTarget.value );}}
          className="mt-1 block w-full appearance-none rounded-md border h-full border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        ></textarea>}
        <div className="h-full w-full overflow-auto py-8">
          {preview && content?.split("\n")?.map(function (e: string, index) {
           
            return <Line key={index} index={index} confirm={confirm} text={e}/>

          })}
        </div>
        </div>
      
        { !confirm && <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={()=>setPreview((value)=>!value)} type="button"> {preview ? "Edit" : "Preview"}</button>}
        {preview && <button onClick={ ()=>{setConfirmation(true)} } className="h-10 px-6 font-semibold border rounded-md bg-white text-black" type={confirm ? "submit" : "button"} > {confirm ? "Post" : "Confirm?"} </button>}
      </div>
    </form>
  );
}
