const transactionGradeRepository = require("./transactionGrades.repository");
const gradesRepository = require("../Grades/grades.repository");
const moment = require("moment-timezone");

//============================Kaprodi Access=========================//
//Waiting List Grades Submission (sort by major)
const WaitingListStudentGradeSubmmission = async (major) => {
  try {
    let transaction =
      await transactionGradeRepository.findWaitingListGradeSubmission(major);

    transaction = transaction.map((item) => {
      return {
        ...item,
        id: item.id,
        status: item.status,
        semester: item.semester,
        submitedDate: item.submitedDate.toString(),
      };
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};

//Waiting list Grades Submission (sort by semester)
const filterBySemester = async (payload, semester) => {
  try {
    let transaction =
      await transactionGradeRepository.findWaitingListGradeSubmissionBySemester(
        payload,
        semester
      );

    transaction = transaction.map((item) => {
      return {
        ...item,
        id: item.id,
        status: item.status,
        semester: item.semester,
        submitedDate: item.submitedDate.toString(),
      };
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};

//History Approval (Dospem)
const historyListStudentGradesSubmission = async (major) => {
  try {
    let transaction =
      await transactionGradeRepository.findListHistoryApprovalGrades(major);

    transaction = transaction.map((item) => {
      return {
        ...item,
        status: item.status,
        semester: item.semester,
        approveDate: item.approveDate.toString(),
      };
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};

//Approval Grades Submission
const ApprovalGrades = async (transactionId, payload) => {
  try {
    const transaction = transactionGradeRepository.approvalStudentGrades(
      transactionId,
      payload
    );
    return {
      ...transaction,
      approveDate: `${moment((await transaction).approveDate).tz(
        "Asia/Makassar"
      )}`,
    };
  } catch (error) {
    throw error;
  }
};

//===========================Student Access=========================//

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
        lecturer: item.lecturer,
        description: item.description,
        subjectId: item.subjectId,
        subjectName: item.subjectName,
        transactionId,
      };
    });

    const grades = await gradesRepository.studentInsertGradeSubmission(
      gradesSubmission
    );
    return {
      ...transaction,
      submitedDate: `${moment(transaction.submitedDate).tz("Asia/Makassar")}`,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//CURRENT GRADES SUBMISSION
const viewCurrentGradeSubmission = async (nim) => {
  try {
    let transaction =
      await transactionGradeRepository.findCurrentGradeSubmission(nim);

    transaction = transaction.map((item) => {
      return {
        ...item,
        semester: item.semester,
        submitedDate: item.submitedDate.toString(),
      };
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};

//HISTORY LIST STUDENT
const viewStudentHistorytGradeSubmission = async (nim) => {
  try {
    let transaction =
      await transactionGradeRepository.findListStudentHistoryGradeSubmission(
        nim
      );

    transaction = transaction.map((item) => {
      return {
        ...item,
        semester: item.semester,
        approveDate: item.approveDate.toString(),
      };
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};

//APPROVED SEMESTER LIST
const viewListSemesterGrades = async (nim) => {
  try {
    const transaction = transactionGradeRepository.findListSemesterGrades(nim);
    return transaction;
  } catch (error) {
    throw error;
  }
};

//===========================General Access========================//

//Detail Submission
const viewStudentGradeSubmissionDetail = async (transactionId) => {
  try {
    let transaction =
      await transactionGradeRepository.findStudentGradeSubmissionById(
        transactionId
      );

    return {
      ...transaction,
      approveDate: transaction.approveDate
        ? transaction.approveDate.toString()
        : null,
      submitedDate: transaction.submitedDate.toString(),
    };
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
  filterBySemester,
};
