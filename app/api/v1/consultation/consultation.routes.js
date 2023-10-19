//Layer untuk handle router dan http method
//Juga untuk penambahan middleware

const express = require("express");
const router = express.Router();
const consultationController = require("./consultation.controller");
const { auth } = require("../../../middleware/auth");

//-------------------Skripsi App ------------------------
//       mencatat konsultasi baru
router.post("/consultation", consultationController.createConsultation);
//       melihat konsultasi
router.get("/consultation", consultationController.getConsultation);

module.exports = router;