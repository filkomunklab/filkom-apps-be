//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const consultationController = require("./consultation.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------

//===================================================================
// @description     Create consultation
// @access          DOSEN
router.post("/consultation", auth, consultationController.createConsultation);

//===================================================================
// @description     Get all consultation by group id
// @access          DOSEN
router.get(
  "/consultation/:id",
  auth,
  consultationController.getAllConsultationByGroupId
);

module.exports = router;
