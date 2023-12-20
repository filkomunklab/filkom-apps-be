const guidanceClassRepository = require("./guidanceClass.repository");
const {
  CreateGuidanceClassSchema,
  AddStudentSchema,
  DeleteStudentSchema,
} = require("./guidanceClass.schema");

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

const getAllUnassignedStudent = async () => {
  return await guidanceClassRepository.getAllUnassignedStudent();
};

module.exports = {
  createGuidanceClass,
  addStudentToGuidanceClass,
  deleteStudentFromGuidanceClass,
  getAllUnassignedStudent,
};
