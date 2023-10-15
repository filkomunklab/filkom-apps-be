const { AbilityBuilder, createMongoAbility } = require("@casl/ability");

const policyFor = ({ user }) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);
  console.log(user.id);
  if (user.role === "ADMIN") {
    can("manage", "all"); // read-write access to everything
  } else if (user.role === "ADMIN_LPMI") {
  } else if (user.role === "DEKAN") {
    can("read", "Employee");
    can("update", "Employee", { id: user.id });
  } else if (user.role === "OPERATOR_LPMI") {
  } else if (user.role === "KAPRODI") {
  } else if (user.role === "DOSEN") {
  } else if (user.role === "MAHASISWA") {
  } else if (user.role === "ALUMNI") {
  } else {
    can("read", "all");
  }

  return build();
};

module.exports = {
  policyFor,
};
