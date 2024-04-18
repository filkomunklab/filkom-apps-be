const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
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
