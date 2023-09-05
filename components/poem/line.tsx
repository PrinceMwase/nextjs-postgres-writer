import { DragEvent, useState } from "react";

export default function Line({ text, index, confirm }: { text: string; index: number, confirm: boolean }) {

  // line color
  const [color, setColor] = useState("#000000");

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
      <p style={{ color, textAlign: align }} className="text-lg font-medium font-zapf hover:translate-y-1 hover:translate-x-2 ">
        {!confirm && <span className="cursor-pointer" onClick={() => handleAlign("left")}>
          {" "}
          &lt;{" "}
        </span>}
        {!confirm && <label
          className="rounded-full border cursor-pointer font-sans"
          style={{ color, backgroundColor: color }}
          htmlFor={`${index}line${align}`}
        >
          {" "}
          ++
        </label>}
        <input
          type="color"
          id={`${index}line${align}`}
          value={color}
          name={`${index}line${align}`}
          hidden
          onChange={(e) => setColor(e.currentTarget.value)}
        />{" "}
        {text}{" "}
        {!confirm && <span className="cursor-pointer" onClick={() => handleAlign("right")}>
          {" "}
          &gt;{" "}
        </span>}
      </p>
    </div>
  );
}
