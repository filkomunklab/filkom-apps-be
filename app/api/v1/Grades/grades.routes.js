const gradesController = require("./grades.controller");
const express = require("express");
const router = express.Router();

router.get(
  "/grades/semesterList/:transactionId",
  gradesController.getDetailSemesterGrades
);

module.exports = router;
