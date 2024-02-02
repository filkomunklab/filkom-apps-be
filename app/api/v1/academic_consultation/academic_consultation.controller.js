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

const getConsultationByNim = async (req, res) => {
  const policy = policyFor(req.user);
  const Student = { nim: req.params.nim };
  if (!policy.can("get", subject("AcademicConsultationByStudent", Student))) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const nim = req.params.nim;
  try {
    const consultation = await academicConsService.getConsultationByNim(nim);
    res.status(200).send({ status: "OK", data: consultation });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getConsultationByNik = async (req, res) => {
  const policy = policyFor(req.user);
  const Employee = { nik: req.params.nik };
  if (!policy.can("get", "AcademicConsultationByEmployee")) {
    return res.status(401).send({
      status: "FAILED",
      data: { error: "You don't have permission to perform this action" },
    });
  }

  const nik = req.params.nik;
  try {
    const consultation = await academicConsService.getConsultationByNik(nik);
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
  getConsultationByNim,
  getConsultationByNik,
  getConsultationById,
  updateConsultationStatusCompleteById,
};
