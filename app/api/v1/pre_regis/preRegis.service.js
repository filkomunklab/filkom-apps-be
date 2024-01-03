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

const getPreRegistListForTeacher = (payload) => {
  return preRegisRepository.getPreRegistListForTeacher(payload);
};

const getPreRegistListForStudent = async (payload) => {
  await GetAllPreRegisListForStudentSchema.validate(payload);
  return preRegisRepository.getPreRegistListForStudent(payload);
};

const getPreRegistDetails = (payload) => {
  return preRegisRepository.getPreRegistDetails(payload);
};

module.exports = {
  getPreRegistListForTeacher,
  getPreRegistListForStudent,
  checkPreRegistAccess,
  getPreRegistDetails,
  viewPreRegisMenu,
  createPreRegist,
  submitPreRegist,
  submitApproval,
  getAllPreRegis,
};
