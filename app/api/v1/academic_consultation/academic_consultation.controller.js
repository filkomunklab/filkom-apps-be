const academicConsService = require("./academic_consultation.service");
const { policyFor } = require("../policy");
const { subject } = require("@casl/ability");

const createConsultation = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("create", "AcademicConsultation")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }
  const payload = req.body;
  try {
    const consultation = await academicConsService.createConsultation(payload);
    res.status(201).send({ status: "OK", data: consultation });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getConsultationByStudentId = async (req, res) => {
  const policy = policyFor(req.user);
  const Student = { studentId: req.params.studentId };
  if (!policy.can("get", subject("AcademicConsultationByStudent", Student))) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const studentId = req.params.studentId;
  try {
    const consultation = await academicConsService.getConsultationByStudentId(
      studentId
    );
    res.status(200).send({ status: "OK", data: consultation });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getConsultationByEmployeeId = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("get", "AcademicConsultationByEmployee")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const employeeId = req.params.employeeId;
  try {
    const consultation = await academicConsService.getConsultationByEmployeeId(
      employeeId
    );
    res.status(200).send({ status: "OK", data: consultation });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getConsultationById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("get", "AcademicConsultationDetail")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const id = req.params.id;
  try {
    const consultation = await academicConsService.getConsultationById(id);
    res.status(200).send({ status: "OK", data: consultation });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateConsultationStatusCompleteById = async (req, res) => {
  const policy = policyFor(req.user);
  if (!policy.can("update", "AcademicConsultationStatusComplete")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const id = req.params.id;
  try {
    const consultation =
      await academicConsService.updateConsultationStatusCompleteById(id);
    res.status(200).send({ status: "OK", data: consultation });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createConsultation,
  getConsultationByStudentId,
  getConsultationByEmployeeId,
  getConsultationById,
  updateConsultationStatusCompleteById,
};
