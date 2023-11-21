//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const proposalController = require("./proposal.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

//===================================================================
// @description     Upload dokumen proposal
// @access          MAHASISWA
router.put(
  "/proposal/proposal-document/:id",
  auth,
  proposalController.updateProposalDocumentById
);

//===================================================================
// @description     Get dokumen proposal
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/proposal/proposal-document/:id",
  auth,
  proposalController.getProposalDocumentById
);

//===================================================================
// @description     Delete/Update dokumen proposal
// @access          MAHASISWA
router.put(
  "/proposal/proposal-document/delete/:id",
  auth,
  proposalController.deleteProposalDocumentById
);

//===================================================================
// @description     Approve dokumen proposal
// @access          DOSEN
router.put(
  "/proposal/proposal-document/approve/:id",
  auth,
  proposalController.approveProposalDocumentById
);

//===================================================================
// @description     Reject dokumen proposal
// @access          DOSEN
router.put(
  "/proposal/proposal-document/reject/:id",
  auth,
  proposalController.rejectProposalDocumentById
);

//===================================================================
// @description     Upload/Update bukti pembayaran
// @access          MAHASISWA
router.put(
  "/proposal/proposal-payment/:id",
  auth,
  proposalController.updateProposalPaymentById
);

//===================================================================
// @description     Get bukti pembayaran
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/proposal/proposal-payment/:id",
  auth,
  proposalController.getProposalPaymentById
);

//===================================================================
// @description     Delete/Update bukti pembayaran
// @access          MAHASISWA
router.put(
  "/proposal/proposal-payment/delete/:id",
  auth,
  proposalController.deleteProposalPaymentById
);

//===================================================================
// @description     Upload/Update bukti hasil cek plagiat
// @access          MAHASISWA
router.put(
  "/proposal/proposal-plagiarism-check/:id",
  auth,
  proposalController.updateProposalPlagiarismById
);

//===================================================================
// @description     Get bukti hasil cek plagiat
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/proposal/proposal-plagiarism-check/:id",
  auth,
  proposalController.getProposalPlagiarismById
);

//===================================================================
// @description     Delete/Update bukti hasil cek plagiat
// @access          MAHASISWA
router.put(
  "/proposal/proposal-plagiarism-check/delete/:id",
  auth,
  proposalController.deleteProposalPlagiarismById
);

//===================================================================
// @description     Get all proposal schedule
// @access          OPERATOR_FAKULTAS
router.get(
  "/proposal/schedule",
  auth,
  proposalController.getAllProposalSchedule
);

//===================================================================
// @description     Create/Update proposal schedule
// @access          OPERATOR_FAKULTAS
router.put(
  "/proposal/schedule/:id",
  auth,
  proposalController.updateProposalScheduleById
);

//===================================================================
// @description     Get proposal schedule
// @access          OPERATOR_FAKULTAS
router.get(
  "/proposal/schedule/:id",
  auth,
  proposalController.getProposalScheduleById
);

//===================================================================
// @description     Open report
// @access          DOSEN
router.put(
  "/proposal/proposal-report/open-access/:id",
  auth,
  proposalController.openAccessProposalReportById
);

//===================================================================
// @description     Get Open report
// @access          DOSEN, KAPRODI, DEKAN
router.get(
  "/proposal/proposal-report/open-access/:id",
  auth,
  proposalController.getOpenAccessProposalReportById
);

//===================================================================
// @description     Update proposal assessment by id
// @access          DOSEN
router.put(
  "/proposal/proposal-assessment/:id",
  auth,
  proposalController.updateProposalAssessmentById
);

//===================================================================
// @description     Get all proposal assessment by id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/proposal/proposal-assessment/:id",
  auth,
  proposalController.getAllProposalAssessmentById
);

//===================================================================
// @description     Update proposal changes by id
// @access          DOSEN
router.put(
  "/proposal/proposal-changes/:id",
  auth,
  proposalController.updateProposalChangesById
);

//===================================================================
// @description     Get all proposal changes by id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/proposal/proposal-changes/:id",
  auth,
  proposalController.getAllProposalChangesById
);

//===================================================================
// @description     Get report
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/proposal/proposal-report/:id",
  auth,
  proposalController.getProposalReportById
);

//===================================================================
// @description     Fill/Update report
// @access          DOSEN, DEKAN
router.put(
  "/proposal/proposal-report/:id",
  auth,
  proposalController.signProposalReportById
);

//===================================================================
// @description     Fill/Update report conclusion
// @access          DOSEN
router.put(
  "/proposal/proposal-report/conclusion/:id",
  auth,
  proposalController.updateProposalConclusionById
);

//===================================================================
// @description     Get report conclusion
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/proposal/proposal-report/conclusion/:id",
  auth,
  proposalController.getProposalConclusionById
);

//===================================================================
// @description     Upload/Update dokumen revisi proposal
// @access          MAHASISWA
router.put(
  "/proposal/proposal-revision-document/:id",
  auth,
  proposalController.updateProposalRevisionDocumentById
);

//===================================================================
// @description     Get dokumen revisi proposal
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/proposal/proposal-revision-document/:id",
  auth,
  proposalController.getProposalRevisionDocumentById
);

//===================================================================
// @description     Delete/Update dokumen revisi proposal
// @access          MAHASISWA
router.put(
  "/proposal/proposal-revision-document/delete/:id",
  auth,
  proposalController.deleteProposalRevisionDocumentById
);

//===================================================================
// @description     Approve dokumen revisi proposal
// @access          DOSEN
router.put(
  "/proposal/proposal-revision-document/approve/:id",
  auth,
  proposalController.approveProposalRevisionDocumentById
);

//===================================================================
// @description     Reject dokumen revisi proposal
// @access          DOSEN
router.put(
  "/proposal/proposal-revision-document/reject/:id",
  auth,
  proposalController.rejectProposalRevisionDocumentById
);

module.exports = router;
