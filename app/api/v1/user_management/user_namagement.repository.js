//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all user with role DOSEN
// @used            Group
const findAllUserDosenByRole = async (role) => {
  const userRole = await prisma.userRole.findMany({
    where: {
      role,
    },
  });
  return userRole;
};

module.exports = {
  findAllUserDosenByRole,
};
