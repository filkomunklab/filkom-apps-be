//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// @description     Create empty proposal
// @used            Submission
const insertProposal = async (submission) => {
  const {
    proposed_advisor_id,
    proposed_co_advisor1_id,
    proposed_co_advisor2_id,
    classroom_id,
  } = submission;
  const proposal = await prisma.proposal.create({
    data: {
      advisor_id: proposed_advisor_id,
      co_advisor1_id: proposed_co_advisor1_id,
      co_advisor2_id: proposed_co_advisor2_id,
      classroom_id,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get proposal by id
// @used            getProposalById, Proposal_Assessment
const findProposalById = async (id) => {
  const proposal = await prisma.proposal.findUnique({
    where: {
      id,
    },
  });
  return proposal;
};

//===================================================================
// @description     Upload dokumen proposal
// @route           PUT /proposal/proposal-document/:id
// @access          MAHASISWA
const updateProposalDocumentById = async (id, payload, path) => {
  const { proposal_file } = payload;
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      file_name_proposal: proposal_file.file_name_proposal,
      upload_date_proposal: new Date(),
      file_size_proposal: proposal_file.file_size_proposal,
      file_path_proposal: path,
    },
    select: {
      id: true,
      file_name_proposal: true,
      upload_date_proposal: true,
      file_size_proposal: true,
      file_path_proposal: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++(1)++++++++++++++++++++++++++++++++++++++
// @description     Update proposal approve by advisor
// @used            updateProposalDocumentById
const updateProposalDocumentApproveByAdvisorById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_advisor: "Waiting",
    },
    select: {
      is_proposal_approve_by_advisor: true,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++(2)++++++++++++++++++++++++++++++++++++++
// @description     Update proposal approve by co-advisor1
// @used            updateProposalDocumentById
const updateProposalDocumentApproveByCoAdvisor1ById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_co_advisor1: "Waiting",
    },
    select: {
      is_proposal_approve_by_co_advisor1: true,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++(3)++++++++++++++++++++++++++++++++++++++
// @description     Update proposal approve by co-advisor2
// @used            updateProposalDocumentById
const updateProposalDocumentApproveByCoAdvisor2ById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_co_advisor2: "Waiting",
    },
    select: {
      is_proposal_approve_by_co_advisor2: true,
    },
  });
  return proposal;
};

//===================================================================
// @description     Get dokumen proposal
// @route           GET /proposal/proposal-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN
const findProposalDocumentById = async (id) => {
  const proposal = await prisma.proposal.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      file_name_proposal: true,
      upload_date_proposal: true,
      file_size_proposal: true,
      file_path_proposal: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
    },
  });
  return proposal;
};

//===================================================================
// @description     Delete/Update dokumen proposal
// @route           PUT "/proposal/proposal-document/delete/:id
// @access          MAHASISWA
const deleteProposalDocumentById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      file_name_proposal: null,
      upload_date_proposal: null,
      file_size_proposal: null,
      file_path_proposal: null,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++(1)++++++++++++++++++++++++++++++++++++++
// @description     Delete/Update proposal approve by advisor
// @used            deleteProposalDocumentById
const deleteProposalDocumentApproveByAdvisorById = async (id) => {
  await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_advisor: null,
    },
  });
};

// ++++++++++++++++++++++++++++(2)++++++++++++++++++++++++++++++++++++++
// @description     Delete/Update proposal approve by co-advisor1
// @used            deleteProposalDocumentById
const deleteProposalDocumentApproveByCoAdvisor1ById = async (id) => {
  await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_co_advisor1: null,
    },
  });
};

// ++++++++++++++++++++++++++++(3)++++++++++++++++++++++++++++++++++++++
// @description     Delete/Update proposal approve by co-advisor2
// @used            deleteProposalDocumentById
const deleteProposalDocumentApproveByCoAdvisor2ById = async (id) => {
  await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_co_advisor2: null,
    },
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get advisor in proposal by proposal_id & advisor_id
// @used            approveProposalDocumentById, rejectProposalRevisionDocumentById
const findAdvisorInProposalByIdAndAdvisorId = async (id, advisor_id) => {
  const proposal = await prisma.proposal.findFirst({
    where: {
      id,
      advisor_id,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get co-advisor1 in proposal by proposal_id & co_advisor1_id
// @used            approveProposalDocumentById
const findCoAdvisor1InProposalByIdAndAdvisorId = async (id, co_advisor1_id) => {
  const proposal = await prisma.proposal.findFirst({
    where: {
      id,
      co_advisor1_id,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get co-advisor2 in proposal by proposal_id & co_advisor2_id
// @used            approveProposalDocumentById
const findCoAdvisor2InProposalByIdAndAdvisorId = async (id, co_advisor2_id) => {
  const proposal = await prisma.proposal.findFirst({
    where: {
      id,
      co_advisor2_id,
    },
  });
  return proposal;
};

//=============================(1)======================================
// @description     Approve dokumen proposal
// @route           PUT /proposal/proposal-document/approve/:id
// @access          DOSEN
const approveProposalDocumentByAdvisorById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_advisor: "Approve",
      advisor_proposal_approved_date: new Date(),
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
      advisor_proposal_approved_date: true,
    },
  });
  return proposal;
};

//=============================(2)======================================
// @description     Approve dokumen proposal
// @route           PUT /proposal/proposal-document/approve/:id
// @access          DOSEN
const approveProposalDocumentByCoAdvisor1ById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_co_advisor1: "Approve",
      co_advisor1_proposal_approved_date: new Date(),
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
      co_advisor1_proposal_approved_date: true,
    },
  });
  return proposal;
};

//=============================(3)======================================
// @description     Approve dokumen proposal
// @route           PUT /proposal/proposal-document/approve/:id
// @access          DOSEN
const approveProposalDocumentByCoAdvisor2ById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_co_advisor2: "Approve",
      co_advisor2_proposal_approved_date: new Date(),
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
      co_advisor2_proposal_approved_date: true,
    },
  });
  return proposal;
};

//=============================(1)======================================
// @description     Reject dokumen proposal
// @route           PUT /proposal/proposal-document/reject/:id
// @access          DOSEN
const rejectProposalDocumentByAdvisorById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_advisor: "Rejected",
      advisor_proposal_approved_date: new Date(),
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
      advisor_proposal_approved_date: true,
    },
  });
  return proposal;
};

//=============================(2)======================================
// @description     Reject dokumen proposal
// @route           PUT /proposal/proposal-document/reject/:id
// @access          DOSEN
const rejectProposalDocumentByCoAdvisor1ById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_co_advisor1: "Rejected",
      co_advisor1_proposal_approved_date: new Date(),
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
      co_advisor1_proposal_approved_date: true,
    },
  });
  return proposal;
};

//=============================(3)======================================
// @description     Reject dokumen proposal
// @route           PUT /proposal/proposal-document/reject/:id
// @access          DOSEN
const rejectProposalDocumentByCoAdvisor2ById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_proposal_approve_by_co_advisor2: "Rejected",
      co_advisor2_proposal_approved_date: new Date(),
    },
    select: {
      id: true,
      is_proposal_approve_by_advisor: true,
      is_proposal_approve_by_co_advisor1: true,
      is_proposal_approve_by_co_advisor2: true,
      co_advisor2_proposal_approved_date: true,
    },
  });
  return proposal;
};

//===================================================================
// @description     Upload/Update bukti pembayaran
// @route           PUT /proposal/proposal-payment/:id
// @access          MAHASISWA
const updateProposalPaymentById = async (id, payload, path) => {
  const { payment_file } = payload;
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//===================================================================
// @description     Get bukti pembayaran
// @route           GET /proposal/proposal-payment/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findProposalPaymentById = async (id) => {
  const proposal = await prisma.proposal.findUnique({
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
  return proposal;
};

//===================================================================
// @description     Delete/Update bukti pembayaran
// @route           DELETE /proposal/proposal-payment/delete/:id
// @access          MAHASISWA
const deleteProposalPaymentById = async (id) => {
  await prisma.proposal.update({
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
// @route           PUT /proposal/proposal-plagiarism-check/:id
// @access          MAHASISWA
const updateProposalPlagiarismById = async (id, payload, path) => {
  const { plagiarism_file } = payload;
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//===================================================================
// @description     Get bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findProposalPlagiarismById = async (id) => {
  const proposal = await prisma.proposal.findUnique({
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
  return proposal;
};

//===================================================================
// @description     Delete/Update bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/delete/:id
// @access          MAHASISWA
const deleteProposalPlagiarismById = async (id) => {
  await prisma.proposal.update({
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
// @description     Get all proposal schedule
// @route           GET /proposal/schedule
// @access          OPERATOR_FAKULTAS
// @used            checkTimeConflict
const findAllProposalSchedule = async () => {
  // Mencari proposal yang tidak memiliki is_pass berisi "Pass" atau "Fail"
  const proposals = await prisma.proposal.findMany({
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

  return proposals;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Check conflict between schedule
// @used            checkScheduleConflict
const findAllConflictingProposalSchedule = async (
  id,
  defence_date,
  defence_room
) => {
  const conflictingSchedules = await prisma.Proposal.findMany({
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
// @description     Create/Update proposal schedule
// @route           PUT /proposal/schedule/:id
// @access          OPERATOR_FAKULTAS
const updateProposalScheduleById = async (id, payload) => {
  const {
    panelist_chairman_id,
    panelist_member_id,
    start_defence,
    end_defence,
    defence_room,
    defence_date,
  } = payload;
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      panelist_chairman_id,
      panelist_member_id,
      start_defence,
      end_defence,
      defence_room,
      defence_date,
      report_date: defence_date,
    },
    select: {
      id: true,
      panelist_chairman_id: true,
      panelist_member_id: true,
      start_defence: true,
      end_defence: true,
      defence_room: true,
      defence_date: true,
    },
  });
  return proposal;
};

//===================================================================
// @description     Get proposal schedule
// @route           GET /proposal/schedule/:id
// @access          OPERATOR_FAKULTAS
const findProposalScheduleById = async (id) => {
  const proposal = await prisma.proposal.findUnique({
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
  return proposal;
};

//===================================================================
// @description     Open report
// @route           PUT /proposal/proposal-report/open-access/:id
// @access          DOSEN
const openAccessProposalReportById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//===================================================================
// @description     Get report
// @route           GET /proposal/proposal-report/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findProposalReportById = async (id) => {
  const proposal = await prisma.proposal.findUnique({
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
  return proposal;
};

//==============================(1)=====================================
// @description     Fill/Update report
// @route           PUT /proposal/proposal-report/:id
// @access          DOSEN, DEKAN
const signChairmanProposalReportById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//==============================(2)=====================================
// @description     Fill/Update report
// @route           PUT /proposal/proposal-report/:id
// @access          DOSEN, DEKAN
const signMemberProposalReportById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//==============================(3)=====================================
// @description     Fill/Update report
// @route           PUT /proposal/proposal-report/:id
// @access          DOSEN, DEKAN
const signAdvisorProposalReportById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//==============================(34=====================================
// @description     Fill/Update report
// @route           PUT /proposal/proposal-report/:id
// @access          DOSEN, DEKAN
const signDekanProposalReportById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//===================================================================
// @description     Fill/Update report conclusion
// @route           PUT /proposal/proposal-report/conclusion/:id
// @access          DOSEN
const updateProposalConclusionById = async (id, payload) => {
  const {
    exam_conclution,
    changes_conclusion,
    assessment_conclution,
    is_pass,
  } = payload;
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//===================================================================
// @description     Get report conclusion
// @route           GET /proposal/proposal-report/conclusion/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findProposalConclusionById = async (id) => {
  const proposal = await prisma.proposal.findUnique({
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
  return proposal;
};

//===================================================================
// @description     Upload/Update dokumen revisi proposal
// @route           PUT /proposal/proposal-revision-document/:id
// @access          MAHASISWA
const updateProposalRevisionDocumentById = async (id, payload, path) => {
  const { revision_file } = payload;
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

// ++++++++++++++++++++++++++++(1)++++++++++++++++++++++++++++++++++++++
// @description     Update proposal revision approve by advisor
// @used            updateProposalRevisionDocumentById
const updateProposalRevisionDocumentApproveByChairmanById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

// ++++++++++++++++++++++++++++(2)++++++++++++++++++++++++++++++++++++++
// @description     Update proposal revision approve by member
// @used            updateProposalRevisionDocumentById
const updateProposalRevisionDocumentApproveByMemberById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

// ++++++++++++++++++++++++++++(3)++++++++++++++++++++++++++++++++++++++
// @description     Update proposal revision approve by advisor
// @used            updateProposalRevisionDocumentById
const updateProposalRevisionDocumentApproveByAdvisorById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//===================================================================
// @description     Get dokumen revisi proposal
// @route           GET /proposal/proposal-revision-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const findProposalRevisionDocumentById = async (id) => {
  const proposal = await prisma.proposal.findUnique({
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
  return proposal;
};

//===================================================================
// @description     Delete/Update dokumen revisi proposal
// @route           PUT /proposal/proposal-revision-document/delete/:id
// @access          MAHASISWA
const deleteProposalRevisionDocumentById = async (id) => {
  const proposal = await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      file_name_revision: null,
      upload_date_revision: null,
      file_size_revision: null,
    },
    select: {
      id: true,
      file_name_revision: true,
      upload_date_revision: true,
      file_size_revision: true,
      is_revision_approve_by_panelist_chairman: true,
      is_revision_approve_by_panelist_member: true,
      is_revision_approve_by_advisor: true,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++(1)++++++++++++++++++++++++++++++++++++++
// @description     Delete/Update proposal revision approve by chairman
// @used            deleteProposalRevisionDocumentById
const deleteProposalRevisionDocumentApproveByChairmanById = async (id) => {
  await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_panelist_chairman: null,
    },
  });
};

// ++++++++++++++++++++++++++++(2)++++++++++++++++++++++++++++++++++++++
// @description     Delete/Update proposal revision approve by member
// @used            deleteProposalRevisionDocumentById
const deleteProposalRevisionDocumentApproveByMemberById = async (id) => {
  await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_panelist_member: null,
    },
  });
};

// ++++++++++++++++++++++++++++(3)++++++++++++++++++++++++++++++++++++++
// @description     Delete/Update proposal revision approve by advisor
// @used            deleteProposalRevisionDocumentById
const deleteProposalRevisionDocumentApproveByAdvisorById = async (id) => {
  await prisma.proposal.update({
    where: {
      id,
    },
    data: {
      is_revision_approve_by_advisor: null,
    },
  });
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get chairman in proposal by proposal_id & panelist_chairman_id
// @used            rejectProposalRevisionDocumentById
const findChairmanInProposalByIdAndChairmanId = async (
  id,
  panelist_chairman_id
) => {
  const proposal = await prisma.proposal.findFirst({
    where: {
      id,
      panelist_chairman_id,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get member in proposal by proposal_id & panelist_member_id
// @used            rejectProposalRevisionDocumentById
const findMemberInProposalByIdAndMemberId = async (id, panelist_member_id) => {
  const proposal = await prisma.proposal.findFirst({
    where: {
      id,
      panelist_member_id,
    },
  });
  return proposal;
};

//===============================(1)====================================
// @description     Approve dokumen revisi proposal by chairman
// @route           PUT /proposal/proposal-revision-document/approve/:id
// @access          DOSEN
const approveProposalRevisionDocumentByChairmanById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//===============================(2)====================================
// @description     Approve dokumen revisi proposal by member
// @route           PUT /proposal/proposal-revision-document/approve/:id
// @access          DOSEN
const approveProposalRevisionDocumentByMemberById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//===============================(3)====================================
// @description     Approve dokumen revisi proposal by advisor
// @route           PUT /proposal/proposal-revision-document/approve/:id
// @access          DOSEN
const approveProposalRevisionDocumentByAdvisorById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//===============================(1)====================================
// @description     Reject dokumen revisi proposal by chairman
// @route           PUT /proposal/proposal-revision-document/reject/:id
// @access          DOSEN
const rejectProposalRevisionDocumentByChairmanById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//===============================(2)====================================
// @description     Reject dokumen revisi proposal by member
// @route           PUT /proposal/proposal-revision-document/reject/:id
// @access          DOSEN
const rejectProposalRevisionDocumentByMemberById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

//===============================(3)====================================
// @description     Reject dokumen revisi proposal by member
// @route           PUT /proposal/proposal-revision-document/reject/:id
// @access          DOSEN
const rejectProposalRevisionDocumentByAdvisorById = async (id) => {
  const proposal = await prisma.proposal.update({
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
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all proposal by advisor id
// @used            Group,
const findAllProposalByAdvisorId = async (userId) => {
  const proposal = await prisma.proposal.findMany({
    where: {
      advisor_id: userId,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all proposal by co-advisor id
// @used            Group,
const findAllProposalByCoAdvisorId = async (userId) => {
  const proposal = await prisma.proposal.findMany({
    where: {
      OR: [
        {
          co_advisor1_id: userId,
        },
        {
          co_advisor2_id: userId,
        },
      ],
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all proposal by chairman
// @used            Group,
const findAllProposalByChairman = async (userId) => {
  const proposal = await prisma.proposal.findMany({
    where: {
      panelist_chairman_id: userId,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all proposal by member
// @used            Group,
const findAllProposalByMember = async (userId) => {
  const proposal = await prisma.proposal.findMany({
    where: {
      panelist_member_id: userId,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all proposal by classroom_id
// @used            Group,
const findAllProposalByClassroomId = async (classroom_id) => {
  const proposal = await prisma.proposal.findMany({
    where: {
      classroom_id,
    },
  });
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all proposal
// @used            Group,
const findAllProposal = async () => {
  const proposal = await prisma.proposal.findMany();
  return proposal;
};

module.exports = {
  insertProposal,
  findProposalById,
  updateProposalDocumentById,
  updateProposalDocumentApproveByAdvisorById,
  updateProposalDocumentApproveByCoAdvisor1ById,
  updateProposalDocumentApproveByCoAdvisor2ById,
  findProposalDocumentById,
  deleteProposalDocumentById,
  deleteProposalDocumentApproveByAdvisorById,
  deleteProposalDocumentApproveByCoAdvisor1ById,
  deleteProposalDocumentApproveByCoAdvisor2ById,
  findAdvisorInProposalByIdAndAdvisorId,
  findCoAdvisor1InProposalByIdAndAdvisorId,
  findCoAdvisor2InProposalByIdAndAdvisorId,
  approveProposalDocumentByAdvisorById,
  approveProposalDocumentByCoAdvisor1ById,
  approveProposalDocumentByCoAdvisor2ById,
  rejectProposalDocumentByAdvisorById,
  rejectProposalDocumentByCoAdvisor1ById,
  rejectProposalDocumentByCoAdvisor2ById,
  updateProposalPaymentById,
  findProposalPaymentById,
  deleteProposalPaymentById,
  updateProposalPlagiarismById,
  findProposalPlagiarismById,
  deleteProposalPlagiarismById,

  findAllProposalSchedule,
  findAllConflictingProposalSchedule,
  updateProposalScheduleById,
  findProposalScheduleById,

  openAccessProposalReportById,
  findProposalReportById,
  signChairmanProposalReportById,
  signMemberProposalReportById,
  signAdvisorProposalReportById,
  signDekanProposalReportById,
  updateProposalConclusionById,
  findProposalConclusionById,

  updateProposalRevisionDocumentById,
  updateProposalRevisionDocumentApproveByChairmanById,
  updateProposalRevisionDocumentApproveByMemberById,
  updateProposalRevisionDocumentApproveByAdvisorById,
  findProposalRevisionDocumentById,
  deleteProposalRevisionDocumentById,
  deleteProposalRevisionDocumentApproveByChairmanById,
  deleteProposalRevisionDocumentApproveByMemberById,
  deleteProposalRevisionDocumentApproveByAdvisorById,
  findChairmanInProposalByIdAndChairmanId,
  findMemberInProposalByIdAndMemberId,
  approveProposalRevisionDocumentByChairmanById,
  approveProposalRevisionDocumentByMemberById,
  approveProposalRevisionDocumentByAdvisorById,
  rejectProposalRevisionDocumentByChairmanById,
  rejectProposalRevisionDocumentByMemberById,
  rejectProposalRevisionDocumentByAdvisorById,

  findAllProposalByAdvisorId,
  findAllProposalByCoAdvisorId,
  findAllProposalByChairman,
  findAllProposalByMember,
  findAllProposalByClassroomId,
  findAllProposal,
};
