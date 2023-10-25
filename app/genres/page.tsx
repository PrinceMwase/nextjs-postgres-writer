import prisma from "@/lib/prisma";
import GenresComponent from "./GenresComponent";

export default async function Genres() {
  const genres = await prisma.genre.findMany({
    select: {
      photo: {
        select: {
          link: true,
        },
      },
      genre: true,
    },
  });
  return (
    <div className="py-10 px-4 h-screen">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {genres.map((genre, index) => (
            <GenresComponent genre={genre} />
          ))}
        </div>
      </div>
    </div>
  );
}
