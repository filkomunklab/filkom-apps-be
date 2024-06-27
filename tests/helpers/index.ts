import prisma from "@database";

const seedDatabase = async () => {
  const admin = await prisma.admin.create({
    data: {
      email: "admin@mail.com",
      username: "admin12345",
    },
  });

  return { admin };
};

const cleanDatabase = async () => {
  await prisma.$transaction([prisma.admin.deleteMany()]);
};

export { seedDatabase, cleanDatabase };
