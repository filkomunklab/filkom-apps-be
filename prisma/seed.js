const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // CREATE ADMIN
  await prisma.admin.create({
    data: {
      email: "admin@mail.com",
      username: "admin",
      password: "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      role: "ADMIN",
    },
  });

  // CREATE SUPER_ADMIN
  await prisma.admin.create({
    data: {
      email: "super_admin@mail.com",
      username: "superadmin",
      password: "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      role: "SUPER_ADMIN",
    },
  });

  // CREATE ADMIN_LPMI
  await prisma.admin.create({
    data: {
      email: "admin_lpmi@mail.com",
      username: "adminlpmi",
      password: "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      role: "ADMIN_LPMI",
    },
  });

  // Create Lecturer
  await prisma.aKAD_Lecturer.createMany({
    data: [
      {
        firstName: "Andrew T",
        lastName: "Liem",
      },
      {
        firstName: "Oktaverano H",
        lastName: "Lengkong",
      },
      {
        firstName: "Green F",
        lastName: "Mandias",
      },
      {
        firstName: "Stenly R",
        lastName: "Pungus",
      },
      {
        firstName: "Semmy W",
        lastName: "Taju",
      },
      {
        firstName: "Reymon",
        lastName: "Rotikan",
      },
      {
        firstName: "Joe Yuan Y",
        lastName: "Mambu",
      },
      {
        firstName: "Jimmy H",
        lastName: "Moedjahedy",
      },
      {
        firstName: "Jein",
        lastName: "Rewah",
      },
      {
        firstName: "Reynoldus A",
        lastName: "Sahulata",
      },
      {
        firstName: "Rolly J",
        lastName: "Lontaan",
      },
      {
        firstName: "Steven",
        lastName: "Lolong",
      },
      {
        firstName: "Stenly I",
        lastName: "Adam",
      },
      {
        firstName: "Debby E",
        lastName: "Sondakh",
      },
      {
        firstName: "Edson Y",
        lastName: "Putra",
      },
      {
        firstName: "Marchel T",
        lastName: "Tombeng",
      },
      {
        firstName: "Andria K",
        lastName: "Wahyudi",
      },
      {
        firstName: "Jacquline",
        lastName: "Waworundeng",
      },
      {
        firstName: "Green A",
        lastName: "Sandag",
      },
      {
        firstName: "Lidya C",
        lastName: "Laoh",
      },
      {
        firstName: "Raissa C",
        lastName: "Maringka",
      },
      {
        firstName: "Andrew",
        lastName: "Tambunan",
      },
      {
        firstName: "George W",
        lastName: "Tangka",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch(async (e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
