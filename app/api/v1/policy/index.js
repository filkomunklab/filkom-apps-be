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

    // change password
    can("update", "EmployeePassword", { id: user.id });
  }

  if (hasRole("OPERATOR_LPMI")) {
    // Do something for OPERATOR_LPMI
    //action --> CREATE, READ, UPDATE, DELETE
    //Read: dashboard
    can("read", "dashboard");
    //Read: alumni_list
    can("read", "alumni_list");
    //Read: calon_tamatan
    can("read", "calon_tamatan_list"); //cek lagi
    //send broadcast wa
    can("broadcastWa", "alumni_list");
    //send broadcast email
    can("broadcastEmail", "alumni_list");
    //EXPORT DATA TO EXCEL
    can("export", "alumni_list");

    // change password
    can("update", "EmployeePassword", { id: user.id });
  }

  if (hasRole("OPERATOR_FAKULTAS")) {
    // ================================ Global ====================================
    // input here
    // ================================ Skripsi App ================================
    // Sekertaris view Consultation
    can("read", "Consultation");
    // Sekertaris view advisor team
    can("read", "advisor_team");
    // Sekertaris view thesis history
    can("read", "thesis_history");
    // Sekertaris view dosen skripsi
    can("manage", "dosen_mk");
    // Sekertaris view dosen
    can("read", "dosen");
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
    // Sekertaris view proposal_history_list_sekretaris
    can("read", "proposal_history_list_sekretaris");
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
    // Sekertaris view skripsi list sekretaris
    can("read", "skripsi_list_sekretaris");
    // Sekertaris view skripsi_history_list_sekretaris
    can("read", "skripsi_history_list_sekretaris");

    //=================================BIMBINGAN AKADEMIK=====================

    //operator_fakultas: view profile student
    can("read", "student_biodata");

    // change password
    can("update", "EmployeePassword", { id: user.id });

    // Create Curriculum
    can("create", "Curriculum");

    // Delete Curriculum
    can("delete", "Curriculum");

    //View Student grades
    can("read", "approved_semester_grades");

    //View all certificate of one student
    can("read", "certificate_all_student");
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
    // Dekan view thesis history
    can("read", "thesis_history");
    // Dekan view link
    can("read", "link");
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
    // Dekan view is_report_open in proposal
    can("read", "open_proposal_report");
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
    // Dekan view proposal list dekan
    can("read", "skripsi_list_dekan");

    //====================KLABTBRIDGE============================
    //view dashboard
    can("read", "dashboard");
    //view calon_tamatan list
    can("read", "calon_tamatan_list");
    //view alumni list
    can("read", "alumni_list");
    //update status SPT
    can("update", "status_SPT");
    // Dekan view history list dekan
    can("read", "history_list_dekan");
    // Dekan view is_report_open in skripsi
    can("read", "open_skripsi_report");

    //==========================BIMBINGAN AKADEMIK================
    //GRADES ACCESS
    //DEKAN : view created access by all kaprodi
    can("read", "grades_access_dekan");

    //GRADES
    //DEKAN : view list approved grades student
    can("read", "approved_semester_grades");
    //DEKAN : view detail student grades only with GPA
    can("read", "grades_detail_only");

    //Certificate
    //Dekan : view all student Certificate
    can("read", "certificate_all_student");
    //Dekan : view history certificate of role DOSEN
    can("read", "certificate_history_approval");

    //Biodata Student
    //Dekan: view profile student
    can("read", "student_biodata");

    //Dashboard
    //Dekan : view total All faculty student
    can("read", "total_faculty_student");
    //Dekan : view total active faculty student
    can("read", "total_active_faculty");
    //Dekan : view total inactive faculty student
    can("read", "total_inactive_faculty");
    //Dekan : view statistic student
    can("read", "statistic_student");
    //Dekan : view statistic approved certificate
    can("read", "statistic_certificate");

    // change password
    can("update", "EmployeePassword", { id: user.id });

    // get Academic Consultation by Employee
    can("get", "AcademicConsultationByEmployee");

    // get Academic Consultation Detail
    can("get", "AcademicConsultationDetail");

    // update Complete Status Academic Consultation
    can("update", "AcademicConsultationStatusComplete");
  }

  if (hasRole("KAPRODI")) {
    // ================================ Global ====================================
    // input here
    // ================================ Skripsi App ================================
    // Kaprodi view Consultation
    can("read", "Consultation");
    // Kaprodi view advisor team
    can("read", "advisor_team");
    // Kaprodi view thesis history
    can("read", "thesis_history");
    // Kaprodi view link
    can("read", "link");
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
    // Kaprodi view is_report_open in proposal
    can("read", "open_proposal_report");
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
    // Kaprodi view skripsi list kaprodi
    can("read", "skripsi_list_kaprodi");

    //====================KLABTBRIDGE============================
    //view dashboard
    can("read", "dashboard");
    //view calon_tamatan list
    can("read", "calon_tamatan_list");
    //view alumni list
    can("read", "alumni_list");
    //update status SPT
    can("update", "status_SPT");
    // Kaprodi view history list kaprodi
    can("read", "history_list_kaprodi");
    // Kaprodi view is_report_open in skripsi
    can("read", "open_skripsi_report");

    //=========================BIMBINGAN AKADEMIK==================

    //GRADES
    //KAPRODI : view waiting list grades all major student
    can("read", "grades_waiting_list");
    //KAPRODI : view filter waiting list all major student by semester
    can("read", "grades_waiting_semester");
    //KAPRODI : view history approval grades of all major student
    can("read", "grades_history_approval");
    //KAPRODI : do approval for all student major grades
    can("update", "grades_approval");
    //KAPRODI : view detail grades submission
    can("read", "grades_submission_detail");
    //KAPRODI : view list approved grades student
    can("read", "approved_semester_grades");
    //KAPRODI : view detail student grades only with GPA
    can("read", "grades_detail_only");

    //GRADES ACCESS
    //KAPRODI : create access for student to input grades
    can("create", "open_grades_access");
    //KAPRODI : view list grades access
    can("read", "list_created_access");
    //KAPRODI : close access
    can("update", "grades_close_access");
    //KAPRODI : check access
    can("read", "grades_check_access");

    //Dashboard Kaprodi
    //Kaprodi : view total All major student
    can("read", "total_major_student");
    //Kaprodi : view total Active major student
    can("read", "total_active_major");
    //Kaprodi : view total Inactive major student
    can("read", "total_inactive_major");

    //Biodata Student
    //Kaprodi: view profile student
    can("read", "student_biodata");

    //Certificate
    //Kaprodi : view all student Certificate
    can("read", "certificate_all_student");
    //Kaprodi : view history certificate of role DOSEN
    can("read", "certificate_history_approval");

    // change password
    can("update", "EmployeePassword", { id: user.id });

    // get Academic Consultation by Employee
    can("get", "AcademicConsultationByEmployee");

    // get Academic Consultation Detail
    can("get", "AcademicConsultationDetail");

    // update Complete Status Academic Consultation
    can("update", "AcademicConsultationStatusComplete");
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
    // (Dosen: All) view thesis history
    can("read", "thesis_history");
    // (Dosen: Ketua Panelis) view submission_dateline
    can("read", "submission_dateline");
    // (Dosen: Ketua Panelis) update submission_dateline
    can("update", "submission_dateline");
    // Dosen view link
    can("read", "link");
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
    // (Dosen: Ketua, Anggota, Advisor) view is_report_open in proposal
    can("read", "open_proposal_report");
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
    // Dosen view skripsi list advisor
    can("read", "skripsi_list_advisor");
    // Dosen view proposal list co-advisor
    can("read", "proposal_list_co_advisor");
    // Dosen view skripsi list co-advisor
    can("read", "skripsi_list_co_advisor");
    // Dosen view proposal list chairman
    can("read", "proposal_list_chairman");
    // Dosen view skripsi list chairman
    can("read", "skripsi_list_chairman");
    // Dosen view proposal list member
    can("read", "proposal_list_member");
    // Dosen view proposal list member
    can("read", "skripsi_list_member");
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
    // (Dosen: Ketua, Anggota, Advisor) view is_report_open in skripsi
    can("read", "open_skripsi_report");
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
    // (Dosen: Advisor) view history list advisor
    can("update", "history_list_advisor");
    // (Dosen: Co-Advisor) view history list coadvisor
    can("update", "history_list_co_advisor");
    // (Dosen: Chairman) view history list chairman
    can("update", "history_list_chairman");
    // (Dosen: Member) view history list member
    can("update", "history_list_member");

    //===============================Bimbingan Academik======================

    //CERTIFICATE
    //Dosen : view certificate waiting list
    can("read", "certificate_waiting_list");
    //Dosen: view certificate waiting list by student major
    can("read", "certificate_list_major");
    //Dosen: view certificate waiting list by arrival year
    can("read", "certificate_list_year");
    //Dosen : view certicate by category
    can("read", "certificate_category");
    //Dosen : view History Approval
    can("read", "certificate_history_approval");
    //Dosen : do Approval Student Certificate
    can("update", "certificate_approval");
    //Dosen : view certificate detail
    can("read", "certificate_detail");
    //Dosen : view all student Certificate
    can("read", "certificate_all_student");

    //Grades
    //DOSEN : view list approved grades student
    can("read", "approved_semester_grades");
    //DOSEN : view detail student grades only with GPA
    can("read", "grades_detail_only");

    //Guidance Student
    //Dosen : set student status
    can("update", "student_status");

    //Biodata Student
    //Dosen: view profile student
    can("read", "student_biodata");

    // //Dashboard Dosen
    // //Dosen : view total of Active & InActive Student guidance
    // can("read", "total_student");
    // //Dosen : view total Active student guidance
    // can("read", "total_active_guidance");
    // //Dosen : view total InActive student guidance
    // can("read", "total_Inactive_guidance");

    // change password
    can("update", "EmployeePassword", { id: user.id });

    // get Academic Consultation by Employee
    can("get", "AcademicConsultationByEmployee");

    // get Academic Consultation Detail
    can("get", "AcademicConsultationDetail");

    // update Complete Status Academic Consultation
    can("update", "AcademicConsultationStatusComplete");
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
    // Dosen MK view thesis history
    can("read", "thesis_history");
    // Dosen MK view value history
    can("read", "value_history");
    // Dosen MK view link
    can("read", "link");
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
    // Dosen MK view skripsi list dosen mk
    can("read", "skripsi_list_mk");

    // change password
    can("update", "EmployeePassword", { id: user.id });

    // get Academic Consultation by Employee
    can("get", "AcademicConsultationByEmployee");

    // get Academic Consultation Detail
    can("get", "AcademicConsultationDetail");

    // update Complete Status Academic Consultation
    can("update", "AcademicConsultationStatusComplete");
  }

  if (hasRole("MAHASISWA")) {
    // ================================ Global ====================================
    // input here
    // ================================ Skripsi App ================================
    // Mahasiswa view Consultation
    can("read", "Consultation");
    // Mahasiswa view thesis list
    can("read", "thesis_list");
    // Mahasiswa view classroom list
    can("read", "classroom_list");
    // Mahasiswa view thesis student list
    can("read", "thesis_student_list");
    // Mahasiswa view dosen list
    can("read", "dosen_list");
    // Mahasiswa view advisor team
    can("read", "advisor_team");
    // Mahasiswa view thesis history
    can("read", "thesis_history");
    // Mahasiswa update metadata
    can("update", "metadata");
    // Mahasiswa view metadata
    can("read", "metadata");
    // Mahasiswa manage link
    can("manage", "link");
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

    //==========================KLABATBRIDGE============================
    //view dashboard
    can("read", "dashboard");
    //mengisi form SPT
    can("create", "SPT");
    //mengisi form TS
    can("create", "TS");

    //===========================Bimbingan Akademik=======================

    //CERTIFICATE
    //Mahasiswa : add certificate
    can("create", "upload_certificate");
    //Mahasiswa : view current certificate
    can("read", "current_certificate");
    //Mahasiswa : view certificate history approval
    can("read", "student_certificate_history");
    //Mahasiswa : view certificate detail
    can("read", "certificate_detail");

    //GRADES
    //Mahasiswa : add grades last semeseter
    can("create", "upload_grades");
    //Mahasiswa : view current grades submission
    can("read", "grades_student_current");
    //Mahasiswa : view history grades submission
    can("read", "grades_student_history");
    //Mahasiswa : view list approved grades
    can("read", "approved_semester_grades");
    //Mahasiswa : view detail grades only with GPA
    can("read", "grades_detail_only");
    //Mahasiswa : view detail grades submission
    can("read", "grades_submission_detail");
    //Mahasiswa : check isInput
    can("read", "grades_check");

    //BIODATA STUDENT
    //Mahasiswa : input empty data to biodata in the first login
    can("update", "biodata");
    //Mahasiswa : cek if the biodata already inputed
    can("read", "check_biodata");
    //Mahasiswa : view profile
    can("read", "student_biodata");

    //Grades Access
    //Mahasiswa : check access for input grades
    can("read", "grades_check_access");

    // change password
    can("update", "StudentPassword", { id: user.id });

    // Create Academic Consultation
    can("create", "AcademicConsultation");

    // Get Academic Consultation
    can("get", "AcademicConsultationByStudent", { nim: user.nim });

    // get Academic Consultation Detail
    can("get", "AcademicConsultationDetail");

    // update Complete Status Academic Consultation
    can("update", "AcademicConsultationStatusComplete");
  }

  if (hasRole("ALUMNI")) {
    // Do something for ALUMNI
    //view dashboard
    can("read", "dashboard");
    //mengisi form TS
    can("create", "TS");

    // change password
    can("update", "StudentPassword", { id: user.id });

    // Create Academic Consultation
    can("create", "AcademicConsultation");

    // Get Academic Consultation
    can("get", "AcademicConsultationByStudent", { nim: user.nim });

    // get Academic Consultation Detail
    can("get", "AcademicConsultationDetail");

    // update Complete Status Academic Consultation
    can("update", "AcademicConsultationStatusComplete");
  }

  if (hasRole("REGISTER")) {
    // Do something for REGISTER
    //view daftar calon tamatan
    can("read", "calon_tamatan_list");
    // console.log("njkihn");
    //Update status mahasiswa
    can("update", "status_mahasiswa");
    //Approved SPT Mahasiswa
    can("update", "status_SPT");

    // change password
    can("update", "EmployeePassword", { id: user.id });

    // Create Curriculum
    can("create", "Curriculum");

    // Delete Curriculum
    can("delete", "Curriculum");
  }

  // Default access for other users
  // can("read", "all");

  return build();
};

module.exports = {
  policyFor,
};
