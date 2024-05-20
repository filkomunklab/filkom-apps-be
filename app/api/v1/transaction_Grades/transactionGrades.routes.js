const express = require("express");
const router = express.Router();
const transactionController = require("./transactionGrades.controller");
const { auth } = require("../../../middleware/auth");

//======================================KAPRODI====================================
//WAITING LIST GRADES (major)
router.get(
  "/transaction/list/:major",
  auth,
  transactionController.getWaitingListStudentGradeSubmission
);

//WAITING LIST GRADES (semester)
router.get(
  "/transaction/waitingList/semester/:major",
  auth,
  transactionController.getWaitingListBySemester
);

//LIST HISTORY APPROVAL GRADES (KAPRODI)
router.get(
  "/transaction/hisotry/kaprodi/:major",
  auth,
  transactionController.getHistoryApprovalGrades
);

//GRADES APPROVAL
router.put(
  "/transaction/grades/approval/:transactionId",
  auth,
  transactionController.putApprovalGrades
);

//======================================MAHASISWA=================================

//STUDENT POST SEMESTER GRADES
router.post(
  "/transaction/grades/:studentId",
  auth,
  transactionController.postTransactionWithGrades
);

//check isInput grades
router.get(
  "/transaction/grades/check/:transactionId",
  auth,
  transactionController.getCheckIsInput
);

//STUDENT APPROVED SEMESTER LIST
router.get(
  "/transaction/semesterList/:studentId",
  auth,
  transactionController.getListSemesterGrades
);

//CURRENT GRADES SUBMISSION
router.get(
  "/transaction/student/currentGrades/:studentId",
  auth,
  transactionController.getCurrentGradeSubmission
);

//Student History
router.get(
  "/transaction/student/history/:studentId",
  auth,
  transactionController.getStudentHistoryGradeSubmission
);

//=======================================GENERAL==================================

//DETAIL GRADES SUBMISSION
router.get(
  "/transaction/submissionDetail/:transactionId",
  auth,
  transactionController.getStudentGradeSubmissionDetail
);

module.exports = router;
