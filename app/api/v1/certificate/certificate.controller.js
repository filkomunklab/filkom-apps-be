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

const uploadCertificate = async (req, res) => {
  const payload = req.body;
  const nim = req.params;
  console.log("this payload", payload);
  try {
    await certificateService.uploadCertificate(payload, nim);
    res.status(201).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  uploadCertificate,
  viewAllStudentCertificate,
};
