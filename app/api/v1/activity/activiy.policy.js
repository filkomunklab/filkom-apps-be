const { AbilityBuilder } = require("@casl/ability");
const { createPrismaAbility } = require("@casl/prisma");

const activityPolicy = ({ user }) => {
  const { can, build } = new AbilityBuilder(createPrismaAbility);

  const hasRole = (role) => user.role.includes(role);

  if (hasRole("MAHASISWA")) {
    can("read", "Activity");
    can("read", "historyForStudent");
    can("read", "currentActivity");
  }

  if (hasRole("DOSEN")) {
    can("create", "activity");
    can("read", "Activity");
    can("read", "historyForAdvisor");
    can("read", "currentActivity");
    can("update", "attendance");
  }

  if (hasRole("KAPRODI")) {
    can("read", "studentList");
    can("read", "historyForAdvisor");
    can("read", "Activity");
  }

  if (hasRole("DEKAN")) {
    can("read", "historyForAdvisor");
    can("read", "Activity");
  }

  return build();
};

module.exports = {
  activityPolicy,
};
