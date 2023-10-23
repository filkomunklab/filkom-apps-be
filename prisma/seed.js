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
  // CREATE STUDENT
  await prisma.student
    .create({
      data: {
        id: "1efcdc53-f12c-4683-b9ff-db6e53fe5c83",
        gender: "MALE",
        firstName: "Frances",
        lastName: "Yong",
        email: "frances@mail.com",
        nim: "frances",
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
        id: "9036e2e9-3601-4f00-b74a-bf4e731c9eb8",
        gender: "MALE",
        firstName: "Geovalga",
        lastName: "Lim",
        email: "geovalga@mail.com",
        nim: "geovalga",
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
        id: "2eb35687-c414-4634-b010-1b64caa1bf27",
        Address: "Manado",
        email: "dosen1@test.com",
        phoneNum: "0812374832",
        firstName: "Lecturer1",
        lastName: "Dosen1",
        degree: "MT, PhD",
        nik: "dosen1",
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
        id: "cebd73c8-9ad9-4136-a65a-50ad7b4d5896",
        Address: "Manado",
        phoneNum: "082384701298",
        email: "dosen2@test.com",
        firstName: "Lecturer2",
        lastName: "Dosen2",
        degree: "SKom, MSc",
        nik: "dosen2",
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
        id: "9ddc8258-3fa2-40ea-8477-1a651c9039be",
        Address: "Manado",
        phoneNum: "081283749",
        email: "dosen3@test.com",
        firstName: "Lecturer3",
        lastName: "Dosen3",
        degree: "SKom, MDs, MM",
        nik: "dosen3",
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

  // CREATE DOSEN
  await prisma.employee
    .create({
      data: {
        id: "550e8400-e29b-41d4-a716-446655440000",
        firstName: "Lecturer4",
        lastName: "Dosen4",
        degree: "MT, PhD",
        nik: "dosen4",
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
        id: "f6b7d2b0-b7f8-4393-9027-e4374e1eea52",
        Address: "Manado",
        phoneNum: "08128374982",
        email: "dosen4@test.com",
        firstName: "Sekretaris",
        lastName: "FILKOM",
        nik: "sekretarisfilkom",
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
