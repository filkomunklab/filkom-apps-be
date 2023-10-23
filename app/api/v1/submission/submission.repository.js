//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

//===================================================================
// @description     Get submission
// @route           POST /submission
// @access          MAHASISWA
const insertSubmission = async (payload) => {
  const {
    file_name,
    file_size,
    is_consultation,
    proposed_advisor_id,
    proposed_co_advisor1_id,
    proposed_co_advisor2_id,
    classroom_id,
  } = payload;
  const submission = await prisma.submission.create({
    data: {
      file_name,
      upload_date: new Date(),
      file_size,
      is_consultation,
      proposed_advisor_id,
      proposed_co_advisor1_id: proposed_co_advisor1_id || null,
      proposed_co_advisor2_id: proposed_co_advisor2_id || null,
      classroom_id,
    },
  });

  return submission;
};

//===================================================================
// @description     Get submission by id
// @route           GET /submission/:id
// @access          MAHASISWA
const findSubmissionById = async (id) => {
  const submission = await prisma.submission.findUnique({
    where: {
      id,
    },
  });
  return submission;
};

//===================================================================
// @description     Update submission
// @route           PUT /submission/:id
// @access          MAHASISWA
const updateSubmission = async (id, payload) => {
  const {
    file_name,
    file_size,
    is_consultation,
    proposed_advisor_id,
    proposed_co_advisor1_id,
    proposed_co_advisor2_id,
  } = payload;
  const submission = await prisma.submission.update({
    where: {
      id,
    },
    data: {
      file_name,
      file_size,
      upload_date: new Date(),
      is_consultation,
      proposed_advisor_id,
      proposed_co_advisor1_id: proposed_co_advisor1_id || null,
      proposed_co_advisor2_id: proposed_co_advisor2_id || null,
      updated_at: new Date(),
    },
  });

  return submission;
};

//===================================================================
// @description     Change advisor, co-advisor
// @route           PUT /submission/advisor-and-co-advisor/:id
// @access          DOSEN_MK
const updateAdvisorAndCoAdvisor = async (id, payload) => {
  const {
    proposed_advisor_id,
    proposed_co_advisor1_id,
    proposed_co_advisor2_id,
  } = payload;
  const submission = await prisma.submission.update({
    where: {
      id,
    },
    data: {
      proposed_advisor_id,
      proposed_co_advisor1_id: proposed_co_advisor1_id || null,
      proposed_co_advisor2_id: proposed_co_advisor2_id || null,
    },
  });
  return submission;
};

//===================================================================
// @description     Approve submission
// @route           PUT /submission/approve/:id
// @access          DOSEN_MK
const approveSubmissionById = async (id) => {
  const submission = await prisma.submission.update({
    where: {
      id,
    },
    data: {
      is_approve: "Approve",
    },
  });

  return submission;
};

//===================================================================
// @description     Reject submission
// @route           PUT /submission/reject/:id
// @access          DOSEN_MK
const rejectSubmission = async (id) => {
  const submission = await prisma.submission.update({
    where: {
      id,
    },
    data: {
      is_approve: "Rejected",
    },
  });
  return submission;
};

module.exports = {
  insertSubmission,
  findSubmissionById,
  updateSubmission,
  updateAdvisorAndCoAdvisor,
  approveSubmissionById,
  rejectSubmission,
};
