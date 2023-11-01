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
    // ================================ Global ====================================
    // input here
    // ================================ Skripsi App ================================
    // Sekertaris view Consultation
    can("read", "Consultation");
    // Sekertaris view advisor team
    can("read", "advisor_team");
    // ---------------------------------Proposal--------------------------------
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
    // Sekertaris view proposal list sekretaris
    can("read", "proposal_list_sekretaris");
    // ---------------------------------Skripsi--------------------------------
    // Sekertaris view skripsi document
    can("read", "skripsi_document");
    // Sekertaris view skripsi payment
    can("read", "skripsi_payment");
    // Sekertaris view skripsi plagiarism
    can("read", "skripsi_plagiarism");
    // Sekertaris view skripsi schedule
    can("read", "skripsi_schedule");
    // Sekertaris update skripsi schedule
    can("update", "skripsi_schedule");
    // Sekertaris view Skripsi_Assessment
    can("read", "Skripsi_Assessment");
    // Sekertaris view Skripsi_Changes
    can("read", "Skripsi_Changes");
    // Sekertaris view skripsi report
    can("read", "skripsi_report");
    // Sekertaris view skripsi report conclusion
    can("read", "skripsi_report_conclusion");
    // Sekertaris view skripsi revisi document
    can("read", "skripsi_revision_document");
  }

  if (hasRole("DEKAN")) {
    // ================================ Global ====================================
    can("read", "Employee");
    can("update", "Employee", { id: user.id });
    // ================================ Skripsi App ================================
    // Dekan view advisor team
    can("read", "advisor_team");
    // Dekan view Consultation
    can("read", "Consultation");
    // ---------------------------------Submission--------------------------------
    // Dekan view submission
    can("read", "Submission");
    // Dekan view submission details
    can("read", "submission_details");
    // Dekan view submission list dekan
    can("read", "submission_list_dekan");
    // ---------------------------------Proposal--------------------------------
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
    // Dekan view proposal list dekan
    can("read", "proposal_list_dekan");
    // ---------------------------------Skripsi--------------------------------
    // Dekan view skripsi document
    can("read", "skripsi_document");
    // Dekan view skripsi payment
    can("read", "skripsi_payment");
    // Dekan view skripsi plagiarism
    can("read", "skripsi_plagiarism");
    // Dekan view Skripsi_Assessment
    can("read", "Skripsi_Assessment");
    // Dekan view view Skripsi_Changes
    can("read", "Skripsi_Changes");
    // Dekan view proposal report
    can("read", "skripsi_report");
    // Dekan update is_report_approve
    can("update", "skripsi_report_approve");
    // Dekan view skripsi report conclusion
    can("read", "skripsi_report_conclusion");
    // Dekan view skripsi revisi document
    can("read", "skripsi_revision_document");
  }

  if (hasRole("KAPRODI")) {
    // ================================ Global ====================================
    // input here
    // ================================ Skripsi App ================================
    // Kaprodi view Consultation
    can("read", "Consultation");
    // Kaprodi view advisor team
    can("read", "advisor_team");
    // ---------------------------------Submission--------------------------------
    // Kaprodi view submission
    can("read", "Submission");
    // Kaprodi view submission list kaprodi
    can("read", "submission_list_kaprodi");
    // Kaprodi view submission details
    can("read", "submission_details");
    // ---------------------------------Proposal--------------------------------
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
    // Kaprodi view proposal list kaprodi
    can("read", "proposal_list_kaprodi");
    // ---------------------------------Skripsi--------------------------------
    // Kaprodi view skripsi document
    can("read", "skripsi_document");
    // Kaprodi view skripsi payment
    can("read", "skripsi_payment");
    // Kaprodi view proposal plagiarism
    can("read", "skripsi_plagiarism");
    // Kaprodi view Skripsi_Assessment
    can("read", "Skripsi_Assessment");
    // Kaprodi view view Skripsi_Changes
    can("read", "Skripsi_Changes");
    // Kaprodi view skripsi report
    can("read", "skripsi_report");
    // Kaprodi view skripsi report conclusion
    can("read", "skripsi_report_conclusion");
    // Kaprodi view skripsi revisi document
    can("read", "skripsi_revision_document");
  }

  if (hasRole("DOSEN")) {
    // ================================ Global ====================================
    // input here
    // ================================ Skripsi App ================================
    // (Dosen: All) view advisor team
    can("read", "advisor_team");
    // Advisor, Co-advisor create Consultation
    can("create", "Consultation");
    // Advisor, Co-advisor view Consultation
    can("read", "Consultation");
    // ---------------------------------Submission--------------------------------
    // Dosen view committee list
    can("read", "committee_list");
    // Dosen view submission
    can("read", "Submission");
    // Dosen view submission details
    can("read", "submission_details");
    // ---------------------------------Proposal--------------------------------
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
    can("update", "Proposal_Assessment");
    // (Dosen: Ketua, Anggota, Advisor) view Proposal_Assessment
    can("read", "Proposal_Assessment");
    // (Dosen: Ketua, Anggota, Advisor, Co-Advisor) create Proposal_Changes
    can("update", "Proposal_Changes");
    // (Dosen: Ketua, Anggota, Advisor, Co-Advisor) view Proposal_Changes
    can("read", "Proposal_Changes");
    // (Dosen: Ketua, Anggota, Advisor, Co-Advisor) view proposal revisi document
    can("read", "proposal_revision_document");
    // (Dosen: Ketua, Anggota, Advisor) approve document revisi proposal
    can("update", "is_proposal_revision_approve");
    // Dosen view proposal list advisor
    can("read", "proposal_list_advisor");
    // Dosen view proposal list co-advisor
    can("read", "proposal_list_co_advisor");
    // Dosen view proposal list chairman
    can("read", "proposal_list_chairman");
    // Dosen view proposal list member
    can("read", "proposal_list_member");
    // ---------------------------------Skripsi--------------------------------
    // Dosen view skripsi document
    can("read", "skripsi_document");
    // Advisor, Co-advisor approve document skripsi
    can("update", "is_skripsi_approve");
    // Dosen view skripsi payment
    can("read", "skripsi_payment");
    // Dosen view skripsi plagiarism
    can("read", "skripsi_plagiarism");
    // Ketua Panelis update is_report_open in skripsi
    can("update", "open_skripsi_report");
    // (Dosen: Ketua, Anggota, Advisor) create Skripsi_Assessment
    can("update", "Skripsi_Assessment");
    // (Dosen: Ketua, Anggota, Advisor) view Skripsi_Assessment
    can("read", "Skripsi_Assessment");
    // (Dosen: Ketua, Anggota, Advisor, Co-Advisor) create Skripsi_Changes
    can("update", "Skripsi_Changes");
    // (Dosen: Ketua, Anggota, Advisor, Co-Advisor) view Skripsi_Changes
    can("read", "Skripsi_Changes");
    // (Dosen: Ketua, Anggota, Advisor) view skripsi report
    can("read", "skripsi_report");
    // (Dosen: Ketua, Anggota, Advisor) update is_report_approve
    can("update", "skripsi_report_approve");
    // (Dosen: Ketua) update skripsi report conclusion
    can("update", "skripsi_report_conclusion");
    // (Dosen: Ketua, Anggota, Advisor) view skripsi report conclusion
    can("read", "skripsi_report_conclusion");
    // (Dosen: Ketua, Anggota, Advisor, Co-Advisor) view skripsi revisi document
    can("read", "skripsi_revision_document");
    // (Dosen: Ketua, Anggota, Advisor) approve document revisi skripsi
    can("update", "is_skripsi_revision_approve");
  }

  if (hasRole("DOSEN_MK")) {
    // ================================ Global ====================================
    // input here
    // ================================ Skripsi App ================================
    // Dosen MK manage academic_calendar
    can("manage", "Academic_Calendar");
    // Dosen MK manage classroom
    can("manage", "Classroom");
    // Dosen MK manage proposal_student & skripsi_student
    can("manage", "thesis_student");
    // Dosen MK view Consultation
    can("read", "Consultation");
    // Dosen MK view advisor team
    can("read", "advisor_team");
    // ---------------------------------Submission--------------------------------
    // Dosen MK view submission
    can("read", "Submission");
    // Dosen MK update advisor & co-advisor in submission
    can("update", "proposed_advisor_and_co_advisor");
    // Dosen MK update is_approve in submission
    can("update", "approve_submission");
    // Dosen MK view submission details
    can("read", "submission_details");
    // Dosen MK view submission list dosen mk
    can("read", "submission_list_mk");
    // ---------------------------------Proposal--------------------------------
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
    // Dosen MK view proposal list dosen mk
    can("read", "proposal_list_mk");
    // ---------------------------------Skripsi--------------------------------
    // Dosen MK view skripsi document
    can("read", "skripsi_document");
    // Dosen MK view skripsi payment
    can("read", "skripsi_payment");
    // Dosen MK view skripsi plagiarism
    can("read", "skripsi_plagiarism");
    // Dosen MK view Skripsi_Assessment
    can("read", "Skripsi_Assessment");
    // Dosen MK view Skripsi_Changes
    can("read", "Skripsi_Changes");
    // Dosen MK view skripsi report
    can("read", "skripsi_report");
    // Dosen MK view skripsi report conclusion
    can("read", "skripsi_report_conclusion");
    // Dosen MK view skripsi revisi document
    can("read", "skripsi_revision_document");
    // Dosen MK view hki
    can("read", "hki");
    // Dosen MK view journal
    can("read", "journal");
    // Dosen MK view source code
    can("read", "source_code");
    // Dosen MK view link source code
    can("read", "link_source_code");
  }

  if (hasRole("MAHASISWA")) {
    // ================================ Global ====================================
    // input here
    // ================================ Skripsi App ================================
    // Mahasiswa view Consultation
    can("read", "Consultation");
    // Mahasiswa view thesis list
    can("read", "thesis_list");
    // Mahasiswa view thesis student list
    can("read", "thesis_student_list");
    // Mahasiswa view dosen list
    can("read", "dosen_list");
    // Mahasiswa view advisor team
    can("read", "advisor_team");
    // ---------------------------------Submission--------------------------------
    can("create", "Submission");
    // Mahasiswa view submission
    can("read", "Submission");
    // Mahasiswa update submission/title
    can("update", "Submission");
    // Mahasiswa view submission details
    can("read", "submission_details");
    // ---------------------------------Proposal--------------------------------
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
    // ---------------------------------Skripsi--------------------------------
    // Mahasiswa upload/update skripsi document
    can("update", "skripsi_document");
    // Mahasiswa view skripsi document
    can("read", "skripsi_document");
    // Mahasiswa view skripsi payment
    can("read", "skripsi_payment");
    // Mahasiswa upload/update skripsi payment
    can("update", "skripsi_payment");
    // Mahasiswa view skripsi plagiarism
    can("read", "skripsi_plagiarism");
    // Mahasiswa upload/update skripsi plagiarism
    can("update", "skripsi_plagiarism");
    // Mahasiswa upload/update skripsi revisi document
    can("update", "skripsi_revision_document");
    // Mahasiswa view skripsi revisi document
    can("read", "skripsi_revision_document");
    // Mahasiswa update hki
    can("update", "hki");
    // Mahasiswa view hki
    can("read", "hki");
    // Mahasiswa update journal
    can("update", "journal");
    // Mahasiswa view journal
    can("read", "journal");
    // Mahasiswa update source code
    can("update", "source_code");
    // Mahasiswa view source code
    can("read", "source_code");
    // Mahasiswa update link source code
    can("update", "link_source_code");
    // Mahasiswa view link source code
    can("read", "link_source_code");
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
