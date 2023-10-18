//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// // get semua submission
// const findAllSubmission = async () => {
//   const submission = await prisma.submission.findMany();
//   return submission;
// };

// // hapus 1 submission
// const deleteSubmission = async (id) => {
//   await prisma.submission.delete({
//     where: {
//       id,
//     },
//   });
// };

// // hapus All submission
// const deleteAllSubmission = async () => {
//   await prisma.submission.deleteMany({});
// };

//===================================================================
// @description     Mengajukan judul
// @route           POST /submission
// @access          MAHASISWA
const insertSubmission = async (classroom_id, payload) => {
  const {
      file_name,
      file_size,
      is_consultation,
      proposed_advisor_id,
      proposed_co_advisor1_id,
      proposed_co_advisor2_id,
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
// @description     Melihat pengajuan judul
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
// @description     Memperbarui pengajuan judul
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
// @description     Mengganti advisor, co-advisor
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
// @description     Approve pengajuan judul
// @route           PUT /submission/approve/:id
// @access          DOSEN_MK
const approveSubmissionById = async (id) => {
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

// // reject submission
// const rejectSubmission = async (id) => {
//   const submission = await prisma.submission.update({
//     where: {
//       id,
//     },
//     data: {
//       is_approve: "Rejected"
//     },
//   });
//   return submission;
// };

module.exports = {
  // findAllSubmission,
  // deleteSubmission,
  // deleteAllSubmission,
  insertSubmission,
  findSubmissionById,
  updateSubmission,
  updateAdvisorAndCoAdvisor,
  approveSubmissionById,
  // rejectSubmission,
  // updateGroupTitle,
}