import { DragEvent, useState } from "react";
import { LineType } from "types/poem";



export function Read({
  text,
  color,
  textAlign,
}: {
  text: string;
  color: string;
  textAlign: "left" | "right" | "center";
}) {
  return (
    <div>
      <p
        style={{ color, textAlign }}
        className="text-sm font-semibold font-zapf overflow-auto w-full"
      >
        {text}
      </p>
    </div>
  );
}

export default function Line({
  text = "",
  index = 0,
  confirm = false,
  theme = "light",
}: LineType) {
  // line color
  const [color, setColor] = useState(theme == "light" ? "#000000" : "#ffffff");

  //line alignment
  const [align, setAlign] = useState<"left" | "right" | "center">("left");

  //set alignment
  const handleAlign = (position: "left" | "right") => {
    if (align === "center" || align === position) {
      setAlign(position);
    } else {
      setAlign("center");
    }
  };

  return (
    <>
      <p
        style={{ color, textAlign: align }}
        className="text-sm font-semibold font-zapf"
      >
        {!confirm && (
          <>
            <span
              className="cursor-pointer mx-2"
              onClick={() => handleAlign("left")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 inline h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                />
              </svg>
            </span>
            <span
              className="cursor-pointer mx-2"
              onClick={() => handleAlign("right")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 inline h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                />
              </svg>
            </span>
          </>
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
          <label
            className="rounded-full border m-2 cursor-pointer font-sans"
            style={{ color, backgroundColor: color }}
            htmlFor={`${index}line${align}`}
          >
            {" "}
            ++
          </label>
        )}
      </p>
    </>
  );
}
