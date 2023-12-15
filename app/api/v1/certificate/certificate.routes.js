const express = require("express");
const certificateController = require("./certificate.controller");

const router = express.Router();

//STUDENT POST CERTIFICATE
router.post("/certificate/:nim", certificateController.uploadCertificate); //Upload certificate

//GET ALL CERTIFICATE ONLY STATUS = APPROVED & REJECTED
router.get(
  "/certificate/dosen/:nik",
  certificateController.viewAllStudentCertificate //view all student certificate by nik
);

//DETAIL STUDENT CERTIFICATE
router.get(
  "/certificate/student/:certificateId",
  certificateController.viewStudentCertificate //view students detail certificate
);

//GET CERTIFICATE BY CATEGORY (INTENATIONAL, NATIONAL, LOCAL)
router.get(
  "/certificate/category/:nik",
  certificateController.viewCertificateCategory //View student certificate by category
);

//VIEW ACCEPTED & REJECTED CERTIFICATE
router.get(
  "/certificate/history/student/:nim",
  certificateController.studentCertificateHistory
);

//VIEW STUDENT WAITING CERTIFICATE
router.get(
  "/certificate/current/student/:nim",
  certificateController.getStudentCurrentCertificate
);

//WAITING LIST STUDENT CERTIFICATE
router.get(
  "/certificate/waitingList/dosen/:nik",
  certificateController.advisorCertificateWaitingList
);

//approval certificate
router.patch(
  "/certificate/approval/:id",
  certificateController.patchStatusCertificate
);

module.exports = router;
