const express = require("express");
const router = express.Router();
const certificateController = require("./certificate.controller");

router.post("/certificate/:nim", certificateController.uploadCertificate); //Upload certificate
router.get(
  "/certificate/dosen/:nik",
  certificateController.viewAllStudentCertificate
); //view students certificate
router.get(
  "/certificate/student/:certificateId",
  certificateController.viewStudentCertificate
); //View student certificate

module.exports = router;
