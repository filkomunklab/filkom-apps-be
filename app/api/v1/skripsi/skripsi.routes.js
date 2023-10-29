//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const skripsiController = require("./skripsi.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

//===================================================================
// @description     Upload dokumen skripsi
// @access          MAHASISWA
router.put(
  "/skripsi/skripsi-document/:id",
  auth,
  skripsiController.updateSkripsiDocumentById
);

//===================================================================
// @description     Get dokumen skripsi
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/skripsi/skripsi-document/:id",
  auth,
  skripsiController.getSkripsiDocumentById
);

//===================================================================
// @description     Delete/Update dokumen skripsi
// @access          MAHASISWA
router.put(
  "/skripsi/skripsi-document/delete/:id",
  auth,
  skripsiController.deleteSkripsiDocumentById
);

//===================================================================
// @description     Approve dokumen skripsi
// @access          DOSEN
router.put(
  "/skripsi/skripsi-document/approve/:id",
  auth,
  skripsiController.approveSkripsiDocumentById
);

//===================================================================
// @description     Reject dokumen skripsi
// @access          DOSEN
router.put(
  "/skripsi/skripsi-document/reject/:id",
  auth,
  skripsiController.rejectSkripsiDocumentById
);

//===================================================================
// @description     Upload/Update bukti pembayaran
// @access          MAHASISWA
router.put(
  "/skripsi/skripsi-payment/:id",
  auth,
  skripsiController.updateSkripsiPaymentById
);

//===================================================================
// @description     Get bukti pembayaran
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/skripsi/skripsi-payment/:id",
  auth,
  skripsiController.getSkripsiPaymentById
);

//===================================================================
// @description     Delete/Update bukti pembayaran
// @access          MAHASISWA
router.put(
  "/skripsi/skripsi-payment/delete/:id",
  auth,
  skripsiController.deleteSkripsiPaymentById
);

//===================================================================
// @description     Upload/Update bukti hasil cek plagiat
// @access          MAHASISWA
router.put(
  "/skripsi/skripsi-plagiarism-check/:id",
  auth,
  skripsiController.updateSkripsiPlagiarismById
);

//===================================================================
// @description     Get bukti hasil cek plagiat
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/skripsi/skripsi-plagiarism-check/:id",
  auth,
  skripsiController.getSkripsiPlagiarismById
);

//===================================================================
// @description     Delete/Update bukti hasil cek plagiat
// @access          MAHASISWA
router.put(
  "/skripsi/skripsi-plagiarism-check/delete/:id",
  auth,
  skripsiController.deleteSkripsiPlagiarismById
);

//===================================================================
// @description     Get all skripsi schedule
// @access          OPERATOR_FAKULTAS
router.get("/skripsi/schedule", auth, skripsiController.getAllSkripsiSchedule);

//===================================================================
// @description     Create/Update skripsi schedule
// @access          OPERATOR_FAKULTAS
router.put(
  "/skripsi/schedule/:id",
  auth,
  skripsiController.updateSkripsiScheduleById
);

//===================================================================
// @description     Get skripsi schedule
// @access          OPERATOR_FAKULTAS
router.get(
  "/skripsi/schedule/:id",
  auth,
  skripsiController.getSkripsiScheduleById
);

//===================================================================
// @description     Open report
// @access          DOSEN
router.put(
  "/skripsi/skripsi-report/open-access/:id",
  auth,
  skripsiController.openAccessSkripsiReportById
);

//===================================================================
// @description     Update skripsi assessment by id
// @access          DOSEN
router.put(
  "/skripsi/skripsi-assessment/:id",
  auth,
  skripsiController.updateSkripsiAssessmentById
);

//===================================================================
// @description     Get all skripsi assessment by id
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/skripsi/skripsi-assessment/:id",
  auth,
  skripsiController.getAllSkripsiAssessmentById
);

//===================================================================
// @description     Update skripsi changes by id
// @access          DOSEN
router.put(
  "/skripsi/skripsi-changes/:id",
  auth,
  skripsiController.updateSkripsiChangesById
);

//===================================================================
// @description     Get all skripsi changes by id
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/skripsi/skripsi-changes/:id",
  auth,
  skripsiController.getAllSkripsiChangesById
);

//===================================================================
// @description     Get report
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/skripsi/skripsi-report/:id",
  auth,
  skripsiController.getSkripsiReportById
);

//===================================================================
// @description     Fill/Update report
// @access          DOSEN, DEKAN
router.put(
  "/skripsi/skripsi-report/:id",
  auth,
  skripsiController.signSkripsiReportById
);

//===================================================================
// @description     Fill/Update report conclusion
// @access          DOSEN
router.put(
  "/skripsi/skripsi-report/conclusion/:id",
  auth,
  skripsiController.updateSkripsiConclusionById
);

//===================================================================
// @description     Get report conclusion
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/skripsi/skripsi-report/conclusion/:id",
  auth,
  skripsiController.getSkripsiConclusionById
);

//===================================================================
// @description     Upload/Update dokumen revisi skripsi
// @access          MAHASISWA
router.put(
  "/skripsi/skripsi-revision-document/:id",
  auth,
  skripsiController.updateSkripsiRevisionDocumentById
);

//===================================================================
// @description     Get dokumen revisi skripsi
// @access          MAHASISWA, DOSEN, DOSEN_MK,  KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/skripsi/skripsi-revision-document/:id",
  auth,
  skripsiController.getSkripsiRevisionDocumentById
);

//===================================================================
// @description     Delete/Update dokumen revisi skripsi
// @access          MAHASISWA
router.put(
  "/skripsi/skripsi-revision-document/delete/:id",
  auth,
  skripsiController.deleteSkripsiRevisionDocumentById
);

//===================================================================
// @description     Approve dokumen revisi skripsi
// @access          DOSEN
router.put(
  "/skripsi/skripsi-revision-document/approve/:id",
  auth,
  skripsiController.approveSkripsiRevisionDocumentById
);

//===================================================================
// @description     Reject dokumen revisi skripsi
// @access          DOSEN
router.put(
  "/skripsi/skripsi-revision-document/reject/:id",
  auth,
  skripsiController.rejectSkripsiRevisionDocumentById
);

//===================================================================
// @description     Upload/Update dokumen HKI
// @access          MAHASISWA
router.put("/skripsi/hki/:id", auth, skripsiController.updateHKIById);

//===================================================================
// @description     Get dokumen HKI
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get("/skripsi/hki/:id", auth, skripsiController.getHKIById);

//===================================================================
// @description     Delete/Update dokumen HKI
// @access          MAHASISWA
router.put("/skripsi/hki/delete/:id", auth, skripsiController.deleteHKIById);

//===================================================================
// @description     Upload/Update dokumen journal
// @access          MAHASISWA
router.put("/skripsi/journal/:id", auth, skripsiController.updateJournalById);

//===================================================================
// @description     Get dokumen journal
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get("/skripsi/journal/:id", auth, skripsiController.getJournalById);

//===================================================================
// @description     Delete/Update dokumen journal
// @access          MAHASISWA
router.put(
  "/skripsi/journal/delete/:id",
  auth,
  skripsiController.deleteJournalById
);

//===================================================================
// @description     Upload/Update source code
// @access          MAHASISWA
router.put(
  "/skripsi/source-code/:id",
  auth,
  skripsiController.updateSourceCodeById
);

//===================================================================
// @description     Get source code
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/skripsi/source-code/:id",
  auth,
  skripsiController.getSourceCodeById
);

//===================================================================
// @description     Delete/Update source code
// @access          MAHASISWA
router.put(
  "/skripsi/source-code/delete/:id",
  auth,
  skripsiController.deleteSourceCodeById
);

//===================================================================
// @description     Upload/Update link source code
// @access          MAHASISWA
router.put(
  "/skripsi/link-source-code/:id",
  auth,
  skripsiController.updateLinkSourceCodeById
);

//===================================================================
// @description     Get link source code
// @access          DOSEN, DOSEN_MK, KAPRODI, DEKAN, OPERATOR_FAKULTAS
router.get(
  "/skripsi/link-source-code/:id",
  auth,
  skripsiController.getLinkSourceCodeById
);

//===================================================================
// @description     Delete/Update link source code
// @access          MAHASISWA
router.put(
  "/skripsi/link-source-code/delete/:id",
  auth,
  skripsiController.deleteLinkSourceCodeById
);

module.exports = router;
