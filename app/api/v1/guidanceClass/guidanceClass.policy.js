const { AbilityBuilder } = require("@casl/ability");
const { createPrismaAbility } = require("@casl/prisma");

const guidanceClassPolicy = ({ user }) => {
  const { can, build } = new AbilityBuilder(createPrismaAbility);

  const hasRole = (role) => user.role.includes(role);

  if (hasRole("MAHASISWA")) {
    can("read", "guidanceClassDetail");
  }

  if (hasRole("DOSEN")) {
    can("read", "guidanceClassDetail");
  }

  if (hasRole("KAPRODI")) {
    can("create", "guidaceClass");
    can("update", "guidaceClassStudent");
    can("delete", "guidaceClassStudent");
    can("delete", "guidaceClass");
    can("read", "allClass");
    can("read", "allUnassignedStudent");
    can("read", "allUnassignedTeacher");
    can("read", "guidanceClassDetail");
  }

  if (hasRole("DEKAN")) {
    can("read", "allClass");
    can("read", "guidanceClassDetail");
  }

  if (hasRole("SEKRETARIS")) {
    can("read", "allClass");
    can("read", "guidanceClassDetail");
    can("read", "allUnassignedStudent");
    can("read", "allUnassignedTeacher");
  }

  if (hasRole("OPERATOR_FAKULTAS")) {
    can("read", "allClass");
    can("read", "guidanceClassDetail");
    can("read", "allUnassignedStudent");
    can("read", "allUnassignedTeacher");
  }

  return build();
};

module.exports = {
  guidanceClassPolicy,
};
