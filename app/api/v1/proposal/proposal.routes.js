//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const proposalController = require("./proposal.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

//       upload/update dokumen proposal
router.put("/proposal/proposal-document/:id", proposalController.updateProposalDocumentById);
//       melihat dokumen proposal
router.get("/proposal/proposal-document/:id", proposalController.getProposalDocumentById);
//       hapus dokumen proposal
router.put("/proposal/proposal-document/delete/:id", proposalController.deleteProposalDocumentById);
//       approve dokumen proposal
router.put("/proposal/proposal-document/approve/:id", proposalController.approveProposalDocumentById);
//       reject dokumen proposal
router.put("/proposal/proposal-document/reject/:id", proposalController.rejectProposalDocumentById);
//       upload/update bukti pembayaran
router.put("/proposal/proposal-payment/:id", proposalController.updateProposalPaymentById);
//       melihat bukti pembayaran
router.get("/proposal/proposal-payment/:id", proposalController.getProposalPaymentById);
//       hapus bukti pembayaran
router.put("/proposal/proposal-payment/delete/:id", proposalController.deleteProposalPaymentById);
//       upload/update hasil cek plagiat
router.put("/proposal/proposal-plagiarism-check/:id", proposalController.updateProposalPlagiarismById);
//       melihat bukti hasil cek plagiat
router.get("/proposal/proposal-plagiarism-check/:id", proposalController.getProposalPlagiarismById);
//       hapus bukti hasil cek plagiat
router.put("/proposal/proposal-plagiarism-check/delete/:id", proposalController.deleteProposalPlagiarismById);


//       melihat daftar sidang
router.get("/proposal/schedule", proposalController.getProposalSchedule);
//       membuat/memperbarui jadwal
router.put("/proposal/schedule/:id", proposalController.updateProposalScheduleById);
//       melihat jadwal
router.get("/proposal/schedule/:id", proposalController.getProposalScheduleById);


// //       membuka akses berita acara
// router.put("/proposal/proposal-report/open-access/:id", proposalController.openAccessProposalReportById);
// //       melihat penilaian
// router.get("/proposal/proposal-report/assessment/:id", proposalController.getProposalAssessmentById);
// //       mengisi penilaian
// router.put("/proposal/proposal-report/assessment/:id", proposalController.updateProposalAssessmentById);
// //       melihat perubahan
// router.get("/proposal/proposal-report/changes/:id", proposalController.getProposalChangesById);
// //       mengisi perubahan
// router.put("/proposal/proposal-report/changes/:id", proposalController.updateProposalChangesById);
// //       melihat kesimpulan sidang proposal
// router.get("/proposal/proposal-report/conclusion/:id", proposalController.getProposalConclusionById);
// //       mengisi kesimpulan sidang proposal
// router.put("/proposal/proposal-report/conclusion/:id", proposalController.updateProposalConclusionById);
// //       melihat berita acara
// router.get("/proposal/proposal-report/get/:id", proposalController.getProposalReportById);
// //       mengisi berita acara
// router.put("/proposal/proposal-report/sign/:id", proposalController.signProposalReportById);

// //       upload/update dokumen revisi proposal
// router.put("/proposal/proposal-revision-document/:id", proposalController.updateProposalRevisionDocumentById);
// //       melihat dokumen revisi proposal
// router.get("/proposal/proposal-revision-document/:id", proposalController.getProposalRevisionDocumentById);
// //       menyetujui dokumen revisi proposal
// router.put("/proposal/proposal-revision-document/approve/:id", proposalController.ApproveProposalRevisionDocumentById);
// //       menolak dokumen revisi proposal
// router.put("/proposal/proposal-revision-document/reject/:id", proposalController.RejectProposalRevisionDocumentById);

module.exports = router;