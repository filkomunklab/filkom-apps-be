const guidanceClassRepository = require("./guidanceClass.repository");
const {
  CreateGuidanceClassSchema,
  AddStudentSchema,
  DeleteStudentSchema,
  GetUnassignedSchema,
  GetGuidanceClassDetailSchema,
} = require("./guidanceClass.schema");

const getAllClass = async () => {
  return await guidanceClassRepository.getAllClass();
};

const getGuidanceClassDetail = async (payload) => {
  await GetGuidanceClassDetailSchema.validate(payload);
  return await guidanceClassRepository.getGuidanceClassDetail(payload);
};

const createGuidanceClass = async (payload, teacherId) => {
  const validationPayload = { ...payload, teacherId };
  await CreateGuidanceClassSchema.validate(validationPayload);
  return await guidanceClassRepository.createGuidanceClass(payload, teacherId);
};

const addStudentToGuidanceClass = async (payload, guidanceClassId) => {
  const validationPayload = { ...payload, guidanceClassId };
  await AddStudentSchema.validate(validationPayload);
  return await guidanceClassRepository.addStudentToGuidanceClass(
    payload,
    guidanceClassId
  );
};

const deleteStudentFromGuidanceClass = async (payload) => {
  await DeleteStudentSchema.validate(payload);
  return await guidanceClassRepository.deleteStudentFromGuidanceClass(payload);
};

const getAllUnassignedStudent = async (payload) => {
  await GetUnassignedSchema.validate(payload);
  return await guidanceClassRepository.getAllUnassignedStudent(payload);
};

const getAllUnassignetTeacher = async () => {
  return await guidanceClassRepository.getAllUnassignetTeacher();
};

module.exports = {
  deleteStudentFromGuidanceClass,
  addStudentToGuidanceClass,
  getAllUnassignedStudent,
  getAllUnassignetTeacher,
  getGuidanceClassDetail,
  createGuidanceClass,
  getAllClass,
};
