import { DragEvent, useState } from "react";

type LineType = {
  text: string;
  index: number;
  confirm: boolean;
  theme: "light" | "dark";
  readonly:boolean
};


export function Read({text, color, textAlign}: {text: string, color:string, textAlign: "left" | "right" | "center"}){


  return <div>

    <p
      style={{ color, textAlign }}
      className="text-lg font-light font-zapf overflow-auto w-full"
    >
{text}
    </p>

  </div>
}

export default function Line({ text='', index=0, confirm=false, theme="light"}: LineType) {
  // line color
  const [color, setColor] = useState(theme == "light" ? "#000000" : "#ffffff");

  //line alignment
  const [align, setAlign] = useState<"left" | "right" | "center">("center");

  //set alignment
  const handleAlign = (position: "left" | "right") => {
    if (align === "center" || align === position) {
      setAlign(position);
    } else {
      setAlign("center");
    }
  };

 
  return (
    <div>
      <p
        style={{ color, textAlign: align }}
        className="text-lg font-light font-zapf"
      >
        {!confirm && (
          <span className="cursor-pointer" onClick={() => handleAlign("left")}>
            {" "}
            &lt;{" "}
          </span>
        )}
        {!confirm && (
          <label
            className="rounded-full border cursor-pointer font-sans"
            style={{ color, backgroundColor: color }}
            htmlFor={`${index}line${align}`}
          >
            {" "}
            ++
          </label>
        )}
        <input
          type="color"
          id={`${index}line${align}`}
          value={color}
          name={`${index}line${align}`}
          hidden
          onChange={(e) => setColor(e.currentTarget.value)}
        />{" "}
        {text}{" "}
        {!confirm && (
          <span className="cursor-pointer" onClick={() => handleAlign("right")}>
            {" "}
            &gt;{" "}
          </span>
        )}
      </p>
    </div>
  );
}
