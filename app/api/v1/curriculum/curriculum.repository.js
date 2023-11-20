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

module.exports = {
  insertCurriculum,
  selectAllCurriculum,
};
