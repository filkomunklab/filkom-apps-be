const express = require("express");
const router = express.Router();
const trasactionController = require("./transactionGrades.controller");

router.post(
  "/transaction/grades/:nim",
  trasactionController.postTransactionWithGrades
);

router.get(
  "/transaction/list/:nik",
  trasactionController.getListStudentGradeSubmission
);

router.get(
  "/transaction/submissionDetail/:transactionId",
  trasactionController.getStudentGradeSubmissionDetail
);

router.put(
  "/transaction/comment/:transactionId",
  trasactionController.putComment
);

router.patch(
  "/transaction/grades/approval/:id",
  trasactionController.patchStatusGradeSubmission
);

module.exports = router;
