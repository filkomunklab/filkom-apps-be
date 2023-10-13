const prisma = require("../../../database");

const findAdminByUsername = async (username) => {
  const admin = await prisma.admin.findUnique({
    where: {
      username,
    },
  });
  return admin;
};

const findEmployeeByNik = async (nik) => {
  const employee = await prisma.employee.findUnique({
    where: {
      nik,
    },
  });

  return employee;
};

const findStudentByNim = async (nim) => {
  const student = await prisma.student.findUnique({
    where: {
      nim,
    },
  });

  return student;
};

const findRoleById = async (id) => {
  const { role } = await prisma.userRole.findUnique({
    where: {
      userId: id,
    },
    select: {
      role: true,
    },
  });

  return role;
};

module.exports = {
  findAdminByUsername,
  findEmployeeByNik,
  findStudentByNim,
  findRoleById,
};
