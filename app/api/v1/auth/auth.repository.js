const prisma = require("../../../database");

const findAdminByUsername = async (username) => {
  const admin = await prisma.admin.findUnique({
    where: {
      username,
    },
  });
  return admin;
};

module.exports = {
  findAdminByUsername,
};
