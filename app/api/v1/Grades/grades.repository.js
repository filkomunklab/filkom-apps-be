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

const findDetailSemesterGrades = async (transactionId) => {
  try {
    const grades = await prisma.grades.findMany({
      where: {
        transaction_Grades: {
          id: transactionId,
        },
      },
      include: {
        transaction_Grades: {
          select: {
            semester: true,
          },
        },
      },
    });
    return grades;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  studentInsertGradeSubmission,
  findDetailSemesterGrades,
};
