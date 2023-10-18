//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const skripsiController = require("./skripsi.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------
//       membuat skripsi baru = null
router.post("/skripsi", skripsiController.createskripsi);

//       upload/update dokumen skripsi
router.put("/skripsi/skripsi-document/:id", skripsiController.updateSkripsiDocumentById);
//       melihat dokumen skripsi
router.get("/skripsi/skripsi-document/:id", skripsiController.getSkripsiDocumentById);
//       menyetujui dokumen skripsi
router.put("/skripsi/skripsi-document/approve/:id", skripsiController.approveSkripsiDocumentById);
//       menolak dokumen skripsi
router.put("/skripsi/skripsi-document/reject/:id", skripsiController.rejectSkripsiDocumentById);
//       upload/update bukti pembayaran
router.put("/skripsi/payment/:id", skripsiController.updatePaymentById);
//       melihat bukti pembayaran
router.get("/skripsi/payment/:id", skripsiController.getPaymentById);
//       upload/update hasil cek plagiat
router.put("/skripsi/plagiarism-check/:id", skripsiController.updatePlagiarismCheckById);
//       melihat hasil cek plagiat
router.get("/skripsi/plagiarism-check/:id", skripsiController.getPlagiarismCheckById);

//       membuat/memperbarui jadwal
router.put("/skripsi/schedule/:id", skripsiController.updateScheduleById);
//       melihat jadwal
router.get("/skripsi/schedule/:id", skripsiController.getScheduleById);

//       membuka akses berita acara
router.put("/skripsi/skripsi-report/open-access/:id", skripsiController.openAccessSkripsiReportById);
//       melihat penilaian
router.get("/skripsi/skripsi-report/assessment/:id", skripsiController.getSkripsiAssessmentById);
//       mengisi penilaian
router.put("/skripsi/skripsi-report/assessment/:id", skripsiController.updateSkripsiAssessmentById);
//       melihat perubahan
router.get("/skripsi/skripsi-report/changes/:id", skripsiController.getSkripsiChangesById);
//       mengisi perubahan
router.put("/skripsi/skripsi-report/changes/:id", skripsiController.updateSkripsiChangesById);
//       melihat kesimpulan sidang skripsi
router.get("/skripsi/skripsi-report/conclusion/:id", skripsiController.getSkripsiConclusionById);
//       mengisi kesimpulan sidang skripsi
router.put("/skripsi/skripsi-report/conclusion/:id", skripsiController.updateSkripsiConclusionById);
//       melihat berita acara
router.get("/skripsi/skripsi-report/get/:id", skripsiController.getSkripsiReportById);
//       mengisi berita acara
router.put("/skripsi/skripsi-report/sign/:id", skripsiController.signSkripsiReportById);

//       upload/update dokumen revisi skripsi
router.put("/skripsi/skripsi-revision-document/:id", skripsiController.updateSkripsiRevisionDocumentById);
//       melihat dokumen revisi skripsi
router.get("/skripsi/skripsi-revision-document/:id", skripsiController.getSkripsiRevisionDocumentById);
//       menyetujui dokumen revisi skripsi
router.put("/skripsi/skripsi-revision-document/approve/:id", skripsiController.ApproveSkripsiRevisionDocumentById);
//       menolak dokumen revisi skripsi
router.put("/skripsi/skripsi-revision-document/reject/:id", skripsiController.RejectSkripsiRevisionDocumentById);

//       upload/update hki
router.put("/skripsi/hki/:id", skripsiController.updateHKIById);
//       melihat hki
router.get("/skripsi/hki/:id", skripsiController.getHKIById);
//       upload/update jurnal
router.put("/skripsi/journal/:id", skripsiController.updateJournalById);
//       melihat jurnal
router.get("/skripsi/journal/:id", skripsiController.getJournalById);
//       upload/update source code
router.put("/skripsi/source-code/:id", skripsiController.updateSourceCodeById);
//       upload link source code
router.put("/skripsi/link-source-code/:id", skripsiController.updateLinkSourceCodeById);
//       melihat source code
router.get("/skripsi/source-code/:id", skripsiController.getSourceCodeById);
//       upload/update poster
router.put("/skripsi/poster/:id", skripsiController.updatePosterById);
//       melihat poster
router.get("/skripsi/poster/:id", skripsiController.getPosterById);
//       upload/update tutorial
router.put("/skripsi/tutorial/:id", skripsiController.updateTutorialById);
//       melihat tutorial
router.get("/skripsi/tutorial/:id", skripsiController.getTutorialById);

module.exports = router;