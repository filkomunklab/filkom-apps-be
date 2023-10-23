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
  await prisma.employee
    .create({
      data: {
        firstName: "Alumni",
        lastName: "Alumni",
        nik: "alumni",
        password:
          "$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu",
      },
    })
    .then(async (employee) => {
      await prisma.userRole.create({
        data: {
          userId: employee.nik,
          role: "ALUMNI",
        },
      });
    });

  // CREATE DOSEN
  await prisma.employee
    .create({
      data: {
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
}

main()
  .catch(async (e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
