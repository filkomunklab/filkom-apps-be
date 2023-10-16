//Layer untuk handle business logic

const submissionRepository = require("./submission.repository");

// const getAllSubmission = async () => {
//   const submission = await submissionRepository.findAllSubmission();
//   return submission;
// };

// const deleteSubmissionById = async (id) => {
//   await getSubmissionById(id);
//   await submissionRepository.deleteSubmission(id);
// };

// const deleteAllSubmission = async () => {
//   await submissionRepository.deleteAllSubmission();
// };

const getStudentById = async (student_id) => {
  const thesis_student = await submissionRepository.findStudentById(student_id);
  if (!thesis_student) {
    throw {
      status: 400,
      message: `Student Not found`,
    };
  }
  return thesis_student;
};

const getDosenById = async (id) => {
  const dosen = await submissionRepository.findDosenById(id);
  if (!dosen) {
    throw {
      status: 400,
      message: `Dosen Not found`,
    };
  }
  return dosen;
};

const createSubmission = async (userId, payload) => {
  const { partner1, partner2, partner3,
          proposed_advisor, proposed_co_advisor1, proposed_co_advisor2 } = payload;
  // mengecek student
  if (partner1) {
    await getStudentById(partner1);
  }
  if (partner2) {
    await getStudentById(partner2);
  }
  if (partner3) {
    await getStudentById(partner3);
  }

  // mengecek dosen
  if (proposed_advisor) {
    await getDosenById(proposed_advisor);
  }
  if (proposed_co_advisor1) {
    await getDosenById(proposed_co_advisor1);
  }
  if (proposed_co_advisor2) {
    await getDosenById(proposed_co_advisor2);
  }

  // mengambil proposal_classroom dari user
  const proposalClassroom = await submissionRepository.findStudentById(userId);
  const { proposal_class_id: classroom_id } = proposalClassroom;

  // create submission
  const submission = await submissionRepository.insertSubmission(classroom_id, payload);
  const { id: submission_id } = submission;

  // create group
  const group = await submissionRepository.insertGroup(payload, submission_id);
  const { id: group_id } = group;

  // Memeriksa apakah partner1, partner2, dan partner3 adalah sama satu sama lain (tidak bole null)
  if ((partner1 && partner1 === partner2) || (partner2 && partner2 === partner3) || (partner1 && partner1 === partner3)) {
    throw {
      status: 400,
      message: `Terdapat partner yang sama`,
    };
  }

  // mengelompokkan mahasiswa
  await Promise.all([
                submissionRepository.insertGroupStudent({ group_id, student_id: userId }),
    partner1 && submissionRepository.insertGroupStudent({ group_id, student_id: partner1 }),
    partner2 && submissionRepository.insertGroupStudent({ group_id, student_id: partner2 }),
    partner3 && submissionRepository.insertGroupStudent({ group_id, student_id: partner3 }),
  ]);

  const groupData = {
    id: group.submission_id,
    title: group.title,
    file_name: submission.file_name,
    upload_date: submission.upload_date,
    file_size: submission.file_size,
    is_consultation: submission.is_consultation,
    proposed_advisor: submission.proposed_advisor,
    proposed_co_advisor1: submission.proposed_co_advisor1,
    proposed_co_advisor2: submission.proposed_co_advisor2,
    classroom_id: submission.classroom_id,
  }
  return groupData;
};

// const getSubmissionById = async (id) => {
//   const submission = await submissionRepository.findSubmissionById(id);
//   if (!submission) {
//     throw {
//       status: 400,
//       message: `Not found`,
//     };
//   }
//   return submission;
// };

// const updateSubmissionById = async (id, payload) => {
//   await getSubmissionById(id);

//   const submission = await submissionRepository.updateSubmission(id, payload);
//   return submission;
// };

// const updateAdvisorAndOrCoAdvisorById = async (id, payload) => {
//   await getSubmissionById(id);

//   const submission = await submissionRepository.updateAdvisorAndOrCoAdvisor(id, payload);
//   return submission;
// };

// const approveSubmissionById = async (id) => {
//   await getSubmissionById(id);

//   const submission = await submissionRepository.approveSubmission(id);
//   return submission;
// };

// const rejectSubmissionById = async (id) => {
//   await getSubmissionById(id);

//   const submission = await submissionRepository.rejectSubmission(id);
//   return submission;
// };

// const updateGroupTitleById = async (id, payload) => {
//   await getSubmissionById(id);

//   const submission = await submissionRepository.updateGroupTitle(id, payload);
//   return submission;
// };

module.exports = {
  // getAllSubmission,
  // deleteSubmissionById,
  // deleteAllSubmission,
  createSubmission,
  // getSubmissionById,
  // updateSubmissionById,
  // updateAdvisorAndOrCoAdvisorById,
  // approveSubmissionById,
  // rejectSubmissionById,
  // updateGroupTitleById,
}