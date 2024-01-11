const gradesController = require("./grades.controller");
const express = require("express");
const router = express.Router();

router.get(
  "/grades/detailGrades/:transactionId",
  gradesController.getDetailSemesterGrades
);

module.exports = router;
