//Layer untuk komunikasi dengan database
const prisma = require("../../../database");
const { createHttpStatusError } = require("../../../utils");

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
// @used            Group
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
// @description     Create Many Role
// @used
const CreateManyRole = async (prisma, data) => {
  try {
    const userRole = await prisma.userRole.createMany({
      data,
    });
    return userRole;
  } catch (error) {
    throw error;
  }
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Find User Role by userId
// @used
const FindUserRoleByUserId = async (id) => {
  try {
    const userRole = await prisma.userRole.findMany({
      where: {
        userId: id,
      },
    });
    return userRole;
  } catch (error) {
    throw error;
  }
};

const deleteEmployeeRoles = async (prisma, nik) => {
  try {
    const count = await prisma.userRole.deleteMany({
      where: {
        userId: nik,
      },
    });

    if (count.count === 0) {
      throw createHttpStatusError(`Employee with ID ${id} not found.`, 400);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAllUserByRole,
  findUserByNIKAndRole,
  CreateManyRole,
  FindUserRoleByUserId,
  deleteEmployeeRoles,
};
