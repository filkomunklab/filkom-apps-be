//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

const findEmployees = async () => {
  const employee = await prisma.employee.findMany();
  return employee;
};

// @description     Get employee by id
// @used            Submission, Proposal
const findEmployeeById = async (id) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id,
    },
  });
  return employee;
};

const findEmployeeByToken = async (token) => {
  const employee = await prisma.employee.findUnique({
    where: {
      token,
    },
  });
  return employee;
};

const insertEmployee = async (payload) => {
  const {
    nik,
    password,
    firstName,
    lastName,
    email,
    Address,
    phoneNum,
    major,
  } = payload;
  const employee = await prisma.employee.create({
    data: {
      nik,
      password,
      firstName,
      lastName,
      email,
      Address,
      phoneNum,
      major,
    },
  });
  return employee;
};

const deleteEmployee = async (id) => {
  await prisma.employee.delete({
    where: {
      id,
    },
  });
};

const updateEmployee = async (id, payload) => {
  const { nik, password, firstName, lastName, token } = payload;
  const employee = await prisma.employee.update({
    where: {
      id,
    },
    data: {
      nik,
      password,
      firstName,
      lastName,
      token,
    },
  });
  return employee;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get employee by nik
// @used            Group
const findEmployeeByNIK = async (nik) => {
  const employee = await prisma.employee.findUnique({
    where: {
      nik,
    },
  });
  return employee;
};

const findEmployeeByMajor = async (major) => {
  try {
    const employee = await prisma.employee.findMany({
      where: {
        major,
      },
    });
    return employee;
  } catch (error) {
    return error;
  }
};

//Dosen biodata
const findDosenDetailProfile = async (nik) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        nik,
      },
      include: {
        student: {
          select: {
            nim: true,
            firstName: true,
            lastName: true,
            major: true,
            arrival_Year: true,
            status: true,
          },
        },
      },
    });
    return employee;
  } catch (error) {
    return error;
  }
};

const selectDekan = async () => {
  try {
    const dekan = await prisma.userRole.findMany({
      where: {
        role: "DEKAN",
      },
      select: {
        userId: true,
      },
    });

    return dekan;
  } catch (error) {
    throw error.message;
  }
};

const selectKaprodi = async () => {
  try {
    const kaprodi = await prisma.userRole.findMany({
      where: {
        role: "KAPRODI",
      },
      select: {
        userId: true,
      },
    });

    return kaprodi;
  } catch (error) {
    throw error.message;
  }
};

const selectDekanName = async (niks) => {
  try {
    const dekanName = await prisma.employee.findMany({
      where: {
        OR: [
          {
            nik: {
              in: niks.map((value) => value.userId),
            },
          },
        ],
      },
      select: {
        nik: true,
        firstName: true,
        lastName: true,
      },
    });

    return dekanName;
  } catch (error) {
    throw error.message;
  }
};

const selectKaprodiNameByMajor = async (major, niks) => {
  try {
    const kaprodiNameByMajor = await prisma.employee.findMany({
      where: {
        AND: [
          {
            nik: {
              in: niks.map((value) => value.userId),
            },
          },
          {
            major,
          },
        ],
      },
      select: {
        nik: true,
        firstName: true,
        lastName: true,
      },
    });

    return kaprodiNameByMajor;
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  findEmployees,
  findEmployeeById,
  findEmployeeByToken,
  insertEmployee,
  deleteEmployee,
  updateEmployee,
  findEmployeeByNIK,
  findEmployeeByMajor,
  findDosenDetailProfile,
  selectDekan,
  selectDekanName,
  selectKaprodi,
  selectKaprodiNameByMajor,
};
