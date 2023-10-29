//Layer untuk handle request dan response
//Biasanya juga handle validasi body

const skripsiService = require("./skripsi.service");
const { policyFor } = require("../policy");

//===================================================================
// @description     Upload dokumen skripsi
// @route           PUT /skripsi/skripsi-document/:id
// @access          MAHASISWA
const updateSkripsiDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "skripsi_document")) {
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
        payload.skripsi_file.file_name_skripsi &&
        payload.skripsi_file.file_size_skripsi &&
        payload.skripsi_file.buffer
      )
    ) {
      return res
        .status(400)
        .send({ status: "FAILED", data: { error: "some field is missing" } });
    }
    const skripsi = await skripsiService.updateSkripsiDocumentById(
      userId,
      id,
      payload
    );
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get dokumen skripsi
// @route           GET /skripsi/skripsi-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getSkripsiDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_document")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const skripsi = await skripsiService.getSkripsiDocumentById(id);
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete/Update dokumen skripsi
// @route           PUT /skripsi/skripsi-document/delete/:id
// @access          MAHASISWA
const deleteSkripsiDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "skripsi_document")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const id = req.params.id;
    await skripsiService.deleteSkripsiDocumentById(userId, id);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Approve dokumen skripsi
// @route           PUT /skripsi/skripsi-document/approve/:id
// @access          DOSEN
const approveSkripsiDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "is_skripsi_approve")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const id = req.params.id;
    const skripsi = await skripsiService.approveSkripsiDocumentById(userId, id);
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Reject dokumen skripsi
// @route           PUT /skripsi/skripsi-document/reject/:id
// @access          DOSEN
const rejectSkripsiDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "is_skripsi_approve")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const userId = req.user.user.id;
    const id = req.params.id;
    const skripsi = await skripsiService.rejectSkripsiDocumentById(userId, id);
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Upload/Update bukti pembayaran
// @route           PUT /skripsi/skripsi-payment/:id
// @access          MAHASISWA
const updateSkripsiPaymentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "skripsi_payment")) {
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
    const skripsi = await skripsiService.updateSkripsiPaymentById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get bukti pembayaran
// @route           GET /skripsi/skripsi-payment/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getSkripsiPaymentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_payment")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const skripsi = await skripsiService.getSkripsiPaymentById(id);
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete/Update bukti pembayaran
// @route           PUT /skripsi/skripsi-payment/delete/:id
// @access          MAHASISWA
const deleteSkripsiPaymentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "skripsi_payment")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    await skripsiService.deleteSkripsiPaymentById(id, userId);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Upload/Update bukti hasil cek plagiat
// @route           PUT /skripsi/skripsi-plagiarism-check/:id
// @access          MAHASISWA
const updateSkripsiPlagiarismById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "skripsi_plagiarism")) {
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
    const skripsi = await skripsiService.updateSkripsiPlagiarismById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get bukti hasil cek plagiat
// @route           PUT /skripsi/skripsi-plagiarism-check/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getSkripsiPlagiarismById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_plagiarism")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const skripsi = await skripsiService.getSkripsiPlagiarismById(id);
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete/Update bukti hasil cek plagiat
// @route           PUT /skripsi/skripsi-plagiarism-check/delete/:id
// @access          MAHASISWA
const deleteSkripsiPlagiarismById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "skripsi_plagiarism")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    await skripsiService.deleteSkripsiPlagiarismById(id, userId);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get all skripsi schedule
// @route           GET /skripsi/schedule
// @access          OPERATOR_FAKULTAS
const getAllSkripsiSchedule = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_schedule")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const skripsi = await skripsiService.getAllSkripsiSchedule();
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Create/Update skripsi schedule
// @route           PUT /skripsi/schedule/:id
// @access          OPERATOR_FAKULTAS
const updateSkripsiScheduleById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "skripsi_schedule")) {
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
    const skripsi = await skripsiService.updateSkripsiScheduleById(id, payload);
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get skripsi schedule
// @route           GET /skripsi/schedule/:id
// @access          OPERATOR_FAKULTAS
const getSkripsiScheduleById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_schedule")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const skripsi = await skripsiService.getSkripsiScheduleById(id);
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Open report
// @route           PUT /skripsi/skripsi-report/open-access/:id
// @access          DOSEN
const openAccessSkripsiReportById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "open_skripsi_report")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const skripsi = await skripsiService.openAccessSkripsiReportById(
      id,
      userId
    );
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Update skripsi assessment by id
// @route           PUT /skripsi/skripsi-assessment/:id
// @access          DOSEN
const updateSkripsiAssessmentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "Skripsi_Assessment")) {
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
    const skripsiAssessment = await skripsiService.updateSkripsiAssessmentById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: skripsiAssessment });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get all skripsi assessment by id
// @route           GET /skripsi/skripsi-assessment/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getAllSkripsiAssessmentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "Skripsi_Assessment")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const skripsiAssessment = await skripsiService.getAllSkripsiAssessmentById(
      id
    );
    res.send({ status: "OK", data: skripsiAssessment });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Update skripsi changes by id
// @route           PUT /skripsi/skripsi-changes/:id
// @access          DOSEN
const updateSkripsiChangesById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "Skripsi_Changes")) {
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
    const skripsiAssessment = await skripsiService.updateSkripsiChangesById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: skripsiAssessment });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get all skripsi changes by id
// @route           GET /skripsi/skripsi-changes/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getAllSkripsiChangesById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "Skripsi_Changes")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const skripsiChanges = await skripsiService.getAllSkripsiChangesById(id);
    res.send({ status: "OK", data: skripsiChanges });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get report
// @route           GET /skripsi/skripsi-report/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getSkripsiReportById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_report")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const skripsi = await skripsiService.getSkripsiReportById(id);
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Fill/Update report
// @route           PUT /skripsi/skripsi-report/:id
// @access          DOSEN, DEKAN
const signSkripsiReportById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "skripsi_report_approve")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const skripsi = await skripsiService.signSkripsiReportById(id, userId);
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Fill/Update report conclusion
// @route           PUT /skripsi/skripsi-report/conclusion/:id
// @access          DOSEN
const updateSkripsiConclusionById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "skripsi_report_conclusion")) {
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
    const skripsi = await skripsiService.updateSkripsiConclusionById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get report conclusion
// @route           GET /skripsi/skripsi-report/conclusion/:id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getSkripsiConclusionById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_report_conclusion")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const skripsi = await skripsiService.getSkripsiConclusionById(id);
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Upload/Update dokumen revisi skripsi
// @route           PUT /skripsi/skripsi-revision-document/:id
// @access          MAHASISWA
const updateSkripsiRevisionDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "skripsi_revision_document")) {
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
    const skripsi = await skripsiService.updateSkripsiRevisionDocumentById(
      id,
      userId,
      payload
    );
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Get dokumen revisi skripsi
// @route           GET /skripsi/skripsi-revision-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
const getSkripsiRevisionDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "skripsi_revision_document")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const skripsi = await skripsiService.getSkripsiRevisionDocumentById(id);
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Delete/Update dokumen revisi skripsi
// @route           PUT /skripsi/skripsi-revision-document/delete/:id
// @access          MAHASISWA
const deleteSkripsiRevisionDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "skripsi_revision_document")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    await skripsiService.deleteSkripsiRevisionDocumentById(id, userId);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Approve dokumen revisi skripsi
// @route           PUT /skripsi/skripsi-revision-document/approve/:id
// @access          DOSEN
const approveSkripsiRevisionDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "is_skripsi_revision_approve")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const skripsi = await skripsiService.approveSkripsiRevisionDocumentById(
      id,
      userId
    );
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//===================================================================
// @description     Reject dokumen revisi skripsi
// @route           PUT /skripsi/skripsi-revision-document/reject/:id
// @access          DOSEN
const rejectSkripsiRevisionDocumentById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "is_skripsi_revision_approve")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  try {
    const id = req.params.id;
    const userId = req.user.user.id;
    const skripsi = await skripsiService.rejectSkripsiRevisionDocumentById(
      id,
      userId
    );
    res.send({ status: "OK", data: skripsi });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  updateSkripsiDocumentById,
  getSkripsiDocumentById,
  deleteSkripsiDocumentById,
  approveSkripsiDocumentById,
  rejectSkripsiDocumentById,

  updateSkripsiPaymentById,
  getSkripsiPaymentById,
  deleteSkripsiPaymentById,

  updateSkripsiPlagiarismById,
  getSkripsiPlagiarismById,
  deleteSkripsiPlagiarismById,

  getAllSkripsiSchedule,
  updateSkripsiScheduleById,
  getSkripsiScheduleById,

  openAccessSkripsiReportById,
  updateSkripsiAssessmentById,
  getAllSkripsiAssessmentById,
  updateSkripsiChangesById,
  getAllSkripsiChangesById,
  getSkripsiReportById,
  signSkripsiReportById,
  updateSkripsiConclusionById,
  getSkripsiConclusionById,

  updateSkripsiRevisionDocumentById,
  getSkripsiRevisionDocumentById,
  deleteSkripsiRevisionDocumentById,
  approveSkripsiRevisionDocumentById,
  rejectSkripsiRevisionDocumentById,
};
