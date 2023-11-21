const excelToJson = require("convert-excel-to-json");
const curriculumRepository = require("./curriculum.repository");
const subjectRepository = require("../subject/subject.repository");

const createCurriculumWithItsSubjects = async (payload) => {
  try {
    // create curriculum
    const curriculum = await curriculumRepository.insertCurriculum(payload);

    // payload untuk subject
    const curriculum_id = curriculum.id;

    const data = payload.data;

    const subjectData = data.map((item, index) => {
      return {
        code: item.code,
        name: item.name,
        credits: parseInt(item.credits),
        type: item.type,
        prerequisite: item.prerequisite,
        semester: parseInt(item.semester),
        curriculum_id,
      };
    });

    // create subjects based curriculum id
    const subject = await subjectRepository.createSubjectByIdCurriculum(
      subjectData
    );

    console.log("sukses subject: ", subject);
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

module.exports = {
  createCurriculumWithItsSubjects,
  GetAllCurriculum,
};
