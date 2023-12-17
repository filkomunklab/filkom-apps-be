const express = require("express");
const router = express.Router();
const transactionController = require("./transactionGrades.controller");

router.post(
  "/transaction/grades/:nim",
  transactionController.postTransactionWithGrades
);

router.get(
  "/transaction/list/:nik",
  transactionController.getListStudentGradeSubmission
);

router.get(
  "/transaction/submissionDetail/:transactionId",
  transactionController.getStudentGradeSubmissionDetail
);

router.put(
  "/transaction/comment/:transactionId",
  transactionController.putComment
);

router.patch(
  "/transaction/grades/approval/:id",
  transactionController.patchStatusGradeSubmission
);

router.get(
  "/transaction/semesterList/:nim",
  transactionController.getListSemesterGrades
);

module.exports = router;
