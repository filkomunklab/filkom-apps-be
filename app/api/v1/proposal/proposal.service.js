//Layer untuk handle business logic

const proposalRepository = require("./proposal.repository");
const groupRepository = require("../group/group.repository");
const groupStudentRepository = require("../group_student/group_student.repository");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get proposal by id
// @used            updateProposalDocumentById
const getProposalById = async (id) => {
  const proposal = await proposalRepository.findProposalById(id);
  if (!proposal) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return proposal;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get group_student by student_id & group_id (check student in group_student)
// @used            updateProposalDocumentById
const getGroupStudentByStudentIdAndGroupId = async (student_id, group_id) => {
  const group_student =
    await groupStudentRepository.findGroupStudentByStudentIdAndGroupId(
      student_id,
      group_id
    );
  if (!group_student) {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }
  return group_student;
};

//===================================================================
// @description     Upload dokumen proposal
// @route           PUT /proposal/proposal-document/:id
// @access          MAHASISWA
const updateProposalDocumentById = async (userId, id, payload) => {
  // check proposal
  const proposal = await getProposalById(id);
  // get group by proposal_id
  const group = await groupRepository.findGroupByProposalId(proposal.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // update proposal document
  const UpdatedProposal = await proposalRepository.updateProposalDocumentById(
    id,
    payload
  );
  const Data = {
    id: UpdatedProposal.id,
    file_name_proposal: UpdatedProposal.file_name_proposal,
    upload_date_proposal: UpdatedProposal.upload_date_proposal,
    file_size_proposal: UpdatedProposal.file_size_proposal,
    is_proposal_approve_by_advisor:
      UpdatedProposal.is_proposal_approve_by_advisor,
    is_proposal_approve_by_co_advisor1:
      UpdatedProposal.is_proposal_approve_by_co_advisor1,
    is_proposal_approve_by_co_advisor2:
      UpdatedProposal.is_proposal_approve_by_co_advisor2,
  };
  return Data;
};

//===================================================================
// @description     Get dokumen proposal
// @route           GET /proposal/proposal-document/:id
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN
const getProposalDocumentById = async (id) => {
  const proposal = await proposalRepository.findProposalDocumentById(id);
  if (!proposal) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  const Data = {
    id: proposal.id,
    file_name_proposal: proposal.file_name_proposal,
    upload_date_proposal: proposal.upload_date_proposal,
    file_size_proposal: proposal.file_size_proposal,
    is_proposal_approve_by_advisor: proposal.is_proposal_approve_by_advisor,
    is_proposal_approve_by_co_advisor1:
      proposal.is_proposal_approve_by_co_advisor1,
    is_proposal_approve_by_co_advisor2:
      proposal.is_proposal_approve_by_co_advisor2,
  };
  return Data;
};

//===================================================================
// @description     Delete/Update dokumen proposal
// @route           PUT "/proposal/proposal-document/delete/:id
// @access          MAHASISWA
const deleteProposalDocumentById = async (userId, id) => {
  // check proposal
  const proposal = await getProposalById(id);
  // get group by proposal_id
  const group = await groupRepository.findGroupByProposalId(proposal.id);
  // check student in group_student
  await getGroupStudentByStudentIdAndGroupId(userId, group.id);

  // delete/update proposal document
  await proposalRepository.deleteProposalDocumentById(id);
};

//===================================================================
// @description     Approve dokumen proposal
// @route           PUT /proposal/proposal-document/approve/:id
// @access          DOSEN
const approveProposalDocumentById = async (userId, id) => {
  // check proposal
  const proposal = await getProposalById(id);
  // check exist proposal document
  if (
    proposal.file_name_proposal === null &&
    proposal.file_size_proposal === null
  ) {
    throw {
      status: 400,
      message: `There are no files to approve`,
    };
  }
  // check apakah advisor
  const advisor =
    await proposalRepository.findAdvisorInProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );
  // check apakah co-advisor1
  const co_advisor1 =
    await proposalRepository.findCoAdvisor1InProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );
  // check apakah co-advisor2
  const co_advisor2 =
    await proposalRepository.findCoAdvisor2InProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );

  if (advisor) {
    if (advisor.is_proposal_approve_by_advisor === "Approve") {
      throw {
        status: 400,
        message: `File has been approved`,
      };
    } else {
      const UpdatedProposal =
        await proposalRepository.approveProposalDocumentByAdvisorById(id);
      if (
        UpdatedProposal.is_proposal_approve_by_advisor === "Approve" &&
        (!UpdatedProposal.is_proposal_approve_by_co_advisor1 ||
          UpdatedProposal.is_proposal_approve_by_co_advisor1 === "Approve") &&
        (!UpdatedProposal.is_proposal_approve_by_co_advisor2 ||
          UpdatedProposal.is_proposal_approve_by_co_advisor2 === "Approve")
      ) {
        // update progress in group
        await groupRepository.updateGroupProgressByProposalId(
          UpdatedProposal.id
        );
      }
      const Data = {
        is_proposal_approve_by_advisor:
          UpdatedProposal.is_proposal_approve_by_advisor,
        advisor_proposal_approved_date:
          UpdatedProposal.advisor_proposal_approved_date,
      };
      return Data;
    }
  }
  if (co_advisor1) {
    if (co_advisor1.is_proposal_approve_by_co_advisor1 === "Approve") {
      throw {
        status: 400,
        message: `File has been approved`,
      };
    } else {
      const UpdatedProposal =
        await proposalRepository.approveProposalDocumentByCoAdvisor1ById(id);
      if (
        UpdatedProposal.is_proposal_approve_by_advisor === "Approve" &&
        (!UpdatedProposal.is_proposal_approve_by_co_advisor1 ||
          UpdatedProposal.is_proposal_approve_by_co_advisor1 === "Approve") &&
        (!UpdatedProposal.is_proposal_approve_by_co_advisor2 ||
          UpdatedProposal.is_proposal_approve_by_co_advisor2 === "Approve")
      ) {
        // update progress in group
        await groupRepository.updateGroupProgressByProposalId(
          UpdatedProposal.id
        );
      }
      const Data = {
        is_proposal_approve_by_co_advisor1:
          UpdatedProposal.is_proposal_approve_by_co_advisor1,
        co_advisor1_proposal_approved_date:
          UpdatedProposal.co_advisor1_proposal_approved_date,
      };
      return Data;
    }
  }
  if (co_advisor2) {
    if (co_advisor2.is_proposal_approve_by_co_advisor1 === "Approve") {
      throw {
        status: 400,
        message: `File has been approved`,
      };
    } else {
      const UpdatedProposal =
        await proposalRepository.approveProposalDocumentByCoAdvisor2ById(id);
      if (
        UpdatedProposal.is_proposal_approve_by_advisor === "Approve" &&
        (!UpdatedProposal.is_proposal_approve_by_co_advisor1 ||
          UpdatedProposal.is_proposal_approve_by_co_advisor1 === "Approve") &&
        (!UpdatedProposal.is_proposal_approve_by_co_advisor2 ||
          UpdatedProposal.is_proposal_approve_by_co_advisor2 === "Approve")
      ) {
        // update progress in group
        await groupRepository.updateGroupProgressByProposalId(
          UpdatedProposal.id
        );
      }
      const Data = {
        is_proposal_approve_by_co_advisor2:
          UpdatedProposal.is_proposal_approve_by_co_advisor2,
        co_advisor2_proposal_approved_date:
          UpdatedProposal.co_advisor2_proposal_approved_date,
      };
      return Data;
    }
  }

  if (!advisor && !co_advisor1 && !co_advisor2) {
    throw {
      status: 400,
      message: `You are not Advisor or Co-Advisor`,
    };
  }
};

//===================================================================
// @description     Reject dokumen proposal
// @route           PUT /proposal/proposal-document/reject/:id
// @access          DOSEN
const rejectProposalDocumentById = async (userId, id) => {
  // check proposal
  const proposal = await getProposalById(id);
  // check exist proposal document
  if (
    proposal.file_name_proposal === null &&
    proposal.file_size_proposal === null
  ) {
    throw {
      status: 400,
      message: `There are no files to reject`,
    };
  }
  // check apakah advisor
  const advisor =
    await proposalRepository.findAdvisorInProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );
  // check apakah co-advisor1
  const co_advisor1 =
    await proposalRepository.findCoAdvisor1InProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );
  // check apakah co-advisor2
  const co_advisor2 =
    await proposalRepository.findCoAdvisor2InProposalByIdAndAdvisorId(
      proposal.id,
      userId
    );

  if (advisor) {
    if (
      advisor.is_proposal_approve_by_advisor === "Rejected" ||
      advisor.is_proposal_approve_by_advisor === "Approve"
    ) {
      throw {
        status: 400,
        message: `File has been rejected or approved`,
      };
    } else {
      const UpdatedProposal =
        await proposalRepository.rejectProposalDocumentByAdvisorById(id);
      const Data = {
        is_proposal_approve_by_advisor:
          UpdatedProposal.is_proposal_approve_by_advisor,
        advisor_proposal_approved_date:
          UpdatedProposal.advisor_proposal_approved_date,
      };
      return Data;
    }
  }
  if (co_advisor1) {
    if (
      co_advisor1.is_proposal_approve_by_co_advisor1 === "Rejected" ||
      co_advisor1.is_proposal_approve_by_co_advisor1 === "Approve"
    ) {
      throw {
        status: 400,
        message: `File has been rejected or approved`,
      };
    } else {
      const UpdatedProposal =
        await proposalRepository.rejectProposalDocumentByCoAdvisor1ById(id);
      const Data = {
        is_proposal_approve_by_co_advisor1:
          UpdatedProposal.is_proposal_approve_by_co_advisor1,
        co_advisor1_proposal_approved_date:
          UpdatedProposal.co_advisor1_proposal_approved_date,
      };
      return Data;
    }
  }
  if (co_advisor2) {
    if (
      co_advisor2.is_proposal_approve_by_co_advisor1 === "Rejected" ||
      co_advisor2.is_proposal_approve_by_co_advisor1 === "Approve"
    ) {
      throw {
        status: 400,
        message: `File has been rejected or approved`,
      };
    } else {
      const UpdatedProposal =
        await proposalRepository.rejectProposalDocumentByCoAdvisor2ById(id);
      const Data = {
        is_proposal_approve_by_co_advisor2:
          UpdatedProposal.is_proposal_approve_by_co_advisor2,
        co_advisor2_proposal_approved_date:
          UpdatedProposal.co_advisor2_proposal_approved_date,
      };
      return Data;
    }
  }

  if (!advisor && !co_advisor1 && !co_advisor2) {
    throw {
      status: 400,
      message: `You are not Advisor or Co-Advisor`,
    };
  }
};

// const updateProposalPaymentById = async (id, payload) => {
//     await getProposalById(id);

//     const proposal = await proposalRepository.updateProposalPaymentById(id, payload);
//     return proposal;
// };

// const getProposalPaymentById = async (id) => {
//     const proposal = await proposalRepository.findProposalPaymentById(id);
//     if (!proposal) {
//       throw {
//         status: 400,
//         message: `Not found`,
//       };
//     }
//     return proposal;
// };

// const deleteProposalPaymentById = async (id) => {
//   await getProposalById(id);
//   await proposalRepository.deleteProposalPaymentById(id);
// };

// const updateProposalPlagiarismById = async (id, payload) => {
//     await getProposalById(id);

//     const proposal = await proposalRepository.updateProposalPlagiarismById(id, payload);
//     return proposal;
// };

// const getProposalPlagiarismById = async (id) => {
//     const proposal = await proposalRepository.findProposalPlagiarismById(id);
//     if (!proposal) {
//       throw {
//         status: 400,
//         message: `Not found`,
//       };
//     }
//     return proposal;
// };

// const deleteProposalPlagiarismById = async (id) => {
//   await getProposalById(id);
//   await proposalRepository.deleteProposalPlagiarismById(id);
// };

// const getProposalSchedule = async () => {
//   const proposal = await proposalRepository.findProposalSchedule();
//   if (!proposal) {
//     throw {
//       status: 400,
//       message: `Not found`,
//     };
//   }
//   return proposal;
// };

// const updateProposalScheduleById = async (id, payload) => {
//   await getProposalById(id);

//   const proposal = await proposalRepository.updateProposalScheduleById(id, payload);
//   return proposal;
// };

// const getProposalScheduleById = async (id) => {
//   const proposal = await proposalRepository.findProposalScheduleById(id);
//   if (!proposal) {
//     throw {
//       status: 400,
//       message: `Not found`,
//     };
//   }
//   return proposal;
// };

// const openAccessProposalReportById = async (id) => {
//   await getProposalById(id);

//   const proposal = await proposalRepository.openAccessProposalReportById(id);
//   return proposal;
// };

// const getProposalReportById = async (id) => {
//   const proposal = await proposalRepository.findProposalReportById(id);
//   if (!proposal) {
//     throw {
//       status: 400,
//       message: `Not found`,
//     };
//   }
//   return proposal;
// };

// const signProposalReportById = async (id) => {
//   await getProposalById(id);

//   const proposal = await proposalRepository.signProposalReportById(id);
//   return proposal;
// };

// const updateProposalConclusionById = async (id, payload) => {
//   await getProposalById(id);

//   const proposal = await proposalRepository.updateProposalConclusionById(id, payload);
//   return proposal;
// };

// const getProposalConclusionById = async (id) => {
//   const proposal = await proposalRepository.findProposalConclusionById(id);
//   if (!proposal) {
//     throw {
//       status: 400,
//       message: `Not found`,
//     };
//   }
//   return proposal;
// };

// const updateProposalRevisionDocumentById = async (id, payload) => {
//   await getProposalById(id);

//   const proposal = await proposalRepository.updateProposalRevisionDocumentById(id, payload);
//   return proposal;
// };

// const getProposalRevisionDocumentById = async (id) => {
//   const proposal = await proposalRepository.findProposalRevisionDocumentById(id);
//   if (!proposal) {
//     throw {
//       status: 400,
//       message: `Not found`,
//     };
//   }
//   return proposal;
// };

// const deleteProposalRevisionDocumentById = async (id) => {
//   await getProposalById(id);
//   await proposalRepository.deleteProposalRevisionDocumentById(id);
// };

// const approveProposalRevisionDocumentById = async (id) => {
//   await getProposalById(id);

//   const proposal = await proposalRepository.approveProposalRevisionDocumentById(id);
//   return proposal;
// };

// const rejectProposalRevisionDocumentById = async (id) => {
//   await getProposalById(id);

//   const proposal = await proposalRepository.rejectProposalRevisionDocumentById(id);
//   return proposal;
// };

module.exports = {
  updateProposalDocumentById,
  getProposalDocumentById,
  deleteProposalDocumentById,
  approveProposalDocumentById,
  rejectProposalDocumentById,
  // updateProposalPaymentById,
  // getProposalPaymentById,
  // deleteProposalPaymentById,
  // updateProposalPlagiarismById,
  // getProposalPlagiarismById,
  // deleteProposalPlagiarismById,

  // getProposalSchedule,
  // updateProposalScheduleById,
  // getProposalScheduleById,

  // openAccessProposalReportById,
  // getProposalReportById,
  // signProposalReportById,
  // updateProposalConclusionById,
  // getProposalConclusionById,

  // updateProposalRevisionDocumentById,
  // getProposalRevisionDocumentById,
  // deleteProposalRevisionDocumentById,
  // approveProposalRevisionDocumentById,
  // rejectProposalRevisionDocumentById,
};
