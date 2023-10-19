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
  const { role } = await prisma.userRole.findMany({
    where: {
      userId: id,
    },
    select: {
      role: true,
    },
  });

  return role;
};

const findRolesByUserId = async (id) => {
  const userRoles = await prisma.userRole.findMany({
    where: {
      userId: id,
    },
    select: {
      role: true,
    },
  });

  return userRoles.map((userRole) => userRole.role);
};


module.exports = {
  findAdminByUsername,
  findEmployeeByNik,
  findStudentByNim,
  findRoleById,
  findRolesByUserId,
};
