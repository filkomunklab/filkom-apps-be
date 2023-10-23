//Layer untuk handle business logic

const proposalChangesRepository = require("./proposal_changes.repository");
const proposalRepository = require("../proposal/proposal.repository");

//===================================================================
// @description     Create proposal assessment
// @route           POST /proposal-assessment
// @access          DOSEN
const createProposalChanges = async (userId, payload) => {
  // check proposal
  const proposal = await proposalRepository.findProposalById(
    payload.proposal_id
  );
  if (!proposal) {
    throw {
      status: 400,
      message: `Proposal not found`,
    };
  }

  if (proposal.panelist_chairman_id === userId) {
    // check exist proposal assessment
    const existingProposalChanges =
      await proposalChangesRepository.findProposalChangesByProposalIdAndDosenId(
        payload.proposal_id,
        payload.student_id,
        userId
      );
    if (existingProposalChanges) {
      throw {
        status: 400,
        message: `Proposal changes already exist`,
      };
    }

    const proposalChanges =
      await proposalChangesRepository.insertProposalChanges(userId, payload);
    return proposalChanges;
  } else if (proposal.panelist_member_id === userId) {
    // check exist proposal assessment
    const existingProposalChanges =
      await proposalChangesRepository.findProposalChangesByProposalIdAndDosenId(
        payload.proposal_id,
        payload.student_id,
        userId
      );
    if (existingProposalChanges) {
      throw {
        status: 400,
        message: `Proposal changes already exist`,
      };
    }

    const proposalChanges =
      await proposalChangesRepository.insertProposalChanges(userId, payload);
    return proposalChanges;
  } else if (proposal.advisor_id === userId) {
    // check exist proposal assessment
    const existingProposalChanges =
      await proposalChangesRepository.findProposalChangesByProposalIdAndDosenId(
        payload.proposal_id,
        payload.student_id,
        userId
      );
    if (existingProposalChanges) {
      throw {
        status: 400,
        message: `Proposal changes already exist`,
      };
    }

    const proposalChanges =
      await proposalChangesRepository.insertProposalChanges(userId, payload);
    return proposalChanges;
  } else if (proposal.co_advisor1_id === userId) {
    // check exist proposal assessment
    const existingProposalChanges =
      await proposalChangesRepository.findProposalChangesByProposalIdAndDosenId(
        payload.proposal_id,
        payload.student_id,
        userId
      );
    if (existingProposalChanges) {
      throw {
        status: 400,
        message: `Proposal changes already exist`,
      };
    }

    const proposalChanges =
      await proposalChangesRepository.insertProposalChanges(userId, payload);
    return proposalChanges;
  } else if (proposal.co_advisor2_id === userId) {
    // check exist proposal assessment
    const existingProposalChanges =
      await proposalChangesRepository.findProposalChangesByProposalIdAndDosenId(
        payload.proposal_id,
        payload.student_id,
        userId
      );
    if (existingProposalChanges) {
      throw {
        status: 400,
        message: `Proposal changes already exist`,
      };
    }

    const proposalChanges =
      await proposalChangesRepository.insertProposalChanges(userId, payload);
    return proposalChanges;
  } else {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }
};

module.exports = {
  createProposalChanges,
};
