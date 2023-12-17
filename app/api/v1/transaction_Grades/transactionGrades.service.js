const transactionGradeRepository = require("./transactionGrades.repository");
const gradesRepository = require("../Grades/grades.repository");

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

    const grades = await gradesRepository.studentInsertGradeSubmission(
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

const viewStudentGradeSubmissionDetail = async (transactionId) => {
  try {
    const transaction =
      await transactionGradeRepository.findStudentGradeSubmissionById(
        transactionId
      );
    return transaction;
  } catch (error) {
    throw error;
  }
};

const giveComment = async (transactionId, payload) => {
  try {
    const transaction = await transactionGradeRepository.addComments(
      transactionId,
      payload
    );
    return transaction;
  } catch (error) {
    throw error;
  }
};

const approveStudentGrades = async (id, status) => {
  try {
    return transactionGradeRepository.approvalGrades(id, status);
  } catch (error) {
    throw error;
  }
};

const viewListSemesterGrades = async (nim) => {
  try {
    const transaction = transactionGradeRepository.findListSemesterGrades(nim);
    return transaction;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createStudentGradesSubmmission,
  viewListStudentGradeSubmmission,
  viewStudentGradeSubmissionDetail,
  giveComment,
  approveStudentGrades,
  viewListSemesterGrades,
};
