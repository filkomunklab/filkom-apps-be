const { certificate } = require("../../../database");
const certificateService = require("./certificate.service");

const viewAllStudentCertificate = async (req, res) => {
  const { nik } = req.params;
  try {
    const certificate = await certificateService.findAllStudentCertificate(nik);
    res.status(201).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const viewStudentCertificate = async (req, res) => {
  const { certificateId } = req.params;
  try {
    const certificate = await certificateService.viewOneStudentCertificate(
      certificateId
    );
    console.log("hello world", certificate);
    res.status(201).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const viewCertificateCategory = async (req, res) => {
  const { category } = req.body;
  const { nik } = req.params;
  try {
    const certificate = await certificateService.viewCertifiacateByCategory(
      category,
      nik
    );
    res.status(201).send({ status: "OK", data: certificate });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const uploadCertificate = async (req, res) => {
  const payload = req.body;
  const { nim } = req.params;
  console.log(payload);
  try {
    await certificateService.uploadCertificate(payload, nim);
    res.status(201).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const studentCertificateHistory = async (req, res) => {
  const { nim } = req.params;
  try {
    const certificate = await certificateService.studentHistoryCertificateView(
      nim
    );
    res.status(201).send({ status: "OK", data: certificate });
  } catch (error) {
    console.log("eror: ", error);
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const advisorCertificateHistory = async (req, res) => {
  const { nik } = req.params;
  try {
    const certificate = await certificateService.advisorHistoryCertificateView(
      nik
    );
    res.status(201).send({ status: "OK", data: certificate });
  } catch (error) {
    console.log(error);
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
  advisorCertificateHistory,
};
