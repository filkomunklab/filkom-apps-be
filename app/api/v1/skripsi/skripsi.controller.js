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

module.exports = {
  updateSkripsiDocumentById,
  getSkripsiDocumentById,
  deleteSkripsiDocumentById,
  approveSkripsiDocumentById,
  rejectSkripsiDocumentById,
};
