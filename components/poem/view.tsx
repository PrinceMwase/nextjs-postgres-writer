import { payload } from "./create";
import { Read } from "./line";

export default function ViewPoem(Payload:any ) {
  const myPayload: payload =  Payload.payload;
  
  return (
    <div className={`${myPayload.background == "dark" ? "bg-slate-900" : "bg-slate-50"} px-4 py-8 sm:px-16 w-full`}>

    <div className="w-full my-5">

      <article className={`h-full lg:w-fit w-full m-auto overflow-auto  block`}>
        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <a className="no-underline hover:underline font-bold  py-4 block" style={{"color": myPayload.background == "light" ? "#000000" : "#ffffff"}} href="#">
              {myPayload.title}
            </a>
          </h1>
          <p className="text-white text-sm">11/1/19</p>
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
            <i className="fa fa-heart"></i>
          </a>
        </footer>
      </article>
    </div>

    </div>
  );
}
