//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all user with role
// @used            Group
const findAllUserByRole = async (role) => {
  const userRole = await prisma.userRole.findMany({
    where: {
      role,
    },
  });
  return userRole;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get user with userId & role
// @used            Group, Employee
const findUserByNIKAndRole = async (userId, role) => {
  const userRole = await prisma.userRole.findFirst({
    where: {
      userId,
      role,
    },
  });
  return userRole;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all user with userId & role
// @used            Employee
const findAllUserByNIKAndRole = async (userId, role) => {
  const userRole = await prisma.userRole.findMany({
    where: {
      userId,
      role,
    },
  });
  return userRole;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Create role by nik and role
// @used            Employee
const inputRoleByNIK = async (userId, role) => {
  const userRole = await prisma.userRole.create({
    data: {
      userId,
      role,
    },
  });
  return userRole;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Delete role by id
// @used            Employee
const deleteRoleById = async (id) => {
  const userRole = await prisma.userRole.delete({
    where: {
      id,
    },
  });
  return userRole;
};

module.exports = {
  findAllUserByRole,
  findUserByNIKAndRole,
  findAllUserByNIKAndRole,
  inputRoleByNIK,
  deleteRoleById,
};
