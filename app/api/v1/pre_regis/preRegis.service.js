const preRegisRepository = require("./preRegis.repository");
const {
  CreatePreRegistSchema,
  LatestPreRegistSchema,
  SubmitPreRegistSchema,
  ApprovalSchema,
  GetCurriculumSchema,
  GetAllPreRegisSchema,
} = require("./preRegis.schema");

const viewPreRegisMenu = async (payload) => {
  await GetCurriculumSchema.validate(payload);
  const response = await preRegisRepository.findSubjectForPreRegis(payload);
  const subjectsBySemester = response.Subjects.reduce((acc, subject) => {
    const semester = subject.semester.toString(); // Convert to string for consistent keys
    if (!acc[semester]) {
      acc[semester] = [];
    }
    acc[semester].push(subject);
    return acc;
  }, {});
  response.groupedSubjects = subjectsBySemester;
  return response;
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

module.exports = {
  checkPreRegistAccess,
  viewPreRegisMenu,
  createPreRegist,
  submitPreRegist,
  submitApproval,
  getAllPreRegis,
};
