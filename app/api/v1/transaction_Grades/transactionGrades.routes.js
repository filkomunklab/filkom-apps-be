const express = require("express");
const router = express.Router();
const transactionController = require("./transactionGrades.controller");

//STUDENT POST SEMESTER GRADES
router.post(
  "/transaction/grades/:nim",
  transactionController.postTransactionWithGrades
);

//WAITING LIST GRADES (major)
router.get(
  "/transaction/list/:major",
  transactionController.getWaitingListStudentGradeSubmission
);

//WAITING LIST GRADES (semester)
router.get(
  "/transaction/semester/waitingList",
  transactionController.getWaitingListBySemester
);

//DETAIL GRADES SUBMISSION
router.get(
  "/transaction/submissionDetail/:transactionId",
  transactionController.getStudentGradeSubmissionDetail
);

//STUDENT APPROVED SEMESTER LIST
router.get(
  "/transaction/semesterList/:nim",
  transactionController.getListSemesterGrades
);

//GRADES APPROVAL
router.put(
  "/transaction/grades/approval/:transactionId",
  transactionController.putApprovalGrades
);

//LIST HISTORY APPROVAL GRADES (KAPRODI)
router.get(
  "/transaction/hisotry/kaprodi/:major",
  transactionController.getHistoryApprovalGrades
);

//CURRENT GRADES SUBMISSION
router.get(
  "/transaction/student/currentGrades/:nim",
  transactionController.getCurrentGradeSubmission
);

//Student History
router.get(
  "/transaction/student/history/:nim",
  transactionController.getStudentHistoryGradeSubmission
);

module.exports = router;
