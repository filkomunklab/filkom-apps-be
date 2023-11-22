// layer komunikasi dengan database
const prisma = require("../../../database");

// @description     Create curriculum
// @route           POST /curriculum
// @access
const insertCurriculum = async (payload) => {
  try {
    const { major, year } = payload;
    const curriculum = await prisma.curriculum.create({
      data: {
        major,
        year,
      },
    });

    return curriculum;
  } catch (error) {
    throw new Error(error.message);
  }
};

// @description     Get curriculum
// @route           GET /curriculum
// @access
const selectAllCurriculum = async () => {
  try {
    const curriculum = await prisma.curriculum.findMany();

    return curriculum;
  } catch (error) {
    throw new Error(error.message);
  }
};

// @description     Delete curriculum
// @route           Delete /curriculum/:curriculum_id
// @access
const deleteCurriculumByIdCurriculum = async (curriculum_id) => {
  try {
    const curriculum = await prisma.curriculum.delete({
      where: {
        id: curriculum_id,
      },
    });

    return curriculum;
  } catch (error) {
    console.log("ini eror curriculum delete: ", error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  insertCurriculum,
  selectAllCurriculum,
  deleteCurriculumByIdCurriculum,
};
