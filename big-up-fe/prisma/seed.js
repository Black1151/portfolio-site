// const { PrismaClient } = require("@prisma/client");
// const { faker } = require("@faker-js/faker");

// const prisma = new PrismaClient();

// async function fetchRandomAvatar() {
//   try {
//     const fetch = (await import("node-fetch")).default;
//     const response = await fetch("https://randomuser.me/api/");
//     const data = await response.json();
//     return data.results[0].picture.large;
//   } catch (error) {
//     console.error("Error fetching avatar:", error);
//     return "https://via.placeholder.com/150";
//   }
// }

// async function seedDatabase() {
//   console.log("Checking if database is already seeded...");

//   const userCount = await prisma.user.count();
//   if (userCount > 0) {
//     console.log("Database already seeded. Skipping...");
//     return;
//   }

//   console.log("Seeding database...");

//   await prisma.bigUpType.createMany({
//     data: [
//       { name: "Hard Work" },
//       { name: "Team Player" },
//       { name: "Innovation" },
//       { name: "Creativity" },
//       { name: "Leadership" },
//     ],
//   });

//   console.log("BigUpTypes seeded.");

//   const employees = [];
//   for (let i = 0; i < 100; i++) {
//     employees.push({
//       fullName: faker.person.fullName(),
//       imageUrl: await fetchRandomAvatar(),
//       uniqueId: faker.string.uuid(),
//       officeName: faker.location.city(),
//       departmentName: faker.commerce.department(),
//     });
//   }

//   await prisma.user.createMany({ data: employees });
//   console.log("100 Employees seeded successfully.");

//   const allUsers = await prisma.user.findMany();
//   const bigUpTypes = await prisma.bigUpType.findMany();

//   const recognitions = [];
//   for (let i = 0; i < 50; i++) {
//     const sender = faker.helpers.arrayElement(allUsers);
//     let recipient = faker.helpers.arrayElement(allUsers);
//     while (recipient.id === sender.id) {
//       recipient = faker.helpers.arrayElement(allUsers);
//     }

//     recognitions.push({
//       message: faker.hacker.phrase(),
//       description: faker.lorem.sentence(),
//       senderId: sender.id,
//       recipientId: recipient.id,
//       typeId: faker.helpers.arrayElement(bigUpTypes).id,
//     });
//   }

//   await prisma.recognition.createMany({ data: recognitions });
//   console.log("50 Recognitions seeded successfully.");
// }

// seedDatabase()
//   .catch((e) => {
//     console.error("Error while seeding database:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function fetchRandomAvatar() {
  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data.results[0].picture.large;
  } catch (error) {
    console.error("Error fetching avatar:", error);
    return "https://via.placeholder.com/150";
  }
}

async function seedDatabase() {
  console.log("Checking if database is already seeded...");

  const allUsers = await prisma.user.findMany();
  console.log("Fetched Users:", allUsers.length);

  console.log("Using database:", process.env.DATABASE_URL);

  const userCount = await prisma.user.count();
  if (userCount > 0) {
    console.log("Database already seeded. Skipping...");
    return;
  }

  console.log("Seeding database...");

  try {
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
  } catch (error) {
    console.error("Error inserting BigUpTypes:", error);
  }

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

  console.log("Generated Employees:", employees.length);

  try {
    await prisma.user.createMany({ data: employees });
    console.log("100 Employees seeded successfully.");
  } catch (error) {
    console.error("Error inserting Employees:", error);
  }

  // const allUsers = await prisma.user.findMany();
  const bigUpTypes = await prisma.bigUpType.findMany();

  console.log("Fetched Users:", allUsers.length);
  console.log("Fetched BigUpTypes:", bigUpTypes.length);

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

  console.log("Generated Recognitions:", recognitions.length);

  try {
    await prisma.recognition.createMany({ data: recognitions });
    console.log("50 Recognitions seeded successfully.");
  } catch (error) {
    console.error("Error inserting Recognitions:", error);
  }
}

seedDatabase()
  .catch((e) => {
    console.error("Error while seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
