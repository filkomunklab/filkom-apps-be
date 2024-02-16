const gradesController = require("./grades.controller");
const express = require("express");
const router = express.Router();
const { auth } = require("../../../middleware/auth");

router.get(
  "/grades/detailGrades/:transactionId",
  auth,
  gradesController.getDetailSemesterGrades
);

module.exports = router;
