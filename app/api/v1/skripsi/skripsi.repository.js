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
};
