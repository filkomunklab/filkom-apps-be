const { insertAdmin } = require("../admin/admin.repository");
const certificateRepository = require("./certificate.repository");

const findAllStudentCertificate = async (nik) => {
  try {
    const certificate = await certificateRepository.findCertificate(nik);
    return certificate;
  } catch (error) {
    return error;
  }
};

const uploadCertificate = async (payload, nim) => {
  try {
    const certificate = await certificateRepository.insertCertificate(
      payload,
      nim
    );
    console.log(certificate);
  } catch (error) {
    return error;
  }
};

module.exports = {
  uploadCertificate,
  findAllStudentCertificate,
};
