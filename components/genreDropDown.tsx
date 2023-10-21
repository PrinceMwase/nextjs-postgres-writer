import {
  useState,
  useEffect,
  DetailedHTMLProps,
  SelectHTMLAttributes,
} from "react";
import { genreType } from "types/genre";

export default function genreDropDown({
  ...args
}: DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>) {
  const [genres, setGenres] = useState<genreType[]>([]);

  const retrieve = async function retrieveGenres() {
    fetch("/api/genres", {
      method: "GET",
    }).then(async (response) => {
      const data = await response.json();

      setGenres(data.genres);
    });
  };
  useEffect(() => {
    retrieve();
  }, []);

  return (
    <select {...args}>
      <option value="null" selected disabled>
        Genre
      </option>
      {genres.map((value, index) => {
        return (
          <option key={index} className="capitalize" value={value.id}>
            {value.genre}
          </option>
        );
      })}
    </select>
  );
}
