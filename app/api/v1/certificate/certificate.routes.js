const express = require("express");
const certificateController = require("./certificate.controller");
const { auth } = require("../../../middleware/auth");
const router = express.Router();

//========================DOSEN==========================

//Approval Certificate
router.put(
  "/certificate/approval/status/:certificateId",
  auth,
  certificateController.putApprovalCertificate
);

//GET ALL CERTIFICATE ONLY STATUS = APPROVED & REJECTED
router.get(
  "/certificate/dosen/:guidanceClassId",
  auth,
  certificateController.viewAllApprovalStudentCertificate
);

//WAITING LIST STUDENT CERTIFICATE
router.get(
  "/certificate/waitingList/dosen/:guidanceClassId",
  auth,
  certificateController.advisorCertificateWaitingList
);

//waiting list by arrival year pt 2
router.get(
  "/certificate/list/waiting/arrYear/:guidanceClassId",
  auth,
  certificateController.getWaitingListByArrYear
);

//Waiting List by major
router.get(
  "/certificate/waitingList/major/:guidanceClassId",
  auth,
  certificateController.getWaitingListbyMajor
);

//GET CERTIFICATE BY CATEGORY (INTENATIONAL, NATIONAL, LOCAL)
router.get(
  "/certificate/category/:guidanceClassId",
  auth,
  certificateController.viewCertificateCategory //View student certificate by category
);

//View Certificate student
router.get(
  "/certificate/all/:nim",
  certificateController.getAllCertificateStudent
);

//======================MAHASISWA========================

//STUDENT POST CERTIFICATE
router.post("/certificate/:nim", auth, certificateController.uploadCertificate); //Upload certificate

//VIEW ACCEPTED & REJECTED CERTIFICATE (student history)
router.get(
  "/certificate/history/student/:nim",
  auth,
  certificateController.studentCertificateHistory
);

//VIEW STUDENT WAITING CERTIFICATE
router.get(
  "/certificate/current/student/:nim",
  auth,
  certificateController.getStudentCurrentCertificate
);

//======================General==========================

//DETAIL STUDENT CERTIFICATE
router.get(
  "/certificate/student/:certificateId",
  auth,
  certificateController.viewStudentCertificate //view students detail certificate
);

module.exports = router;
