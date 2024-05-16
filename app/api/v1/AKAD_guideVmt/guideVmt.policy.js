const { AbilityBuilder } = require("@casl/ability");
const { createPrismaAbility } = require("@casl/prisma");

const guideVmtPolicy = ({ user }) => {
  const { can, build } = new AbilityBuilder(createPrismaAbility);

  const hasRole = (role) => user.role.includes(role);

  if (hasRole("DEKAN")) {
    can("update", "visi-misi-tujuan");
    can("update", "academic-guide");
  }

  return build();
};

module.exports = {
  guideVmtPolicy,
};
