const { AbilityBuilder, createMongoAbility } = require("@casl/ability");

const policyFor = ({ user }) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);
  console.log(user.id);
  if (user.role === "ADMIN") {
    can("manage", "all"); // read-write access to everything
  } else if (user.role === "ADMIN_LPMI") {
  } else if (user.role.includes("DEKAN")) {
    can("read", "Employee");
    can("update", "Employee", { id: user.id });
    // Dekan view submission
    can("read", "Submission");
    // Dekan view proposal document
    can("read", "proposal_document");
    // Dekan view proposal payment
    can("read", "proposal_payment");
    // Dekan view proposal plagiarism
    can("read", "proposal_plagiarism");
  } else if (user.role === "OPERATOR_LPMI") {
  } else if (user.role.includes("OPERATOR_FAKULTAS")) {
    // Sekertaris view proposal document
    can("read", "proposal_document");
    // Sekertaris view proposal payment
    can("read", "proposal_payment");
    // Sekertaris view proposal plagiarism
    can("read", "proposal_plagiarism");
    // Sekertaris view proposal_schedule
    can("read", "proposal_schedule");
    // Sekertaris update proposal_schedule
    can("update", "proposal_schedule");
  } else if (user.role.includes("DOSEN_MK")) {
    // Dosen MK manage academic_calendar
    can("manage", "Academic_Calendar");
    // Dosen MK manage classroom
    can("manage", "Classroom");
    // Dosen MK manage proposal_student & skripsi_student
    can("manage", "thesis_student");
    // Dosen MK view submission
    can("read", "Submission");
    // Dosen MK update advisor & co-advisor in submission
    can("update", "proposed_advisor_and_co_advisor");
    // Dosen MK update is_approve in submission
    can("update", "approve_submission");
    // Dosen MK update title in group
    can("update", "title");
    // Dosen MK view proposal document
    can("read", "proposal_document");
    // Dosen MK view proposal payment
    can("read", "proposal_payment");
    // Dosen MK view proposal plagiarism
    can("read", "proposal_plagiarism");
  } else if (user.role.includes("KAPRODI")) {
    // Kaprodi view submission
    can("read", "Submission");
    // Kaprodi view proposal document
    can("read", "proposal_document");
    // Kaprodi view proposal payment
    can("read", "proposal_payment");
    // Kaprodi view proposal plagiarism
    can("read", "proposal_plagiarism");
  } else if (user.role.includes("DOSEN")) {
    // Dosen view submission
    can("read", "Submission");
    // Dosen view proposal document
    can("read", "proposal_document");
    // Advisor, Co-advisor approve document proposal
    can("update", "is_proposal_approve");
    // Dosen view proposal pyment
    can("read", "proposal_payment");
    // Dosen view proposal plagiarism
    can("read", "proposal_plagiarism");
  } else if (user.role.includes("MAHASISWA")) {
    can("create", "Submission");
    // Mahasiswa view submission
    can("read", "Submission");
    // Mahasiswa update submission/title
    can("update", "Submission");
    // Mahasiswa upload/update proposal document
    can("update", "proposal_document");
    // Mahasiswa view proposal document
    can("read", "proposal_document");
    // Mahasiswa view proposal payment
    can("read", "proposal_payment");
    // Mahasiswa upload/update proposal payment
    can("update", "proposal_payment");
    // Mahasiswa view proposal plagiarism
    can("read", "proposal_plagiarism");
    // Mahasiswa upload/update proposal plagiarism
    can("update", "proposal_plagiarism");
  } else if (user.role === "ALUMNI") {
  } else if (user.role.includes("DOSEN_MK")) {
    // can("manage", "Thesis_Student");
  } else {
    can("read", "all");
  }

  return build();
};

module.exports = {
  policyFor,
};
