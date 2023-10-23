//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const proposalChangesController = require("./proposal_changes.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

//===================================================================
// @description     Create proposal changes
// @access          DOSEN
router.post(
  "/proposal-changes",
  auth,
  proposalChangesController.createProposalChanges
);

module.exports = router;
