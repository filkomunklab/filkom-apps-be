import prisma from "@database";
import { faker } from "@faker-js/faker";
import { Gender } from "@prisma/client";

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

  const students = await prisma.student.createManyAndReturn({
    data: Array.from({ length: 10 }).map(() => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      nim: faker.number.int({ min: 100 }).toString(),
      gender: faker.string.fromCharacters(Object.keys(Gender)) as Gender,
    })),
  });

  return { admin, employees, students };
};

const cleanDatabase = async () => {
  await prisma.$transaction([
    prisma.admin.deleteMany(),
    prisma.employee.deleteMany(),
    prisma.student.deleteMany(),
  ]);
};

export { seedDatabase, cleanDatabase };
