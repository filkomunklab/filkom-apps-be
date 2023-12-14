const transactionGradeRepository = require("./transactionGrades.repository");
const gradeSubmmisionRepository = require("../gradeSubmmision/gradeSubmmision.repository");

const createStudentGradesSubmmission = async (payload, nim) => {
  try {
    const transaction = await transactionGradeRepository.insertDataforGrades(
      payload,
      nim
    );

    const transactionId = transaction.id;

    const data = payload.data;

    const gradesSubmission = data.map((item, index) => {
      return {
        grades: item.grades,
        retrival_to: parseInt(item.retrival_to),
        paralel: item.paralel,
        subjectId: item.subjectId,
        subjectName: item.subjectName,
        transactionId,
      };
    });

    console.log("data grade: ", gradesSubmission);
    const grades = await gradeSubmmisionRepository.studentInsertGradeSubmission(
      gradesSubmission
    );
    return transaction;
  } catch (error) {
    throw error;
  }
};

const viewListStudentGradeSubmmission = async (nik) => {
  try {
    const transaction =
      await transactionGradeRepository.findListGradeSubmmisionByNik(nik);
    return transaction;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createStudentGradesSubmmission,
  viewListStudentGradeSubmmission,
};
