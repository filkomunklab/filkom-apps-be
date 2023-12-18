const transactionGradeRepository = require("./transactionGrades.repository");
const gradesRepository = require("../Grades/grades.repository");

//============================Kaprodi Access=========================//
//KaprodiAccess
const WaitingListStudentGradeSubmmission = async (major) => {
  try {
    const transaction =
      await transactionGradeRepository.findWaitingListGradeSubmission(major);
    return transaction;
  } catch (error) {
    throw error;
  }
};

const historyListStudentGradesSubmission = async (major) => {
  try {
    return transactionGradeRepository.findListHistoryApprovalGrades(major);
  } catch (error) {
    throw error;
  }
};

const ApprovalGrades = async (transactionId, payload) => {
  try {
    return transactionGradeRepository.approvalStudentGrades(
      transactionId,
      payload
    );
  } catch (error) {
    throw error;
  }
};

//===========================Student Access=========================//
//APPROVED SEMESTER LIST
const viewListSemesterGrades = async (nim) => {
  try {
    const transaction = transactionGradeRepository.findListSemesterGrades(nim);
    return transaction;
  } catch (error) {
    throw error;
  }
};

//GRADES SUBMMISSION
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

//CURRENT GRADES SUBMISSION
const viewCurrentGradeSubmission = async (nim) => {
  try {
    return await transactionGradeRepository.findCurrentGradeSubmission(nim);
  } catch (error) {
    throw error;
  }
};

//HISTORY LIST STUDENT
const viewStudentHistorytGradeSubmission = async (nim) => {
  try {
    return await transactionGradeRepository.findListStudentHistoryGradeSubmission(
      nim
    );
  } catch (error) {
    throw error;
  }
};

//===========================General Access========================//
//GeneralAccess
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

module.exports = {
  createStudentGradesSubmmission,
  WaitingListStudentGradeSubmmission,
  viewStudentGradeSubmissionDetail,
  viewListSemesterGrades,
  ApprovalGrades,
  historyListStudentGradesSubmission,
  viewCurrentGradeSubmission,
  viewStudentHistorytGradeSubmission,
};
