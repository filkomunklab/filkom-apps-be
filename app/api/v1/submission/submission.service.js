//Layer untuk handle business logic

const submissionRepository = require("./submission.repository");

const getAllSubmission = async () => {
  const submission = await submissionRepository.findAllSubmission();
  return submission;
};

const deleteSubmissionById = async (id) => {
  await getSubmissionById(id);
  await submissionRepository.deleteSubmission(id);
};

const deleteAllSubmission = async () => {
  await submissionRepository.deleteAllSubmission();
};

const createSubmission = async (payload) => {
  const submission = await submissionRepository.insertSubmission(payload);
  return submission;
};

const getSubmissionById = async (id) => {
  const submission = await submissionRepository.findSubmissionById(id);
  if (!submission) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return submission;
};

const updateSubmissionById = async (id, payload) => {
  await getSubmissionById(id);

  const submission = await submissionRepository.updateSubmission(id, payload);
  return submission;
};

const updateAdvisorAndOrCoAdvisorById = async (id, payload) => {
  await getSubmissionById(id);

  const submission = await submissionRepository.updateAdvisorAndOrCoAdvisor(id, payload);
  return submission;
};

const approveSubmissionById = async (id) => {
  await getSubmissionById(id);

  const submission = await submissionRepository.approveSubmission(id);
  return submission;
};

const rejectSubmissionById = async (id) => {
  await getSubmissionById(id);

  const submission = await submissionRepository.rejectSubmission(id);
  return submission;
};

const updateGroupTitleById = async (id, payload) => {
  await getSubmissionById(id);

  const submission = await submissionRepository.updateGroupTitle(id, payload);
  return submission;
};

module.exports = {
  getAllSubmission,
  deleteSubmissionById,
  deleteAllSubmission,
  createSubmission,
  getSubmissionById,
  updateSubmissionById,
  updateAdvisorAndOrCoAdvisorById,
  approveSubmissionById,
  rejectSubmissionById,
  updateGroupTitleById,
}