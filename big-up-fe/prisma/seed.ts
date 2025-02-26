import { faker } from "@faker-js/faker";
import fetch from "node-fetch";
import prisma from "../lib/prisma";

interface RandomUserResponse {
  results: [
    {
      picture: {
        large: string;
      };
    },
  ];
}

async function fetchRandomAvatar() {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = (await response.json()) as RandomUserResponse;
    return data.results[0].picture.large;
  } catch (error) {
    console.error("Error fetching avatar:", error);
    return "https://via.placeholder.com/150";
  }
}

async function seedDatabase() {
  console.log("Checking if database is already seeded...");

  const userCount = await prisma.user.count();
  if (userCount > 0) {
    console.log("Database already seeded. Skipping...");
    return;
  }

  console.log("Seeding database...");

  await prisma.bigUpType.createMany({
    data: [
      { name: "Hard Work" },
      { name: "Team Player" },
      { name: "Innovation" },
      { name: "Creativity" },
      { name: "Leadership" },
    ],
  });

  console.log("BigUpTypes seeded.");

  const employees = [];
  for (let i = 0; i < 100; i++) {
    employees.push({
      fullName: faker.person.fullName(),
      imageUrl: await fetchRandomAvatar(),
      uniqueId: faker.string.uuid(),
      officeName: faker.location.city(),
      departmentName: faker.commerce.department(),
    });
  }

  await prisma.user.createMany({ data: employees });
  console.log("100 Employees seeded successfully.");

  const allUsers = await prisma.user.findMany();
  const bigUpTypes = await prisma.bigUpType.findMany();

  const recognitions = [];
  for (let i = 0; i < 50; i++) {
    const sender = faker.helpers.arrayElement(allUsers);
    let recipient = faker.helpers.arrayElement(allUsers);
    while (recipient.id === sender.id) {
      recipient = faker.helpers.arrayElement(allUsers);
    }

    recognitions.push({
      message: faker.hacker.phrase(),
      description: faker.lorem.sentence(),
      senderId: sender.id,
      recipientId: recipient.id,
      typeId: faker.helpers.arrayElement(bigUpTypes).id,
    });
  }

  await prisma.recognition.createMany({ data: recognitions });
  console.log("50 Recognitions seeded successfully.");
}

seedDatabase()
  .catch((e) => {
    console.error("Error while seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
