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

const findEmployeeRoleByNik = async (nik) => {
  const { role } = await prisma.userRole.findUnique({
    where: {
      userId: nik,
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
  findEmployeeRoleByNik,
};
