//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

const createConclusion = async (proposal_id, student_id) => {
  const conclusion = prisma.proposal_Conclusion.create({
    data: {
      proposal_id,
      student_id,
    },
  });
  return conclusion;
};

const updateConclusion = async (id, assessment_conclution) => {
  const conclusion = prisma.proposal_Conclusion.update({
    where: {
      id,
    },
    data: {
      assessment_conclution,
    },
  });
  return conclusion;
};

const findConclusion = async (proposal_id, student_id) => {
  const conclusion = prisma.proposal_Conclusion.findFirst({
    where: {
      proposal_id,
      student_id,
    },
  });
  return conclusion;
};

const findAllConclusionById = async (proposal_id) => {
  const conclusion = prisma.proposal_Conclusion.findMany({
    where: {
      proposal_id,
    },
  });
  return conclusion;
};

module.exports = {
  createConclusion,
  updateConclusion,
  findConclusion,
  findAllConclusionById,
};
