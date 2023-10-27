const express = require("express");
const certificateController = require("./certificate.controller");

const router = express.Router();

router.post("/certificate/:nim", certificateController.uploadCertificate); //Upload certificate
router.get(
  "/certificate/dosen/:nik",
  certificateController.viewAllStudentCertificate
); //view students certificate
router.get(
  "/certificate/student/:certificateId",
  certificateController.viewStudentCertificate
); //View student certificate
router.get(
  "/certificate/category/",
  certificateController.viewCertificateCategory
);

module.exports = router;
