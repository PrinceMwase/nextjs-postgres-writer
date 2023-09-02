import { useState } from "react";

export default function Line({text}: string) {
  const [color, setColor] = useState("#ffff");
  return (
    <p>
    <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.currentTarget.value)}
      />
      {" "}
      {text}{" "}
      {" "}
    </p>
  );
}
