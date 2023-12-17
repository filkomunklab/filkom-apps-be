const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { insertAdmin } = require("../admin/admin.repository");
const certificateRepository = require("./certificate.repository");
const { storage } = require("../../../config/firebase");

//===================================DospemAccess=======================//
//DospemAccess
const advisorWaitingListCertificateView = async (nik) => {
  try {
    const certificate =
      await certificateRepository.findAdvisorCertificateWaitingList(nik);
    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//DospemAccess
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

//DospemAccess
const findAllStudentCertificate = async (nik) => {
  try {
    const certificate = await certificateRepository.findCertificate(nik);
    return certificate;
  } catch (error) {
    console.log("Ini error: ", error);
    return error;
  }
};

//dospemAccess
const approvalCertificate = async (certificateId, payload) => {
  try {
    return certificateRepository.approvalCertificateStudent(
      certificateId,
      payload
    );
  } catch (error) {
    throw error;
  }
};

//==============================GeneralAccess=========================//
//GeneralAccess
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

//===============================StudentAccess========================//
//StudentAccess
const uploadCertificate = async (payload, nim) => {
  const storageRef = ref(
    storage,
    `certificate/${nim}/${payload.certificateFile.filename}`
  );
  const metadata = { contentType: "application/pdf" };
  try {
    const binaryString = atob(payload.certificateFile.buffer);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    await uploadBytes(storageRef, byteArray, metadata);
    const path = await getDownloadURL(storageRef);
    return await certificateRepository.insertCertificate(payload, nim, path);
  } catch (error) {
    throw error;
  }
};

//StudentAccess
const viewCurrentStudentCertificate = async (nim) => {
  try {
    const certificate =
      await certificateRepository.findCurrentCertificateStudent(nim);
    return certificate;
  } catch (error) {
    return error;
  }
};

//StudentAccess
const studentHistoryCertificateView = async (nim) => {
  try {
    const certificate =
      await certificateRepository.findStudentCertificateHistory(nim);
    return certificate;
  } catch (error) {
    return error;
  }
};

module.exports = {
  uploadCertificate,
  findAllStudentCertificate,
  viewOneStudentCertificate,
  viewCertifiacateByCategory,
  studentHistoryCertificateView,
  advisorWaitingListCertificateView,
  viewCurrentStudentCertificate,
  approvalCertificate,
};
