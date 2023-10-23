const { AbilityBuilder, createMongoAbility } = require("@casl/ability");

const policyFor = ({ user }) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  // Helper function to check if user has a role
  const hasRole = (role) => user.role.includes(role);

  console.log(user.id);

  if (hasRole("ADMIN")) {
    can("manage", "all"); // read-write access to everything
  }

  if (hasRole("ADMIN_LPMI")) {
    // Do something for ADMIN_LPMI
  }

  if (hasRole("OPERATOR_LPMI")) {
    // Do something for OPERATOR_LPMI
  }

  if (hasRole("OPERATOR_FAKULTAS")) {
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
    // Sekertaris view proposal report
    can("read", "proposal_report");
    // Sekertaris view proposal report conclusion
    can("read", "proposal_report_conclusion");
    // Sekertaris view Proposal_Assessment
    can("read", "Proposal_Assessment");
    // Sekertaris view Proposal_Changes
    can("read", "Proposal_Changes");
    // Sekertaris view proposal revisi document
    can("read", "proposal_revision_document");
    // Sekertaris view Consultation
    can("read", "Consultation");
  }

  if (hasRole("DEKAN")) {
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
    // Dekan view proposal report
    can("read", "proposal_report");
    // Dekan update is_report_approve
    can("update", "proposal_report_approve");
    // Dekan view proposal report conclusion
    can("read", "proposal_report_conclusion");
    // Dekan view Proposal_Assessment
    can("read", "Proposal_Assessment");
    // Dekan view Proposal_Changes
    can("read", "Proposal_Changes");
    // Dekan view proposal revisi document
    can("read", "proposal_revision_document");
    // Dekan view Consultation
    can("read", "Consultation");
  }

  if (hasRole("KAPRODI")) {
    // Kaprodi view submission
    can("read", "Submission");
    // Kaprodi view proposal document
    can("read", "proposal_document");
    // Kaprodi view proposal payment
    can("read", "proposal_payment");
    // Kaprodi view proposal plagiarism
    can("read", "proposal_plagiarism");
    // Kaprodi view proposal report
    can("read", "proposal_report");
    // Kaprodi view proposal report conclusion
    can("read", "proposal_report_conclusion");
    // Kaprodi view Proposal_Assessment
    can("read", "Proposal_Assessment");
    // Kaprodi view Proposal_Changes
    can("read", "Proposal_Changes");
    // Kaprodi view proposal revisi document
    can("read", "proposal_revision_document");
    // Kaprodi view Consultation
    can("read", "Consultation");
  }

  if (hasRole("DOSEN")) {
    // Dosen view submission
    can("read", "Submission");
    // Dosen view proposal document
    can("read", "proposal_document");
    // Advisor, Co-advisor approve document proposal
    can("update", "is_proposal_approve");
    // Dosen view proposal payment
    can("read", "proposal_payment");
    // Dosen view proposal plagiarism
    can("read", "proposal_plagiarism");
    // Ketua Panelis update is_report_open in proposal
    can("update", "open_proposal_report");
    // (Dosen: Ketua, Anggota, Advisor) view proposal report
    can("read", "proposal_report");
    // (Dosen: Ketua, Anggota, Advisor) update is_report_approve
    can("update", "proposal_report_approve");
    // (Dosen: Ketua) update proposal report conclusion
    can("update", "proposal_report_conclusion");
    // (Dosen: Ketua, Anggota, Advisor) view proposal report conclusion
    can("read", "proposal_report_conclusion");
    // (Dosen: Ketua, Anggota, Advisor) create Proposal_Assessment
    can("create", "Proposal_Assessment");
    // (Dosen: Ketua, Anggota, Advisor) view Proposal_Assessment
    can("read", "Proposal_Assessment");
    // (Dosen: Ketua, Anggota, Advisor, Co-Advisor) create Proposal_Changes
    can("create", "Proposal_Changes");
    // (Dosen: Ketua, Anggota, Advisor, Co-Advisor) view Proposal_Changes
    can("read", "Proposal_Changes");
    // (Dosen: Ketua, Anggota, Advisor, Co-Advisor) view proposal revisi document
    can("read", "proposal_revision_document");
    // (Dosen: Ketua, Anggota, Advisor) approve document revisi proposal
    can("update", "is_proposal_revision_approve");
    // Advisor, Co-advisor create Consultation
    can("create", "Consultation");
    // Advisor, Co-advisor view Consultation
    can("read", "Consultation");
  }

  if (hasRole("DOSEN_MK")) {
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
    // Dosen MK view proposal report
    can("read", "proposal_report");
    // Dosen MK view proposal report conclusion
    can("read", "proposal_report_conclusion");
    // Dosen MK view Proposal_Assessment
    can("read", "Proposal_Assessment");
    // Dosen MK view Proposal_Changes
    can("read", "Proposal_Changes");
    // Dosen MK view proposal revisi document
    can("read", "proposal_revision_document");
    // Dosen MK view Consultation
    can("read", "Consultation");
  }

  if (hasRole("MAHASISWA")) {
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
    // Mahasiswa view Proposal_Changes
    can("read", "Proposal_Changes");
    // Mahasiswa upload/update proposal revisi document
    can("update", "proposal_revision_document");
    // Mahasiswa view proposal revisi document
    can("read", "proposal_revision_document");
    // Mahasiswa view Consultation
    can("read", "Consultation");
  }

  if (hasRole("ALUMNI")) {
    // Do something for ALUMNI
  }

  // Default access for other users
  can("read", "all");

  return build();
};

module.exports = {
  policyFor,
};
