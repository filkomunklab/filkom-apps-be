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

// create submission
const insertSubmission = async (classroom_id, payload) => {
  const {
      file_name,
      file_size,
      is_consultation,
      proposed_advisor,
      proposed_co_advisor1,
      proposed_co_advisor2,
  } = payload;
  const submission = await prisma.submission.create({
    data: {
      file_name,
      upload_date: new Date(),
      file_size,
      is_consultation,
      proposed_advisor,
      proposed_co_advisor1: proposed_co_advisor1 || null,
      proposed_co_advisor2: proposed_co_advisor2 || null,
      classroom_id,
    },
  });

  return submission;
};

// get 1 submission
const findSubmissionById = async (id) => {
  const submission = await prisma.submission.findUnique({
    where: {
      id,
    },
  });
  return submission;
};

// // update submission
// const updateSubmission = async (id, payload) => {
//   const {
//     file_name,
//     file_size,
//     is_consultation,
//     proposed_advisor,
//     proposed_co_advisor1,
//     proposed_co_advisor2,
//   } = payload;
//   const submission = await prisma.submission.update({
//     where: {
//       id,
//     },
//     data: {
//       file_name,
//       file_size,
//       is_consultation,
//       proposed_advisor,
//       proposed_co_advisor1,
//       proposed_co_advisor2,
//       updated_at: new Date(),
//     },
//   });

//   await updateGroupTitle(id, payload);
//   return submission;
// };

// // update title
// const updateGroupTitle = async (id, payload) => {
//   const { title } = payload;
//     const group = await prisma.group.update({
//         where: {
//           submission_id: id,
//         },
//         data: {
//             title,
//             updated_at: new Date(),
//         },
//     });
//     return group;
// }

// // update advisor
// const updateAdvisorAndOrCoAdvisor = async (id, payload) => {
//   const {
//     proposed_advisor,
//     proposed_co_advisor1,
//     proposed_co_advisor2,
//   } = payload;
//   const submission = await prisma.submission.update({
//     where: {
//       id,
//     },
//     data: {
//       proposed_advisor,
//       proposed_co_advisor1,
//       proposed_co_advisor2,
//     },
//   });
//   return submission;
// };

// // approve submission
// const approveSubmission = async (id) => {
//   const submission = await prisma.submission.update({
//     where: {
//       id,
//     },
//     data: {
//       is_approve: "Approve"
//     },
//   });

//   await insertProposal(id, submission);
//   await insertSkripsi(id, submission);

//   return submission;
// };

// // +++ create proposal
// const insertProposal = async (submission_id, submission) => {
//   const {
//     proposed_advisor,
//     proposed_co_advisor1,
//     proposed_co_advisor2,
//     classroom_id,
//   } = submission;
//   const proposal = await prisma.proposal.create({
//     data: {
//       advisor: proposed_advisor,
//       co_advisor1: proposed_co_advisor1,
//       co_advisor2: proposed_co_advisor2,
//       classroom_id,
//     },
//   });

//   const { id: proposal_id } = proposal;
  
//   await updateGroupProposalIdById(submission_id, proposal_id);

//   return proposal;
// }

// const updateGroupProposalIdById = async (submission_id, proposal_id) => {
//   const group = await prisma.group.update({
//     where: {
//       submission_id,
//     },
//     data: {
//       proposal_id,
//     },
//   });

//   return group;
// }

// // +++ create skripsi
// const insertSkripsi = async (submission_id, submission) => {
//   const {
//     proposed_advisor,
//     proposed_co_advisor1,
//     proposed_co_advisor2,
//   } = submission;
//   const skripsi = await prisma.skripsi.create({
//     data: {
//       advisor: proposed_advisor,
//       co_advisor1: proposed_co_advisor1,
//       co_advisor2: proposed_co_advisor2,
//     },
//   });

//   const { id: skripsi_id } = skripsi;
  
//   await updateGroupSkripsiIdById(submission_id, skripsi_id);

//   return skripsi;
// }

// const updateGroupSkripsiIdById = async (submission_id, skripsi_id) => {
//   const group = await prisma.group.update({
//     where: {
//       submission_id,
//     },
//     data: {
//       skripsi_id,
//     },
//   });

//   return group;
// }

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
  // updateSubmission,
  // updateAdvisorAndOrCoAdvisor,
  // approveSubmission,
  // rejectSubmission,
  // updateGroupTitle,
}