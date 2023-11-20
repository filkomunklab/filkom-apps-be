const prisma = require("../../../database");

// create subjects
const createSubjectByIdCurriculum = async (payload) => {
  try {
    const subjects = await prisma.subject.createMany({
      data: payload,
    });

    return subjects;
  } catch (error) {
    throw new Error(error.message);
  }
};

// select all subjects by id curriculum
const selectAllCurriculumByIdCurriculum = async (curriculum_id) => {
  try {
    const subjects = await prisma.subject.findMany({
      where: {
        curriculum_id,
      },
    });

    return subjects;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createSubjectByIdCurriculum,
  selectAllCurriculumByIdCurriculum,
};
