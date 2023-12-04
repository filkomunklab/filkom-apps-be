const express = require("express");
const certificateController = require("./certificate.controller");

const router = express.Router();

router.post("/certificate/:nim", certificateController.uploadCertificate); //Upload certificate

router.get(
  "/certificate/dosen/:nik",
  certificateController.viewAllStudentCertificate //view all student certificate by nik
);

router.get(
  "/certificate/student/:certificateId",
  certificateController.viewStudentCertificate //view students detail certificate
);

router.get(
  "/certificate/category/:nik",
  certificateController.viewCertificateCategory //View student certificate by category
);

//view student history
router.get(
  "/certificate/history/student/:nim",
  certificateController.studentCertificateHistory
);

//view advisor history
router.get(
  "/certificate/history/dosen/:nik",
  certificateController.advisorCertificateHistory
);

//approval certificate
router.patch(
  "/certificate/approval/:id",
  certificateController.patchStatusCertificate
);

module.exports = router;
