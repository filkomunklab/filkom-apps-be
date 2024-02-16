const subjectRepository = require("./subject.repository");

const getAllSubjectByIdCurriculum = async (curriculum_id) => {
  try {
    // select all subject by id curriculum
    const subjects = await subjectRepository.selectAllCurriculumByIdCurriculum(
      curriculum_id
    );

    return subjects;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllSubjectByIdCurriculum,
};
