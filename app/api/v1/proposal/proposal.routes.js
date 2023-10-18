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
router.put("/proposal/proposal-document/:id", auth, proposalController.updateProposalDocumentById);
// //       melihat dokumen proposal
// router.get("/proposal/proposal-document/:id", auth, proposalController.getProposalDocumentById);
// //       hapus dokumen proposal
// router.put("/proposal/proposal-document/delete/:id", auth, proposalController.deleteProposalDocumentById);
// //       approve dokumen proposal
// router.put("/proposal/proposal-document/approve/:id", auth, proposalController.approveProposalDocumentById);
// //       reject dokumen proposal
// router.put("/proposal/proposal-document/reject/:id", auth, proposalController.rejectProposalDocumentById);
// //       upload/update bukti pembayaran
// router.put("/proposal/proposal-payment/:id", auth, proposalController.updateProposalPaymentById);
// //       melihat bukti pembayaran
// router.get("/proposal/proposal-payment/:id", auth, proposalController.getProposalPaymentById);
// //       hapus bukti pembayaran
// router.put("/proposal/proposal-payment/delete/:id" auth,, proposalController.deleteProposalPaymentById);
// //       upload/update hasil cek plagiat
// router.put("/proposal/proposal-plagiarism-check/:id", auth, proposalController.updateProposalPlagiarismById);
// //       melihat bukti hasil cek plagiat
// router.get("/proposal/proposal-plagiarism-check/:id", auth, proposalController.getProposalPlagiarismById);
// //       hapus bukti hasil cek plagiat
// router.put("/proposal/proposal-plagiarism-check/delete/:id", auth, proposalController.deleteProposalPlagiarismById);

// //       melihat daftar sidang
// router.get("/proposal/schedule", auth, proposalController.getProposalSchedule);
// //       membuat/memperbarui jadwal
// router.put("/proposal/schedule/:id", auth, proposalController.updateProposalScheduleById);
// //       melihat jadwal
// router.get("/proposal/schedule/:id", auth, proposalController.getProposalScheduleById);

// //       membuka akses berita acara
// router.put("/proposal/proposal-report/open-access/:id", auth, proposalController.openAccessProposalReportById);
// //       melihat berita acara
// router.get("/proposal/proposal-report/:id", auth, proposalController.getProposalReportById);
// //       mengisi berita acara
// router.put("/proposal/proposal-report/:id", auth, proposalController.signProposalReportById);
// //       mengisi kesimpulan sidang
// router.put("/proposal/proposal-report/conclusion/:id", auth, proposalController.updateProposalConclusionById);
// //       melihat kesimpulan sidang
// router.get("/proposal/proposal-report/conclusion/:id", auth, proposalController.getProposalConclusionById);


// //       upload/update dokumen revisi proposal
// router.put("/proposal/proposal-revision-document/:id", proposalController.updateProposalRevisionDocumentById);
// //       melihat dokumen revisi proposal
// router.get("/proposal/proposal-revision-document/:id", proposalController.getProposalRevisionDocumentById);
// //       delete dokumen revisi proposal
// router.delete("/proposal/proposal-revision-document/:id", proposalController.deleteProposalRevisionDocumentById);
// //       menyetujui dokumen revisi proposal
// router.put("/proposal/proposal-revision-document/approve/:id", proposalController.approveProposalRevisionDocumentById);
// //       menolak dokumen revisi proposal
// router.put("/proposal/proposal-revision-document/reject/:id", proposalController.rejectProposalRevisionDocumentById);

module.exports = router;