const preRegisRepository = require("./preRegis.repository");
const {
  CreatePreRegistSchema,
  LatestPreRegistSchema,
  SubmitPreRegistSchema,
  ApprovalSchema,
  GetCurriculumSchema,
  GetAllPreRegisSchema,
  GetAllPreRegisListForStudentSchema,
} = require("./preRegis.schema");

const viewPreRegisMenu = async (payload) => {
  await GetCurriculumSchema.validate(payload);
  return await preRegisRepository.findSubjectForPreRegis(payload);
};

const getAllPreRegis = async (payload) => {
  await GetAllPreRegisSchema.validate(payload);
  return await preRegisRepository.getAllPreRegis(payload);
};

const checkPreRegistAccess = async (payload) => {
  await LatestPreRegistSchema.validate(payload);
  return await preRegisRepository.checkPreRegistAccess(payload);
};

const createPreRegist = async (payload) => {
  await CreatePreRegistSchema.validate(payload);
  return await preRegisRepository.createPreRegist(payload);
};

const submitPreRegist = async (payload) => {
  await SubmitPreRegistSchema.validate(payload);
  return await preRegisRepository.submitPreRegist(payload);
};

const submitApproval = async (payload) => {
  await ApprovalSchema.validate(payload);
  return await preRegisRepository.submitApproval(payload);
};

const getPreRegistListForTeacher = async (payload) => {
  const data = await preRegisRepository.getPreRegistListForTeacher(payload);
  data.map((item) => {
    const totalCredits = item.ListOfRequest.reduce((acc, cur) => {
      return acc + cur.subject.credits;
    }, 0);
    item.totalCredits = totalCredits;
    delete item.ListOfRequest;
  });
  return data;
};

const getPreRegistDetails = (payload) => {
  return preRegisRepository.getPreRegistDetails(payload);
};

const getHistoryForStudent = async (payload) => {
  return preRegisRepository.getHistoryForStudent(payload);
};

const getHistoryForAdvisor = async (payload) => {
  return preRegisRepository.getHistoryForAdvisor(payload);
};

const getCurrentPreRegist = (payload) => {
  return preRegisRepository.getCurrentPreRegist(payload);
};

const getCurrentForStudent = (payload) => {
  return preRegisRepository.getCurrentForStudent(payload);
};

const getAllSubmitedPreRegist = (payload, major) => {
  return preRegisRepository.getAllSubmitedPreRegist(payload, major);
};

const getAllSubject = async (payload) => {
  const data = await preRegisRepository.getAllSubject(payload);
  data.map((item) => {
    item.totalRequest = item.totalRequest.toString();
  });
  return data;
};

const patchManualClosedPreRegist = async (id) => {
  return preRegisRepository.manualClosePreRegist(id);
};

module.exports = {
  getPreRegistListForTeacher,
  getAllSubmitedPreRegist,
  getHistoryForStudent,
  getHistoryForAdvisor,
  getCurrentForStudent,
  checkPreRegistAccess,
  getPreRegistDetails,
  getCurrentPreRegist,
  viewPreRegisMenu,
  createPreRegist,
  submitPreRegist,
  submitApproval,
  getAllPreRegis,
  getAllSubject,
  patchManualClosedPreRegist,
};
