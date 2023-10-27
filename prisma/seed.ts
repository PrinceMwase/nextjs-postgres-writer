import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allGenres = [
    "allegory",
    "aubade",
    "ballad",
    "blason",
    "cento",
    "dirge",
    "eclogue",
    "ekphrasis",
    "elegy",
    "epic",
    "epigram",
    "epitaph",
    "epithalamion",
    "fable",
    "form",
    "georgic",
    "haiku",
    "hymn",
    "invective",
    "lament",
    "light verse",
    "limerick",
    "lyric",
    "masque",
    "monologue",
    "occasional",
    "ode",
    "paean",
    "palinode",
    "panegyric",
    "parody",
    "pastoral",
    "psalm",
    "romance",
    "sonnet",
  ];

  // Create tags
  console.log("seeding Tags");
  
  await prisma.tag.createMany({
    data: [
      { tag: "romance" },
      { tag: "dark" },
      { tag: "humour" },
      // Add more tags as needed
    ],
  });

  console.log("finished seeding Tags");
  
  console.log("seeding Genres and photos");
  
  allGenres.forEach(async (genre) => {
    console.log(`Inserting ${genre}`);
    
    await prisma.genre.create({
      data: {
        genre: genre,
        photo: {
          create: {
            link: `/genres/${genre}.jpeg`,
          },
        },
      },
    });
  });

  console.log("Finished Seeding");
  
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
