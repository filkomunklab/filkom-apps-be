const prisma = require("../../../database");
const userManagementRepository = require("./user_namagement.repository");

const updateRoles = async (id, payload) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      console.log("ini id: ", id);
      await userManagementRepository.deleteEmployeeRoles(prisma, id);
      const employeeRole = await userManagementRepository.CreateManyRole(
        prisma,
        payload
      );

      console.log("ini employe coi: ", employeeRole);
      return employeeRole;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateRoles,
};
