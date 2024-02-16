const { Semester } = require("@prisma/client");
const gradesRepository = require("./grades.repository");

const viewDetailSemesterGrades = async (transactionId) => {
  try {
    let grades = await gradesRepository.findDetailSemesterGrades(transactionId);
    const semester = grades[0].transaction_Grades.semester;
    grades = grades.map((item) => {
      const { transaction_Grades, ...itemWithoutTransactionGrades } = item;
      return {
        ...itemWithoutTransactionGrades,
      };
    });

    return {
      semester,
      subject: grades,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  viewDetailSemesterGrades,
};
