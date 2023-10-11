//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

const findAllSubmission = async () => {
  const submission = await prisma.submission.findMany();
  return submission;
};

const deleteSubmission = async (id) => {
  await prisma.submission.delete({
    where: {
      id,
    },
  });
};

const deleteAllSubmission = async () => {
  await prisma.submission.deleteMany({});
};

// ------

const insertSubmission = async (payload) => {
  const {
      // title - di model group
      file_name,
      file_size,
      is_consultation,
      proposed_advisor,
      proposed_co_advisor1,
      proposed_co_advisor2,
      classroom_id,
  } = payload;
  const submission = await prisma.submission.create({
    data: {
      file_name,
      file_size,
      is_consultation,
      proposed_advisor,
      proposed_co_advisor1,
      proposed_co_advisor2,
      classroom_id,
    },
  });
  return submission;
};

const findSubmissionById = async (id) => {
  const submission = await prisma.submission.findUnique({
    where: {
      id,
    },
  });
  return submission;
};

const updateSubmission = async (id, payload) => {
  const {
    // title - di model group
    file_name,
    file_size,
    is_consultation,
    proposed_advisor,
    proposed_co_advisor1,
    proposed_co_advisor2,
  } = payload;
  const submission = await prisma.submission.update({
    where: {
      id,
    },
    data: {
      file_name,
      file_size,
      is_consultation,
      proposed_advisor,
      proposed_co_advisor1,
      proposed_co_advisor2,
    },
  });
  return submission;
};

const updateAdvisorAndOrCoAdvisor = async (id, payload) => {
  const {
    proposed_advisor,
    proposed_co_advisor1,
    proposed_co_advisor2,
  } = payload;
  const submission = await prisma.submission.update({
    where: {
      id,
    },
    data: {
      proposed_advisor,
      proposed_co_advisor1,
      proposed_co_advisor2,
    },
  });
  return submission;
};

const approveSubmission = async (id) => {
  const submission = await prisma.submission.update({
    where: {
      id,
    },
    data: {
      is_approve: "Approve"
    },
  });
  return submission;
};

const rejectSubmission = async (id) => {
  const submission = await prisma.submission.update({
    where: {
      id,
    },
    data: {
      is_approve: "Rejected"
    },
  });
  return submission;
};

module.exports = {
  findAllSubmission,
  deleteSubmission,
  deleteAllSubmission,

  insertSubmission,
  findSubmissionById,
  updateSubmission,
  updateAdvisorAndOrCoAdvisor,
  approveSubmission,
  rejectSubmission,
}