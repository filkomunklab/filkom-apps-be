const prisma = require("../../../database");
const userManagementRepository = require("./user_namagement.repository");

const updateRoles = async (id, payload) => {
  try {
    const result = await prisma.$transaction(
      async (prisma) => {
        console.log("ini id: ", id);
        await userManagementRepository.deleteUserRoles(prisma, id);
        const userRole = await userManagementRepository.CreateManyRole(
          prisma,
          payload
        );

        console.log("ini employe coi: ", userRole);
        return userRole;
      },
      { timeout: 30000, maxWait: 25000 }
    );

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateRoles,
};
