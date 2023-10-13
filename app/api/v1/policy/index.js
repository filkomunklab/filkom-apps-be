const { AbilityBuilder, createMongoAbility } = require("@casl/ability");

const policyFor = (user) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  if (user.user.role === "ADMIN") {
    can("manage", "all"); // read-write access to everything
  } else {
    can("read", "all");
  }

  return build();
};

module.exports = {
  policyFor,
};
