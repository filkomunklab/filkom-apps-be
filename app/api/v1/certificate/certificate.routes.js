const express = require("express");
const certificateController = require("./certificate.controller");

const router = express.Router();

//STUDENT POST CERTIFICATE
router.post("/certificate/:nim", certificateController.uploadCertificate); //Upload certificate

//GET ALL CERTIFICATE ONLY STATUS = APPROVED & REJECTED
router.get(
  "/certificate/dosen/:guidanceClassId",
  certificateController.viewAllStudentCertificate
);

//DETAIL STUDENT CERTIFICATE
router.get(
  "/certificate/student/:certificateId",
  certificateController.viewStudentCertificate //view students detail certificate
);

//GET CERTIFICATE BY CATEGORY (INTENATIONAL, NATIONAL, LOCAL)
router.get(
  "/certificate/category/:guidanceClassId",
  certificateController.viewCertificateCategory //View student certificate by category
);

//VIEW ACCEPTED & REJECTED CERTIFICATE (student history)
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
  "/certificate/waitingList/dosen/:guidanceClassId",
  certificateController.advisorCertificateWaitingList
);

//Waiting List by major
router.get(
  "/certificate/waitingList/major/:guidanceClassId",
  certificateController.getWaitingListbyMajor
);

//waiting list by arrival year pt 2
router.get(
  "/certificate/list/waiting/arrYear/:guidanceClassId",
  certificateController.getWaitingListByArrYear
);

//Approval Certificate
router.put(
  "/certificate/approval/status/:certificateId",
  certificateController.putApprovalCertificate
);

module.exports = router;
