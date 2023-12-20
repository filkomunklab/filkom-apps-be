const preRegisRepository = require("./preRegis.repository");
const {
  CreatePreRegistSchema,
  LatestPreRegistSchema,
  SubmitPreRegistSchema,
  ApprovalSchema,
} = require("./preRegis.schema");

const viewPreRegisMenu = async (major, year) => {
  try {
    const preRegis = await preRegisRepository.findSubjectForPreRegis(
      major,
      year
    );
    return preRegis;
  } catch (error) {
    return error;
  }
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
  viewPreRegisMenu,
  checkPreRegistAccess,
  createPreRegist,
  submitPreRegist,
  submitApproval,
};
