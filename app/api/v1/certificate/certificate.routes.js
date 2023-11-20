const express = require("express");
const certificateController = require("./certificate.controller");

const router = express.Router();

router.post("/certificate/:nim", certificateController.uploadCertificate); //Upload certificate
router.get(
  "/certificate/dosen/:nik",
  certificateController.viewAllStudentCertificate
);

router.get(
  "/certificate/student/:certificateId",
  certificateController.viewStudentCertificate //view students certificate
);

router.get(
  "/certificate/category/:nik",
  certificateController.viewCertificateCategory //View student certificate by category
);

module.exports = router;
