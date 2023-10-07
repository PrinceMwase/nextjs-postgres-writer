import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create tags
  await prisma.tag.createMany({
    data: [
      { tag: "romance" },
      { tag: "dark" },
      { tag: "humour" },
      // Add more tags as needed
    ],
  });

  // Create users
  await prisma.user.createMany({
    data: [
      {
        email: "user1@example.com",
        password: "password1",
        // Add more user data as needed
      },
      {
        email: "user2@example.com",
        password: "password2",
        // Add more user data as needed
      },
      // Add more users as needed
    ],
  });

  // Create writers
  await prisma.writer.createMany({
    data: [
      {
        username: "writer1",
        userId: 1,
        // Add more writer data as needed
      },
      {
        username: "writer2",
        userId: 2,
        // Add more writer data as needed
      },
      // Add more writers as needed
    ],
  });

  // Create poems
  await prisma.poem.createMany({
    data: [
      {
        title: "Poem1",
        content: { key: "value" }, // JSON content
        background: "Background1",
        writerId: 1,
        // Add more poem data as needed
      },
      {
        title: "Poem2",
        content: { key: "value" }, // JSON content
        background: "Background2",
        writerId: 2,
        // Add more poem data as needed
      },
      // Add more poems as needed
    ],
  });

  // Create comments
  await prisma.comment.createMany({
    data: [
      {
        content: "Comment1",
        writerId: 1,
        poemId: 1,
        // Add more comment data as needed
      },
      {
        content: "Comment2",
        writerId: 2,
        poemId: 2,
        // Add more comment data as needed
      },
      // Add more comments as needed
    ],
  });

  // Create poem likes
  await prisma.poemLike.createMany({
    data: [
      {
        userId: 1,
        poemId: 1,
        // Add more poem like data as needed
      },
      {
        userId: 2,
        poemId: 2,
        // Add more poem like data as needed
      },
      // Add more poem likes as needed
    ],
  });

  // Create writer likes
  await prisma.writerLike.createMany({
    data: [
      {
        userId: 1,
        writerId: 1,
        // Add more writer like data as needed
      },
      {
        userId: 2,
        writerId: 2,
        // Add more writer like data as needed
      },
      // Add more writer likes as needed
    ],
  });

  // Create user tags
  await prisma.userTags.createMany({
    data: [
      {
        userId: 1,
        tagId: 1,
        // Add more user tag data as needed
      },
      {
        userId: 2,
        tagId: 2,
        // Add more user tag data as needed
      },
      // Add more user tags as needed
    ],
  });

  // Create genres
  await prisma.genre.createMany({
    data: [
      {
        genre: "limerick",
        photoId: 1,
        // Add more genre data as needed
      },
      {
        genre: "sonnet",
        photoId: 2,
        // Add more genre data as needed
      },
      // Add more genres as needed
    ],
  });

  // Create photos
  await prisma.photo.createMany({
    data: [
      {
        link: "photo1.jpg",
        // Add more photo data as needed
      },
      {
        link: "photo2.jpg",
        // Add more photo data as needed
      },
      // Add more photos as needed
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
