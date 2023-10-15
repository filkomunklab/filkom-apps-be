const { AbilityBuilder, createMongoAbility } = require("@casl/ability");

const policyFor = (user) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  if (user.user.role === "ADMIN") {
    can("manage", "all"); // read-write access to everything
  } else {
    can("read", "all");
  }

  if (user.user.role.includes("DOSEN_MK")) {
  can("manage", "Academic_Calendar");
} else {
  can("read", "Academic_Calendar");
}


  return build();
};

module.exports = {
  policyFor,
};
