const { AbilityBuilder, createMongoAbility } = require("@casl/ability");

const policyFor = (user) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  if (user.user.role === "ADMIN") {
    can("manage", "all"); // read-write access to everything
    can("read", "all");
  } else if (user.user.role.includes("DOSEN_MK")){
    can("manage", "Academic_Calendar");
    can("manage", "Classroom");
    can("manage", "Thesis_Student");
  }

  return build();
};

module.exports = {
  policyFor,
};
