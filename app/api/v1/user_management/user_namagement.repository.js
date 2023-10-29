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

module.exports = {
  findAllUserByRole,
  findUserByNIKAndRole,
};
