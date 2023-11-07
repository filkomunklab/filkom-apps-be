//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Create empty skripsi
// @used            Submission
const insertSkripsi = async (submission) => {
  const {
    proposed_advisor_id,
    proposed_co_advisor1_id,
    proposed_co_advisor2_id,
  } = submission;
  const skripsi = await prisma.skripsi.create({
    data: {
      advisor_id: proposed_advisor_id,
      co_advisor1_id: proposed_co_advisor1_id,
      co_advisor2_id: proposed_co_advisor2_id,
    },
  });
  return skripsi;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Update skripsi chairman and member by id
// @used            Proposal
const updateSkripsiChairmanAndMemberById = async (
  id,
  panelist_chairman_id,
  panelist_member_id
) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      panelist_chairman_id,
      panelist_member_id,
    },
  });
  return skripsi;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get skripsi by id
// @used            getSkripsiById, Skripsi_Assessment
const findSkripsiById = async (id) => {
  const skripsi = await prisma.skripsi.findUnique({
    where: {
      id,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Upload dokumen skripsi
// @route           PUT /skripsi/skripsi-document/:id
// @access          MAHASISWA
const updateSkripsiDocumentById = async (id, payload, path) => {
  const { skripsi_file } = payload;
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_skripsi: skripsi_file.file_name_skripsi,
      upload_date_skripsi: new Date(),
      file_size_skripsi: skripsi_file.file_size_skripsi,
      file_path_skripsi: path,
    },
    select: {
      id: true,
      file_name_skripsi: true,
      upload_date_skripsi: true,
      file_size_skripsi: true,
      file_path_skripsi: true,
      is_skripsi_approve_by_advisor: true,
      is_skripsi_approve_by_co_advisor1: true,
      is_skripsi_approve_by_co_advisor2: true,
    },
  });
  return skripsi;
};

// ++++++++++++++++++++++++++++(1)++++++++++++++++++++++++++++++++++++++
// @description     Update skripsi approve by advisor
// @used            updateSkripsiDocumentById
const updateSkripsiDocumentApproveByAdvisorById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_skripsi_approve_by_advisor: "Waiting",
    },
    select: {
      is_skripsi_approve_by_advisor: true,
    },
  });
  return skripsi;
};

// ++++++++++++++++++++++++++++(2)++++++++++++++++++++++++++++++++++++++
// @description     Update skripsi approve by co-advisor1
// @used            updateSkripsiDocumentById
const updateSkripsiDocumentApproveByCoAdvisor1ById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_skripsi_approve_by_co_advisor1: "Waiting",
    },
    select: {
      is_skripsi_approve_by_co_advisor1: true,
    },
  });
  return skripsi;
};

// ++++++++++++++++++++++++++++(3)++++++++++++++++++++++++++++++++++++++
// @description     Update skripsi approve by co-advisor2
// @used            updateSkripsiDocumentById
const updateSkripsiDocumentApproveByCoAdvisor2ById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_skripsi_approve_by_co_advisor2: "Waiting",
    },
    select: {
      is_skripsi_approve_by_co_advisor2: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Get dokumen skripsi
// @route           GET /skripsi/skripsi-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN
const findSkripsiDocumentById = async (id) => {
  const skripsi = await prisma.skripsi.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      file_name_skripsi: true,
      upload_date_skripsi: true,
      file_size_skripsi: true,
      file_path_skripsi: true,
      is_skripsi_approve_by_advisor: true,
      is_skripsi_approve_by_co_advisor1: true,
      is_skripsi_approve_by_co_advisor2: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Delete/Update dokumen skripsi
// @route           PUT /skripsi/skripsi-document/delete/:id
// @access          MAHASISWA
const deleteSkripsiDocumentById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_skripsi: null,
      upload_date_skripsi: null,
      file_size_skripsi: null,
      file_path_skripsi: null,
    },
  });
  return skripsi;
};

// ++++++++++++++++++++++++++++(1)++++++++++++++++++++++++++++++++++++++
// @description     Delete/Update skripsi approve by advisor
// @used            deleteSkripsiDocumentById
const deleteSkripsiDocumentApproveByAdvisorById = async (id) => {
  await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_skripsi_approve_by_advisor: null,
    },
  });
};

// ++++++++++++++++++++++++++++(2)++++++++++++++++++++++++++++++++++++++
// @description     Delete/Update skripsi approve by co-advisor1
// @used            deleteSkripsiDocumentById
const deleteSkripsiDocumentApproveByCoAdvisor1ById = async (id) => {
  await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_skripsi_approve_by_co_advisor1: null,
    },
  });
};

// ++++++++++++++++++++++++++++(3)++++++++++++++++++++++++++++++++++++++
// @description     Delete/Update skripsi approve by co-advisor2
// @used            deleteSkripsiDocumentById
const deleteSkripsiDocumentApproveByCoAdvisor2ById = async (id) => {
  await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_skripsi_approve_by_co_advisor2: null,
    },
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get advisor in skripsi by skripsi_id & advisor_id
// @used            approveSkripsiDocumentById, rejectSkripsiRevisionDocumentById
const findAdvisorInSkripsiByIdAndAdvisorId = async (id, advisor_id) => {
  const skripsi = await prisma.skripsi.findFirst({
    where: {
      id,
      advisor_id,
    },
  });
  return skripsi;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get co-advisor1 in skripsi by skripsi_id & co_advisor1_id
// @used            approveSkripsiDocumentById
const findCoAdvisor1InSkripsiByIdAndAdvisorId = async (id, co_advisor1_id) => {
  const skripsi = await prisma.skripsi.findFirst({
    where: {
      id,
      co_advisor1_id,
    },
  });
  return skripsi;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get co-advisor2 in skripsi by skripsi_id & co_advisor2_id
// @used            approveSkripsiDocumentById
const findCoAdvisor2InSkripsiByIdAndAdvisorId = async (id, co_advisor2_id) => {
  const skripsi = await prisma.skripsi.findFirst({
    where: {
      id,
      co_advisor2_id,
    },
  });
  return skripsi;
};

//=============================(1)======================================
// @description     Approve dokumen skripsi
// @route           PUT /skripsi/skripsi-document/approve/:id
// @access          DOSEN
const approveSkripsiDocumentByAdvisorById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_skripsi_approve_by_advisor: "Approve",
      advisor_skripsi_approved_date: new Date(),
    },
    select: {
      id: true,
      is_skripsi_approve_by_advisor: true,
      is_skripsi_approve_by_co_advisor1: true,
      is_skripsi_approve_by_co_advisor2: true,
      advisor_skripsi_approved_date: true,
    },
  });
  return skripsi;
};

//=============================(2)======================================
// @description     Approve dokumen skripsi
// @route           PUT /skripsi/skripsi-document/approve/:id
// @access          DOSEN
const approveSkripsiDocumentByCoAdvisor1ById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_skripsi_approve_by_co_advisor1: "Approve",
      co_advisor1_skripsi_approved_date: new Date(),
    },
    select: {
      id: true,
      is_skripsi_approve_by_advisor: true,
      is_skripsi_approve_by_co_advisor1: true,
      is_skripsi_approve_by_co_advisor2: true,
      co_advisor1_skripsi_approved_date: true,
    },
  });
  return skripsi;
};

//=============================(3)======================================
// @description     Approve dokumen skripsi
// @route           PUT /skripsi/skripsi-document/approve/:id
// @access          DOSEN
const approveSkripsiDocumentByCoAdvisor2ById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_skripsi_approve_by_co_advisor2: "Approve",
      co_advisor2_skripsi_approved_date: new Date(),
    },
    select: {
      id: true,
      is_skripsi_approve_by_advisor: true,
      is_skripsi_approve_by_co_advisor1: true,
      is_skripsi_approve_by_co_advisor2: true,
      co_advisor2_skripsi_approved_date: true,
    },
  });
  return skripsi;
};

//=============================(1)======================================
// @description     Reject dokumen skripsi
// @route           PUT /skripsi/skripsi-document/reject/:id
// @access          DOSEN
const rejectSkripsiDocumentByAdvisorById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_skripsi_approve_by_advisor: "Rejected",
      advisor_skripsi_approved_date: new Date(),
    },
    select: {
      id: true,
      is_skripsi_approve_by_advisor: true,
      is_skripsi_approve_by_co_advisor1: true,
      is_skripsi_approve_by_co_advisor2: true,
      advisor_skripsi_approved_date: true,
    },
  });
  return skripsi;
};

//=============================(2)======================================
// @description     Reject dokumen skripsi
// @route           PUT /skripsi/skripsi-document/reject/:id
// @access          DOSEN
const rejectSkripsiDocumentByCoAdvisor1ById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_skripsi_approve_by_co_advisor1: "Rejected",
      co_advisor1_skripsi_approved_date: new Date(),
    },
    select: {
      id: true,
      is_skripsi_approve_by_advisor: true,
      is_skripsi_approve_by_co_advisor1: true,
      is_skripsi_approve_by_co_advisor2: true,
      co_advisor1_skripsi_approved_date: true,
    },
  });
  return skripsi;
};

//=============================(3)======================================
// @description     Reject dokumen skripsi
// @route           PUT /skripsi/skripsi-document/reject/:id
// @access          DOSEN
const rejectSkripsiDocumentByCoAdvisor2ById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_skripsi_approve_by_co_advisor2: "Rejected",
      co_advisor2_skripsi_approved_date: new Date(),
    },
    select: {
      id: true,
      is_skripsi_approve_by_advisor: true,
      is_skripsi_approve_by_co_advisor1: true,
      is_skripsi_approve_by_co_advisor2: true,
      co_advisor2_skripsi_approved_date: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Upload/Update bukti pembayaran
// @route           PUT /skripsi/skripsi-payment/:id
// @access          MAHASISWA
const updateSkripsiPaymentById = async (id, payload, path) => {
  const { payment_file } = payload;
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_payment: payment_file.file_name_payment,
      upload_date_payment: new Date(),
      file_size_payment: payment_file.file_size_payment,
      file_path_payment: path,
    },
    select: {
      id: true,
      file_name_payment: true,
      upload_date_payment: true,
      file_size_payment: true,
      file_path_payment: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Get bukti pembayaran
// @route           GET /skripsi/skripsi-payment/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findSkripsiPaymentById = async (id) => {
  const skripsi = await prisma.skripsi.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      file_name_payment: true,
      upload_date_payment: true,
      file_size_payment: true,
      file_path_payment: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Delete/Update bukti pembayaran
// @route           DELETE /skripsi/skripsi-payment/delete/:id
// @access          MAHASISWA
const deleteSkripsiPaymentById = async (id) => {
  await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_payment: null,
      upload_date_payment: null,
      file_size_payment: null,
      file_path_payment: null,
    },
  });
};

//===================================================================
// @description     Upload/Update bukti hasil cek plagiat
// @route           PUT /skripsi/skripsi-plagiarism-check/:id
// @access          MAHASISWA
const updateSkripsiPlagiarismById = async (id, payload, path) => {
  const { plagiarism_file } = payload;
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_plagiarismcheck: plagiarism_file.file_name_plagiarismcheck,
      upload_date_plagiarismcheck: new Date(),
      file_size_plagiarismcheck: plagiarism_file.file_size_plagiarismcheck,
      file_path_plagiarismcheck: path,
    },
    select: {
      id: true,
      file_name_plagiarismcheck: true,
      upload_date_plagiarismcheck: true,
      file_size_plagiarismcheck: true,
      file_path_plagiarismcheck: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Get bukti hasil cek plagiat
// @route           PUT /skripsi/skripsi-plagiarism-check/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findSkripsiPlagiarismById = async (id) => {
  const skripsi = await prisma.skripsi.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      file_name_plagiarismcheck: true,
      upload_date_plagiarismcheck: true,
      file_size_plagiarismcheck: true,
      file_path_plagiarismcheck: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Delete/Update bukti hasil cek plagiat
// @route           PUT /skripsi/skripsi-plagiarism-check/delete/:id
// @access          MAHASISWA
const deleteSkripsiPlagiarismById = async (id) => {
  await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_plagiarismcheck: null,
      upload_date_plagiarismcheck: null,
      file_size_plagiarismcheck: null,
      file_path_plagiarismcheck: null,
    },
  });
};

//===================================================================
// @description     Get all skripsi schedule
// @route           GET /skripsi/schedule
// @access          OPERATOR_FAKULTAS
// @used            checkTimeConflict
const findAllSkripsiSchedule = async () => {
  // Mencari skripsi yang tidak memiliki is_pass berisi "Pass" atau "Fail"
  const skripsis = await prisma.skripsi.findMany({
    where: {
      OR: [
        {
          is_pass: null,
        },
        {
          is_pass: "Repeat",
        },
      ],
    },
    select: {
      id: true,
      advisor: true,
      panelist_chairman: true,
      panelist_member: true,
      start_defence: true,
      end_defence: true,
      defence_room: true,
      defence_date: true,
      classroom_id: true,
    },
  });

  return skripsis;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Check conflict between schedule
// @used            checkScheduleConflict
const findAllConflictingSkripsiSchedule = async (
  id,
  defence_date,
  defence_room
) => {
  const conflictingSchedules = await prisma.skripsi.findMany({
    where: {
      defence_date,
      defence_room,
      NOT: {
        id,
      },
    },
  });

  return conflictingSchedules;
};

//===================================================================
// @description     Create/Update skripsi schedule
// @route           PUT /skripsi/schedule/:id
// @access          OPERATOR_FAKULTAS
const updateSkripsiScheduleById = async (id, payload) => {
  const { start_defence, end_defence, defence_room, defence_date } = payload;
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      start_defence,
      end_defence,
      defence_room,
      defence_date,
      report_date: defence_date,
    },
    select: {
      id: true,
      start_defence: true,
      end_defence: true,
      defence_room: true,
      defence_date: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Get skripsi schedule
// @route           GET /skripsi/schedule/:id
// @access          OPERATOR_FAKULTAS
const findSkripsiScheduleById = async (id) => {
  const skripsi = await prisma.skripsi.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      panelist_chairman: true,
      panelist_member: true,
      advisor: true,
      start_defence: true,
      end_defence: true,
      defence_room: true,
      defence_date: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Open report
// @route           PUT /skripsi/skripsi-report/open-access/:id
// @access          DOSEN
const openAccessSkripsiReportById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_report_open: true,
    },
    select: {
      id: true,
      is_report_open: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Get report
// @route           GET /skripsi/skripsi-report/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findSkripsiReportById = async (id) => {
  const skripsi = await prisma.skripsi.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      is_report_approve_by_dekan: true,
      is_report_approve_by_panelist_chairman: true,
      is_report_approve_by_panelist_member: true,
      is_report_approve_by_advisor: true,
    },
  });
  return skripsi;
};

//==============================(1)=====================================
// @description     Fill/Update report
// @route           PUT /skripsi/skripsi-report/:id
// @access          DOSEN, DEKAN
const signChairmanSkripsiReportById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_report_approve_by_panelist_chairman: true,
    },
    select: {
      id: true,
      is_report_approve_by_panelist_chairman: true,
    },
  });
  return skripsi;
};

//==============================(2)=====================================
// @description     Fill/Update report
// @route           PUT /skripsi/skripsi-report/:id
// @access          DOSEN, DEKAN
const signMemberSkripsiReportById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_report_approve_by_panelist_member: true,
    },
    select: {
      id: true,
      is_report_approve_by_panelist_member: true,
    },
  });
  return skripsi;
};

//==============================(3)=====================================
// @description     Fill/Update report
// @route           PUT /skripsi/skripsi-report/:id
// @access          DOSEN, DEKAN
const signAdvisorSkripsiReportById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_report_approve_by_advisor: true,
    },
    select: {
      id: true,
      is_report_approve_by_advisor: true,
    },
  });
  return skripsi;
};

//==============================(4)=====================================
// @description     Fill/Update report
// @route           PUT /skripsi/skripsi-report/:id
// @access          DOSEN, DEKAN
const signDekanSkripsiReportById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_report_approve_by_dekan: true,
    },
    select: {
      id: true,
      is_report_approve_by_dekan: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Fill/Update report conclusion
// @route           PUT /skripsi/skripsi-report/conclusion/:id
// @access          DOSEN
const updateSkripsiConclusionById = async (id, payload) => {
  const {
    exam_conclution,
    changes_conclusion,
    assessment_conclution,
    is_pass,
  } = payload;
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      exam_conclution,
      changes_conclusion,
      assessment_conclution,
      is_pass,
    },
    select: {
      id: true,
      exam_conclution: true,
      changes_conclusion: true,
      assessment_conclution: true,
      is_pass: true,
      report_date: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Get report conclusion
// @route           GET /skripsi/skripsi-report/conclusion/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findSkripsiConclusionById = async (id) => {
  const skripsi = await prisma.skripsi.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      exam_conclution: true,
      changes_conclusion: true,
      assessment_conclution: true,
      is_pass: true,
      report_date: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Upload/Update dokumen revisi skripsi
// @route           PUT /skripsi/skripsi-revision-document/:id
// @access          MAHASISWA
const updateSkripsiRevisionDocumentById = async (id, payload, path) => {
  const { revision_file } = payload;
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_revision: revision_file.file_name_revision,
      upload_date_revision: new Date(),
      file_size_revision: revision_file.file_size_revision,
      file_path_revision: path,
    },
    select: {
      id: true,
      file_name_revision: true,
      upload_date_revision: true,
      file_size_revision: true,
      file_path_revision: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
    },
  });
  return skripsi;
};

// ++++++++++++++++++++++++++++(1)++++++++++++++++++++++++++++++++++++++
// @description     Update skripsi revision approve by advisor
// @used            updateSkripsiRevisionDocumentById
const updateSkripsiRevisionDocumentApproveByChairmanById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_panelist_chairman: "Waiting",
    },
    select: {
      is_revision_approve_by_panelist_chairman: true,
    },
  });
  return skripsi;
};

// ++++++++++++++++++++++++++++(2)++++++++++++++++++++++++++++++++++++++
// @description     Update skripsi revision approve by member
// @used            updateSkripsiRevisionDocumentById
const updateSkripsiRevisionDocumentApproveByMemberById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_panelist_member: "Waiting",
    },
    select: {
      is_revision_approve_by_panelist_member: true,
    },
  });
  return skripsi;
};

// ++++++++++++++++++++++++++++(3)++++++++++++++++++++++++++++++++++++++
// @description     Update skripsi revision approve by advisor
// @used            updateSkripsiRevisionDocumentById
const updateSkripsiRevisionDocumentApproveByAdvisorById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_advisor: "Waiting",
    },
    select: {
      is_revision_approve_by_advisor: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Get dokumen revisi skripsi
// @route           GET /skripsi/skripsi-revision-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findSkripsiRevisionDocumentById = async (id) => {
  const skripsi = await prisma.skripsi.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      file_name_revision: true,
      upload_date_revision: true,
      file_size_revision: true,
      file_path_revision: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Delete/Update dokumen revisi skripsi
// @route           PUT /skripsi/skripsi-revision-document/delete/:id
// @access          MAHASISWA
const deleteSkripsiRevisionDocumentById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_revision: null,
      upload_date_revision: null,
      file_size_revision: null,
      file_path_revision: null,
    },
    select: {
      id: true,
      file_name_revision: true,
      upload_date_revision: true,
      file_size_revision: true,
      file_path_revision: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
    },
  });
  return skripsi;
};

// ++++++++++++++++++++++++++++(1)++++++++++++++++++++++++++++++++++++++
// @description     Delete/Update skripsi revision approve by chairman
// @used            deleteSkripsiRevisionDocumentById
const deleteSkripsiRevisionDocumentApproveByChairmanById = async (id) => {
  await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_panelist_chairman: null,
    },
  });
};

// ++++++++++++++++++++++++++++(2)++++++++++++++++++++++++++++++++++++++
// @description     Delete/Update skripsi revision approve by member
// @used            deleteSkripsiRevisionDocumentById
const deleteSkripsiRevisionDocumentApproveByMemberById = async (id) => {
  await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_panelist_member: null,
    },
  });
};

// ++++++++++++++++++++++++++++(3)++++++++++++++++++++++++++++++++++++++
// @description     Delete/Update skripsi revision approve by advisor
// @used            deleteSkripsiRevisionDocumentById
const deleteSkripsiRevisionDocumentApproveByAdvisorById = async (id) => {
  await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_advisor: null,
    },
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get chairman in skripsi by skripsi_id & panelist_chairman_id
// @used            rejectSkripsiRevisionDocumentById
const findChairmanInSkripsiByIdAndChairmanId = async (
  id,
  panelist_chairman_id
) => {
  const skripsi = await prisma.skripsi.findFirst({
    where: {
      id,
      panelist_chairman_id,
    },
  });
  return skripsi;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get member in skripsi by skripsi_id & panelist_member_id
// @used            rejectSkripsiRevisionDocumentById
const findMemberInSkripsiByIdAndMemberId = async (id, panelist_member_id) => {
  const skripsi = await prisma.skripsi.findFirst({
    where: {
      id,
      panelist_member_id,
    },
  });
  return skripsi;
};

//===============================(1)====================================
// @description     Approve dokumen revisi skripsi by chairman
// @route           PUT /skripsi/skripsi-revision-document/approve/:id
// @access          DOSEN
const approveSkripsiRevisionDocumentByChairmanById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_panelist_chairman: "Approve",
      panelist_chairman_revision_approve_date: new Date(),
    },
    select: {
      id: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
      panelist_chairman_revision_approve_date: true,
    },
  });
  return skripsi;
};

//===============================(2)====================================
// @description     Approve dokumen revisi skripsi by member
// @route           PUT /skripsi/skripsi-revision-document/approve/:id
// @access          DOSEN
const approveSkripsiRevisionDocumentByMemberById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_panelist_member: "Approve",
      panelist_member_revision_approve_date: new Date(),
    },
    select: {
      id: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
      panelist_member_revision_approve_date: true,
    },
  });
  return skripsi;
};

//===============================(3)====================================
// @description     Approve dokumen revisi skripsi by advisor
// @route           PUT /skripsi/skripsi-revision-document/approve/:id
// @access          DOSEN
const approveSkripsiRevisionDocumentByAdvisorById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_advisor: "Approve",
      advisor_revision_approve_date: new Date(),
    },
    select: {
      id: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
      advisor_revision_approve_date: true,
    },
  });
  return skripsi;
};

//===============================(1)====================================
// @description     Reject dokumen revisi skripsi by chairman
// @route           PUT /skripsi/skripsi-revision-document/reject/:id
// @access          DOSEN
const rejectSkripsiRevisionDocumentByChairmanById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_panelist_chairman: "Rejected",
      panelist_chairman_revision_approve_date: new Date(),
    },
    select: {
      id: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
      panelist_chairman_revision_approve_date: true,
    },
  });
  return skripsi;
};

//===============================(2)====================================
// @description     Reject dokumen revisi skripsi by member
// @route           PUT /skripsi/skripsi-revision-document/reject/:id
// @access          DOSEN
const rejectSkripsiRevisionDocumentByMemberById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_panelist_member: "Rejected",
      panelist_member_revision_approve_date: new Date(),
    },
    select: {
      id: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
      panelist_member_revision_approve_date: true,
    },
  });
  return skripsi;
};

//===============================(3)====================================
// @description     Reject dokumen revisi skripsi by member
// @route           PUT /skripsi/skripsi-revision-document/reject/:id
// @access          DOSEN
const rejectSkripsiRevisionDocumentByAdvisorById = async (id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_advisor: "Rejected",
      advisor_revision_approve_date: new Date(),
    },
    select: {
      id: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
      advisor_revision_approve_date: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Upload/Update dokumen HKI
// @route           PUT /skripsi/hki/:id
// @access          MAHASISWA
const updateHKIById = async (id, payload, path) => {
  const { hki_file } = payload;
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_hki: hki_file.file_name_hki,
      upload_date_hki: new Date(),
      file_size_hki: hki_file.file_size_hki,
      file_path_hki: path,
    },
    select: {
      id: true,
      file_name_hki: true,
      upload_date_hki: true,
      file_size_hki: true,
      file_path_hki: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Get dokumen HKI
// @route           GET /skripsi/hki/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findHKIById = async (id) => {
  const skripsi = await prisma.skripsi.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      file_name_hki: true,
      upload_date_hki: true,
      file_size_hki: true,
      file_path_hki: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Delete/Update dokumen HKI
// @route           GET /skripsi/hki/delete/:id
// @access          MAHASISWA
const deleteHKIById = async (id) => {
  await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_hki: null,
      upload_date_hki: null,
      file_size_hki: null,
      file_path_hki: null,
    },
  });
};

//===================================================================
// @description     Upload/Update link source code
// @route           PUT /skripsi/journal/:id
// @access          MAHASISWA
const updateJournalById = async (id, payload, path) => {
  const { journal_file } = payload;
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_journal: journal_file.file_name_journal,
      upload_date_journal: new Date(),
      file_size_journal: journal_file.file_size_journal,
      file_path_journal: path,
    },
    select: {
      id: true,
      file_name_journal: true,
      upload_date_journal: true,
      file_size_journal: true,
      file_path_journal: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Get dokumen journal
// @route           GET /skripsi/journal/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findJournalById = async (id) => {
  const skripsi = await prisma.skripsi.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      file_name_journal: true,
      upload_date_journal: true,
      file_size_journal: true,
      file_path_journal: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Delete/Update dokumen journal
// @route           GET /skripsi/journal/delete/:id
// @access          MAHASISWA
const deleteJournalById = async (id) => {
  await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_journal: null,
      upload_date_journal: null,
      file_size_journal: null,
      file_path_sourcecode: null,
    },
  });
};

//===================================================================
// @description     Upload/Update source code
// @route           PUT /skripsi/source-code/:id
// @access          MAHASISWA
const updateSourceCodeById = async (id, payload, path) => {
  const { source_code_file } = payload;
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_sourcecode: source_code_file.file_name_sourcecode,
      upload_date_sourcecode: new Date(),
      file_size_sourcecode: source_code_file.file_size_sourcecode,
      file_path_sourcecode: path,
    },
    select: {
      id: true,
      file_name_sourcecode: true,
      upload_date_sourcecode: true,
      file_size_sourcecode: true,
      file_path_sourcecode: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Get source code
// @route           GET /skripsi/source-code/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findSourceCodeById = async (id) => {
  const skripsi = await prisma.skripsi.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      file_name_sourcecode: true,
      upload_date_sourcecode: true,
      file_size_sourcecode: true,
      file_path_sourcecode: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Delete/Update source code
// @route           GET /skripsi/source-code/delete/:id
// @access          MAHASISWA
const deleteSourceCodeById = async (id) => {
  await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      file_name_sourcecode: null,
      upload_date_sourcecode: null,
      file_size_sourcecode: null,
      file_path_sourcecode: null,
    },
  });
};

//===================================================================
// @description     Upload/Update link source code
// @route           PUT /skripsi/link-source-code/:id
// @access          MAHASISWA
const updateLinkSourceCodeById = async (id, payload) => {
  const { link_soucecode } = payload;
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      link_soucecode: link_soucecode,
      upload_date_link_soucecode: new Date(),
    },
    select: {
      id: true,
      link_soucecode: true,
      upload_date_link_soucecode: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Get link source code
// @route           GET /skripsi/link-source-code/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findLinkSourceCodeById = async (id) => {
  const skripsi = await prisma.skripsi.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      link_soucecode: true,
      upload_date_link_soucecode: true,
    },
  });
  return skripsi;
};

//===================================================================
// @description     Delete/Update link source code
// @route           GET /skripsi/link-source-code/delete/:id
// @access          MAHASISWA
const deleteLinkSourceCodeById = async (id) => {
  await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      link_soucecode: null,
      upload_date_link_soucecode: null,
    },
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Update skripsi classroom by id
// @used            Classroom
const updateSkripsiClassroomById = async (id, classroom_id) => {
  const skripsi = await prisma.skripsi.update({
    where: {
      id,
    },
    data: {
      classroom_id,
    },
  });
  return skripsi;
};

module.exports = {
  insertSkripsi,
  updateSkripsiChairmanAndMemberById,

  findSkripsiById,
  updateSkripsiDocumentById,
  updateSkripsiDocumentApproveByAdvisorById,
  updateSkripsiDocumentApproveByCoAdvisor1ById,
  updateSkripsiDocumentApproveByCoAdvisor2ById,
  findSkripsiDocumentById,
  deleteSkripsiDocumentById,
  deleteSkripsiDocumentApproveByAdvisorById,
  deleteSkripsiDocumentApproveByCoAdvisor1ById,
  deleteSkripsiDocumentApproveByCoAdvisor2ById,
  findAdvisorInSkripsiByIdAndAdvisorId,
  findCoAdvisor1InSkripsiByIdAndAdvisorId,
  findCoAdvisor2InSkripsiByIdAndAdvisorId,
  approveSkripsiDocumentByAdvisorById,
  approveSkripsiDocumentByCoAdvisor1ById,
  approveSkripsiDocumentByCoAdvisor2ById,
  rejectSkripsiDocumentByAdvisorById,
  rejectSkripsiDocumentByCoAdvisor1ById,
  rejectSkripsiDocumentByCoAdvisor2ById,

  updateSkripsiPaymentById,
  findSkripsiPaymentById,
  deleteSkripsiPaymentById,

  updateSkripsiPlagiarismById,
  findSkripsiPlagiarismById,
  deleteSkripsiPlagiarismById,

  findAllSkripsiSchedule,
  findAllConflictingSkripsiSchedule,
  updateSkripsiScheduleById,
  findSkripsiScheduleById,

  openAccessSkripsiReportById,
  findSkripsiReportById,
  signChairmanSkripsiReportById,
  signMemberSkripsiReportById,
  signAdvisorSkripsiReportById,
  signDekanSkripsiReportById,
  updateSkripsiConclusionById,
  findSkripsiConclusionById,

  updateSkripsiRevisionDocumentById,
  updateSkripsiRevisionDocumentApproveByChairmanById,
  updateSkripsiRevisionDocumentApproveByMemberById,
  updateSkripsiRevisionDocumentApproveByAdvisorById,
  findSkripsiRevisionDocumentById,
  deleteSkripsiRevisionDocumentById,
  deleteSkripsiRevisionDocumentApproveByChairmanById,
  deleteSkripsiRevisionDocumentApproveByMemberById,
  deleteSkripsiRevisionDocumentApproveByAdvisorById,
  findChairmanInSkripsiByIdAndChairmanId,
  findMemberInSkripsiByIdAndMemberId,
  approveSkripsiRevisionDocumentByChairmanById,
  approveSkripsiRevisionDocumentByMemberById,
  approveSkripsiRevisionDocumentByAdvisorById,
  rejectSkripsiRevisionDocumentByChairmanById,
  rejectSkripsiRevisionDocumentByMemberById,
  rejectSkripsiRevisionDocumentByAdvisorById,

  updateHKIById,
  findHKIById,
  deleteHKIById,
  updateJournalById,
  findJournalById,
  deleteJournalById,
  updateSourceCodeById,
  findSourceCodeById,
  deleteSourceCodeById,
  updateLinkSourceCodeById,
  findLinkSourceCodeById,
  deleteLinkSourceCodeById,

  updateSkripsiClassroomById,
};
