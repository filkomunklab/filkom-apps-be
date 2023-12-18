const { certificate } = require("../../../database");
const certificateService = require("./certificate.service");

//============================DospemAccess===========================//
//Waiting List
const advisorCertificateWaitingList = async (req, res) => {
  const { nik } = req.params;
  try {
    const certificate =
      await certificateService.advisorWaitingListCertificateView(nik);
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//find by category
const viewCertificateCategory = async (req, res) => {
  const { category } = req.body;
  const { nik } = req.params;
  try {
    const certificate = await certificateService.viewCertifiacateByCategory(
      category,
      nik
    );
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//History Approval
const viewAllStudentCertificate = async (req, res) => {
  const { nik } = req.params;
  try {
    const certificate = await certificateService.findAllStudentCertificate(nik);
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//Approval certificate
const putApprovalCertificate = async (req, res) => {
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

const getWaitingListbyMajor = async (req, res) => {
  const { major } = req.params;
  try {
    const certificate = await certificateService.waitingListbyMajor(major);
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getWaitingListbyArrivalYear = async (req, res) => {
  const { year } = req.params;
  try {
    const certificate = await certificateService.waitingListbyArrivalYear(year);
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//============================GeneralAccess=========================//
//GeneralAccess
const viewStudentCertificate = async (req, res) => {
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

//============================StudentAccess=========================//
//studentAccess
const uploadCertificate = async (req, res) => {
  const payload = req.body;
  const { nim } = req.params;
  try {
    const certificate = await certificateService.uploadCertificate(
      payload,
      nim
    );
    res.status(201).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//StudentAccess
const getStudentCurrentCertificate = async (req, res) => {
  const { nim } = req.params;
  try {
    const certificate = await certificateService.viewCurrentStudentCertificate(
      nim
    );
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    console.log("eror: ", error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//StudentAccess
const studentCertificateHistory = async (req, res) => {
  const { nim } = req.params;
  try {
    const certificate = await certificateService.studentHistoryCertificateView(
      nim
    );
    res.status(200).send({ status: "OK", data: certificate });
  } catch (error) {
    console.log("eror: ", error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  uploadCertificate,
  viewAllStudentCertificate,
  viewStudentCertificate,
  viewCertificateCategory,
  studentCertificateHistory,
  advisorCertificateWaitingList,
  getStudentCurrentCertificate,
  putApprovalCertificate,
  getWaitingListbyMajor,
  getWaitingListbyArrivalYear,
};
