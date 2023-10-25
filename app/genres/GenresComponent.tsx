import Image from "next/image";

import Link from "next/link";

export default function GenresComponent({
  genre,
}: {
  genre: {
    genre: string;
    photo: {
      link: string;
    };
  };
}) {
  return (
    <Link href={`/genres/${genre.genre}`}>
      <div>
        <Image
          src={genre.photo.link}
          alt={`${genre.genre} Thumbnail`}
          className="mx-auto mb-1 text-white transition-all duration-300"
          width={100}
          height={100}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <h2 className="text-sm text-center capitalize font-semibold mb-4">
          {genre.genre}
        </h2>
      </div>
    </Link>
  );
}
