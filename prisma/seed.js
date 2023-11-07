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
        gender: "MALE",
        firstName: "John",
        lastName: "Doe",
        email: "student@mail.com",
        nim: "student",
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
        email: "sekretaris@test.com",
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
        email: "frances@mail.com",
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
        email: "geovalga@mail.com",
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

  await prisma.student
    .create({
      data: {
        id: angelId,
        gender: "FEMALE",
        firstName: "Angel Triany",
        lastName: "Pangkey",
        email: "pangkey@mail.com",
        nim: "105021920003",
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
        id: marcelId,
        gender: "MALE",
        firstName: "Marcel Eferson Putra",
        lastName: "Haerani",
        email: "haerani@mail.com",
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
        email: "saerang@mail.com",
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
        email: "rizky@mail.com",
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
        email: "diana@mail.com",
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
        email: "ahmad@mail.com",
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
        email: "bella@mail.com",
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
        email: "faisal@mail.com",
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
        email: "cindy@mail.com",
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
        email: "robby@mail.com",
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
        email: "siti@mail.com",
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
        email: "wahyu@mail.com",
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
        email: "nadia@mail.com",
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

        if (classroomProposal1 && classroomSkripsi1) {
          // proposal_student 1 - 1
          const proposalStudent1 = await prisma.proposal_Student.create({
            data: {
              student_id: angelId,
              classroom_id: classroomProposal1.id,
            },
          });

          // skripsi_student 1 - 1
          const skripsiStudent1 = await prisma.skripsi_Student.create({
            data: {
              student_id: angelId,
              classroom_id: classroomSkripsi1.id,
            },
          });

          if (proposalStudent1 && skripsiStudent1) {
            // group 1 - 1
            const group = await prisma.group.create({
              data: {
                title: "Pengambangan Aplikasi Dinning",
                progress: "Finished",
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
                  file_name: "pengembangan_aplikasi_dinning.pdf",
                  upload_date: new Date(),
                  file_size: "2.5 MB",
                  file_path: "link_pengembangan_aplikasi_dinning",
                  is_consultation: true,
                  proposed_advisor_id: dekanId,
                  proposed_co_advisor1_id: dosen1Id,
                  is_approve: "Approve",
                  classroom_id: classroomProposal1.id,
                },
              });

              if (submission) {
                // proposal 1 - 1
                const proposal = await prisma.proposal.create({
                  data: {
                    file_name_proposal: "pengembangan_aplikasi_dinning.pdf",
                    file_name_payment: "pembayaran.pdf",
                    file_name_plagiarismcheck: "plagiat.pdf",
                    upload_date_proposal: new Date(),
                    upload_date_payment: new Date(),
                    upload_date_plagiarismcheck: new Date(),
                    file_size_proposal: "2.5 MB",
                    file_size_payment: "2.5 MB",
                    file_size_plagiarismcheck: "2.5 MB",
                    file_path_proposal: "link_pengembangan_aplikasi_dinning",
                    file_path_payment: "link_pembayaran",
                    file_path_plagiarismcheck: "link_plagiat",
                    advisor_id: dekanId,
                    co_advisor1_id: dosen1Id,
                    classroom_id: classroomProposal1.id,
                    is_proposal_approve_by_advisor: "Approve",
                    is_proposal_approve_by_co_advisor1: "Approve",
                    is_proposal_approve_by_co_advisor2: "Approve",
                    advisor_proposal_approved_date: new Date(),
                    co_advisor1_proposal_approved_date: new Date(),
                    co_advisor2_proposal_approved_date: new Date(),
                    panelist_chairman_id: dosen2Id,
                    panelist_member_id: dosen3Id,
                    start_defence: "08.00",
                    end_defence: "10.00",
                    defence_room: "GK1-206",
                    defence_date: "10/09/2022",
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
                    file_name_revision:
                      "revisi_pengembangan_aplikasi_dinning.pdf",
                    upload_date_revision: new Date(),
                    file_size_revision: "2.5 MB",
                    file_path_revision: "link_revisi",
                    is_revision_approve_by_panelist_chairman: "Approve",
                    is_revision_approve_by_panelist_member: "Approve",
                    is_revision_approve_by_advisor: "Approve",
                    panelist_chairman_revision_approve_date: new Date(),
                    panelist_member_revision_approve_date: new Date(),
                    advisor_revision_approve_date: new Date(),
                  },
                });

                if (proposal) {
                  // konsultasi 1 - advisor (1)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 1",
                      date: new Date(),
                      dosen_id: dekanId,
                    },
                  });
                  // konsultasi 1 - advisor (2)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 2",
                      date: new Date(),
                      dosen_id: dekanId,
                    },
                  });
                  // konsultasi 1 - advisor (3)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 3",
                      date: new Date(),
                      dosen_id: dekanId,
                    },
                  });
                  // konsultasi 1 - co-advisor1 (1)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi sistem",
                      date: new Date(),
                      dosen_id: dosen1Id,
                    },
                  });
                  // konsultasi 1 - co-advisor1 (2)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi database",
                      date: new Date(),
                      dosen_id: dosen1Id,
                    },
                  });
                  // konsultasi 1 - co-advisor1 (3)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi metode",
                      date: new Date(),
                      dosen_id: dosen1Id,
                    },
                  });

                  // assessment 1 - student1 - ketua
                  await prisma.proposal_Assessment.create({
                    data: {
                      proposal_id: proposal.id,
                      student_id: proposalStudent1.student_id,
                      dosen_id: dosen2Id,
                      value: "9",
                    },
                  });
                  // assessment 1 - student1 - anggota
                  await prisma.proposal_Assessment.create({
                    data: {
                      proposal_id: proposal.id,
                      student_id: proposalStudent1.student_id,
                      dosen_id: dosen3Id,
                      value: "9",
                    },
                  });
                  // assessment 1 - student1 - advisor
                  await prisma.proposal_Assessment.create({
                    data: {
                      proposal_id: proposal.id,
                      student_id: proposalStudent1.student_id,
                      dosen_id: dekanId,
                      value: "9",
                    },
                  });

                  // changes 1 - ketua
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: dosen2Id,
                      changes: "Ubah Bab 1",
                    },
                  });
                  // changes 1 - anggota
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: dosen3Id,
                      changes: "Ubah Bab 2",
                    },
                  });
                  // changes 1 - advisor
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: dekanId,
                      changes: "Ubah Bab 3",
                    },
                  });
                  // changes 1 - co-advisor1
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: dosen1Id,
                      changes: "Ubah Gambar",
                    },
                  });
                }

                // skripsi 1 - 1
                const skripsi = await prisma.skripsi.create({
                  data: {
                    file_name_skripsi: "pengembangan_aplikasi_dinning.pdf",
                    file_name_payment: "pembayaran.pdf",
                    file_name_plagiarismcheck: "plagiat.pdf",
                    upload_date_skripsi: new Date(),
                    upload_date_payment: new Date(),
                    upload_date_plagiarismcheck: new Date(),
                    file_size_skripsi: "2.5 MB",
                    file_size_payment: "2.5 MB",
                    file_size_plagiarismcheck: "2.5 MB",
                    file_path_skripsi: "link_pengembangan_aplikasi_dinning",
                    file_path_payment: "link_pembayaran",
                    file_path_plagiarismcheck: "link_plagiat",
                    advisor_id: dekanId,
                    co_advisor1_id: dosen1Id,
                    classroom_id: classroomProposal1.id,
                    is_skripsi_approve_by_advisor: "Approve",
                    is_skripsi_approve_by_co_advisor1: "Approve",
                    is_skripsi_approve_by_co_advisor2: "Approve",
                    advisor_skripsi_approved_date: new Date(),
                    co_advisor1_skripsi_approved_date: new Date(),
                    co_advisor2_skripsi_approved_date: new Date(),
                    panelist_chairman_id: dosen2Id,
                    panelist_member_id: dosen3Id,
                    start_defence: "10.00",
                    end_defence: "12.00",
                    defence_room: "GK1-206",
                    defence_date: "01/03/2023",
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
                    report_date: "01/03/2023",
                    file_name_revision:
                      "revisi_pengembangan_aplikasi_dinning.pdf",
                    upload_date_revision: new Date(),
                    file_size_revision: "2.5 MB",
                    file_path_revision: "link_revisi",
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
                  // konsultasi 1 - advisor (1)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 4",
                      date: new Date(),
                      dosen_id: dekanId,
                    },
                  });
                  // konsultasi 1 - advisor (2)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 5",
                      date: new Date(),
                      dosen_id: dekanId,
                    },
                  });
                  // konsultasi 1 - advisor (3)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi penulisan",
                      date: new Date(),
                      dosen_id: dekanId,
                    },
                  });
                  // konsultasi 1 - co-advisor1 (1)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi server",
                      date: new Date(),
                      dosen_id: dosen1Id,
                    },
                  });
                  // konsultasi 1 - co-advisor1 (2)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi role",
                      date: new Date(),
                      dosen_id: dosen1Id,
                    },
                  });
                  // konsultasi 1 - co-advisor1 (3)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi model",
                      date: new Date(),
                      dosen_id: dosen1Id,
                    },
                  });

                  // assessment 1 - student1 - ketua
                  await prisma.skripsi_Assessment.create({
                    data: {
                      skripsi_id: skripsi.id,
                      student_id: skripsiStudent1.student_id,
                      dosen_id: dosen2Id,
                      value: "9",
                    },
                  });
                  // assessment 1 - student1 - anggota
                  await prisma.skripsi_Assessment.create({
                    data: {
                      skripsi_id: skripsi.id,
                      student_id: skripsiStudent1.student_id,
                      dosen_id: dosen3Id,
                      value: "9",
                    },
                  });
                  // assessment 1 - student1 - advisor
                  await prisma.skripsi_Assessment.create({
                    data: {
                      skripsi_id: skripsi.id,
                      student_id: skripsiStudent1.student_id,
                      dosen_id: dekanId,
                      value: "9",
                    },
                  });

                  // changes 1 - ketua
                  await prisma.skripsi_Changes.create({
                    data: {
                      skripsi_id: skripsi.id,
                      dosen_id: dosen2Id,
                      changes: "Ubah Bab 4",
                    },
                  });

                  // changes 1 - anggota
                  await prisma.skripsi_Changes.create({
                    data: {
                      skripsi_id: skripsi.id,
                      dosen_id: dosen3Id,
                      changes: "Ubah Bab 5",
                    },
                  });

                  // changes 1 - advisor
                  await prisma.skripsi_Changes.create({
                    data: {
                      skripsi_id: skripsi.id,
                      dosen_id: dekanId,
                      changes: "Ubah Bab use case",
                    },
                  });

                  // changes 1 - co-advisor1
                  await prisma.skripsi_Changes.create({
                    data: {
                      skripsi_id: skripsi.id,
                      dosen_id: dosen1Id,
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

          // proposal_student 1 - 2
          const proposalStudent2 = await prisma.proposal_Student.create({
            data: {
              student_id: cindyID,
              classroom_id: classroomProposal1.id,
            },
          });

          if (proposalStudent2) {
            // group 1 - 2
            const group = await prisma.group.create({
              data: {
                title: "Pengambangan Sistem Absensi",
                progress: "Skripsi",
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
                  file_name: "Pengambangan Sistem Absensi.pdf",
                  upload_date: new Date(),
                  file_size: "2.5 MB",
                  file_path: "link_Pengambangan Sistem Absensi",
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
                    file_name_proposal: "Pengambangan Sistem Absensi.pdf",
                    file_name_payment: "pembayaran.pdf",
                    file_name_plagiarismcheck: "plagiat.pdf",
                    upload_date_proposal: new Date(),
                    upload_date_payment: new Date(),
                    upload_date_plagiarismcheck: new Date(),
                    file_size_proposal: "2.5 MB",
                    file_size_payment: "2.5 MB",
                    file_size_plagiarismcheck: "2.5 MB",
                    file_path_proposal: "link_Pengambangan Sistem Absensi",
                    file_path_payment: "link_pembayaran",
                    file_path_plagiarismcheck: "link_plagiat",
                    advisor_id: dosen1Id,
                    co_advisor1_id: dosen2Id,
                    classroom_id: classroomProposal1.id,
                    is_proposal_approve_by_advisor: "Approve",
                    is_proposal_approve_by_co_advisor1: "Approve",
                    is_proposal_approve_by_co_advisor2: "Approve",
                    advisor_proposal_approved_date: new Date(),
                    co_advisor1_proposal_approved_date: new Date(),
                    co_advisor2_proposal_approved_date: new Date(),
                    panelist_chairman_id: dosen3Id,
                    panelist_member_id: dekanId,
                    start_defence: "11.00",
                    end_defence: "13.00",
                    defence_room: "GK1-206",
                    defence_date: "10/09/2022",
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
                    file_name_revision:
                      "revisi Pengambangan Sistem Absensi.pdf",
                    upload_date_revision: new Date(),
                    file_size_revision: "2.5 MB",
                    file_path_revision: "link_revisi",
                    is_revision_approve_by_panelist_chairman: "Approve",
                    is_revision_approve_by_panelist_member: "Approve",
                    is_revision_approve_by_advisor: "Approve",
                    panelist_chairman_revision_approve_date: new Date(),
                    panelist_member_revision_approve_date: new Date(),
                    advisor_revision_approve_date: new Date(),
                  },
                });

                if (proposal) {
                  // konsultasi 2 - advisor (1)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 1",
                      date: new Date(),
                      dosen_id: dosen1Id,
                    },
                  });
                  // konsultasi 2 - advisor (2)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 2",
                      date: new Date(),
                      dosen_id: dosen1Id,
                    },
                  });
                  // konsultasi 2 - advisor (3)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi bab 3",
                      date: new Date(),
                      dosen_id: dosen1Id,
                    },
                  });
                  // konsultasi 2 - co-advisor1 (1)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi sistem",
                      date: new Date(),
                      dosen_id: dosen2Id,
                    },
                  });
                  // konsultasi 2 - co-advisor1 (2)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi database",
                      date: new Date(),
                      dosen_id: dosen2Id,
                    },
                  });
                  // konsultasi 2 - co-advisor1 (3)
                  await prisma.thesis_Consultation.create({
                    data: {
                      group_id: group.id,
                      description: "Konsultasi metode",
                      date: new Date(),
                      dosen_id: dosen2Id,
                    },
                  });

                  // assessment 2 - student1 - ketua
                  await prisma.proposal_Assessment.create({
                    data: {
                      proposal_id: proposal.id,
                      student_id: proposalStudent2.student_id,
                      dosen_id: dosen3Id,
                      value: "9",
                    },
                  });
                  // assessment 2 - student1 - anggota
                  await prisma.proposal_Assessment.create({
                    data: {
                      proposal_id: proposal.id,
                      student_id: proposalStudent2.student_id,
                      dosen_id: dekanId,
                      value: "9",
                    },
                  });
                  // assessment 2 - student1 - advisor
                  await prisma.proposal_Assessment.create({
                    data: {
                      proposal_id: proposal.id,
                      student_id: proposalStudent1.student_id,
                      dosen_id: dosen1Id,
                      value: "9",
                    },
                  });

                  // changes 2 - ketua
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: dosen3Id,
                      changes: "Ubah Bab 1",
                    },
                  });
                  // changes 2 - anggota
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: dekanId,
                      changes: "Ubah Bab 2",
                    },
                  });
                  // changes 2 - advisor
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: dosen1Id,
                      changes: "Ubah Bab 3",
                    },
                  });
                  // changes 2 - co-advisor1
                  await prisma.proposal_Changes.create({
                    data: {
                      proposal_id: proposal.id,
                      dosen_id: dosen2Id,
                      changes: "Ubah Gambar",
                    },
                  });
                }

                // skripsi 1 - 2
                const skripsi = await prisma.skripsi.create({
                  data: {
                    advisor_id: dosen1Id,
                    co_advisor1_id: dosen2Id,
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
  // CREATE SPT
  // await prisma.formSPT.create({
  //   data: {
  //     birth_mother: "Ariana",
  //     date_of_birth: "27/06/1998",
  //     gender: "LAKILAKI",
  //     graduate_plan: "Semester 8",
  //     nik: "12343567",
  //     remaining_classes:
  //       "[{subject: 'IGD', sks: '3'}, {subject: 'Entre', sks: '3'}, {subject: 'Web Design', sks: '3'}, {subject: 'Math', sks: '3'}, {subject: 'Family Living', sks: '3'}]",
  //     remaining_credits: "3",
  //     studentId: "student",
  //   },
  // });

  await prisma.formSPT.createMany({
    data: [
      {
        birth_mother: "Ariana",
        graduate_plan: "Semester II 2023/2024",
        nik: "12343567",
        remaining_classes:
          "[{subject: 'IGD', sks: '3'}, {subject: 'Entre', sks: '3'}, {subject: 'Web Design', sks: '3'}, {subject: 'Math', sks: '3'}, {subject: 'Family Living', sks: '3'}]",
        remaining_credits: "3",
        studentId: "student",
      },
      {
        birth_mother: "Briana",
        graduate_plan: "Semester II 2023/2024",
        nik: "0987654321",
        remaining_classes:
          "[{subject: 'IGD', sks: '3'}, {subject: 'Entre', sks: '3'}, {subject: 'Web Design', sks: '3'}, {subject: 'Math', sks: '3'}, {subject: 'Family Living', sks: '3'}]",
        remaining_credits: "15",
        studentId: "student",
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
