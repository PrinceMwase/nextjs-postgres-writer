'use client'

import { Read } from "./line";

type LineProperty = {
  line: string;
  align: "left" | "right" | "center";
  color: string;
};

type payload = {
  background: "light" | "dark";
  lines: LineProperty[];
  title: string;
  date: Date;
};
export default function ViewPoem(Payload:any ) {
  const myPayload: payload =  Payload.payload;
  const color =  myPayload.background == "light" ? "#000000" : "#ffffff";
  
  return (
    <div className={`${myPayload.background == "dark" ? "bg-slate-900" : "bg-slate-50"} px-4 py-8 sm:px-16 w-full`}>

    <div className="w-full my-5">

      <article className={`h-full lg:w-fit w-full m-auto overflow-auto  block`}>
        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <a className="no-underline hover:underline font-bold  py-4 block" style={{color}} href="#">
              {myPayload.title}
            </a>
          </h1>
          <p className="text-white text-sm" style={{color}}>{myPayload.date.toString().split('T')[0]}</p>
        </header>
            
        {
          myPayload?.lines?.map( (line, index) =>{
            return <Read key={index} text={line.line} color={line.color} textAlign={line.align}  />
          } )
        }

        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
          <a
            className="flex items-center no-underline hover:underline text-white"
            href="#"
          >
            <p className="ml-2 text-sm">Author Name</p>
          </a>
          <a className="no-underline text-white hover:text-red-dark" href="#">
            <span className="hidden">Like</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>


          </a>
        </footer>
      </article>
    </div>

    </div>
  );
}
