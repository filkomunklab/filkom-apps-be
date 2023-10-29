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
};
