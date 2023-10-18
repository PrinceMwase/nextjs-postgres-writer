import prisma from "@/lib/prisma"
import Image from "next/image";

export default async function Genres() {
    const genres = await prisma.genre.findMany({
      select:{
        photo: {
          select:{
            link: true
          }
        },
        genre: true
      }
    })
  return (
    <div className="p-10 h-screen">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {genres.map((genre, index) => (
            <div key={index} className="">
              <Image
                src={genre.photo.link}
                alt={`${genre.genre} Thumbnail`}
                className="mx-auto mb-4"
                width={100}
                height={100}
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <h2 className="text-md text-center capitalize font-semibold mb-2">{genre.genre}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
