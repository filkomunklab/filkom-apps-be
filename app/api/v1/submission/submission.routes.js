//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const submissionController = require("./submission.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

//===================================================================
// @description     Create submission
// @access          MAHASISWA
router.post("/submission", auth, submissionController.createSubmission);

//===================================================================
// @description     Get submission
// @access          MAHASISWA, DOSEN, DOSEN_MK, KAPRODI, DEKAN
router.get("/submission/:id", auth, submissionController.getSubmissionById);

//===================================================================
// @description     Update submission
// @access          MAHASISWA
router.put("/submission/:id", auth, submissionController.updateSubmissionById);

//===================================================================
// @description     Change advisor, co-advisor
// @access          DOSEN_MK
router.put(
  "/submission/advisor-and-co-advisor/:id",
  auth,
  submissionController.updateAdvisorAndCoAdvisorById
);

//===================================================================
// @description     Approve submission
// @access          DOSEN_MK
router.put(
  "/submission/approve/:id",
  auth,
  submissionController.approveSubmissionById
);

//===================================================================
// @description     Reject submission
// @access          DOSEN_MK
router.put(
  "/submission/reject/:id",
  auth,
  submissionController.rejectSubmissionById
);

//===================================================================
// @description     Change title in group
// @access          MAHASISWA
router.put(
  "/submission/title/:id",
  auth,
  submissionController.updateSubmissionTitleById
);

module.exports = router;
