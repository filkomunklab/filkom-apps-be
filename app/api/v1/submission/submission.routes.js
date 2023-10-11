//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const submissionController = require("./submission.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

// !!!   mengubah judul -> di model group

//       melihat semua pengajuan
router.get("/submission", submissionController.getAllSubmission);
//       menghapus pengajuan
router.delete("/submission/:id", submissionController.deleteSubmissionById);
//       menghapus semua pengajuan
router.delete("/submission", submissionController.deleteAllSubmission);

//       beranda - status pengajuan judul
// router.get("/submission/submission-status/:id", submissionController.getSubmissionStatusById);
// //       mengajukan judul baru
router.post("/submission", submissionController.createSubmission);
//       melihat pengajuan judul
router.get("/submission/:id", submissionController.getSubmissionById);
//       mengubah pengajuan judul
router.put("/submission/:id", submissionController.updateSubmissionById);
//       mengganti advisor, co-advisor
router.put("/submission/advisor-and-co-advisor/:id", submissionController.updateAdvisorAndOrCoAdvisorById);
//       menerima pengajuan judul
router.put("/submission/approve/:id", submissionController.approveSubmissionById);
//       menolak pengajuan judul
router.put("/submission/reject/:id", submissionController.rejectSubmissionById);

module.exports = router;