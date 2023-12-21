const express = require("express");
const router = express.Router();
const academicConsController = require("./academic_consultation.controller");
const { auth } = require("../../../middleware/auth");

router.post(
  "/academic-consultation",
  academicConsController.createConsultation
);
router.get(
  "/academic-consultation/student/:nim",
  academicConsController.getConsultationByNim
);
router.get(
  "/academic-consultation/employee/:nik",
  academicConsController.getConsultationByNik
);
router.get(
  "/academic-consultation/detail/:id",
  academicConsController.getConsultationById
);
router.patch(
  "/academic-consultation/:id/status/complete",
  academicConsController.updateConsultationStatusCompleteById
);

module.exports = router;
