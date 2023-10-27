//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const proposalAssessmentController = require("./proposal_assessment.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

// //===================================================================
// // @description     Create proposal assessment
// // @access          DOSEN
// router.post(
//   "/proposal-assessment",
//   auth,
//   proposalAssessmentController.createProposalAssessment
// );

module.exports = router;
