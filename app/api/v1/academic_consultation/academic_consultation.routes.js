const express = require("express");
const router = express.Router();
const academicConsController = require("./academic_consultation.controller");
const { auth } = require("../../../middleware/auth");

router.post(
  "/academic-consultation",
  auth,
  academicConsController.createConsultation
);

router.get(
  "/academic-consultation/student/:studentId",
  auth,
  academicConsController.getConsultationByStudentId
);

router.get(
  "/academic-consultation/employee/:employeeId",
  auth,
  academicConsController.getConsultationByEmployeeId
);

router.get(
  "/academic-consultation/detail/:id",
  auth,
  academicConsController.getConsultationById
);

router.patch(
  "/academic-consultation/:id/status/complete",
  auth,
  academicConsController.updateConsultationStatusCompleteById
);

module.exports = router;
