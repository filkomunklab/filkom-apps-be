const prisma = require("../../../database");

const studentInsertGradeSubmission = async (payload) => {
  try {
    const grades = await prisma.aKAD_Grades.createMany({
      data: payload,
    });
    return grades;
  } catch (error) {
    throw error;
  }
};

const findDetailSemesterGrades = async (transactionId) => {
  try {
    const grades = await prisma.aKAD_Grades.findMany({
      where: {
        transaction_Grades: {
          id: transactionId,
        },
      },
      select: {
        subjectName: true,
        lecturer: true,
        grades: true,
        description: true,
        Subject: {
          select: {
            id: true,
            type: true,
            credits: true,
          },
        },
        transaction_Grades: {
          select: {
            semester: true,
          },
        },
      },
    });
    return grades;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  studentInsertGradeSubmission,
  findDetailSemesterGrades,
};
