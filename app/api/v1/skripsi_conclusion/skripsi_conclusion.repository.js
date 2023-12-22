//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

const createConclusion = async (skripsi_id, student_id) => {
  const conclusion = prisma.skripsi_Conclusion.create({
    data: {
      skripsi_id,
      student_id,
    },
  });
  return conclusion;
};

const updateConclusion = async (id, assessment_conclution) => {
  const conclusion = prisma.skripsi_Conclusion.update({
    where: {
      id,
    },
    data: {
      assessment_conclution,
    },
  });
  return conclusion;
};

const findConclusion = async (skripsi_id, student_id) => {
  const conclusion = prisma.skripsi_Conclusion.findFirst({
    where: {
      skripsi_id,
      student_id,
    },
  });
  return conclusion;
};

const findAllConclusionById = async (skripsi_id) => {
  const conclusion = prisma.skripsi_Conclusion.findMany({
    where: {
      skripsi_id,
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
