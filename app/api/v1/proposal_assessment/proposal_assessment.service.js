//Layer untuk handle business logic

const proposalAssessmentRepository = require("./proposal_assessment.repository");
const proposalRepository = require("../proposal/proposal.repository");

//===================================================================
// @description     Create proposal assessment
// @route           POST /proposal-assessment
// @access          DOSEN
const createProposalAssessment = async (userId, payload) => {
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
    const existingProposalAssessment =
      await proposalAssessmentRepository.findProposalAssessmentByProposalIdAndStudentIdAndDosenId(
        payload.proposal_id,
        payload.student_id,
        userId
      );
    if (existingProposalAssessment) {
      throw {
        status: 400,
        message: `Proposal assessment already exist`,
      };
    }

    const proposalAssessment =
      await proposalAssessmentRepository.insertProposalAssessment(
        userId,
        payload
      );
    return proposalAssessment;
  } else if (proposal.panelist_member_id === userId) {
    // check exist proposal assessment
    const existingProposalAssessment =
      await proposalAssessmentRepository.findProposalAssessmentByProposalIdAndStudentIdAndDosenId(
        payload.proposal_id,
        payload.student_id,
        userId
      );
    if (existingProposalAssessment) {
      throw {
        status: 400,
        message: `Proposal assessment already exist`,
      };
    }

    const proposalAssessment =
      await proposalAssessmentRepository.insertProposalAssessment(
        userId,
        payload
      );
    return proposalAssessment;
  } else if (proposal.advisor_id === userId) {
    // check exist proposal assessment
    const existingProposalAssessment =
      await proposalAssessmentRepository.findProposalAssessmentByProposalIdAndStudentIdAndDosenId(
        payload.proposal_id,
        payload.student_id,
        userId
      );
    if (existingProposalAssessment) {
      throw {
        status: 400,
        message: `Proposal assessment already exist`,
      };
    }

    const proposalAssessment =
      await proposalAssessmentRepository.insertProposalAssessment(
        userId,
        payload
      );
    return proposalAssessment;
  } else {
    throw {
      status: 400,
      message: `You can't perform this action`,
    };
  }
};

module.exports = {
  createProposalAssessment,
};
