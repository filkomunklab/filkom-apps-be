const gradesRepository = require("./grades.repository");

const viewDetailSemesterGrades = async (transactionId) => {
  try {
    return await gradesRepository.findDetailSemesterGrades(transactionId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  viewDetailSemesterGrades,
};
