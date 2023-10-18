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
    can("read", "Submission");
  } else if (user.role === "OPERATOR_LPMI") {
  } else if (user.role === "KAPRODI") {
    can("read", "Submission");
  } else if (user.role === "DOSEN") {
    can("read", "Submission");
  } else if (user.role.includes("MAHASISWA")) {
    can("create", "Submission");
    can("read", "Submission");
    can("update", "Submission");
    can("update", "Proposal");
  } else if (user.role === "ALUMNI") {
  } else if (user.role.includes("DOSEN_MK")){
    can("manage", "Academic_Calendar");
    can("manage", "Classroom");
    can("manage", "Thesis_Student");
    can("read", "Submission");
    can("update", "Submission");
  } else {
    can("read", "all");
  }

  return build();
};

module.exports = {
  policyFor,
};
