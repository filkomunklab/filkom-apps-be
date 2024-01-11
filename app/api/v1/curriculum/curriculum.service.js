const curriculumRepository = require("./curriculum.repository");
const subjectRepository = require("../subject/subject.repository");

const createCurriculumWithItsSubjects = async (payload) => {
  try {
    // create curriculum
    const curriculum = await curriculumRepository.insertCurriculum(payload);

    // payload untuk subject
    const curriculumId = curriculum.id;

    const data = payload.data;

    const subjectData = data.map((item, index) => {
      return {
        code: item.code,
        name: item.name,
        credits: parseInt(item.credits),
        type: item.type,
        prerequisite: item.prerequisite,
        semester: parseInt(item.semester),
        curriculumId,
      };
    });

    // create subjects based curriculum id
    const subject = await subjectRepository.createSubjectByIdCurriculum(
      subjectData
    );

    return curriculum;
  } catch (error) {
    throw new Error(error.message);
  }
};

const GetAllCurriculum = async () => {
  try {
    // select all curriculum
    const curriculum = await curriculumRepository.selectAllCurriculum();

    return curriculum;
  } catch (error) {
    throw new Error(error.message);
  }
};

const GetCurriculumById = async (id) => {
  try {
    // select curriculum by id
    const curriculum = await curriculumRepository.selectCurriculumById(id);

    return curriculum;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCurriculumWithSubjectByCurriculumId = async (curriculum_id) => {
  try {
    // delete subject
    const subject = await subjectRepository.deleteAllSubjectByCurriculumId(
      curriculum_id
    );

    // delete curriculum
    const curriculum =
      await curriculumRepository.deleteCurriculumByIdCurriculum(curriculum_id);

    return curriculum;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCurriculumByMajorAndYear = async (major, year) => {
  try {
    // check curriculum by major and year
    const curriculum =
      await curriculumRepository.selectCurriculumByMajorAndYear(major, year);

    return curriculum;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCurriculumWithItsSubjects,
  GetAllCurriculum,
  GetCurriculumById,
  deleteCurriculumWithSubjectByCurriculumId,
  getCurriculumByMajorAndYear,
};
