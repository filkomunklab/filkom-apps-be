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

  // CREATE STUDENT
  await prisma.student
    .create({
      data: {
        nim: "student",
        studentEmail: "student@mail.com",
        firstName: "John",
        lastName: "Doe",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student.createMany({
    data: [
      {
        nim: "10502201001",
        studentEmail: "s2200001@student.unklab.ac.id",
        firstName: "Angel Triany",
        lastName: "Pangkey",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201002",
        studentEmail: "s2200002@student.unklab.ac.id",
        firstName: "Brenda",
        lastName: "Rambi",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201003",
        studentEmail: "s2200003@student.unklab.ac.id",
        firstName: "Darel",
        lastName: "Yuhu",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201004",
        studentEmail: "s2200004@student.unklab.ac.id",
        firstName: "Shyereal",
        lastName: "Saerang",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201005",
        studentEmail: "s2200005@student.unklab.ac.id",
        firstName: "Marika",
        lastName: "Connechy",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201006",
        studentEmail: "s2200006@student.unklab.ac.id",
        firstName: "Delphinia",
        lastName: "Leggatt",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201007",
        studentEmail: "s2200007@student.unklab.ac.id",
        firstName: "Dannye",
        lastName: "MacNeilage",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201008",
        studentEmail: "s2200008@student.unklab.ac.id",
        firstName: "Rozanna",
        lastName: "Ilyin",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201009",
        studentEmail: "s2200009@student.unklab.ac.id",
        firstName: "Lars",
        lastName: "Hulle",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201010",
        studentEmail: "s2200010@student.unklab.ac.id",
        firstName: "Dunn",
        lastName: "Hillan",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201011",
        studentEmail: "s2200011@student.unklab.ac.id",
        firstName: "Arlyn",
        lastName: "Schimoni",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201012",
        studentEmail: "s2200012@student.unklab.ac.id",
        firstName: "Cookie",
        lastName: "Farlambe",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201013",
        studentEmail: "s2200013@student.unklab.ac.id",
        firstName: "Stacy",
        lastName: "Bullivant",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201014",
        studentEmail: "s2200014@student.unklab.ac.id",
        firstName: "Oralia",
        lastName: "Labadini",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201015",
        studentEmail: "s2200015@student.unklab.ac.id",
        firstName: "Bethina",
        lastName: "MacKettrick",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201016",
        studentEmail: "s2200016@student.unklab.ac.id",
        firstName: "Arleyne",
        lastName: "Simonds",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201017",
        studentEmail: "s2200017@student.unklab.ac.id",
        firstName: "Julianna",
        lastName: "Extal",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201018",
        studentEmail: "s2200018@student.unklab.ac.id",
        firstName: "Dario",
        lastName: "Blagbrough",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201019",
        studentEmail: "s2200019@student.unklab.ac.id",
        firstName: "Pietra",
        lastName: "Di Biagi",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
      {
        nim: "10502201020",
        studentEmail: "s2200020@student.unklab.ac.id",
        firstName: "Derril",
        lastName: "O'Lochan",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    ],
  });

  await prisma.userRole.createMany({
    data: [
      {
        userId: "10502201001",
        role: "MAHASISWA",
      },
      {
        userId: "10502201002",
        role: "MAHASISWA",
      },
      {
        userId: "10502201003",
        role: "MAHASISWA",
      },
      {
        userId: "10502201004",
        role: "MAHASISWA",
      },
      {
        userId: "10502201005",
        role: "MAHASISWA",
      },
      {
        userId: "10502201006",
        role: "MAHASISWA",
      },
      {
        userId: "10502201007",
        role: "MAHASISWA",
      },
      {
        userId: "10502201008",
        role: "MAHASISWA",
      },
      {
        userId: "10502201009",
        role: "MAHASISWA",
      },
      {
        userId: "10502201010",
        role: "MAHASISWA",
      },
      {
        userId: "10502201011",
        role: "MAHASISWA",
      },
      {
        userId: "10502201012",
        role: "MAHASISWA",
      },
      {
        userId: "10502201013",
        role: "MAHASISWA",
      },
      {
        userId: "10502201014",
        role: "MAHASISWA",
      },
      {
        userId: "10502201015",
        role: "MAHASISWA",
      },
      {
        userId: "10502201016",
        role: "MAHASISWA",
      },
      {
        userId: "10502201017",
        role: "MAHASISWA",
      },
      {
        userId: "10502201018",
        role: "MAHASISWA",
      },
      {
        userId: "10502201019",
        role: "MAHASISWA",
      },
      {
        userId: "10502201020",
        role: "MAHASISWA",
      },
    ],
  });

  // CREATE ALUMNI
  // TODO: solve this error
  // await prisma.employee
  //   .create({
  //     data: {
  //       Address: 'Manado',
  //       phoneNum: '081287340823',
  //       email: 'alumni@test.com',
  //       firstName: "Alumni",
  //       lastName: "Alumni",
  //       nik: "alumni",
  //       password:
  //         "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
  //     },
  //   })
  //   .then(async (employee) => {
  //     await prisma.userRole.create({
  //       data: {
  //         userId: employee.nik,
  //         role: "ALUMNI",
  //       },
  //     });
  //   });

  // CREATE DOSEN
  await prisma.employee
    .create({
      data: {
        email: "dosen@test.com",
        phoneNum: "081283498",
        Address: "Manado",
        firstName: "Lecturer",
        lastName: "Dosen",
        nik: "dosen",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.nik,
          role: "DOSEN",
        },
      });
    });

  // CREATE DEKAN
  await prisma.employee
    .create({
      data: {
        Address: "Manado",
        email: "dekan@test.com",
        phoneNum: "08123874983",
        firstName: "Dekan",
        lastName: "Dekan",
        nik: "dekan",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.nik,
          role: "DEKAN",
        },
      });
    });

  // CREATE KAPRODI
  await prisma.employee
    .create({
      data: {
        Address: "Manado",
        phoneNum: "0819834412",
        email: "kaprodi@test.com",
        firstName: "Kaprodi",
        lastName: "Kaprodi",
        nik: "kaprodi",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.nik,
          role: "KAPRODI",
        },
      });
    });

  // CREATE SEKRETARIS
  await prisma.employee
    .create({
      data: {
        Address: "Manado",
        phoneNum: "08193834412",
        email: "sekretaris1@test.com",
        firstName: "Sekretaris",
        lastName: "Sekretaris",
        nik: "sekretaris",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.nik,
          role: "SEKRETARIS",
        },
      });
    });

  // CREATE REGISTER
  await prisma.employee
    .create({
      data: {
        Address: "Manado",
        phoneNum: "083834412",
        email: "register@test.com",
        firstName: "Register",
        lastName: "Register",
        nik: "register",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.nik,
          role: "REGISTER",
        },
      });
    });

  // CREATE OPERATOR
  await prisma.employee
    .create({
      data: {
        email: "operator@test.com",
        phoneNum: "08128347934",
        Address: "Manado",
        firstName: "Operator",
        lastName: "LPMI",
        nik: "operatorlpmi",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.nik,
          role: "OPERATOR_LPMI",
        },
      });
    });

  //--------------------------------------Skripsi App--------------------------------------------
  // IF
  const francesId = "1efcdc53-f12c-4683-b9ff-db6e53fe5c83";
  const geovalgaId = "9036e2e9-3601-4f00-b74a-bf4e731c9eb8";
  const angelId = "9036e2e9-3601-4f00-b74a-bf4e731c9eb1";
  const cindyID = "bc75d933-8f6b-4619-a41c-8727360a8c1e";
  const robbyID = "f3c97a48-66eb-4ac7-82a5-5dd89c83607d";
  const sitiID = "768a30f7-e02b-41ac-810d-78d8a94da49b";
  const wahyuID = "f5cfb85f-d65c-4cc5-b03f-d0c2dd29ec27";
  const nadiaID = "1c65096d-d768-48c0-9a41-4b06e28a27a3";
  // SI
  const marcelId = "9036e2e9-3601-4f00-b74a-bf4e731c9eb2";
  const leaId = "9036e2e9-3601-4f00-b74a-bf4e731c9eb3";
  const rizkyID = "7c3ab47b-3e48-4c14-bcb5-10d37cf5c50a";
  const DianaID = "4f2c8ec3-6505-438e-afdd-7f14d1c4c789";
  const ahmadID = "a5f2180b-73f5-46c1-8b77-50ec25551b64";
  const bellaID = "0ac7c7ed-bf7f-45eb-8d8e-d983af4511e7";
  const faisalID = "e6f3e7e2-e6e7-4281-a7e3-14d9e69d0f61";

  const kaprodiTIId = "2eb35687-c414-4634-b010-1b64caa1bf27";
  const kaprodiSIId = "cebd73c8-9ad9-4136-a65a-50ad7b4d5896";
  const dekanId = "9ddc8258-3fa2-40ea-8477-1a651c9039be";
  const dosen1Id = "550e8400-e29b-41d4-a716-446655440000";
  const dosen2Id = "550e8400-e29b-41d4-a716-446655440001";
  const dosen3Id = "550e8400-e29b-41d4-a716-446655440002";

  const sekretarisId = "f6b7d2b0-b7f8-4393-9027-e4374e1eea52";

  // CREATE STUDENT
  await prisma.student
    .create({
      data: {
        id: francesId,
        gender: "MALE",
        firstName: "Frances",
        lastName: "Yong",
        studentEmail: "frances@mail.com",
        nim: "105021920001",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: geovalgaId,
        gender: "MALE",
        firstName: "Geovalga",
        lastName: "Lim",
        studentEmail: "geovalga@mail.com",
        nim: "105021920002",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  // await prisma.student
  //   .create({
  //     data: {
  //       id: angelId,
  //       gender: "FEMALE",
  //       firstName: "Angel Triany",
  //       lastName: "Pangkey",
  //       studentEmail: "pangkey@mail.com",
  //       nim: "105021920003",
  //       faculty: "Fakultas Ilmu Komputer",
  //       major: "IF",
  //       password:
  //         "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
  //     },
  //   })
  //   .then(async (student) => {
  //     await prisma.userRole.create({
  //       data: {
  //         userId: student.nim,
  //         role: "MAHASISWA",
  //       },
  //     });
  //   });

  await prisma.student
    .create({
      data: {
        id: marcelId,
        gender: "MALE",
        firstName: "Marcel Eferson Putra",
        lastName: "Haerani",
        studentEmail: "haerani@mail.com",
        nim: "105021920004",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: leaId,
        gender: "FEMALE",
        firstName: "Shyereal Imanuelita",
        lastName: "Saerang",
        studentEmail: "saerang@mail.com",
        nim: "105021920005",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: rizkyID,
        gender: "MALE",
        firstName: "Rizky",
        lastName: "Wibisono",
        studentEmail: "rizky@mail.com",
        nim: "105021920006",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: DianaID,
        gender: "FEMALE",
        firstName: "Diana",
        lastName: "Setiawan",
        studentEmail: "diana@mail.com",
        nim: "105021920007",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: ahmadID,
        gender: "MALE",
        firstName: "Ahmad",
        lastName: "Sukma",
        studentEmail: "ahmad@mail.com",
        nim: "105021920008",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: bellaID,
        gender: "FEMALE",
        firstName: "Bella",
        lastName: "Putri",
        studentEmail: "bella@mail.com",
        nim: "105021920009",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: faisalID,
        gender: "MALE",
        firstName: "Faisal",
        lastName: "Saputra",
        studentEmail: "faisal@mail.com",
        nim: "105021920010",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: cindyID,
        gender: "FEMALE",
        firstName: "Cindy",
        lastName: "Lestari",
        studentEmail: "cindy@mail.com",
        nim: "105021920011",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: robbyID,
        gender: "MALE",
        firstName: "Robby",
        lastName: "Hidayat",
        studentEmail: "robby@mail.com",
        nim: "105021920012",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: sitiID,
        gender: "FEMALE",
        firstName: "Siti",
        lastName: "Hidayat",
        studentEmail: "siti@mail.com",
        nim: "105021920013",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: wahyuID,
        gender: "MALE",
        firstName: "Wahyu",
        lastName: "Saputra",
        studentEmail: "wahyu@mail.com",
        nim: "105021920014",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  await prisma.student
    .create({
      data: {
        id: nadiaID,
        gender: "FEMALE",
        firstName: "Nadia",
        lastName: "Sari",
        studentEmail: "nadia@mail.com",
        nim: "105021920015",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (student) => {
      await prisma.userRole.create({
        data: {
          userId: student.nim,
          role: "MAHASISWA",
        },
      });
    });

  // CREATE DOSEN SKRIPSI, KAPRODI IF
  await prisma.employee
    .create({
      data: {
        id: kaprodiTIId,
        Address: "Manado",
        email: "mandias@test.com",
        phoneNum: "081234567890",
        firstName: "Greeen",
        lastName: "Mandias",
        degree: "SKom, MCs",
        nik: "1001",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK", "KAPRODI"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.nik,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN SKRIPSI, KAPRODI SI
  await prisma.employee
    .create({
      data: {
        id: kaprodiSIId,
        Address: "Manado",
        phoneNum: "081234567891",
        email: "pungus@test.com",
        firstName: "Senly",
        lastName: "Pungus",
        degree: "MT, PhD",
        nik: "1002",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK", "KAPRODI"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.nik,
            role: role,
          },
        });
      }
    });

  // CREATE DEKAN
  await prisma.employee
    .create({
      data: {
        id: dekanId,
        Address: "Manado",
        phoneNum: "081234567892",
        email: "liem@test.com",
        firstName: "Andrew",
        lastName: "Liem",
        degree: "MT, PhD",
        nik: "1003",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN", "DOSEN_MK", "DEKAN"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.nik,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 1
  await prisma.employee
    .create({
      data: {
        id: dosen1Id,
        Address: "Airmadidi",
        phoneNum: "081234567893",
        email: "adam@test.com",
        firstName: "Senly",
        lastName: "Adam",
        degree: " SKom, MSc",
        nik: "1004",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.nik,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 2
  await prisma.employee
    .create({
      data: {
        id: dosen2Id,
        Address: "Airmadidi",
        phoneNum: "081234567894",
        email: "medjahedy@test.com",
        firstName: "Jimmy",
        lastName: "Moedjahedy",
        degree: " SKom, MKom, MM",
        nik: "1005",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.nik,
            role: role,
          },
        });
      }
    });

  // CREATE DOSEN 3
  await prisma.employee
    .create({
      data: {
        id: dosen3Id,
        Address: "Airmadidi",
        phoneNum: "081234567895",
        email: "lengkong@test.com",
        firstName: "Oktoverano",
        lastName: "Lengkong",
        degree: " SKom, MDs, MM",
        nik: "1006",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      // Daftar peran yang akan Anda tambahkan pada dosen
      const rolesToAdd = ["DOSEN"];

      // Membuat entri UserRole untuk setiap peran
      for (const role of rolesToAdd) {
        await prisma.userRole.create({
          data: {
            userId: employee.nik,
            role: role,
          },
        });
      }
    });

  // CREATE SEKRETARIS
  await prisma.employee
    .create({
      data: {
        id: sekretarisId,
        Address: "Manado",
        phoneNum: "081234567896",
        email: "kainde@test.com",
        firstName: "Wilma",
        lastName: "Kainde",
        nik: "1007",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.nik,
          role: "OPERATOR_FAKULTAS",
        },
      });
    });

  // CREATE SKRIPSI APP DATA
  async function createSkripsiAppData() {
    try {
      // akademik 1
      const academicCalendar1 = await prisma.academic_Calendar.create({
        data: {
          semester: "Ganjil",
          year: "2021/2022",
        },
      });

      if (academicCalendar1) {
        // proposal classroom 1
        const classroomProposal1 = await prisma.classroom.create({
          data: {
            dosen_mk_id: kaprodiTIId,
            academic_id: academicCalendar1.id,
            name: "Proposal",
          },
        });

        // skripsi classroom 1
        const classroomSkripsi1 = await prisma.classroom.create({
          data: {
            dosen_mk_id: kaprodiTIId,
            academic_id: academicCalendar1.id,
            name: "Skripsi",
          },
        });

        // if (classroomProposal1 && classroomSkripsi1) {
        //   // proposal_student 1 - 1
        //   const proposalStudent1 = await prisma.proposal_Student.create({
        //     data: {
        //       student_id: angelId,
        //       classroom_id: classroomProposal1.id,
        //     },
        //   });

        //   // skripsi_student 1 - 1
        //   const skripsiStudent1 = await prisma.skripsi_Student.create({
        //     data: {
        //       student_id: angelId,
        //       classroom_id: classroomSkripsi1.id,
        //     },
        //   });

        //   if (proposalStudent1 && skripsiStudent1) {
        //     // group 1 - 1
        //     const group = await prisma.group.create({
        //       data: {
        //         title: "Pengambangan Aplikasi Dinning",
        //         progress: "Finished",
        //       },
        //     });

        //     if (group) {
        //       // group_student 1 - 1
        //       await prisma.group_Student.create({
        //         data: {
        //           group_id: group.id,
        //           student_id: proposalStudent1.student_id,
        //         },
        //       });

        //       // submission 1 - 1
        //       const submission = await prisma.submission.create({
        //         data: {
        //           file_name: "pengembangan_aplikasi_dinning.pdf",
        //           upload_date: new Date(),
        //           file_size: "2.5 MB",
        //           file_path: "link_pengembangan_aplikasi_dinning",
        //           is_consultation: true,
        //           proposed_advisor_id: dekanId,
        //           proposed_co_advisor1_id: dosen1Id,
        //           is_approve: "Approve",
        //           classroom_id: classroomProposal1.id,
        //         },
        //       });

        //       if (submission) {
        //         // proposal 1 - 1
        //         const proposal = await prisma.proposal.create({
        //           data: {
        //             file_name_proposal: "pengembangan_aplikasi_dinning.pdf",
        //             file_name_payment: "pembayaran.pdf",
        //             file_name_plagiarismcheck: "plagiat.pdf",
        //             upload_date_proposal: new Date(),
        //             upload_date_payment: new Date(),
        //             upload_date_plagiarismcheck: new Date(),
        //             file_size_proposal: "2.5 MB",
        //             file_size_payment: "2.5 MB",
        //             file_size_plagiarismcheck: "2.5 MB",
        //             file_path_proposal: "link_pengembangan_aplikasi_dinning",
        //             file_path_payment: "link_pembayaran",
        //             file_path_plagiarismcheck: "link_plagiat",
        //             advisor_id: dekanId,
        //             co_advisor1_id: dosen1Id,
        //             classroom_id: classroomProposal1.id,
        //             is_proposal_approve_by_advisor: "Approve",
        //             is_proposal_approve_by_co_advisor1: "Approve",
        //             is_proposal_approve_by_co_advisor2: "Approve",
        //             advisor_proposal_approved_date: new Date(),
        //             co_advisor1_proposal_approved_date: new Date(),
        //             co_advisor2_proposal_approved_date: new Date(),
        //             panelist_chairman_id: dosen2Id,
        //             panelist_member_id: dosen3Id,
        //             start_defence: "08.00",
        //             end_defence: "10.00",
        //             defence_room: "GK1-206",
        //             defence_date: "10/09/2022",
        //             is_report_open: true,
        //             is_report_approve_by_dekan: true,
        //             is_report_approve_by_panelist_chairman: true,
        //             is_report_approve_by_panelist_member: true,
        //             is_report_approve_by_advisor: true,
        //             dekan_report_approve_date: new Date(),
        //             panelist_chairman_report_approve_date: new Date(),
        //             panelist_member_report_approve_date: new Date(),
        //             advisor_report_approve_date: new Date(),
        //             exam_conclution: "Approve",
        //             changes_conclusion: "Minor",
        //             assessment_conclution: "A-",
        //             is_pass: "Pass",
        //             report_date: "10/09/2022",
        //             file_name_revision:
        //               "revisi_pengembangan_aplikasi_dinning.pdf",
        //             upload_date_revision: new Date(),
        //             file_size_revision: "2.5 MB",
        //             file_path_revision: "link_revisi",
        //             is_revision_approve_by_panelist_chairman: "Approve",
        //             is_revision_approve_by_panelist_member: "Approve",
        //             is_revision_approve_by_advisor: "Approve",
        //             panelist_chairman_revision_approve_date: new Date(),
        //             panelist_member_revision_approve_date: new Date(),
        //             advisor_revision_approve_date: new Date(),
        //           },
        //         });

        //         if (proposal) {
        //           // konsultasi 1 - advisor (1)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi bab 1",
        //               date: new Date(),
        //               dosen_id: dekanId,
        //             },
        //           });
        //           // konsultasi 1 - advisor (2)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi bab 2",
        //               date: new Date(),
        //               dosen_id: dekanId,
        //             },
        //           });
        //           // konsultasi 1 - advisor (3)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi bab 3",
        //               date: new Date(),
        //               dosen_id: dekanId,
        //             },
        //           });
        //           // konsultasi 1 - co-advisor1 (1)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi sistem",
        //               date: new Date(),
        //               dosen_id: dosen1Id,
        //             },
        //           });
        //           // konsultasi 1 - co-advisor1 (2)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi database",
        //               date: new Date(),
        //               dosen_id: dosen1Id,
        //             },
        //           });
        //           // konsultasi 1 - co-advisor1 (3)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi metode",
        //               date: new Date(),
        //               dosen_id: dosen1Id,
        //             },
        //           });

        //           // assessment 1 - student1 - ketua
        //           await prisma.proposal_Assessment.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               student_id: proposalStudent1.student_id,
        //               dosen_id: dosen2Id,
        //               value: "9",
        //             },
        //           });
        //           // assessment 1 - student1 - anggota
        //           await prisma.proposal_Assessment.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               student_id: proposalStudent1.student_id,
        //               dosen_id: dosen3Id,
        //               value: "9",
        //             },
        //           });
        //           // assessment 1 - student1 - advisor
        //           await prisma.proposal_Assessment.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               student_id: proposalStudent1.student_id,
        //               dosen_id: dekanId,
        //               value: "9",
        //             },
        //           });

        //           // changes 1 - ketua
        //           await prisma.proposal_Changes.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               dosen_id: dosen2Id,
        //               changes: "Ubah Bab 1",
        //             },
        //           });
        //           // changes 1 - anggota
        //           await prisma.proposal_Changes.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               dosen_id: dosen3Id,
        //               changes: "Ubah Bab 2",
        //             },
        //           });
        //           // changes 1 - advisor
        //           await prisma.proposal_Changes.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               dosen_id: dekanId,
        //               changes: "Ubah Bab 3",
        //             },
        //           });
        //           // changes 1 - co-advisor1
        //           await prisma.proposal_Changes.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               dosen_id: dosen1Id,
        //               changes: "Ubah Gambar",
        //             },
        //           });
        //         }

        //         // skripsi 1 - 1
        //         const skripsi = await prisma.skripsi.create({
        //           data: {
        //             file_name_skripsi: "pengembangan_aplikasi_dinning.pdf",
        //             file_name_payment: "pembayaran.pdf",
        //             file_name_plagiarismcheck: "plagiat.pdf",
        //             upload_date_skripsi: new Date(),
        //             upload_date_payment: new Date(),
        //             upload_date_plagiarismcheck: new Date(),
        //             file_size_skripsi: "2.5 MB",
        //             file_size_payment: "2.5 MB",
        //             file_size_plagiarismcheck: "2.5 MB",
        //             file_path_skripsi: "link_pengembangan_aplikasi_dinning",
        //             file_path_payment: "link_pembayaran",
        //             file_path_plagiarismcheck: "link_plagiat",
        //             advisor_id: dekanId,
        //             co_advisor1_id: dosen1Id,
        //             classroom_id: classroomProposal1.id,
        //             is_skripsi_approve_by_advisor: "Approve",
        //             is_skripsi_approve_by_co_advisor1: "Approve",
        //             is_skripsi_approve_by_co_advisor2: "Approve",
        //             advisor_skripsi_approved_date: new Date(),
        //             co_advisor1_skripsi_approved_date: new Date(),
        //             co_advisor2_skripsi_approved_date: new Date(),
        //             panelist_chairman_id: dosen2Id,
        //             panelist_member_id: dosen3Id,
        //             start_defence: "10.00",
        //             end_defence: "12.00",
        //             defence_room: "GK1-206",
        //             defence_date: "01/03/2023",
        //             is_report_open: true,
        //             is_report_approve_by_dekan: true,
        //             is_report_approve_by_panelist_chairman: true,
        //             is_report_approve_by_panelist_member: true,
        //             is_report_approve_by_advisor: true,
        //             dekan_report_approve_date: new Date(),
        //             panelist_chairman_report_approve_date: new Date(),
        //             panelist_member_report_approve_date: new Date(),
        //             advisor_report_approve_date: new Date(),
        //             exam_conclution: "Approve",
        //             changes_conclusion: "Minor",
        //             assessment_conclution: "A-",
        //             is_pass: "Pass",
        //             report_date: "01/03/2023",
        //             file_name_revision:
        //               "revisi_pengembangan_aplikasi_dinning.pdf",
        //             upload_date_revision: new Date(),
        //             file_size_revision: "2.5 MB",
        //             file_path_revision: "link_revisi",
        //             is_revision_approve_by_panelist_chairman: "Approve",
        //             is_revision_approve_by_panelist_member: "Approve",
        //             is_revision_approve_by_advisor: "Approve",
        //             panelist_chairman_revision_approve_date: new Date(),
        //             panelist_member_revision_approve_date: new Date(),
        //             advisor_revision_approve_date: new Date(),
        //             file_name_hki: "HKI.pdf",
        //             file_name_journal: "Journal",
        //             file_name_sourcecode: "Source_Code.zip",
        //             upload_date_hki: new Date(),
        //             upload_date_journal: new Date(),
        //             upload_date_sourcecode: new Date(),
        //             file_size_hki: "2.5 MB",
        //             file_size_journal: "2.5 MB",
        //             file_size_sourcecode: "2.5 MB",
        //             link_soucecode: "link_source_code",
        //             upload_date_link_soucecode: new Date(),
        //             file_path_hki: "link_hki",
        //             file_path_journal: "link_journal",
        //             file_path_sourcecode: "link_source_code",
        //           },
        //         });

        //         if (skripsi) {
        //           // konsultasi 1 - advisor (1)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi bab 4",
        //               date: new Date(),
        //               dosen_id: dekanId,
        //             },
        //           });
        //           // konsultasi 1 - advisor (2)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi bab 5",
        //               date: new Date(),
        //               dosen_id: dekanId,
        //             },
        //           });
        //           // konsultasi 1 - advisor (3)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi penulisan",
        //               date: new Date(),
        //               dosen_id: dekanId,
        //             },
        //           });
        //           // konsultasi 1 - co-advisor1 (1)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi server",
        //               date: new Date(),
        //               dosen_id: dosen1Id,
        //             },
        //           });
        //           // konsultasi 1 - co-advisor1 (2)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi role",
        //               date: new Date(),
        //               dosen_id: dosen1Id,
        //             },
        //           });
        //           // konsultasi 1 - co-advisor1 (3)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi model",
        //               date: new Date(),
        //               dosen_id: dosen1Id,
        //             },
        //           });

        //           // assessment 1 - student1 - ketua
        //           await prisma.skripsi_Assessment.create({
        //             data: {
        //               skripsi_id: skripsi.id,
        //               student_id: skripsiStudent1.student_id,
        //               dosen_id: dosen2Id,
        //               value: "9",
        //             },
        //           });
        //           // assessment 1 - student1 - anggota
        //           await prisma.skripsi_Assessment.create({
        //             data: {
        //               skripsi_id: skripsi.id,
        //               student_id: skripsiStudent1.student_id,
        //               dosen_id: dosen3Id,
        //               value: "9",
        //             },
        //           });
        //           // assessment 1 - student1 - advisor
        //           await prisma.skripsi_Assessment.create({
        //             data: {
        //               skripsi_id: skripsi.id,
        //               student_id: skripsiStudent1.student_id,
        //               dosen_id: dekanId,
        //               value: "9",
        //             },
        //           });

        //           // changes 1 - ketua
        //           await prisma.skripsi_Changes.create({
        //             data: {
        //               skripsi_id: skripsi.id,
        //               dosen_id: dosen2Id,
        //               changes: "Ubah Bab 4",
        //             },
        //           });

        //           // changes 1 - anggota
        //           await prisma.skripsi_Changes.create({
        //             data: {
        //               skripsi_id: skripsi.id,
        //               dosen_id: dosen3Id,
        //               changes: "Ubah Bab 5",
        //             },
        //           });

        //           // changes 1 - advisor
        //           await prisma.skripsi_Changes.create({
        //             data: {
        //               skripsi_id: skripsi.id,
        //               dosen_id: dekanId,
        //               changes: "Ubah Bab use case",
        //             },
        //           });

        //           // changes 1 - co-advisor1
        //           await prisma.skripsi_Changes.create({
        //             data: {
        //               skripsi_id: skripsi.id,
        //               dosen_id: dosen1Id,
        //               changes: "Ubah table",
        //             },
        //           });

        //           await prisma.group.update({
        //             where: {
        //               id: group.id,
        //             },
        //             data: {
        //               submission_id: submission.id,
        //               proposal_id: proposal.id,
        //               skripsi_id: skripsi.id,
        //             },
        //           });
        //         }
        //       }
        //     }
        //   }

        //   // proposal_student 1 - 2
        //   const proposalStudent2 = await prisma.proposal_Student.create({
        //     data: {
        //       student_id: cindyID,
        //       classroom_id: classroomProposal1.id,
        //     },
        //   });

        //   if (proposalStudent2) {
        //     // group 1 - 2
        //     const group = await prisma.group.create({
        //       data: {
        //         title: "Pengambangan Sistem Absensi",
        //         progress: "Skripsi",
        //       },
        //     });

        //     if (group) {
        //       // group_student 1 - 2
        //       await prisma.group_Student.create({
        //         data: {
        //           group_id: group.id,
        //           student_id: proposalStudent2.student_id,
        //         },
        //       });

        //       // submission 1 - 2
        //       const submission = await prisma.submission.create({
        //         data: {
        //           file_name: "Pengambangan Sistem Absensi.pdf",
        //           upload_date: new Date(),
        //           file_size: "2.5 MB",
        //           file_path: "link_Pengambangan Sistem Absensi",
        //           is_consultation: true,
        //           proposed_advisor_id: dosen1Id,
        //           proposed_co_advisor1_id: dosen2Id,
        //           is_approve: "Approve",
        //           classroom_id: classroomProposal1.id,
        //         },
        //       });

        //       if (submission) {
        //         // proposal 1 - 2
        //         const proposal = await prisma.proposal.create({
        //           data: {
        //             file_name_proposal: "Pengambangan Sistem Absensi.pdf",
        //             file_name_payment: "pembayaran.pdf",
        //             file_name_plagiarismcheck: "plagiat.pdf",
        //             upload_date_proposal: new Date(),
        //             upload_date_payment: new Date(),
        //             upload_date_plagiarismcheck: new Date(),
        //             file_size_proposal: "2.5 MB",
        //             file_size_payment: "2.5 MB",
        //             file_size_plagiarismcheck: "2.5 MB",
        //             file_path_proposal: "link_Pengambangan Sistem Absensi",
        //             file_path_payment: "link_pembayaran",
        //             file_path_plagiarismcheck: "link_plagiat",
        //             advisor_id: dosen1Id,
        //             co_advisor1_id: dosen2Id,
        //             classroom_id: classroomProposal1.id,
        //             is_proposal_approve_by_advisor: "Approve",
        //             is_proposal_approve_by_co_advisor1: "Approve",
        //             is_proposal_approve_by_co_advisor2: "Approve",
        //             advisor_proposal_approved_date: new Date(),
        //             co_advisor1_proposal_approved_date: new Date(),
        //             co_advisor2_proposal_approved_date: new Date(),
        //             panelist_chairman_id: dosen3Id,
        //             panelist_member_id: dekanId,
        //             start_defence: "11.00",
        //             end_defence: "13.00",
        //             defence_room: "GK1-206",
        //             defence_date: "10/09/2022",
        //             is_report_open: true,
        //             is_report_approve_by_dekan: true,
        //             is_report_approve_by_panelist_chairman: true,
        //             is_report_approve_by_panelist_member: true,
        //             is_report_approve_by_advisor: true,
        //             dekan_report_approve_date: new Date(),
        //             panelist_chairman_report_approve_date: new Date(),
        //             panelist_member_report_approve_date: new Date(),
        //             advisor_report_approve_date: new Date(),
        //             exam_conclution: "Approve",
        //             changes_conclusion: "Minor",
        //             assessment_conclution: "A-",
        //             is_pass: "Pass",
        //             report_date: "10/09/2022",
        //             file_name_revision:
        //               "revisi Pengambangan Sistem Absensi.pdf",
        //             upload_date_revision: new Date(),
        //             file_size_revision: "2.5 MB",
        //             file_path_revision: "link_revisi",
        //             is_revision_approve_by_panelist_chairman: "Approve",
        //             is_revision_approve_by_panelist_member: "Approve",
        //             is_revision_approve_by_advisor: "Approve",
        //             panelist_chairman_revision_approve_date: new Date(),
        //             panelist_member_revision_approve_date: new Date(),
        //             advisor_revision_approve_date: new Date(),
        //           },
        //         });

        //         if (proposal) {
        //           // konsultasi 2 - advisor (1)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi bab 1",
        //               date: new Date(),
        //               dosen_id: dosen1Id,
        //             },
        //           });
        //           // konsultasi 2 - advisor (2)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi bab 2",
        //               date: new Date(),
        //               dosen_id: dosen1Id,
        //             },
        //           });
        //           // konsultasi 2 - advisor (3)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi bab 3",
        //               date: new Date(),
        //               dosen_id: dosen1Id,
        //             },
        //           });
        //           // konsultasi 2 - co-advisor1 (1)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi sistem",
        //               date: new Date(),
        //               dosen_id: dosen2Id,
        //             },
        //           });
        //           // konsultasi 2 - co-advisor1 (2)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi database",
        //               date: new Date(),
        //               dosen_id: dosen2Id,
        //             },
        //           });
        //           // konsultasi 2 - co-advisor1 (3)
        //           await prisma.thesis_Consultation.create({
        //             data: {
        //               group_id: group.id,
        //               description: "Konsultasi metode",
        //               date: new Date(),
        //               dosen_id: dosen2Id,
        //             },
        //           });

        //           // assessment 2 - student1 - ketua
        //           await prisma.proposal_Assessment.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               student_id: proposalStudent2.student_id,
        //               dosen_id: dosen3Id,
        //               value: "9",
        //             },
        //           });
        //           // assessment 2 - student1 - anggota
        //           await prisma.proposal_Assessment.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               student_id: proposalStudent2.student_id,
        //               dosen_id: dekanId,
        //               value: "9",
        //             },
        //           });
        //           // assessment 2 - student1 - advisor
        //           await prisma.proposal_Assessment.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               student_id: proposalStudent1.student_id,
        //               dosen_id: dosen1Id,
        //               value: "9",
        //             },
        //           });

        //           // changes 2 - ketua
        //           await prisma.proposal_Changes.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               dosen_id: dosen3Id,
        //               changes: "Ubah Bab 1",
        //             },
        //           });
        //           // changes 2 - anggota
        //           await prisma.proposal_Changes.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               dosen_id: dekanId,
        //               changes: "Ubah Bab 2",
        //             },
        //           });
        //           // changes 2 - advisor
        //           await prisma.proposal_Changes.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               dosen_id: dosen1Id,
        //               changes: "Ubah Bab 3",
        //             },
        //           });
        //           // changes 2 - co-advisor1
        //           await prisma.proposal_Changes.create({
        //             data: {
        //               proposal_id: proposal.id,
        //               dosen_id: dosen2Id,
        //               changes: "Ubah Gambar",
        //             },
        //           });
        //         }

        //         // skripsi 1 - 2
        //         const skripsi = await prisma.skripsi.create({
        //           data: {
        //             advisor_id: dosen1Id,
        //             co_advisor1_id: dosen2Id,
        //           },
        //         });

        //         if (skripsi) {
        //           await prisma.group.update({
        //             where: {
        //               id: group.id,
        //             },
        //             data: {
        //               submission_id: submission.id,
        //               proposal_id: proposal.id,
        //               skripsi_id: skripsi.id,
        //             },
        //           });
        //         }
        //       }
        //     }
        //   }
        // }

        // proposal classroom 2
        const classroomProposal2 = await prisma.classroom.create({
          data: {
            dosen_mk_id: kaprodiTIId,
            academic_id: academicCalendar1.id,
            name: "Proposal",
          },
        });

        // skripsi classroom 2
        const classroomSkripsi2 = await prisma.classroom.create({
          data: {
            dosen_mk_id: kaprodiTIId,
            academic_id: academicCalendar1.id,
            name: "Skripsi",
          },
        });

        if (classroomProposal2 && classroomSkripsi2) {
          // proposal_student (1) - student1
          const proposalStudent1 = await prisma.proposal_Student.create({
            data: {
              student_id: cindyID,
              classroom_id: classroomProposal2.id,
            },
          });

          // skripsi_student (1) - student1
          const skripsiStudent1 = await prisma.skripsi_Student.create({
            data: {
              student_id: cindyID,
              classroom_id: classroomSkripsi2.id,
            },
          });

          if (proposalStudent1 && skripsiStudent1) {
            // group (1) - student1
            const group = await prisma.group.create({
              data: {
                title:
                  "Analisis Algoritma Machine Learning dalam Prediksi Cuaca",
                progress: "Finished",
              },
            });

            if (group) {
              // group_student (1) - student1
              await prisma.group_Student.create({
                data: {
                  group_id: group.id,
                  student_id: proposalStudent1.student_id,
                },
              });

              // submission (1) - student1
              const submission = await prisma.submission.create({
                data: {
                  file_name: "skripsi_cuaca.pdf",
                  upload_date: new Date(),
                  file_size: "2.5 MB",
                  file_path: "link_skripsi_cuaca",
                  is_consultation: true,
                  proposed_advisor_id: kaprodiTIId,
                  proposed_co_advisor1_id: kaprodiSIId,
                  is_approve: "Approve",
                  classroom_id: classroomProposal2.id,
                },
              });

              if (submission) {
                // proposal (1) - student1
                const proposal = await prisma.proposal.create({
                  data: {
                    file_name_proposal: "skripsi_cuaca.pdf",
                    file_name_payment: "bukti_pembayaran_cuaca.pdf",
                    file_name_plagiarismcheck: "cek_plagiat_cuaca.pdf",
                    upload_date_proposal: new Date(),
                    upload_date_payment: new Date(),
                    upload_date_plagiarismcheck: new Date(),
                    file_size_proposal: "2.5 MB",
                    file_size_payment: "2.5 MB",
                    file_size_plagiarismcheck: "2.5 MB",
                    file_path_proposal: "link_skripsi_cuaca",
                    file_path_payment: "link_bukti_pembayaran_cuaca",
                    file_path_plagiarismcheck: "link_cek_plagiat_cuaca",
                    advisor_id: kaprodiTIId,
                    co_advisor1_id: kaprodiSIId,
                    classroom_id: classroomProposal2.id,
                    is_proposal_approve_by_advisor: "Approve",
                    is_proposal_approve_by_co_advisor1: "Approve",
                    is_proposal_approve_by_co_advisor2: "Approve",
                    advisor_proposal_approved_date: new Date(),
                    co_advisor1_proposal_approved_date: new Date(),
                    co_advisor2_proposal_approved_date: new Date(),
                    panelist_chairman_id: dosen1Id,
                    panelist_member_id: dosen2Id,
                    start_defence: "08.00",
                    end_defence: "10.00",
                    defence_room: "GK1-206",
                    defence_date: "11/09/2022",
                    is_report_open: true,
                    is_report_approve_by_dekan: true,
                    is_report_approve_by_panelist_chairman: true,
                    is_report_approve_by_panelist_member: true,
                    is_report_approve_by_advisor: true,
                    dekan_report_approve_date: new Date(),
                    panelist_chairman_report_approve_date: new Date(),
                    panelist_member_report_approve_date: new Date(),
                    advisor_report_approve_date: new Date(),
                    exam_conclution: "Approve",
                    changes_conclusion: "Minor",
                    assessment_conclution: "A-",
                    is_pass: "Pass",
                    report_date: "11/09/2022",
                    file_name_revision: "revisi_cuaca.pdf",
                    upload_date_revision: new Date(),
                    file_size_revision: "2.5 MB",
                    file_path_revision: "link_revisi_cuaca",
                    is_revision_approve_by_panelist_chairman: "Approve",
                    is_revision_approve_by_panelist_member: "Approve",
                    is_revision_approve_by_advisor: "Approve",
                    panelist_chairman_revision_approve_date: new Date(),
                    panelist_member_revision_approve_date: new Date(),
                    advisor_revision_approve_date: new Date(),
                  },
                });

                if (proposal) {
                  // konsultasi (1) - advisor (1)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 1",
                      date: new Date(),
                      dosen_id: kaprodiTIId,
                    },
                  });
                  // konsultasi (1) - advisor (2)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 2",
                      date: new Date(),
                      dosen_id: kaprodiTIId,
                    },
                  });
                  // konsultasi (1) - advisor (3)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 3",
                      date: new Date(),
                      dosen_id: kaprodiTIId,
                    },
                  });
                  // konsultasi (1) - co-advisor1 (1)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi sistem",
                      date: new Date(),
                      dosen_id: kaprodiSIId,
                    },
                  });
                  // konsultasi (1) - co-advisor1 (2)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi database",
                      date: new Date(),
                      dosen_id: kaprodiSIId,
                    },
                  });
                  // konsultasi (1) - co-advisor1 (3)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi metode",
                      date: new Date(),
                      dosen_id: kaprodiSIId,
                    },
                  });

                  // assessment (1) - student1 - ketua
                  await prisma.proposal_Assessment.create({
                    data: {
                      proposal_id: proposal.id,
                      student_id: proposalStudent1.student_id,
                      dosen_id: dosen1Id,
                      value: "9",
                    },
                  });
                  // assessment (1) - student1 - anggota
                  await prisma.proposal_Assessment.create({
                    data: {
                      proposal_id: proposal.id,
                      student_id: proposalStudent1.student_id,
                      dosen_id: dosen2Id,
                      value: "9",
                    },
                  });
                  // assessment (1) - student1 - advisor
                  await prisma.proposal_Assessment.create({
                    data: {
                      proposal_id: proposal.id,
                      student_id: proposalStudent1.student_id,
                      dosen_id: kaprodiTIId,
                      value: "9",
                    },
                  });

                  // changes (1) - ketua
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: dosen1Id,
                      changes: "Ubah Bab 1",
                    },
                  });
                  // changes (1) - anggota
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: dosen2Id,
                      changes: "Ubah Bab 2",
                    },
                  });
                  // changes (1) - advisor
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: kaprodiTIId,
                      changes: "Ubah Bab 3",
                    },
                  });
                  // changes (1) - co-advisor1
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: kaprodiSIId,
                      changes: "Ubah Gambar",
                    },
                  });
                }

                // skripsi (1) - student1
                const skripsi = await prisma.skripsi.create({
                  data: {
                    file_name_skripsi: "skripsi_cuaca.pdf",
                    file_name_payment: "bukti_pembayaran_cuaca.pdf",
                    file_name_plagiarismcheck: "cek_plagiat_cuaca.pdf",
                    upload_date_skripsi: new Date(),
                    upload_date_payment: new Date(),
                    upload_date_plagiarismcheck: new Date(),
                    file_size_skripsi: "2.5 MB",
                    file_size_payment: "2.5 MB",
                    file_size_plagiarismcheck: "2.5 MB",
                    file_path_skripsi: "link_skripsi_cuaca",
                    file_path_payment: "link_bukti_pembayaran_cuaca",
                    file_path_plagiarismcheck: "link_cek_plagiat_cuaca",
                    advisor_id: kaprodiTIId,
                    co_advisor1_id: kaprodiSIId,
                    classroom_id: classroomProposal2.id,
                    is_skripsi_approve_by_advisor: "Approve",
                    is_skripsi_approve_by_co_advisor1: "Approve",
                    is_skripsi_approve_by_co_advisor2: "Approve",
                    advisor_skripsi_approved_date: new Date(),
                    co_advisor1_skripsi_approved_date: new Date(),
                    co_advisor2_skripsi_approved_date: new Date(),
                    panelist_chairman_id: dosen1Id,
                    panelist_member_id: dosen2Id,
                    start_defence: "10.00",
                    end_defence: "12.00",
                    defence_room: "GK1-206",
                    defence_date: "02/03/2023",
                    is_report_open: true,
                    is_report_approve_by_dekan: true,
                    is_report_approve_by_panelist_chairman: true,
                    is_report_approve_by_panelist_member: true,
                    is_report_approve_by_advisor: true,
                    dekan_report_approve_date: new Date(),
                    panelist_chairman_report_approve_date: new Date(),
                    panelist_member_report_approve_date: new Date(),
                    advisor_report_approve_date: new Date(),
                    exam_conclution: "Approve",
                    changes_conclusion: "Minor",
                    assessment_conclution: "A-",
                    is_pass: "Pass",
                    report_date: "02/03/2023",
                    file_name_revision: "revisi_cuaca.pdf",
                    upload_date_revision: new Date(),
                    file_size_revision: "2.5 MB",
                    file_path_revision: "link_revisi_cuaca",
                    is_revision_approve_by_panelist_chairman: "Approve",
                    is_revision_approve_by_panelist_member: "Approve",
                    is_revision_approve_by_advisor: "Approve",
                    panelist_chairman_revision_approve_date: new Date(),
                    panelist_member_revision_approve_date: new Date(),
                    advisor_revision_approve_date: new Date(),
                    file_name_hki: "HKI.pdf",
                    file_name_journal: "Journal",
                    file_name_sourcecode: "Source_Code.zip",
                    upload_date_hki: new Date(),
                    upload_date_journal: new Date(),
                    upload_date_sourcecode: new Date(),
                    file_size_hki: "2.5 MB",
                    file_size_journal: "2.5 MB",
                    file_size_sourcecode: "2.5 MB",
                    link_soucecode: "link_source_code",
                    upload_date_link_soucecode: new Date(),
                    file_path_hki: "link_hki",
                    file_path_journal: "link_journal",
                    file_path_sourcecode: "link_source_code",
                  },
                });

                if (skripsi) {
                  // konsultasi (1) - advisor (1)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 4",
                      date: new Date(),
                      dosen_id: kaprodiTIId,
                    },
                  });
                  // konsultasi (1) - advisor (2)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 5",
                      date: new Date(),
                      dosen_id: kaprodiTIId,
                    },
                  });
                  // konsultasi (1) - advisor (3)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi penulisan",
                      date: new Date(),
                      dosen_id: kaprodiTIId,
                    },
                  });
                  // konsultasi (1) - co-advisor1 (1)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi server",
                      date: new Date(),
                      dosen_id: kaprodiSIId,
                    },
                  });
                  // konsultasi (1) - co-advisor1 (2)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi role",
                      date: new Date(),
                      dosen_id: kaprodiSIId,
                    },
                  });
                  // konsultasi (1) - co-advisor1 (3)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi model",
                      date: new Date(),
                      dosen_id: kaprodiSIId,
                    },
                  });

                  // assessment (1) - student1 - ketua
                  await prisma.skripsi_Assessment.create({
                    data: {
                      skripsi_id: skripsi.id,
                      student_id: skripsiStudent1.student_id,
                      dosen_id: dosen1Id,
                      value: "9",
                    },
                  });
                  // assessment (1) - student1 - anggota
                  await prisma.skripsi_Assessment.create({
                    data: {
                      skripsi_id: skripsi.id,
                      student_id: skripsiStudent1.student_id,
                      dosen_id: dosen2Id,
                      value: "9",
                    },
                  });
                  // assessment (1) - student1 - advisor
                  await prisma.skripsi_Assessment.create({
                    data: {
                      skripsi_id: skripsi.id,
                      student_id: skripsiStudent1.student_id,
                      dosen_id: kaprodiTIId,
                      value: "9",
                    },
                  });

                  // changes (1) - ketua
                  await prisma.skripsi_Changes.create({
                    data: {
                      skripsi_id: skripsi.id,
                      dosen_id: dosen1Id,
                      changes: "Ubah Bab 4",
                    },
                  });

                  // changes (1) - anggota
                  await prisma.skripsi_Changes.create({
                    data: {
                      skripsi_id: skripsi.id,
                      dosen_id: dosen2Id,
                      changes: "Ubah Bab 5",
                    },
                  });

                  // changes (1) - advisor
                  await prisma.skripsi_Changes.create({
                    data: {
                      skripsi_id: skripsi.id,
                      dosen_id: kaprodiTIId,
                      changes: "Ubah Bab use case",
                    },
                  });

                  // changes (1) - co-advisor1
                  await prisma.skripsi_Changes.create({
                    data: {
                      skripsi_id: skripsi.id,
                      dosen_id: kaprodiSIId,
                      changes: "Ubah table",
                    },
                  });

                  await prisma.group.update({
                    where: {
                      id: group.id,
                    },
                    data: {
                      submission_id: submission.id,
                      proposal_id: proposal.id,
                      skripsi_id: skripsi.id,
                    },
                  });
                }
              }
            }
          }

          // proposal_student (2) - student2
          const proposalStudent2 = await prisma.proposal_Student.create({
            data: {
              student_id: cindyID,
              classroom_id: classroomProposal2.id,
            },
          });

          if (proposalStudent2) {
            // group (2) - student2
            const group = await prisma.group.create({
              data: {
                title:
                  "Pengembangan Aplikasi Mobile Berbasis Android untuk Pemantauan Kesehatan",
                progress: "Skripsi",
              },
            });

            if (group) {
              // group_student (2) - student2
              await prisma.group_Student.create({
                data: {
                  group_id: group.id,
                  student_id: proposalStudent2.student_id,
                },
              });

              // submission (2) - student2
              const submission = await prisma.submission.create({
                data: {
                  file_name: "aplikasi_kesehatan.pdf",
                  upload_date: new Date(),
                  file_size: "2.5 MB",
                  file_path: "link_aplikasi_kesehatan",
                  is_consultation: true,
                  proposed_advisor_id: kaprodiSIId,
                  proposed_co_advisor1_id: dosen3Id,
                  is_approve: "Approve",
                  classroom_id: classroomProposal2.id,
                },
              });

              if (submission) {
                // proposal (2) - student2
                const proposal = await prisma.proposal.create({
                  data: {
                    file_name_proposal: "skripsi_aplikasi_kesehatan.pdf",
                    file_name_payment: "bukti_pembayaran_kesehatan.pdf",
                    file_name_plagiarismcheck: "cek_plagiat_kesehatan.pdf",
                    upload_date_proposal: new Date(),
                    upload_date_payment: new Date(),
                    upload_date_plagiarismcheck: new Date(),
                    file_size_proposal: "2.5 MB",
                    file_size_payment: "2.5 MB",
                    file_size_plagiarismcheck: "2.5 MB",
                    file_path_proposal: "link_skripsi_aplikasi_kesehatan",
                    file_path_payment: "link_bukti_pembayaran_kesehatan",
                    file_path_plagiarismcheck: "link_cek_plagiat_kesehatan",
                    advisor_id: kaprodiSIId,
                    co_advisor1_id: dosen3Id,
                    classroom_id: classroomProposal2.id,
                    is_proposal_approve_by_advisor: "Approve",
                    is_proposal_approve_by_co_advisor1: "Approve",
                    is_proposal_approve_by_co_advisor2: "Approve",
                    advisor_proposal_approved_date: new Date(),
                    co_advisor1_proposal_approved_date: new Date(),
                    co_advisor2_proposal_approved_date: new Date(),
                    panelist_chairman_id: dosen2Id,
                    panelist_member_id: dosen1Id,
                    start_defence: "11.00",
                    end_defence: "13.00",
                    defence_room: "GK1-206",
                    defence_date: "11/09/2022",
                    is_report_open: true,
                    is_report_approve_by_dekan: true,
                    is_report_approve_by_panelist_chairman: true,
                    is_report_approve_by_panelist_member: true,
                    is_report_approve_by_advisor: true,
                    dekan_report_approve_date: new Date(),
                    panelist_chairman_report_approve_date: new Date(),
                    panelist_member_report_approve_date: new Date(),
                    advisor_report_approve_date: new Date(),
                    exam_conclution: "Approve",
                    changes_conclusion: "Minor",
                    assessment_conclution: "A-",
                    is_pass: "Pass",
                    report_date: "10/09/2022",
                    file_name_revision: "revisi_kesehatan.pdf",
                    upload_date_revision: new Date(),
                    file_size_revision: "2.5 MB",
                    file_path_revision: "link_revisi_kesehatan",
                    is_revision_approve_by_panelist_chairman: "Approve",
                    is_revision_approve_by_panelist_member: "Approve",
                    is_revision_approve_by_advisor: "Approve",
                    panelist_chairman_revision_approve_date: new Date(),
                    panelist_member_revision_approve_date: new Date(),
                    advisor_revision_approve_date: new Date(),
                  },
                });

                if (proposal) {
                  // konsultasi (2) - advisor (1)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 1",
                      date: new Date(),
                      dosen_id: kaprodiSIId,
                    },
                  });
                  // konsultasi (2) - advisor (2)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 2",
                      date: new Date(),
                      dosen_id: kaprodiSIId,
                    },
                  });
                  // konsultasi (2) - advisor (3)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 3",
                      date: new Date(),
                      dosen_id: kaprodiSIId,
                    },
                  });
                  // konsultasi (2) - co-advisor1 (1)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi sistem",
                      date: new Date(),
                      dosen_id: dosen3Id,
                    },
                  });
                  // konsultasi (2) - co-advisor1 (2)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi database",
                      date: new Date(),
                      dosen_id: dosen3Id,
                    },
                  });
                  // konsultasi (2) - co-advisor1 (3)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi metode",
                      date: new Date(),
                      dosen_id: dosen3Id,
                    },
                  });

                  // assessment (2) - student1 - ketua
                  await prisma.proposal_Assessment.create({
                    data: {
                      proposal_id: proposal.id,
                      student_id: proposalStudent2.student_id,
                      dosen_id: dosen1Id,
                      value: "9",
                    },
                  });
                  // assessment (2) - student1 - anggota
                  await prisma.proposal_Assessment.create({
                    data: {
                      proposal_id: proposal.id,
                      student_id: proposalStudent2.student_id,
                      dosen_id: dosen2Id,
                      value: "9",
                    },
                  });
                  // assessment (2) - student1 - advisor
                  await prisma.proposal_Assessment.create({
                    data: {
                      proposal_id: proposal.id,
                      student_id: proposalStudent2.student_id,
                      dosen_id: kaprodiSIId,
                      value: "9",
                    },
                  });

                  // changes (2) - ketua
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: dosen1Id,
                      changes: "Ubah Bab 1",
                    },
                  });
                  // changes (2) - anggota
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: dosen2Id,
                      changes: "Ubah Bab 2",
                    },
                  });
                  // changes (2) - advisor
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: kaprodiSIId,
                      changes: "Ubah Bab 3",
                    },
                  });
                  // changes (2) - co-advisor1
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: dosen3Id,
                      changes: "Ubah Gambar",
                    },
                  });
                }

                // skripsi (2) - student2
                const skripsi = await prisma.skripsi.create({
                  data: {
                    advisor_id: kaprodiSIId,
                    co_advisor1_id: dosen3Id,
                  },
                });

                if (skripsi) {
                  await prisma.group.update({
                    where: {
                      id: group.id,
                    },
                    data: {
                      submission_id: submission.id,
                      proposal_id: proposal.id,
                      skripsi_id: skripsi.id,
                    },
                  });
                }
              }
            }
          }
        }
      }

      // akademik 1
      const academicCalendar2 = await prisma.academic_Calendar.create({
        data: {
          semester: "Genap",
          year: "2021/2022",
        },
      });

      if (academicCalendar2) {
        // proposal classroom 1
        const classroomProposal1 = await prisma.classroom.create({
          data: {
            dosen_mk_id: kaprodiTIId,
            academic_id: academicCalendar2.id,
            name: "Proposal",
          },
        });

        // skripsi classroom 1
        const classroomSkripsi1 = await prisma.classroom.create({
          data: {
            dosen_mk_id: kaprodiTIId,
            academic_id: academicCalendar2.id,
            name: "Skripsi",
          },
        });

        if (classroomProposal1 && classroomSkripsi1) {
          // proposal_student 1 - 1
          const proposalStudent1 = await prisma.proposal_Student.create({
            data: {
              student_id: sitiID,
              classroom_id: classroomProposal1.id,
            },
          });

          if (proposalStudent1) {
            // group 1 - 1
            const group = await prisma.group.create({
              data: {
                title: "Analisis Keamanan Jaringan Komputer",
                progress: "Submission",
              },
            });

            if (group) {
              // group_student 1 - 1
              await prisma.group_Student.create({
                data: {
                  group_id: group.id,
                  student_id: proposalStudent1.student_id,
                },
              });

              // submission 1 - 1
              const submission = await prisma.submission.create({
                data: {
                  file_name: "keamanan_jaringan.pdf",
                  upload_date: new Date(),
                  file_size: "2.5 MB",
                  file_path: "link_keamanan_jaringan",
                  is_consultation: true,
                  proposed_advisor_id: dekanId,
                  proposed_co_advisor1_id: dosen1Id,
                  is_approve: "Waiting",
                  classroom_id: classroomProposal1.id,
                },
              });
              await prisma.group.update({
                where: {
                  id: group.id,
                },
                data: {
                  submission_id: submission.id,
                },
              });
            }
          }

          // proposal_student 1 - 2
          const proposalStudent2 = await prisma.proposal_Student.create({
            data: {
              student_id: wahyuID,
              classroom_id: classroomProposal1.id,
            },
          });

          if (proposalStudent2) {
            // group 1 - 2
            const group = await prisma.group.create({
              data: {
                title:
                  "Pengaruh Teknologi Internet of Things (IoT) dalam Industri Manufaktur",
                progress: "Proposal",
              },
            });

            if (group) {
              // group_student 1 - 2
              await prisma.group_Student.create({
                data: {
                  group_id: group.id,
                  student_id: proposalStudent2.student_id,
                },
              });

              // submission 1 - 2
              const submission = await prisma.submission.create({
                data: {
                  file_name: "iot_manufaktur.pdf",
                  upload_date: new Date(),
                  file_size: "2.5 MB",
                  file_path: "link_iot_manufaktur",
                  is_consultation: true,
                  proposed_advisor_id: dosen1Id,
                  proposed_co_advisor1_id: dosen2Id,
                  is_approve: "Approve",
                  classroom_id: classroomProposal1.id,
                },
              });

              if (submission) {
                // proposal 1 - 2
                const proposal = await prisma.proposal.create({
                  data: {
                    advisor_id: dosen1Id,
                    co_advisor1_id: dosen2Id,
                    classroom_id: classroomProposal1.id,
                  },
                });
                const skripsi = await prisma.skripsi.create({
                  data: {
                    advisor_id: dosen1Id,
                    co_advisor1_id: dosen2Id,
                  },
                });
                await prisma.group.update({
                  where: {
                    id: group.id,
                  },
                  data: {
                    submission_id: submission.id,
                    proposal_id: proposal.id,
                    skripsi_id: skripsi.id,
                  },
                });
              }
            }
          }
        }
      }

      // // akademik 2
      // const academicCalendar2 = await prisma.academic_Calendar.create({
      //   data: {
      //     semester: "Ganjil",
      //     year: "2022/2023",
      //   },
      // });

      // await prisma.classroom.create({
      //   data: {
      //     academic_id: academicCalendar2.id,
      //     name: "Proposal",
      //   },
      // });

      // await prisma.classroom.create({
      //   data: {
      //     academic_id: academicCalendar2.id,
      //     name: "Skripsi",
      //   },
      // });
    } catch (error) {
      // Tangani kesalahan jika terjadi
      console.error(error);
    }
  }

  // Panggil fungsi untuk membuat entitas akademik
  createSkripsiAppData();

  //--------------------------------------Klabat Bridge--------------------------------------------
  // Create Alumni
  await prisma.student.createMany({
    data: [
      {
        nim: "20502201001",
        studentEmail: "s2300001@student.unklab.ac.id",
        firstName: "Stirling",
        lastName: "Branchflower",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        nim: "20502201002",
        studentEmail: "s2300002@student.unklab.ac.id",
        firstName: "Julina",
        lastName: "Breton",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        nim: "20502201003",
        studentEmail: "s2300003@student.unklab.ac.id",
        firstName: "Koenraad",
        lastName: "Tolliday",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        nim: "20502201004",
        studentEmail: "s2300004@student.unklab.ac.id",
        firstName: "Rad",
        lastName: "Beverstock",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        nim: "20502201005",
        studentEmail: "s2300005@student.unklab.ac.id",
        firstName: "Gene",
        lastName: "Trobe",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        nim: "20502201006",
        studentEmail: "s2300006@student.unklab.ac.id",
        firstName: "Stewart",
        lastName: "Heasman",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        nim: "20502201007",
        studentEmail: "s2300007@student.unklab.ac.id",
        firstName: "Maxim",
        lastName: "holmes",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        nim: "20502201008",
        studentEmail: "s2300008@student.unklab.ac.id",
        firstName: "Sheilakathryn",
        lastName: "Heppner",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        nim: "20502201009",
        studentEmail: "s2300009@student.unklab.ac.id",
        firstName: "Adelle",
        lastName: "Macvain",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        nim: "20502201010",
        studentEmail: "s2300010@student.unklab.ac.id",
        firstName: "Estevan",
        lastName: "Kingswood",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2022",
      },
      {
        nim: "20502201011",
        studentEmail: "s2300011@student.unklab.ac.id",
        firstName: "Tybalt",
        lastName: "Champneys",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        nim: "20502201012",
        studentEmail: "s2300012@student.unklab.ac.id",
        firstName: "Egor",
        lastName: "Smaling",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        nim: "20502201013",
        studentEmail: "s2300013@student.unklab.ac.id",
        firstName: "Jerrie",
        lastName: "Bushnell",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        nim: "20502201014",
        studentEmail: "s2300014@student.unklab.ac.id",
        firstName: "Calli",
        lastName: "Gallehawk",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        nim: "20502201015",
        studentEmail: "s2300015@student.unklab.ac.id",
        firstName: "Lucilia",
        lastName: "Chittey",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "IF",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        nim: "20502201016",
        studentEmail: "s2300016@student.unklab.ac.id",
        firstName: "Rowan",
        lastName: "Origin",
        gender: "MALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        nim: "20502201017",
        studentEmail: "s2300017@student.unklab.ac.id",
        firstName: "Norine",
        lastName: "Aubrun",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        nim: "20502201018",
        studentEmail: "s2300018@student.unklab.ac.id",
        firstName: "Sarina",
        lastName: "Fulmen",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        nim: "20502201019",
        studentEmail: "s2300019@student.unklab.ac.id",
        firstName: "Rachele",
        lastName: "Skillett",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
      {
        nim: "20502201020",
        studentEmail: "s2300020@student.unklab.ac.id",
        firstName: "Gayle",
        lastName: "Wardhough",
        gender: "FEMALE",
        faculty: "Fakultas Ilmu Komputer",
        major: "SI",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
        status: "GRADUATE",
        graduate_year: "2023",
      },
    ],
  });

  await prisma.userRole.createMany({
    data: [
      {
        userId: "20502201001",
        role: "ALUMNI",
      },
      {
        userId: "20502201002",
        role: "ALUMNI",
      },
      {
        userId: "20502201003",
        role: "ALUMNI",
      },
      {
        userId: "20502201004",
        role: "ALUMNI",
      },
      {
        userId: "20502201005",
        role: "ALUMNI",
      },
      {
        userId: "20502201006",
        role: "ALUMNI",
      },
      {
        userId: "20502201007",
        role: "ALUMNI",
      },
      {
        userId: "20502201008",
        role: "ALUMNI",
      },
      {
        userId: "20502201009",
        role: "ALUMNI",
      },
      {
        userId: "20502201010",
        role: "ALUMNI",
      },
      {
        userId: "20502201011",
        role: "ALUMNI",
      },
      {
        userId: "20502201012",
        role: "ALUMNI",
      },
      {
        userId: "20502201013",
        role: "ALUMNI",
      },
      {
        userId: "20502201014",
        role: "ALUMNI",
      },
      {
        userId: "20502201015",
        role: "ALUMNI",
      },
      {
        userId: "20502201016",
        role: "ALUMNI",
      },
      {
        userId: "20502201017",
        role: "ALUMNI",
      },
      {
        userId: "20502201018",
        role: "ALUMNI",
      },
      {
        userId: "20502201019",
        role: "ALUMNI",
      },
      {
        userId: "20502201020",
        role: "ALUMNI",
      },
    ],
  });

  //CREATE Tracer Study
  await prisma.tracer_Study.createMany({
    data: [
      {
        kdptimsmh: "161002",
        kdpstmsmh: "55201",
        nimhsmsmh: "20502201001",
        nmmhsmsmh: "Stirling Branchflower",
        telpomsmh: "085298528966",
        emailmsmh: "s2300001@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "7171849398765456",
        npwp: "123456788",
        f8: "1",
        f504: "1",
        f502: "2",
        f505: "8000000",
        f506: "",
        f5a1: "Sumatera Utara",
        f5a2: "Medan",
        f1101: "3",
        f1102: "",
        f5b: "PT Tekno Klabat",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "1",
        f1202: "",
        f14: "2",
        f15: "2",
        f1761: "4",
        f1762: "4",
        f1763: "4",
        f1764: "4",
        f1765: "4",
        f1766: "4",
        f1767: "4",
        f1768: "4",
        f1769: "4",
        f1770: "4",
        f1771: "4",
        f1772: "4",
        f1773: "4",
        f1774: "4",
        f21: "2",
        f22: "3",
        f23: "3",
        f24: "5",
        f25: "3",
        f26: "2",
        f27: "3",
        f301: "2",
        f302: "",
        f303: "1",
        f401: "1",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "3",
        f7: "1",
        f7a: "0",
        f1001: "1",
        f1002: "",
        f1601: "1",
        f1602: "0",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201001",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "55201",
        nimhsmsmh: "20502201002",
        nmmhsmsmh: "Julina Breton",
        telpomsmh: "081234567890",
        emailmsmh: "s2300003@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "71718493987576545",
        npwp: "0987654456789",
        f8: "1",
        f504: "1",
        f502: "5",
        f505: "5000000",
        f506: "",
        f5a1: "Sulawesi Utara",
        f5a2: "Manado",
        f1101: "1",
        f1102: "",
        f5b: "Dinas Pendidikan Kota Manado",
        f5c: "",
        f5d: "Nasional/Wiraswasta berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "1",
        f1202: "",
        f14: "2",
        f15: "2",
        f1761: "5",
        f1762: "4",
        f1763: "4",
        f1764: "3",
        f1765: "5",
        f1766: "4",
        f1767: "4",
        f1768: "2",
        f1769: "3",
        f1770: "3",
        f1771: "4",
        f1772: "4",
        f1773: "5",
        f1774: "4",
        f21: "3",
        f22: "4",
        f23: "1",
        f24: "1",
        f25: "1",
        f26: "2",
        f27: "3",
        f301: "2",
        f302: "",
        f303: "4",
        f401: "0",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "1",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "4",
        f7: "2",
        f7a: "1",
        f1001: "3",
        f1002: "",
        f1601: "0",
        f1602: "0",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "1",
        f1613: "0",
        f1614: "",
        studentId: "20502201002",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "55201",
        nimhsmsmh: "20502201004",
        nmmhsmsmh: "Rad Beverstock",
        telpomsmh: "098876543216",
        emailmsmh: "s2300005@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "14785258742146",
        npwp: "7458557784523",
        f8: "1",
        f504: "1",
        f502: "5",
        f505: "9999999",
        f506: "",
        f5a1: "Sumatera Utara",
        f5a2: "Pematangsiantar",
        f1101: "3",
        f1102: "",
        f5b: "CV Maju Tak Gentar",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "3",
        f1202: "",
        f14: "2",
        f15: "2",
        f1761: "5",
        f1762: "4",
        f1763: "5",
        f1764: "4",
        f1765: "5",
        f1766: "4",
        f1767: "5",
        f1768: "4",
        f1769: "5",
        f1770: "4",
        f1771: "5",
        f1772: "4",
        f1773: "5",
        f1774: "4",
        f21: "2",
        f22: "4",
        f23: "1",
        f24: "3",
        f25: "1",
        f26: "3",
        f27: "3",
        f301: "2",
        f302: "",
        f303: "5",
        f401: "0",
        f402: "0",
        f403: "1",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "6",
        f7: "4",
        f7a: "2",
        f1001: "3",
        f1002: "",
        f1601: "0",
        f1602: "0",
        f1603: "1",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "0",
        studentId: "20502201004",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "55201",
        nimhsmsmh: "20502201003",
        nmmhsmsmh: "Koenraad Tolliday",
        telpomsmh: "0874123698541",
        emailmsmh: "s2300004@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "765432345678765",
        npwp: "74123658473",
        f8: "1",
        f504: "1",
        f502: "7",
        f505: "14999999",
        f506: "",
        f5a1: "DKI Jakarta",
        f5a2: "Kota Administrasi Jakarta Selatan",
        f1101: "4",
        f1102: "",
        f5b: "CV Abadi",
        f5c: "",
        f5d: "Nasional/Wiraswasta berbadan hukum",
        f18a: "0",
        f18b: "0",
        f18c: "0",
        f18d: "0",
        f1201: "2",
        f1202: "",
        f14: "4",
        f15: "3",
        f1761: "5",
        f1762: "3",
        f1763: "4",
        f1764: "2",
        f1765: "5",
        f1766: "4",
        f1767: "3",
        f1768: "2",
        f1769: "5",
        f1770: "5",
        f1771: "4",
        f1772: "4",
        f1773: "4",
        f1774: "3",
        f21: "3",
        f22: "3",
        f23: "3",
        f24: "3",
        f25: "2",
        f26: "2",
        f27: "1",
        f301: "1",
        f302: "12",
        f303: "",
        f401: "0",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "1",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "0",
        f7: "0",
        f7a: "0",
        f1001: "1",
        f1002: "0",
        f1601: "0",
        f1602: "0",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "1",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "0",
        studentId: "20502201003",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "55201",
        nimhsmsmh: "20502201005",
        nmmhsmsmh: "Gene Trobe",
        telpomsmh: "085412369871",
        emailmsmh: "s2300005@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "765432345678765",
        npwp: "74123658473",
        f8: "1",
        f504: "1",
        f502: "9",
        f505: "2000000",
        f506: "",
        f5a1: "Sulawesi Utara",
        f5a2: "Manado",
        f1101: "6",
        f1102: "",
        f5b: "PT Makmur",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "6",
        f1202: "",
        f14: "1",
        f15: "4",
        f1761: "2",
        f1762: "4",
        f1763: "4",
        f1764: "3",
        f1765: "3",
        f1766: "2",
        f1767: "4",
        f1768: "5",
        f1769: "5",
        f1770: "2",
        f1771: "5",
        f1772: "4",
        f1773: "4",
        f1774: "4",
        f21: "3",
        f22: "5",
        f23: "3",
        f24: "2",
        f25: "3",
        f26: "2",
        f27: "1",
        f301: "2",
        f302: "",
        f303: "2",
        f401: "1",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "3",
        f7: "2",
        f7a: "2",
        f1001: "1",
        f1002: "",
        f1601: "0",
        f1602: "0",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "1",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201005",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "57201",
        nimhsmsmh: "20502201006",
        nmmhsmsmh: "Stewart Heasman",
        telpomsmh: "081234567895",
        emailmsmh: "s2300006@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "71718273646573837",
        npwp: "8765431122",
        f8: "1",
        f504: "1",
        f502: "3",
        f505: "2000000",
        f506: "",
        f5a1: "DKI Jakarta",
        f5a2: "Kota Administrasi Jakarta Timur",
        f1101: "6",
        f1102: "",
        f5b: "Maju Sejahtera",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "1",
        f1202: "",
        f14: "2",
        f15: "1",
        f1761: "4",
        f1762: "3",
        f1763: "5",
        f1764: "5",
        f1765: "5",
        f1766: "4",
        f1767: "4",
        f1768: "4",
        f1769: "3",
        f1770: "1",
        f1771: "4",
        f1772: "3",
        f1773: "4",
        f1774: "3",
        f21: "3",
        f22: "5",
        f23: "1",
        f24: "2",
        f25: "2",
        f26: "2",
        f27: "1",
        f301: "2",
        f302: "",
        f303: "5",
        f401: "0",
        f402: "0",
        f403: "1",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "5",
        f7: "4",
        f7a: "2",
        f1001: "1",
        f1002: "",
        f1601: "0",
        f1602: "0",
        f1603: "1",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201006",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "57201",
        nimhsmsmh: "20502201007",
        nmmhsmsmh: "Maxim Holmes",
        telpomsmh: "087412589632",
        emailmsmh: "s2300007@student.unklab.ac.id",
        tahun_lulus: "2022",
        nik: "717109876432",
        npwp: "22587413694",
        f8: "1",
        f504: "1",
        f502: "1",
        f505: "8000000",
        f506: "",
        f5a1: "Daerah Istimewa Yogyakarta",
        f5a2: "Yogyakarta",
        f1101: "6",
        f1102: "",
        f5b: "Hope",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "1",
        f1202: "",
        f14: "4",
        f15: "3",
        f1761: "2",
        f1762: "4",
        f1763: "3",
        f1764: "3",
        f1765: "4",
        f1766: "4",
        f1767: "5",
        f1768: "5",
        f1769: "3",
        f1770: "3",
        f1771: "2",
        f1772: "3",
        f1773: "4",
        f1774: "3",
        f21: "3",
        f22: "4",
        f23: "1",
        f24: "2",
        f25: "4",
        f26: "3",
        f27: "2",
        f301: "1",
        f302: "1",
        f303: "",
        f401: "0",
        f402: "1",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "0",
        f7: "0",
        f7a: "0",
        f1001: "2",
        f1002: "",
        f1601: "1",
        f1602: "0",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201007",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "55201",
        nimhsmsmh: "20502201011",
        nmmhsmsmh: "Tybalt Champneys",
        telpomsmh: "089513578624",
        emailmsmh: "s2300011@student.unklab.ac.id",
        tahun_lulus: "2023",
        nik: "71716253465746",
        npwp: "87654321455",
        f8: "1",
        f504: "1",
        f502: "5",
        f505: "9000000",
        f506: "",
        f5a1: "DKI Jakarta",
        f5a2: "Kota Administrasi Jakarta Barat",
        f1101: "1",
        f1102: "",
        f5b: "Dinas Kebersihan",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "4",
        f1202: "",
        f14: "5",
        f15: "3",
        f1761: "4",
        f1762: "3",
        f1763: "5",
        f1764: "2",
        f1765: "4",
        f1766: "4",
        f1767: "5",
        f1768: "3",
        f1769: "4",
        f1770: "4",
        f1771: "4",
        f1772: "2",
        f1773: "5",
        f1774: "2",
        f21: "3",
        f22: "3",
        f23: "2",
        f24: "4",
        f25: "3",
        f26: "2",
        f27: "2",
        f301: "1",
        f302: "4",
        f303: "",
        f401: "1",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "4",
        f7: "3",
        f7a: "1",
        f1001: "1",
        f1002: "",
        f1601: "0",
        f1602: "0",
        f1603: "1",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201011",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "57201",
        nimhsmsmh: "20502201012",
        nmmhsmsmh: "Egor Smaling",
        telpomsmh: "08745136945",
        emailmsmh: "s2300012@student.unklab.ac.id",
        tahun_lulus: "2023",
        nik: "717154545214548",
        npwp: "78965412365487",
        f8: "1",
        f504: "1",
        f502: "5",
        f505: "8000000",
        f506: "",
        f5a1: "Banten",
        f5a2: "Serang",
        f1101: "6",
        f1102: "",
        f5b: "Ava Ia",
        f5c: "",
        f5d: "Lokal/Wilayah/Wiraswasta/tidak berbadan hukum",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "1",
        f1202: "",
        f14: "3",
        f15: "2",
        f1761: "3",
        f1762: "4",
        f1763: "4",
        f1764: "2",
        f1765: "3",
        f1766: "4",
        f1767: "2",
        f1768: "3",
        f1769: "4",
        f1770: "5",
        f1771: "3",
        f1772: "4",
        f1773: "2",
        f1774: "1",
        f21: "3",
        f22: "3",
        f23: "2",
        f24: "4",
        f25: "5",
        f26: "2",
        f27: "2",
        f301: "1",
        f302: "3",
        f303: "",
        f401: "1",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "0",
        f6: "5",
        f7: "3",
        f7a: "2",
        f1001: "1",
        f1002: "",
        f1601: "0",
        f1602: "1",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201012",
      },
      {
        kdptimsmh: "161002",
        kdpstmsmh: "57201",
        nimhsmsmh: "20502201016",
        nmmhsmsmh: "Rowan Origin",
        telpomsmh: "087451236589",
        emailmsmh: "s2300016@student.unklab.ac.id",
        tahun_lulus: "2023",
        nik: "7845123658",
        npwp: "7410258963025",
        f8: "5",
        f504: "",
        f502: "",
        f505: "",
        f506: "",
        f5a1: "",
        f5a2: "",
        f1101: "",
        f1102: "",
        f5b: "",
        f5c: "",
        f5d: "",
        f18a: "",
        f18b: "",
        f18c: "",
        f18d: "",
        f1201: "",
        f1202: "",
        f14: "",
        f15: "",
        f1761: "",
        f1762: "",
        f1763: "",
        f1764: "",
        f1765: "",
        f1766: "",
        f1767: "",
        f1768: "",
        f1769: "",
        f1770: "",
        f1771: "",
        f1772: "",
        f1773: "",
        f1774: "",
        f21: "",
        f22: "",
        f23: "",
        f24: "",
        f25: "",
        f26: "",
        f27: "",
        f301: "",
        f302: "",
        f303: "",
        f401: "0",
        f402: "0",
        f403: "0",
        f404: "0",
        f405: "0",
        f406: "0",
        f407: "0",
        f408: "0",
        f409: "0",
        f410: "0",
        f411: "0",
        f412: "0",
        f413: "0",
        f414: "0",
        f415: "0",
        f416: "",
        f6: "",
        f7: "",
        f7a: "",
        f1001: "",
        f1002: "",
        f1601: "0",
        f1602: "0",
        f1603: "0",
        f1604: "0",
        f1605: "0",
        f1606: "0",
        f1607: "0",
        f1608: "0",
        f1609: "0",
        f1610: "0",
        f1611: "0",
        f1612: "0",
        f1613: "0",
        f1614: "",
        studentId: "20502201016",
      },
    ],
  });

  await prisma.formSPT.createMany({
    data: [
      {
        full_name: "Brenda Rambi",
        reg_num: "s2200002",
        date_of_birth: "10-10-2002",
        gender: "FEMALE",
        nik: "71712345678910",
        nim: "10502201002",
        faculty: "Fakultas Ilmu Komputer",
        major: "Informatika",
        minor: "",
        birth_mother: "Ariana Grande",
        phone_num: "08177309038",
        personal_email: "brendarambi02@gmail.com",
        graduate_plan: "Semester II 2023/2024",
        remaining_credits: "6",
        remaining_classes: JSON.stringify([
          {
            subject: "Research Project II",
            sks: "3",
            keterangan: "Semester I 2023/2024",
          },
          {
            subject: "Introduction to Game Development",
            sks: "3",
            keterangan: "Semester I 2023/2024",
          },
        ]),
        certificateURL:
          "https://firebasestorage.googleapis.com/v0/b/filkom-apps-project.appspot.com/o/certificate%2F10502201002%2Fjavascript_basic%20certificate.pdf?alt=media&token=8bae54df-8f5c-4a47-9834-73491fe6dcb3",
        studentId: "10502201002",
      },
    ],
  });
}

main()
  .catch(async (e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
