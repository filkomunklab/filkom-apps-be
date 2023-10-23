//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

//===================================================================
// @description     Create proposal assessment
// @route           POST /proposal-assessment
// @access          DOSEN
const insertProposalAssessment = async (userId, payload) => {
  const { proposal_id, student_id, value } = payload;
  const proposalAssessment = await prisma.proposal_Assessment.create({
    data: {
      proposal_id,
      student_id,
      dosen_id: userId,
      value,
    },
  });

  return proposalAssessment;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get proposal_assessment by proposal_id, & student_id, & dosen_id
// @used            createProposalAssessment
const findProposalAssessmentByProposalIdAndStudentIdAndDosenId = async (
  proposal_id,
  student_id,
  dosen_id
) => {
  const proposalAssessment = await prisma.proposal_Assessment.findFirst({
    where: {
      proposal_id,
      student_id,
      dosen_id,
    },
  });
  return proposalAssessment;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all proposal_assessment by proposal_id
// @used            Proposal
const findAllProposalAssessmentByProposalId = async (proposal_id) => {
  const proposalAssessment = await prisma.proposal_Assessment.findMany({
    where: {
      proposal_id,
    },
  });
  return proposalAssessment;
};

module.exports = {
  insertProposalAssessment,
  findProposalAssessmentByProposalIdAndStudentIdAndDosenId,
  findAllProposalAssessmentByProposalId,
};
