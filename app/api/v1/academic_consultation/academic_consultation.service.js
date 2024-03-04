const academicConsRepository = require("./academic_consultation.repository");
const moment = require("moment-timezone");

const createConsultation = async (payload) => {
  try {
    const consultation = await academicConsRepository.insertConsultation(
      payload
    );

    return {
      ...consultation,
      createdAt: `${moment(consultation.createdAt).tz("Asia/Makassar")}`,
      updatedAt: `${moment(consultation.updatedAt).tz("Asia/Makassar")}`,
    };
  } catch (error) {
    throw error.message;
  }
};

const getConsultationByStudentId = async (studentId) => {
  try {
    let consultation =
      await academicConsRepository.selectConsultationByStudentId(studentId);

    consultation = consultation
      ? consultation.map((value) => {
          return {
            ...value,
            createdAt: `${moment(value.createdAt).tz("Asia/Makassar")}`,
            updatedAt: `${moment(value.updatedAt).tz("Asia/Makassar")}`,
          };
        })
      : [];

    return consultation;
  } catch (error) {
    throw error.message;
  }
};

const getConsultationByEmployeeId = async (employeeId) => {
  try {
    let consultation =
      await academicConsRepository.selectConsultationByEmployeeId(employeeId);

    consultation = consultation
      ? consultation.map((value) => {
          return {
            ...value,
            createdAt: `${moment(value.createdAt).tz("Asia/Makassar")}`,
            updatedAt: `${moment(value.updatedAt).tz("Asia/Makassar")}`,
          };
        })
      : [];
    return consultation;
  } catch (error) {
    throw error.message;
  }
};

const getConsultationById = async (id) => {
  try {
    const consultation = await academicConsRepository.selectConsultationById(
      id
    );

    return consultation
      ? {
          ...consultation,
          createdAt: `${moment(consultation.createdAt).tz("Asia/Makassar")}`,
          updatedAt: `${moment(consultation.updatedAt).tz("Asia/Makassar")}`,
        }
      : {};
  } catch (error) {
    throw error.message;
  }
};

const updateConsultationStatusCompleteById = async (id) => {
  const NOW = moment.tz("Asia/Makassar");
  try {
    let consultation =
      await academicConsRepository.updateStatusConsultationById(
        id,
        "Complete",
        NOW
      );

    return {
      ...consultation,
      createdAt: `${moment(consultation.createdAt).tz("Asia/Makassar")}`,
      updatedAt: `${moment(consultation.updatedAt).tz("Asia/Makassar")}`,
    };
  } catch (error) {
    throw error.message;
  }
};

module.exports = {
  createConsultation,
  getConsultationByStudentId,
  getConsultationByEmployeeId,
  getConsultationById,
  updateConsultationStatusCompleteById,
};
