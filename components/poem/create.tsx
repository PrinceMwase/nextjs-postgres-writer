"use client";
import { FormEvent, useState } from "react";
import Line from "@/components/poem/line";
import toast from "react-hot-toast";

type LineProperty = {
  line: string;
  align: "left" | "right" | "center";
  color: string;
};

export type payload = {
  background: "light" | "dark";
  lines: LineProperty[];
  title: string;
};

export default function CreatePoem() {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [preview, setPreview] = useState<boolean>(false);
  const [confirm, setConfirmation] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')
 


  return (
    <form
      className="bg-gray-50 px-4 py-8 sm:px-16 flex-auto w-full"
      onSubmit={(e: FormEvent) => {
        
        e.preventDefault();
        setLoading(true);

        const lines = content?.split("\n");

        if (lines === undefined) {
          return;
        }

        let thisPayload: payload = {
          background: theme,
          lines: [],
          title: '',
        };
        let target = e.target as HTMLElement;
        let inputs = target.getElementsByTagName("input");

        for (let index = 0; index < inputs.length; index++) {
          // console.log(inputs[index]);
          let alignment = inputs[index].getAttribute("id")?.split("line")[1];

          if(alignment === undefined){
            return;
          }

          if(alignment === 'center' || alignment === 'left' || alignment ==='right')
            thisPayload.lines.push({
              line: lines[index],
              align: alignment ,
              color: inputs[index].value,
            });
        }
        thisPayload.title = title;

        console.log(thisPayload);

        fetch("/api/poem/create", {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify(thisPayload)
        }
        ).then( async(res)=>{
          if(res.status === 200){
            toast.success("Posted...");
          }else{
            setLoading(false);
            const { error } = await res.json();
            toast.error(error);
          }
          
        } )


      }}
    >
      <div>
        <label
          htmlFor="content"
          className="block text-xs text-gray-600 uppercase"
        >
          Compose
        </label>
        <div className="h-96 w-full my-5 ">
          {!preview && (
            <textarea
              id="content"
              name="content"
              placeholder="What's on your mind?"
              required
              value={content}
              onChange={(e) => {
                setContent(e.currentTarget.value);
              }}
              className="my-1 block w-full appearance-none rounded-md border h-full border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            ></textarea>
          )}
          {preview && (
            <div
              className={`h-full lg:w-fit w-max m-auto  overflow-auto p-8 ${
                theme == "dark" ? "bg-slate-900" : "bg-slate-50"
              }`}
            >
              <span className="font-bold  py-4 block" style={{"color": theme == "light" ? "#000000" : "#ffffff"}}>{title}</span>
              {content?.split("\n")?.map(function (e: string, index) {
                return (
                  <Line
                    key={index}
                    index={index}
                    confirm={confirm}
                    text={e}
                    theme={theme}
                    readonly={false}
                  />
                );
              })}
            </div>
          )}
        </div>

        {!preview && <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" placeholder="Title" name="title" id="title" className="my-1 block w-full appearance-none rounded-md border h-full border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm" />}
        {!confirm && (
          <button
            className="h-10 px-6 font-semibold rounded-md bg-black text-white"
            onClick={() => setPreview((value) => !value)}
            type="button"
          >
            {" "}
            {preview ? "Edit" : "Preview"}
          </button>
        )}
        {preview && (
          <button
            onClick={(e) => {
              if(!confirm){
              e.preventDefault()
              setConfirmation(()=>true);

              }
              
            }}
            className="h-10 px-6 font-semibold border rounded-md bg-white text-black"
             type="submit"
          >
            {" "}
            {confirm ? "Post" : "Confirm?"}{" "}
          </button>
        )}
      </div>
    </form>
  );
}
