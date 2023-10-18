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
  const group_student = await groupStudentRepository.findGroupStudentByStudentIdAndGroupId(student_id, group_id);
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

  // update document
  const UpdatedProposal = await proposalRepository.updateProposalDocumentById(id, payload);
  const Data = {
    id: UpdatedProposal.id,
    file_name_proposal: UpdatedProposal.file_name_proposal,
    upload_date_proposal: UpdatedProposal.upload_date_proposal,
    file_size_proposal: UpdatedProposal.file_size_proposal,
    is_proposal_approve_by_advisor: UpdatedProposal.is_proposal_approve_by_advisor,
    is_proposal_approve_by_co_advisor1: UpdatedProposal.is_proposal_approve_by_co_advisor1,
    is_proposal_approve_by_co_advisor2: UpdatedProposal.is_proposal_approve_by_co_advisor2
  }
  return Data;
};

// const getProposalDocumentById = async (id) => {
//     const proposal = await proposalRepository.findProposalDocumentById(id);
//     if (!proposal) {
//       throw {
//         status: 400,
//         message: `Not found`,
//       };
//     }
//     return proposal;
// };

const deleteProposalDocumentById = async (id) => {
    await getProposalById(id);
    await proposalRepository.deleteProposalDocumentById(id);
};

const approveProposalDocumentById = async (id) => {
  await getProposalById(id);

  const proposal = await proposalRepository.approveProposalDocumentById(id);
  return proposal;
};

const rejectProposalDocumentById = async (id) => {
  await getProposalById(id);

  const proposal = await proposalRepository.rejectProposalDocumentById(id);
  return proposal;
};

const updateProposalPaymentById = async (id, payload) => {
    await getProposalById(id);

    const proposal = await proposalRepository.updateProposalPaymentById(id, payload);
    return proposal;
};

const getProposalPaymentById = async (id) => {
    const proposal = await proposalRepository.findProposalPaymentById(id);
    if (!proposal) {
      throw {
        status: 400,
        message: `Not found`,
      };
    }
    return proposal;
};

const deleteProposalPaymentById = async (id) => {
  await getProposalById(id);
  await proposalRepository.deleteProposalPaymentById(id);
};

const updateProposalPlagiarismById = async (id, payload) => {
    await getProposalById(id);

    const proposal = await proposalRepository.updateProposalPlagiarismById(id, payload);
    return proposal;
};

const getProposalPlagiarismById = async (id) => {
    const proposal = await proposalRepository.findProposalPlagiarismById(id);
    if (!proposal) {
      throw {
        status: 400,
        message: `Not found`,
      };
    }
    return proposal;
};

const deleteProposalPlagiarismById = async (id) => {
  await getProposalById(id);
  await proposalRepository.deleteProposalPlagiarismById(id);
};

const getProposalSchedule = async () => {
  const proposal = await proposalRepository.findProposalSchedule();
  if (!proposal) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return proposal;
};

const updateProposalScheduleById = async (id, payload) => {
  await getProposalById(id);

  const proposal = await proposalRepository.updateProposalScheduleById(id, payload);
  return proposal;
};

const getProposalScheduleById = async (id) => {
  const proposal = await proposalRepository.findProposalScheduleById(id);
  if (!proposal) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return proposal;
};

const openAccessProposalReportById = async (id) => {
  await getProposalById(id);

  const proposal = await proposalRepository.openAccessProposalReportById(id);
  return proposal;
};

const getProposalReportById = async (id) => {
  const proposal = await proposalRepository.findProposalReportById(id);
  if (!proposal) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return proposal;
};

const signProposalReportById = async (id) => {
  await getProposalById(id);

  const proposal = await proposalRepository.signProposalReportById(id);
  return proposal;
};

const updateProposalConclusionById = async (id, payload) => {
  await getProposalById(id);

  const proposal = await proposalRepository.updateProposalConclusionById(id, payload);
  return proposal;
};

const getProposalConclusionById = async (id) => {
  const proposal = await proposalRepository.findProposalConclusionById(id);
  if (!proposal) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return proposal;
};

const updateProposalRevisionDocumentById = async (id, payload) => {
  await getProposalById(id);

  const proposal = await proposalRepository.updateProposalRevisionDocumentById(id, payload);
  return proposal;
};

const getProposalRevisionDocumentById = async (id) => {
  const proposal = await proposalRepository.findProposalRevisionDocumentById(id);
  if (!proposal) {
    throw {
      status: 400,
      message: `Not found`,
    };
  }
  return proposal;
};

const deleteProposalRevisionDocumentById = async (id) => {
  await getProposalById(id);
  await proposalRepository.deleteProposalRevisionDocumentById(id);
};

const approveProposalRevisionDocumentById = async (id) => {
  await getProposalById(id);

  const proposal = await proposalRepository.approveProposalRevisionDocumentById(id);
  return proposal;
};

const rejectProposalRevisionDocumentById = async (id) => {
  await getProposalById(id);

  const proposal = await proposalRepository.rejectProposalRevisionDocumentById(id);
  return proposal;
};

module.exports = {
  updateProposalDocumentById,
  // getProposalDocumentById,
  // deleteProposalDocumentById,
  // approveProposalDocumentById,
  // rejectProposalDocumentById,
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
  
}