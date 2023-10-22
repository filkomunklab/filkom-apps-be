const express = require("express");
const router = express.Router();
const certificateController = require("./certificate.controller");

router.post("/certificate/:nim", certificateController.uploadCertificate); //Upload certificate
router.get(
  "/certificate/:nik",
  certificateController.viewAllStudentCertificate
); //view all student certificate

module.exports = router;
