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

const uploadCertificate = async (req, res) => {
  const payload = req.body;
  const { nim } = req.params;
  const { filename } = req.file;
  const path = `${req.protocol}://${req.get("host")}/certificate/${filename}`;
  try {
    await certificateService.uploadCertificate(payload, nim, {
      path,
      filename,
    });
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
  viewStudentCertificate,
};
