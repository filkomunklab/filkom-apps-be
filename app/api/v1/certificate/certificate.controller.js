const certificateService = require("./certificate.service");
const { policyFor } = require("../policy");

//============================DospemAccess===========================//

//Waiting List
const advisorCertificateWaitingList = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "certificate_waiting_list")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const payload = req.params;
  try {
    const certificate =
      await certificateService.advisorWaitingListCertificateView(payload);
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//waiting list By Major
const getWaitingListbyMajor = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "certificate_list_major")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const { major } = req.body;
  const payload = req.params;
  try {
    const certificate = await certificateService.waitingListbyMajor(
      major,
      payload
    );
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//waiting list by arrival year
const getWaitingListByArrYear = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "certificate_list_year")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const { arrivalYear } = req.body;
  const payload = req.params;
  try {
    const certificate = await certificateService.viewWaitingListByArrYear(
      arrivalYear,
      payload
    );
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//find by category
const viewCertificateCategory = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "certificate_category")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const { category } = req.body;
  const payload = req.params;
  try {
    const certificate = await certificateService.viewCertifiacateByCategory(
      category,
      payload
    );
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//History Approval
const viewAllApprovalStudentCertificate = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "certificate_history_approval")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const payload = req.params;
  try {
    const certificate =
      await certificateService.findAllApprovalStudentCertificate(payload);
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//Approval student certificate
const putApprovalCertificate = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "certificate_approval")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const { certificateId } = req.params;
  const payload = req.body;
  try {
    const certificate = await certificateService.approvalCertificate(
      certificateId,
      payload
    );
    res.status(201).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//view certificate student
const getAllCertificateStudent = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "certificate_all_student")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  try {
    const { studentId } = req.params;
    const certificate = await certificateService.findAllCertificateStudent(
      studentId
    );
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//============================StudentAccess=========================//

//Student Add Certificate
const uploadCertificate = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("create", "upload_certificate")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const payload = req.body;
  const { studentId } = req.params;
  try {
    const certificate = await certificateService.uploadCertificate(
      payload,
      studentId
    );
    res.status(201).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//Student Current Certificate
const getStudentCurrentCertificate = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "current_certificate")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const { id } = req.params;
  try {
    const certificate = await certificateService.viewCurrentStudentCertificate(
      id
    );
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    console.log("eror: ", error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//Student History Certificate
const studentCertificateHistory = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "student_certificate_history")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const { studentId } = req.params;
  try {
    const certificate = await certificateService.studentHistoryCertificateView(
      studentId
    );
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    console.log("eror: ", error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//============================GeneralAccess=========================//

//Detail Certificate
const viewStudentCertificate = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("read", "certificate_detail")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const { certificateId } = req.params;
  try {
    const certificate = await certificateService.viewOneStudentCertificate(
      certificateId
    );
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  uploadCertificate,
  viewAllApprovalStudentCertificate,
  viewStudentCertificate,
  viewCertificateCategory,
  studentCertificateHistory,
  advisorCertificateWaitingList,
  getStudentCurrentCertificate,
  putApprovalCertificate,
  getWaitingListbyMajor,
  getWaitingListByArrYear,
  getAllCertificateStudent,
};
