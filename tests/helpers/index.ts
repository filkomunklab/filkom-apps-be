import prisma from "@database";
import { faker } from "@faker-js/faker";

const seedDatabase = async () => {
  const admin = await prisma.admin.create({
    data: {
      email: "admin@mail.com",
      username: "admin12345",
    },
  });

  const employees = await prisma.employee.createManyAndReturn({
    data: Array.from({ length: 10 }).map(() => ({
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      nik: faker.number.int({ min: 100 }).toString(),
    })),
  });

  return { admin, employees };
};

const cleanDatabase = async () => {
  await prisma.$transaction([
    prisma.admin.deleteMany(),
    prisma.employee.deleteMany(),
  ]);
};

export { seedDatabase, cleanDatabase };
