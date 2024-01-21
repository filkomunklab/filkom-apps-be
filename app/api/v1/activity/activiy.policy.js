const { AbilityBuilder } = require("@casl/ability");
const { createPrismaAbility } = require("@casl/prisma");

const activityPolicy = ({ user }) => {
  const { can, build } = new AbilityBuilder(createPrismaAbility);

  const hasRole = (role) => user.role.includes(role);

  if (hasRole("MAHASISWA")) {
    can("read", "activity");
    can("read", "historyForStudent");
    can("read", "currentActivity");
  }

  if (hasRole("DOSEN")) {
    can("create", "activity");
    can("read", "activity");
    can("read", "historyForAdvisor");
    can("read", "currentActivity");
    can("update", "attendance");
  }

  if (hasRole("KAPRODI")) {
    can("read", "studentList");
  }

  return build();
};

module.exports = {
  activityPolicy,
};
