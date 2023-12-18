const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { insertAdmin } = require("../admin/admin.repository");
const certificateRepository = require("./certificate.repository");
const { storage } = require("../../../config/firebase");

//===================================DospemAccess=======================//
//Waiting List
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

//Find certificate by category
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

//show list Approved/Rejected certificate
const findAllStudentCertificate = async (nik) => {
  try {
    const certificate = await certificateRepository.findCertificate(nik);
    return certificate;
  } catch (error) {
    console.log("Ini error: ", error);
    return error;
  }
};

//Approval Certificate
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

//Waiting List by major
const waitingListbyMajor = async (major) => {
  try {
    const certificate = await certificateRepository.findWaitingListbyMajor(
      major
    );
    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Waiting List by Arrival Year
const waitingListbyArrivalYear = async (year) => {
  try {
    const certificate =
      await certificateRepository.findWaitingListbyArrivalYear(year);
    return certificate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//==============================GeneralAccess=========================//
//Detail Certificate
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
  waitingListbyArrivalYear,
  waitingListbyMajor,
};
