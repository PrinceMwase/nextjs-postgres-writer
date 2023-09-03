import { useState } from "react";

export default function Line({text, index}: {text: string, index:number}) {
  const [color, setColor] = useState("#000000");
  return (
    <p style={{color}}>

    <label className="rounded-full border" style={{color, backgroundColor:color}} htmlFor={'line'+index}>{"_"}</label>
    <input
        type="color"
        id={'line'+index}
        value={color}
        name={'line'+index}
        hidden
        onChange={(e) => setColor(e.currentTarget.value)}
      />
      {" "}
      {text}
      {" "}
    </p>
  );
}
