const { AbilityBuilder } = require("@casl/ability");
const { createPrismaAbility } = require("@casl/prisma");

const preRegistPolicy = ({ user }) => {
  const { can, build } = new AbilityBuilder(createPrismaAbility);

  const hasRole = (role) => user.role.includes(role);

  if (hasRole("MAHASISWA")) {
    can("read", "subjects");
    can("read", "preRegistAccess");
    can("create", "submitPreRegist");
    can("read", "preRegistHistoryForStudent");
  }

  if (hasRole("KAPRODI")) {
    can("read", "allPreRegist");
    can("create", "preRegist");
  }

  if (hasRole("DEKAN")) {
    can("read", "allPreRegist");
  }

  if (hasRole("DOSEN")) {
    can("update", "preRegistApproval");
    can("read", "preRegistList");
    can("read", "preRegistDetails");
    can("read", "preRegistHistoryForAdvisor");
  }

  return build();
};

module.exports = {
  preRegistPolicy,
};
