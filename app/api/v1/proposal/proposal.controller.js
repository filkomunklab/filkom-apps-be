//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const proposalService = require("./proposal.service");
const { policyFor } = require("../policy");

//===================================================================
// @description     Upload dokumen proposal
// @route           PUT /proposal/proposal-document/:id
// @access          MAHASISWA
const updateProposalDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_document")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const id = req.params.id;
    const payload = req.body;
    if (
      !(
        payload.proposal_file.file_name_proposal &&
        payload.proposal_file.file_size_proposal &&
        payload.proposal_file.buffer
      )
    ) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const proposal = await proposalService.updateProposalDocumentById(
      userId,
      id,
      payload
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get dokumen proposal
// @route           GET /proposal/proposal-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getProposalDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_document")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const proposal = await proposalService.getProposalDocumentById(id);
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete/Update dokumen proposal
// @route           PUT /proposal/proposal-document/delete/:id
// @access          MAHASISWA
const deleteProposalDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_document")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const id = req.params.id;
    await proposalService.deleteProposalDocumentById(userId, id);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Approve dokumen proposal
// @route           PUT /proposal/proposal-document/approve/:id
// @access          DOSEN
const approveProposalDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "is_proposal_approve")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const id = req.params.id;
    const proposal = await proposalService.approveProposalDocumentById(
      userId,
      id
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Reject dokumen proposal
// @route           PUT /proposal/proposal-document/reject/:id
// @access          DOSEN
const rejectProposalDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "is_proposal_approve")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const id = req.params.id;
    const proposal = await proposalService.rejectProposalDocumentById(
      userId,
      id
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Upload/Update bukti pembayaran
// @route           PUT /proposal/proposal-payment/:id
// @access          MAHASISWA
const updateProposalPaymentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_payment")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const payload = req.body;
    if (
      !(
        payload.payment_file.file_name_payment &&
        payload.payment_file.file_size_payment &&
        payload.payment_file.buffer
      )
    ) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const proposal = await proposalService.updateProposalPaymentById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get bukti pembayaran
// @route           GET /proposal/proposal-payment/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getProposalPaymentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_payment")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const proposal = await proposalService.getProposalPaymentById(id);
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete/Update bukti pembayaran
// @route           PUT /proposal/proposal-payment/delete/:id
// @access          MAHASISWA
const deleteProposalPaymentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_payment")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    await proposalService.deleteProposalPaymentById(id, userId);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Upload/Update bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/:id
// @access          MAHASISWA
const updateProposalPlagiarismById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_plagiarism")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const payload = req.body;
    if (
      !(
        payload.plagiarism_file.file_name_plagiarismcheck &&
        payload.plagiarism_file.file_size_plagiarismcheck &&
        payload.plagiarism_file.buffer
      )
    ) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const proposal = await proposalService.updateProposalPlagiarismById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getProposalPlagiarismById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_plagiarism")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const proposal = await proposalService.getProposalPlagiarismById(id);
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete/Update bukti hasil cek plagiat
// @route           PUT /proposal/proposal-plagiarism-check/delete/:id
// @access          MAHASISWA
const deleteProposalPlagiarismById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_plagiarism")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    await proposalService.deleteProposalPlagiarismById(id, userId);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get all proposal schedule
// @route           GET /proposal/schedule
// @access          OPERATOR_FAKULTAS
const getAllProposalSchedule = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_schedule")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const proposal = await proposalService.getAllProposalSchedule();
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Create/Update proposal schedule
// @route           PUT /proposal/schedule/:id
// @access          OPERATOR_FAKULTAS
const updateProposalScheduleById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_schedule")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const payload = req.body;
    if (
      !(
        payload.panelist_chairman_id &&
        payload.panelist_member_id &&
        payload.start_defence &&
        payload.end_defence &&
        payload.defence_room &&
        payload.defence_date
      )
    ) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const proposal = await proposalService.updateProposalScheduleById(
      id,
      payload
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get proposal schedule
// @route           GET /proposal/schedule/:id
// @access          OPERATOR_FAKULTAS
const getProposalScheduleById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_schedule")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const proposal = await proposalService.getProposalScheduleById(id);
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Open report
// @route           PUT /proposal/proposal-report/open-access/:id
// @access          DOSEN
const openAccessProposalReportById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "open_proposal_report")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const proposal = await proposalService.openAccessProposalReportById(
      id,
      userId
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Update proposal assessment by id
// @route           PUT /proposal/proposal-assessment/:id
// @access          DOSEN
const updateProposalAssessmentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "Proposal_Assessment")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const payload = req.body;
    if (!(payload.student_id && payload.value)) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const proposalAssessment =
      await proposalService.updateProposalAssessmentById(id, userId, payload);
    res.send({ status: "OK", data: proposalAssessment });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get all proposal assessment by id
// @route           GET /proposal/proposal-assessment/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getAllProposalAssessmentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "Proposal_Assessment")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const proposalAssessment =
      await proposalService.getAllProposalAssessmentById(id);
    res.send({ status: "OK", data: proposalAssessment });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Update proposal changes by id
// @route           PUT /proposal/proposal-changes/:id
// @access          DOSEN
const updateProposalChangesById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "Proposal_Changes")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const payload = req.body;
    if (!payload.changes) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const proposalAssessment = await proposalService.updateProposalChangesById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: proposalAssessment });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get all proposal changes by id
// @route           GET /proposal/proposal-changes/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getAllProposalChangesById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "Proposal_Changes")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const proposalChanges = await proposalService.getAllProposalChangesById(id);
    res.send({ status: "OK", data: proposalChanges });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get report
// @route           GET /proposal/proposal-report/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getProposalReportById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_report")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const proposal = await proposalService.getProposalReportById(id);
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Fill/Update report
// @route           PUT /proposal/proposal-report/:id
// @access          DOSEN, DEKAN
const signProposalReportById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_report_approve")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const proposal = await proposalService.signProposalReportById(id, userId);
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Fill/Update report conclusion
// @route           PUT /proposal/proposal-report/conclusion/:id
// @access          DOSEN
const updateProposalConclusionById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_report_conclusion")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const payload = req.body;
    if (
      !(
        payload.exam_conclution &&
        payload.changes_conclusion &&
        payload.assessment_conclution &&
        payload.is_pass
      )
    ) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const proposal = await proposalService.updateProposalConclusionById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get report conclusion
// @route           GET /proposal/proposal-report/conclusion/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getProposalConclusionById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_report_conclusion")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const proposal = await proposalService.getProposalConclusionById(id);
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Upload/Update dokumen revisi proposal
// @route           PUT /proposal/proposal-revision-document/:id
// @access          MAHASISWA
const updateProposalRevisionDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_revision_document")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const payload = req.body;
    if (
      !(
        payload.revision_file.file_name_revision &&
        payload.revision_file.file_size_revision &&
        payload.revision_file.buffer
      )
    ) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const proposal = await proposalService.updateProposalRevisionDocumentById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get dokumen revisi proposal
// @route           GET /proposal/proposal-revision-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getProposalRevisionDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "proposal_revision_document")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const proposal = await proposalService.getProposalRevisionDocumentById(id);
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete/Update dokumen revisi proposal
// @route           PUT /proposal/proposal-revision-document/delete/:id
// @access          MAHASISWA
const deleteProposalRevisionDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "proposal_revision_document")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    await proposalService.deleteProposalRevisionDocumentById(id, userId);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Approve dokumen revisi proposal
// @route           PUT /proposal/proposal-revision-document/approve/:id
// @access          DOSEN
const approveProposalRevisionDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "is_proposal_revision_approve")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const proposal = await proposalService.approveProposalRevisionDocumentById(
      id,
      userId
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Reject dokumen revisi proposal
// @route           PUT /proposal/proposal-revision-document/reject/:id
// @access          DOSEN
const rejectProposalRevisionDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "is_proposal_revision_approve")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const proposal = await proposalService.rejectProposalRevisionDocumentById(
      id,
      userId
    );
    res.send({ status: "OK", data: proposal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  updateProposalDocumentById,
  getProposalDocumentById,
  deleteProposalDocumentById,
  approveProposalDocumentById,
  rejectProposalDocumentById,
  updateProposalPaymentById,
  getProposalPaymentById,
  deleteProposalPaymentById,
  updateProposalPlagiarismById,
  getProposalPlagiarismById,
  deleteProposalPlagiarismById,

  getAllProposalSchedule,
  updateProposalScheduleById,
  getProposalScheduleById,

  openAccessProposalReportById,
  updateProposalAssessmentById,
  getAllProposalAssessmentById,
  updateProposalChangesById,
  getAllProposalChangesById,
  getProposalReportById,
  signProposalReportById,
  updateProposalConclusionById,
  getProposalConclusionById,

  updateProposalRevisionDocumentById,
  getProposalRevisionDocumentById,
  deleteProposalRevisionDocumentById,
  approveProposalRevisionDocumentById,
  rejectProposalRevisionDocumentById,
};
