const prisma = require("../../../database");

// create subjects
const createSubjectByIdCurriculum = async (payload) => {
  try {
    const subjects = await prisma.aKAD_Subject.createMany({
      data: payload,
    });

    console.log("ini payload subject: ", payload);
    return subjects;
  } catch (error) {
    await prisma.aKAD_Curriculum.delete({
      where: {
        id: payload[0].curriculumId,
      },
    });
    throw new Error(error.message);
  }
};

// select all subjects by id curriculum
const selectAllCurriculumByIdCurriculum = async (curriculum_id) => {
  try {
    const subjects = await prisma.aKAD_Subject.findMany({
      where: {
        curriculumId: curriculum_id,
      },
      orderBy: {
        semester: "asc",
      },
    });

    return subjects;
  } catch (error) {
    throw new Error(error.message);
  }
};

// delete all subject by curriculum_id
const deleteAllSubjectByCurriculumId = async (curriculum_id) => {
  try {
    const subject = await prisma.aKAD_Subject.deleteMany({
      where: {
        curriculumId: curriculum_id,
      },
    });

    return subject;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  createSubjectByIdCurriculum,
  selectAllCurriculumByIdCurriculum,
  deleteAllSubjectByCurriculumId,
};
