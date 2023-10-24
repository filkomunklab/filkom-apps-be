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

const viewOneStudentCertificate = async (certificateId) => {
  try {
    const certificate = await certificateRepository.findOneCertificate(
      certificateId
    );
    return certificate;
  } catch (error) {
    return error;
  }
};

const viewCertifiacateByCategory = async (category, nik) => {
  try {
    const certificate = await certificateRepository.findCertificateByCategory(
      category,
      nik
    );
    return certificate;
  } catch (error) {
    return error;
  }
};

const uploadCertificate = async (payload, nim) => {
  try {
    await certificateRepository.insertCertificate(
      payload,
      nim,
      certificateFile
    );
  } catch (error) {
    return error;
  }
};

module.exports = {
  uploadCertificate,
  findAllStudentCertificate,
  viewOneStudentCertificate,
  viewCertifiacateByCategory,
};
