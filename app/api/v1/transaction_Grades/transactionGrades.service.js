const transactionGradeRepository = require("./transactionGrades.repository");
const gradesRepository = require("../Grades/grades.repository");
const moment = require("moment-timezone");

//============================Kaprodi Access=========================//
//Waiting List Grades Submission (sort by major)
const WaitingListStudentGradeSubmmission = async (major) => {
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
};

//Waiting list Grades Submission (sort by semester)
const filterBySemester = async (payload, semester) => {
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
};

//History Approval (Dospem)
const historyListStudentGradesSubmission = async (major) => {
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
};

//Approval Grades Submission
const ApprovalGrades = async (transactionId, payload) => {
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
};

//===========================Student Access=========================//

//GRADES SUBMMISSION
const createStudentGradesSubmmission = async (payload, nim) => {
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
};

//Check if isInput
const viewCheckIsInput = async (id) => {
  const transaction = transactionGradeRepository.findCheckIsInput(id);
  return transaction;
};

//CURRENT GRADES SUBMISSION
const viewCurrentGradeSubmission = async (nim) => {
  let transaction = await transactionGradeRepository.findCurrentGradeSubmission(
    nim
  );

  transaction = transaction.map((item) => {
    return {
      ...item,
      semester: item.semester,
      submitedDate: item.submitedDate.toString(),
    };
  });

  return transaction;
};

//HISTORY LIST STUDENT
const viewStudentHistorytGradeSubmission = async (nim) => {
  let transaction =
    await transactionGradeRepository.findListStudentHistoryGradeSubmission(nim);

  transaction = transaction.map((item) => {
    return {
      ...item,
      semester: item.semester,
      approveDate: item.approveDate.toString(),
    };
  });

  return transaction;
};

//APPROVED SEMESTER LIST
const viewListSemesterGrades = async (nim) => {
  const transaction = transactionGradeRepository.findListSemesterGrades(nim);
  return transaction;
};

//===========================General Access========================//

//Detail Submission
const viewStudentGradeSubmissionDetail = async (transactionId) => {
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
  // viewCheckIsInput,
  viewCheckIsInput,
};
