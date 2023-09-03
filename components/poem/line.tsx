import { DragEvent, useState } from "react";

export default function Line({ text, index }: { text: string; index: number }) {
  const [color, setColor] = useState("#000000");

  const [align, setAlign] = useState<"left" | "right" | "center">("center");

  const handleAlign = (position: "left" | "right") => {
    if (align === "center" || align === position) {
      setAlign(position);
    } else {
      setAlign("center");
    }
  };

  return (
    <div>
      <p style={{ color, textAlign: align }} className="text-lg font-medium font-zapf">
        <span className="cursor-pointer" onClick={() => handleAlign("left")}>
          {" "}
          &lt;{" "}
        </span>
        <label
          className="rounded-full border cursor-pointer font-sans"
          style={{ color, backgroundColor: color }}
          htmlFor={"line" + index}
        >
          {" "}
          ++
        </label>
        <input
          type="color"
          id={"line" + index}
          value={color}
          name={"line" + index}
          hidden
          onChange={(e) => setColor(e.currentTarget.value)}
        />{" "}
        {text}{" "}
        <span className="cursor-pointer" onClick={() => handleAlign("right")}>
          {" "}
          &gt;{" "}
        </span>
      </p>
    </div>
  );
}
