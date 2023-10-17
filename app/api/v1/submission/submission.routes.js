//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const submissionController = require("./submission.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

// //       melihat semua pengajuan
// router.get("/submission", submissionController.getAllSubmission);
// //       menghapus pengajuan
// router.delete("/submission/:id", submissionController.deleteSubmissionById);
// //       menghapus semua pengajuan
// router.delete("/submission", submissionController.deleteAllSubmission);

//===================================================================
// @description     Mengajukan judul
// @access          MAHASISWA
router.post("/submission", auth, submissionController.createSubmission);

//===================================================================
// @description     Melihat pengajuan judul
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN
router.get("/submission/:id", auth, submissionController.getSubmissionById);

//===================================================================
// @description     Memperbarui pengajuan judul
// @access          MAHASISWA
router.put("/submission/:id", auth, submissionController.updateSubmissionById);

//===================================================================
// @description     Mengganti advisor, co-advisor
// @access          DOSEN_MK
router.put("/submission/advisor-and-co-advisor/:id", auth, submissionController.updateAdvisorAndCoAdvisorById);

//===================================================================
// @description     Approve pengajuan judul
// @access          DOSEN_MK
router.put("/submission/approve/:id", auth, submissionController.approveSubmissionById);

// //       menolak pengajuan judul
// router.put("/submission/reject/:id", auth, submissionController.rejectSubmissionById);
// //       memperbarui judul
// router.put("/submission/title/:id", auth, submissionController.updateGroupTitleById);

/* Note: Saat pengajuan judul, belum menggunakan student_id*/
/* Classroom belum pasti*/

module.exports = router;