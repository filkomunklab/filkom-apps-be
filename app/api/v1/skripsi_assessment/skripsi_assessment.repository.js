//Layer untuk komunikasi dengan database
const prisma = require("../../../database");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Create empty assessment for all student by panelist team
// @used            Skripsi
const insertEmptySkripsiAssessment = async (
  skripsi_id,
  student_id,
  dosen_id
) => {
  const skripsiAssessment = await prisma.skripsi_Assessment.create({
    data: {
      skripsi_id,
      student_id,
      dosen_id,
    },
  });

  return skripsiAssessment;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get skripsi_assessment by skripsi_id, & student_id, & dosen_id
// @used            Skripsi,
const findSkripsiAssessmentBySkripsiIdAndStudentIdAndDosenId = async (
  skripsi_id,
  student_id,
  dosen_id
) => {
  const skripsiAssessment = await prisma.skripsi_Assessment.findFirst({
    where: {
      skripsi_id,
      student_id,
      dosen_id,
    },
  });
  return skripsiAssessment;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Update skripsi assessment by id
// @used            Skripsi
const updateSkripsiAssessmentById = async (id, value) => {
  const skripsiAssessment = await prisma.skripsi_Assessment.update({
    where: {
      id,
    },
    data: {
      value,
    },
  });

  return skripsiAssessment;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// @description     Get all skripsi_assessment by skripsi_id
// @used            Skripsi
const findAllSkripsiAssessmentBySkripsiId = async (skripsi_id) => {
  const skripsiAssessment = await prisma.skripsi_Assessment.findMany({
    where: {
      skripsi_id,
    },
  });
  return skripsiAssessment;
};

module.exports = {
  insertEmptySkripsiAssessment,
  findSkripsiAssessmentBySkripsiIdAndStudentIdAndDosenId,
  updateSkripsiAssessmentById,
  findAllSkripsiAssessmentBySkripsiId,
};
