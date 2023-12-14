const prisma = require("../../../database");

const studentInsertGradeSubmission = async (payload) => {
  try {
    const grades = await prisma.grades.createMany({
      data: payload,
    });
    return grades;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  studentInsertGradeSubmission,
};
